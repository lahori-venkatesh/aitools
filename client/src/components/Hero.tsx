import React from "react";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

const Hero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary to-purple-600 text-white overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute left-0 -bottom-1/4 w-80 h-80 bg-white/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute left-1/3 bottom-1/3 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Explore & Compare <span className="text-secondary-300">AI Tools</span> <br className="hidden md:block" />
              For Every <span className="text-secondary-300">Need</span> & <span className="text-secondary-300">Budget</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-lg px-4 py-2">Free Tools</Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">Freemium Options</Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">Premium Solutions</Badge>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl lg:text-2xl opacity-90 mb-10 max-w-3xl mx-auto">
              Find the perfect AI tools with step-by-step guides, expert-crafted prompts, and in-depth reviews
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <SearchBar />
            
            <div className="mt-5 text-sm text-white/80 font-medium">
              Popular searches: "Image generation" • "AI writing assistant" • "Code helper" • "Video creation"
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-4 text-center"
          >
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="font-semibold text-secondary-200">200+</span> 
              <span className="ml-1 text-sm">AI Tools</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="font-semibold text-secondary-200">15+</span> 
              <span className="ml-1 text-sm">Categories</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="font-semibold text-secondary-200">1000+</span> 
              <span className="ml-1 text-sm">Ready-to-Use Prompts</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
