## Vercel Deployment Guide

### Deployment Options

| Method | Pros | Cons |
|--------|------|------|
| One-click deploy | Fast, no extra setup | Cannot auto-sync with source updates |
| Fork + import | Easier to sync updates, better long-term | Requires manual root dir fix for proxy to work |

### Recommended: Fork + Import

1. **Fork the repo on GitHub**
   - Fork the project to your GitHub account.

2. **Import into Vercel**
   - Log into Vercel.
   - Add a new project, select your fork.
   - Import and deploy (root directory fix needed for proxy).

3. **Fix root directory**
   - In Vercel project settings → Build & Deployment → Root Directory → clear the value → Save.

4. **Redeploy**
   - Trigger redeploy from the Deployments tab.

5. **Add env variables**
   - Set API keys as environment variables in settings.

6. **Sync upstream**
   - Use GitHub’s Sync Fork to update your repo and trigger redeploy.

### Alternative: One-click Deploy

If you just want a quick setup:
- Click the deploy button
- Follow Vercel's guide
- Root dir is handled automatically

### Vercel Proxy

- Enables cross-origin requests via Vercel Edge.
- One-click deploy: proxy works out of the box.
- Fork + import: proxy works after root dir fix + redeploy.

### Common Issues

1. **Blank page / errors**
   - Check env vars
   - Review deploy logs

2. **Cannot connect to model API**
   - Check API key
   - Enable Vercel proxy
   - Check provider restrictions

3. **Missing proxy option**
   - Fix root dir + redeploy
   - Confirm `/api/vercel-status` works

4. **Update deployed project**
   - Fork: sync + auto redeploy
   - One-click: redeploy manually

5. **Custom domain**
   - Add domain in Vercel
   - Update DNS as instructed
