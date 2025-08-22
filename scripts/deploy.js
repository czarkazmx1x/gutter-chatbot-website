#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying Gutter Chatbot to Cloudflare...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
    console.error('❌ .env file not found. Please copy .env.example to .env and configure it.');
    process.exit(1);
}

// Load environment variables
require('dotenv').config();

const requiredEnvVars = [
    'CLOUDFLARE_API_TOKEN',
    'CLOUDFLARE_ZONE_ID', 
    'CLOUDFLARE_ACCOUNT_ID',
    'N8N_WEBHOOK_URL'
];

// Validate environment variables
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    process.exit(1);
}

try {
    // Build the project
    console.log('📦 Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Update webhook URL in the HTML file
    console.log('🔧 Updating webhook URL...');
    const indexPath = path.join(__dirname, '../frontend/index.html');
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    indexContent = indexContent.replace(
        'YOUR_N8N_WEBHOOK_URL_HERE',
        process.env.N8N_WEBHOOK_URL
    );
    
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ Webhook URL updated');
    
    // Deploy to Cloudflare Pages using CLI
    console.log('☁️ Deploying to Cloudflare Pages...');
    
    const deployCommand = `npx wrangler pages deploy frontend --project-name=${process.env.CLOUDFLARE_PROJECT_NAME || 'gutter-website'}`;
    execSync(deployCommand, { stdio: 'inherit' });
    
    console.log('\n✅ Deployment complete!');
    console.log(`🌐 Your website should be available at: https://${process.env.SITE_DOMAIN || 'your-site.pages.dev'}`);
    
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
}
