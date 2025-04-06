const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Scrape assessments from SHL website
 * @returns {Array} - List of scraped assessments
 */
async function scrapeAssessments() {
  try {
    console.log('Starting to scrape SHL product catalog...');
    const response = await axios.get('https://www.shl.com/solutions/products/product-catalog/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    const assessments = [];
    
    console.log('Parsing SHL website content...');
    
    // Try to find product cards or listings
    // These selectors are based on common patterns but may need adjustment
    const productSelectors = [
      '.product-card', '.product-item', '.product-listing',
      '.catalog-item', '.assessment-card', '.solution-card',
      'article.product', '.product-container', '.card'
    ];
    
    // Try each selector until we find products
    for (const selector of productSelectors) {
      if ($(selector).length > 0) {
        console.log(`Found ${$(selector).length} products using selector: ${selector}`);
        
        $(selector).each((index, element) => {
          const $element = $(element);
          
          // Try different selectors for title, description, etc.
          const title = $element.find('h2, h3, h4, .title, .product-title').first().text().trim() ||
                      $element.find('strong').first().text().trim();
                      
          const description = $element.find('p, .description, .product-description').text().trim() ||
                           $element.text().replace(title, '').trim().substring(0, 200);
                           
          const url = $element.find('a').attr('href') || 'https://www.shl.com/solutions/products/product-catalog/';
          
          // Try to find category information
          const category = $element.find('.category, .product-category, .tag').text().trim() || 
                         extractCategory(title, description);
          
          if (title) {
            assessments.push({
              id: String(index + 1),
              title,
              description: description || 'Professional assessment by SHL',
              difficulty: extractDifficulty(description),
              category,
              url: url.startsWith('http') ? url : `https://www.shl.com${url}`,
              questions: Math.floor(Math.random() * 30) + 20, // Placeholder
              duration: `${Math.floor(Math.random() * 60) + 30} mins` // Placeholder
            });
          }
        });
        
        // If we found products, break the loop
        if (assessments.length > 0) break;
      }
    }
    
    // If no assessments were found with specific selectors, use a more generic approach
    if (assessments.length === 0) {
      console.log('Using generic approach to extract assessments');
      
      // Look for headings that might be product titles
      $('h2, h3, h4').each((index, element) => {
        const $element = $(element);
        const title = $element.text().trim();
        
        // Skip very short titles or navigation elements
        if (title.length < 5 || $element.parents('nav, header, footer').length > 0) return;
        
        // Get the parent container that might hold the product information
        const $container = $element.closest('div, section, article');
        if (!$container.length) return;
        
        // Extract description from paragraphs or text nodes
        let description = '';
        $container.find('p').each((i, p) => {
          description += $(p).text().trim() + ' ';
        });
        
        description = description.trim();
        if (!description) {
          description = $container.clone().children('h1, h2, h3, h4, h5, h6, nav').remove().end().text().trim();
          description = description.substring(0, 200);
        }
        
        // Find a URL
        const url = $container.find('a').attr('href') || 'https://www.shl.com/solutions/products/product-catalog/';
        
        if (title && description) {
          assessments.push({
            id: String(index + 1),
            title,
            description,
            difficulty: extractDifficulty(description),
            category: extractCategory(title, description),
            url: url.startsWith('http') ? url : `https://www.shl.com${url}`,
            questions: Math.floor(Math.random() * 30) + 20,
            duration: `${Math.floor(Math.random() * 60) + 30} mins`
          });
        }
      });
    }
    
    // If we still couldn't find any assessments, use fallback data
    if (assessments.length === 0) {
      console.log('Using fallback assessment data');
      return getFallbackAssessments();
    }
    
    console.log(`Successfully scraped ${assessments.length} assessments`);
    return assessments;
  } catch (error) {
    console.error('Error scraping assessments:', error);
    console.log('Using fallback assessment data due to scraping error');
    return getFallbackAssessments();
  }
}

/**
 * Extract difficulty level from description
 * @param {String} description - Assessment description
 * @returns {String} - Difficulty level (Easy, Medium, Hard)
 */
function extractDifficulty(description) {
  const text = description.toLowerCase();
  if (text.includes('advanced') || text.includes('expert') || text.includes('difficult') || 
      text.includes('complex') || text.includes('senior') || text.includes('leadership')) {
    return 'Hard';
  } else if (text.includes('intermediate') || text.includes('moderate') || 
            text.includes('standard') || text.includes('professional')) {
    return 'Medium';
  } else {
    return 'Easy';
  }
}

/**
 * Extract category from title and description
 * @param {String} title - Assessment title
 * @param {String} description - Assessment description
 * @returns {String} - Category
 */
function extractCategory(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('leadership') || text.includes('management') || text.includes('executive')) {
    return 'Leadership';
  } else if (text.includes('sales') || text.includes('customer') || text.includes('service')) {
    return 'Sales & Customer Service';
  } else if (text.includes('technical') || text.includes('developer') || text.includes('engineering')) {
    return 'Technical';
  } else if (text.includes('cognitive') || text.includes('intelligence') || text.includes('aptitude')) {
    return 'Cognitive';
  } else if (text.includes('personality') || text.includes('behavior') || text.includes('trait')) {
    return 'Personality';
  } else if (text.includes('situational') || text.includes('judgment') || text.includes('scenario')) {
    return 'Situational Judgment';
  } else {
    return 'General';
  }
}

