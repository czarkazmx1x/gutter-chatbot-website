// Main JavaScript file for Gutter Website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const estimateForm = document.getElementById('estimateForm');
    if (estimateForm) {
        estimateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                alert('Thank you! We\'ll contact you within 24 hours for your free estimate.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Sticky header effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Click-to-call tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
        phoneLink.addEventListener('click', function() {
            // Track phone clicks for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': 'header_phone'
                });
            }
        });
    });
});

// Enhanced chatbot integration helpers with session memory
window.gutterChatbot = {
    // Get session information
    getSessionInfo: function() {
        const sessionId = sessionStorage.getItem('gutterChatSessionId');
        return {
            sessionId: sessionId,
            timestamp: new Date().toISOString(),
            isActive: !!sessionId
        };
    },
    
    // Reset session (for testing)
    resetSession: function() {
        sessionStorage.removeItem('gutterChatSessionId');
        console.log('🔄 Session reset - page will reload');
        setTimeout(() => location.reload(), 1000);
    },
    
    // Function to programmatically open chatbot
    openChat: function() {
        const chatButton = document.querySelector('.n8n-chat-button');
        if (chatButton) {
            chatButton.click();
            console.log('🤖 Chatbot opened');
        } else {
            console.warn('⚠️ Chatbot button not found');
        }
    },
    
    // Function to track chatbot interactions
    trackInteraction: function(action, data) {
        const sessionInfo = this.getSessionInfo();
        console.log('📊 Tracking interaction:', { action, data, sessionInfo });
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chatbot_interaction', {
                'event_category': 'chatbot',
                'event_label': action,
                'session_id': sessionInfo.sessionId,
                'custom_parameter': data
            });
        }
    },
    
    // Debug function to show current session
    debug: function() {
        const info = this.getSessionInfo();
        console.log('🐛 Chatbot Debug Info:', info);
        return info;
    }
};

// Emergency contact modal (optional enhancement)
function showEmergencyModal() {
    const modal = document.createElement('div');
    modal.className = 'emergency-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🚨 Emergency Gutter Service</h3>
            <p>For urgent gutter issues, call us immediately:</p>
            <a href="tel:+15551234567" class="emergency-phone">(555) 123-4567</a>
            <p>Available 24/7 for storm damage and water emergencies</p>
            <button onclick="this.closest('.emergency-modal').remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Utility functions
const utils = {
    // Validate phone number format
    validatePhone: function(phone) {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    },
    
    // Validate email format
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Format phone number for display
    formatPhone: function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phone;
    }
};
