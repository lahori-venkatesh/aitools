import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Tool name must be at least 3 characters"),
  description: z.string().min(20, "Please provide a more detailed description"),
  categoryId: z.string().min(1, "Please select a category"),
  websiteUrl: z.string().url("Please enter a valid URL"),
  affiliateUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  imageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitTool = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      websiteUrl: "",
      affiliateUrl: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await apiRequest("POST", "/api/tools/submit", data);
      
      toast({
        title: "Tool submitted successfully!",
        description: "Thank you for your submission. It will be reviewed by our team.",
      });
      
      // Redirect to home page after successful submission
      navigate("/");
    } catch (error) {
      toast({
        title: "Error submitting tool",
        description: "There was an error submitting your tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit an AI Tool</h1>
            <p className="text-gray-600">
              Share an innovative AI tool with our community. All submissions are reviewed by our team.
            </p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., ImageGenius AI" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of the AI tool you're submitting
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what the tool does, its key features, and benefits" 
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A detailed description of the tool's functionality and use cases
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the most appropriate category for this tool
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          The official website URL of the tool
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="affiliateUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Affiliate URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/ref=yourcode" {...field} />
                        </FormControl>
                        <FormDescription>
                          If you have an affiliate link, please provide it here
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL to an image showcasing the tool's interface or functionality
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Submit Tool
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitTool;
