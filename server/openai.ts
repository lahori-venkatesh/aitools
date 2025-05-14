import OpenAI from "openai";
import { Tool } from "@shared/schema";

// Type definitions for AI search results
interface AISearchResult {
  toolId: number;
  relevanceScore: number;
  relevanceExplanation: string;
}

interface AISearchResponse {
  rankedTools: Array<Tool & {
    relevanceScore?: number;
    relevanceExplanation?: string;
  }>;
  aiEnhanced?: boolean;
  message?: string;
  error?: string;
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
});

/**
 * Uses AI to analyze a search query and improve search results
 * @param query The user's search query
 * @param tools Array of tools to search through
 * @returns Ranked tools with AI-generated relevance descriptions
 */
export async function aiEnhancedSearch(query: string, tools: Tool[]): Promise<AISearchResponse> {
  try {
    // Prepare tool data for the AI
    const toolData = tools.map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.categoryId
    }));

    // Create the system prompt
    const systemPrompt = `You are an AI tool search expert helping users find the right AI tools for their needs.
Given a user query and a list of AI tools, rank the tools by relevance to the query.
For each tool, provide a brief explanation (20-30 words) of why it's relevant to the user's query.`;

    // Create the user prompt with search query and tool data
    const userPrompt = `User search query: "${query}"
Available AI tools:
${JSON.stringify(toolData, null, 2)}

Return a JSON array of objects with the following structure:
[
  {
    "toolId": number,
    "relevanceScore": number (0-100),
    "relevanceExplanation": "Brief explanation of why this tool is relevant"
  }
]
Include only tools that are actually relevant (score > 50). Sort by relevanceScore in descending order.`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    let aiResults;
    try {
      // The response will be in JSON format
      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("Empty response from OpenAI");
      }
      
      const parsedContent = JSON.parse(content);
      aiResults = parsedContent.hasOwnProperty('results') 
        ? parsedContent.results 
        : Array.isArray(parsedContent) ? parsedContent : [];
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      return { rankedTools: tools, error: "Failed to parse AI response" };
    }

    // Match AI results with tool objects
    const toolMap = new Map(tools.map(tool => [tool.id, tool]));
    const enhancedResults = aiResults
      .filter((result: AISearchResult) => toolMap.has(result.toolId))
      .map((result: AISearchResult) => ({
        ...toolMap.get(result.toolId),
        relevanceScore: result.relevanceScore,
        relevanceExplanation: result.relevanceExplanation
      }))
      .sort((a: {relevanceScore: number}, b: {relevanceScore: number}) => b.relevanceScore - a.relevanceScore);

    // If AI couldn't find relevant tools, fallback to regular search
    if (enhancedResults.length === 0) {
      return { 
        rankedTools: tools,
        message: "No AI-ranked results available, showing standard search results" 
      };
    }

    return { 
      rankedTools: enhancedResults,
      aiEnhanced: true
    };
  } catch (error) {
    console.error("Error in AI enhanced search:", error);
    // Fallback to regular search results if AI fails
    return { 
      rankedTools: tools,
      error: "AI enhancement failed, showing standard search results" 
    };
  }
}