
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Tool, Category } from "@shared/schema";
import ToolCard from "@/components/ToolCard";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import SEO from "@/components/SEO";

const CategoryTools = () => {
  const [match, params] = useRoute("/category/:slug");
  const slug = params?.slug || "";

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: tools = [], isLoading } = useQuery<Tool[]>({
    queryKey: [`/api/categories/${slug}/tools`],
    enabled: !!slug,
  });

  const currentCategory = categories.find(cat => cat.slug === slug);

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
        title={`${currentCategory?.name || 'Category'} AI Tools | AI Tool Hub`}
        description={`Explore our curated collection of ${currentCategory?.name.toLowerCase()} AI tools and solutions.`}
      />

      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {currentCategory?.name} Tools
              </h1>
              <p className="text-gray-600">
                {currentCategory?.description}
              </p>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {tools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  category={currentCategory}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryTools;
