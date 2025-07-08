const express = require('express');
const router = express.Router();

// Comprehensive mock knowledge base for Nangal Tourism
const NANGAL_KNOWLEDGE_BASE = {
  attractions: {
    'bhakra dam': {
      name: 'Bhakra Dam',
      description: 'One of India\'s highest gravity dams at 226 meters, built across the Sutlej River',
      highlights: ['Engineering marvel', 'Govind Sagar Lake', 'Hydroelectric power generation', 'Scenic views'],
      timings: '6:00 AM - 6:00 PM',
      entry_fee: '₹20 per person',
      best_time: 'Early morning or evening for photography'
    },
    'shivalik hills': {
      name: 'Shivalik Hills',
      description: 'Part of the outer Himalayan range offering scenic hiking trails',
      highlights: ['Panoramic views', 'Pine forests', 'Wildlife spotting', 'Multiple trail options'],
      difficulty: 'Easy to Advanced trails available',
      best_time: 'October to March'
    },
    'govind sagar lake': {
      name: 'Govind Sagar Lake',
      description: 'Beautiful reservoir created by Bhakra Dam, perfect for water activities',
      highlights: ['Boating', 'Fishing', 'Photography', 'Lakeside dining'],
      activities: ['Boat rides', 'Fishing (with permits)', 'Water sports']
    },
    'nangal wetlands': {
      name: 'Nangal Wetlands',
      description: 'Rich biodiversity hotspot perfect for bird watching',
      highlights: ['Bird watching', 'Nature walks', 'Photography', 'Peaceful environment'],
      best_time: 'Early morning for bird watching'
    }
  },
  
  accommodation: {
    luxury: [
      { name: 'Hotel Bhakra View', price: '₹4000-5000', features: ['Lake view', 'Restaurant', 'AC', 'WiFi'] },
      { name: 'Nangal Regency', price: '₹3500-4500', features: ['Swimming pool', 'Conference hall', 'Spa'] },
      { name: 'Dam View Resort', price: '₹4500-6000', features: ['Scenic location', 'Multi-cuisine restaurant'] }
    ],
    midrange: [
      { name: 'Government Guest House', price: '₹2000-3000', features: ['Central location', 'Clean rooms', 'Basic amenities'] },
      { name: 'Tourist Lodge', price: '₹1500-2500', features: ['Budget-friendly', 'Restaurant', 'Parking'] },
      { name: 'Sutlej Inn', price: '₹2500-3500', features: ['Family-friendly', 'Garden', 'Room service'] }
    ],
    budget: [
      { name: 'Local Homestays', price: '₹800-1500', features: ['Cultural experience', 'Home-cooked meals', 'Local insights'] },
      { name: 'Dharamshala Stay', price: '₹500-1000', features: ['Religious accommodation', 'Simple rooms', 'Community kitchen'] },
      { name: 'Backpacker Hostels', price: '₹600-1200', features: ['Shared facilities', 'Common areas', 'Budget-friendly'] }
    ]
  },
  
  food: {
    specialties: [
      { name: 'Punjabi Thali', description: 'Complete traditional meal with variety of dishes' },
      { name: 'Makki di Roti & Sarson da Saag', description: 'Winter specialty with butter and jaggery' },
      { name: 'Fresh Fish Curry', description: 'Made from Govind Sagar Lake fish' },
      { name: 'Chole Bhature', description: 'Spicy chickpeas with fried bread' },
      { name: 'Lassi & Kulfi', description: 'Traditional drinks and desserts' }
    ],
    restaurants: [
      { name: 'Lakeside Cafes', type: 'Scenic dining', specialty: 'Multi-cuisine with lake views' },
      { name: 'Local Dhabas', type: 'Authentic', specialty: 'Traditional Punjabi food' },
      { name: 'Hotel Restaurants', type: 'Comfort dining', specialty: 'AC dining with varied menu' }
    ]
  },
  
  transportation: {
    reaching: {
      air: { airport: 'Chandigarh Airport', distance: '60 km', time: '1.5 hours', cost: '₹1500-2000 by taxi' },
      train: { station: 'Nangal Dam Railway Station', connections: 'Delhi (6-7 hours), Mumbai (24 hours)' },
      road: { 
        delhi: '280 km via NH-205 (5-6 hours)',
        chandigarh: '60 km (1.5 hours)',
        amritsar: '150 km (3 hours)'
      }
    },
    local: [
      { mode: 'Auto-rickshaw', cost: '₹20-100', best_for: 'City rides' },
      { mode: 'Taxi', cost: '₹15-20 per km', best_for: 'Day trips' },
      { mode: 'Bike rental', cost: '₹300-500 per day', best_for: 'Exploring independently' },
      { mode: 'Cycle rickshaw', cost: '₹15-50', best_for: 'Short distances, eco-friendly' }
    ]
  },
  
  weather: {
    spring: { months: 'March-May', temp: '15-25°C', rating: 'Excellent', notes: 'Perfect weather, blooming flowers' },
    winter: { months: 'October-February', temp: '5-20°C', rating: 'Very Good', notes: 'Clear views, comfortable hiking' },
    monsoon: { months: 'June-September', temp: '20-30°C', rating: 'Good', notes: 'Lush landscapes, full dam capacity' },
    summer: { months: 'April-June', temp: '25-40°C', rating: 'Avoid', notes: 'Too hot for outdoor activities' }
  },
  
  activities: {
    nature: ['Hiking in Shivalik Hills', 'Bird watching at wetlands', 'Boating on lake', 'Nature photography'],
    cultural: ['Temple visits', 'Village tours', 'Local craft workshops', 'Festival participation'],
    adventure: ['Trekking', 'Water sports', 'Cycling', 'Rock climbing (guided)'],
    family: ['Park visits', 'Picnics', 'Heritage walks', 'Shopping for handicrafts']
  }
};

