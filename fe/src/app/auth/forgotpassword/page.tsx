'use client';
import * as React from 'react';
import LogoAndTitleRegister from '@/Components/home/LogoAndTitleRegister/page';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import authApi from '@/api/authApi';
import LoadingPage from '@/Components/common/LoadingPage';
import { message } from 'antd';
export interface IForgotPassWordProps {
}

export default function ForgotPassWord(props: IForgotPassWordProps) {
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);
  const [inputBlank, setInputBlank] = React.useState(false);

  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setError('');
    setInputBlank(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email.trim() === '') {
      setInputBlank(true);
      setError('');
      return; // Không thực hiện xử lý gửi nếu input trống
    }
    try {
      setLoading(true);
        await authApi.forgotPassword(email);
        Cookies.set('email', email);
        router.push('/auth/confirmcode');
      
    } catch (error: Error | any) {
      console.log(error);
      // const errorResponse = error.response.data.message;
      // setError(errorResponse);
      message.error('Email không tồn tại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="leading-normal pl-20">
        {loading && <LoadingPage />}
        <LogoAndTitleRegister
          title='Bạn quên mật khẩu?'
          href='/home'
          imageURL='/images/logo_footer.png'
          description='Đừng lo lắng nhập email của bạn để lấy lại mật khẩu' />

        <div className={`relative w-96 mb-3`}>
          <label htmlFor='email' className="block absolute text-sm top-0 left-3 -mt-2 bg-white px-1 text-gray-500">
            Email
          </label>
          <input type='text' onChange={handleEmailChange} id='email' className="w-full h-12 px-3 py-2 border border-gray-300 rounded outline-none " placeholder='Nhập Email' />
          {error && <span className='text-red-500 text-sm'>{error}</span>}
          {inputBlank && <span className='text-red-500 text-sm'>Vui lòng nhập địa chỉ email.</span>}
        </div>
        <button type="submit" onClick={handleSubmit} className='w-96 py-2 px-4 bg-mint-green text-black rounded hover:bg font-normal'>
          Gửi và kiểm tra hòm thư email của bạn
        </button>
      </div>
      <div>
        <Image src='/images/Login.png' alt='login' width={500} height={500} />
      </div>
    </>
  );
}
