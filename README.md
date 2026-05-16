# FinVault — Micro-Frontend Fintech Platform

A production-grade **Micro-Frontend architecture demo** built with Webpack Module Federation, React 18, TypeScript, and Zustand. Inspired by real-world experience leading frontend development for a platform serving 30,000+ DAU with 25+ integrated sub-applications.

**Live Demo:** [mfe-shell.vercel.app](https://mfe-shell.vercel.app) *(coming soon)*

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  Shell (port 3000)               │
│  ┌─────────────┐   ┌──────────────────────────┐ │
│  │   NavBar    │   │   React Router (v6)      │ │
│  │  (shared)   │   │   /accounts → remote     │ │
│  │             │   │   /transactions → remote  │ │
│  └─────────────┘   └──────────────────────────┘ │
│         │                    │                   │
│   ┌─────┴──────────────────┐ │                   │
│   │   Zustand Shared Store  │ │                   │
│   │  (user, theme state)   │ │                   │
│   └────────────────────────┘ │                   │
└────────────────┬──────────────┘                   
                 │  Module Federation (runtime)
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│ app-accounts  │  │ app-transactions  │
│  (port 3001)  │  │   (port 3002)    │
│               │  │                  │
│ exposes: ./App│  │ exposes: ./App   │
└──────────────┘  └──────────────────┘
```

Each sub-application is **independently deployed** to Vercel. The shell loads them at runtime via `remoteEntry.js`.

---

## Why Webpack Module Federation?

### Alternatives Considered

| Approach | Rejected Because |
|---|---|
| **npm packages** | Requires full rebuild + redeploy of shell on every sub-app update. No true independence. |
| **iframes** | Poor UX (separate scroll, history), no shared state, cross-origin complexity. |
| **Single-SPA + SystemJS** | Higher conceptual overhead; SystemJS import maps add runtime complexity. Better for framework-agnostic scenarios. |
| **Vite Plugin Federation** | Plugin is less mature; edge cases with HMR and shared dependencies in monorepo. |

**Module Federation** wins because it enables true independent deployment while sharing runtime dependencies (React, Zustand) — no duplicate bundle overhead.

---

## Key Engineering Decisions

### 1. Singleton shared dependencies
```js
// webpack.config.js
shared: {
  react: { singleton: true, requiredVersion: deps.react },
  zustand: { singleton: true, requiredVersion: deps.zustand },
}
```
`singleton: true` ensures only one React instance runs across all micro-apps. Without this, React hooks break across app boundaries (a common MFE pitfall).

### 2. Async bootstrap pattern
```ts
// index.ts (every app)
import('./App')  // dynamic import — NOT: import App from './App'
```
Required for Module Federation to negotiate shared modules before rendering. Skipping this causes "Shared module is not available for eager consumption" errors.

### 3. Cross-app state via Zustand
Rather than custom events or props drilling through iframes, Zustand's store is declared in `shared-store` and consumed identically in shell and both sub-apps. Because `zustand` is a singleton shared module, the same store instance is used everywhere.

### 4. Error Boundaries per micro-app
Each remote is wrapped in a React Error Boundary. If `app-accounts` fails to load (network error, deploy issue), `app-transactions` and the shell continue to function — resilience by isolation.

### 5. Environment-aware remote URLs
```js
const remotes = isProd
  ? { appAccounts: 'appAccounts@https://mfe-app-accounts.vercel.app/remoteEntry.js' }
  : { appAccounts: 'appAccounts@http://localhost:3001/remoteEntry.js' }
```
Swapping remote URLs per environment without code changes — mirrors how this is managed in production via CI/CD environment variables.

---

## Project Structure

```
mfe-fintech/
├── shell/                  # Host application (port 3000)
│   ├── src/
│   │   ├── App.tsx         # Router + layout
│   │   ├── components/
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── MicroAppLoader.tsx
│   │   └── remotes.d.ts    # TypeScript types for remote modules
│   └── webpack.config.js   # MF config: consumes remotes
│
├── app-accounts/           # Accounts micro-app (port 3001)
│   ├── src/
│   │   ├── App.tsx
│   │   └── data/accounts.ts
│   └── webpack.config.js   # MF config: exposes ./App
│
├── app-transactions/       # Transactions micro-app (port 3002)
│   ├── src/
│   │   ├── App.tsx
│   │   └── data/transactions.ts
│   └── webpack.config.js   # MF config: exposes ./App
│
├── shared-ui/              # Shared component library
│   └── src/components/
│       ├── Button/
│       ├── Card/
│       ├── Badge/
│       └── NavBar/
│
├── shared-store/           # Cross-app Zustand stores
│   └── src/
│       ├── userStore.ts
│       └── themeStore.ts
│
└── pnpm-workspace.yaml     # Monorepo config
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Module Federation | Webpack 5 |
| Framework | React 18 |
| Language | TypeScript 5 |
| State Management | Zustand 4 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 |
| Monorepo | pnpm workspaces |
| Deployment | Vercel (3 independent deployments) |

---

## Running Locally

Requires: Node 18+, pnpm 9+

```bash
# Install all dependencies
pnpm install

# Run all apps in parallel (shell + 2 sub-apps)
pnpm dev

# Or run individually
cd shell && pnpm dev        # http://localhost:3000
cd app-accounts && pnpm dev # http://localhost:3001
cd app-transactions && pnpm # http://localhost:3002
```

> **Important:** All three must run simultaneously. The shell fetches `remoteEntry.js` from each sub-app at runtime.

---

## Deployment (Vercel)

Each app is a separate Vercel project:

| Project | Root Directory | Build Command | Output |
|---|---|---|---|
| `mfe-shell` | `shell/` | `pnpm build` | `dist/` |
| `mfe-app-accounts` | `app-accounts/` | `pnpm build` | `dist/` |
| `mfe-app-transactions` | `app-transactions/` | `pnpm build` | `dist/` |

After deploying sub-apps, update the remote URLs in `shell/webpack.config.js` with the Vercel production URLs.

---

## Real-World Context

This demo is informed by production experience building a **Unified Employee Channel Platform** at China Minsheng Bank:
- 30,000+ DAU
- 25+ integrated sub-applications
- Micro-frontend architecture for team-level independent deployments

The key architectural patterns here (singleton shared modules, async bootstrap, cross-app state, error isolation) directly mirror production challenges and solutions.
