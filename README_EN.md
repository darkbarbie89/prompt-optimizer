# Prompt Optimizer 🚀

## 📖 Project Introduction

Prompt Optimizer is a powerful AI prompt optimization tool that helps you write better AI prompts and improve the quality of AI outputs. It supports both web application and Chrome extension usage.

## ✨ Core Features

- 🎯 Intelligent Optimization: One-click prompt optimization with multi-round iterative improvements to enhance AI response accuracy.
- 🔄 Comparison Testing: Real-time comparison between original and optimized prompts for intuitive demonstration of optimization effects.
- 🔄 Multi-model Integration: Support for mainstream AI models including OpenAI, Gemini, DeepSeek, etc.
- 🔒 Secure Architecture: Pure client-side processing with direct data interaction with AI service providers, bypassing intermediate servers.
- 💾 Privacy Protection: Local encrypted storage of history records and API keys to ensure data security.
- 📱 Multi-platform Support: Available as both a web application and Chrome extension.
- 🎨 User Experience: Clean and intuitive interface design with responsive layout and smooth interaction effects.

## Quick Start

### 1. Use Online Version

This is a pure frontend project with all data stored locally in your browser and never uploaded to any server.

### 2. Vercel Deployment

You can deploy to your own Vercel account:
- Fork the project and import to Vercel.
- Track updates and sync new features easily.

### 3. Docker Deployment

```bash
docker run -d -p 80:80 --restart unless-stopped --name prompt-optimizer linshen/prompt-optimizer
```

Or with API key:

```bash
docker run -d -p 80:80 \
  -e VITE_OPENAI_API_KEY=your_key \
  --restart unless-stopped \
  --name prompt-optimizer \
  linshen/prompt-optimizer
```

### 4. Docker Compose Deployment

```bash
git clone your_repo_url
cd prompt-optimizer

cat > .env << EOF
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
EOF

docker compose up -d
```

## ⚙️ API Key Configuration

### Via Interface

- Go to settings.
- Open model management.
- Enter your API key for OpenAI, Gemini, DeepSeek, etc.
- Save.

### Via Environment Variables

```bash
-e VITE_OPENAI_API_KEY=your_key
-e VITE_GEMINI_API_KEY=your_key
-e VITE_DEEPSEEK_API_KEY=your_key
```

## Local Development

```bash
git clone your_repo_url
cd prompt-optimizer
pnpm install
pnpm dev
```

## 🗺️ Roadmap

- Basic feature development
- Web app release
- Chrome extension release
- Custom model support
- Multi-model support optimization
- Internationalization support

## 📄 License

This project is licensed under the MIT License.
