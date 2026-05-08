---
name: merge_request_review
description: Performs a comprehensive review of a merge request or git diff, maximizing best practices.
---

# Merge Request Review Skill

This skill allows Gemini to perform high-quality code reviews by analyzing git diffs or merge requests. It focuses on functionality, code quality, security, performance, and testing.

## Instructions

When asked to review code or a merge request:
1.  **Analyze the context**: Understand the purpose of the changes by reading the MR description or the commit message.
2.  **Run the review helper**: Execute `python .gemini/skills/merge_request_review/scripts/review_helper.py` to get a summary of the changes and identify potential issues.
3.  **Review the diff**: Go through each file and line changed, applying the following checklist.
4.  **Provide constructive feedback**: Use the templates provided below to communicate findings.

## Review Checklist

### 1. Functionality & Requirements
- Does the code solve the intended problem?
- Are there any logic errors or bug potential?
- Are edge cases (nulls, empty lists, error states) handled?

### 2. Code Quality & Readability
- **SOLID Principles**: Are classes and functions adhering to SOLID principles?
- **Naming**: Are variables, functions, and classes descriptively and consistently named?
- **DRY**: Is there any unnecessary duplication?
- **Complexity**: Are functions too long or complex? (Aim for < 20 lines).
- **Comments**: Are comments explaining *why*, not *what*?

### 3. Security
- Is there any sensitive information (keys, passwords) hardcoded?
- Are all user inputs sanitized?
- Is there any risk of SQL injection, XSS, or other common vulnerabilities?

### 4. Performance
- Are there any inefficient loops or database queries?
- Is memory being used efficiently?
- Are there any unnecessary external calls?

### 5. Testing
- Are there corresponding unit/integration tests for the new logic?
- Do existing tests still pass? (Check by running native test commands like `npm test`).

### 6. Architecture & Best Practices
- **Angular Best Practices**: Does the code follow the latest Angular patterns (Signals, Standalone Components, RxMethod)?
- **State Management**: Is the state management pattern (NgRx Signals) used correctly and efficiently?
- **Performance**: Are there any unnecessary re-renders or inefficient computations?
- **Maintainability**: Is the code easy to understand, modify, and debug?   

### 7. Merge rules
- **Angular Best Practices**: Does the code follow the latest Angular patterns (Signals, Standalone Components, RxMethod)?
- **State Management**: Is the state management pattern (NgRx Signals) used correctly and efficiently?
- **Performance**: Are there any unnecessary re-renders or inefficient computations?
- **Maintainability**: Is the code easy to understand, modify, and debug?       
- **Commit message**: Is the commit message clear and concise?
- **Squash commits**: Are the commits squashed into a single commit?
- **rebase main**: Is the branch rebased on main?

## Feedback Templates

### 💡 Suggestion
"For better [readability/performance/security], consider changing `[code]` to `[suggestion]`. This helps because [reason]."

### ⚠️ Warning
"This block of code might lead to [issue] if [condition]. It's recommended to [fix]."

### ✅ Praise
"Great use of [pattern/technique] here! This makes the code much more [maintainable/efficient]."

## Tools
- `npm run lint`: Use this to check for style and linting issues.
- `npm test`: Use this to verify that changes don't break existing functionality.
