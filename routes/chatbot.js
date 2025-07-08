const express = require('express');
const router = express.Router();

// Mock OpenAI responses for demo purposes
const MOCK_RESPONSES = {
  attractions: [
    "🏛️ **Top Attractions in Nangal:**\n\n• **Bhakra Dam** - One of India's largest dams with breathtaking reservoir views and engineering marvel\n• **Govind Sagar Lake** - Beautiful lake perfect for boating, fishing, and photography\n• **Nangal Wetlands** - Rich biodiversity, perfect for bird watching and nature walks\n• **Shivalik Hills** - Scenic hiking trails with stunning mountain vistas\n• **Sutlej Park** - Riverside park ideal for family picnics and evening walks\n• **Shoolini Mata Temple** - Sacred spiritual site with panoramic valley views\n\nWhich attraction would you like to know more about? 🤔",
    "The **Bhakra Dam** is truly spectacular! 🌊 Built across the Sutlej River, it's one of India's highest gravity dams at 226 meters. The reservoir offers stunning views and the engineering is remarkable. Best visited during early morning or evening for photography. The dam also powers much of North India! Would you like to know about visiting hours or nearby attractions?",
    "**Shivalik Hills** offer amazing hiking experiences! 🏔️ These are part of the outer Himalayan range with elevations from 350m to 1,500m. The trails are well-marked and suitable for beginners to intermediate hikers. Best time is October to March for clear mountain views. You'll find pine forests, diverse wildlife, and breathtaking panoramic views of the valley."
  ],
  planning: [
    "📅 **Let's Plan Your Perfect Nangal Trip!**\n\n**🕐 1-Day Quick Tour:**\n• Morning: Bhakra Dam visit (2-3 hours)\n• Afternoon: Govind Sagar Lake boating\n• Evening: Sutlej Park sunset views\n\n**🕐 2-Day Comprehensive:**\n• Day 1: Dam exploration, Lake activities, Township tour\n• Day 2: Shivalik Hills hiking, Temple visit, Village cultural experience\n\n**🕐 3-Day Relaxed Experience:**\n• Day 1: Arrival + Dam and Lake exploration\n• Day 2: Nature trails + Bird watching at wetlands\n• Day 3: Cultural sites + Local shopping + Departure\n\nHow many days do you have for your trip?",
    "For a **2-day itinerary**, I recommend:\n\n**Day 1:**\n• 8 AM: Start with Bhakra Dam visit\n• 11 AM: Govind Sagar Lake boating\n• 1 PM: Lunch at lakeside restaurant\n• 3 PM: Nangal Township tour\n• 6 PM: Sunset at Sutlej Park\n\n**Day 2:**\n• 7 AM: Early morning bird watching at wetlands\n• 10 AM: Shivalik Hills hiking\n• 1 PM: Traditional Punjabi lunch\n• 3 PM: Shoolini Mata Temple visit\n• 5 PM: Local market shopping\n\nThis covers all major attractions with a good mix of nature, culture, and relaxation!"
  ],
  accommodation: [
    "🏨 **Accommodation Options in Nangal:**\n\n**🌟 Premium Hotels (₹3000-5000/night):**\n• Hotel Bhakra View - Lake facing rooms, restaurant, AC\n• Nangal Regency - Modern amenities, swimming pool\n• Dam View Resort - Scenic location, conference facilities\n\n**🏡 Mid-Range Options (₹1500-3000/night):**\n• Government Guest House - Clean, reliable, central location\n• Tourist Lodge - Basic amenities, budget-friendly\n• Sutlej Inn - Family-friendly, restaurant attached\n\n**🏠 Budget Stays (₹800-1500/night):**\n• Local Homestays - Authentic cultural experience\n• Dharamshala accommodations - Religious stay\n• Backpacker hostels - Shared facilities\n\nWhich type of accommodation suits your budget and preferences?",
    "For **budget-friendly stays**, I highly recommend local homestays! 🏠 They typically cost ₹800-1200 per night and offer:\n\n• Authentic Punjabi hospitality\n• Home-cooked traditional meals\n• Local insights and recommendations\n• Cultural exchange opportunities\n• Safe and clean environment\n\nPopular homestay areas include Bhakra Village and near the wetlands. The hosts often arrange local tours and can teach you about Punjabi culture. Would you like help finding specific homestay contacts?"
  ],
  food: [
    "🍽️ **Culinary Delights of Nangal:**\n\n**🥘 Must-Try Local Specialties:**\n• **Punjabi Thali** - Complete traditional meal with variety\n• **Makki di Roti & Sarson da Saag** - Winter specialty with butter\n• **Fresh Fish Curry** - From Govind Sagar Lake\n• **Chole Bhature** - Spicy chickpeas with fried bread\n• **Lassi & Kulfi** - Traditional drinks and desserts\n• **Rajma Chawal** - Kidney beans with rice\n\n**🍴 Best Dining Spots:**\n• Hotel restaurants for multi-cuisine\n• Local dhabas for authentic roadside food\n• Lakeside cafes for scenic dining\n• Street food stalls for budget options\n\nAre you vegetarian or do you have any dietary preferences?",
    "The **fresh fish curry** from Govind Sagar Lake is absolutely delicious! 🐟 Local fishermen catch fresh fish daily, and restaurants prepare it with traditional Punjabi spices. Popular varieties include:\n\n• **Rohu curry** - Mild and flavorful\n• **Catla fish** - Rich and hearty\n• **Carp preparations** - Spicy and tangy\n\nBest places to try: Lakeside restaurants near the dam, local dhabas in Bhakra Village. The fish is usually served with rice or fresh rotis. Perfect for lunch after a morning boat ride!"
  ],
  weather: [
    "🌤️ **Best Time to Visit Nangal:**\n\n**🌸 Spring (March-May)** - EXCELLENT\n• Temperature: 15-25°C, perfect weather\n• Clear skies, ideal for photography\n• Blooming flowers and pleasant breeze\n\n**❄️ Winter (October-February)** - VERY GOOD\n• Temperature: 5-20°C, cool and comfortable\n• Crystal clear mountain views\n• Perfect for hiking and sightseeing\n\n**🌧️ Monsoon (June-September)** - GOOD\n• Temperature: 20-30°C, lush landscapes\n• Dam at full capacity (spectacular views)\n• Some outdoor activities may be limited\n\n**☀️ Summer (April-June)** - AVOID\n• Temperature: 25-40°C, uncomfortably hot\n\n**Recommendation: October-March for best experience!**",
    "**Winter months (December-February)** are magical in Nangal! ❄️\n\n• **Temperature**: 5-15°C, crisp and refreshing\n• **Activities**: Perfect for long hikes, dam visits, photography\n• **Views**: Crystal clear mountain vistas\n• **Clothing**: Light woolens needed, especially evenings\n• **Special**: Migratory birds at wetlands\n• **Food**: Hot Punjabi food tastes amazing in cool weather\n\nThe only downside is shorter daylight hours, but the clear skies make up for it. Sunrise and sunset views are absolutely stunning during winter!"
  ],
  transport: [
    "🚗 **How to Reach Nangal:**\n\n**✈️ By Air:**\n• **Chandigarh Airport** (60 km, 1.5 hours)\n• Regular flights from Delhi, Mumbai, Bangalore\n• Taxi/bus available from airport (₹1500-2000)\n\n**🚂 By Train:**\n• **Nangal Dam Railway Station** - Direct connectivity\n• Trains from Delhi (6-7 hours), Mumbai (24 hours)\n• **Anandpur Sahib** (20 km) - Alternative station\n\n**🚌 By Road:**\n• **From Delhi:** 280 km via NH-205 (5-6 hours)\n• **From Chandigarh:** 60 km (1.5 hours)\n• Regular bus services available\n\n**🚕 Local Transport:**\n• Auto-rickshaws: ₹20-100 for city rides\n• Taxi services: ₹15-20 per km\n• Bike rentals: ₹300-500 per day\n\nWhich mode of transport are you considering?",
    "**Local transportation** in Nangal is quite convenient! 🚕\n\n• **Auto-rickshaws**: Most popular, ₹20-100 for local rides\n• **Cycle rickshaws**: Eco-friendly, ₹15-50 for short distances\n• **Local taxis**: ₹15-20 per km, good for day trips\n• **Bike rentals**: ₹300-500/day, perfect for exploring\n• **Walking**: Many attractions are walkable from city center\n\n**Pro tips:**\n• Negotiate auto fares beforehand\n• Shared autos available on main routes\n• Bike rentals include helmet and basic insurance\n• Most drivers speak Hindi/Punjabi, some English\n\nFor visiting multiple attractions, I recommend hiring a taxi for the day (₹2000-3000)."
  ]
};

