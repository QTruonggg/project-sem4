import Footer from '@/Components/common/Footer';
import SubHeader from '@/Components/common/SubHeader';
import * as React from 'react';

export interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div>
      <SubHeader />
      {children}
      <Footer />
    </div>
  );
}
