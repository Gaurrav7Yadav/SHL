const { OpenAI } = require('openai');

// Initialize OpenAI client
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '', // Fallback to empty string if not provided
  });
} catch (error) {
  console.warn('OpenAI initialization failed:', error.message);
  console.warn('AI-powered matching will be disabled');
}

/**
 * Match assessments with job description using AI
 * @param {Array} assessments - List of available assessments
 * @param {String} jobDescription - User provided job description
 * @returns {Array} - Matched assessments sorted by relevance
 */
async function matchAssessmentsWithAI(assessments, jobDescription) {
  // If OpenAI is not initialized or no API key, fall back to basic matching
  if (!openai || !process.env.OPENAI_API_KEY) {
    console.log('Using fallback keyword matching (OpenAI not available)');
    return basicKeywordMatching(assessments, jobDescription);
  }
  
  try {
    // Prepare assessment data for the AI prompt
    const assessmentData = assessments.map((assessment, index) => {
      return `${index + 1}. ${assessment.title}: ${assessment.description} (Category: ${assessment.category}, Difficulty: ${assessment.difficulty})`;
    }).join('\n');
    
    // Create the prompt for OpenAI
    const prompt = `
    I have a job description and need to find the most relevant assessment tests from SHL's catalog.
    
    Job Description: "${jobDescription}"
    
    Available Assessments:
    ${assessmentData}
    
    Please analyze the job description and identify the 10 most relevant assessments from the list above.
    Return only the numbers of the assessments in order of relevance, separated by commas (e.g., "3,10,7,1,5,8,2,9,4,6").
    `;
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 100
    });
    
    // Parse the response to get assessment indices
    const content = response.choices[0].message.content.trim();
    const assessmentIndices = content.split(',').map(num => parseInt(num.trim()) - 1);
    
    // Filter out invalid indices and get the corresponding assessments
    const matchedAssessments = assessmentIndices
      .filter(index => index >= 0 && index < assessments.length)
      .map(index => assessments[index]);
    
    // If we couldn't get enough assessments from AI, supplement with basic matching
    if (matchedAssessments.length < 10) {
      const basicMatches = basicKeywordMatching(assessments, jobDescription);
      
      // Add assessments from basic matching that aren't already in AI matches
      const existingIds = new Set(matchedAssessments.map(a => a.id));
      for (const assessment of basicMatches) {
        if (!existingIds.has(assessment.id)) {
          matchedAssessments.push(assessment);
          existingIds.add(assessment.id);
          
          if (matchedAssessments.length >= 10) break;
        }
      }
    }
    
    return matchedAssessments;
  } catch (error) {
    console.error('Error in AI matching:', error);
    console.log('Falling back to basic keyword matching');
    return basicKeywordMatching(assessments, jobDescription);
  }
}

/**
 * Basic keyword matching algorithm as fallback
 * @param {Array} assessments - List of available assessments
 * @param {String} jobDescription - User provided job description
 * @returns {Array} - Matched assessments sorted by relevance
 */
function basicKeywordMatching(assessments, jobDescription) {
  const keywords = jobDescription.toLowerCase().split(/\s+/);
  
  // Filter and score assessments based on keyword matches
  const scoredAssessments = assessments.map(assessment => {
    const assessmentText = `${assessment.title} ${assessment.description} ${assessment.category}`.toLowerCase();
    
    // Calculate match score based on keyword frequency
    let score = 0;
    keywords.forEach(word => {
      if (word.length > 3 && assessmentText.includes(word)) {
        score += 1;
      }
    });
    
    return { ...assessment, score };
  });
  
  // Sort by score (descending) and return top 10
  return scoredAssessments
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

module.exports = {
  matchAssessmentsWithAI
};