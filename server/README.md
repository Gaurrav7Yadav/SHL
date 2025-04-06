# Job Test Finder Backend

This is the backend service for the Job Test Finder application. It provides a web crawler that scrapes SHL's product catalog and uses AI to match job descriptions with relevant assessments.

## Features

- Web crawler that scrapes assessment tests from SHL's product catalog
- AI-powered matching of job descriptions with relevant assessments
- Caching system to improve performance
- Fallback mechanisms when scraping or AI services are unavailable

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy the `.env` file and set your OpenAI API key
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   CACHE_TTL=86400
   ```

## Running the Server

### Development Mode

```
npm run dev
```

This will start the server with nodemon, which automatically restarts when you make changes.

### Production Mode

```
npm start
```

## API Endpoints

### POST /api/assessments

Get assessments based on a job description.

**Request Body:**
```json
{
  "jobDescription": "Frontend Developer with React experience"
}
```

**Response:**
Array of assessment objects that match the job description.

### POST /api/refresh-cache

Manually refresh the assessment cache by re-scraping the SHL website.

**Response:**
```json
{
  "success": true,
  "message": "Cache refreshed with X assessments"
}
```

### GET /api/health

Check the health status of the API.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2023-06-01T12:00:00.000Z",
  "cache": {
    "has_assessments": true,
    "assessment_count": 12
  }
}
```

## Architecture

The backend consists of three main components:

1. **Express Server** (server.js): Handles HTTP requests and responses
2. **Crawler Service** (crawlerService.js): Scrapes assessment data from SHL's website
3. **AI Service** (aiService.js): Matches job descriptions with relevant assessments

The system uses a caching mechanism to store scraped assessments for 24 hours (configurable) to improve performance and reduce load on SHL's website.

## Fallback Mechanisms

The system includes several fallback mechanisms:

1. If web scraping fails, it uses predefined assessment data
2. If AI matching fails, it falls back to keyword-based matching
3. If the backend API is unreachable, the frontend falls back to local mock data