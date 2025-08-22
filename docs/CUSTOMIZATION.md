# Chatbot Customization Guide

## Chatbot Appearance

### Basic Configuration
```javascript
createChat({
    webhookUrl: 'YOUR_WEBHOOK_URL',
    chatWindowConfig: {
        title: 'Gutter Expert Chat',
        subtitle: 'Get instant help with your gutter needs',
        welcomeMessage: 'Hi! How can I help with your gutters today?',
        position: 'bottom-right', // bottom-left, top-right, top-left
        theme: {
            primaryColor: '#2563eb',
            secondaryColor: '#f59e0b',
            textColor: '#374151',
            backgroundColor: '#ffffff',
            borderRadius: '12px'
        }
    }
});
```

### Advanced Styling
Add custom CSS to override default styles:

```css
/* Custom chatbot button */
.n8n-chat-button {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3) !important;
}

/* Custom chat window */
.n8n-chat-window {
    border-radius: 16px !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
}

/* Custom message bubbles */
.n8n-chat-message-user {
    background: #2563eb !important;
}

.n8n-chat-message-bot {
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
}
```

## Message Configuration

### Response Types
Configure different message types in your N8N workflow:

```javascript
// Text response
{
    type: 'text',
    message: 'Your response here'
}

// Rich response with buttons
{
    type: 'rich',
    message: 'How can I help you today?',
    buttons: [
        { text: 'Get Quote', action: 'quote' },
        { text: 'Emergency Service', action: 'emergency' },
        { text: 'View Services', action: 'services' }
    ]
}

// Contact card
{
    type: 'contact',
    message: 'Contact our team:',
    phone: '(555) 123-4567',
    email: 'info@yourgutterco.com'
}
```

## Business Logic Customization

### Lead Qualification
Modify the N8N workflow to capture leads:

```javascript
// In your N8N Code node
if (intent === 'quote_request') {
    // Track lead in CRM
    await axios.post('https://your-crm.com/api/leads', {
        source: 'chatbot',
        message: userMessage,
        timestamp: new Date(),
        urgency: detectUrgency(userMessage)
    });
    
    // Return quote request response
    return {
        message: "I'll help you get a quote! Can you provide your address?",
        followUp: 'address_collection'
    };
}
```

### Service Area Detection
```javascript
function detectServiceArea(message) {
    const cities = ['Atlanta', 'Birmingham', 'Nashville', 'Memphis'];
    const mentionedCity = cities.find(city => 
        message.toLowerCase().includes(city.toLowerCase())
    );
    
    return mentionedCity || 'unknown';
}
```

### Pricing Logic
```javascript
function calculateEstimate(serviceType, details) {
    const pricing = {
        installation: { base: 12, range: [8, 15] },
        repair: { base: 250, range: [150, 400] },
        cleaning: { base: 200, range: [150, 300] }
    };
    
    const service = pricing[serviceType];
    if (!service) return null;
    
    return {
        estimate: `$${service.range[0]} - $${service.range[1]}`,
        note: 'Final price depends on specific requirements'
    };
}
```

## Integration Enhancements

### CRM Integration
```javascript
// Salesforce integration
async function createSalesforceRecord(leadData) {
    const response = await axios.post('https://your-instance.salesforce.com/services/data/v52.0/sobjects/Lead/', {
        FirstName: leadData.firstName,
        LastName: leadData.lastName,
        Email: leadData.email,
        Phone: leadData.phone,
        Company: leadData.company || 'Residential',
        LeadSource: 'Website Chatbot'
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.SALESFORCE_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}
```

### Calendar Scheduling
```javascript
// Google Calendar integration
async function scheduleAppointment(customerData, preferredTime) {
    const event = {
        summary: 'Gutter Service Appointment',
        description: `Customer: ${customerData.name}\nPhone: ${customerData.phone}\nService: ${customerData.serviceType}`,
        start: {
            dateTime: preferredTime,
            timeZone: 'America/New_York'
        },
        end: {
            dateTime: new Date(new Date(preferredTime).getTime() + 60*60*1000).toISOString(),
            timeZone: 'America/New_York'
        }
    };
    
    // Create calendar event
    const response = await googleCalendar.events.insert({
        calendarId: 'primary',
        resource: event
    });
    
    return response.data;
}
```

## Analytics & Tracking

### Conversation Analytics
```javascript
// Track conversation metrics
function trackChatMetrics(sessionData) {
    const metrics = {
        sessionId: sessionData.id,
        duration: sessionData.endTime - sessionData.startTime,
        messageCount: sessionData.messages.length,
        leadGenerated: sessionData.hasContactInfo,
        conversionType: sessionData.outcome, // quote, appointment, etc.
        userSatisfaction: sessionData.rating
    };
    
    // Send to analytics platform
    gtag('event', 'chatbot_session_complete', metrics);
}
```

### A/B Testing
```javascript
// Test different welcome messages
const welcomeMessages = [
    "Hi! How can I help with your gutters today?",
    "Welcome! Need help with gutter services?",
    "Hello! Ready to protect your home with quality gutters?"
];

const messageVariant = Math.floor(Math.random() * welcomeMessages.length);
const welcomeMessage = welcomeMessages[messageVariant];

// Track variant performance
gtag('event', 'welcome_message_variant', {
    variant: messageVariant,
    message: welcomeMessage
});
```

## Mobile Optimization

### Touch-Friendly Interface
```css
@media (max-width: 768px) {
    .n8n-chat-button {
        width: 60px !important;
        height: 60px !important;
        bottom: 20px !important;
        right: 20px !important;
    }
    
    .n8n-chat-window {
        width: 100vw !important;
        height: 100vh !important;
        bottom: 0 !important;
        right: 0 !important;
        border-radius: 0 !important;
    }
}
```

### Voice Input (Optional)
```javascript
// Add voice input capability
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        // Send voice input to chatbot
        sendMessageToChatbot(transcript);
    };
}
```
