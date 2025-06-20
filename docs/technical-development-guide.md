# Technical Development Guide

This document provides a complete overview of the tech stack and development standards.

## 1. Project Architecture

### 1.1 Structure
- Monorepo
  - packages/core — core functionality
  - packages/web — web app
  - packages/extension — Chrome extension
  - packages/ui — shared UI components
- Dependency management
  - Clear relationships
  - Version consistency
  - Minimized duplication
- Tooling
  - pnpm workspace
  - Multi-package management
  - Unified version control

### 1.2 Tech Stack

#### Core Package
- TypeScript 5.3.x
- OpenAI SDK, Google Generative AI SDK
- uuid, zod

#### Web Package
- Vue 3.5.x
- Vite 6.0.x

#### UI & Styles
- TailwindCSS 3.4.x
- Element Plus 2.9.x
- Vue Transitions

#### State
- Pinia 2.1.x
- Vue reactivity
- LocalStorage with encryption

#### Security
- WebCrypto API
- XSS protection
- CORS / CSP

#### Tools
- ESLint, Prettier
- Vitest, Playwright

## 2. Core Standards

- Consistent interfaces
- Centralized error types
- Native SDK use
- Clear type definitions
- >80% test coverage

## 3. Frontend Standards

- Modular components
- Script setup with TypeScript
- Pinia stores by feature
- Lazy loading and performance best practices
- Strong error handling

## 4. App Flows

- Core: load configs → init services → sync state
- Web: load env → init theme → mount app
- Prompt: validate → process → save results
- Model: config → test → secure keys
- Template: manage → validate → apply
- History: save → sync → clean
- Errors: unified handling, retry, degrade gracefully

## 5. Review Checklist

- Code quality: clean, commented, DRY
- Security: validate inputs, protect keys
- Performance: cache, avoid unnecessary calc
- UI: responsive, accessible, error feedback

## 6. Requirements

- Node.js >= 18
- pnpm >= 8
- Chrome >= 90, Firefox >= 90, Safari >= 14

## CORS Proxy (Vercel)
- Edge proxy for API and streaming
- No data stored
- HTTPS-secured
- 30s timeout, monthly limits
