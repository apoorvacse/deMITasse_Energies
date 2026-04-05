### deMITasse Energies – Full Project Documentation

A modern, production-grade React application showcasing deMITasse’s closed-loop, non-combusting thermo-chemical engine. This README documents every technology used and explains how each part works step by step.


### Quick Start

- Install dependencies:

```bash
npm install
```

- Run in development:

```bash
npm run dev
```

- Build for production:

```bash
npm run build && npm run preview
```

- Run tests:

```bash
npm run test
```


### Project Structure

```text
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images and logos
│   ├── components/            # App components (Navbar, Hero, Footer, etc.)
│   │   └── ui/                # shadcn/ui component implementations (Radix-based)
│   ├── hooks/                 # Custom hooks (toast, scroll, mobile, etc.)
│   ├── lib/                   # Utilities (e.g., className helpers)
│   ├── pages/                 # Routed pages (Index, NotFound)
│   ├── test/                  # Vitest setup and tests
│   ├── App.tsx                # Application providers, routing, toasters
│   ├── main.tsx               # React entry, root mount point
│   ├── index.css              # Tailwind base and CSS variables
│   └── App.css                # App-level styles (if any)
├── components.json            # shadcn/ui generator config
├── eslint.config.js           # ESLint configuration
├── postcss.config.js          # PostCSS + Tailwind + Autoprefixer
├── tailwind.config.ts         # Tailwind theming and scanning
├── tsconfig*.json             # TypeScript configs (app, node, base)
├── vite.config.ts             # Vite config (React SWC, aliases, dev server)
├── vitest.config.ts           # Vitest + Testing Library config
├── package.json               # Scripts and dependencies
└── index.html                 # HTML template for Vite
```


### Core Application Flow (Step by Step)

1) Entry and Mount
- File: `src/main.tsx`
- What happens:
  - Imports global styles from `src/index.css` (Tailwind layers + CSS variables).
  - Creates a root with `createRoot(...)` and renders `<App />` inside `React.StrictMode`.

2) Providers and Routing
- File: `src/App.tsx`
- What happens:
  - Creates a `QueryClient` and wraps the app in `QueryClientProvider` for data fetching and caching.
  - Wraps UI in `TooltipProvider` and mounts two toasters: `Toaster` (shadcn) and `Sonner`.
  - Sets up client-side routing via `BrowserRouter` and `Routes`:
    - `/` → `pages/Index.tsx`
    - `*` → `pages/NotFound.tsx`

3) Pages and UI Composition
- File: `src/pages/Index.tsx`
- What happens:
  - Composes the marketing page with `Navbar`, `Hero`, `StatsStrip`, `ContentBlock`, `TeamSection`, `Applications`, `Footer`.
  - Uses `framer-motion` for reveal and hover animations.
  - Uses `lucide-react` icons for consistent vector iconography.

4) 404 Handling
- File: `src/pages/NotFound.tsx`
- What happens:
  - Logs a console error with the attempted path.
  - Shows a minimal error page with a link back home.

5) Toasts and Notifications
- Files: `src/components/ui/toaster.tsx`, `src/components/ui/sonner.tsx`, `src/hooks/use-toast.ts`
- What happens:
  - Two toast systems are available:
    - shadcn/ui `Toaster` (Radix-based) for highly themeable toasts.
    - `sonner` for performant, lightweight toasts.
  - `use-toast.ts` provides an ergonomic API (`toast({ title, description })`) and manages lifecycle (open/dismiss/update) with an internal reducer and queue.

6) Styling and Theming
- Tailwind CSS with design tokens exposed via CSS variables.
- Files:
  - `src/index.css`: imports Tailwind layers and defines CSS variables (colors, radii, etc.).
  - `tailwind.config.ts`: configures content scanning, color tokens (`--accent`, `--foreground`, etc.), fonts, animations, and plugins.
  - `postcss.config.js`: enables `tailwindcss` and `autoprefixer` in the build pipeline.
- How it works:
  - Tailwind scans `./src/**/*.{ts,tsx}` and other folders to tree-shake classes.
  - CSS variables (HSL) drive light/dark and accent states. The config exposes semantic colors (e.g., `accent`, `ink`, `surface`) used across components.
  - `tailwindcss-animate` adds preset animations (e.g., accordion transitions).


