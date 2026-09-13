---
description: Read this before implementing any authentication in the project.
---

# Authentication and Route Protection

## Scope

This project uses Clerk for all authentication and session handling. No other authentication method, custom session layer, or alternative login flow should be introduced.

## Required patterns

- Use Clerk primitives for sign-in, sign-up, user state, and protection checks.
- Keep authentication logic limited to Clerk-managed flows only.
- Protect the `/dashboard` route so it is inaccessible to signed-out users.
- If a signed-in user visits the homepage `/`, redirect them to `/dashboard`.
- Launch Clerk sign-in and sign-up flows as a modal whenever the app triggers them from the UI.

## Prohibited patterns

- Email/password or custom auth implementations.
- Manual cookie, JWT, or session checks outside Clerk.
- Allowing anonymous access to `/dashboard`.
- Sending signed-in users to the homepage instead of `/dashboard`.
- Using full-page auth redirects when a modal-based Clerk flow is expected in the app.

## Related implementation points

- Clerk auth UI and session state
- homepage redirect logic
- protected dashboard route logic
- sign-in and sign-up entry points

This is the single source of truth for authentication behavior in this app. Follow it before adding or changing any auth-related code.
