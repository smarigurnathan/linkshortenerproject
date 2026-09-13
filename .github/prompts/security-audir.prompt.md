---
agent: ask
---

Perform a security audit of the codebase. Identify potential vulnerabilities, security risks, and areas for improvement. 

Output your findings as a markdown formatted table with the follwing columns: (ID should start at 1 and auto increment, File Path, should be an actual link to the file): "ID", "Severity", "File Path", "Line Number(s)", "Recommendation".

Next, ask the user which issues they would like to prioritize for fixing. Briefly explain why addressing these issues is important for the overall security of the codebase. The user can respond with all to select every issue, or with a comma-separated list of issue IDs.

After the user responds, run a separate subagent (#runSubagent) for each issue they selected. Each subagent should attempt to fix its assigned issue and report back using only:
subAgentSuccess: true
or
subAgentSuccess: false