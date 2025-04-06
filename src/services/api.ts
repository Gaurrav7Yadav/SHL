import { MockTest } from "@/types";
import { mockTests } from "./mockData";

// API service to fetch tests based on job description
// This will connect to our backend crawler service

// Base URL for API requests
const API_BASE_URL = "http://localhost:5001/api";

/**
 * Fetch tests based on job description
 * @param jobDescription - The job description to search for
 * @returns Promise with array of matching tests
 */
export const fetchMockTests = async (jobDescription: string): Promise<MockTest[]> => {
  // If no job description, return empty array
  if (!jobDescription.trim()) {
    return [];
  }

  try {
    // Try to fetch from the backend API
    const response = await fetch(`${API_BASE_URL}/assessments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobDescription }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from API:', error);
    console.log('Falling back to mock data');
    
    // Fallback to mock data if API fails
    return fallbackToMockData(jobDescription);
  }
};

/**
 * Fallback function to use mock data when API is unavailable
 * @param jobDescription - The job description to search for
 * @returns Array of matching mock tests
 */
const fallbackToMockData = (jobDescription: string): MockTest[] => {
  // Simple keyword matching for demo purposes
  const keywords = jobDescription.toLowerCase().split(/\s+/);
  
  // Filter tests that match keywords in the job description
  const filteredTests = mockTests.filter(test => {
    const testText = `${test.title} ${test.description}`.toLowerCase();
    return keywords.some(word => 
      word.length > 3 && testText.includes(word)
    );
  });
  
  // If we have enough tests, return them
  if (filteredTests.length >= 10) {
    return filteredTests.slice(0, 10);
  } 
  // Otherwise return default tests
  else {
    return mockTests.slice(0, 10);
  }
};
