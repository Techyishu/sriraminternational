"use client";

import { useState, useEffect } from 'react';
import { getPageContent, ContentData } from '@/lib/content';

export const usePageContent = (pageSlug: string) => {
  const [content, setContent] = useState<ContentData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await getPageContent(pageSlug);
        setContent(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageSlug]);

  return { content, loading, error };
};

