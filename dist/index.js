// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  tips;
  favorites;
  categories;
  userStats;
  constructor() {
    this.tips = /* @__PURE__ */ new Map();
    this.favorites = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.userStats = {
      id: randomUUID(),
      dailyTips: 0,
      streak: 7,
      totalTips: 0,
      favoritesCount: 0,
      lastActive: /* @__PURE__ */ new Date()
    };
    this.initializeSampleData();
  }
  initializeSampleData() {
    const sampleCategories = [
      { name: "Time Management" },
      { name: "Focus & Concentration" },
      { name: "Organization" },
      { name: "Planning" },
      { name: "Wellness" },
      { name: "Efficiency" },
      { name: "Leadership" },
      { name: "Technology" }
    ];
    sampleCategories.forEach((cat) => {
      const id = randomUUID();
      this.categories.set(id, {
        id,
        name: cat.name,
        count: 0
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
      }
    ];
    sampleTips.forEach((tip, index) => {
      const id = randomUUID();
      this.tips.set(id, {
        id,
        text: tip.text,
        category: tip.category,
        views: Math.floor(Math.random() * 1e3) + 500,
        favorites: Math.floor(Math.random() * 100) + 20,
        rating: Math.floor(Math.random() * 20) + 40,
        // 4.0-5.0 range
        createdAt: new Date(Date.now() - index * 864e5)
        // Spread over days
      });
      const category = Array.from(this.categories.values()).find((c) => c.name === tip.category);
      if (category) {
        category.count = (category.count || 0) + 1;
      }
    });
    this.userStats.totalTips = sampleTips.length;
  }
  async getTips() {
    return Array.from(this.tips.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getTip(id) {
    return this.tips.get(id);
  }
  async getTipsByCategory(category) {
    return Array.from(this.tips.values()).filter((tip) => tip.category === category);
  }
  async searchTips(query) {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tips.values()).filter(
      (tip) => tip.text.toLowerCase().includes(lowerQuery) || tip.category.toLowerCase().includes(lowerQuery)
    );
  }
  async createTip(insertTip) {
    const id = randomUUID();
    const tip = {
      ...insertTip,
      id,
      views: 0,
      favorites: 0,
      rating: 0,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.tips.set(id, tip);
    await this.updateCategoryCount(tip.category, true);
    this.userStats.totalTips++;
    return tip;
  }
  async updateTipViews(id) {
    const tip = this.tips.get(id);
    if (tip) {
      tip.views = (tip.views ?? 0) + 1;
    }
  }
  async updateTipFavorites(id, increment) {
    const tip = this.tips.get(id);
    if (tip) {
      tip.favorites = (tip.favorites ?? 0) + (increment ? 1 : -1);
    }
  }
  async getFavorites() {
    return Array.from(this.favorites.values());
  }
  async getFavoritesByTipIds(tipIds) {
    return Array.from(this.favorites.values()).filter((fav) => tipIds.includes(fav.tipId));
  }
  async addFavorite(insertFavorite) {
    const id = randomUUID();
    const favorite = {
      ...insertFavorite,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.favorites.set(id, favorite);
    await this.updateTipFavorites(favorite.tipId, true);
    this.userStats.favoritesCount++;
    return favorite;
  }
  async removeFavorite(tipId) {
    const favorite = Array.from(this.favorites.values()).find((f) => f.tipId === tipId);
    if (favorite) {
      this.favorites.delete(favorite.id);
      await this.updateTipFavorites(tipId, false);
      this.userStats.favoritesCount--;
    }
  }
  async getCategories() {
    return Array.from(this.categories.values()).sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
  }
  async createCategory(insertCategory) {
    const id = randomUUID();
    const category = {
      ...insertCategory,
      id,
      count: 0
    };
    this.categories.set(id, category);
    return category;
  }
  async updateCategoryCount(name, increment) {
    const category = Array.from(this.categories.values()).find((c) => c.name === name);
    if (category) {
      category.count = (category.count ?? 0) + (increment ? 1 : -1);
    }
  }
  async getUserStats() {
    return { ...this.userStats };
  }
  async updateUserStats(stats) {
    this.userStats = { ...this.userStats, ...stats, lastActive: /* @__PURE__ */ new Date() };
    return { ...this.userStats };
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var tips = pgTable("tips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  text: text("text").notNull(),
  category: text("category").notNull(),
  views: integer("views").default(0).notNull(),
  favorites: integer("favorites").default(0).notNull(),
  rating: integer("rating").default(0).notNull(),
  // Store as integer (rating * 10) for precision
  createdAt: timestamp("created_at").default(sql`now()`)
});
var userStats = pgTable("user_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dailyTips: integer("daily_tips").default(0).notNull(),
  streak: integer("streak").default(0).notNull(),
  totalTips: integer("total_tips").default(0).notNull(),
  favoritesCount: integer("favorites_count").default(0).notNull(),
  lastActive: timestamp("last_active").default(sql`now()`)
});
var favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tipId: varchar("tip_id").notNull().references(() => tips.id),
  createdAt: timestamp("created_at").default(sql`now()`)
});
var categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  count: integer("count").default(0).notNull()
});
var insertTipSchema = createInsertSchema(tips).omit({
  id: true,
  views: true,
  favorites: true,
  rating: true,
  createdAt: true
});
var insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true
});
var insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  count: true
});
var insertUserStatsSchema = createInsertSchema(userStats).omit({
  id: true,
  lastActive: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/tips", async (req, res) => {
    try {
      const tips2 = await storage.getTips();
      res.json(tips2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tips" });
    }
  });
  app2.get("/api/tips/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const tips2 = await storage.getTipsByCategory(category);
      res.json(tips2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tips by category" });
    }
  });
  app2.get("/api/tips/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Search query is required" });
      }
      const tips2 = await storage.searchTips(q);
      res.json(tips2);
    } catch (error) {
      res.status(500).json({ error: "Failed to search tips" });
    }
  });
  app2.get("/api/tips/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const tip = await storage.getTip(id);
      if (!tip) {
        return res.status(404).json({ error: "Tip not found" });
      }
      await storage.updateTipViews(id);
      const stats = await storage.getUserStats();
      await storage.updateUserStats({ dailyTips: (stats.dailyTips ?? 0) + 1 });
      res.json(tip);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tip" });
    }
  });
  app2.post("/api/tips", async (req, res) => {
    try {
      const validation = insertTipSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.issues });
      }
      const tip = await storage.createTip(validation.data);
      res.status(201).json(tip);
    } catch (error) {
      res.status(500).json({ error: "Failed to create tip" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories2 = await storage.getCategories();
      res.json(categories2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  app2.get("/api/favorites", async (req, res) => {
    try {
      const favorites2 = await storage.getFavorites();
      res.json(favorites2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  });
  app2.post("/api/favorites", async (req, res) => {
    try {
      const validation = insertFavoriteSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.issues });
      }
      const favorite = await storage.addFavorite(validation.data);
      res.status(201).json(favorite);
    } catch (error) {
      res.status(500).json({ error: "Failed to add favorite" });
    }
  });
  app2.delete("/api/favorites/:tipId", async (req, res) => {
    try {
      const { tipId } = req.params;
      await storage.removeFavorite(tipId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to remove favorite" });
    }
  });
  app2.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });
  app2.get("/api/random-tip", async (req, res) => {
    try {
      const tips2 = await storage.getTips();
      if (tips2.length === 0) {
        return res.status(404).json({ error: "No tips available" });
      }
      const randomTip = tips2[Math.floor(Math.random() * tips2.length)];
      await storage.updateTipViews(randomTip.id);
      const stats = await storage.getUserStats();
      await storage.updateUserStats({ dailyTips: (stats.dailyTips ?? 0) + 1 });
      res.json(randomTip);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch random tip" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
