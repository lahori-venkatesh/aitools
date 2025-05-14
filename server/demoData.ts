import { Category, Tool } from '@shared/schema';

export const demoCategories: Partial<Category>[] = [
    { name: "Conversational AI", slug: "conversational-ai", description: "AI chatbots and virtual assistants" },
    { name: "Content Writing", slug: "content-writing", description: "AI tools for content creation" },
    { name: "Copywriting", slug: "copywriting", description: "AI copywriting and marketing content" },
    { name: "Image Generation", slug: "image-generation", description: "AI image creation tools" },
    { name: "Video Generation", slug: "video-generation", description: "AI video creation and editing" },
    { name: "Audio Processing", slug: "audio-processing", description: "AI audio enhancement and processing" },
    { name: "Coding", slug: "coding", description: "AI coding assistants" },
    { name: "Translation", slug: "translation", description: "AI language translation tools" },
    { name: "Data Analysis", slug: "data-analysis", description: "AI data analytics tools" },
    { name: "Legal Tech", slug: "legal-tech", description: "AI legal assistance tools" },
    { name: "Healthcare", slug: "healthcare", description: "AI healthcare solutions" },
    { name: "Finance", slug: "finance", description: "AI financial tools" },
    { name: "Education", slug: "education", description: "AI education tools" },
    { name: "Research", slug: "research", description: "AI research assistants" },
    { name: "Design", slug: "design", description: "AI design tools" },
    { name: "Email", slug: "email", description: "AI email assistance" },
    { name: "Marketing", slug: "marketing", description: "AI marketing tools" },
    { name: "SEO", slug: "seo", description: "AI SEO optimization" },
    { name: "Social Media", slug: "social-media", description: "AI social media management" },
    { name: "Customer Service", slug: "customer-service", description: "AI customer support" },
    { name: "Sales", slug: "sales", description: "AI sales tools" },
    { name: "HR", slug: "hr", description: "AI HR and recruitment" },
    { name: "Security", slug: "security", description: "AI security tools" },
    { name: "Analytics", slug: "analytics", description: "AI analytics platforms" },
    { name: "Productivity", slug: "productivity", description: "AI productivity tools" },
    { name: "Gaming", slug: "gaming", description: "AI gaming tools" },
    { name: "Music", slug: "music", description: "AI music creation" },
    { name: "Real Estate", slug: "real-estate", description: "AI real estate tools" },
    { name: "Manufacturing", slug: "manufacturing", description: "AI manufacturing solutions" },
    { name: "Agriculture", slug: "agriculture", description: "AI agriculture tools" },
    { name: "Science", slug: "science", description: "AI scientific tools" },
    { name: "Transportation", slug: "transportation", description: "AI transportation solutions" },
    { name: "Energy", slug: "energy", description: "AI energy management" },
    { name: "Retail", slug: "retail", description: "AI retail solutions" }
  ];

  const tools: Record<string, Partial<Tool>[]> = {
    "conversational-ai": [
      { name: "ChatGPT", slug: "chatgpt", description: "OpenAI's advanced conversational AI", websiteUrl: "https://chat.openai.com" },
      { name: "Claude", slug: "claude", description: "Anthropic's AI assistant", websiteUrl: "https://claude.ai" }
    ],
    "content-writing": [
      { name: "Jasper", slug: "jasper", description: "AI content writing platform", websiteUrl: "https://jasper.ai" },
      { name: "WriteSonic", slug: "writesonic", description: "AI writing assistant", websiteUrl: "https://writesonic.com" }
    ],
    "copywriting": [
      { name: "Copy.ai", slug: "copyai", description: "AI copywriting tool", websiteUrl: "https://copy.ai" },
      { name: "Rytr", slug: "rytr", description: "AI writing platform", websiteUrl: "https://rytr.me" }
    ],
    "image-generation": [
      { name: "Midjourney", slug: "midjourney", description: "AI image generation tool", websiteUrl: "https://midjourney.com" },
      { name: "DALL-E 2", slug: "dall-e-2", description: "OpenAI's image generation model", websiteUrl: "https://openai.com/dall-e-2" }
    ],
    "video-generation": [
      { name: "RunwayML", slug: "runwayml", description: "AI video editing platform", websiteUrl: "https://runwayml.com" },
      { name: "Synthesia", slug: "synthesia", description: "AI video generation platform", websiteUrl: "https://synthesia.io" }
    ],
    "audio-processing": [
      { name: "Descript", slug: "descript", description: "AI audio editing software", websiteUrl: "https://descript.com" },
      { name: "Adobe Audition", slug: "adobe-audition", description: "Professional audio editing software", websiteUrl: "https://adobe.com/audition" }
    ],
    "coding": [
      { name: "GitHub Copilot", slug: "github-copilot", description: "AI pair programmer", websiteUrl: "https://github.com/features/copilot" },
      { name: "Tabnine", slug: "tabnine", description: "AI code completion tool", websiteUrl: "https://tabnine.com" }
    ],
    "translation": [
      { name: "DeepL", slug: "deepl", description: "AI translation service", websiteUrl: "https://deepl.com" },
      { name: "Google Translate", slug: "google-translate", description: "Google's translation service", websiteUrl: "https://translate.google.com" }
    ],
    "data-analysis": [
      { name: "Tableau", slug: "tableau", description: "Data visualization tool", websiteUrl: "https://tableau.com" },
      { name: "Power BI", slug: "power-bi", description: "Microsoft's data analytics tool", websiteUrl: "https://powerbi.microsoft.com" }
    ],
    "legal-tech": [
      { name: "ROSS Intelligence", slug: "ross-intelligence", description: "AI legal research platform", websiteUrl: "https://rossintelligence.com" },
      { name: "Kira Systems", slug: "kira-systems", description: "AI contract analysis", websiteUrl: "https://kirasystems.com" }
    ],
    "healthcare": [
      { name: "IBM Watson Health", slug: "ibm-watson-health", description: "AI healthcare solutions", websiteUrl: "https://www.ibm.com/watson-health" },
      { name: "PathAI", slug: "pathai", description: "AI-powered pathology", websiteUrl: "https://www.pathai.com/" }
    ],
    "finance": [
      { name: "Kensho", slug: "kensho", description: "AI financial analysis", websiteUrl: "https://www.spglobal.com/en/solutions/kensho-artificial-intelligence" },
      { name: "Numerai", slug: "numerai", description: "AI-driven hedge fund", websiteUrl: "https://numer.ai/" }
    ],
    "education": [
      { name: "Quizlet", slug: "quizlet", description: "AI-powered learning tools", websiteUrl: "https://quizlet.com" },
      { name: "Coursera", slug: "coursera", description: "Online learning platform", websiteUrl: "https://coursera.org" }
    ],
    "research": [
      { name: "Semantic Scholar", slug: "semantic-scholar", description: "AI-powered research tool", websiteUrl: "https://semanticscholar.org" },
      { name: "ResearchGate", slug: "researchgate", description: "Network for scientists and researchers", websiteUrl: "https://researchgate.net" }
    ],
    "design": [
      { name: "Canva", slug: "canva", description: "Online design tool", websiteUrl: "https://canva.com" },
      { name: "Adobe Creative Cloud", slug: "adobe-creative-cloud", description: "Suite of design software", websiteUrl: "https://adobe.com/creativecloud" }
    ],
    "email": [
      { name: "Gmail Smart Compose", slug: "gmail-smart-compose", description: "AI-powered email composition", websiteUrl: "https://gmail.com" },
      { name: "Mailchimp", slug: "mailchimp", description: "Email marketing platform", websiteUrl: "https://mailchimp.com" }
    ],
    "marketing": [
      { name: "HubSpot", slug: "hubspot", description: "Marketing automation platform", websiteUrl: "https://hubspot.com" },
      { name: "Marketo", slug: "marketo", description: "Marketing automation software", websiteUrl: "https://marketo.com" }
    ],
    "seo": [
      { name: "SEMrush", slug: "semrush", description: "SEO toolkit", websiteUrl: "https://semrush.com" },
      { name: "Ahrefs", slug: "ahrefs", description: "SEO toolset", websiteUrl: "https://ahrefs.com" }
    ],
    "social-media": [
      { name: "Buffer", slug: "buffer", description: "Social media management tool", websiteUrl: "https://buffer.com" },
      { name: "Hootsuite", slug: "hootsuite", description: "Social media management platform", websiteUrl: "https://hootsuite.com" }
    ],
    "customer-service": [
      { name: "Zendesk", slug: "zendesk", description: "Customer service software", websiteUrl: "https://zendesk.com" },
      { name: "Salesforce Service Cloud", slug: "salesforce-service-cloud", description: "Customer service platform", websiteUrl: "https://salesforce.com/servicecloud" }
    ],
    "sales": [
      { name: "Salesforce Sales Cloud", slug: "salesforce-sales-cloud", description: "Sales automation software", websiteUrl: "https://salesforce.com/salescloud" },
      { name: "Outreach", slug: "outreach", description: "Sales engagement platform", websiteUrl: "https://outreach.io" }
    ],
    "hr": [
      { name: "Workday", slug: "workday", description: "HR management software", websiteUrl: "https://workday.com" },
      { name: "BambooHR", slug: "bamboohr", description: "HR software for small businesses", websiteUrl: "https://bamboohr.com" }
    ],
    "security": [
      { name: "Darktrace", slug: "darktrace", description: "AI cybersecurity platform", websiteUrl: "https://darktrace.com" },
      { name: "CrowdStrike", slug: "crowdstrike", description: "Cloud-based endpoint protection", websiteUrl: "https://crowdstrike.com" }
    ],
    "analytics": [
      { name: "Google Analytics", slug: "google-analytics", description: "Web analytics service", websiteUrl: "https://analytics.google.com" },
      { name: "Mixpanel", slug: "mixpanel", description: "Product analytics platform", websiteUrl: "https://mixpanel.com" }
    ],
    "productivity": [
      { name: "Notion", slug: "notion", description: "All-in-one workspace", websiteUrl: "https://notion.so" },
      { name: "Monday.com", slug: "monday-com", description: "Work management platform", websiteUrl: "https://monday.com" }
    ],
    "gaming": [
      { name: "Unity", slug: "unity", description: "Game development platform", websiteUrl: "https://unity.com" },
      { name: "Unreal Engine", slug: "unreal-engine", description: "Game engine", websiteUrl: "https://unrealengine.com" }
    ],
    "music": [
      { name: "Amper Music", slug: "amper-music", description: "AI music composition", websiteUrl: "https://ampermusic.com" },
      { name: "Jukebox (OpenAI)", slug: "jukebox-openai", description: "AI music generation model", websiteUrl: "https://openai.com/blog/jukebox/" }
    ],
    "real-estate": [
      { name: "Zillow", slug: "zillow", description: "Real estate marketplace", websiteUrl: "https://zillow.com" },
      { name: "Redfin", slug: "redfin", description: "Real estate brokerage", websiteUrl: "https://redfin.com" }
    ],
    "manufacturing": [
      { name: "Plex", slug: "plex", description: "Manufacturing ERP software", websiteUrl: "https://plex.com" },
      { name: "Seeq", slug: "seeq", description: "Advanced analytics for manufacturing", websiteUrl: "https://seeq.com" }
    ],
    "agriculture": [
      { name: "John Deere", slug: "john-deere", description: "Precision agriculture technology", websiteUrl: "https://www.deere.com/en/index.html" },
      { name: "The Climate Corporation", slug: "the-climate-corporation", description: "Digital agriculture solutions", websiteUrl: "https://climate.com" }
    ],
    "science": [
      { name: "Benchling", slug: "benchling", description: "Cloud platform for biotech", websiteUrl: "https://benchling.com" },
      { name: "RSpace", slug: "rspace", description: "Electronic lab notebook", websiteUrl: "https://researchspace.com" }
    ],
    "transportation": [
      { name: "Waymo", slug: "waymo", description: "Autonomous driving technology", websiteUrl: "https://waymo.com" },
      { name: "Tesla", slug: "tesla", description: "Electric vehicles and autonomous driving", websiteUrl: "https://tesla.com" }
    ],
    "energy": [
      { name: "Opower", slug: "opower", description: "Energy efficiency software", websiteUrl: "https://opower.com" },
      { name: "Uplight", slug: "uplight", description: "Energy customer engagement", websiteUrl: "https://uplight.com" }
    ],
    "retail": [
      { name: "Shopify", slug: "shopify", description: "E-commerce platform", websiteUrl: "https://shopify.com" },
      { name: "Amazon", slug: "amazon", description: "Online retailer", websiteUrl: "https://amazon.com" }
    ]
  };

  export function generateDemoTools(categoryMap: Map<string, number>): Partial<Tool>[] {
  const allTools: Partial<Tool>[] = [];
  for (const [category, toolsList] of Object.entries(tools)) {
    const categoryId = categoryMap.get(category);
    if (categoryId) {
      allTools.push(...toolsList.map(tool => ({ ...tool, categoryId })));
    }
  }
  return allTools;
}