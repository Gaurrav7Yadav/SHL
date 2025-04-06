
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import TestResultsTable from "@/components/TestResultsTable";
import { fetchMockTests } from "@/services/api";
import { MockTest } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Clock, BookOpen, Award, Laptop, Users, BarChart } from "lucide-react";

const Index = () => {
  const [tests, setTests] = useState<MockTest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (jobDescription: string) => {
    if (!jobDescription.trim()) {
      toast({
        title: "Please enter a job description",
        description: "You need to provide some details about the job to find relevant tests",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const results = await fetchMockTests(jobDescription);
      setTests(results);
      setHasSearched(true);
      
      if (results.length === 0) {
        toast({
          title: "No tests found",
          description: "Try using different keywords or a more detailed description",
        });
      } else {
        toast({
          title: `Found ${results.length} mock tests`,
          description: "Click on any test to start practicing",
        });
      }
    } catch (error) {
      toast({
        title: "Error searching for tests",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Error fetching tests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredCategories = [
    { title: "Software Engineering", icon: <Laptop className="h-8 w-8" />, count: 120 },
    { title: "Data Science", icon: <BarChart className="h-8 w-8" />, count: 85 },
    { title: "Product Management", icon: <Award className="h-8 w-8" />, count: 67 },
    { title: "Human Resources", icon: <Users className="h-8 w-8" />, count: 42 },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Software Engineer",
      text: "The mock tests were perfectly aligned with my job description. I was able to practice exactly what I needed and landed my dream job!",
    },
    {
      name: "Sarah Johnson",
      role: "Data Analyst",
      text: "The variety of questions helped me prepare for technical interviews. I felt confident going into my interviews after using this platform.",
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      text: "Finding relevant practice tests was always difficult until I found this platform. The tests were tailored exactly to my job needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-blue-50 text-blue-600 font-medium px-4 py-1.5 rounded-full text-sm mb-6">
              Smart Test Preparation
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find the Perfect <span className="text-blue-600">Mock Tests</span> for Your Next Job
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Enter your job description and we'll find the most relevant mock tests to help you prepare and excel in your interviews.
            </p>

            <div className="mb-16">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="hidden md:block absolute top-20 left-10 w-16 h-16 bg-purple-100 rounded-full opacity-70"></div>
        <div className="hidden md:block absolute bottom-20 right-20 w-24 h-24 bg-blue-100 rounded-full opacity-60"></div>
        <div className="hidden md:block absolute bottom-40 left-40 w-12 h-12 bg-yellow-100 rounded-full opacity-60"></div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-16">
        {hasSearched ? (
          <Card className="shadow-lg border border-gray-200 bg-white rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Mock Tests
              </CardTitle>
              <CardDescription className="text-gray-600">
                Found {tests.length} tests matching your job description
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TestResultsTable tests={tests} isLoading={isLoading} />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Featured Categories */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Test Categories</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Browse our most popular test categories for different job roles and industries
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCategories.map((category, index) => (
                  <Card key={index} className="bg-white hover:shadow-md transition-shadow duration-300 border border-gray-200">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="bg-blue-50 p-4 rounded-full mb-4 text-blue-600">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                      <p className="text-gray-500 mb-2">{category.count} tests available</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section className="mb-20 bg-gray-50 py-16 px-4 rounded-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Three simple steps to find the perfect mock tests for your job preparation
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="relative flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 text-xl font-medium">1</div>
                  <h3 className="font-medium text-xl mb-3">Enter Job Details</h3>
                  <p className="text-gray-500 text-center">Paste a job posting or describe your target role in detail</p>
                </div>
                
                <div className="relative flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4 text-xl font-medium">2</div>
                  <h3 className="font-medium text-xl mb-3">Find Relevant Tests</h3>
                  <p className="text-gray-500 text-center">Our system analyzes and finds matching practice tests</p>
                </div>
                
                <div className="relative flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 text-xl font-medium">3</div>
                  <h3 className="font-medium text-xl mb-3">Practice & Prepare</h3>
                  <p className="text-gray-500 text-center">Take tests and track your progress to ace your interviews</p>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Use Our Mock Tests</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-green-50 p-2 rounded-md">
                        <BookOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Job-Specific Content</h3>
                        <p className="text-gray-600">Our tests are tailored to specific job roles and requirements</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-blue-50 p-2 rounded-md">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Timed Practice</h3>
                        <p className="text-gray-600">Simulate real interview conditions with timed test sessions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-purple-50 p-2 rounded-md">
                        <Award className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Expert-Crafted Questions</h3>
                        <p className="text-gray-600">Questions created by industry professionals with years of experience</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-6 rounded-xl">
                  <AspectRatio ratio={4/3} className="bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="text-center p-8">
                        <div className="text-5xl font-bold text-blue-600 mb-2">2000+</div>
                        <p className="text-gray-700 text-lg">Mock tests available across 50+ job categories</p>
                      </div>
                    </div>
                  </AspectRatio>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="mb-16">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Hear from job seekers who found success using our mock tests
                </p>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full border border-gray-200">
                        <CardContent className="p-6">
                          <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                          <Separator className="mb-4" />
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>
            
            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Start preparing with our comprehensive mock tests tailored to your specific job requirements.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => document.querySelector('input')?.focus()}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Start Searching
                </button>
              </div>
            </section>
          </>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Job Test Finder</h2>
            <p className="text-gray-500 mb-6">Find the perfect mock tests for your next job interview</p>
            <p className="text-gray-400 text-sm">© 2025 Job Test Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
