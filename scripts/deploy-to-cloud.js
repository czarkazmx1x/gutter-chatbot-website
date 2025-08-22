#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Gutter Chatbot Deployment Script\n');

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function deploy() {
    try {
        console.log('📋 This script will:');
        console.log('   1. Push your code to GitHub');
        console.log('   2. Deploy to Cloudflare Pages');
        console.log('   3. Set up automatic deployments\n');

        // Get GitHub repository URL
        const githubRepo = await askQuestion('🔗 Enter your GitHub repository URL (e.g., https://github.com/username/gutter-website.git): ');
        
        if (!githubRepo.trim()) {
            console.log('❌ GitHub repository URL is required!');
            process.exit(1);
        }

        console.log('\n📤 Step 1: Pushing to GitHub...');
        
        // Add GitHub remote
        try {
            execSync(`git remote add origin ${githubRepo}`, { stdio: 'inherit' });
        } catch (error) {
            // Remote might already exist
            console.log('   ℹ️ Remote origin already exists, updating...');
            execSync(`git remote set-url origin ${githubRepo}`, { stdio: 'inherit' });
        }
        
        // Push to GitHub
        console.log('   📤 Pushing to main branch...');
        execSync('git branch -M main', { stdio: 'inherit' });
        execSync('git push -u origin main', { stdio: 'inherit' });
        
        console.log('✅ Code pushed to GitHub successfully!\n');

        // Ask about Cloudflare deployment
        const deployToCloudflare = await askQuestion('☁️ Do you want to deploy to Cloudflare Pages now? (y/n): ');
        
        if (deployToCloudflare.toLowerCase() === 'y' || deployToCloudflare.toLowerCase() === 'yes') {
            console.log('\n☁️ Step 2: Deploying to Cloudflare Pages...');
            
            // Check if wrangler is installed
            try {
                execSync('npx wrangler --version', { stdio: 'pipe' });
            } catch (error) {
                console.log('   📦 Installing Cloudflare Wrangler...');
                execSync('npm install -g wrangler', { stdio: 'inherit' });
            }

            // Build the project
            console.log('   🔨 Building project...');
            execSync('npm run build', { stdio: 'inherit' });
            
            // Deploy to Cloudflare Pages
            console.log('   🚀 Deploying to Cloudflare Pages...');
            const projectName = await askQuestion('   📝 Enter Cloudflare Pages project name (default: gutter-website): ') || 'gutter-website';
            
            try {
                execSync(`npx wrangler pages deploy frontend --project-name=${projectName}`, { stdio: 'inherit' });
                console.log('✅ Deployed to Cloudflare Pages successfully!');
            } catch (error) {
                console.log('⚠️ Direct deployment failed. Setting up GitHub integration instead...');
                console.log('\n📋 Manual Setup Required:');
                console.log('   1. Go to https://dash.cloudflare.com/pages');
                console.log('   2. Click "Create a project" → "Connect to Git"');
                console.log(`   3. Select your repository: ${githubRepo}`);
                console.log('   4. Set build command: npm run build');
                console.log('   5. Set output directory: frontend');
                console.log('   6. Click "Save and Deploy"');
            }
        }

        console.log('\n🎉 Deployment Process Complete!\n');
        
        console.log('📋 Next Steps:');
        console.log('   1. Update YOUR_N8N_WEBHOOK_URL_HERE in index.html');
        console.log('   2. Set N8N Window Buffer Memory Key to: {{ $json.sessionId }}');
        console.log('   3. Test the chatbot on your live site');
        console.log('   4. Monitor N8N execution logs for sessionId');
        
        console.log('\n🔗 Useful Links:');
        console.log(`   📧 GitHub: ${githubRepo}`);
        console.log('   ☁️ Cloudflare Pages: https://dash.cloudflare.com/pages');
        console.log('   🤖 N8N: https://app.n8n.cloud (or your self-hosted instance)');

    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   - Ensure Git is configured with your credentials');
        console.log('   - Check GitHub repository exists and you have access');
        console.log('   - Verify Cloudflare account is set up');
        console.log('   - Run: git config --global user.name "Your Name"');
        console.log('   - Run: git config --global user.email "your.email@example.com"');
    } finally {
        rl.close();
    }
}

deploy();
