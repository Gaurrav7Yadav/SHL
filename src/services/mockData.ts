
import { MockTest } from "@/types";

// Sample mock test data
export const mockTests: MockTest[] = [
  {
    id: "1",
    title: "Frontend Development Fundamentals",
    description: "Test your knowledge of HTML, CSS, and JavaScript basics",
    difficulty: "Easy",
    questions: 25,
    duration: "30 mins",
    url: "https://example.com/test/frontend-basics"
  },
  {
    id: "2",
    title: "React.js Advanced Concepts",
    description: "Deep dive into React hooks, context API and performance optimization",
    difficulty: "Hard",
    questions: 40,
    duration: "60 mins",
    url: "https://example.com/test/react-advanced"
  },
  {
    id: "3",
    title: "Node.js Backend Development",
    description: "Server-side JavaScript, API development, and Express.js",
    difficulty: "Medium",
    questions: 35,
    duration: "45 mins",
    url: "https://example.com/test/nodejs-backend"
  },
  {
    id: "4",
    title: "Full Stack Web Development",
    description: "End-to-end web application development test",
    difficulty: "Hard",
    questions: 50,
    duration: "90 mins",
    url: "https://example.com/test/fullstack-web"
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    description: "Test covering design fundamentals and user experience concepts",
    difficulty: "Medium",
    questions: 30,
    duration: "45 mins",
    url: "https://example.com/test/uiux-design"
  },
  {
    id: "6",
    title: "Data Structures & Algorithms",
    description: "Problem-solving challenges covering common DS&A concepts",
    difficulty: "Hard",
    questions: 20,
    duration: "60 mins",
    url: "https://example.com/test/dsa"
  },
  {
    id: "7",
    title: "Cloud Computing Basics",
    description: "AWS, Azure, and GCP fundamental concepts",
    difficulty: "Easy",
    questions: 25,
    duration: "30 mins",
    url: "https://example.com/test/cloud-basics"
  },
  {
    id: "8",
    title: "DevOps Engineering",
    description: "CI/CD, containerization, and infrastructure as code",
    difficulty: "Medium",
    questions: 35,
    duration: "45 mins",
    url: "https://example.com/test/devops"
  },
  {
    id: "9",
    title: "SQL and Database Management",
    description: "Database design, optimization and SQL queries",
    difficulty: "Medium",
    questions: 30,
    duration: "40 mins",
    url: "https://example.com/test/sql-database"
  },
  {
    id: "10",
    title: "Mobile App Development",
    description: "React Native and cross-platform development concepts",
    difficulty: "Medium",
    questions: 35,
    duration: "50 mins",
    url: "https://example.com/test/mobile-app"
  },
];

// Additional categories to expand mock data
const additionalCategories = [
  {
    keyword: "python",
    tests: [
      {
        id: "11",
        title: "Python Basics",
        description: "Fundamentals of Python programming language",
        difficulty: "Easy",
        questions: 25,
        duration: "30 mins",
        url: "https://example.com/test/python-basics"
      },
      {
        id: "12",
        title: "Python Data Science",
        description: "NumPy, Pandas and data analysis with Python",
        difficulty: "Medium",
        questions: 35,
        duration: "45 mins",
        url: "https://example.com/test/python-data-science"
      }
    ]
  },
  {
    keyword: "java",
    tests: [
      {
        id: "13",
        title: "Java Programming",
        description: "Core Java concepts and OOP principles",
        difficulty: "Medium",
        questions: 30,
        duration: "45 mins",
        url: "https://example.com/test/java-programming"
      },
      {
        id: "14",
        title: "Spring Framework",
        description: "Spring Boot, MVC, and dependency injection",
        difficulty: "Hard",
        questions: 40,
        duration: "60 mins",
        url: "https://example.com/test/spring-framework"
      }
    ]
  },
  {
    keyword: "product",
    tests: [
      {
        id: "15",
        title: "Product Management",
        description: "Product strategy, roadmapping, and prioritization",
        difficulty: "Medium",
        questions: 30,
        duration: "45 mins",
        url: "https://example.com/test/product-management"
      },
      {
        id: "16",
        title: "Product Analytics",
        description: "Metrics, KPIs, and data-driven decision making",
        difficulty: "Medium",
        questions: 35,
        duration: "50 mins",
        url: "https://example.com/test/product-analytics"
      }
    ]
  }
];
