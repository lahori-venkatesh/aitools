import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  tools, type Tool, type InsertTool,
  blogs, type Blog, type InsertBlog,
  prompts, type Prompt, type InsertPrompt,
  guides, type Guide, type InsertGuide,
  type ToolWithDetails
} from "@shared/schema";
import { demoCategories, generateDemoTools } from "./demoData";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Tools
  getTools(): Promise<Tool[]>;
  getToolsByCategory(categoryId: number): Promise<Tool[]>;
  getToolBySlug(slug: string): Promise<Tool | undefined>;
  getFeaturedTools(): Promise<Tool[]>;
  getToolWithDetails(toolId: number): Promise<ToolWithDetails | undefined>;
  getToolWithDetailsBySlug(slug: string): Promise<ToolWithDetails | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  searchTools(query: string): Promise<Tool[]>;
  
  // Blogs
  getBlogByToolId(toolId: number): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  
  // Prompts
  getPromptsByToolId(toolId: number): Promise<Prompt[]>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  
  // Guides
  getGuideByToolId(toolId: number): Promise<Guide | undefined>;
  createGuide(guide: InsertGuide): Promise<Guide>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private tools: Map<number, Tool>;
  private blogs: Map<number, Blog>;
  private prompts: Map<number, Prompt>;
  private guides: Map<number, Guide>;
  
  private currentIds: {
    user: number;
    category: number;
    tool: number;
    blog: number;
    prompt: number;
    guide: number;
  };

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.tools = new Map();
    this.blogs = new Map();
    this.prompts = new Map();
    this.guides = new Map();
    
    this.currentIds = {
      user: 1,
      category: 1,
      tool: 1,
      blog: 1,
      prompt: 1,
      guide: 1
    };
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.user++;
    const user = { ...insertUser, id } as User;
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentIds.category++;
    const category = { ...insertCategory, id } as Category;
    this.categories.set(id, category);
    return category;
  }
  
  // Tool methods
  async getTools(): Promise<Tool[]> {
    return Array.from(this.tools.values());
  }
  
  async getToolsByCategory(categoryId: number): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(
      (tool) => tool.categoryId === categoryId
    );
  }
  
  async getToolBySlug(slug: string): Promise<Tool | undefined> {
    return Array.from(this.tools.values()).find(
      (tool) => tool.slug === slug
    );
  }
  
  async getFeaturedTools(): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(
      (tool) => tool.featured === true
    );
  }
  
  async getToolWithDetails(toolId: number): Promise<ToolWithDetails | undefined> {
    const tool = this.tools.get(toolId);
    if (!tool) return undefined;
    
    const category = this.categories.get(tool.categoryId);
    if (!category) return undefined;
    
    const blog = await this.getBlogByToolId(toolId);
    const prompts = await this.getPromptsByToolId(toolId);
    const guide = await this.getGuideByToolId(toolId);
    
    return {
      ...tool,
      category,
      blog,
      prompts,
      guide
    };
  }
  
  async getToolWithDetailsBySlug(slug: string): Promise<ToolWithDetails | undefined> {
    const tool = await this.getToolBySlug(slug);
    if (!tool) return undefined;
    
    return this.getToolWithDetails(tool.id);
  }
  
  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentIds.tool++;
    const tool = { ...insertTool, id } as Tool;
    this.tools.set(id, tool);
    return tool;
  }
  
  async searchTools(query: string): Promise<Tool[]> {
    const queryLower = query.toLowerCase();
    return Array.from(this.tools.values()).filter(tool => {
      return (
        tool.name.toLowerCase().includes(queryLower) ||
        tool.description.toLowerCase().includes(queryLower)
      );
    });
  }
  
  // Blog methods
  async getBlogByToolId(toolId: number): Promise<Blog | undefined> {
    return Array.from(this.blogs.values()).find(
      (blog) => blog.toolId === toolId
    );
  }
  
  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = this.currentIds.blog++;
    const blog = { ...insertBlog, id } as Blog;
    this.blogs.set(id, blog);
    return blog;
  }
  
  // Prompt methods
  async getPromptsByToolId(toolId: number): Promise<Prompt[]> {
    return Array.from(this.prompts.values()).filter(
      (prompt) => prompt.toolId === toolId
    );
  }
  
  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const id = this.currentIds.prompt++;
    const prompt = { ...insertPrompt, id } as Prompt;
    this.prompts.set(id, prompt);
    return prompt;
  }

  async updateTool(id: number, toolData: Partial<InsertTool>): Promise<Tool> {
    const tool = this.tools.get(id);
    if (!tool) throw new Error("Tool not found");
    const updatedTool = { ...tool, ...toolData };
    this.tools.set(id, updatedTool);
    return updatedTool;
  }

  async updateBlog(id: number, blogData: Partial<InsertBlog>): Promise<Blog> {
    const blog = this.blogs.get(id);
    if (!blog) throw new Error("Blog not found");
    const updatedBlog = { ...blog, ...blogData };
    this.blogs.set(id, updatedBlog);
    return updatedBlog;
  }

  async updatePrompt(id: number, promptData: Partial<InsertPrompt>): Promise<Prompt> {
    const prompt = this.prompts.get(id);
    if (!prompt) throw new Error("Prompt not found");
    const updatedPrompt = { ...prompt, ...promptData };
    this.prompts.set(id, updatedPrompt);
    return updatedPrompt;
  }

  async deleteTool(id: number): Promise<void> {
    if (!this.tools.has(id)) throw new Error("Tool not found");
    this.tools.delete(id);
  }

  async deleteBlog(id: number): Promise<void> {
    if (!this.blogs.has(id)) throw new Error("Blog not found");
    this.blogs.delete(id);
  }

  async deletePrompt(id: number): Promise<void> {
    if (!this.prompts.has(id)) throw new Error("Prompt not found");
    this.prompts.delete(id);
  }
  
  // Guide methods
  async getGuideByToolId(toolId: number): Promise<Guide | undefined> {
    return Array.from(this.guides.values()).find(
      (guide) => guide.toolId === toolId
    );
  }
  
  async createGuide(insertGuide: InsertGuide): Promise<Guide> {
    const id = this.currentIds.guide++;
    const guide = { ...insertGuide, id } as Guide;
    this.guides.set(id, guide);
    return guide;
  }
  
  // Initialize demo data
  private async initializeDemoData() {
    console.log("Initializing demo data with categories and tools...");
    
    // Create categories from our demo data
    const categoryMap = new Map<string, number>();
    
    // Create all the categories from our demo data
    for (const categoryData of demoCategories) {
      const category = await this.createCategory(categoryData);
      categoryMap.set(categoryData.slug, category.id);
      console.log(`Created category: ${category.name}`);
    }
    
    // Generate tools using our helper function
    const demoTools = generateDemoTools(categoryMap);
    
    // Create the tools
    for (const toolData of demoTools) {
      await this.createTool(toolData);
      console.log(`Created tool: ${toolData.name}`);
    }
    
    // Add some demo blogs, guides, and prompts for featured tools
    const featuredTools = await this.getFeaturedTools();
    
    if (featuredTools.length > 0) {
      // Create a blog post for the first featured tool
      const firstTool = featuredTools[0];
      await this.createBlog({
        toolId: firstTool.id,
        title: `Ultimate Guide to Using ${firstTool.name}`,
        content: `# The Ultimate Guide to ${firstTool.name}\n\n## Introduction\n\n${firstTool.name} is one of the most powerful AI tools available today. In this comprehensive guide, we'll explore its capabilities and show you how to get the most value from it.\n\n## Key Features\n\n${firstTool.description}\n\n## Best Practices\n\nTo get the most out of ${firstTool.name}, follow these best practices...`
      });
      
      // Create a guide for the tool
      await this.createGuide({
        toolId: firstTool.id,
        title: `How to Get Started with ${firstTool.name}`,
        steps: [
          "Sign up for an account on their website",
          "Complete the initial setup wizard",
          "Create your first project",
          "Experiment with different settings to find what works best",
          "Review the results and refine your approach"
        ]
      });
      
      // Create some example prompts
      await this.createPrompt({
        toolId: firstTool.id,
        title: "General Purpose Template",
        promptText: `I want you to act as an expert in [TOPIC]. Please provide detailed information about [SPECIFIC QUESTION].`
      });
      
      await this.createPrompt({
        toolId: firstTool.id,
        title: "Creative Writing Template",
        promptText: `Write a [STYLE] story about [TOPIC] with the following characters: [CHARACTER LIST]. The story should include themes of [THEMES] and take place in [SETTING].`
      });
    }
  }
}

export const storage = new MemStorage();