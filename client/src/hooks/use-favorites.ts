import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Favorite } from "@shared/schema";

export function useFavorites() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const favoritesQuery = useQuery<Favorite[]>({
    queryKey: ["/api/favorites"],
  });

  const toggleFavorite = useMutation({
    mutationFn: async (tipId: string) => {
      const favorites = favoritesQuery.data || [];
      const existingFavorite = favorites.find(fav => fav.tipId === tipId);
      
      if (existingFavorite) {
        const response = await apiRequest("DELETE", `/api/favorites/${tipId}`);
        return { action: 'removed', tipId };
      } else {
        const response = await apiRequest("POST", "/api/favorites", { tipId });
        return { action: 'added', tipId, data: await response.json() };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      
      toast({
        title: result.action === 'added' ? "Added to favorites!" : "Removed from favorites",
        description: result.action === 'added' 
          ? "This tip has been saved to your favorites." 
          : "This tip has been removed from your favorites.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    favorites: favoritesQuery.data,
    isLoading: favoritesQuery.isLoading,
    toggleFavorite,
  };
}
