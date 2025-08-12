import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTipSchema, insertFavoriteSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tips
  app.get("/api/tips", async (req, res) => {
    try {
      const tips = await storage.getTips();
      res.json(tips);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tips" });
    }
  });

  // Get tips by category
  app.get("/api/tips/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const tips = await storage.getTipsByCategory(category);
      res.json(tips);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tips by category" });
    }
  });

  // Search tips
  app.get("/api/tips/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Search query is required" });
      }
      const tips = await storage.searchTips(q);
      res.json(tips);
    } catch (error) {
      res.status(500).json({ error: "Failed to search tips" });
    }
  });

  // Get single tip and increment views
  app.get("/api/tips/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const tip = await storage.getTip(id);
      if (!tip) {
        return res.status(404).json({ error: "Tip not found" });
      }
      
      // Increment view count
      await storage.updateTipViews(id);
      
      // Update user daily tips count
      const stats = await storage.getUserStats();
      await storage.updateUserStats({ dailyTips: stats.dailyTips + 1 });
      
      res.json(tip);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tip" });
    }
  });

  // Create new tip
  app.post("/api/tips", async (req, res) => {
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

  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get all favorites
  app.get("/api/favorites", async (req, res) => {
    try {
      const favorites = await storage.getFavorites();
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  });

  // Add favorite
  app.post("/api/favorites", async (req, res) => {
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

  // Remove favorite
  app.delete("/api/favorites/:tipId", async (req, res) => {
    try {
      const { tipId } = req.params;
      await storage.removeFavorite(tipId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to remove favorite" });
    }
  });

  // Get user stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Get random tip
  app.get("/api/tips/random", async (req, res) => {
    try {
      const tips = await storage.getTips();
      if (tips.length === 0) {
        return res.status(404).json({ error: "No tips available" });
      }
      
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      
      // Increment view count
      await storage.updateTipViews(randomTip.id);
      
      // Update user daily tips count
      const stats = await storage.getUserStats();
      await storage.updateUserStats({ dailyTips: stats.dailyTips + 1 });
      
      res.json(randomTip);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch random tip" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
