#!/usr/bin/env node

/**
 * Gemini CLI Hook: Dangerous Command Guard
 * Blocks shell commands that could be destructive.
 * 
 * Protocol:
 *   - stdin: JSON with { tool_name, tool_args: { command }, ... }
 *   - stdout: JSON with { decision: "allow"|"block", reason? }
 *   - stderr: debug logging only
 */

const BLOCKED_PATTERNS = [
  // Destructive filesystem operations
  { pattern: /rm\s+(-rf?|--recursive)\s+[\/~]/, reason: 'Recursive delete on root or home directory' },
  { pattern: /rm\s+-rf?\s+\.\s*$/, reason: 'Recursive delete on current directory' },
  { pattern: /rmdir\s+\/s\s+\/q/, reason: 'Windows recursive directory delete' },
  { pattern: /del\s+\/s\s+\/q/, reason: 'Windows recursive file delete' },
  { pattern: /format\s+[a-z]:/i, reason: 'Disk format command' },

  // Git destructive operations
  { pattern: /git\s+push\s+.*--force(?!-with-lease)/, reason: 'Force push without lease (use --force-with-lease instead)' },
  { pattern: /git\s+reset\s+--hard\s+(?!HEAD)/, reason: 'Hard reset to non-HEAD commit (potential data loss)' },
  { pattern: /git\s+clean\s+-[a-z]*f[a-z]*d/, reason: 'Git clean with force+directory flags' },

  // Database destructive operations
  { pattern: /DROP\s+(DATABASE|TABLE|SCHEMA)\b/i, reason: 'Database/table/schema drop' },
  { pattern: /TRUNCATE\s+TABLE\b/i, reason: 'Table truncation' },
  { pattern: /DELETE\s+FROM\s+\w+\s*;?\s*$/i, reason: 'DELETE without WHERE clause' },

  // System-level danger
  { pattern: /chmod\s+777/, reason: 'Setting world-writable permissions' },
  { pattern: /:(){ :\|:& };:/, reason: 'Fork bomb detected' },
  { pattern: />\s*\/dev\/sd[a-z]/, reason: 'Direct write to disk device' },
  { pattern: /mkfs\./, reason: 'Filesystem creation on device' },

  // Credential exposure
  { pattern: /curl\s+.*(-d|--data)\s+.*password/i, reason: 'Sending password via curl' },
  { pattern: /echo\s+.*password.*>>/i, reason: 'Echoing password to file' },
];

const WARN_PATTERNS = [
  { pattern: /npm\s+install\s+-g/, reason: 'Global npm install (affects system)' },
  { pattern: /pip\s+install(?!\s+--user)/, reason: 'pip install without --user flag' },
  { pattern: /sudo\s+/, reason: 'Elevated privileges requested' },
  { pattern: /Set-ExecutionPolicy/, reason: 'Changing PowerShell execution policy' },
];

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
  const command = input.tool_args?.command || '';

  process.stderr.write(`[cmd-guard] Checking: ${command.slice(0, 100)}\n`);

  if (toolName !== 'run_shell_command') {
    console.log(JSON.stringify({ decision: 'allow' }));
    process.exit(0);
  }

  // Check blocked patterns
  for (const { pattern, reason } of BLOCKED_PATTERNS) {
    if (pattern.test(command)) {
      const msg = `🔴 BLOCKED: ${reason}\n  Command: ${command}`;
      process.stderr.write(msg + '\n');
      console.log(JSON.stringify({
        decision: 'block',
        reason: msg,
      }));
      process.exit(2);
    }
  }

  // Check warning patterns (allow but inform)
  const warnings = [];
  for (const { pattern, reason } of WARN_PATTERNS) {
    if (pattern.test(command)) {
      warnings.push(reason);
    }
  }

  if (warnings.length > 0) {
    const msg = `⚠️ Warnings: ${warnings.join(', ')}`;
    process.stderr.write(msg + '\n');
    console.log(JSON.stringify({
      decision: 'allow',
      systemMessage: msg,
    }));
    process.exit(0);
  }

  console.log(JSON.stringify({ decision: 'allow' }));
  process.exit(0);
}

main();
