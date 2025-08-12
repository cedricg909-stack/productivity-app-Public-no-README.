import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Folder, ChartLine, Bolt, Plus, Heart, Download, Tag } from "lucide-react";
import type { Category, UserStats } from "@shared/schema";

interface CategorySidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onAddTip: () => void;
}

export function CategorySidebar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  onAddTip,
}: CategorySidebarProps) {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: stats } = useQuery<UserStats>({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Search */}
      <div className="glassmorphism rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-primary-500" />
          Search Tips
        </h3>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search productivity tips..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="glassmorphism rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Folder className="w-5 h-5 mr-2 text-primary-500" />
          Categories
        </h3>
        <div className="space-y-2">
          <Button
            variant={selectedCategory === "" ? "default" : "ghost"}
            className="w-full justify-between text-left"
            onClick={() => onCategorySelect("")}
          >
            <div className="flex items-center space-x-3">
              <Tag className="w-4 h-4 text-primary-500" />
              <span className="font-medium">All Tips</span>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {categories?.reduce((sum, cat) => sum + (cat.count ?? 0), 0) || 0}
            </span>
          </Button>
          
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "ghost"}
              className="w-full justify-between text-left"
              onClick={() => onCategorySelect(category.name === selectedCategory ? "" : category.name)}
            >
              <div className="flex items-center space-x-3">
                <Tag className="w-4 h-4 text-primary-500" />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="glassmorphism rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <ChartLine className="w-5 h-5 mr-2 text-primary-500" />
          Your Progress
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Tips viewed today</span>
            <span className="font-bold text-primary-600">{stats?.dailyTips || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current streak</span>
            <span className="font-bold text-orange-500">{stats?.streak || 0} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Favorites saved</span>
            <span className="font-bold text-red-500">{stats?.favoritesCount || 0}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glassmorphism rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bolt className="w-5 h-5 mr-2 text-primary-500" />
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
            onClick={onAddTip}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Tip
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
          >
            <Heart className="w-4 h-4 mr-2" />
            View Favorites
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Tips
          </Button>
        </div>
      </div>
    </div>
  );
}
