# AGENTS.md

This repository is a Next.js link-shortening application built with TypeScript, Tailwind CSS, Clerk authentication, and Drizzle ORM against Neon/Postgres. All contributors, including AI coding agents, must follow the standards defined in the project docs under `/docs` directory.

IMPORTANT: ALWAYS read the relevant individual instruction files within the `/docs` directory BEFORE generating ANY code or making code changes.

## Mission

Build a clean, production-minded URL shortener that:

- authenticates users with Clerk
- stores short links and metadata in Drizzle/Neon
- exposes a simple, polished UI in the App Router
- keeps server/client boundaries explicit and safe
- favors maintainability over cleverness

## Mandatory rules

- Read the relevant docs before implementing new features or refactors.
- Prefer the existing project structure and naming patterns over introducing new abstractions.
- Keep TypeScript strict and explicit; do not add `any` without a clear reason.
- Use the `@/*` path alias for imports.
- Favor server components by default; only add `"use client"` when browser interactivity is required.
- Keep business logic in `lib/`, `db/`, or route-level server actions instead of scattering it across UI files.
- Use Clerk primitives for auth-aware UI and route protection.
- Keep database schema changes in `db/schema.ts` and make sure they are consistent with Drizzle usage.
- Use Tailwind utility classes for styling and favor the existing shadcn-style component patterns in `components/ui`.
- All UI elements in this app use shadcn/ui. Do not create custom components; always use shadcn/ui components.
- Do not add dependencies unless there is a clear need and a strong project justification.
- Preserve accessibility and semantic HTML in all interactive elements.
- Keep changes minimal, focused, and aligned to the task scope.

## Documentation index

The detailed project standards are split into the following files:

- [docs/01-project-overview.md](docs/01-project-overview.md)
- [docs/02-architecture-and-stack.md](docs/02-architecture-and-stack.md)
- [docs/03-coding-standards.md](docs/03-coding-standards.md)
- [docs/04-workflow-and-quality.md](docs/04-workflow-and-quality.md)
- [docs/05-agent-instructions.md](docs/05-agent-instructions.md)
- [docs/06-authentication-and-route-protection.md](docs/06-authentication-and-route-protection.md)
- [docs/07-ui-standards.md](docs/07-ui-standards.md)

## Authentication requirements

- All auth in this app is handled by Clerk.
- No alternative auth method should be used.
- The `/dashboard` route must require an authenticated user.
- Signed-in users visiting `/` must be redirected to `/dashboard`.
- Clerk sign-in and sign-up flows must be presented as modal experiences.

## Working approach for AI agents

1. Inspect the relevant docs and the nearby files before editing.
2. Confirm the root cause or feature requirement before changing code.
3. Implement the smallest safe change that matches the current architecture.
4. Validate with the relevant project checks such as linting or a focused build step when applicable.
5. Keep code readable, consistent, and easy to extend.

When in doubt, match the style, structure, and intent of the existing application rather than inventing a new pattern.
