import sys
import subprocess
import os

def get_git_diff():
    try:
        # Get the diff of the currently staged changes
        # If no staged changes, get diff of unstaged changes
        result = subprocess.run(['git', 'diff', '--staged'], capture_output=True, text=True)
        if not result.stdout:
            result = subprocess.run(['git', 'diff'], capture_output=True, text=True)
        return result.stdout
    except Exception as e:
        return f"Error getting git diff: {e}"

def analyze_diff(diff_text):
    if not diff_text:
        return "No changes detected."

    lines = diff_text.splitlines()
    summary = {
        'files_changed': 0,
        'insertions': 0,
        'deletions': 0,
        'todos_added': 0,
        'large_files': [],
        'potential_fixmes': 0
    }

    current_file = None
    file_lines = 0

    for line in lines:
        if line.startswith('diff --git'):
            summary['files_changed'] += 1
            if current_file and file_lines > 300:
                summary['large_files'].append(current_file)
            current_file = line.split(' b/')[-1]
            file_lines = 0
        elif line.startswith('+') and not line.startswith('+++'):
            summary['insertions'] += 1
            file_lines += 1
            if 'TODO' in line.upper():
                summary['todos_added'] += 1
            if 'FIXME' in line.upper():
                summary['potential_fixmes'] += 1
        elif line.startswith('-') and not line.startswith('---'):
            summary['deletions'] += 1

    if current_file and file_lines > 300:
        summary['large_files'].append(current_file)

    report = [
        "## MR Review Summary",
        f"- **Files Changed**: {summary['files_changed']}",
        f"- **Insertions**: {summary['insertions']}",
        f"- **Deletions**: {summary['deletions']}",
        f"- **TODOs Found**: {summary['todos_added']}",
        f"- **FIXMEs Found**: {summary['potential_fixmes']}"
    ]

    if summary['large_files']:
        report.append("- **⚠️ Large Files (potential complexity issue)**:")
        for f in summary['large_files']:
            report.append(f"  - {f}")

    return "\n".join(report)

if __name__ == "__main__":
    diff = get_git_diff()
    print(analyze_diff(diff))
