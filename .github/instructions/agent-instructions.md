# Agent Instructions Template

Use this file as a concise reference for creating project-level guidance in the `/docs` directory.

## Purpose

An agent instruction file should help contributors understand a specific layer of the architecture or a coding standard without duplicating the full project README.

## Required structure

Keep each document brief and focused. Include:

- title and scope
- what this layer or standard covers
- responsibilities and boundaries
- required patterns and conventions
- prohibited or discouraged patterns
- links to the relevant implementation files or docs

## Writing rules

- Keep content concise and scannable.
- Prefer bullet lists over long prose.
- Write in direct, actionable language.
- Match the repository’s actual structure and conventions.
- Use the project’s naming and import patterns consistently.
- Reference real files and folders instead of inventing new abstractions.

## Quality bar

The instructions should answer three things quickly:

1. What belongs here?
2. What rules must be followed?
3. What should be avoided?

## When details are missing

If the project layer or standard is not yet defined, ask for:

- the architecture layer to document
- the coding standard or practice to describe
- the relevant files or folders
- any existing conventions that must be preserved

This keeps the guidance accurate and useful for future AI-assisted work.
