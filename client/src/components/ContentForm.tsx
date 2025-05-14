
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const contentSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(50),
  toolId: z.number(),
  type: z.enum(['blog', 'prompt'])
});

export default function ContentForm({ type, toolId }) {
  const form = useForm({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: '',
      content: '',
      toolId,
      type
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/${type}s`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      
      toast({
        title: 'Success',
        description: `Your ${type} has been submitted for review.`
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit content. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder={`Enter ${type} title`} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={type === 'blog' ? 'Write your blog post...' : 'Enter your prompt...'}
                  rows={8}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit {type}</Button>
      </form>
    </Form>
  );
}
