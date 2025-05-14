import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";
import AdComponent from "@/components/AdComponent";

const BlogPage = () => {
  // This is a simple placeholder for the blog page
  // In a real implementation, you would fetch blog posts from the API
  const blogPosts = [
    {
      id: 1,
      title: "How AI Tools are Revolutionizing Content Creation",
      excerpt:
        "Discover how AI-powered tools are transforming the way we create and distribute content across various platforms.",
      author: "Jane Smith",
      date: "June 15, 2023",
      category: "AI Trends",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    },
    {
      id: 2,
      title: "The Best AI Image Generators for Different Use Cases",
      excerpt:
        "A comprehensive comparison of popular AI image generation tools and which ones excel for specific use cases and industries.",
      author: "John Davis",
      date: "May 28, 2023",
      category: "Tool Reviews",
      imageUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef",
    },
    {
      id: 3,
      title: "Prompt Engineering 101: Getting the Most from AI Tools",
      excerpt:
        "Learn the fundamentals of writing effective prompts that unlock the full potential of text and image generation AI tools.",
      author: "Alex Johnson",
      date: "April 22, 2023",
      category: "Tutorials",
      imageUrl: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387",
    },
  ];

  // SEO metadata for blog page
  const pageTitle = "AI Tool Hub Blog - Insights, Guides & AI Tool Reviews";
  const pageDescription = "Stay updated with the latest AI tools, techniques, and trends. Read our expert guides, reviews, and tutorials to make the most of artificial intelligence tools.";
  
  // Blog structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AI Tool Hub Blog",
    "description": "Expert insights, reviews, and guides for AI tools",
    "url": "https://aitoolhub.app/blog",
    "author": {
      "@type": "Organization",
      "name": "AI Tool Hub"
    }
  };

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={["AI blog", "artificial intelligence tools", "AI tool guides", 
                  "AI reviews", "prompt engineering", "AI tutorials"]}
        article={true}
        structuredData={structuredData}
      />
    
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top ad banner */}
          <AdComponent 
            format="leaderboard" 
            position="top" 
            className="mb-10 mx-auto" 
          />
          
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Tool Hub Blog</h1>
              <p className="text-xl text-gray-600">
                Insights, reviews, and guides to help you make the most of AI tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex-1 flex flex-col p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium bg-primary-100 text-primary py-1 px-2 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{post.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* In-content ad */}
            <AdComponent 
              format="rectangle" 
              position="in-content" 
              className="my-10 mx-auto" 
            />
            
            <div className="mt-12 text-center">
              <Button>Load More Articles</Button>
            </div>
          </div>
        </div>
        
        {/* Bottom ad banner */}
        <AdComponent 
          format="leaderboard" 
          position="bottom" 
          className="mt-12 mx-auto" 
        />
      </div>
      <Newsletter />
    </>
  );
};

export default BlogPage;
