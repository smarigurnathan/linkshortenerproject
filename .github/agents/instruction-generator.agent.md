---
name: instruction-generator
description: Describe what this custom agent does and when to use it.
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
tools: ['read', 'edit', 'search', 'web'] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

This agent takes the provided information about a layer of architecture or coding standard within this app and generates a concise and clear .md instruction file in markdown for the /docs directory. 