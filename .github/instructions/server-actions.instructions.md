---
description: Read this before creating or modifying server actions and database mutations.
---

# Server Actions and Mutation Guidelines

## Required patterns

- All data mutations must be performed via server actions.
- Server actions must be invoked only from client components.
- Every server action file must be named actions.ts and be colocated with the component that calls it.
- All data passed into server actions must use explicit TypeScript types; do not use FormData as the payload type.
- Validate all incoming data in every server action using zod before any database logic runs.
- Server actions must not throw errors. They should return an object with a success or error property instead.
- Every server action must verify the logged-in user first before continuing with any database operation.
- Database access must go through helper functions in the /data directory; server actions must not contain direct Drizzle queries.
- Helper functions in /data should wrap Drizzle queries and return typed results for server actions to consume.

## Prohibited patterns

- Direct database mutations from components, route handlers, or server components.
- Calling server actions from server components.
- Using FormData as the TypeScript type for server action arguments.
- Missing zod validation for mutation inputs.
- Throwing errors from server actions instead of returning structured success/error objects.
- Performing database work before checking authentication.
- Direct Drizzle usage inside server actions.

## Implementation expectation

When adding or changing a mutation, define the typed input, validate it with zod, check authentication, then call the relevant helper in /data that performs the Drizzle operation. Return a structured result object such as { success: true } or { error: "message" } rather than throwing an exception.
