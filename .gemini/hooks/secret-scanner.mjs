#!/usr/bin/env node

/**
 * Gemini CLI Hook: Secret Scanner
 * Blocks file writes that contain potential secrets/credentials.
 * 
 * Protocol:
 *   - stdin: JSON with { tool_name, tool_args, ... }
 *   - stdout: JSON with { decision: "allow"|"block", reason? }
 *   - stderr: debug logging only
 *   - exit 0: success, exit 2: system block
 */

const SECRET_PATTERNS = [
  /(?:api[_-]?key|apikey)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}/i,
  /(?:secret|password|passwd|pwd)\s*[:=]\s*['"][^'"]{8,}/i,
  /(?:token)\s*[:=]\s*['"][A-Za-z0-9_\-\.]{20,}/i,
  /(?:AKIA|ABIA|ACCA|ASIA)[A-Z0-9]{16}/,                      // AWS Access Key
  /-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----/,              // Private keys
  /ghp_[A-Za-z0-9_]{36}/,                                      // GitHub PAT
  /gho_[A-Za-z0-9_]{36}/,                                      // GitHub OAuth
  /sk-[A-Za-z0-9]{20,}/,                                       // OpenAI keys
  /AIza[A-Za-z0-9_\-]{35}/,                                    // Google API keys
  /xox[bpsa]-[A-Za-z0-9\-]{10,}/,                              // Slack tokens
  /npm_[A-Za-z0-9]{36}/,                                       // npm tokens
];

const SAFE_EXTENSIONS = new Set([
  '.md', '.txt', '.json', '.yaml', '.yml', '.toml',
  '.html', '.css', '.scss', '.svg',
  '.gitignore', '.editorconfig', '.prettierrc',
]);

function isSafeFile(filePath) {
  if (!filePath) return true;
  const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase();
  // Config files with "example" or "template" in name are safe
  if (filePath.includes('example') || filePath.includes('template')) return true;
  return false;
}

function scanForSecrets(content) {
  if (!content || typeof content !== 'string') return [];

  const findings = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('#') || line.trim().startsWith('*')) continue;
    // Skip lines referencing env vars (that's the correct pattern)
    if (line.includes('process.env') || line.includes('${}') || line.includes('${')) continue;

    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(line)) {
        findings.push({
          line: i + 1,
          pattern: pattern.source.slice(0, 40) + '...',
          snippet: line.trim().slice(0, 80),
        });
        break; // one finding per line is enough
      }
    }
  }

  return findings;
}

async function main() {
  let rawInput = '';
  for await (const chunk of process.stdin) {
    rawInput += chunk;
  }

  let input;
  try {
    input = JSON.parse(rawInput);
  } catch {
    process.stderr.write('Failed to parse stdin JSON\n');
    console.log(JSON.stringify({ decision: 'allow' }));
    process.exit(0);
  }

  const toolName = input.tool_name || '';
  const toolArgs = input.tool_args || {};

  process.stderr.write(`[secret-scanner] Checking tool: ${toolName}\n`);

  // Only scan file write operations
  if (!toolName.match(/write_file|replace/)) {
    console.log(JSON.stringify({ decision: 'allow' }));
    process.exit(0);
  }

  const content = toolArgs.content || toolArgs.new_string || '';
  const filePath = toolArgs.path || toolArgs.file_path || '';

  const findings = scanForSecrets(content);

  if (findings.length > 0) {
    const reason = `🔴 BLOCKED: Potential secrets detected in ${filePath}:\n` +
      findings.map(f => `  Line ${f.line}: ${f.snippet}`).join('\n');

    process.stderr.write(reason + '\n');
    console.log(JSON.stringify({
      decision: 'block',
      reason: reason,
    }));
    process.exit(2);
  }

  console.log(JSON.stringify({ decision: 'allow' }));
  process.exit(0);
}

main();
