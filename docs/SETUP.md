# Gutter Chatbot Setup Guide

## Step 1: N8N Instance Setup

### Requirements
- N8N cloud account or self-hosted instance
- Webhook URL for your chatbot workflow

### Create N8N Workflow
1. Log into your N8N instance
2. Create a new workflow
3. Import the provided workflow file: `n8n-workflows/gutter-chatbot-workflow.json`
4. Configure your webhook settings

## Step 2: Environment Configuration

### Copy Environment File
```bash
cp .env.example .env
```

### Configure Variables
Edit `.env` file with your specific values:

```env
# N8N Configuration
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chatbot
N8N_API_KEY=your-n8n-api-key

# Cloudflare Configuration  
CLOUDFLARE_API_TOKEN=your-cloudflare-token
CLOUDFLARE_ZONE_ID=your-zone-id
CLOUDFLARE_ACCOUNT_ID=your-account-id

# Website Configuration
SITE_DOMAIN=yoursite.com
BUSINESS_NAME=Your Gutter Company
BUSINESS_PHONE=+1-555-123-4567
BUSINESS_EMAIL=info@yoursite.com
```

## Step 3: Webhook Configuration in N8N

### Critical Settings
1. **Webhook Node**: Set response mode to "Using 'Respond to Webhook' Node"
2. **Response Node**: Add "Respond to Webhook" node to handle replies
3. **HTTP Method**: Accept POST requests
4. **Authentication**: Configure if needed

### Workflow Structure
```
Webhook → Process Input → AI/Logic → Respond to Webhook
```
## Step 4: Frontend Integration

### Add Chatbot to Your Website

1. **Include CSS and JS**
   Add to your HTML `<head>`:
   ```html
   <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/style.css" rel="stylesheet" />
   ```

2. **Initialize Chatbot**
   Add before closing `</body>`:
   ```html
   <script type="module">
   import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/chat.bundle.es.js';
   createChat({
     webhookUrl: 'YOUR_N8N_WEBHOOK_URL',
     chatWindowConfig: {
       title: 'Gutter Expert Chat',
       subtitle: 'Get instant help with your gutter needs',
       welcomeMessage: 'Hi! How can I help with your gutters today?'
     }
   });
   </script>
   ```

### Customization Options
- Position: bottom-right, bottom-left, top-right, top-left
- Colors: Primary, secondary, text colors
- Messages: Welcome, offline, error messages
- Branding: Logo, company name

## Step 5: Deployment to Cloudflare

### Using Cloudflare CLI
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

### Manual Deployment
1. Push changes to GitHub
2. Cloudflare Pages will auto-deploy
3. Verify chatbot is working

## Step 6: Testing

### Test Checklist
- [ ] Chatbot widget appears
- [ ] Can open/close chat window
- [ ] Messages send successfully
- [ ] Responses received from N8N
- [ ] Lead capture works
- [ ] Mobile responsive

### Debugging
- Check browser console for errors
- Verify N8N webhook URL is correct
- Test webhook directly with Postman
- Check N8N execution logs

## Troubleshooting

### Common Issues
1. **Blank responses**: Check webhook response mode in N8N
2. **CORS errors**: Configure proper headers in N8N
3. **Widget not loading**: Verify CDN URLs are correct
4. **Mobile issues**: Test responsive design

### Support
- N8N Community: https://community.n8n.io/
- Cloudflare Docs: https://developers.cloudflare.com/
