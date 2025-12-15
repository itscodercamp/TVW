import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  image = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
  type = 'website',
  schema 
}) => {
  const siteName = "Trusted Vehicles";
  const baseUrl = window.location.origin;
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : window.location.href;

  useEffect(() => {
    // Update Title
    document.title = `${title} | ${siteName}`;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update link tags
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Metadata
    updateMeta('description', description);
    updateMeta('keywords', keywords || "buy cars, sell cars, car insurance, car valuation, PDI check, dealer management system, Trusted Vehicles, second hand cars India");
    
    // Canonical
    updateLink('canonical', fullUrl);

    // Open Graph
    updateMeta('og:type', type, 'property');
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:url', fullUrl, 'property');
    updateMeta('og:site_name', siteName, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Structured Data (JSON-LD)
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Trusted Vehicles",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 84672 73110",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": "en"
        },
        "sameAs": [
          "https://facebook.com/trustedvehicles",
          "https://twitter.com/trustedvehicles",
          "https://instagram.com/trustedvehicles"
        ]
      };
    
    const finalSchema = schema || defaultSchema;
    
    // Remove existing JSON-LD scripts to avoid duplicates
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(s => s.remove());

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(finalSchema);
    document.head.appendChild(script);

  }, [title, description, keywords, fullUrl, image, type, schema, baseUrl]);

  return null;
};

export default SEO;