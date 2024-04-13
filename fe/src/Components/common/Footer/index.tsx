
'use client';
import * as React from 'react';
import { faFacebook, faTiktok, faYoutube, faGooglePay, faWodu, faAirbnb, faUber, faAndroid, faTwitch, faInvision } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { relative } from 'path';
export interface FooterProps { }

export default function Footer(props: FooterProps) {
  return (
    <footer className="bg-custom-color text-white mt-20 pt-12" style={{position:'relative', zIndex:'2'}}>
      <div className="max-w-full mx-auto">
        <div className="md:grid md:grid-cols-12 gap-9">
          <div className='mb-5 sm:col-span-12 md:col-span-5'>
            <Image
              src="/images/logo_footer.png"
              alt="Logo"
              width={188}
              height={188}
              className="mx-auto pb-7 w-1/3 h-auto rounded-b-lg"
            />
            <h1 className="w-72 h-8 font-semibold text-2xl mx-auto text-center">
              V-HOMESTAY
            </h1>
            <div className="mt-5">
              <p className="font-normal text-sm text-center">
                Văn hóa du lịch cộng đồng dân tộc Mông,
              </p>
              <p className="font-normal text-sm text-center">
                Mèo Vạc - Hà Giang
              </p>
            </div>
          </div>
          <div className='mb-5 sm:col-span-12 md:col-span-7 grid md:grid-cols-12 md:text-left text-center'>
            <div className='block sm:col-span-12 md:col-span-3' >
              <h2 className='font-semibold text-xl mb-3'>VỀ CHÚNG TÔI</h2>
              <Link href="/introduction" className="font-medium text-base block py-1">
                Giới thiệu
              </Link>
              <Link href="/image-gallery" className="font-medium text-base block py-1">
                Thư viện ảnh
              </Link>
              <Link href="/contact-information" className="font-medium text-base block py-1">
                Liên hệ với chúng tôi
              </Link>
            </div>
            <div className='block sm:col-span-12 md:col-span-5' >
              <h2 className='font-semibold text-xl mb-3'>CHÍNH SÁCH</h2>
              <Link href="/FAQs" className='font-medium text-base block py-1'>
                FAQ
              </Link>
              <Link href="/regulations-and-policies/BookingProcess-cancellationPolicy" className='font-medium text-base block py-1'>
                Quy trình đặt dịch vụ và chính sách hủy
              </Link>
              <Link href="/regulations-and-policies/information-privacy-policy" className='font-medium text-base block py-1'>
                Chính sách bảo mật thông tin
              </Link>
              <Link href="/regulations-and-policies/payment-policy" className='font-medium text-base block py-1'>
                Chính sách thanh toán
              </Link>
            </div>
            <div className='block sm:col-span-12 md:col-span-4' >
              <h2 className='font-semibold text-xl mb-3'>KẾT NỐI</h2>
              <Link href="/" className="mr-6">
                <FontAwesomeIcon className=' text-3xl' icon={faFacebook} />
              </Link>
              <Link href="/" className="mr-6">
                <FontAwesomeIcon className=' text-3xl' icon={faTiktok} />
              </Link>
              <Link href="/" className="mr-6">
                <FontAwesomeIcon className=' text-3xl' icon={faYoutube} />
              </Link>
            </div>
            <div className="md:col-start-3 md:col-end-10 mt-10 justify-center text-center">
              <h2 className='font-semibold text-xl mb-3'>CÁC ĐỐI TÁC</h2>
              <FontAwesomeIcon className=' text-3xl mr-6' icon={faFacebook} />
              <FontAwesomeIcon className=' text-4xl mr-6' icon={faGooglePay} />
              <FontAwesomeIcon className=' text-4xl mr-6' icon={faWodu} />
              <FontAwesomeIcon className=' text-3xl mr-6' icon={faAirbnb} />
              <FontAwesomeIcon className=' text-3xl mr-6' icon={faUber} />
              <FontAwesomeIcon className=' text-3xl mr-6' icon={faAndroid} />
              <FontAwesomeIcon className=' text-3xl mr-6' icon={faTwitch} />
              <FontAwesomeIcon className=' text-3xl mr-6' icon={faInvision} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full font-light text-center p-2 pt-10">
        <p>© 2023 V-HomeStay | V-HomeStay.com</p>
      </div>
    </footer>

  );
}
