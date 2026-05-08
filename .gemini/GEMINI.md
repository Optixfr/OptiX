# Project: QSDA — Angular 21 Application

## Tech Stack

- **Framework:** Angular 21 with standalone components (no NgModules)
- **State:** NgRx Signals (`@ngrx/signals`) + `@ngrx/operators`
- **UI:** Angular Material 21 + `@angular/cdk`
- **Charts:** `@swimlane/ngx-charts`
- **Testing:** Vitest 4 (browser mode, Playwright/Chromium) + Testing Library + MSW 2
- **Package manager:** npm (packageManager: npm@11.2.0)
- **Language:** TypeScript 5.9 (`strict: true`)
- **Build:** `@angular/build` (esbuild-based, `ng build` / `ng serve`)
- **Formatting:** Prettier 3.8 (`.prettierrc` at root)
- **OS:** Windows 11 / PowerShell

## Project Structure

```
src/
├── app/
│   ├── components/     # Shared/feature components
│   ├── models/         # Interfaces, types, enums
│   ├── services/       # Injectable services (HTTP, business logic)
│   ├── store/          # NgRx Signal stores
│   ├── app.config.ts   # provideRouter, provideHttpClient, etc.
│   ├── app.routes.ts   # Top-level lazy routes
│   ├── app.ts          # Root component
│   ├── app.html        # Root template
│   └── app.css         # Root styles
├── testing/
│   └── setup.ts        # Vitest global setup (Testing Library matchers)
├── styles.css          # Global styles / Material theme
├── main.ts             # bootstrapApplication
└── index.html          # SPA entry point
```

## Architecture Conventions

- **Standalone-only:** all components, directives, and pipes are standalone. Never use NgModules.
- **Signals-first:** prefer Angular signals (`signal()`, `computed()`, `effect()`) over RxJS where possible.
- **File naming:** `feature-name.component.ts`, `feature-name.service.ts`, `feature-name.store.ts`
- **Barrel exports:** use `index.ts` per feature folder.
- **Routing:** lazy-loaded routes via `loadComponent`.
- **Dependency injection:** use `inject()` function inside the class body, never constructor injection.
- **Prefix:** all components use the `app-` selector prefix.

## Coding Rules

- All TypeScript must pass `strict: true` in `tsconfig.json`
- Angular compiler options: `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`
- Use `inject()` function, never constructor injection
- Prefer `@if` / `@for` / `@switch` control flow blocks — never use `*ngIf`, `*ngFor`, `*ngSwitch`
- Use `ChangeDetectionStrategy.OnPush` on all components
- Use the `readonly` modifier on injected services and signals
- Use `input()` / `output()` signal APIs, not `@Input()` / `@Output()` decorators
- All HTTP calls go through dedicated services, never directly from components
- Always unsubscribe RxJS subscriptions (use `DestroyRef` + `takeUntilDestroyed()`)

## State Management Patterns

- Use `signalStore()` from `@ngrx/signals` for feature stores
- Use `withEntities()`, `withComputed()`, `withMethods()`, `withHooks()` on stores
- Expose store state via `computed()` signals — never expose mutable state
- Use `patchState()` for state updates
- Use `rxMethod()` from `@ngrx/operators` for async effects that need RxJS
- Keep stores in `store/` directory, one file per feature domain

## Testing Rules

- Tests use Vitest 4 with `@testing-library/angular`
- Browser mode via Playwright (Chromium, headless)
- Test files: `*.spec.ts` alongside the source file
- Mock HTTP with MSW (`msw`) service workers
- Prefer `screen.getByRole()` and accessible queries over CSS selectors
- Run tests: `npm run test:vitest`
- Run watch: `npm run test:vitest:watch`
- Run coverage: `npm run test:vitest:coverage`
- Global setup: `src/testing/setup.ts`
- Use `@testing-library/jest-dom` matchers (`toBeInTheDocument`, etc.)

## Build & Dev Commands

| Command                      | Description                     |
| ---------------------------- | ------------------------------- |
| `npm start`                  | Dev server (`ng serve`)         |
| `npm run build`              | Production build                |
| `npm run test:vitest`        | Run tests once                  |
| `npm run test:vitest:watch`  | Run tests in watch mode         |
| `npx tsc --noEmit`           | Type-check without emitting     |
| `npx prettier --write <f>`   | Format files with Prettier      |
| `npx prettier --check .`     | Check formatting                |

## Formatting

- Prettier is configured (`.prettierrc` at project root)
- Always run `npx prettier --write <files>` after generating code
- Follow existing indentation (2 spaces)
- Single quotes for TypeScript, Angular parser for HTML templates
- Max line width: 100 characters

## Angular Material Guidelines

- Import individual Material modules (e.g., `MatButtonModule`, `MatTableModule`) — no bulk imports
- Use the `mat-` prefix API correctly: `mat-form-field` needs `mat-label`, validation uses `mat-error`
- Use `MatDialogRef` / `MAT_DIALOG_DATA` for dialog communication
- Prefer Material's built-in a11y features (`aria-label`, `cdkFocusTrap`, etc.)
