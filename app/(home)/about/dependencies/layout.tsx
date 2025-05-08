import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dependencies',
};

export default function DependenciesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
