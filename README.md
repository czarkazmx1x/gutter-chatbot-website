# Gutter Website N8N Chatbot Package

This package contains everything you need to integrate an n8n chatbot into your gutter business website hosted on Cloudflare.

## 📁 Package Contents

- **Frontend Files**: HTML, CSS, and JavaScript for chatbot integration
- **N8N Workflow**: JSON file for importing into your n8n instance
- **Deployment Scripts**: Cloudflare CLI deployment automation
- **Configuration**: Environment and settings files
- **Documentation**: Setup and usage guides

## 🚀 Quick Start

1. **Set up N8N Workflow**
   ```bash
   # Import the workflow file into your n8n instance
   # File: n8n-workflows/gutter-chatbot-workflow.json
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your webhook URLs and API keys
   ```

3. **Deploy to Cloudflare**
   ```bash
   npm install
   npm run deploy
   ```

## 📋 Prerequisites

- Node.js 18+ installed
- Cloudflare CLI configured
- N8N instance running
- GitHub repository connected to Cloudflare Pages

## 🔧 Configuration

See `docs/SETUP.md` for detailed setup instructions.

## 📞 Chatbot Features

- Lead capture and qualification
- Service information and pricing
- Appointment scheduling
- Emergency contact routing
- FAQ automation
