'use client';
import HeaderAdmin from '@/Components/common/HeaderAdmin/page';
import SideBarLeftAdmin from '@/Components/common/SideBarLeftAdmin';
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
        if (user_role !== 'ADMIN' && user_role !== 'SUPER_ADMIN') {
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
          <SideBarLeftAdmin />
        </div>
        <div className='w-full overflow-y-auto'>
          <HeaderAdmin />
          <div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}