import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import FeaturedTools from "@/components/FeaturedTools";
import CategoryFilter from "@/components/CategoryFilter";
import ToolsByCategory from "@/components/ToolsByCategory";
import SubmitToolSection from "@/components/SubmitToolSection";
import Newsletter from "@/components/Newsletter";
import ToolCard from "@/components/ToolCard";
import { motion } from "framer-motion";
import AuthButtons from "@/components/AuthButtons";
import { Search, AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category, Tool } from "@shared/schema";
import SEO from "@/components/SEO";
import AdComponent from "@/components/AdComponent";

const Home = () => {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const activeCategory = params.get("category") || "";
  const searchQuery = params.get("q") || "";
  const useAI = params.get("ai") === "true";

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Define interfaces for AI search response
  interface AISearchResponse {
    query: string;
    results: Tool[];
    aiEnhanced: boolean;
    message?: string;
    error?: string;
  }

  // For tools search results with AI enhancement option
  const { data: searchResponse, isLoading: searchLoading, refetch: refetchSearch } = useQuery<AISearchResponse | Tool[]>({
    queryKey: ["/api/tools", { q: searchQuery, ai: useAI ? "true" : "false" }],
    enabled: searchQuery.length > 0,
  });

  // Extract search results from response
  const searchResults = Array.isArray(searchResponse) 
    ? searchResponse 
    : (searchResponse as AISearchResponse)?.results || [];
  
  const isAIEnhanced = !Array.isArray(searchResponse) && (searchResponse as AISearchResponse)?.aiEnhanced || false;
  const searchMessage = !Array.isArray(searchResponse) && (searchResponse as AISearchResponse)?.message || "";

  // Refetch search results when query changes
  useEffect(() => {
    if (searchQuery) {
      refetchSearch();
    }
  }, [searchQuery, useAI, refetchSearch]);

  // Container animation for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Define SEO metadata for the home page
  const pageTitle = searchQuery
    ? `Search Results for "${searchQuery}" | AI Tool Hub`
    : "AI Tool Hub - Find The Best AI Tools For Your Workflow";
  
  const pageDescription = searchQuery
    ? `Discover AI tools related to "${searchQuery}". Browse our curated collection with guides, prompts, and expert reviews.`
    : "Discover the perfect AI tools with our curated collection. Browse by category, read expert reviews, and find step-by-step guides with optimized prompts.";
  
  // Structured data for home page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Tool Hub",
    "description": "Find the best AI tools with guides, prompts, and reviews",
    "url": "https://aitoolhub.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aitoolhub.app/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={["AI tools", "artificial intelligence", "productivity tools", 
                   "AI software", "machine learning tools", ...(searchQuery ? [searchQuery] : [])]}
        structuredData={structuredData}
      />
    
      <Hero />
      
      {/* Top ad banner - only show on non-search pages */}
      {!searchQuery && (
        <AdComponent 
          format="leaderboard" 
          position="top" 
          className="mt-8 mb-4 mx-auto" 
        />
      )}
      
      {!searchQuery && <FeaturedTools />}
      
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory}
      />
      
      {searchQuery ? (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-12 bg-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-2"
                >
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Search className="mr-2 h-5 w-5 text-primary" />
                    Search Results for <span className="text-primary ml-2">"{searchQuery}"</span>
                  </h2>
                  
                  {/* AI Search Toggle */}
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={useAI ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newParams = new URLSearchParams(params);
                        newParams.set("ai", "true");
                        window.location.href = `/?${newParams.toString()}`;
                      }}
                      className="text-xs flex items-center gap-1"
                      disabled={useAI}
                    >
                      <span>AI Search</span>
                      {isAIEnhanced && <span className="ml-1">✓</span>}
                    </Button>
                    
                    <Button 
                      variant={!useAI ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newParams = new URLSearchParams(params);
                        newParams.delete("ai");
                        window.location.href = `/?${newParams.toString()}`;
                      }}
                      className="text-xs"
                      disabled={!useAI}
                    >
                      Basic Search
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AuthButtons variant="outline" />
                </motion.div>
              </div>
              
              <Separator className="mb-8" />
              
              {/* Show AI search message if available */}
              {isAIEnhanced && searchMessage && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-blue-800 text-sm flex items-center">
                    <span className="font-medium">AI-Enhanced Search:</span>
                    <span className="ml-2">{searchMessage}</span>
                  </p>
                </div>
              )}
              
              {searchResults.length === 0 ? (
                <Card className="bg-gray-50 border-dashed">
                  <CardContent className="pt-6 pb-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="h-8 w-8 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      We couldn't find any AI tools matching your search for "{searchQuery}". 
                      Try different keywords or browse our categories.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button onClick={() => window.history.back()} variant="outline">
                        Go Back
                      </Button>
                      <Button onClick={() => window.location.href = "/"}>
                        Browse Categories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {searchResults.map((tool: Tool) => {
                    const category = categories.find((cat: Category) => cat.id === tool.categoryId);
                    return (
                      <ToolCard 
                        key={tool.id} 
                        tool={tool} 
                        category={category}
                      />
                    );
                  })}
                </motion.div>
              )}
              
              {searchResults.length > 0 && (
                <div className="mt-12 text-center">
                  <p className="text-gray-600 mb-4">
                    Looking for something specific? Try our advanced search options
                  </p>
                  <Button variant="outline" className="group" onClick={() => {}}>
                    Advanced Search
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      ) : (
        // Show all categories with tools
        categories.map((category: Category) => (
          <ToolsByCategory key={category.id} category={category} />
        ))
      )}
      
      {/* In-content Ad before Submit section */}
      <AdComponent 
        format="leaderboard" 
        position="in-content" 
        className="my-10 mx-auto" 
      />
      
      <SubmitToolSection />
      <Newsletter />
      
      {/* Bottom ad banner */}
      <AdComponent 
        format="banner" 
        position="bottom" 
        className="mt-10 mb-6 mx-auto" 
      />
    </>
  );
};

export default Home;
