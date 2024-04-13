'use client';
import CustomInputField from '@/Components/CustomField/CustomInputField';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as React from 'react';
import Image from 'next/image';
import authApi from '@/api/authApi';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ISelectedHousehold } from '@/types/homestayBookingType';
import LoadingPage from '@/Components/common/LoadingPage';

import { setSession, getSession } from '@/utils/sessionStorage';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './config';
import FailedModal from '@/Components/CustomField/FailedModal';

export interface ILoginFormValues {
  email: string;
  password: string;
}
export interface LoginPageProps { }

export default function LoginPage(props: LoginPageProps) {

  const { register, handleSubmit } = useForm<ILoginFormValues>();
  const { data, setAuthState } = React.useContext(AuthenticationContext);
  const [showModal, setShowModal] = React.useState(false);
  let message = '';
  const [loading, setLoading] = React.useState(false);
  const isBooking: string = getSession('isBooking') || '';
  const [error, setError] = React.useState('');
  const [sessionData, setSessionData] = React.useState<ISelectedHousehold>(getSession('selectedHousehold'));
  const router = useRouter()
  const onSubmit: SubmitHandler<ILoginFormValues> = async (data) => {
 
    try {
      setLoading(true);
      let res = await authApi.login(data);
      if (res.access_token && res.refresh_token) {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('user_role', res.user.role?.toString() || '');
      }
      setAuthState({
        loading: false,
        error: null,
        data: res.user,
      });
      if (sessionData) {
        const newSessionData = {
          ...sessionData,
          customerName: res.user.firstName + ' ' + res.user.lastName,
          customerPhone: res.user.phoneNumber || '',
        }
        setSession('selectedHousehold', newSessionData);
      }

      if (res.user && res.user.role === 'MANAGER') {
        router.push('/manager/dashboard'); // Chuyển hướng đến trang dashboard
      }
      else if (res.user && (res.user.role === 'ADMIN' || res.user.role === 'SUPER_ADMIN')) {
        router.push('/admin/dashboard');
      }
      else {
        if (isBooking === 'true') {
          router.push('/homestay-booking/detail');
        } else {
          router.push('/home'); // Chuyển hướng đến trang chính (home page) nếu không phải admin
        }
      }
    } catch (error) {
      console.log(error);
      setError('Tài khoản hoặc mật khẩu không đúng!');
      setLoading(false);
    }
  };

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider).then((r: any) => {
      const displayNameParts = r.user.displayName.split(' ');
      const firstName = displayNameParts[displayNameParts.length - 1]; // firstName là từ cuối cùng trong displayName
      const lastName = displayNameParts.slice(0, displayNameParts.length - 1).join(' ');

      const userData = {
        email: r.user.email,
        // cắt chuỗi để lấy firstName và lastName
        firstName: firstName,
        lastName: lastName,
        password: r.user.uid,
        avatar: r.user.photoURL,
      };
      try {
         authApi.loginSocial(userData)
          .then((res) => {
            console.log(res);
            if (res.access_token && res.refresh_token) {
              localStorage.setItem('access_token', res.access_token);
              localStorage.setItem('refresh_token', res.refresh_token);
            }
            setAuthState({
              loading: true,
              error: null,
              data: res.user,
            });

            if (res.user && res.user.role === 'CUSTOMER') {
              if (isBooking === 'true') {
                router.push('/homestay-booking/detail');
              } else {
                router.push('/home');
              }
            }
          })
          .catch((error : any) => {
            console.log("Catch error:", error);
            if (error.response && error.response.data) {
              console.log("Error message:", error.response.data.message);
              // Do something with the error message, like showing it to the user
            } else {
              console.log("Unknown Error:", error);
            }
            setShowModal(true); // Show error modal
          });
      } catch (error: any) {
        console.log("Catched Error:", error);
        console.log("Error Message:", error.message);
      }

      // try {
      //   authApi.loginSocial(userData).then((res) => {
      //     console.log(res);
      //     if (res.access_token && res.refresh_token) {
      //       localStorage.setItem('access_token', res.access_token);
      //       localStorage.setItem('refresh_token', res.refresh_token);
      //     }
      //     setAuthState({
      //       loading: true,
      //       error: null,
      //       data: res.user,
      //     });

      //     if (res.user && res.user.role === 'CUSTOMER') {
      //       if (isBooking === 'true') {
      //         router.push('/homestay-booking/detail');
      //       } else {
      //         router.push('/home'); // Chuyển hướng đến trang chính (home page) nếu không phải admin
      //       }
      //     }

      //   }).catch((error: any) => {
      //     console.log("Catch error:", error);
      //     setShowModal(true);
      //     // if (error.response && error.response.status === 400) {
      //     //   setShowModal(true);
      //     //   message = error.response.data.message;
      //     //   // Xử lý lỗi 400 tại đây
      //     // } else {
      //     //   console.log("Unknown Error:", error);
      //     // }
      //   });
      // } catch (error: any) {
      //   console.log("Catched Error:", error);
      //   console.log("Error Message:", error.message);
      // }
    })
  }

  return (
    <>
      {loading && <LoadingPage />}
      <div className="p-10">
        <Image
          src={'/images/logo_name.png'}
          alt="Logo Image"
          width={100}
          height={100}
        />
        <h1 className="text-3xl font-extrabold my-4 mt-8 ">Đăng Nhập</h1>
        <h4 className="text-sm font-normal">
          Đăng nhập để trải nghiệm dịch vụ của V-HomeStay
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInputField
            name="email"
            type="email"
            register={register}
            label="Email"
            required={true}
          />
          <CustomInputField
            register={register}
            type="password"
            name="password"
            label="Password"
            required={true}
          />
          {error && (<p className='text-red-500 mt-2 text-xs'>{error}</p>)}

          <div className="flex justify-end items-center mt-4 ml-1">
            <Link href="/auth/forgotpassword">
              <span className="text-red-400 cursor-pointer">Quên mật khẩu</span>
            </Link>
          </div>

          <button
            type="submit"
            className="bg-green-300 text-xl  mt-4 text-black w-full text-center border-1 h-12 rounded-md my-4"
          >
            Đăng Nhập
          </button>
        </form>

        <p className="text-center ">
          Bạn chưa có tài khoản?{' '}
          <Link href="/auth/register">
            <span className="text-red-400 cursor-pointer">Đăng ký tại đây</span>
          </Link>
        </p>

        <div className="flex justify-center mt-5 text-gray-400 font-medium">
          <span>HOẶC</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='pt-5'>
          <button
            onClick={handleLoginGoogle}
            className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Đăng nhập với Google</span>
          </button>
        </div>
      </div>

      <div>
        <Image
          alt="Map"
          src="/images/Login.png"
          className="w-full h-full"
          width={500}
          height={500}
        />
      </div>

      <FailedModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        message="Tài khoản này đã được đăng ký trên hệ thống!"
      />
    </>
  );
}
