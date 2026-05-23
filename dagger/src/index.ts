import { dag, Container, Directory, Secret, object, func } from "@dagger.io/dagger"

@object()
export class Optix {
  /**
   * Helper function to build a base container with Node.js, caching, and dependencies installed.
   */
  private base(source: Directory): Container {
    const nodeCache = dag.cacheVolume("optix-node-modules");
    const npmCache = dag.cacheVolume("optix-npm-cache");

    return dag
      .container()
      .from("node:20-alpine")
      .withDirectory("/src", source, {
        exclude: ["node_modules", ".angular", "docs", ".git", "dagger", "dagger.exe", "dist"]
      })
      .withWorkdir("/src")
      .withMountedCache("/src/node_modules", nodeCache)
      .withMountedCache("/root/.npm", npmCache)
      .withExec(["npm", "ci"]);
  }

  /**
   * Runs the ESLint linter to verify code quality.
   */
  @func()
  async lint(source: Directory): Promise<string> {
    return this.base(source)
      .withExec(["npm", "run", "lint"])
      .stdout();
  }

  /**
   * Runs unit tests.
   */
  @func()
  async test(source: Directory): Promise<string> {
    return this.base(source)
      .withExec(["npm", "run", "test"])
      .stdout();
  }

  /**
   * Builds the Angular application for production.
   * Returns the built docs/ directory containing production assets.
   */
  @func()
  build(source: Directory): Directory {
    return this.base(source)
      .withExec(["npm", "run", "build"])
      .directory("/src/docs");
  }

  /**
   * Runs E2E tests using Cypress.
   */
  @func()
  async cypress(source: Directory): Promise<string> {
    // Define the application service (running Angular in development mode)
    const appService = this.base(source)
      .withExposedPort(4200)
      .withExec(["npx", "ng", "serve", "--host", "0.0.0.0", "--disable-host-check"])
      .asService();

    // Run Cypress tests against the app service using the official Cypress container
    return dag
      .container()
      .from("cypress/included:14.0.2")
      .withDirectory("/e2e", source, {
        exclude: ["node_modules", ".angular", "docs", ".git", "dagger", "dagger.exe", "dist"]
      })
      .withWorkdir("/e2e")
      .withServiceBinding("app", appService)
      .withEnvVariable("CYPRESS_baseUrl", "http://app:4200")
      .withExec(["cypress", "run"])
      .stdout();
  }

  /**
   * Deploys the built assets to a private server via SSH/SCP securely.
   */
  @func()
  async deploy(
    buildDir: Directory,
    sshKey: Secret,
    host: string,
    user: string,
    deployPath: string
  ): Promise<string> {
    // Prepare the deployment container with openssh-client and rsync
    const deployContainer = dag
      .container()
      .from("alpine:3.19")
      .withExec(["apk", "add", "--no-cache", "openssh-client", "rsync"])
      // Mount the secret SSH private key safely in memory
      .withMountedSecret("/root/.ssh/id_rsa", sshKey)
      // Set proper permissions for the private key file
      .withExec(["chmod", "600", "/root/.ssh/id_rsa"])
      // Mount the built directory
      .withDirectory("/build", buildDir);

    // Execute rsync to deploy the build directory to the target server
    // Bypassing StrictHostKeyChecking simplifies connection for dynamic IPs/private servers
    return deployContainer
      .withExec([
        "rsync",
        "-avz",
        "-e",
        "ssh -o StrictHostKeyChecking=no -i /root/.ssh/id_rsa",
        "/build/",
        `${user}@${host}:${deployPath}`
      ])
      .stdout();
  }

  /**
   * Runs all validation checks (Lint, Test, and Build) concurrently and reports overall status.
   */
  @func()
  async runAll(source: Directory): Promise<string> {
    console.log("Starting professional validation pipeline...");

    // Start lint and test concurrently
    const lintPromise = this.lint(source);
    const testPromise = this.test(source);

    let lintPassed = false;
    let testPassed = false;
    let buildPassed = false;
    let buildCount = 0;
    const errorMessages: string[] = [];

    try {
      // Wait for lint and test concurrently
      await Promise.all([
        lintPromise
          .then(() => { lintPassed = true; })
          .catch(err => { errorMessages.push(`[Linter Failure]: ${err.message || err}`); }),
        testPromise
          .then(() => { testPassed = true; })
          .catch(err => { errorMessages.push(`[Test Failure]: ${err.message || err}`); })
      ]);
    } catch (e: any) {
      errorMessages.push(`[Concurrent Run Error]: ${e.message || e}`);
    }

    // Build is executed
    try {
      const buildDir = this.build(source);
      const files = await buildDir.entries();
      buildPassed = true;
      buildCount = files.length;
    } catch (err: any) {
      errorMessages.push(`[Build Failure]: ${err.message || err}`);
    }

    const statusSummary = `
============================================================
             DAGGER PROFESSIONAL PIPELINE REPORT            
============================================================
[ESLint Linter]   : ${lintPassed ? "✓ SUCCESS" : "✗ FAILED"}
[Unit Tests]      : ${testPassed ? "✓ SUCCESS" : "✗ FAILED"}
[Angular Build]   : ${buildPassed ? `✓ SUCCESS (Generated ${buildCount} files in docs/)` : "✗ FAILED"}
============================================================
`;

    if (errorMessages.length > 0) {
      throw new Error(`${statusSummary}\nPipeline execution encountered failures:\n${errorMessages.join("\n")}`);
    }

    return statusSummary;
  }
}
