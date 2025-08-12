import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tips = pgTable("tips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  text: text("text").notNull(),
  category: text("category").notNull(),
  views: integer("views").default(0),
  favorites: integer("favorites").default(0),
  rating: integer("rating").default(0), // Store as integer (rating * 10) for precision
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const userStats = pgTable("user_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dailyTips: integer("daily_tips").default(0),
  streak: integer("streak").default(0),
  totalTips: integer("total_tips").default(0),
  favoritesCount: integer("favorites_count").default(0),
  lastActive: timestamp("last_active").default(sql`now()`),
});

export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tipId: varchar("tip_id").notNull().references(() => tips.id),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  count: integer("count").default(0),
});

export const insertTipSchema = createInsertSchema(tips).omit({
  id: true,
  views: true,
  favorites: true,
  rating: true,
  createdAt: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  count: true,
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({
  id: true,
  lastActive: true,
});

export type InsertTip = z.infer<typeof insertTipSchema>;
export type Tip = typeof tips.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type UserStats = typeof userStats.$inferSelect;
