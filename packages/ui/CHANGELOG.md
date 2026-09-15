# Changelog

All notable changes to `praxis-vue-ui` are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Removed

- **Dropped `pinia` as a peer dependency.** It was declared in `package.json` but never imported anywhere in `src/`. If your app installed `pinia` solely to satisfy this library's peer dependency, you can remove it — nothing in `praxis-vue-ui` requires it.
- **Removed 4 components from the public export surface**: `PxBadgedValueGrid`, `PxLabeledValueSection`, `PxColumnLayout`, `PxStatusDataTable`. These were internal, app-specific components that had leaked into `src/index.ts` — their props reference types (`TemplateSection`, `BasicLabelValue`) that only exist inside the original consuming app, so they were never usable as documented, general-purpose components. If you were importing one of these from `praxis-vue-ui`, it no longer resolves; the source files still exist in the repo under `src/components/` but are not part of the package's public API.
- **Removed the `vue-draggable-plus` dependency.** It was only used by `PxColumnLayout`, which is no longer exported — dropping it shrinks the installed package size.

### Fixed

- Corrected the installation instructions in `README.md` (and the docs site's Quick Start): they referenced `primevue` / `@primevue/core` and an `app.use(PrimeVue, ...)` setup step that the library has never actually required — `praxis-vue-ui` does not depend on PrimeVue anywhere in its source. The real setup is just `npm install praxis-vue-ui vee-validate` plus a CSS import.
- **Audited all 52 documented components against their real source** and corrected 21 pages where the docs described props, emits, slots, or underlying implementation that didn't match the code — including two pages (`PxSelectableListWithTable`, `PxDialogInput`) that documented an entirely different, non-existent API shape. No component behavior changed; only the documentation was brought in line with what already ships. See `packages/docs/components/**` for the corrected pages.

### Known Issues (found during the doc audit, not yet fixed)

- **`PxSelectableListWithTable`**: the item-count badge never renders — its template references a bare `<Badge>` component that isn't imported or globally registered anywhere in the library, so Vue can't resolve it (console warning: "Failed to resolve component: Badge"). The `badgeState` prop currently has no visible effect as a result.
- **`PxDialogInput`**: the `theme="light"` prop has no visible effect. It applies a `light-theme-dialog` class, but the accompanying CSS is scoped to `.light-theme-dialog.p-dialog` — a PrimeVue-era class name that no longer matches anything, since the underlying `PxDialog` renders `.px-dialog`. Looks like leftover styling from a prior implementation.

## [0.1.5] and earlier

No changelog was kept prior to this file. See `git log` for history.

[Unreleased]: https://github.com/GerardoIbarra/praxis-vue/compare/v0.1.5...HEAD
