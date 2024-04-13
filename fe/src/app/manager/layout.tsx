'use client';
import HeaderManager from '@/Components/common/HeaderManager/page';
import SideBarLeft from '@/Components/common/SideBarLeft';
import { useRouter } from 'next/navigation';
import React from 'react';


export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const router = useRouter();
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_role = localStorage.getItem('user_role') || '';
      if (user_role === '') {
        alert('Bạn chưa đăng nhập');
        router.push('/auth/login');
      } else {
        if (user_role !== 'MANAGER') {
          alert('Bạn không có quyền truy cập');
          router.push('/home');
        }
      }
    }
  }, []);
  return (
    <>
      <div className='flex h-screen'>
        <div>
          <SideBarLeft />
        </div>
        <div className='w-full overflow-y-auto'>
          <HeaderManager />
          <div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}