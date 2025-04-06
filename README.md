# Job Test Finder - Technical Documentation

## Project Overview

The Job Test Finder is a web application that helps users find relevant assessment tests based on job descriptions. It consists of a React frontend and an Express.js backend. The application uses web scraping to collect assessment tests from SHL's product catalog and employs AI to match job descriptions with relevant assessments.

## System Architecture

### High-Level Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React Frontend │◄────►│ Express Backend │◄────►│  External APIs  │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Frontend Architecture

The frontend is built with React and TypeScript, using Vite as the build tool. It follows a component-based architecture with the following structure:

- **Pages**: Main application views (Index, NotFound)
- **Components**: Reusable UI components (SearchBar, TestResultsTable)
- **Services**: API communication layer
- **Hooks**: Custom React hooks
- **Types**: TypeScript type definitions

### Backend Architecture

The backend is built with Express.js and follows a service-oriented architecture:

- **Server**: Main Express application setup and API endpoints
- **Services**: Specialized modules for specific functionalities
  - **Crawler Service**: Web scraping functionality
  - **AI Service**: OpenAI integration for matching assessments

## Technologies Used

### Frontend

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library based on Radix UI
- **Lucide React**: Icon library

### Backend

- **Express.js**: Web framework for Node.js
- **Axios**: HTTP client for API requests
- **Cheerio**: HTML parsing and manipulation
- **Node-Cache**: In-memory caching
- **OpenAI API**: AI-powered matching
- **Dotenv**: Environment variable management

## Implementation Details

### Web Crawler Implementation

The web crawler is implemented in `crawlerService.js` and uses the following methods:

1. **scrapeAssessments()**: Main function that scrapes SHL's product catalog
   - Uses Axios to fetch the HTML content
   - Uses Cheerio to parse and extract assessment information
   - Implements multiple selector strategies to handle different page structures
   - Includes fallback mechanisms for when specific selectors don't work
   - Returns structured assessment data

```javascript
async function scrapeAssessments() {
  // Fetch HTML content from SHL website
  // Parse HTML using Cheerio
  // Extract assessment information
  // Return structured assessment data
}
```

2. **extractCategory()** and **extractDifficulty()**: Helper functions to determine assessment categories and difficulty levels based on text content

### AI Integration

The AI integration is implemented in `aiService.js` and uses the following methods:

1. **matchAssessmentsWithAI()**: Main function that matches job descriptions with assessments
   - Prepares assessment data for the AI prompt
   - Calls OpenAI API with a structured prompt
   - Parses the response to get assessment indices
   - Falls back to basic keyword matching if AI fails

```javascript
async function matchAssessmentsWithAI(assessments, jobDescription) {
  // Prepare assessment data for AI prompt
  // Call OpenAI API
  // Parse response and get matched assessments
  // Return matched assessments sorted by relevance
}
```

2. **basicKeywordMatching()**: Fallback function that uses keyword matching when AI is unavailable
   - Splits job description into keywords
   - Scores assessments based on keyword frequency
   - Returns assessments sorted by score

### Caching System

The application implements a caching system to improve performance:

1. **Node-Cache**: Used to store scraped assessments in memory
   - Configurable TTL (Time To Live) via environment variables
   - Default TTL is 24 hours

```javascript
const assessmentCache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 86400 });
```

2. **Cache Management**: The server checks the cache before scraping
   - If assessments are in cache, they are used directly
   - If not, the server scrapes new assessments and stores them in cache

### API Endpoints

The backend exposes the following API endpoints:

1. **POST /api/assessments**: Get assessments based on job description
   - Request body: `{ jobDescription: string }`
   - Response: Array of assessment objects

2. **POST /api/refresh-cache**: Manually refresh the assessment cache
   - Response: Success message with assessment count

3. **GET /api/health**: Health check endpoint
   - Response: Status information including cache status

### Frontend Components

1. **SearchBar**: Component for entering job descriptions
   - Handles user input and search submission
   - Provides visual feedback during loading

2. **TestResultsTable**: Component for displaying assessment results
   - Renders assessment data in a table format
   - Provides visual indicators for difficulty levels
   - Handles empty states and loading states

## Data Flow

1. User enters a job description in the SearchBar component
2. Frontend sends a POST request to `/api/assessments` with the job description
3. Backend checks if assessments are cached
   - If cached, uses cached assessments
   - If not, scrapes new assessments from SHL website
4. Backend uses AI to match assessments with the job description
   - If AI fails, falls back to basic keyword matching
5. Backend returns matched assessments to frontend
6. Frontend displays matched assessments in the TestResultsTable component

## Error Handling and Fallbacks

The application implements several error handling and fallback mechanisms:

1. **API Error Handling**: Frontend falls back to mock data if API fails
2. **AI Error Handling**: Backend falls back to basic keyword matching if AI fails
3. **Scraping Error Handling**: Backend implements multiple selector strategies and fallbacks
4. **User Feedback**: Toast notifications for success and error states

## Development and Deployment

### Development Setup

1. **Frontend**:
   ```bash
   npm install
   npm run dev
   ```

2. **Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```

### Environment Variables

1. **Backend**:
   - `PORT`: Server port (default: 5000)
   - `OPENAI_API_KEY`: OpenAI API key for AI matching
   - `CACHE_TTL`: Cache time-to-live in seconds (default: 86400)

### Build and Deployment

1. **Frontend**:
   ```bash
   npm run build
   ```

2. **Backend**:
   ```bash
   cd server
   npm start
   ```

## Conclusion

The Job Test Finder application demonstrates a modern web application architecture with a React frontend and Express.js backend. It leverages web scraping, AI integration, and caching to provide a seamless user experience for finding relevant assessment tests based on job descriptions.
