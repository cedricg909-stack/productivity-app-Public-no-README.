import { useQuery } from "@tanstack/react-query";
import { Lightbulb, Flame, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserStats } from "@shared/schema";

export function Header() {
  const { data: stats } = useQuery<UserStats>({
    queryKey: ["/api/stats"],
  });

  return (
    <header className="sticky top-0 z-50 glassmorphism-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="text-2xl text-yellow-400 w-8 h-8" />
              <h1 className="text-xl font-bold text-white">Productivity Tips Pro</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-white/80 text-sm">
              <Flame className="text-orange-400 w-4 h-4" />
              <span>{stats?.streak || 0} day streak</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-white/80 hover:text-white hover:bg-white/10"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-white/80 hover:text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