// Intelligent response generator using only local knowledge
class NangalTourismBot {
  constructor() {
    this.knowledge = NANGAL_KNOWLEDGE_BASE;
  }
  
  generateResponse(message, conversationHistory = []) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Greeting responses
    if (this.isGreeting(lowerMessage)) {
      return this.getGreetingResponse();
    }
    
    // Goodbye responses
    if (this.isGoodbye(lowerMessage)) {
      return this.getGoodbyeResponse();
    }
    
    // Specific attraction queries
    if (lowerMessage.includes('bhakra') || lowerMessage.includes('dam')) {
      return this.getBhakraDamInfo();
    }
    
    if (lowerMessage.includes('shivalik') || lowerMessage.includes('hill')) {
      return this.getShivalikHillsInfo();
    }
    
    if (lowerMessage.includes('lake') || lowerMessage.includes('govind sagar')) {
      return this.getLakeInfo();
    }
    
    if (lowerMessage.includes('wetland') || lowerMessage.includes('bird')) {
      return this.getWetlandsInfo();
    }
    
    // Category-based responses
    if (this.isAttractionQuery(lowerMessage)) {
      return this.getAttractionsOverview();
    }
    
    if (this.isPlanningQuery(lowerMessage)) {
      return this.getPlanningInfo();
    }
    
    if (this.isAccommodationQuery(lowerMessage)) {
      return this.getAccommodationInfo();
    }
    
    if (this.isFoodQuery(lowerMessage)) {
      return this.getFoodInfo();
    }
    
    if (this.isWeatherQuery(lowerMessage)) {
      return this.getWeatherInfo();
    }
    
    if (this.isTransportQuery(lowerMessage)) {
      return this.getTransportInfo();
    }
    
    if (this.isActivityQuery(lowerMessage)) {
      return this.getActivityInfo();
    }
    
