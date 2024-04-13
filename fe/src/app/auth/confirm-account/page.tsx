'use client'
import LoadingPage from '@/Components/common/LoadingPage';
import authApi from '@/api/authApi';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

export interface IConfirmAccountProps { }

export default function ConfirmAccount() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const token = searchParams.get('token') || '1';
  const firstName = searchParams.get('firstName') || 'a';
  const lastName = searchParams.get('lastName') || 'b';
  React.useEffect(() => {

    const confirmEmail = async () => {
      setLoading(true);
      try {
        // authApi.confirmEmail({ token, firstName, lastName })
        await authApi.confirmEmail(token as string, firstName as string, lastName as string)
      } catch (error: any) {
        console.log(error);
        // setError(error.message);
        setError('Xác nhận tài khoản thất bại');
      } finally {
        setLoading(false);
      }
    }
    confirmEmail();
  }, [token, firstName, lastName]);


  return (
    <div className="bg-white w-1/2 m-auto p-28 col-span-2 rounded-lg shadow-md shadow-gray-300 text-center">
      {loading ? <LoadingPage /> : (
        <FontAwesomeIcon
          icon={error ? faXmark : faCheck}
          size="5x"
          style={{ color: error ? '#FF0000' : '#43c021' }}
        />
      )}
      <h2 className="md:text-2xl text-base text-gray-900 my-3 font-semibold">{loading ? '...' : (error ? error : 'Xác nhận tài khoản thành công, vui lòng đăng nhập!')}</h2>
      <div className="py-3">
        <Link
          className="px-12 rounded-md font-semibold py-3 bg-green-500 text-white hover:bg-opacity-50 duration-300"
          href={'/auth/login'}>
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