// Generate intelligent mock responses
function generateMockResponse(message, conversationHistory = []) {
  const lowerMessage = message.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      response: "Hello! 🙏 Welcome to Nangal Tourism! I'm your AI assistant here to help you explore the beautiful city of Nangal. I can provide detailed information about attractions, accommodation, food, transportation, and trip planning. What would you like to know?",
      suggestions: ['Main attractions', 'Plan a 2-day trip', 'Best time to visit', 'Where to stay']
    };
  }
  
  // Goodbye responses
  if (lowerMessage.includes('bye') || lowerMessage.includes('thank')) {
    return {
      response: "Thank you for using Nangal Tourism Assistant! 🙏 Have a wonderful trip to Nangal! Feel free to ask me anything anytime. Safe travels! 🛫",
      suggestions: ['Plan another trip', 'Share with friends', 'Contact information', 'Feedback']
    };
  }
  
  // Attraction-related queries
  if (lowerMessage.includes('attraction') || lowerMessage.includes('place') || lowerMessage.includes('visit') || lowerMessage.includes('see')) {
    const responses = MOCK_RESPONSES.attractions;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return {
      response: randomResponse,
      suggestions: ['Bhakra Dam details', 'Shivalik Hills hiking', 'Lake activities', 'Temple visits']
    };
  }
  
  // Planning queries
  if (lowerMessage.includes('plan') || lowerMessage.includes('trip') || lowerMessage.includes('itinerary') || lowerMessage.includes('day')) {
    const responses = MOCK_RESPONSES.planning;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return {
      response: randomResponse,
      suggestions: ['1-day itinerary', '3-day plan', 'Family activities', 'Adventure activities']
    };
  }
  
  // Accommodation queries
  if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation') || lowerMessage.includes('lodge')) {
    const responses = MOCK_RESPONSES.accommodation;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return {
      response: randomResponse,
      suggestions: ['Budget options', 'Luxury hotels', 'Homestays', 'Booking tips']
    };
  }
  
  // Food queries
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('restaurant') || lowerMessage.includes('cuisine')) {
    const responses = MOCK_RESPONSES.food;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return {
      response: randomResponse,
      suggestions: ['Vegetarian options', 'Local specialties', 'Best restaurants', 'Street food']
    };
  }
  
  // Weather/timing queries
  if (lowerMessage.includes('weather') || lowerMessage.includes('time') || lowerMessage.includes('season') || lowerMessage.includes('when')) {
    const responses = MOCK_RESPONSES.weather;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return {
      response: randomResponse,
      suggestions: ['Winter activities', 'Monsoon tips', 'Summer alternatives', 'Festival seasons']
    };
  }
  
  // Transportation queries
  if (lowerMessage.includes('transport') || lowerMessage.includes('travel') || lowerMessage.includes('reach') || lowerMessage.includes('bus') || lowerMessage.includes('train')) {
    const responses = MOCK_RESPONSES.transport;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return {
      response: randomResponse,
      suggestions: ['Flight options', 'Train bookings', 'Local transport', 'Taxi services']
    };
  }
  
  // Specific attraction queries
  if (lowerMessage.includes('bhakra') || lowerMessage.includes('dam')) {
    return {
      response: "🌊 **Bhakra Dam** is Nangal's crown jewel! At 226 meters high, it's one of India's tallest gravity dams. Built across the Sutlej River, it creates the beautiful Govind Sagar Lake.\n\n**Key Features:**\n• Engineering marvel completed in 1963\n• Powers much of North India\n• Stunning reservoir views\n• Best photography spots at sunrise/sunset\n• Guided tours available\n• Boat rides on the lake\n\n**Visiting Tips:**\n• Open 6 AM to 6 PM\n• Entry fee: ₹20 per person\n• Photography allowed\n• Parking available\n\nWould you like to know about boat rides or nearby attractions?",
      suggestions: ['Boat ride details', 'Photography tips', 'Nearby attractions', 'Best viewing spots']
    };
  }
  
  if (lowerMessage.includes('shivalik') || lowerMessage.includes('hill') || lowerMessage.includes('hiking')) {
    return {
      response: "🏔️ **Shivalik Hills** offer incredible hiking experiences! Part of the outer Himalayan range, these hills provide:\n\n**Trail Options:**\n• **Beginner**: Valley view trail (2 km, 1 hour)\n• **Intermediate**: Naina Devi trail (5 km, 3 hours)\n• **Advanced**: Peak summit trail (8 km, 5 hours)\n\n**What You'll See:**\n• Panoramic valley views\n• Dense pine forests\n• Diverse wildlife and birds\n• Ancient temples\n• Sunrise/sunset viewpoints\n\n**Best Time**: October to March\n**Equipment**: Comfortable shoes, water, light snacks\n**Guides**: Available at ₹500-800 per day\n\nWhich trail difficulty interests you?",
      suggestions: ['Beginner trails', 'Guided tours', 'Equipment rental', 'Best viewpoints']
    };
  }
  
  // Default response for unmatched queries
  return {
    response: "I'd be happy to help you explore Nangal! 🏔️✨ I'm an AI assistant with comprehensive knowledge about:\n\n**🏛️ Tourist Attractions**\n• Bhakra Dam, Govind Sagar Lake, Shivalik Hills\n• Nangal Wetlands, Sutlej Park, Temples\n\n**📅 Trip Planning**\n• Custom itineraries, activity recommendations\n• Best routes and timing\n\n**🏨 Accommodation & Dining**\n• Hotels, homestays, local cuisine\n• Budget to luxury options\n\n**🚗 Transportation**\n• How to reach, local transport\n• Travel tips and costs\n\nWhat specific aspect of Nangal would you like to explore?",
    suggestions: ['Main attractions', 'Plan a trip', 'Best time to visit', 'Where to stay']
  };
}

// Chat endpoint with mock responses
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    // Generate mock response
    const mockResponse = generateMockResponse(message, conversationHistory);

    res.json({
      response: mockResponse.response,
      suggestions: mockResponse.suggestions,
      timestamp: new Date().toISOString(),
      mode: 'demo' // Indicates this is using mock responses
    });

  } catch (error) {
    console.error('Chatbot Error:', error);
    
    res.json({
      response: "I'm having a small technical issue, but I'm still here to help! 🤖 Please try asking about Nangal's attractions, accommodation, food, or travel planning.",
      suggestions: ['Main attractions', 'Plan a trip', 'Best time to visit', 'Where to stay'],
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
});

module.exports = router;