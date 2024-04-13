import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import UserProfileLabel from './UserProfileLabel';
import { IUpdateProfileType } from '@/types/authType';
import authApi from '@/api/authApi';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SuccessModal from '../CustomField/SuccessModal';

export interface IEditNameItemProps {
  label: string;
  value: string | {
    first: string;
    last: string;
  };
  onClickCancel?: () => void;
  setEditArrayInfor: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function EditNameItem({
  label,
  value,
  onClickCancel,
  setEditArrayInfor,
}: IEditNameItemProps) {
  let firstName = '';
  let lastName = '';

  if (typeof value !== 'string') {
    firstName = value.first;
    lastName = value.last;
  } else {
    const nameParts = value.split(' ');
    firstName = nameParts.slice(0, nameParts.length - 1).join(' ');
    lastName = nameParts[nameParts.length - 1];
  }
  const [showModal, setShowModal] = React.useState(false);
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setEditArrayInfor([false, false, false, false, false, false, false]);
  };
  const schema = yup.object().shape({
    firstName: yup
    .string()
    .required('Vui lòng nhập họ và tên đệm')
    .matches(/^[\p{L}\s]+$/u
    , 'Chỉ chấp nhận chữ')
    .max(50, 'Họ và tên đệm không được vượt quá 50 ký tự'),
    lastName: yup
    .string()
    .required('Vui lòng nhập tên')
    .matches(/^[\p{L}]+$/u
    , 'Chỉ nhập tên bao gồm một từ')
    .max(50, 'Tên không được vượt quá 50 ký tự')
  });
  
  const { register, handleSubmit, formState: { errors } } = useForm<IUpdateProfileType>({
    resolver: yupResolver(schema),
  });
  
  const { setAuthState, data } = React.useContext(AuthenticationContext);
  const onSubmit: SubmitHandler<IUpdateProfileType> = async (value) => {
    try {
      const response = await authApi.updateProfile(value);
      if (response.httpStatus === 'OK') {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
      }
      setAuthState({
        loading: false,
        data: {
          id: data?.id as number,
          avatar: data?.avatar as string,
          email: data?.email as string,
          firstName: value.firstName as string,
          lastName: value.lastName as string,
          phoneNumber: data?.phoneNumber as string,
          gender: data?.gender as string,
          dateOfBirth: data?.dateOfBirth as string,
          address: data?.address as string,
          accountId: data?.accountId as number,
          role: data?.role as string,
        },
        error: null,
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="grid grid-cols-12 my-8" onSubmit={handleSubmit(onSubmit)}>
      <UserProfileLabel label={label} />
      <div className={`col-span-6 md:col-span-8 grid grid-cols-12 items-center`}>
        <div className={`mb-5 col-span-12 md:col-span-7 md:text-xl text-sm relative`}>
          <label
            htmlFor={'firstName'}
            className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500"
          >
            Họ và tên đệm
          </label>
          <input
            id={'firstName'}
            className={`w-full border border-gray-300 rounded px-3 py-2`}
            placeholder={'Họ và tên đệm'}
            defaultValue={firstName}
            {...register('firstName')}
          />
          {errors?.firstName && <span className="text-sm  text-red-400">{errors.firstName.message}</span>}
        </div>
        <div className={`mb-5 col-span-12 md:col-span-7 md:text-xl text-sm relative`}>
          <label
            htmlFor={'lastName'}
            className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500"
          >
            Tên
          </label>
          <input
            id={'lastName'}
            className={`w-full border border-gray-300 rounded px-3 py-2`}
            placeholder={'Tên'}
            defaultValue={lastName}
            {...register('lastName')}
          />
          {errors?.lastName && <span className="text-sm  text-red-400">{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 flex justify-end">
        <div className="grid grid-cols-1 gap-4 w-4/5 text-xs md:text-base">
          <button className="justify-self-end" onClick={onClickCancel}>
            Hủy
          </button>
          <button
            type="submit"
            className={`rounded bg-mint-green md:h-12 h-10 hover:bg-opacity-50 border-2 w-4/5 text-xs md:text-base md:w-2/3 md:py-3 justify-self-end`}
          >
            <span className="text-xs md:text-base">
              <FontAwesomeIcon icon={faBookmark} /> Lưu
            </span>
          </button>
        </div>
      </div>
      <SuccessModal isVisible={showModal} onClose={closeModal} message='Cập nhật thành công' />
    </form>
  );
}
