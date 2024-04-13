'use client'
import LoadingPage from '@/Components/common/LoadingPage';
import Image from 'next/image';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { faCircleCheck, faCircleXmark, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { IUser } from '@/types/authType';
import authApi from '@/api/authApi';
import { useForm, SubmitHandler } from 'react-hook-form';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import UpdateImageAdmin from '@/Components/profile/UpdateImageAdmin';
import { set } from 'date-fns';
dayjs.locale('vi');

export interface IEditProfileProps {
}


export default function EditProfile(props: IEditProfileProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<IUser>();
  const { setAuthState, data } = React.useContext(AuthenticationContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isEditAvatar, setIsEditAvatar] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState(false);
  const genderList = ['MALE', 'FEMALE', 'OTHER'];

  const convertRole = (role: string) => {
    if (role === "SUPER_ADMIN") {
      return <p className='px-2 py-1 rounded-xl text-white font-semibold bg-[#B00505]'>Super admin</p>
    } else if (role === "ADMIN") {
      return <p className='px-2 py-1 rounded-xl text-white font-semibold bg-yellow-500'>Admin</p>
    } else if (role === "MANAGER") {
      return <p className='px-2 py-1 rounded-xl text-white font-semibold bg-[#059669]'>Quản lý</p>
    }
  }



  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IUser>(
    // { resolver: yupResolver(schema) }
  );


  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await authApi.getCurrentUserAdmin();
        setUser(res);
        setAuthState({
          data: {
            avatar: res?.avatar,
            firstName: res?.firstName,
            lastName: res?.lastName,
            accountId: res?.accountId,
            role: res?.role,
            email: res?.email,
            address: res?.address,
            dateOfBirth: res?.dateOfBirth,
            gender: res.gender,
            phoneNumber: res?.phoneNumber,
            id: res?.id,
          },
          error: null,
          loading: false,
        })
        setValue('id', res?.id);
        setValue('accountId', res?.accountId);
        setValue('avatar', res?.avatar);
        setValue('email', res?.email);
        setValue('role', res?.role);
        setValue('firstName', res?.firstName);
        setValue('lastName', res?.lastName);
        setValue('gender', res?.gender);
        setValue('dateOfBirth', res?.dateOfBirth);
        setValue('phoneNumber', res?.phoneNumber);
        setValue('address', res?.address);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }

  
    }
    fetchProfile();
  }, [isEditAvatar]);


  


  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'MALE':
        return 'Nam';
      case 'FEMALE':
        return 'Nữ';
      case 'OTHER':
        return 'Khác';
      default:
        return '';
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const currentDate = dayjs().format('YYYY-MM-DD');

    if (selectedDate > currentDate) {
      event.target.value = currentDate;
    }
  };

  const onSubmit: SubmitHandler<IUser> = async (value) => {
    try {
      setLoading(true);
      await authApi.updateAdminProfile(value);
      setShowModal(true);
      document.body.style.overflow = 'hidden';

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-11/12 m-auto'>
      {loading && <LoadingPage />}
      <p className='font-bold text-3xl my-5'>Thông tin cá nhân</p>
      <div className='grid grid-cols-3 gap-5'>
        <div className='py-16 justify-center rounded-xl shadow-lg shadow-gray-300'>
          <Image src={user?.avatar || '/images/avt.png'} width={1000} height={1000} className='w-1/2 m-auto rounded-xl aspect-square mb-2' alt={''} />
          <div className='w-1/2 text-center m-auto'>
            <UpdateImageAdmin avatar={user?.avatar || ''} isEditAvatar={isEditAvatar} setIsEditAvatar={setIsEditAvatar} />
            <p className='text-sm mb-2'>Vai trò</p>
            {convertRole(user?.role || '')}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='col-span-2 p-10 rounded-xl shadow-lg shadow-gray-300'>
          <input type="hidden" value={user?.id} {...register("id")} />
          <input type="hidden" value={user?.accountId} {...register("accountId")} />
          <input type="hidden" value={user?.avatar} {...register("avatar")} />
          <input type="hidden" value={user?.email} {...register("email")} />
          <input type="hidden" value={user?.role} {...register("role")} />

          <p className='text-xl font-semibold'>Thông tin chi tiết</p>
          <div className='border-b my-3 border-gray-300'></div>
          <div className='grid grid-cols-12 mb-5 items-center'>
            <span className='font-semibold col-span-2'>Họ và tên đệm:</span>
            <div className='col-span-8'>
              <input
                id={'firstName'}
                className={`border w-full border-gray-300 rounded px-3 py-2`}
                placeholder={'Họ và tên đệm'}
                defaultValue={user?.firstName}
                {...register('firstName')}
              />
              {errors?.firstName && <p className="px-3 absolute text-xs  text-red-400">{errors.firstName.message}</p>}

            </div>
          </div>


          <div className='grid grid-cols-12 mb-5 items-center'>
            <span className='font-semibold col-span-2'>Tên:</span>
            <div className='col-span-8'>
              <input
                id={'lastName'}
                className={`w-full border border-gray-300 rounded px-3 py-2`}
                placeholder={'Tên'}
                defaultValue={user?.lastName}
                {...register('lastName')}
              />
              {errors?.lastName && <p className="px-3 absolute text-xs  text-red-400">{errors.lastName.message}</p>}

            </div>
          </div>


          <div className='grid grid-cols-12 mb-5 items-center'>
            <span className='font-semibold col-span-2'>Email:</span>
            <span className='ml-2 col-span-8'>{user?.email}
              <FontAwesomeIcon icon={faCircleCheck} beat style={{ color: '#0fd71c', animationDuration: '3s' }} className='ml-3' /></span>
          </div>


          <div className='grid grid-cols-12 mb-5 items-center'>
            <span className='font-semibold col-span-2'>Giới tính:</span>
            <select
              className=" px-3 col-span-3 py-2 border border-gray-300 rounded"
              {...register("gender")}
            >
              {genderList.map(gender => (
                <option
                  selected={user?.gender === gender ? true : undefined}
                  key={gender}
                  value={gender}
                >
                  {getGenderText(gender)}
                </option>
              ))}
            </select>
            {errors?.gender && <p className="px-3 absolute text-xs  text-red-400">{errors.gender.message}</p>}
          </div>


          <div className='grid grid-cols-12 mb-5 items-center'>
            <span className='font-semibold col-span-2'>Ngày sinh:</span>
            <div className=' col-span-3'>
              <input
                id={'dateOfBirth'}
                className={`w-full border border-gray-300 rounded px-3 py-2`}
                type='date'
                defaultValue={dayjs(user?.dateOfBirth).format('YYYY-MM-DD')}
                max={dayjs().format('YYYY-MM-DD')}
                {...register('dateOfBirth')}
                onChange={handleDateChange}
              />
              {errors?.dateOfBirth && <p className="px-3 absolute text-xs  text-red-400">{errors.dateOfBirth.message}</p>}

            </div>
          </div>
          <div className='grid grid-cols-12 mb-5 items-center'>
            <span className='font-semibold col-span-2'>Điện thoại:</span>
            <div className='col-span-8'>
              <input
                id={'phoneNumber'}
                className={`w-full border border-gray-300 rounded px-3 py-2`}
                placeholder={'Số điện thoại'}
                defaultValue={user?.phoneNumber}
                {...register('phoneNumber')}
              />
              {errors?.phoneNumber && <p className="px-3 absolute text-xs  text-red-400">{errors.phoneNumber.message}</p>}

            </div>
          </div>
          <div className='grid grid-cols-12 mb-5 items-center'>
            <span className='font-semibold col-span-2'>Địa chỉ:</span>
            <div className='col-span-8'>
              <input
                id={'address'}
                className={`w-full border border-gray-300 rounded px-3 py-2`}
                placeholder={'Địa chỉ'}
                defaultValue={user?.address}
                {...register('address')}
              />
              {errors?.address && <p className="px-3 absolute text-xs  text-red-400">{errors.address.message}</p>}

            </div>
          </div>
          <div className='col-span-full gap-5 flex justify-end'>
            <button
              onClick={() => {
                setLoading(true);
                router.push('/admin/profile');
              }}
              className='px-4 py-2 font-semibold rounded-md hover:bg-gray-300 hover:border-opacity-30 border-gray-600 border'>
              <FontAwesomeIcon icon={faCircleXmark} className='mr-2' />Hủy chỉnh sửa
            </button>
            <button
              type='submit'
              className='px-4 py-2 font-semibold rounded-md bg-blue-500 hover:bg-opacity-50'>
              <FontAwesomeIcon icon={faSave} className='mr-2' />Lưu thông tin
            </button>
          </div>
        </form>

      </div>
      <SuccessModal isVisible={showModal}
        onClose={() => {
          setLoading(true)
          router.push('/admin/profile')
        }} message={'Cập nhật thông tin thành công'} />
    </div>
  );
}
