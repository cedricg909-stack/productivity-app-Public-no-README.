import { useState, useMemo } from "react";
import type { Tip } from "@shared/schema";

export function useSearch(tips: Tip[] | undefined) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = useMemo(() => {
    if (!tips || !searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    return tips.filter(tip => 
      tip.text.toLowerCase().includes(query) ||
      tip.category.toLowerCase().includes(query)
    );
  }, [tips, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredTips,
  };
}
