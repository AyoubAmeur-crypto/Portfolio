import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
}

export default function SEOHead({
  title,
  description,
  canonicalPath = '/togetherly',
  ogImage = '/togetherly/togetherly.png',
}: SEOHeadProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    // Helper to update or create meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:url', `https://ayoubameur.dev${canonicalPath}`, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Update theme-color to warm cream for Togetherly pages
    let themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', '#F7F0E4');
    }

    return () => {
      document.title = prevTitle;
      const defaultDesc =
        'Ayoub Ameur — Software Engineering & AI student at ENSA Fès building robust backend architectures, high-performance full-stack web platforms, automated QA systems, and agentic AI pipelines.';
      setMeta('description', defaultDesc);
      setMeta('og:title', 'Ayoub Ameur — Software Engineering & AI', true);
      setMeta('og:description', defaultDesc, true);
      setMeta('og:image', '/og-image.png', true);
      setMeta('og:url', 'https://ayoubameur.dev/', true);
      setMeta('twitter:title', 'Ayoub Ameur — Software Engineering & AI');
      setMeta('twitter:description', defaultDesc);
      setMeta('twitter:image', '/og-image.png');
      if (themeMeta) {
        themeMeta.setAttribute('content', '#000000');
      }
    };
  }, [title, description, canonicalPath, ogImage]);

  return null;
}
