# Project Core Experience Summary

## 📋 Core Topics
- [Architecture Design](#architecture-design) – API integration, modular structure
- [Error Handling](#error-handling) – Common issues and solutions  
- [Testing Standards](#testing-standards) – Key testing points
- [Development Practices](#development-practices) – Vue, tool configs, best practices
- [Major Bug Fixes](#major-bug-fixes) – Security and performance issues

---

## Architecture Design

### API Integration Principles
```js
export default {
  baseURL: "https://api.openai.com/v1", 
  models: ["gpt-4", "gpt-3.5"],
  apiKey: import.meta.env.VITE_API_KEY
}
```

### Modular Structure
```
src/
├─ api/        # API layer
├─ services/   # Business logic  
├─ config/     # Config management
├─ components/ # UI components
└─ prompts/    # Prompt templates
```

### LLM Service Design Notes
- **Standardized interfaces**: Use OpenAI-compatible format
- **Multi-provider support**: Identify providers via tags
- **Sensitive info**: Manage via env vars + local encryption
- **User-managed API keys**: No backend storage, keep app simple

---

## Error Handling

### Core Strategy
```js
try {
  await apiCall();
} catch (err) {
  console.error("[API Error]", err.context);
  throw new Error("Something went wrong. Please try again.");
}
```

### Common Issues Reference
| Issue | Solution | Date |
|--------|----------|-------|
| Template ID and model key confusion | Separate function IDs from API keys | 2024-03-22 |
| State sync issues | Add state sync handlers | 2024-03-22 |
| Global provider leakage | Pass model params explicitly | 2024-03-22 |

---

## Testing Standards

### Key Points
1. **Env variables**: Use `import.meta.env.VITE_*`
2. **Test isolation**: Use unique IDs to prevent conflicts
3. **Error scenarios**: Cover network errors, invalid tokens, etc.
4. **State management**: Test with isolated data, clean state

### Test Template
```js
describe("Feature test", () => {
  beforeEach(() => {
    testId = `test-${Date.now()}`;
  });
  
  it("should handle errors properly", async () => {
    await expect(func()).rejects.toThrow("Expected error");
  });
});
```

---

## Development Practices

### Vue Standards
```js
// ✅ Correct: Call composables at top level
const { data } = useFetch();

// ❌ Incorrect: Call inside lifecycle
onMounted(() => {
  const { data } = useFetch(); 
});
```

### Tool Config
```bash
npm outdated
ncu -u "eslint*"
npm run test
```

### Stream Processing
```js
const handlers = {
  onToken: (token) => result.value += token,
  onComplete: () => isLoading.value = false,
  onError: (error) => toast.error(error.message)
};
```

---

## Major Bug Fixes

### Security Fixes (2024-12-20)
| Bug Type | Risk | Status |
|----------|-------|--------|
| Incomplete UI config import validation | Medium | ✅ Fixed |
| Data migration race conditions | Medium | ✅ Fixed |
| Missing test coverage | High | ✅ Fixed |

#### Example Fix
```ts
for (const [key, value] of Object.entries(typedData.userSettings)) {
  if (!UI_SETTINGS_KEYS.includes(key as any)) {
    console.warn(`Skipping unknown UI key: ${key}`);
    continue;
  }
  if (typeof value !== 'string') {
    console.warn(`Skipping invalid type ${key}: ${typeof value}`);
    continue;
  }
  await this.storage.setItem(key, value);
}
```

---

## Key Experience Takeaways

### Config Management
- Separate business logic from API configs
- Support dynamic config updates
- Follow Vite env var standards

### Error Handling
- Full stack traces in dev
- Friendly production messages + logging
- Centralized error handling

### Testing Strategy
- Isolate test cases
- Cover edge cases
- Mock only what’s necessary

### Security
- Input whitelisting
- Prevent prototype pollution
- Ensure atomic data migrations

### Performance
- Use streaming for better UX
- Lazy load components
- Manage state efficiently
