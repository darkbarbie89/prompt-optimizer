# Development Guide

## Table of Contents

- [Local Development Setup](#local-development-setup)
- [Docker Development and Deployment](#docker-development-and-deployment)
- [Environment Variable Configuration](#environment-variable-configuration)
- [Development Workflow](#development-workflow)
- [Build and Deployment](#build-and-deployment)
- [Common Issues](#common-issues)

## Local Development Setup

### Requirements
- Node.js >= 18
- pnpm >= 8
- Git >= 2.0
- VSCode (recommended)

### Setup
```bash
# Clone the project
git clone your_repo_url
cd prompt-optimizer

# Install dependencies
pnpm install

# Start development server
pnpm dev        # Build core/ui and run web app
pnpm dev:web    # Run web app only
pnpm dev:fresh  # Reset and restart dev environment
```

## Docker Development and Deployment

### Requirements
- Docker >= 20.10.0

### Build and Run

```bash
# Get version from package.json
VERSION=$(node -p "require('./package.json').version")

# Build image
docker build -t your_namespace/prompt-optimizer:$VERSION .

# Tag as latest
docker tag your_namespace/prompt-optimizer:$VERSION your_namespace/prompt-optimizer:latest

# Run container
docker run -d -p 80:80 --restart unless-stopped --name prompt-optimizer your_namespace/prompt-optimizer:$VERSION

# Push (if using Docker Hub)
docker push your_namespace/prompt-optimizer:$VERSION
docker push your_namespace/prompt-optimizer:latest
```

Local test build:
```bash
docker build -t prompt-optimizer:test .
docker rm -f prompt-optimizer
docker run -d -p 80:80 --restart unless-stopped --name prompt-optimizer -e VITE_GEMINI_API_KEY=111 prompt-optimizer:test
```

### Multi-stage Build Notes

The Dockerfile uses multi-stage builds:
1. `base`: Node.js with pnpm
2. `builder`: Installs dependencies and builds project
3. `production`: Contains only build output and nginx

## Environment Variable Configuration

### Local Development

Create a `.env.local` file:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
VITE_CUSTOM_API_KEY=your_custom_api_key
VITE_CUSTOM_API_BASE_URL=your_custom_api_base_url
VITE_CUSTOM_API_MODEL=your_custom_model_name
```

### Docker

Set env variables with `-e`:

```bash
docker run -d -p 80:80 \
  -e VITE_OPENAI_API_KEY=your_key \
  -e VITE_CUSTOM_API_BASE_URL=your_api_url \
  prompt-optimizer
```

## Development Workflow

### Commit Format
```bash
# Format
<type>(<scope>): <subject>

# Example
feat(ui): add new prompt editor component
fix(core): fix API timeout issue
```

### Testing
```bash
pnpm test           # Run all tests
pnpm test:core      # Core package tests
pnpm test:ui        # UI package tests
pnpm test:web       # Web package tests
```

## Build and Deployment

### Local Build
```bash
pnpm build          # Build all packages
pnpm build:core
pnpm build:ui
pnpm build:web
pnpm build:ext
```

### Useful Docker Commands
```bash
docker logs -f prompt-optimizer
docker exec -it prompt-optimizer sh
docker stop prompt-optimizer
docker start prompt-optimizer
docker restart prompt-optimizer
docker rm prompt-optimizer
docker rmi prompt-optimizer
```

## Common Issues

### Dependency Issues
```bash
pnpm clean
pnpm install --force
```

### Development Environment Issues
```bash
pnpm dev:fresh
pnpm clean
rm -rf node_modules
pnpm install
```

### Build Failures
1. Check Node.js version
2. Clear build cache: `pnpm clean`
3. Reinstall dependencies: `pnpm install`
4. View build logs: `pnpm build --debug`

### Container Issues
1. Check port usage: `netstat -ano | findstr :80`
2. Check logs: `docker logs prompt-optimizer`
3. Check status: `docker ps -a`