### Technologies and How They Work Here

- React 18 (`react`, `react-dom`)
  - Core UI library. Uses concurrent features via `StrictMode` and function components/hooks across the app.

- Vite 5 (`vite`, `@vitejs/plugin-react-swc`)
  - Dev server and bundler. SWC accelerates TS/JSX transforms.
  - `vite.config.ts`:
    - Dev server on port `8080`, HMR overlay disabled for cleaner DX.
    - Path alias `@ → ./src` to simplify imports.
    - `dedupe` ensures singletons for `react`, `react-dom`, and `@tanstack/*`.
    - `lovable-tagger` in development for component tagging during inspections.

- TypeScript 5
  - Typed React app with multiple configs:
    - `tsconfig.json`: base references and path mapping.
    - `tsconfig.app.json`: app compiler options (React JSX, strict settings tuned for app DX, vitest globals).
    - `tsconfig.node.json`: stricter Node-side config for `vite.config.ts` type safety.

- React Router v6 (`react-router-dom`)
  - Client-side routing via `<BrowserRouter>` with declarative `<Routes>`.
  - Patterns:
    - Add new routes in `App.tsx` above the catch-all `*` route.

- TanStack Query v5 (`@tanstack/react-query`)
  - Data fetching and caching via `QueryClientProvider` in `App.tsx`.
  - Usage pattern:
    - Create queries/mutations with hooks (e.g., `useQuery`, `useMutation`).
    - Benefits: cache deduping, background updates, request retries, status-driven UI.

- Tailwind CSS 3 (`tailwindcss`, `@tailwindcss/typography`, `tailwindcss-animate`, `tailwind-merge`)
  - Utility-first styling. `tailwind-merge` helps merge variant class names correctly.
  - `@tailwindcss/typography` for rich content styling when needed.
  - Animations and tokens defined in `tailwind.config.ts` and CSS variables in `index.css`.

- shadcn/ui + Radix UI
  - UI primitives sourced from Radix and styled with Tailwind for accessibility and consistency.
  - Config in `components.json` sets up aliases and tailwind integration.
  - Many Radix packages are installed (accordion, dialog, tooltip, etc.), enabling composable UI patterns throughout `components/ui/`.

- Framer Motion (`framer-motion`)
  - Smooth animations and transitions used prominently on the landing page (hover effects, reveal-on-scroll, bars animation).

- Lucide Icons (`lucide-react`)
  - Lightweight, consistent icon set used within tiles/cards and navigation.

- Form & Validation (`react-hook-form`, `@hookform/resolvers`, `zod`)
  - For pages/forms requiring validation: RHF manages form state; Zod schemas validate; resolvers bridge them. (Packages are installed; use where needed.)

- Charts (`recharts`)
  - For data visualization when needed. (Installed and available to compose charts.)

- Carousels (`embla-carousel-react`)
  - For performant, touch-friendly carousels. (Available to components needing sliders.)

- Command Palette (`cmdk`)
  - For fuzzy command palettes. (Available if a command bar is added.)

- OTP Inputs (`input-otp`), Drawers (`vaul`), Resizable Panels (`react-resizable-panels`)
  - Ready-to-use UX primitives installed and available to build complex UIs.

- Theme Switching (`next-themes`)
  - Theme provider for class-based dark mode if/when toggles are added. Tailwind’s `darkMode: "class"` supports this integration.

- Toasts (`sonner`, shadcn `toaster`), Day Picker (`react-day-picker`), Date utils (`date-fns`)
  - Common UX needs covered and integrated into the stack.


### Linting and Code Quality

- ESLint 9 with TypeScript (`eslint`, `typescript-eslint`), React Hooks (`eslint-plugin-react-hooks`), and React Refresh rules (`eslint-plugin-react-refresh`).
- Config: `eslint.config.js`
  - Extends recommended sets for JS and TS.
  - Enables React Hooks rules.
  - Warns on exporting non-component values that might break fast refresh.
  - The repo prefers pragmatic TS settings (unused vars disabled in lint to reduce noise).


