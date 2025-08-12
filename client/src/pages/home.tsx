import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { TipCard } from "@/components/tip-card";
import { CategorySidebar } from "@/components/category-sidebar";
import { AddTipModal } from "@/components/add-tip-modal";
import { WorkspaceGallery } from "@/components/workspace-gallery";
import { useTips } from "@/hooks/use-tips";
import { useFavorites } from "@/hooks/use-favorites";
import { useSearch } from "@/hooks/use-search";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [currentTipId, setCurrentTipId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { tips, randomTip, getRandomTip, isLoading } = useTips();
  const { favorites, toggleFavorite } = useFavorites();
  const { searchQuery, setSearchQuery, filteredTips } = useSearch(tips);

  // Set initial random tip
  useEffect(() => {
    if (randomTip && !currentTipId) {
      setCurrentTipId(randomTip.id);
    }
  }, [randomTip, currentTipId]);

  const handleGetNewTip = () => {
    getRandomTip.mutate(undefined, {
      onSuccess: (newTip) => {
        setCurrentTipId(newTip.id);
      }
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            handleGetNewTip();
            break;
          case 'f':
            e.preventDefault();
            if (currentTipId) {
              toggleFavorite.mutate(currentTipId);
            }
            break;
          case 's':
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
            if (searchInput) searchInput.focus();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentTipId, toggleFavorite, getRandomTip]);

  const currentTip = tips?.find(tip => tip.id === currentTipId) || randomTip;
  const isFavorited = currentTip ? favorites?.some(fav => fav.tipId === currentTip.id) : false;

  const displayTips = searchQuery ? filteredTips : 
                     selectedCategory ? tips?.filter(tip => tip.category === selectedCategory) : tips;

  return (
    <div className="font-inter gradient-bg hero-pattern min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              💡 Daily Productivity Boost
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover proven strategies to enhance your efficiency and achieve more in less time
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400" 
              alt="Modern minimalist workspace" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
          </div>

          {/* Main Tip Card */}
          {currentTip && (
            <TipCard 
              tip={currentTip}
              isFavorited={isFavorited}
              onFavoriteToggle={() => toggleFavorite.mutate(currentTip.id)}
              onNewTip={handleGetNewTip}
              isLoading={isLoading || getRandomTip.isPending}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <CategorySidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onAddTip={() => setIsAddModalOpen(true)}
          />

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <WorkspaceGallery />

            {/* Recent Tips */}
            <div className="glassmorphism rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <i className="fas fa-clock mr-2 text-primary-500"></i>
                  {searchQuery ? 'Search Results' : selectedCategory ? `${selectedCategory} Tips` : 'Recent Tips'}
                </h3>
                <span className="text-sm text-gray-500">
                  {displayTips?.length || 0} tips
                </span>
              </div>
              
              <div className="space-y-4">
                {displayTips?.slice(0, 10).map((tip) => {
                  const tipFavorited = favorites?.some(fav => fav.tipId === tip.id) || false;
                  return (
                    <div 
                      key={tip.id}
                      className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors cursor-pointer border border-gray-100"
                      onClick={() => setCurrentTipId(tip.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {tip.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {tip.views} views
                            </span>
                          </div>
                          <p className="text-gray-800 text-sm leading-relaxed">
                            {tip.text}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            className={`transition-colors ${tipFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite.mutate(tip.id);
                            }}
                          >
                            <i className="fas fa-heart"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {displayTips?.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <i className="fas fa-search text-4xl mb-4 text-gray-300"></i>
                    <p>No tips found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          onClick={handleGetNewTip}
          disabled={getRandomTip.isPending}
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>

      <AddTipModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen}
      />
    </div>
  );
}
