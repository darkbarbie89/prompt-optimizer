# Project Structure Document

> **Note:** This document focuses on the file and directory structure of the project.

## 1. Top-Level Structure

```
prompt-optimizer/
├── packages/             # Project packages
│   ├── core/            # Core functionality
│   │   ├── src/         # Core source code
│   │   ├── tests/       # Core tests
│   │   └── package.json # Core package config
│   ├── web/             # Web app
│   │   ├── src/         # Web source code
│   │   ├── tests/       # Web tests
│   │   └── package.json # Web package config
│   └── extension/       # Chrome extension
├── docs/                # Documentation
├── tools/               # Utility scripts
└── ...config files
```

### Config Files
- `pnpm-workspace.yaml` — Workspace config
- `.env.example` — Example env vars
- `package.json` — Project config
- `.vscode/` — VSCode settings
- `.cursorrules` — Cursor IDE settings
- `.windsurfrules` — Windsurf IDE settings
- `.gitignore` — Git ignore rules

### Workspace Files
- `README.md` — Project intro
- `scratchpad.md` — Notes / planning
- `experience.md` — Lessons learned
- `cursor_tips.md` — AI dev tips

### Docs Directory (`docs/`)
- `README.md` — Docs index
- `development-guidelines.md` — Dev guidelines
- `project-status.md` — Status info
- `project-structure.md` — This file
- `technical-documentation.md` — Tech docs
- `prd.md` — Product requirements
- `CHANGELOG.md` — Changelog

## 2. Core Package (`packages/core`)

### Source (`src/`)
```
src/
├── services/
│   ├── llm/
│   │   ├── service.ts
│   │   ├── types.ts
│   │   └── errors.ts
│   ├── model/
│   │   ├── manager.ts
│   │   ├── types.ts
│   │   └── defaults.ts
│   ├── prompt/
│   │   ├── service.ts
│   │   ├── types.ts
│   │   └── errors.ts
│   ├── template/
│   │   ├── manager.ts
│   │   ├── types.ts
│   │   └── defaults.ts
│   └── history/
│       ├── manager.ts
│       └── types.ts
├── types/
└── utils/
```

### API (`src/api/`)
- `api/llm.js` — LLM API wrapper

### Config (`config/`)
- `models.js` — Model configs
- `prompts.js` — Prompt templates

### Tests
```
tests/
├── unit/
│   └── services/
│       ├── llm/
│       ├── model/
│       └── prompt/
└── integration/
    └── services/
```

### Core Config
- `package.json`
- `tsconfig.json`
- `vitest.config.ts`

## 3. Web Package (`packages/web`)

### Source (`src/`)
```
src/
├── components/
│   ├── PromptPanel.vue
│   ├── ModelManager.vue
│   ├── TemplateManager.vue
│   ├── InputPanel.vue
│   └── OutputPanel.vue
├── composables/
├── services/
│   ├── llm/
│   ├── model/
│   ├── prompt/
│   ├── promptManager.js
│   └── themeManager.js
├── assets/
│   ├── images/
│   └── styles/
├── prompts/
├── App.vue
└── main.ts
```

### Components
- `PromptPanel.vue` — Prompt input & optimization
- `InputPanel.vue` — Input panel
- `OutputPanel.vue` — Output panel
- `ModelConfig.vue` — Model config
- `ThemeToggle.vue` — Theme toggle
- `LoadingSpinner.vue` — Spinner

### Tests
```
tests/
├── unit/
│   ├── components/
│   └── services/
└── integration/
    └── services/
```

### Web Config
- `package.json`
- `vite.config.ts`
- `tailwind.config.js`
- `.env.local`
- `postcss.config.js`
- `index.html`

## 4. Extension Package (`packages/extension`)

### Source (`src/`)
```
src/
├── popup/
├── background/
├── content/
└── manifest.json
```

### Config
- `package.json`
- `vite.config.ts`

## 5. Dependencies

### Core (`@prompt-optimizer/core`)
```
@openai/openai
@google/generative-ai
uuid
```

### Web (`@prompt-optimizer/web`)
```
@prompt-optimizer/core
vue
pinia
tailwindcss
```

### Extension (`@prompt-optimizer/extension`)
```
@prompt-optimizer/core
@prompt-optimizer/ui
vue
```