/**
 * Get fallback assessment data when scraping fails
 * @returns {Array} - List of fallback assessments
 */
function getFallbackAssessments() {
  return [
    {
      id: "1",
      title: "SHL Verify Cognitive Ability",
      description: "Measures critical reasoning through verbal, numerical, and inductive tests to predict job performance and learning ability.",
      difficulty: "Medium",
      category: "Cognitive",
      questions: 30,
      duration: "45 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "2",
      title: "SHL Personality Assessment (OPQ)",
      description: "Provides a comprehensive assessment of workplace behaviors and preferences to predict job performance and cultural fit.",
      difficulty: "Easy",
      category: "Personality",
      questions: 25,
      duration: "35 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "3",
      title: "SHL Situational Judgement Test",
      description: "Evaluates decision-making skills in workplace scenarios to predict job performance and cultural fit.",
      difficulty: "Medium",
      category: "Situational Judgment",
      questions: 20,
      duration: "30 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "4",
      title: "SHL Coding Assessment",
      description: "Evaluates programming skills and problem-solving abilities for technical roles.",
      difficulty: "Hard",
      category: "Technical",
      questions: 15,
      duration: "60 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "5",
      title: "SHL Leadership Assessment",
      description: "Measures leadership potential and competencies for management and executive roles.",
      difficulty: "Hard",
      category: "Leadership",
      questions: 35,
      duration: "50 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "6",
      title: "SHL Sales Assessment",
      description: "Evaluates sales aptitude and skills for sales and business development roles.",
      difficulty: "Medium",
      category: "Sales & Customer Service",
      questions: 25,
      duration: "40 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "7",
      title: "SHL Customer Service Assessment",
      description: "Measures customer service skills and aptitude for service-oriented roles.",
      difficulty: "Easy",
      category: "Sales & Customer Service",
      questions: 20,
      duration: "30 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "8",
      title: "SHL Numerical Reasoning",
      description: "Assesses ability to analyze and interpret numerical data and make logical decisions.",
      difficulty: "Medium",
      category: "Cognitive",
      questions: 18,
      duration: "25 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "9",
      title: "SHL Verbal Reasoning",
      description: "Evaluates ability to understand and analyze written information to draw logical conclusions.",
      difficulty: "Medium",
      category: "Cognitive",
      questions: 30,
      duration: "35 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "10",
      title: "SHL Inductive Reasoning",
      description: "Measures logical thinking ability and problem-solving skills using abstract patterns.",
      difficulty: "Hard",
      category: "Cognitive",
      questions: 24,
      duration: "30 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "11",
      title: "SHL Mechanical Reasoning",
      description: "Assesses understanding of mechanical concepts and physical principles for technical roles.",
      difficulty: "Medium",
      category: "Technical",
      questions: 20,
      duration: "25 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    },
    {
      id: "12",
      title: "SHL Workplace Behavior Assessment",
      description: "Evaluates workplace behaviors and preferences to predict job performance and cultural fit.",
      difficulty: "Easy",
      category: "Personality",
      questions: 40,
      duration: "45 mins",
      url: "https://www.shl.com/solutions/products/product-catalog/"
    }
  ];
}

module.exports = {
  scrapeAssessments
};