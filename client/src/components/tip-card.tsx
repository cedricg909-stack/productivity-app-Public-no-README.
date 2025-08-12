import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, RefreshCw, Share2, Eye, Star } from "lucide-react";
import type { Tip } from "@shared/schema";

interface TipCardProps {
  tip: Tip;
  isFavorited: boolean;
  onFavoriteToggle: () => void;
  onNewTip: () => void;
  isLoading?: boolean;
}

export function TipCard({ tip, isFavorited, onFavoriteToggle, onNewTip, isLoading }: TipCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Productivity Tip',
        text: tip.text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(tip.text);
    }
  };

  return (
    <div className="glassmorphism rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 mb-8">
      <div className="text-center">
        <div className="mb-6">
          <Badge 
            variant="outline" 
            className="px-4 py-2 bg-primary-500/20 text-primary-600 border-primary-500/30"
          >
            <i className="fas fa-tag mr-2"></i>
            {tip.category}
          </Badge>
        </div>
        
        <div className="mb-8">
          <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-medium animate-fade-in">
            {tip.text}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Eye className="w-4 h-4" />
            <span>{tip.views} views</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Heart className="w-4 h-4 text-red-500" />
            <span>{tip.favorites} favorites</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{(tip.rating / 10).toFixed(1)} rating</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
            onClick={onNewTip}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>New Tip</span>
          </Button>
          
          <Button
            variant="ghost"
            className="glassmorphism-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            onClick={onFavoriteToggle}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            <span>Favorite</span>
          </Button>
          
          <Button
            variant="ghost"
            className="glassmorphism-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
