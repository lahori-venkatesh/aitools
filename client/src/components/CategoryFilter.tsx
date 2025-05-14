import React, { useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; 
import { Category } from "@shared/schema";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
}

const CategoryFilter = ({ categories, activeCategory }: CategoryFilterProps) => {
  const [location] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll the category list left/right
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Amount to scroll in pixels
      const currentScroll = scrollRef.current.scrollLeft;
      scrollRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Category card animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-gray-900 flex items-center"
            >
              <Filter className="mr-2 h-5 w-5 text-primary" />
              Browse by Category
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex space-x-2"
            >
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hidden md:flex"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hidden md:flex"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          
          <ScrollArea className="w-full" ref={scrollRef}>
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.07
                  }
                }
              }}
              className="flex items-center space-x-3 pb-4"
            >
              <motion.div variants={item}>
                <Link href="/">
                  <div className="cursor-pointer">
                    <Button 
                      variant={!activeCategory ? "default" : "outline"}
                      className="whitespace-nowrap rounded-full h-10 px-5 transition-all duration-300"
                    >
                      All Tools
                    </Button>
                  </div>
                </Link>
              </motion.div>
              
              {categories.map((category) => (
                <motion.div key={category.id} variants={item}>
                  <Link href={`/#${category.slug}`}>
                    <div className="cursor-pointer">
                      <Button 
                        variant={activeCategory === category.slug ? "default" : "outline"}
                        className={`whitespace-nowrap rounded-full h-10 px-5 transition-all duration-300 ${
                          activeCategory === category.slug ? 'shadow-md' : 'hover:bg-primary/10'
                        }`}
                      >
                        {category.name}
                      </Button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          {/* Category cards for larger screens */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8 hidden md:grid"
          >
            {categories.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/#${category.slug}`}>
                <div className={`
                  cursor-pointer group relative overflow-hidden
                  bg-white rounded-xl border border-gray-200 p-4 h-24
                  flex flex-col justify-between transition-all duration-300
                  hover:shadow-md hover:border-primary/30 hover:bg-primary/5
                `}>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary">{category.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{category.description}</p>
                  
                  {/* Decorative elements */}
                  <div className="absolute -right-2 -bottom-2 h-10 w-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all"></div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
