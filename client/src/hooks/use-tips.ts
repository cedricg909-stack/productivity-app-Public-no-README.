import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Tip } from "@shared/schema";

export function useTips() {
  const queryClient = useQueryClient();

  const tipsQuery = useQuery<Tip[]>({
    queryKey: ["/api/tips"],
  });

  const randomTipQuery = useQuery<Tip>({
    queryKey: ["/api/tips/random"],
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const getRandomTip = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("GET", "/api/tips/random");
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/tips/random"], data);
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  return {
    tips: tipsQuery.data,
    randomTip: randomTipQuery.data,
    isLoading: tipsQuery.isLoading || randomTipQuery.isLoading,
    getRandomTip,
  };
}
