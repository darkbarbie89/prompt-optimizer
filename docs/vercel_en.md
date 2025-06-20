## Vercel Deployment Guide

### Deployment Method Comparison

| Method | Advantages | Disadvantages |
|---------|------------|---------------|
| One-click Deployment | Fast, easy, no extra setup | Cannot auto-sync updates |
| Fork + Import | Easier to maintain, sync updates | Requires manual root directory fix for proxy to work |

---

### Recommended: Fork + Import

1. **Fork the project**
   - Fork the repo on GitHub to your account.

2. **Import into Vercel**
   - Log in to Vercel.
   - Add new project → Import your fork.
   - Deploy (will need to fix root directory later).

3. **Fix root directory**
   - In project settings → Build & Deployment → clear the root directory → Save.

4. **Redeploy**
   - Trigger redeploy from the Deployments tab.

5. **Set environment variables**
   - Add API keys (e.g., `VITE_OPENAI_API_KEY`) in Vercel settings → redeploy.

6. **Sync updates**
   - On GitHub: Sync your fork → Vercel auto-redeploys.

---

### Alternative: One-click Deploy

- Click the button below:
  [![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flinshenkx%2Fprompt-optimizer)
- Follow Vercel instructions.  
- Proxy works out of the box; no root directory fix needed.

---

### Vercel Proxy

- Enables cross-origin API requests via Vercel Edge.
- Fork + Import: works after root dir fix + redeploy.
- One-click: proxy works immediately.

**Enable in-app:** Model Management → Edit → "Use Vercel Proxy"

---

### Common Issues

- **Blank page / errors:** Check env vars and deploy logs.
- **Cannot connect to API:** Verify key, try proxy, check provider limits.
- **No proxy option:** Fix root dir, redeploy, verify `/api/vercel-status`.
- **Update project:** Fork = sync fork; One-click = manual redeploy.
- **Add domain:** Add in Vercel → update DNS as guided.
