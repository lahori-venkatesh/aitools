
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tool, Category } from "@shared/schema";
import ToolCard from "@/components/ToolCard";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import SEO from "@/components/SEO";

const AllTools = () => {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: tools = [], isLoading } = useQuery<Tool[]>({
    queryKey: ["/api/tools"],
  });

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-[300px] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <>
      <SEO 
        title="All AI Tools | AI Tool Hub"
        description="Browse our complete collection of AI tools across all categories."
      />

      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                All AI Tools
              </h1>
              <p className="text-gray-600">
                Explore our complete collection of AI tools
              </p>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {tools.map((tool) => {
                const category = categories.find(cat => cat.id === tool.categoryId);
                return (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    category={category}
                  />
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTools;
