# Deployment Guide

## Quick Deploy to Cloudflare Pages

### Prerequisites
1. **Cloudflare Account** - Sign up at cloudflare.com
2. **GitHub Repository** - Push your code to GitHub
3. **N8N Instance** - Cloud or self-hosted n8n running

### Step-by-Step Deployment

#### 1. Configure Environment
```bash
# Copy and edit environment file
cp .env.example .env
# Edit .env with your actual values
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Test Configuration
```bash
npm run validate
npm run test
```

#### 4. Build Project
```bash
npm run build
```

#### 5. Deploy to Cloudflare
```bash
# Option A: Automatic deployment
npm run deploy

# Option B: Manual via Cloudflare Dashboard
# 1. Connect GitHub repo in Cloudflare Pages
# 2. Set build command: npm run build
# 3. Set output directory: dist
# 4. Deploy
```

### GitHub to Cloudflare Auto-Deploy

1. **Connect Repository**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave empty)

3. **Set Environment Variables**
   ```
   N8N_WEBHOOK_URL=your-webhook-url
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Future pushes to main branch will auto-deploy

### Custom Domain Setup

1. **Add Domain in Cloudflare**
   - Pages → Custom domains → Add domain
   - Enter your domain (e.g., yourguttercompany.com)

2. **Update DNS**
   - Add CNAME record pointing to your-site.pages.dev
   - Or use Cloudflare nameservers

3. **SSL Certificate**
   - Automatically provisioned by Cloudflare
   - Usually takes 5-15 minutes

### Troubleshooting

#### Common Issues
- **Build Fails**: Check Node.js version (requires 18+)
- **Chatbot Not Loading**: Verify N8N webhook URL
- **CORS Errors**: Configure headers in N8N webhook
- **Mobile Issues**: Test responsive design

#### Debug Commands
```bash
# Check build output
npm run build && ls -la dist/

# Test webhook locally
curl -X POST your-webhook-url -H "Content-Type: application/json" -d '{"message":"test"}'

# Validate package
npm run validate
```
