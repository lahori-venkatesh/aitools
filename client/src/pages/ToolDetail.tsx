import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, StarHalf, Check, X, DollarSign, Tag, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToolWithDetails } from "@shared/schema";
import HowToUseGuide from "@/components/HowToUseGuide";
import PromptDisplay from "@/components/PromptDisplay";
import ToolBlogPost from "@/components/ToolBlogPost";
import SEO from "@/components/SEO";
import AdComponent from "@/components/AdComponent";

const ToolDetail = () => {
  const [match, params] = useRoute("/tool/:slug");
  const slug = params?.slug || "";

  const { data: tool, isLoading } = useQuery<ToolWithDetails>({
    queryKey: [`/api/tools/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="lg:grid lg:grid-cols-5 lg:gap-0">
                <div className="bg-gray-50 p-6 border-r border-gray-200 lg:col-span-2">
                  <Skeleton className="w-full h-64 rounded-lg mb-6" />
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-6" />
                  <Skeleton className="h-10 w-full" />
                </div>
                
                <div className="p-6 lg:p-8 lg:col-span-3">
                  <div className="space-y-8">
                    <div>
                      <Skeleton className="h-8 w-64 mb-4" />
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <Card key={i}>
                            <CardContent className="p-4">
                              <Skeleton className="h-6 w-48 mb-2" />
                              <Skeleton className="h-4 w-full" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <>
        <SEO 
          title="Tool Not Found | AI Tool Hub"
          description="The AI tool you're looking for doesn't exist or has been removed."
          noIndex={true}
        />
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
              <p className="text-gray-600 mb-8">
                The tool you're looking for does not exist or has been removed.
              </p>
              <Link href="/">
                <Button>Return to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Format rating to display stars
  const formattedRating = tool.rating ? (tool.rating / 10).toFixed(1) : null;
  const fullStars = formattedRating ? Math.floor(Number(formattedRating)) : 0;
  const hasHalfStar = formattedRating ? (Number(formattedRating) - fullStars) >= 0.5 : false;

  // Generate meta description from tool description
  const metaDescription = tool.metaDescription || 
    `${tool.description.substring(0, 150)}${tool.description.length > 150 ? '...' : ''} | Reviews, Prompts & Usage Guide`;

  // Generate keywords based on tool and category
  const keywords = [
    tool.name,
    tool.category.name,
    'AI',
    'Artificial Intelligence',
    tool.name + ' review',
    tool.name + ' guide',
    tool.name + ' prompts',
    ...(tool.metaKeywords ? tool.metaKeywords.split(',').map(k => k.trim()) : [])
  ];

  // Generate structured data for SEO
  const structuredData = tool.structuredData || {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.name,
    'description': tool.description,
    'applicationCategory': tool.category.name,
    'operatingSystem': 'Web-based',
    'aggregateRating': tool.rating ? {
      '@type': 'AggregateRating',
      'ratingValue': (tool.rating / 10).toFixed(1),
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '50'  // Placeholder count
    } : undefined
  };

  // Key features (from tool data or defaults)
  const features = ['Easy to use', 'High-quality outputs', 'Regular updates', 'Comprehensive documentation'];

  // Price format based on availability
  const pricingInfo = tool.pricing || (
    tool.featured ? 'Premium' : 'Check website for pricing'
  );

  return (
    <>
      <SEO 
        title={tool.metaTitle || `${tool.name} - AI Tool Review, Prompts & Guide | AI Tool Hub`}
        description={metaDescription}
        keywords={keywords}
        image={tool.imageUrl || ''}
        article={!!tool.blog}
        canonical={tool.canonicalUrl || ''}
        structuredData={structuredData}
      />
    
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top ad banner */}
          <AdComponent 
            format="leaderboard" 
            position="top" 
            className="mb-8 mx-auto" 
          />

          <div className="max-w-7xl mx-auto">
            <Card className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="lg:grid lg:grid-cols-5 lg:gap-0">
                {/* Tool sidebar */}
                <div className="bg-gray-50 p-6 border-r border-gray-200 lg:col-span-2">
                  <img 
                    src={tool.imageUrl || "https://images.unsplash.com/photo-1579403124614-197f69d8187b"} 
                    alt={`${tool.name} interface`} 
                    className="w-full h-auto rounded-lg shadow-md mb-6"
                    loading="lazy"
                  />
                  
                  <div className="mb-6">
                    <Badge 
                      variant="secondary"
                      className={`
                        ${tool.category.slug === 'text-generation' ? 'bg-blue-100 text-blue-800' :
                          tool.category.slug === 'image-creation' ? 'bg-pink-100 text-pink-800' :
                          tool.category.slug === 'data-analysis' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'}
                      `}
                    >
                      {tool.category.name}
                    </Badge>
                    <h1 className="text-2xl font-bold text-gray-900 mt-3">{tool.name}</h1>
                    
                    {formattedRating && (
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          {[...Array(fullStars)].map((_, i) => (
                            <Star key={i} className="fill-current" size={16} />
                          ))}
                          {hasHalfStar && <StarHalf className="fill-current" size={16} />}
                        </div>
                        <span className="text-gray-600 text-sm ml-2">{formattedRating}/5</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">About this Tool</h3>
                    <p className="text-gray-700 text-sm">
                      {tool.description}
                    </p>
                  </div>
                  
                  {/* Quick facts about the tool */}
                  <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Quick Facts</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <DollarSign className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900">Pricing:</span>
                          <span className="ml-1 text-gray-700">{pricingInfo}</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Tag className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900">Category:</span>
                          <span className="ml-1 text-gray-700">{tool.category.name}</span>
                        </div>
                      </li>
                      {tool.performanceScore && (
                        <li className="flex items-start">
                          <Zap className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-900">Performance:</span>
                            <span className="ml-1 text-gray-700">{tool.performanceScore}/100</span>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="text-green-500 mt-0.5 mr-2 h-4 w-4" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Ad in sidebar */}
                  <AdComponent 
                    format="rectangle" 
                    position="sidebar" 
                    className="mb-6" 
                  />
                  
                  <a 
                    href={tool.affiliateUrl || tool.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full"
                  >
                    <Button className="w-full flex items-center justify-center">
                      Visit Official Site <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </a>
                  
                  {tool.affiliateUrl && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      * Affiliate link - we may earn a commission
                    </p>
                  )}
                </div>
                
                {/* Tool details content */}
                <div className="p-6 lg:p-8 lg:col-span-3">
                  <div className="space-y-8">
                    {/* How to Use Effectively Section */}
                    <HowToUseGuide guide={tool.guide} toolName={tool.name} />
                    
                    {/* In-content Ad */}
                    <AdComponent 
                      format="rectangle" 
                      position="in-content" 
                      className="my-8 mx-auto" 
                    />
                    
                    {/* Example Prompts Section */}
                    <PromptDisplay prompts={tool.prompts} />
                    
                    {/* Blog Post Preview */}
                    <ToolBlogPost blog={tool.blog} preview={true} />

                    {/* Tool pros and cons if available */}
                    {(tool.pros || tool.cons) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tool.pros && (
                          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                            <h3 className="font-bold text-green-800 mb-3 flex items-center">
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                              Pros
                            </h3>
                            <ul className="space-y-2">
                              {(Array.isArray(tool.pros) ? tool.pros : []).map((pro, index) => (
                                <li key={index} className="flex text-sm">
                                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {tool.cons && (
                          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                            <h3 className="font-bold text-red-800 mb-3 flex items-center">
                              <X className="h-4 w-4 mr-2 text-red-600" />
                              Cons
                            </h3>
                            <ul className="space-y-2">
                              {(Array.isArray(tool.cons) ? tool.cons : []).map((con, index) => (
                                <li key={index} className="flex text-sm">
                                  <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Bottom ad banner */}
          <AdComponent 
            format="leaderboard" 
            position="bottom" 
            className="mt-8 mx-auto" 
          />
        </div>
      </div>
    </>
  );
};

export default ToolDetail;
