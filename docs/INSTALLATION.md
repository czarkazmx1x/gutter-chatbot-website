# Installation Instructions

## System Requirements

- **Node.js**: Version 18 or higher
- **NPM**: Version 8 or higher  
- **Git**: For version control
- **Text Editor**: VS Code recommended
- **N8N Instance**: Cloud or self-hosted

## Installation Steps

### 1. Clone or Download Package
```bash
# If using Git
git clone https://github.com/yourusername/gutter-chatbot-package.git
cd gutter-chatbot-package

# Or download and extract the ZIP file
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your values
nano .env  # or use your preferred editor
```

### 4. Set Up N8N Workflow

#### Cloud N8N (Recommended)
1. Sign up at [n8n.cloud](https://n8n.cloud)
2. Create a new workflow
3. Import the workflow file: `n8n-workflows/gutter-chatbot-workflow.json`
4. Configure webhook settings
5. Activate the workflow
6. Copy the webhook URL to your `.env` file

#### Self-Hosted N8N
```bash
# Install N8N globally
npm install n8n -g

# Start N8N
npx n8n start

# Access at http://localhost:5678
# Import the workflow file
# Configure and activate
```

### 5. Update Configuration Files

#### Update Package.json
```json
{
  "repository": {
    "url": "https://github.com/YOURUSERNAME/YOUR-REPO.git"
  },
  "author": "Your Name <your.email@domain.com>"
}
```

#### Update HTML Content
Edit `frontend/index.html`:
- Replace "Your Gutter Company" with your business name
- Update phone numbers: (555) 123-4567 → your actual number
- Update email addresses
- Add your business address and service areas

#### Update Webhook URL
In `frontend/index.html`, find:
```javascript
webhookUrl: 'YOUR_N8N_WEBHOOK_URL_HERE'
```
Replace with your actual N8N webhook URL.

### 6. Customize Branding

#### Add Your Logo
- Add `logo.png` to `frontend/images/`
- Recommended size: 200x80 pixels
- Format: PNG with transparent background

#### Update Colors and Styling
Edit `frontend/css/styles.css`:
```css
:root {
  --primary-color: #your-brand-color;
  --secondary-color: #your-accent-color;
  --text-color: #333333;
}
```

#### Customize Chatbot Messages
Edit the N8N workflow to update:
- Welcome messages
- Service descriptions  
- Pricing information
- Contact details
- Emergency response text

### 7. Test Everything
```bash
# Validate package structure
npm run validate

# Test N8N integration
npm run test

# Build for production
npm run build
```

### 8. Deploy to Cloudflare

#### Option A: Automatic Deploy
```bash
npm run deploy
```

#### Option B: Manual Deploy via Dashboard
1. Push code to GitHub
2. Connect repository in Cloudflare Pages
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy

### 9. Final Configuration

#### DNS Setup
- Point your domain to Cloudflare Pages
- Configure SSL certificate (automatic)
- Set up redirects if needed

#### Analytics (Optional)
- Add Google Analytics ID to `.env`
- Configure conversion tracking
- Set up chatbot interaction events

#### Monitoring
- Test chatbot functionality
- Monitor N8N execution logs
- Check website performance
- Verify mobile responsiveness

## Troubleshooting

### Common Issues

#### "npm install" Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### N8N Webhook Not Working
1. Check webhook URL format
2. Verify N8N workflow is activated
3. Test webhook with curl:
   ```bash
   curl -X POST your-webhook-url \
     -H "Content-Type: application/json" \
     -d '{"message":"test"}'
   ```

#### Cloudflare Deploy Fails
1. Check Node.js version in build logs
2. Verify build command runs locally
3. Check environment variables are set
4. Review build output for errors

#### Chatbot Widget Not Appearing
1. Check browser console for errors
2. Verify CDN URLs are accessible
3. Check webhook URL is correct
4. Test with browser dev tools

### Getting Help

- **N8N Community**: [community.n8n.io](https://community.n8n.io)
- **Cloudflare Docs**: [developers.cloudflare.com](https://developers.cloudflare.com)
- **GitHub Issues**: Report bugs in your repository
- **Support Email**: Create support contact for your business

## Next Steps

After successful installation:

1. **Test thoroughly** on desktop and mobile
2. **Train your team** on the chatbot responses
3. **Monitor analytics** and user interactions  
4. **Iterate and improve** based on customer feedback
5. **Scale as needed** with additional features

Your gutter business chatbot is now ready to capture leads and serve customers 24/7!
