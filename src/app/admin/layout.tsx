import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - SR INTERNATIONAL',
  description: 'Admin dashboard for managing website content',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

