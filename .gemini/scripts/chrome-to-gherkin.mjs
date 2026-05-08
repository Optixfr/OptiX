#!/usr/bin/env node

/**
 * chrome-to-gherkin — One-way scaffold converter
 *
 * Converts a Chrome DevTools Recorder JSON export into:
 *   1. A Gherkin `.feature` file
 *   2. Playwright step definition stubs (TypeScript)
 *
 * Usage:
 *   node chrome-to-gherkin.mjs <recording.json> [--out-dir <dir>]
 *
 * The recording JSON is a ONE-TIME bootstrap input.
 * After conversion, DELETE the recording and maintain only the Gherkin.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { basename, join, resolve } from 'path';

// ─── Types ──────────────────────────────────────────────────────────────────

/**
 * @typedef {'navigate'|'click'|'doubleClick'|'change'|'keyDown'|'keyUp'|'scroll'|'hover'|'waitForElement'|'waitForExpression'|'setViewport'|'close'} StepType
 *
 * @typedef {{ type: StepType, url?: string, selectors?: string[][], value?: string, key?: string, offsetX?: number, offsetY?: number, expression?: string, width?: number, height?: number, assertedEvents?: Array<{type: string, url?: string, title?: string}> }} RecordingStep
 *
 * @typedef {{ title: string, steps: RecordingStep[] }} Recording
 */

// ─── Selector Humanization ──────────────────────────────────────────────────

/**
 * Extracts the most human-readable selector from the selector array.
 * Preference: aria > text > data-testid > id > css
 */
