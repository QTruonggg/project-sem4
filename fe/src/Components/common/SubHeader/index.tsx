'use client';

import authApi from '@/api/authApi';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { faUser, faBook, faWallet, faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useContext } from 'react';
import LoadingPage from '../LoadingPage';

export interface SubHeaderProps { }

export default function SubHeader(props: SubHeaderProps) {
  const { data, setAuthState } = useContext(AuthenticationContext);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      try {
        let res = await authApi.getCurrentUser();
        setAuthState({
          loading: false,
          error: null,
          data: { ...res },
        });
      } catch (error) {
      } finally {
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  const handleLogout = async () => {
    try {
      setLoading(true);
      authApi.logout; // Gọi API logout từ authApi

      // Đặt lại trạng thái xác thực (authentication state) của ứng dụng
      setAuthState({
        loading: false,
        error: null,
        data: null,
      });

      // Xóa token từ localStorage (nếu bạn sử dụng localStorage để lưu token)
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
      sessionStorage.removeItem('isBooking');
      sessionStorage.removeItem('selectedHousehold');
      // Điều hướng về trang chủ
      router.push('/home');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const dropdownMenu = (
    <Menu>
      <Menu.Item>
        <Link href="/profile">
          <FontAwesomeIcon icon={faUser} />
          <span>Quản lý tài khoản</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/booking">
          <FontAwesomeIcon icon={faBook} />
          <span>Lịch sử đặt trước</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/profile">
          <FontAwesomeIcon icon={faWallet} />
          <span>Thông tin thanh toán</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/my-feedback">
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>Đánh giá</span>
        </Link>
      </Menu.Item>

      <Menu.Item onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <div className={`${loading ? "" : "hidden"}`}>
        <LoadingPage />

      </div>
      <ul className="w-full container font-extrabold text-sm flex flex-wrap items-center justify-between h-28 text-green-900 p-0 mx-auto ">
        <Link href="/home" className="flex-shrink-0 ml-10">
          <Image
            alt="Map"
            src="/images/logo_footer.png"
            width={96}
            height={0}
            className="w-24"
          />
        </Link>
        <Link href="/home" className="flex-shrink-0 ">
          TRANG CHỦ
        </Link>
        <Link href="/introduction" className="flex-shrink-0 ">
          GIỚI THIỆU
        </Link>
        <Link href="/homestay-booking" className="flex-shrink-0 ">
          ĐẶT PHÒNG
        </Link>
        <Link href="/service" className="flex-shrink-0 ">
          DỊCH VỤ
        </Link>
        <Link href="/local-product" className="flex-shrink-0 ">
          SẢN PHẨM
        </Link>
        <Link href="/image-gallery" className="flex-shrink-0 ">
          THƯ VIỆN ẢNH
        </Link>
        <Link href="/blog" className="flex-shrink-0 ">
          BLOG
        </Link>
        <Link href="/contact-information" className="flex-shrink-0 ">
          LIÊN HỆ
        </Link>
        

        {data?.id ? (
          <div className="mr-10 flex items-center">
            <Dropdown overlay={dropdownMenu} placement="bottomRight">
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Image
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white m-3"
                  src={data.avatar || '/images/avt.png'}
                  alt="avatar"
                  width={70}
                  height={70}
                />
                <span className="font-extrabold">Xin chào, {data.lastName}</span>
              </a>
            </Dropdown>
          </div>
        ) : (
          <div className="flex space-x-4 mr-12">
            <li className="flex-shrink-0">
              <Link
                href={'/auth/register'}
                className="w-32 h-12 bg-gradient-to-r border-2 border-white active:bg-[#FFFF]  font-bold py-2 px-4 rounded"
              >
                ĐĂNG KÝ
              </Link>
            </li>
            <li className="">
              <Link
                href="/auth/login"
                className=" bg-white h-12 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                ĐĂNG NHẬP
              </Link>
            </li>
          </div>
        )}
      </ul>
    </div>

  );
}
