// Simple Session Memory for N8N Window Buffer Memory
(function() {
    'use strict';
    
    // Generate session ID for this browser session
    const sessionId = 'gutter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    
    // Store in sessionStorage so it persists during page session
    if (!sessionStorage.getItem('gutterChatSessionId')) {
        sessionStorage.setItem('gutterChatSessionId', sessionId);
    }
    
    const currentSessionId = sessionStorage.getItem('gutterChatSessionId');
    console.log('🤖 Gutter Chatbot Session ID:', currentSessionId);
    
    // Wait for page to load, then enhance the chatbot
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(enhanceChatbot, 2000); // Wait for n8n chat to load
    });
    
    function enhanceChatbot() {
        // Override global fetch to inject sessionId into N8N webhook calls
        const originalFetch = window.fetch;
        
        window.fetch = function(url, options) {
            // Only modify requests to N8N webhooks
            if (options && 
                options.method === 'POST' && 
                (url.includes('webhook') || url.includes('n8n'))) {
                
                try {
                    const body = JSON.parse(options.body);
                    
                    // Add sessionId for Window Buffer Memory
                    const enhancedBody = {
                        ...body,
                        sessionId: currentSessionId,
                        chatInput: body.message // Maintain compatibility with your current setup
                    };
                    
                    options.body = JSON.stringify(enhancedBody);
                    
                    // Debug logging
                    console.log('📤 Sending to N8N:', {
                        message: body.message,
                        sessionId: currentSessionId
                    });
                    
                } catch (error) {
                    console.warn('⚠️ Failed to enhance message:', error);
                }
            }
            
            // Call original fetch
            return originalFetch.apply(this, arguments);
        };
        
        console.log('✅ Chatbot enhanced with session memory');
    }
    
    // Utility functions for debugging
    window.gutterChatDebug = {
        getSessionId: () => currentSessionId,
        resetSession: () => {
            sessionStorage.removeItem('gutterChatSessionId');
            location.reload();
        },
        log: (message) => console.log('🤖 Gutter Chat:', message)
    };
    
})();
