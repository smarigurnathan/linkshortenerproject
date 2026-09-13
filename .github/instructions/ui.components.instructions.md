---
description: Read this before creating or modifying UI components in the project.
---

# UI Standards

## Scope

This project uses shadcn/ui for all user-facing interface elements. Every UI pattern should be built from the existing shadcn component library, not from ad hoc custom components.

## Required patterns

- Use shadcn/ui primitives for buttons, forms, dialogs, inputs, cards, and other interface elements.
- Keep styling aligned to the existing Tailwind utility conventions used in the app.
- Prefer composition from the existing shadcn components in `components/ui` over inventing new UI abstractions.
- Match the project’s current design language and accessibility patterns when adding or editing UI.

## Prohibited patterns

- Creating custom components for app UI.
- Hand-rolling buttons, forms, cards, modals, or other interface elements instead of using shadcn components.
- Adding one-off styling systems or component wrappers that bypass the library.
- Introducing custom UI files outside the approved shadcn pattern.

## Related implementation points

- `components/ui`
- `app/`
- `globals.css`
- existing shadcn-based UI usage throughout the app

This is the standard for all visual implementation in the repository. Follow it before creating or modifying interface code.