### Testing

- Unit/Component Tests: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
  - Config: `vitest.config.ts`
    - `environment: "jsdom"` for DOM APIs.
    - `setupFiles: ["./src/test/setup.ts"]` adds `@testing-library/jest-dom` matchers and polyfills (`matchMedia`).
    - Tests are auto-discovered under `src/**/*.{test,spec}.{ts,tsx}`.
  - Commands:
    - Run once: `npm run test`
    - Watch mode: `npm run test:watch`

- E2E (optional): `@playwright/test` is installed and can be configured if/when end-to-end tests are added.


### Build and Dev Server Details

- Dev Server (Vite)
  - Host: `::` (IPv6) – accessible in local networks
  - Port: `8080`
  - HMR overlay disabled (errors shown in terminal/browser console without intrusive overlay).

- Production Build
  - `npm run build` generates an optimized bundle in `dist/`.
  - `npm run preview` serves the production build locally for verification.

- Path Aliases
  - `@/* → ./src/*` across Vite, TS, and Vitest configs for consistent imports.


### Adding or Modifying Features (Step by Step)

1) Add a New Route
- Open `src/App.tsx`.
- Add a new `<Route path="/your-path" element={<YourPage />} />` above the `*` route.
- Create `src/pages/YourPage.tsx` and build your UI.

2) Fetch Data with TanStack Query
- Wrap component logic with `useQuery({ queryKey, queryFn })`.
- Place server calls in a separate module (e.g., `src/lib/api.ts`) for reuse and testability.
- Use `queryClient.invalidateQueries()` after mutations to refresh stale data.

3) Add a Toast
- Import the `toast` API from `src/hooks/use-toast` or use `sonner`’s `toast`:

```ts
import { toast } from "@/hooks/use-toast";
toast({ title: "Saved", description: "Your changes were saved." });
```

4) Create a Styled Component
- Build with Tailwind utilities and variables.
- For reusable primitives, place in `src/components/ui/` and follow shadcn patterns.
- Use `tailwind-merge` and `class-variance-authority` in `src/lib/utils.ts` helpers to compose classes safely.

5) Add Animations
- Import `motion` and/or hooks from `framer-motion`:

```tsx
import { motion } from "framer-motion";
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} />
```


### Scripts

- `dev`: start Vite dev server.
- `build`: production build.
- `build:dev`: dev-mode build (useful for debugging prod settings with dev optimizations).
- `preview`: serve built app.
- `lint`: run ESLint on the repo.
- `test`: run Vitest once.
- `test:watch`: run Vitest in watch mode.


### Deployment

- Static hosting (Netlify, Vercel, GitHub Pages, Nginx, S3+CloudFront, etc.) can serve the `dist/` output.
- Ensure fallback to `index.html` for client-side routing (single-page app). For Nginx:

```nginx
location / {
  try_files $uri /index.html;
}
```


### Notable Dependencies (Installed and Available)

- Radix primitives: `@radix-ui/react-*` (accordion, dialog, tooltip, select, etc.)
- Forms and validation: `react-hook-form`, `@hookform/resolvers`, `zod`
- Animations and motion: `framer-motion`, `tailwindcss-animate`
- Data and UX: `@tanstack/react-query`, `sonner`, `react-day-picker`, `date-fns`
- UI patterns: `cmdk` (command palette), `embla-carousel-react` (carousel), `vaul` (drawers), `react-resizable-panels`
- Icons: `lucide-react`
- Charts: `recharts`
- Class helpers: `clsx`, `tailwind-merge`, `class-variance-authority`


### Conventions and Tips

- Use `@` alias for imports from `src/` (e.g., `@/components/...`).
- Keep components small, focused, and colocate with feature folders where appropriate.
- Prefer semantic Tailwind tokens over arbitrary colors to respect theming.
- Add new UI primitives under `src/components/ui/` to keep consistency with shadcn patterns.
- Keep new routes registered in `App.tsx` above the catch-all route.


### License and Notice

- Application scaffolding and UI code are open for extension within this repository.
- deMITasse’s underlying energy technology, processes, and trade knowledge remain proprietary.
