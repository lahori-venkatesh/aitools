import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  article?: boolean;
  canonical?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'AI Tool Hub - Find The Best AI Tools For Your Workflow',
  description = 'Discover the perfect AI tools with our curated collection. Browse by category, read expert reviews, and find step-by-step guides with optimized prompts.',
  keywords = ['AI tools', 'artificial intelligence', 'productivity tools', 'AI software', 'machine learning tools'],
  image = '/assets/default-og-image.jpg',
  article = false,
  canonical,
  noIndex = false,
  structuredData,
}) => {
  const [location] = useLocation();
  
  // Construct the canonical URL
  const siteUrl = 'https://aitoolhub.app'; // Replace with your actual domain
  const currentUrl = canonical || `${siteUrl}${location}`;
  
  // Format keywords for meta tag
  const keywordsString = keywords.join(', ');
  
  // Default structured data for website
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Tool Hub',
    url: siteUrl,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
  
  const jsonLd = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      
      {/* Canonical Tag */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots Meta */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      
      {/* Performance and Security Headers */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      
      {/* PWA Meta Tags (optional) */}
      <meta name="application-name" content="AI Tool Hub" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="AI Tool Hub" />
      <meta name="theme-color" content="#6366f1" />
    </Helmet>
  );
};

export default SEO;