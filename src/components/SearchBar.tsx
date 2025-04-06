
import React, { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        <Input
          type="text"
          placeholder="Enter job description or title..."
          className="pr-12 py-6 text-base bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-lg transition-all focus-visible:ring-primary/50 focus-visible:border-primary dark:bg-black/50 dark:border-gray-800"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary hover:bg-primary/10 transition-all"
          onClick={handleSearch}
          disabled={isLoading}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center mt-3 opacity-80">
        Enter a detailed job description to find relevant mock tests
      </p>
    </div>
  );
};

export default SearchBar;
