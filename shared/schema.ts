import { pgTable, text, serial, integer, boolean, jsonb, timestamp, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table - updated for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  username: varchar("username").unique(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  iconName: text("icon_name"),
  color: text("color"),
});

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull(),
  websiteUrl: text("website_url").notNull(),
  affiliateUrl: text("affiliate_url"),
  imageUrl: text("image_url"),
  rating: integer("rating"),
  featured: boolean("featured").default(false),
  createdById: varchar("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  canonicalUrl: text("canonical_url"),
  structuredData: jsonb("structured_data"),
  useCases: text("use_cases"),
  pricing: text("pricing"),
  pricingType: text("pricing_type").notNull().default('free'), // 'free', 'freemium', 'paid'
  pros: jsonb("pros"),
  cons: jsonb("cons"),
  seoScore: integer("seo_score"),
  performanceScore: integer("performance_score"),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  toolId: integer("tool_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: varchar("author_id").references(() => users.id),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const prompts = pgTable("prompts", {
  id: serial("id").primaryKey(),
  toolId: integer("tool_id").notNull(),
  title: text("title").notNull(),
  promptText: text("prompt_text").notNull(),
  createdById: varchar("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const guides = pgTable("guides", {
  id: serial("id").primaryKey(),
  toolId: integer("tool_id").notNull(),
  title: text("title").notNull(),
  steps: jsonb("steps").notNull(),
  authorId: varchar("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User favorites table for saving favorite tools
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  toolId: integer("tool_id").notNull().references(() => tools.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  username: true,
  isAdmin: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true, 
  slug: true,
  description: true,
  metaTitle: true,
  metaDescription: true,
  metaKeywords: true,
  iconName: true,
  color: true,
});

export const insertToolSchema = createInsertSchema(tools).pick({
  name: true,
  slug: true,
  description: true,
  categoryId: true,
  websiteUrl: true,
  affiliateUrl: true,
  imageUrl: true,
  rating: true,
  featured: true,
  createdById: true,
  metaTitle: true,
  metaDescription: true,
  metaKeywords: true,
  canonicalUrl: true,
  structuredData: true,
  useCases: true,
  pricing: true,
  pricingType: true,
  pros: true,
  cons: true,
  seoScore: true,
  performanceScore: true,
});

export const insertBlogSchema = createInsertSchema(blogs).pick({
  toolId: true,
  title: true, 
  content: true,
});

export const insertPromptSchema = createInsertSchema(prompts).pick({
  toolId: true,
  title: true,
  promptText: true,
});

export const insertGuideSchema = createInsertSchema(guides).pick({
  toolId: true,
  title: true,
  steps: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertTool = z.infer<typeof insertToolSchema>;
export type Tool = typeof tools.$inferSelect;

export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogs.$inferSelect;

export type InsertPrompt = z.infer<typeof insertPromptSchema>;
export type Prompt = typeof prompts.$inferSelect;

export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type Guide = typeof guides.$inferSelect;

// Extended types for combined data
export type ToolWithDetails = Tool & {
  category: Category;
  blog?: Blog;
  prompts: Prompt[];
  guide?: Guide;
};