function pickBestSelector(selectors) {
  if (!selectors || selectors.length === 0) return { raw: 'unknown', human: 'unknown element' };

  const flat = selectors.flat();

  // Prefer aria selectors: "aria/Submit Button"
  const aria = flat.find(s => s.startsWith('aria/'));
  if (aria) {
    const label = aria.replace('aria/', '');
    return { raw: aria, human: `"${label}"` };
  }

  // Prefer text selectors: "text/Click me"
  const text = flat.find(s => s.startsWith('text/'));
  if (text) {
    const label = text.replace('text/', '');
    return { raw: text, human: `"${label}"` };
  }

  // Prefer data-testid
  const testId = flat.find(s => s.includes('[data-testid='));
  if (testId) {
    const match = testId.match(/data-testid=["']?([^"'\]]+)/);
    const id = match ? match[1] : testId;
    return { raw: testId, human: `the "${id}" element` };
  }

  // Prefer #id selectors
  const idSel = flat.find(s => /^#[a-zA-Z][\w-]*$/.test(s));
  if (idSel) {
    const name = idSel.replace('#', '').replace(/-/g, ' ');
    return { raw: idSel, human: `the "${name}" element` };
  }

  // Prefer simple tag or class
  const simple = flat.find(s => !s.includes(':') && !s.includes('>') && s.length < 40);
  if (simple) {
    return { raw: simple, human: `the "${simple}" element` };
  }

  // Fallback: first selector
  return { raw: flat[0], human: `element matching "${flat[0].slice(0, 50)}"` };
}

/**
 * Infers a human-readable field name from selectors.
 */
function inferFieldName(selectors) {
  const flat = (selectors || []).flat();

  const aria = flat.find(s => s.startsWith('aria/'));
  if (aria) return aria.replace('aria/', '');

  for (const s of flat) {
    // input[name="email"] → email
    const nameMatch = s.match(/\[name=["']?(\w+)["']?\]/);
    if (nameMatch) return nameMatch[1];

    // #email-input → email input
    const idMatch = s.match(/^#([\w-]+)$/);
    if (idMatch) return idMatch[1].replace(/-/g, ' ');

    // input[placeholder="Enter email"] → Enter email
    const phMatch = s.match(/\[placeholder=["']([^"']+)["']\]/);
    if (phMatch) return phMatch[1];

    // [data-testid="email-field"] → email field
    const tidMatch = s.match(/\[data-testid=["']?([^"'\]]+)["']?\]/);
    if (tidMatch) return tidMatch[1].replace(/-/g, ' ');
  }

  return flat[0]?.slice(0, 40) || 'the field';
}

// ─── Step Conversion ────────────────────────────────────────────────────────

/**
 * Converts a single recording step to a Gherkin line.
 * Returns { keyword: 'Given'|'When'|'Then', text: string, selector?: object }
 */
function stepToGherkin(step, index, allSteps) {
  const sel = pickBestSelector(step.selectors);

  switch (step.type) {
    case 'navigate':
      return {
        keyword: index === 0 ? 'Given' : 'And',
        text: `I navigate to "${step.url}"`,
        playwrightCode: `await page.goto('${step.url}');`,
      };

    case 'click':
      return {
        keyword: 'When',
        text: `I click on ${sel.human}`,
        playwrightCode: `await page.locator('${sel.raw}').click();`,
      };

    case 'doubleClick':
      return {
        keyword: 'When',
        text: `I double-click on ${sel.human}`,
        playwrightCode: `await page.locator('${sel.raw}').dblclick();`,
      };

    case 'hover':
      return {
        keyword: 'When',
        text: `I hover over ${sel.human}`,
        playwrightCode: `await page.locator('${sel.raw}').hover();`,
      };

    case 'change': {
      const field = inferFieldName(step.selectors);
      return {
        keyword: 'When',
        text: `I enter "${step.value}" in the "${field}" field`,
        playwrightCode: `await page.locator('${sel.raw}').fill('${step.value}');`,
      };
    }

    case 'keyDown':
      if (step.key === 'Enter') {
        return {
          keyword: 'When',
          text: 'I press Enter',
          playwrightCode: `await page.keyboard.press('Enter');`,
        };
      }
      if (step.key === 'Escape') {
        return {
          keyword: 'When',
          text: 'I press Escape',
          playwrightCode: `await page.keyboard.press('Escape');`,
        };
      }
      if (step.key === 'Tab') {
        return {
          keyword: 'When',
          text: 'I press Tab',
          playwrightCode: `await page.keyboard.press('Tab');`,
        };
      }
      return {
        keyword: 'When',
        text: `I press the "${step.key}" key`,
        playwrightCode: `await page.keyboard.press('${step.key}');`,
      };

    case 'keyUp':
      // keyUp is usually noise — skip
      return null;

    case 'scroll':
      return {
        keyword: 'When',
        text: 'I scroll the page',
        playwrightCode: `await page.mouse.wheel(${step.deltaX || 0}, ${step.deltaY || 0});`,
      };

    case 'waitForElement':
      return {
        keyword: 'Then',
        text: `I should see ${sel.human}`,
        playwrightCode: `await expect(page.locator('${sel.raw}')).toBeVisible();`,
      };

    case 'waitForExpression':
      return {
        keyword: 'Then',
        text: `the page should satisfy the condition "${(step.expression || '').slice(0, 60)}"`,
        playwrightCode: `await page.waitForFunction('${step.expression}');`,
      };

    case 'setViewport':
      return {
        keyword: 'Given',
        text: `the viewport is ${step.width}x${step.height}`,
        playwrightCode: `await page.setViewportSize({ width: ${step.width}, height: ${step.height} });`,
      };

    case 'close':
      return null; // skip close steps

    default:
      return {
        keyword: 'When',
        text: `I perform a "${step.type}" action`,
        playwrightCode: `// TODO: implement "${step.type}" step`,
      };
  }
}

// ─── Navigation assertion detection ─────────────────────────────────────────

function extractAssertedEvents(step) {
  if (!step.assertedEvents || step.assertedEvents.length === 0) return [];

  return step.assertedEvents
    .filter(e => e.type === 'navigation')
    .map(e => ({
      keyword: 'Then',
      text: e.title
        ? `I should be on the "${e.title}" page`
        : `I should be navigated to "${e.url}"`,
      playwrightCode: e.title
        ? `await expect(page).toHaveTitle('${e.title}');`
        : `await expect(page).toHaveURL('${e.url}');`,
    }));
}

// ─── Feature File Generation ────────────────────────────────────────────────

function toFeatureName(title) {
  return title
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function toScenarioName(title) {
  return `User ${title.toLowerCase().replace(/[-_]+/g, ' ')}`;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateFeatureFile(recording) {
  const featureName = toFeatureName(recording.title);
  const scenarioName = toScenarioName(recording.title);

  const gherkinSteps = [];
  let prevKeyword = '';

  for (let i = 0; i < recording.steps.length; i++) {
    const step = recording.steps[i];
    const result = stepToGherkin(step, i, recording.steps);

    if (result) {
      // Deduplicate keywords: use "And" if same keyword repeats
      let keyword = result.keyword;
      if (keyword === prevKeyword && keyword !== 'And') {
        keyword = 'And';
      }
      prevKeyword = result.keyword;

      gherkinSteps.push(`    ${keyword} ${result.text}`);
    }

    // Include asserted events (navigation assertions)
    const assertions = extractAssertedEvents(step);
    for (const assertion of assertions) {
      let keyword = assertion.keyword;
      if (keyword === prevKeyword) keyword = 'And';
      prevKeyword = assertion.keyword;
      gherkinSteps.push(`    ${keyword} ${assertion.text}`);
    }
  }

  const feature = [
    `Feature: ${featureName}`,
    `  As a user`,
    `  I want to ${recording.title.toLowerCase().replace(/[-_]+/g, ' ')}`,
    `  So that I can achieve my goal`,
    ``,
    `  Scenario: ${scenarioName}`,
    ...gherkinSteps,
    ``,
  ].join('\n');

  return feature;
}

// ─── Step Definitions Generation ────────────────────────────────────────────

function generateStepDefinitions(recording) {
  const seen = new Set();
  const stepDefs = [];

  for (let i = 0; i < recording.steps.length; i++) {
    const step = recording.steps[i];
    const result = stepToGherkin(step, i, recording.steps);

    if (!result) continue;

    // Deduplicate step patterns
    const pattern = result.text
      .replace(/"[^"]*"/g, '"{string}"')
      .replace(/\d+x\d+/, '{int}x{int}');

    if (seen.has(pattern)) continue;
    seen.add(pattern);

    // Convert pattern to regex
    const regex = pattern
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\\"\\\{string\\\}\\"/g, '"([^"]*)"')
      .replace(/\\\{int\\\}/g, '(\\d+)');

    stepDefs.push({
      pattern,
      regex,
      code: result.playwrightCode,
      keyword: result.keyword,
    });

    // Also add asserted events
    const assertions = extractAssertedEvents(step);
    for (const assertion of assertions) {
      const aPattern = assertion.text.replace(/"[^"]*"/g, '"{string}"');
      if (seen.has(aPattern)) continue;
      seen.add(aPattern);

      const aRegex = aPattern
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\\"\\\{string\\\}\\"/g, '"([^"]*)"');

      stepDefs.push({
        pattern: aPattern,
        regex: aRegex,
        code: assertion.playwrightCode,
        keyword: assertion.keyword,
      });
    }
  }

  const keywordMap = { Given: 'Given', When: 'When', Then: 'Then', And: 'When' };

  // Map patterns to parameterized Playwright code
  const parameterizedCode = {
    'I navigate to "{string}"': { params: 'url: string', code: "await page.goto(url);" },
    'I click on "{string}"': { params: 'element: string', code: "await page.getByRole('button', { name: element }).or(page.getByLabel(element)).or(page.getByText(element)).click();" },
    'I double-click on "{string}"': { params: 'element: string', code: "await page.getByRole('button', { name: element }).or(page.getByLabel(element)).dblclick();" },
    'I hover over "{string}"': { params: 'element: string', code: "await page.getByRole('button', { name: element }).or(page.getByLabel(element)).hover();" },
    'I enter "{string}" in the "{string}" field': { params: 'value: string, field: string', code: "await page.getByLabel(field).fill(value);" },
    'I press the "{string}" key': { params: 'key: string', code: "await page.keyboard.press(key);" },
    'I should see "{string}"': { params: 'element: string', code: "await expect(page.getByText(element).or(page.getByLabel(element))).toBeVisible();" },
    'I should be on the "{string}" page': { params: 'title: string', code: "await expect(page).toHaveTitle(new RegExp(title, 'i'));" },
    'I should be navigated to "{string}"': { params: 'url: string', code: "await expect(page).toHaveURL(url);" },
    'the viewport is {int}x{int}': { params: 'width: number, height: number', code: "await page.setViewportSize({ width, height });" },
  };

  const lines = [
    `import { Given, When, Then } from '@cucumber/cucumber';`,
    `import { expect } from '@playwright/test';`,
    `import { page } from '../support/world';`,
    ``,
    `// ──────────────────────────────────────────────────────────────────`,
    `// Auto-generated step definitions from Chrome DevTools recording.`,
    `// This is your STARTING POINT — edit freely, delete the recording.`,
    `//`,
    `// Steps use Playwright locators with accessible selectors`,
    `// (getByRole, getByLabel, getByText) for resilient tests.`,
    `// ──────────────────────────────────────────────────────────────────`,
    ``,
  ];

  for (const def of stepDefs) {
    const kw = keywordMap[def.keyword] || 'When';
    const paramInfo = parameterizedCode[def.pattern];

    if (paramInfo) {
      lines.push(`${kw}('${def.pattern}', async function (${paramInfo.params}) {`);
      lines.push(`  ${paramInfo.code}`);
    } else {
      // Fallback: generate arg0, arg1, etc.
      const paramCount = (def.pattern.match(/\{string\}|\{int\}/g) || []).length;
      const params = Array.from({ length: paramCount }, (_, i) => `arg${i}: string`).join(', ');

      lines.push(`${kw}('${def.pattern}', async function (${params}) {`);
      lines.push(`  ${def.code}`);
    }
    lines.push(`});`);
    lines.push(``);
  }

  return lines.join('\n');
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║  chrome-to-gherkin — One-way scaffold converter              ║
╚══════════════════════════════════════════════════════════════╝

Usage:
  node chrome-to-gherkin.mjs <recording.json> [--out-dir <dir>]

Arguments:
  <recording.json>   Chrome DevTools Recorder export file
  --out-dir <dir>    Output directory (default: ./features)

Output:
  <dir>/<slug>.feature           Gherkin feature file
  <dir>/step_definitions/<slug>.steps.ts   Playwright step stubs

⚠️  This is a ONE-WAY scaffold tool.
    After conversion, the .feature file is your SOURCE OF TRUTH.
    Delete the recording JSON and maintain only the Gherkin.
`);
    process.exit(0);
  }

  const inputPath = resolve(args[0]);
  const outDirFlag = args.indexOf('--out-dir');
  const outDir = outDirFlag !== -1 ? resolve(args[outDirFlag + 1]) : resolve('./features');

  // Read and parse
  let recording;
  try {
    const raw = readFileSync(inputPath, 'utf-8');
    recording = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to read ${inputPath}: ${err.message}`);
    process.exit(1);
  }

  if (!recording.title || !Array.isArray(recording.steps)) {
    console.error('❌ Invalid recording: must have "title" and "steps" array');
    process.exit(1);
  }

  const slug = slugify(recording.title);

  // Generate
  const featureContent = generateFeatureFile(recording);
  const stepContent = generateStepDefinitions(recording);

  // Write
  const stepDir = join(outDir, 'step_definitions');
  mkdirSync(stepDir, { recursive: true });

  const featurePath = join(outDir, `${slug}.feature`);
  const stepPath = join(stepDir, `${slug}.steps.ts`);

  writeFileSync(featurePath, featureContent, 'utf-8');
  writeFileSync(stepPath, stepContent, 'utf-8');

  console.log(`
✅ Scaffold generated successfully!

  📄 Feature:      ${featurePath}
  🔧 Step Defs:    ${stepPath}

┌────────────────────────────────────────────────────────┐
│  ⚠️  IMPORTANT: Source of Truth                         │
│                                                        │
│  The .feature file is now your SINGLE source of truth. │
│  Delete the Chrome recording JSON.                     │
│  Edit only the .feature and .steps.ts files.           │
└────────────────────────────────────────────────────────┘

  Stats:
    Steps converted: ${recording.steps.length}
    Gherkin lines:   ${featureContent.split('\n').length}
`);
}

main();
