import React from "react";
import { Blog } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';

interface ToolBlogPostProps {
  blog?: Blog;
  preview?: boolean;
}

const ToolBlogPost = ({ blog, preview = false }: ToolBlogPostProps) => {
  if (!blog) {
    return (
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">From Our Blog</h2>
        <p className="text-gray-500">No blog post available for this tool yet.</p>
      </section>
    );
  }

  // For preview, show only a portion of the content
  const content = preview 
    ? blog.content.split('\n').slice(0, 6).join('\n') 
    : blog.content;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">From Our Blog</h2>
      <Card>
        <CardContent className="pt-6">
          <article className="prose prose-sm max-w-none">
            {preview ? (
              <>
                <h3>{blog.title}</h3>
                <ReactMarkdown>{content}</ReactMarkdown>
                <a href="#" className="text-primary hover:text-primary-700 font-medium no-underline">
                  Continue Reading →
                </a>
              </>
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )}
          </article>
        </CardContent>
      </Card>
    </section>
  );
};

export default ToolBlogPost;
