import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Sparkles, Brain } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [, setLocation] = useLocation();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Example search suggestions based on user input
  const searchSuggestions = {
    "ai": ["AI chatbots", "AI content writing", "AI image generation"],
    "write": ["content writing", "copywriting", "technical writing"],
    "image": ["image generation", "image editing", "image enhancement"],
    "video": ["video creation", "video editing", "video enhancement"],
    "audio": ["audio processing", "voice synthesis", "music generation"],
    "code": ["coding assistant", "code generation", "code review"],
    "data": ["data analysis", "data visualization", "data processing"],
    "translate": ["language translation", "document translation", "real-time translation"],
    "legal": ["legal analysis", "contract review", "legal research"],
    "health": ["health diagnosis", "medical imaging", "patient care"],
  };

  useEffect(() => {
    // Generate search suggestions based on user input
    if (searchQuery.length > 2) {
      const query = searchQuery.toLowerCase();
      let newSuggestions: string[] = [];
      
      // Check if the query matches any key in our suggestions object
      Object.entries(searchSuggestions).forEach(([key, values]) => {
        if (key.includes(query) || query.includes(key)) {
          newSuggestions = [...newSuggestions, ...values];
        }
      });
      
      // Also check if the query matches any values
      Object.values(searchSuggestions).flat().forEach(suggestion => {
        if (suggestion.toLowerCase().includes(query) && !newSuggestions.includes(suggestion)) {
          newSuggestions.push(suggestion);
        }
      });
      
      setSuggestions(newSuggestions.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.set('q', searchQuery.trim());
      
      if (useAI) {
        searchParams.set('ai', 'true');
      }
      
      setLocation(`/?${searchParams.toString()}`);
      setIsFocused(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    
    const searchParams = new URLSearchParams();
    searchParams.set('q', suggestion.trim());
    
    if (useAI) {
      searchParams.set('ai', 'true');
    }
    
    setLocation(`/?${searchParams.toString()}`);
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <form 
          onSubmit={handleSearch} 
          className={`bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-1.5 flex shadow-lg transition-all duration-300 ${isFocused ? 'border-white/50 shadow-xl' : ''}`}
        >
          <div className="flex-1 relative flex items-center">
            <Search className="h-5 w-5 text-white/70 absolute left-3" />
            <Input
              type="text"
              placeholder="Find AI tools (e.g., 'image generation', 'writing assistant')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder-white/70 pl-10 py-6 text-base"
            />
            {searchQuery && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="text-white/70 hover:text-white hover:bg-transparent"
                onClick={() => setSearchQuery("")}
              >
                Clear
              </Button>
            )}
          </div>
          <Button 
            type="submit" 
            className="bg-white text-primary hover:bg-gray-100 rounded-lg px-6 transition-all duration-300 font-medium"
          >
            <span className="hidden sm:inline">Search</span>
            <ArrowRight className="h-4 w-4 sm:ml-1 sm:h-5 sm:w-5" />
          </Button>
        </form>
        
        {/* AI Search Toggle */}
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full py-1 px-3">
            <Brain className={`h-4 w-4 ${useAI ? 'text-primary' : 'text-white/50'}`} />
            <span className="text-xs font-medium text-white">AI-Powered Search</span>
            <Switch 
              checked={useAI}
              onCheckedChange={setUseAI}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>
      
      {/* Search suggestions */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-xl rounded-lg border border-white/20 shadow-lg overflow-hidden z-50"
          >
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <motion.li 
                  key={suggestion}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    type="button"
                    className="flex items-center px-4 py-3 w-full text-left text-white hover:bg-white/10 transition-colors"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-secondary-300" />
                    <span>{suggestion}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
