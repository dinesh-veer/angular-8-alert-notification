# Angular Alert Notifications

Modern Angular (v22) Alert / Toaster notification example migrated from Angular 8, featuring standalone components, Vite + esbuild application builder, and a comprehensive Vitest unit test suite.

## Documentation Website

Full documentation is available in the [`docs/`](./docs/index.html) directory, matching the design system and styling of [Angular-Integration-With-Rest](https://github.com/dinesh-veer/Angular-Integration-With-Rest):
- [Home &amp; Overview](./docs/index.html)
- [Getting Started](./docs/getting-started.html)
- [Architecture &amp; Design](./docs/architecture.html)
- [AlertService API &amp; Models](./docs/alert-service.html)
- [Configuration &amp; Toolchain](./docs/configuration.html)
- [Testing Guide](./docs/testing.html)

## Development Server

Run `npm start` to start the local development server at `http://localhost:4200/`.

## Build

Run `npm run build` to build the production application bundle into the `dist/` directory.

## Running Tests

Run `npm test` to execute all unit test cases with Vitest and jsdom.
Run `npm run test:watch` to run tests in interactive watch mode.

## Architecture & Upgrades

- **Angular 22**: Modern Standalone Components (`AlertComponent`, `HomeComponent`, `MultiAlertsComponent`, `AppComponent`)
- **New Control Flow**: `@for` template syntax with track expressions
- **Build System**: `@angular/build:application` (esbuild + Vite dev server)
- **Unit Testing**: Vitest test runner integrated with Angular Testing Library & TestBed
- **Backward Compatibility**: `AlertModule` is exported for module-based consumers
