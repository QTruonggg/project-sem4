import AuthContext from '@/features/auth/AuthContext';
import { Inter } from 'next/font/google';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import SEO from '@bradgarropy/next-seo/dist/types/components/SEO/SEO';
import Seo from '@/Components/seo/seo';
config.autoAddCss = false;
const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        <title>V-HomeStay</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Khám phá V-HomeStay và trải nghiệm văn hóa độc đáo." />
        <meta name="keywords" content="V-HomeStay, trải nghiệm văn hóa, du lịch cộng đồng" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}
      <Seo data={{
        title: 'V-HomeStay - Trải nghiệm đặt trước homestay và dịch vụ trực tuyến',
        description: 'V-HomeStay - Trải nghiệm đặt trước homestay và dịch vụ trực tuyến',
        url: 'https://www.langhmongpavi.com/',
        thumbnail: 'https://www.langhmongpavi.com/images/seo/seo.png'
      }}
      />

      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
