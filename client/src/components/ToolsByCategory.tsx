import React from "react";
import { Tool, Category } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import ToolCard from "./ToolCard";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface ToolsByCategoryProps {
  category: Category;
}

const ToolsByCategory = ({ category }: ToolsByCategoryProps) => {
  const { data: tools = [] } = useQuery<Tool[]>({
    queryKey: [`/api/categories/${category.slug}/tools`],
  });

  const bgColor = category.slug === 'image-creation' ? "bg-gray-50" : "bg-white";

  return (
    <section id={category.slug} className={`py-12 ${bgColor}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
            <Link href={`/?category=${category.slug}`}>
              <a className="text-primary hover:text-primary-700 font-medium flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.id} tool={tool} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsByCategory;
