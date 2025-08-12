import { 
  type Tip, 
  type InsertTip, 
  type Favorite, 
  type InsertFavorite, 
  type Category, 
  type InsertCategory,
  type UserStats,
  type InsertUserStats
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Tips
  getTips(): Promise<Tip[]>;
  getTip(id: string): Promise<Tip | undefined>;
  getTipsByCategory(category: string): Promise<Tip[]>;
  searchTips(query: string): Promise<Tip[]>;
  createTip(tip: InsertTip): Promise<Tip>;
  updateTipViews(id: string): Promise<void>;
  updateTipFavorites(id: string, increment: boolean): Promise<void>;
  
  // Favorites
  getFavorites(): Promise<Favorite[]>;
  getFavoritesByTipIds(tipIds: string[]): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(tipId: string): Promise<void>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategoryCount(name: string, increment: boolean): Promise<void>;
  
  // User Stats
  getUserStats(): Promise<UserStats>;
  updateUserStats(stats: Partial<UserStats>): Promise<UserStats>;
}

export class MemStorage implements IStorage {
  private tips: Map<string, Tip>;
  private favorites: Map<string, Favorite>;
  private categories: Map<string, Category>;
  private userStats: UserStats;

  constructor() {
    this.tips = new Map();
    this.favorites = new Map();
    this.categories = new Map();
    this.userStats = {
      id: randomUUID(),
      dailyTips: 0,
      streak: 7,
      totalTips: 0,
      favoritesCount: 0,
      lastActive: new Date(),
    };
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCategories = [
      { name: "Time Management" },
      { name: "Focus & Concentration" },
      { name: "Organization" },
      { name: "Planning" },
      { name: "Wellness" },
      { name: "Efficiency" },
      { name: "Leadership" },
      { name: "Technology" },
    ];

    sampleCategories.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, {
        id,
        name: cat.name,
        count: 0,
      });
    });

    const sampleTips = [
      {
        text: "Use the Pomodoro Technique: Work for 25 minutes, then take a 5-minute break to maintain focus and prevent burnout.",
        category: "Time Management"
      },
      {
        text: "Start your day by completing your most important task first (Eat the Frog).",
        category: "Planning"
      },
      {
        text: "Minimize distractions by turning off non-essential notifications during work hours.",
        category: "Focus & Concentration"
      },
      {
        text: "Use the 2-minute rule: If a task takes less than 2 minutes, do it immediately.",
        category: "Efficiency"
      },
      {
        text: "Take regular breaks to prevent burnout and maintain mental clarity.",
        category: "Wellness"
      },
      {
        text: "Use templates and checklists for recurring processes to ensure consistency.",
        category: "Organization"
      },
      {
        text: "Batch similar tasks together to maintain focus and reduce context switching.",
        category: "Time Management"
      },
      {
        text: "Practice deep work: Set aside uninterrupted time for your most complex tasks.",
        category: "Focus & Concentration"
      },
    ];

    sampleTips.forEach((tip, index) => {
      const id = randomUUID();
      this.tips.set(id, {
        id,
        text: tip.text,
        category: tip.category,
        views: Math.floor(Math.random() * 1000) + 500,
        favorites: Math.floor(Math.random() * 100) + 20,
        rating: Math.floor(Math.random() * 20) + 40, // 4.0-5.0 range
        createdAt: new Date(Date.now() - index * 86400000), // Spread over days
      });

      // Update category counts
      const category = Array.from(this.categories.values()).find(c => c.name === tip.category);
      if (category) {
        category.count++;
      }
    });

    this.userStats.totalTips = sampleTips.length;
  }

  async getTips(): Promise<Tip[]> {
    return Array.from(this.tips.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getTip(id: string): Promise<Tip | undefined> {
    return this.tips.get(id);
  }

  async getTipsByCategory(category: string): Promise<Tip[]> {
    return Array.from(this.tips.values()).filter(tip => tip.category === category);
  }

  async searchTips(query: string): Promise<Tip[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tips.values()).filter(tip => 
      tip.text.toLowerCase().includes(lowerQuery) ||
      tip.category.toLowerCase().includes(lowerQuery)
    );
  }

  async createTip(insertTip: InsertTip): Promise<Tip> {
    const id = randomUUID();
    const tip: Tip = {
      ...insertTip,
      id,
      views: 0,
      favorites: 0,
      rating: 0,
      createdAt: new Date(),
    };
    
    this.tips.set(id, tip);
    await this.updateCategoryCount(tip.category, true);
    this.userStats.totalTips++;
    
    return tip;
  }

  async updateTipViews(id: string): Promise<void> {
    const tip = this.tips.get(id);
    if (tip) {
      tip.views = (tip.views || 0) + 1;
    }
  }

  async updateTipFavorites(id: string, increment: boolean): Promise<void> {
    const tip = this.tips.get(id);
    if (tip) {
      tip.favorites = (tip.favorites || 0) + (increment ? 1 : -1);
    }
  }

  async getFavorites(): Promise<Favorite[]> {
    return Array.from(this.favorites.values());
  }

  async getFavoritesByTipIds(tipIds: string[]): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(fav => tipIds.includes(fav.tipId));
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = randomUUID();
    const favorite: Favorite = {
      ...insertFavorite,
      id,
      createdAt: new Date(),
    };
    
    this.favorites.set(id, favorite);
    await this.updateTipFavorites(favorite.tipId, true);
    this.userStats.favoritesCount++;
    
    return favorite;
  }

  async removeFavorite(tipId: string): Promise<void> {
    const favorite = Array.from(this.favorites.values()).find(f => f.tipId === tipId);
    if (favorite) {
      this.favorites.delete(favorite.id);
      await this.updateTipFavorites(tipId, false);
      this.userStats.favoritesCount--;
    }
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => b.count - a.count);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = {
      ...insertCategory,
      id,
      count: 0,
    };
    
    this.categories.set(id, category);
    return category;
  }

  async updateCategoryCount(name: string, increment: boolean): Promise<void> {
    const category = Array.from(this.categories.values()).find(c => c.name === name);
    if (category) {
      category.count += increment ? 1 : -1;
    }
  }

  async getUserStats(): Promise<UserStats> {
    return { ...this.userStats };
  }

  async updateUserStats(stats: Partial<UserStats>): Promise<UserStats> {
    this.userStats = { ...this.userStats, ...stats, lastActive: new Date() };
    return { ...this.userStats };
  }
}

export const storage = new MemStorage();
