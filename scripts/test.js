#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

console.log('🧪 Testing N8N Chatbot Integration...\n');

async function testWebhook() {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
        console.error('❌ N8N_WEBHOOK_URL not found in .env file');
        return false;
    }
    
    console.log('🔗 Testing webhook:', webhookUrl);
    
    const testMessages = [
        'Hello, I need a quote for gutter installation',
        'Do you offer emergency gutter repair?',
        'How much does gutter cleaning cost?',
        'What services do you provide?'
    ];
    
    let allTestsPassed = true;
    
    for (const message of testMessages) {
        try {
            console.log(`\n📤 Sending: "${message}"`);
            
            const response = await axios.post(webhookUrl, {
                message: message,
                timestamp: new Date().toISOString(),
                test: true
            }, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data && response.data.message) {
                console.log(`📥 Response: "${response.data.message.substring(0, 100)}..."`);
                console.log('✅ Test passed');
            } else {
                console.log('❌ Invalid response format');
                allTestsPassed = false;
            }
            
        } catch (error) {
            console.log('❌ Test failed:', error.message);
            allTestsPassed = false;
        }
        
        // Wait between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return allTestsPassed;
}

async function testChatbotWidget() {
    console.log('\n🎨 Testing chatbot widget integration...');
    
    const indexPath = './frontend/index.html';
    
    if (!fs.existsSync(indexPath)) {
        console.error('❌ index.html not found');
        return false;
    }
    
    const content = fs.readFileSync(indexPath, 'utf8');
    
    // Check for required elements
    const checks = [
        {
            test: content.includes('@n8n/chat/style.css'),
            message: 'N8N CSS import'
        },
        {
            test: content.includes('@n8n/chat/chat.bundle.es.js'),
            message: 'N8N JS import'
        },
        {
            test: content.includes('createChat'),
            message: 'createChat function call'
        },
        {
            test: content.includes('webhookUrl'),
            message: 'webhookUrl configuration'
        }
    ];
    
    let allChecksPass = true;
    
    checks.forEach(check => {
        if (check.test) {
            console.log(`✅ ${check.message}`);
        } else {
            console.log(`❌ ${check.message}`);
            allChecksPass = false;
        }
    });
    
    return allChecksPass;
}

async function runTests() {
    console.log('🚀 Starting comprehensive tests...\n');
    
    const webhookTest = await testWebhook();
    const widgetTest = await testChatbotWidget();
    
    console.log('\n📊 Test Results:');
    console.log(`Webhook Integration: ${webhookTest ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Widget Integration: ${widgetTest ? '✅ PASS' : '❌ FAIL'}`);
    
    if (webhookTest && widgetTest) {
        console.log('\n🎉 All tests passed! Your chatbot is ready to deploy.');
        process.exit(0);
    } else {
        console.log('\n⚠️ Some tests failed. Please check your configuration.');
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    runTests().catch(error => {
        console.error('❌ Test runner failed:', error.message);
        process.exit(1);
    });
}

module.exports = { testWebhook, testChatbotWidget };
