import React from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Star, Bookmark } from "lucide-react";
import { Tool, Category } from "@shared/schema";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: Tool & {
    relevanceScore?: number;
    relevanceExplanation?: string;
  };
  category?: Category;
  featured?: boolean;
}

const ToolCard = ({ tool, category, featured = false }: ToolCardProps) => {
  // Format rating to display as X.X/5
  const formattedRating = tool.rating ? `${(tool.rating / 10).toFixed(1)}/5` : null;

  // Function to get category color
  const getCategoryColors = (slug?: string) => {
    switch(slug) {
      case 'text-generation':
        return { bg: 'bg-blue-100', text: 'text-blue-800', hover: 'group-hover:bg-blue-200' };
      case 'image-creation':
        return { bg: 'bg-pink-100', text: 'text-pink-800', hover: 'group-hover:bg-pink-200' };
      case 'data-analysis':
        return { bg: 'bg-green-100', text: 'text-green-800', hover: 'group-hover:bg-green-200' };
      case 'ai-coding':
        return { bg: 'bg-purple-100', text: 'text-purple-800', hover: 'group-hover:bg-purple-200' };
      case 'video-tools':
        return { bg: 'bg-amber-100', text: 'text-amber-800', hover: 'group-hover:bg-amber-200' };
      case 'audio-tools':
        return { bg: 'bg-indigo-100', text: 'text-indigo-800', hover: 'group-hover:bg-indigo-200' };
      case 'productivity':
        return { bg: 'bg-cyan-100', text: 'text-cyan-800', hover: 'group-hover:bg-cyan-200' };
      case 'research-learning':
        return { bg: 'bg-teal-100', text: 'text-teal-800', hover: 'group-hover:bg-teal-200' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', hover: 'group-hover:bg-gray-200' };
    }
  };
  
  const categoryColors = getCategoryColors(category?.slug);

  // Function to create stars for rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="w-3 h-3 text-gray-300" />
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </span>
      );
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }
    
    return stars;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
        {/* Bookmark button for saving */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        
        {(featured || tool.imageUrl) && (
          <div className="relative w-full h-44 overflow-hidden">
            <img 
              src={tool.imageUrl || `https://source.unsplash.com/random/800x600/?${tool.category?.slug || 'technology'}`}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485";
              }} 
              alt={`${tool.name} interface`} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}
        
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="secondary"
              className={`${categoryColors.bg} ${categoryColors.text} ${categoryColors.hover} py-1 px-2.5 rounded-full transition-colors duration-300`}
            >
              {category ? category.name : 'AI Tool'}
            </Badge>
            <Badge
              variant="outline"
              className={`ml-2 ${
                tool.pricingType === 'free' ? 'bg-green-100 text-green-800' :
                tool.pricingType === 'freemium' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}
            >
              {tool.pricingType === 'free' ? 'Free' :
               tool.pricingType === 'freemium' ? 'Freemium' : 'Paid'}
            </Badge>
            {tool.relevanceScore ? (
              <div className="flex items-center ml-1">
                <span className="text-xs font-medium text-primary-700">{Math.round(tool.relevanceScore)}% match</span>
                <div className="ml-1 w-12 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${tool.relevanceScore}%` }}></div>
                </div>
              </div>
            ) : formattedRating && (
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {renderStars(parseFloat(formattedRating))}
                </div>
                <span className="text-xs font-medium text-gray-500 ml-1">{formattedRating}</span>
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
          
          <p className="text-gray-600 text-sm flex-1 mb-4 line-clamp-3">
            {tool.relevanceExplanation ? (
              <>
                <span className="block font-medium text-primary-700 mb-1">AI Match:</span>
                {tool.relevanceExplanation}
              </>
            ) : (
              tool.description
            )}
          </p>
          
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Link href={`/tool/${tool.slug}`}>
                <span className="text-primary hover:text-primary-700 text-sm font-medium flex items-center cursor-pointer">
                  {featured ? 'Read Guide' : 'View Details'} <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              
              <a 
                href={tool.affiliateUrl || tool.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="sm" variant="outline" className="gap-1 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span>Visit</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ToolCard;
