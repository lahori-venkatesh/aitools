
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Enhanced form states
  const [toolForm, setToolForm] = useState({
    name: '',
    description: '',
    categoryId: '',
    websiteUrl: '',
    imageUrl: '',
    pricingType: 'free', // free, freemium, paid
    price: '',
    features: '',
    demoUrl: '',
    documentationUrl: '',
    rating: '0'
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    toolId: '',
    coverImage: '',
    summary: '',
    readTime: '',
    tags: ''
  });

  const [promptForm, setPromptForm] = useState({
    title: '',
    promptText: '',
    toolId: '',
    category: '',
    exampleOutput: '',
    useCase: '',
    tips: ''
  });

  // Queries and mutations...
  const { data: tools, isLoading: isToolsLoading, error: toolsError } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const res = await fetch('/api/tools');
      if (!res.ok) throw new Error('Failed to fetch tools');
      return res.json();
    }
  });

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    }
  });

  const createTool = useMutation({
    mutationFn: (data) => 
      fetch('/api/tools/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      toast({ title: "Tool created successfully" });
      setToolForm({
        name: '',
        description: '',
        categoryId: '',
        websiteUrl: '',
        imageUrl: '',
        pricingType: 'free',
        price: '',
        features: '',
        demoUrl: '',
        documentationUrl: '',
        rating: '0'
      });
    }
  });

  const createBlog = useMutation({
    mutationFn: (data) => 
      fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({ title: "Blog created successfully" });
      setBlogForm({
        title: '',
        content: '',
        toolId: '',
        coverImage: '',
        summary: '',
        readTime: '',
        tags: ''
      });
    }
  });

  const createPrompt = useMutation({
    mutationFn: (data) => 
      fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast({ title: "Prompt created successfully" });
      setPromptForm({
        title: '',
        promptText: '',
        toolId: '',
        category: '',
        exampleOutput: '',
        useCase: '',
        tips: ''
      });
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({ title: "Login successful" });
    } else {
      toast({ title: "Invalid credentials", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-8">
        <Card className="max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-sm text-gray-500 text-center mt-2">
              Use email: admin@example.com / password: admin123
            </p>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="tools">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New AI Tool</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              createTool.mutate(toolForm);
            }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Tool Name"
                    value={toolForm.name}
                    onChange={(e) => setToolForm({...toolForm, name: e.target.value})}
                  />
                  <Select
                    value={toolForm.categoryId}
                    onValueChange={(value) => setToolForm({...toolForm, categoryId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Website URL"
                    value={toolForm.websiteUrl}
                    onChange={(e) => setToolForm({...toolForm, websiteUrl: e.target.value})}
                  />
                  <Input
                    placeholder="Demo URL"
                    value={toolForm.demoUrl}
                    onChange={(e) => setToolForm({...toolForm, demoUrl: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    placeholder="Tool Image URL"
                    value={toolForm.imageUrl}
                    onChange={(e) => setToolForm({...toolForm, imageUrl: e.target.value})}
                  />
                  <Input
                    placeholder="Documentation URL"
                    value={toolForm.documentationUrl}
                    onChange={(e) => setToolForm({...toolForm, documentationUrl: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Rating (0-5)"
                    min="0"
                    max="5"
                    step="0.1"
                    value={toolForm.rating}
                    onChange={(e) => setToolForm({...toolForm, rating: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Pricing Type</Label>
                <RadioGroup
                  value={toolForm.pricingType}
                  onValueChange={(value) => setToolForm({...toolForm, pricingType: value})}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free">Free</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="freemium" id="freemium" />
                    <Label htmlFor="freemium">Freemium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paid" id="paid" />
                    <Label htmlFor="paid">Paid</Label>
                  </div>
                </RadioGroup>

                {toolForm.pricingType !== 'free' && (
                  <Input
                    placeholder="Pricing Details"
                    value={toolForm.price}
                    onChange={(e) => setToolForm({...toolForm, price: e.target.value})}
                  />
                )}
              </div>

              <Textarea
                placeholder="Tool Description"
                value={toolForm.description}
                onChange={(e) => setToolForm({...toolForm, description: e.target.value})}
                className="min-h-[100px]"
              />

              <Textarea
                placeholder="Key Features (one per line)"
                value={toolForm.features}
                onChange={(e) => setToolForm({...toolForm, features: e.target.value})}
                className="min-h-[100px]"
              />

              <Button type="submit" className="w-full">Add AI Tool</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="blogs">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Blog Post</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              createBlog.mutate(blogForm);
            }} className="space-y-6">
              <Input
                placeholder="Blog Title"
                value={blogForm.title}
                onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                className="text-xl font-bold"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  value={blogForm.toolId}
                  onValueChange={(value) => setBlogForm({...blogForm, toolId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Related Tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {tools?.map((tool) => (
                      <SelectItem key={tool.id} value={String(tool.id)}>
                        {tool.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input
                  placeholder="Estimated Read Time (e.g., 5 min)"
                  value={blogForm.readTime}
                  onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                />
              </div>

              <Input
                placeholder="Cover Image URL"
                value={blogForm.coverImage}
                onChange={(e) => setBlogForm({...blogForm, coverImage: e.target.value})}
              />

              <Input
                placeholder="Tags (comma-separated)"
                value={blogForm.tags}
                onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
              />

              <Textarea
                placeholder="Blog Summary"
                value={blogForm.summary}
                onChange={(e) => setBlogForm({...blogForm, summary: e.target.value})}
                className="min-h-[100px]"
              />

              <div className="space-y-2">
                <Label>Blog Content (Markdown supported)</Label>
                <p className="text-sm text-gray-500">
                  Use # for headings, ** for bold, * for italic, - for lists, etc.
                </p>
                <Textarea
                  placeholder="Blog Content"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                  className="min-h-[400px] font-mono"
                />
              </div>

              <Button type="submit" className="w-full">Publish Blog Post</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="prompts">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Prompt</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              createPrompt.mutate(promptForm);
            }} className="space-y-6">
              <Input
                placeholder="Prompt Title"
                value={promptForm.title}
                onChange={(e) => setPromptForm({...promptForm, title: e.target.value})}
              />

              <Select
                value={promptForm.toolId}
                onValueChange={(value) => setPromptForm({...promptForm, toolId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Related Tool" />
                </SelectTrigger>
                <SelectContent>
                  {tools?.map((tool) => (
                    <SelectItem key={tool.id} value={String(tool.id)}>
                      {tool.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Prompt Category (e.g., Creative Writing, Technical, Business)"
                value={promptForm.category}
                onChange={(e) => setPromptForm({...promptForm, category: e.target.value})}
              />

              <Textarea
                placeholder="Prompt Text"
                value={promptForm.promptText}
                onChange={(e) => setPromptForm({...promptForm, promptText: e.target.value})}
                className="min-h-[200px]"
              />

              <Textarea
                placeholder="Example Output"
                value={promptForm.exampleOutput}
                onChange={(e) => setPromptForm({...promptForm, exampleOutput: e.target.value})}
                className="min-h-[100px]"
              />

              <Input
                placeholder="Use Case"
                value={promptForm.useCase}
                onChange={(e) => setPromptForm({...promptForm, useCase: e.target.value})}
              />

              <Textarea
                placeholder="Tips & Best Practices"
                value={promptForm.tips}
                onChange={(e) => setPromptForm({...promptForm, tips: e.target.value})}
                className="min-h-[100px]"
              />

              <Button type="submit" className="w-full">Add Prompt</Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
