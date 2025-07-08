const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const nodemailer = require('nodemailer');
require('dotenv').config();

// Import chatbot routes
const chatbotRoutes = require('./routes/chatbot');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Serve AI chatbot files
app.use('/ai_chatbot', express.static(path.join(__dirname, '..', 'ai_chatbot')));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add JSON parser for API routes

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/home', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/places', (req, res) => res.render('places'));
app.get('/contact', (req, res) => res.render('contact'));

// API Routes
app.use('/api/chatbot', chatbotRoutes);

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      text: message
    });

    // Redirect to thank-you page after successful email
    res.redirect('/thank-you');
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).send('Error sending email.');
  }
});

app.get('/thank-you', (req, res) => {
  res.send(`
    <h1>Thanks for contacting us!</h1>
    <p>We will get back to you soon.</p>
    <a href="/">Go back to home</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Nangal Tourism server running on http://localhost:${PORT}`);
});