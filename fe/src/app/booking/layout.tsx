import Footer from '@/Components/common/Footer';
import SubHeader from '@/Components/common/SubHeader';
import * as React from 'react';

export default function App ({children}: {children: React.ReactNode}) {
  return (
    <div>
      <SubHeader />
      {children}
      <Footer />
    </div>
  );
}
