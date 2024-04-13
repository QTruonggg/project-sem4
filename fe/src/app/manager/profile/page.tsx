'use client'
import * as React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/Components/common/LoadingPage';
import { IUser } from '@/types/authType';
import authApi from '@/api/authApi';

export interface IUserProfileProps {
}
export default function UserProfile(props: IUserProfileProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<IUser>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await authApi.getCurrentUserManager();
      setUser(res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    fetchProfile();
  }, [])

  const convertRole = (role: string) => {
    if (role === "SUPER_ADMIN") {
      return <p className='px-2 py-1 rounded-xl text-white font-semibold bg-[#B00505]'>Super admin</p>
    } else if (role === "ADMIN") {
      return <p className='px-2 py-1 rounded-xl text-white font-semibold bg-yellow-500'>Admin</p>
    } else if (role === "MANAGER") {
      return <p className='px-2 py-1 rounded-xl text-white font-semibold bg-[#059669]'>Quản lý</p>
    }
  }

  const convertDate = (date: string) => {
    if (!date) return ('');
    const dateArr = date.split('-');
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  }
  return (
    <div className='w-11/12 m-auto'>
      {loading && <LoadingPage />}
      <p className='font-bold text-3xl my-5'>Thông tin cá nhân</p>
      <div className='grid grid-cols-3 gap-5'>
        <div className='py-16 justify-center rounded-xl shadow-lg shadow-gray-300'>
          <Image src={user?.avatar||'/images/avt.png'} width={1000} height={1000} className='w-1/2 m-auto rounded-xl aspect-square mb-7' alt={''} />
          <div className='w-1/2 text-center m-auto'>
            <p className='text-sm mb-2'>Vai trò</p>
            {convertRole(user?.role || '')}
          </div>
        </div>

        <div className='col-span-2 p-10 rounded-xl shadow-lg shadow-gray-300'>
          <p className='text-xl font-semibold'>Thông tin chi tiết</p>
          <div className='border-b my-3 border-gray-300'></div>
          <div className='flex mb-2'>
            <span className='font-semibold'>Họ và tên đệm:</span>
            <span className='ml-2'>{user?.firstName}</span>
          </div>
          <div className='flex mb-2'>
            <span className='font-semibold'>Tên:</span>
            <span className='ml-2'>{user?.lastName}</span>
          </div>
          <div className='flex mb-2'>
            <span className='font-semibold'>Email:</span>
            <span className='ml-2'>{user?.email}</span>
          </div>
          <div className='flex mb-2'>
            <span className='font-semibold'>Giới tính:</span>
            <span className='ml-2'>{user?.gender === 'MALE' ? 'Nam' : 'Nữ'}</span>
          </div>
          <div className='flex mb-2'>
            <span className='font-semibold'>Ngày sinh:</span>
            <span className='ml-2'>{convertDate(user?.dateOfBirth || '')}</span>
          </div>
          <div className='flex mb-2'>
            <span className='font-semibold'>Điện thoại:</span>
            <span className='ml-2'>{user?.phoneNumber}</span>
          </div>
          <div className='flex mb-2'>
            <span className='font-semibold'>Địa chỉ:</span>
            <span className='ml-2'>{user?.address}</span>
          </div>
        </div>
        <div className='col-span-full gap-5 flex justify-end'>
          <button
            onClick={() => {
              setLoading(true);
              router.push('/manager/profile/change-password');
            }}
            className='px-4 py-2 font-semibold rounded-md hover:bg-gray-300 hover:border-opacity-30 border-gray-600 border'>
            <FontAwesomeIcon icon={faEdit} className='mr-2' />Đổi mật khẩu
          </button>
          <button
            onClick={() => {
              setLoading(true);
              router.push('/manager/profile/edit-profile');
            }}
            className='px-4 py-2 font-semibold rounded-md bg-blue-500 hover:bg-opacity-50'>
            <FontAwesomeIcon icon={faPen} className='mr-2' />Chỉnh sửa thông tin
          </button>
        </div>

      </div>
    </div>
  );
}
