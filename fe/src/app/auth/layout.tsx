import Footer from '@/Components/common/Footer';
import SubHeader from '@/Components/common/SubHeader';
import * as React from 'react';

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
        <div className="bg-gray-100 min-h-screen">
          <div className="bg-white">
            <SubHeader />
          </div>
          <div className=" grid grid-cols-2 max-w-7xl mx-auto gap-3 bg-white mt-12 rounded-2xl p-8">
            {children}
          </div>
          <Footer />
        </div>
  );
}
