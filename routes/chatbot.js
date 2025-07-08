const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Nangal Tourism context for AI
const NANGAL_CONTEXT = `
You are a helpful tourism assistant for Nangal, Punjab, India. You specialize in providing information about:

ATTRACTIONS:
- Bhakra Dam: One of India's largest dams, engineering marvel with breathtaking reservoir views
- Govind Sagar Lake: Beautiful lake perfect for boating, fishing, and photography
- Nangal Wetlands: Rich biodiversity, perfect for bird watching and nature walks
- Shivalik Hills: Scenic hiking trails with stunning mountain vistas, part of outer Himalayan range
- Sutlej Park: Riverside park ideal for family picnics and evening walks
- Shoolini Mata Temple: Sacred spiritual site with panoramic valley views
- Nangal Township: Well-planned modern city showcasing urban architecture
- Bhakra Village: Experience authentic local culture and traditional Punjabi lifestyle

BEST TIME TO VISIT:
- Spring (March-May): Excellent weather, 15-25°C, perfect for all activities
- Winter (October-February): Very good, 5-20°C, ideal for sightseeing
- Monsoon (June-September): Good for lush landscapes, dam at full capacity
- Summer (April-June): Avoid, can be very hot 25-40°C

ACCOMMODATION:
- Premium Hotels: Hotel Bhakra View, Nangal Regency, Dam View Resort (₹3000-5000/night)
- Mid-Range: Government Guest House, Tourist Lodge, Sutlej Inn (₹1500-3000/night)
- Budget: Local homestays, dharamshala, hostels (₹800-1500/night)

TRANSPORTATION:
- By Air: Chandigarh Airport (60km, 1.5 hours)
- By Train: Nangal Dam Railway Station, direct connectivity
- By Road: Well-connected highways, 280km from Delhi

LOCAL CUISINE:
- Punjabi Thali, Makki di Roti & Sarson da Saag, Fresh Fish Curry
- Chole Bhature, Rajma Chawal, Lassi & Kulfi

ACTIVITIES:
- Hiking, bird watching, boating, photography, cultural tours
- Dam engineering tours, village visits, temple visits

Always be helpful, friendly, and provide specific, accurate information about Nangal. Keep responses concise but informative.
`;

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: 'system',
        content: NANGAL_CONTEXT
      },
      // Add previous conversation history
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const aiResponse = completion.choices[0].message.content;

    // Generate contextual suggestions based on the response
    const suggestions = generateSuggestions(message, aiResponse);

    res.json({
      response: aiResponse,
      suggestions: suggestions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback response if AI fails
    const fallbackResponse = getFallbackResponse(req.body.message);
    
    res.json({
      response: fallbackResponse.response,
      suggestions: fallbackResponse.suggestions,
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
});

// Generate contextual suggestions
function generateSuggestions(userMessage, aiResponse) {
  const message = userMessage.toLowerCase();
  const response = aiResponse.toLowerCase();

  // Attraction-related suggestions
  if (message.includes('attraction') || message.includes('place') || message.includes('visit')) {
    return [
      'Tell me about Bhakra Dam',
      'What activities at Govind Sagar Lake?',
      'Shivalik Hills hiking trails',
      'Best photography spots'
    ];
  }

  // Planning-related suggestions
  if (message.includes('plan') || message.includes('trip') || message.includes('itinerary')) {
    return [
      'Best time to visit Nangal?',
      'Where to stay in Nangal?',
      'Local transportation options',
      'Must-try local food'
    ];
  }

  // Accommodation-related suggestions
  if (message.includes('hotel') || message.includes('stay') || message.includes('accommodation')) {
    return [
      'Budget accommodation options',
      'Hotels near Bhakra Dam',
      'Homestay experiences',
      'Booking recommendations'
    ];
  }

  // Food-related suggestions
  if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) {
    return [
      'Vegetarian food options',
      'Best local restaurants',
      'Traditional Punjabi dishes',
      'Street food recommendations'
    ];
  }

  // Weather/timing suggestions
  if (message.includes('weather') || message.includes('time') || message.includes('season')) {
    return [
      'Winter activities in Nangal',
      'Monsoon travel tips',
      'Festival seasons',
      'Photography best times'
    ];
  }

  // Default suggestions
  return [
    'Plan a 2-day itinerary',
    'Best attractions to visit',
    'Local transportation guide',
    'Where to stay in Nangal'
  ];
}

// Fallback responses when AI is unavailable
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return {
      response: "Hello! 🙏 Welcome to Nangal Tourism! I'm here to help you explore the beautiful city of Nangal. How can I assist you today?",
      suggestions: ['Main attractions', 'Plan a trip', 'Best time to visit', 'Where to stay']
    };
  }

  if (lowerMessage.includes('attraction') || lowerMessage.includes('place')) {
    return {
      response: "🏛️ **Top Attractions in Nangal:**\n\n• **Bhakra Dam** - Engineering marvel with breathtaking views\n• **Govind Sagar Lake** - Perfect for boating and photography\n• **Nangal Wetlands** - Bird watching paradise\n• **Shivalik Hills** - Scenic hiking trails\n• **Sutlej Park** - Family-friendly riverside park\n\nWhich attraction interests you most?",
      suggestions: ['Bhakra Dam details', 'Lake activities', 'Hiking trails', 'Bird watching spots']
    };
  }

  return {
    response: "I'm here to help you explore Nangal! 🏔️ I can provide information about attractions, accommodation, food, transportation, and trip planning. What would you like to know?",
    suggestions: ['Main attractions', 'Plan a trip', 'Best time to visit', 'Where to stay']
  };
}

module.exports = router;