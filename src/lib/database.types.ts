export interface PageContent {
  id: string;
  page_slug: string;
  section: string;
  content: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

