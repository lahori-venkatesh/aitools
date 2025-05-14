import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { aiEnhancedSearch } from "./openai";
import { createHash } from 'crypto';

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // API routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });

  app.get("/api/tools", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
      const query = req.query.q ? String(req.query.q) : undefined;
      const useAI = req.query.ai === 'true';

      let tools;
      let response;

      if (query) {
        tools = await storage.searchTools(query);

        if (useAI && tools.length > 0 && query.trim().length >= 3) {
          try {
            const aiResults = await aiEnhancedSearch(query, tools);
            return res.json({
              query,
              results: aiResults.rankedTools,
              aiEnhanced: true,
              message: aiResults.message || "AI-enhanced search results",
              error: aiResults.error
            });
          } catch (aiError) {
            console.error("AI search error:", aiError);
          }
        }

        response = {
          query,
          results: tools,
          aiEnhanced: false
        };
      } else if (categoryId) {
        tools = await storage.getToolsByCategory(categoryId);
        response = tools;
      } else {
        tools = await storage.getTools();
        response = tools;
      }

      res.json(response);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Error fetching tools" });
    }
  });

  app.get("/api/tools/featured", async (req, res) => {
    try {
      const featuredTools = await storage.getFeaturedTools();
      res.json(featuredTools);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured tools" });
    }
  });

  app.get("/api/tools/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const tool = await storage.getToolWithDetailsBySlug(slug);

      if (!tool) {
        return res.status(404).json({ message: "Tool not found" });
      }

      res.json(tool);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tool details" });
    }
  });

  app.get("/api/categories/:slug/tools", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const tools = await storage.getToolsByCategory(category.id);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tools by category" });
    }
  });

  app.post("/api/tools/submit", isAuthenticated, async (req, res) => {
    try {
      const { 
        name, description, categoryId, websiteUrl, 
        imageUrl, pricingType, price, features,
        demoUrl, documentationUrl, rating 
      } = req.body;

      if (!name || !description || !categoryId || !websiteUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (pricingType && !['free', 'freemium', 'paid'].includes(pricingType)) {
        return res.status(400).json({ message: "Invalid pricing type" });
      }

      if (rating && (isNaN(rating) || rating < 0 || rating > 5)) {
        return res.status(400).json({ message: "Rating must be between 0 and 5" });
      }

      const slug = name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

      const existingTools = await storage.getTools();
      const duplicateByName = existingTools.find(
        tool => tool.name.toLowerCase() === name.toLowerCase()
      );

      if (duplicateByName) {
        return res.status(409).json({ 
          message: "A tool with this name already exists",
          duplicate: duplicateByName
        });
      }

      const duplicateByUrl = existingTools.find(
        tool => tool.websiteUrl.toLowerCase() === websiteUrl.toLowerCase()
      );

      if (duplicateByUrl) {
        return res.status(409).json({ 
          message: "A tool with this website URL already exists",
          duplicate: duplicateByUrl
        });
      }

      const tool = await storage.createTool({
        name,
        slug,
        description,
        categoryId: Number(categoryId),
        websiteUrl,
        affiliateUrl: req.body.affiliateUrl,
        imageUrl: req.body.imageUrl,
        rating: req.body.rating ? Number(req.body.rating) : undefined,
        featured: false,
      });

      res.status(201).json(tool);
    } catch (error) {
      res.status(500).json({ message: "Error submitting tool" });
    }
  });

  app.post("/api/prompts", isAuthenticated, async (req, res) => {
    try {
      const { 
        toolId, title, promptText, category,
        exampleOutput, useCase, tips 
      } = req.body;

      if (!toolId || !title || !promptText) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (!category) {
        return res.status(400).json({ message: "Category is required for organization" });
      }

      const prompt = await storage.createPrompt({
        toolId: Number(toolId),
        title,
        promptText
      });

      res.status(201).json(prompt);
    } catch (error) {
      res.status(500).json({ message: "Error submitting prompt" });
    }
  });

  app.post("/api/guides", isAuthenticated, async (req, res) => {
    try {
      const { toolId, title, steps } = req.body;

      if (!toolId || !title || !steps || !Array.isArray(steps)) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const guide = await storage.createGuide({
        toolId: Number(toolId),
        title,
        steps
      });

      res.status(201).json(guide);
    } catch (error) {
      res.status(500).json({ message: "Error submitting guide" });
    }
  });

  app.post("/api/blogs", isAuthenticated, async (req, res) => {
    try {
      const { 
        toolId, title, content, coverImage,
        summary, readTime, tags 
      } = req.body;

      if (!toolId || !title || !content) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (readTime && isNaN(parseInt(readTime))) {
        return res.status(400).json({ message: "Read time must be a number" });
      }

      const blog = await storage.createBlog({
        toolId: Number(toolId),
        title,
        content
      });

      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Error submitting blog" });
    }
  });

  // Edit routes
  app.put("/api/tools/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const toolData = req.body;
      const updatedTool = await storage.updateTool(Number(id), toolData);
      res.json(updatedTool);
    } catch (error) {
      res.status(500).json({ message: "Error updating tool" });
    }
  });

  app.put("/api/blogs/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const blogData = req.body;
      const updatedBlog = await storage.updateBlog(Number(id), blogData);
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: "Error updating blog" });
    }
  });

  app.put("/api/prompts/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const promptData = req.body;
      const updatedPrompt = await storage.updatePrompt(Number(id), promptData);
      res.json(updatedPrompt);
    } catch (error) {
      res.status(500).json({ message: "Error updating prompt" });
    }
  });

  // Delete routes
  app.delete("/api/tools/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTool(Number(id));
      res.json({ message: "Tool deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting tool" });
    }
  });

  app.delete("/api/blogs/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlog(Number(id));
      res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting blog" });
    }
  });

  app.delete("/api/prompts/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePrompt(Number(id));
      res.json({ message: "Prompt deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting prompt" });
    }
  });

  app.get("/api/user/favorites", isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).claims.sub;
      // Implement favorites functionality later
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Error fetching favorites" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

async function isDuplicate(content: string, type: 'blog' | 'prompt'): Promise<boolean> {
  const hash = createHash('md5').update(content.toLowerCase().trim()).digest('hex');
  // Assuming 'db' and 'eq' are defined elsewhere in your project
  // Replace with your actual database logic
  return false;
}

// Add to your route handlers
// app.post('/api/blogs', async (req, res) => { // The app variable is defined here but should be an argument of the route handler function
//   const isDupe = await isDuplicate(req.body.content, 'blog');
//   if (isDupe) {
//     return res.status(400).json({ error: 'Similar content already exists' });
//   }
//   // Continue with blog creation
// });
//
// app.post('/api/prompts', async (req, res) => { // The app variable is defined here but should be an argument of the route handler function
//   const isDupe = await isDuplicate(req.body.content, 'prompt');
//   if (isDupe) {
//     return res.status(400).json({ error: 'Similar prompt already exists' });
//   }
//   // Continue with prompt creation
// });