    // Default helpful response
    return this.getDefaultResponse();
  }
  
  isGreeting(message) {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'];
    return greetings.some(greeting => message.includes(greeting));
  }
  
  isGoodbye(message) {
    const goodbyes = ['bye', 'goodbye', 'thank you', 'thanks', 'see you'];
    return goodbyes.some(goodbye => message.includes(goodbye));
  }
  
  isAttractionQuery(message) {
    const keywords = ['attraction', 'place', 'visit', 'see', 'tourist', 'sightseeing', 'main', 'popular'];
    return keywords.some(keyword => message.includes(keyword));
  }
  
  isPlanningQuery(message) {
    const keywords = ['plan', 'trip', 'itinerary', 'schedule', 'days', 'tour'];
    return keywords.some(keyword => message.includes(keyword));
  }
  
  isAccommodationQuery(message) {
    const keywords = ['hotel', 'stay', 'accommodation', 'lodge', 'guest house', 'where', 'sleep'];
    return keywords.some(keyword => message.includes(keyword));
  }
  
  isFoodQuery(message) {
    const keywords = ['food', 'eat', 'restaurant', 'cuisine', 'dining', 'meal', 'hungry'];
    return keywords.some(keyword => message.includes(keyword));
  }
  
  isWeatherQuery(message) {
    const keywords = ['weather', 'time', 'season', 'when', 'climate', 'temperature', 'best time'];
    return keywords.some(keyword => message.includes(keyword));
  }
  
  isTransportQuery(message) {
    const keywords = ['transport', 'travel', 'reach', 'bus', 'train', 'car', 'taxi', 'how to get'];
    return keywords.some(keyword => message.includes(keyword));
  }
  
  isActivityQuery(message) {
    const keywords = ['activity', 'things to do', 'fun', 'adventure', 'recreation'];
    return keywords.some(keyword => message.includes(keyword));
  }
  
  getGreetingResponse() {
    return {
      response: "Hello! 🙏 Welcome to Nangal Tourism! I'm your virtual guide to explore the beautiful city of Nangal. I have comprehensive local knowledge about attractions, accommodation, food, transportation, and activities. How can I help you plan your perfect visit today?",
      suggestions: ['Main attractions', 'Plan a 2-day trip', 'Best time to visit', 'Where to stay']
    };
  }
  
  getGoodbyeResponse() {
    return {
      response: "Thank you for using Nangal Tourism Assistant! 🙏 Have a wonderful trip to Nangal! Feel free to ask me anything anytime. Safe travels and enjoy the beautiful sights! 🛫",
      suggestions: ['Plan another trip', 'Share feedback', 'Contact information', 'Emergency contacts']
    };
  }
  
  getBhakraDamInfo() {
    const dam = this.knowledge.attractions['bhakra dam'];
    return {
      response: `🌊 **${dam.name}** - ${dam.description}\n\n**Key Highlights:**\n${dam.highlights.map(h => `• ${h}`).join('\n')}\n\n**Visiting Information:**\n• **Timings:** ${dam.timings}\n• **Entry Fee:** ${dam.entry_fee}\n• **Best Time:** ${dam.best_time}\n• **Photography:** Allowed\n• **Parking:** Available\n\n**Activities:**\n• Dam structure tour\n• Reservoir viewpoints\n• Boat rides on Govind Sagar Lake\n• Engineering museum visit\n\nThe dam creates a stunning backdrop for photography, especially during golden hour!`,
      suggestions: ['Boat ride details', 'Photography tips', 'Nearby attractions', 'Lake activities']
    };
  }
  
  getShivalikHillsInfo() {
    const hills = this.knowledge.attractions['shivalik hills'];
    return {
      response: `🏔️ **${hills.name}** - ${hills.description}\n\n**Trail Options:**\n• **Beginner:** Valley view trail (2 km, 1 hour)\n• **Intermediate:** Temple trail (5 km, 3 hours)\n• **Advanced:** Peak summit (8 km, 5 hours)\n\n**What You'll Experience:**\n${hills.highlights.map(h => `• ${h}`).join('\n')}\n\n**Best Time:** ${hills.best_time}\n**Difficulty:** ${hills.difficulty}\n\n**Equipment Needed:**\n• Comfortable hiking shoes\n• Water bottle\n• Light snacks\n• Camera for stunning views\n\n**Local Guides:** Available at ₹500-800 per day`,
      suggestions: ['Beginner trails', 'Guided tours', 'Equipment rental', 'Best viewpoints']
    };
  }
  
  getLakeInfo() {
    const lake = this.knowledge.attractions['govind sagar lake'];
    return {
      response: `🏞️ **${lake.name}** - ${lake.description}\n\n**Key Features:**\n${lake.highlights.map(h => `• ${h}`).join('\n')}\n\n**Available Activities:**\n${lake.activities.map(a => `• ${a}`).join('\n')}\n\n**Boat Ride Details:**\n• **Duration:** 30 minutes to 2 hours\n• **Cost:** ₹100-500 per person\n• **Types:** Pedal boats, motor boats, speed boats\n• **Timings:** 8 AM - 6 PM\n\n**Fishing Information:**\n• Permits required (₹200 per day)\n• Best spots near dam wall\n• Equipment rental available\n\n**Lakeside Dining:** Multiple cafes with scenic views`,
      suggestions: ['Boat ride booking', 'Fishing permits', 'Lakeside restaurants', 'Water sports']
    };
  }
  
  getWetlandsInfo() {
    const wetlands = this.knowledge.attractions['nangal wetlands'];
    return {
      response: `🦅 **${wetlands.name}** - ${wetlands.description}\n\n**Wildlife Highlights:**\n${wetlands.highlights.map(h => `• ${h}`).join('\n')}\n\n**Bird Species You Might See:**\n• Migratory ducks (winter months)\n• Kingfishers and herons\n• Various songbirds\n• Occasional raptors\n\n**Best Visiting Times:**\n• **${wetlands.best_time}** (6-9 AM)\n• Evening hours (5-7 PM)\n• Winter months for migratory birds\n\n**What to Bring:**\n• Binoculars (rental available)\n• Camera with zoom lens\n• Comfortable walking shoes\n• Insect repellent\n\n**Guided Tours:** Nature guides available at ₹300-500`,
      suggestions: ['Bird watching tips', 'Photography guide', 'Best seasons', 'Equipment rental']
    };
  }
  
  getAttractionsOverview() {
    return {
      response: `🏛️ **Top Attractions in Nangal:**\n\n• **Bhakra Dam** - Engineering marvel with stunning reservoir views\n• **Shivalik Hills** - Scenic hiking trails with panoramic vistas\n• **Govind Sagar Lake** - Perfect for boating and water activities\n• **Nangal Wetlands** - Bird watching paradise with rich biodiversity\n• **Sutlej Park** - Riverside park ideal for family picnics\n• **Shoolini Mata Temple** - Sacred site with valley views\n• **Nangal Township** - Well-planned modern city architecture\n\n**Must-Do Experiences:**\n• Sunrise at Bhakra Dam\n• Hiking in Shivalik Hills\n• Bird watching at wetlands\n• Boat ride on the lake\n\nWhich attraction interests you most?`,
      suggestions: ['Bhakra Dam details', 'Hiking trails', 'Bird watching', 'Lake activities']
    };
  }
  
  getPlanningInfo() {
    return {
      response: `📅 **Trip Planning for Nangal:**\n\n**🕐 1-Day Quick Tour:**\n• Morning: Bhakra Dam visit (2-3 hours)\n• Afternoon: Govind Sagar Lake boating\n• Evening: Sutlej Park sunset\n\n**🕐 2-Day Comprehensive:**\n• Day 1: Dam + Lake + Township tour\n• Day 2: Shivalik Hills + Wetlands + Temple\n\n**🕐 3-Day Relaxed:**\n• Day 1: Arrival + Dam exploration\n• Day 2: Nature activities (hills + wetlands)\n• Day 3: Cultural sites + shopping + departure\n\n**Planning Tips:**\n• Book accommodation in advance\n• Carry comfortable walking shoes\n• Best months: October to March\n• Local guides enhance the experience\n\nHow many days do you have for your trip?`,
      suggestions: ['1-day itinerary', '2-day plan', 'Family activities', 'Adventure focus']
    };
  }
  
  getAccommodationInfo() {
    const acc = this.knowledge.accommodation;
    return {
      response: `🏨 **Accommodation Options in Nangal:**\n\n**🌟 Luxury Hotels (₹3500-6000/night):**\n${acc.luxury.map(h => `• **${h.name}** - ${h.price}\n  Features: ${h.features.join(', ')}`).join('\n')}\n\n**🏡 Mid-Range (₹1500-3500/night):**\n${acc.midrange.map(h => `• **${h.name}** - ${h.price}\n  Features: ${h.features.join(', ')}`).join('\n')}\n\n**🏠 Budget Options (₹500-1500/night):**\n${acc.budget.map(h => `• **${h.name}** - ${h.price}\n  Features: ${h.features.join(', ')}`).join('\n')}\n\n**Booking Tips:**\n• Advance booking recommended\n• Lake view rooms cost extra\n• Homestays offer cultural experience\n\nWhat's your preferred budget range?`,
      suggestions: ['Luxury hotels', 'Budget stays', 'Homestays', 'Booking tips']
    };
  }
  
  getFoodInfo() {
    const food = this.knowledge.food;
    return {
      response: `🍽️ **Culinary Delights of Nangal:**\n\n**🥘 Must-Try Specialties:**\n${food.specialties.map(s => `• **${s.name}** - ${s.description}`).join('\n')}\n\n**🍴 Best Dining Places:**\n${food.restaurants.map(r => `• **${r.name}** (${r.type})\n  Specialty: ${r.specialty}`).join('\n')}\n\n**🌱 Vegetarian Options:** Excellent variety available\n**🌶️ Spice Level:** Can be customized\n**💰 Price Range:** ₹150-800 per meal\n\n**Local Food Tips:**\n• Try fresh fish from Govind Sagar Lake\n• Dhabas offer authentic flavors\n• Hotel restaurants for comfort dining\n• Street food is safe and delicious\n\nAny dietary preferences or restrictions?`,
      suggestions: ['Vegetarian options', 'Local specialties', 'Best restaurants', 'Street food guide']
    };
  }
  
  getWeatherInfo() {
    const weather = this.knowledge.weather;
    return {
      response: `🌤️ **Best Time to Visit Nangal:**\n\n**🌸 Spring (${weather.spring.months})** - ${weather.spring.rating}\n• Temperature: ${weather.spring.temp}\n• ${weather.spring.notes}\n\n**❄️ Winter (${weather.winter.months})** - ${weather.winter.rating}\n• Temperature: ${weather.winter.temp}\n• ${weather.winter.notes}\n\n**🌧️ Monsoon (${weather.monsoon.months})** - ${weather.monsoon.rating}\n• Temperature: ${weather.monsoon.temp}\n• ${weather.monsoon.notes}\n\n**☀️ Summer (${weather.summer.months})** - ${weather.summer.rating}\n• Temperature: ${weather.summer.temp}\n• ${weather.summer.notes}\n\n**Recommendation:** October to March for the best experience!\n\n**What to Pack:**\n• Light woolens (winter)\n• Comfortable shoes\n• Sunscreen and hat\n• Rain gear (monsoon)`,
      suggestions: ['Winter activities', 'Monsoon tips', 'Packing guide', 'Festival seasons']
    };
  }
  
  getTransportInfo() {
    const transport = this.knowledge.transportation;
    return {
      response: `🚗 **How to Reach Nangal:**\n\n**✈️ By Air:**\n• ${transport.reaching.air.airport} (${transport.reaching.air.distance})\n• Travel time: ${transport.reaching.air.time}\n• Cost: ${transport.reaching.air.cost}\n\n**🚂 By Train:**\n• ${transport.reaching.train.station}\n• Connections: ${transport.reaching.train.connections}\n\n**🚌 By Road:**\n• From Delhi: ${transport.reaching.road.delhi}\n• From Chandigarh: ${transport.reaching.road.chandigarh}\n• From Amritsar: ${transport.reaching.road.amritsar}\n\n**🚕 Local Transportation:**\n${transport.local.map(t => `• **${t.mode}** - ${t.cost} (${t.best_for})`).join('\n')}\n\n**Pro Tips:**\n• Negotiate auto fares beforehand\n• Taxi day hire: ₹2000-3000\n• Bike rentals include helmet`,
      suggestions: ['Flight options', 'Train bookings', 'Local transport', 'Taxi services']
    };
  }
  
  getActivityInfo() {
    const activities = this.knowledge.activities;
    return {
      response: `🎯 **Activities & Things to Do:**\n\n**🌿 Nature Activities:**\n${activities.nature.map(a => `• ${a}`).join('\n')}\n\n**🏛️ Cultural Experiences:**\n${activities.cultural.map(a => `• ${a}`).join('\n')}\n\n**🏃 Adventure Activities:**\n${activities.adventure.map(a => `• ${a}`).join('\n')}\n\n**👨‍👩‍👧‍👦 Family-Friendly:**\n${activities.family.map(a => `• ${a}`).join('\n')}\n\n**Activity Costs:**\n• Guided tours: ₹500-1000 per person\n• Equipment rental: ₹200-500 per day\n• Entry fees: ₹20-100 per attraction\n\n**Booking:** Most activities can be arranged locally or through hotels`,
      suggestions: ['Adventure activities', 'Family activities', 'Cultural tours', 'Nature experiences']
    };
  }
  
  getDefaultResponse() {
    return {
      response: `I'd be happy to help you explore Nangal! 🏔️✨ I have comprehensive local knowledge about:\n\n**🏛️ Tourist Attractions**\n• Bhakra Dam, Shivalik Hills, Govind Sagar Lake\n• Nangal Wetlands, temples, and parks\n\n**📅 Trip Planning**\n• Custom itineraries for 1-3 days\n• Activity recommendations and timing\n\n**🏨 Accommodation & Dining**\n• Hotels from budget to luxury\n• Local cuisine and restaurant recommendations\n\n**🚗 Transportation**\n• How to reach Nangal\n• Local transport options and costs\n\n**🎯 Activities**\n• Nature, culture, adventure, and family activities\n\nWhat specific aspect of Nangal would you like to explore?`,
      suggestions: ['Main attractions', 'Plan a trip', 'Best time to visit', 'Where to stay']
    };
  }
}

// Initialize the bot
const nangalBot = new NangalTourismBot();

// Chat endpoint - completely self-contained, no external APIs
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Simulate realistic response time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    // Generate response using only local knowledge base
    const response = nangalBot.generateResponse(message, conversationHistory);

    res.json({
      response: response.response,
      suggestions: response.suggestions,
      timestamp: new Date().toISOString(),
      mode: 'local_knowledge', // Indicates this uses only local data
      source: 'Nangal Tourism Knowledge Base'
    });

  } catch (error) {
    console.error('Chatbot Error:', error);
    
    res.json({
      response: "I'm having a small technical issue, but I'm still here to help! 🤖 Please try asking about Nangal's attractions, accommodation, food, or travel planning. All my knowledge is stored locally, so no internet connection issues!",
      suggestions: ['Main attractions', 'Plan a trip', 'Best time to visit', 'Where to stay'],
      timestamp: new Date().toISOString(),
      fallback: true,
      mode: 'local_knowledge'
    });
  }
});

module.exports = router;