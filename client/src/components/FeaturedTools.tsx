import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tool, Category } from "@shared/schema";
import ToolCard from "./ToolCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const FeaturedTools = () => {
  const { data: featuredTools = [], isLoading } = useQuery<Tool[]>({
    queryKey: ["/api/tools/featured"],
  });
  
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
              <div>
                <Skeleton className="h-10 w-64 mb-4" />
                <Skeleton className="h-5 w-96" />
              </div>
              <Skeleton className="h-10 w-32 mt-4 md:mt-0" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-xl overflow-hidden bg-white shadow-md">
                  <Skeleton className="w-full h-52" />
                  <div className="p-5">
                    <div className="flex justify-between mb-3">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-7 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-5" />
                    <div className="flex justify-between pt-3 border-t">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Find the matching category for each tool
  const toolsWithCategories = featuredTools.map(tool => {
    const category = categories.find((cat: Category) => cat.id === tool.categoryId);
    return { tool, category };
  });

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Sparkles className="text-yellow-500 mr-2 h-6 w-6" />
                Featured AI Tools
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Hand-picked powerful AI tools that are transforming workflows and boosting productivity
              </p>
            </div>
            <Link href="/tools">
              <motion.div
                whileHover={{ x: 5 }}
                className="mt-4 md:mt-0"
              >
                <Button variant="outline" className="group">
                  View All Tools
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Category filter pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <Badge variant="outline" className="py-1.5 px-3 bg-primary/5 hover:bg-primary/10 cursor-pointer">
              All
            </Badge>
            {categories.slice(0, 6).map((category: Category) => (
              <Badge 
                key={category.id}
                variant="outline" 
                className="py-1.5 px-3 hover:bg-primary/10 cursor-pointer"
              >
                {category.name}
              </Badge>
            ))}
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {toolsWithCategories.map(({ tool, category }) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                category={category} 
                featured={true}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
