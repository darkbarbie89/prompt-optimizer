# AI-Assisted Development Guide

## 1. Overview
- Emphasizes the importance of a structured approach to AI-assisted development.
- These guidelines help developers use AI tools efficiently, minimize token usage, and reduce errors.

## 2. Project Setup
- Create a project map (`fileNames.md`) listing all files/directories with a one-line description for each.
- Organize documentation files, such as:
  - `prd.md` (Product Requirements)
  - `app-flow.md` (Application Flow)
  - `backend-structure.md`
  - `frontend-guidelines.md`
  - `tech-stack.md`
  - `file-structure.md`

## 3. Using Claude as "Software Architect"
- Set up a dedicated Claude project to optimize prompts.
- Knowledge base should include:
  - Full file structure (`fileNames.md`)
  - Main feature requirement docs
  - Component-specific requirement docs
  - Relevant Cursor/bolt.new docs

## 4. Structured Prompt Workflow
- Use a two-step process: "system prompt" (context) + "execution prompt" (action).
- Example execution prompt:  
  _"We need to add email validation to the login form. See `src/components/login.jsx` in `fileNames.md` and `Documentation/FRD/auth.md`. Suggest an efficient modification plan for `bolt.new`."_  

## 5. Cursor Prompt Tips
- **Fix Errors**  
  Prompt: _"Analyze this error. Identify the cause and create a step-by-step solution."_
- **New Feature**  
  Prompt: _"Read the `@` description and create an implementation plan. Before coding, explain the planned changes."_  
- **Response Structure**  
  Example: _"The header is now aligned. We need a login button next. Review @login-doc and explain your method."_

## 6. Progress Tracking
- Use `progress.md`  
  Prompt: _"At the end of each step, log what was done, any errors, and how they were fixed."_  
- Use `project-status.md`  
  Prompt: _"At the end of each session, summarize from `@progress.md` and create a report for the next session."_  

## 7. Cursor Agent Tips
- Avoid over-execution by:
  - Reading doc references for scope
  - Creating a step-by-step plan with clear breakdowns
  - Providing a plan for approval before executing

## 8. `.bolt/ignore` Best Practices
- Minimize LLM context size.
- Use `.bolt/ignore` to exclude unnecessary files and directories.

## 9. Conclusion
- The goal of this approach is to empower developers to work efficiently with AI assistance.
