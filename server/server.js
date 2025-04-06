const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const dotenv = require('dotenv');

// Import services
const { scrapeAssessments } = require('./crawlerService');
const { matchAssessmentsWithAI } = require('./aiService');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cache for storing scraped assessments (TTL from env or 24 hours)
const assessmentCache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 86400 });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Job Test Finder API is running');
});

// Endpoint to get assessments based on job description
app.post('/api/assessments', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    
    if (!jobDescription || jobDescription.trim() === '') {
      return res.status(400).json({ error: 'Job description is required' });
    }
    
    // Get assessments from cache or scrape them
    let assessments = [];
    
    if (!assessmentCache.has('all_assessments')) {
      console.log('Scraping assessments from SHL website...');
      assessments = await scrapeAssessments();
      assessmentCache.set('all_assessments', assessments);
    } else {
      console.log('Using cached assessments');
      assessments = assessmentCache.get('all_assessments');
    }
    
    // Match assessments with job description using AI
    const matchedAssessments = await matchAssessmentsWithAI(assessments, jobDescription);
    
    res.json(matchedAssessments);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Endpoint to manually refresh the assessment cache
app.post('/api/refresh-cache', async (req, res) => {
  try {
    console.log('Manually refreshing assessment cache...');
    const assessments = await scrapeAssessments();
    assessmentCache.set('all_assessments', assessments);
    res.json({ success: true, message: `Cache refreshed with ${assessments.length} assessments` });
  } catch (error) {
    console.error('Error refreshing cache:', error);
    res.status(500).json({ error: 'Failed to refresh cache' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    cache: {
      has_assessments: assessmentCache.has('all_assessments'),
      assessment_count: assessmentCache.has('all_assessments') ? assessmentCache.get('all_assessments').length : 0
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});