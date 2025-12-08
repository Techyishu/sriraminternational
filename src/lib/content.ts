import { supabase } from './supabase';

export interface ContentData {
  [section: string]: any;
}

export async function getPageContent(pageSlug: string): Promise<ContentData> {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_slug', pageSlug);

    if (error) {
      console.error('Error fetching content:', error);
      return {};
    }

    const content: ContentData = {};
    data?.forEach((item) => {
      content[item.section] = item.content;
    });

    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
    return {};
  }
}

export async function getSectionContent(
  pageSlug: string,
  section: string
): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('content')
      .eq('page_slug', pageSlug)
      .eq('section', section)
      .single();

    if (error) {
      console.error('Error fetching section content:', error);
      return null;
    }

    return data?.content || null;
  } catch (error) {
    console.error('Error fetching section content:', error);
    return null;
  }
}

