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
      // Leadership Tips
      {
        text: "Lead by example: Demonstrate the behaviors and work ethic you expect from your team.",
        category: "Leadership"
      },
      {
        text: "Practice active listening: Give team members your full attention and ask clarifying questions.",
        category: "Leadership"
      },
      {
        text: "Provide specific, constructive feedback regularly rather than waiting for formal reviews.",
        category: "Leadership"
      },
      {
        text: "Delegate effectively: Match tasks to team members' strengths and provide clear expectations.",
        category: "Leadership"
      },
      {
        text: "Recognize and celebrate team achievements publicly to boost morale and motivation.",
        category: "Leadership"
      },
      {
        text: "Make data-driven decisions: Use metrics and analytics to guide your team's direction.",
        category: "Leadership"
      },
      {
        text: "Foster psychological safety: Create an environment where team members feel safe to share ideas and concerns.",
        category: "Leadership"
      },
      {
        text: "Invest in your team's growth: Provide learning opportunities and career development support.",
        category: "Leadership"
      },
      // Technology Tips
      {
        text: "Use keyboard shortcuts to navigate your favorite apps 50% faster than using a mouse.",
        category: "Technology"
      },
      {
        text: "Set up automated backups for all important files to prevent data loss disasters.",
        category: "Technology"
      },
      {
        text: "Learn to use version control systems like Git to track changes and collaborate effectively.",
        category: "Technology"
      },
      {
        text: "Use password managers to generate and store unique, strong passwords for all accounts.",
        category: "Technology"
      },
      {
        text: "Automate repetitive tasks with tools like IFTTT, Zapier, or simple scripts.",
        category: "Technology"
      },
      {
        text: "Keep your software updated to benefit from security patches and new features.",
        category: "Technology"
      },
      {
        text: "Use cloud storage services for seamless file access across all your devices.",
        category: "Technology"
      },
      {
        text: "Learn basic command line operations to perform tasks more efficiently than GUI alternatives.",
        category: "Technology"
      },
      {
        text: "Use dual monitors or ultrawide displays to increase your screen real estate and multitasking ability.",
        category: "Technology"
      },
      {
        text: "Implement the 3-2-1 backup rule: 3 copies of data, 2 on different media, 1 offsite.",
        category: "Technology"
      },
      // More Time Management Tips
      {
        text: "Time-box your tasks: Assign specific durations to activities to prevent them from expanding unnecessarily.",
        category: "Time Management"
      },
      {
        text: "Use the Getting Things Done (GTD) method: Capture everything in a trusted system and regularly review.",
        category: "Time Management"
      },
      {
        text: "Apply Parkinson's Law: Set tighter deadlines to force yourself to work more efficiently.",
        category: "Time Management"
      },
      {
        text: "Schedule your most important work during your peak energy hours.",
        category: "Time Management"
      },
      // More Planning Tips
      {
        text: "Use the SMART criteria for goal setting: Specific, Measurable, Achievable, Relevant, Time-bound.",
        category: "Planning"
      },
      {
        text: "Plan your week every Sunday: Set priorities and prepare for upcoming challenges.",
        category: "Planning"
      },
      {
        text: "Create project roadmaps to visualize timelines and dependencies.",
        category: "Planning"
      },
      {
        text: "Use backward planning: Start with your deadline and work backwards to create milestones.",
        category: "Planning"
      },
      {
        text: "Conduct regular planning reviews to adjust strategies based on what's working.",
        category: "Planning"
      },
      // More Focus & Concentration Tips
      {
        text: "Use the Forest app or similar tools to gamify staying off your phone during work.",
        category: "Focus & Concentration"
      },
      {
        text: "Practice single-tasking: Focus on one task at a time for better quality results.",
        category: "Focus & Concentration"
      },
      {
        text: "Create environmental cues for focus: Use specific music, lighting, or workspace setups.",
        category: "Focus & Concentration"
      },
      {
        text: "Apply the 90-minute rule: Work in focused sprints aligned with your natural attention cycles.",
        category: "Focus & Concentration"
      },
      {
        text: "Use the 'Do Not Disturb' mode on all devices during important work sessions.",
        category: "Focus & Concentration"
      },
      // More Efficiency Tips
      {
        text: "Create and use email templates for common responses to save time.",
        category: "Efficiency"
      },
      {
        text: "Use the ABCDE method: Prioritize tasks by consequences (A=must do, E=eliminate).",
        category: "Efficiency"
      },
      {
        text: "Implement the one-touch rule: Handle emails and documents only once when possible.",
        category: "Efficiency"
      },
      {
        text: "Use voice-to-text software to speed up writing and note-taking.",
        category: "Efficiency"
      },
      {
        text: "Master touch typing to increase your writing speed by 30-50%.",
        category: "Efficiency"
      },
      // More Wellness Tips
      {
        text: "Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.",
        category: "Wellness"
      },
      {
        text: "Stay hydrated: Keep a water bottle at your desk and drink regularly throughout the day.",
        category: "Wellness"
      },
      {
        text: "Practice the 4-7-8 breathing technique for quick stress relief and focus.",
        category: "Wellness"
      },
      {
        text: "Take walking meetings when possible to combine exercise with work discussions.",
        category: "Wellness"
      },
      {
        text: "Maintain good posture and ergonomics to prevent long-term health issues.",
        category: "Wellness"
      },
      {
        text: "Establish boundaries between work and personal time to prevent burnout.",
        category: "Wellness"
      },
      // More Organization Tips
      {
        text: "Implement the PARA method: Projects, Areas, Resources, Archive for digital organization.",
        category: "Organization"
      },
      {
        text: "Use the 'two-minute rule': If it takes less than two minutes, do it now instead of adding to your list.",
        category: "Organization"
      },
      {
        text: "Create a designated inbox for all incoming tasks, ideas, and documents.",
        category: "Organization"
      },
      {
        text: "Organize your digital files with consistent naming conventions and folder structures.",
        category: "Organization"
      },
      {
        text: "Conduct weekly reviews to clean up your workspace and systems.",
        category: "Organization"
      },
      {
        text: "Use color-coding systems for different types of tasks or projects.",
        category: "Organization"
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
        category.count = (category.count || 0) + 1;
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
      tip.views = (tip.views ?? 0) + 1;
    }
  }

  async updateTipFavorites(id: string, increment: boolean): Promise<void> {
    const tip = this.tips.get(id);
    if (tip) {
      tip.favorites = (tip.favorites ?? 0) + (increment ? 1 : -1);
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
    return Array.from(this.categories.values()).sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
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
      category.count = (category.count ?? 0) + (increment ? 1 : -1);
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
