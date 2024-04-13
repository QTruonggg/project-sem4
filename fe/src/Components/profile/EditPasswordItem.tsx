import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import UserProfileLabel from './UserProfileLabel';
import authApi from '@/api/authApi';
import { IChangePasswordType } from '@/types/authType';
import { useForm, SubmitHandler } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SuccessModal from '../CustomField/SuccessModal';
import FailedModal from '../CustomField/FailedModal';

export interface IEditPasswordItemProps {
  label: string;
  onClickCancel?: () => void;
  setEditArrayInfor: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function EditPasswordItem({
  label,
  onClickCancel,
  setEditArrayInfor,
}: IEditPasswordItemProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [showFailModal, setShowFailModal] = React.useState(false);
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setEditArrayInfor([false, false, false, false, false, false, false]);
  };
  const closeFailModal = () => {
    setShowFailModal(false);
    document.body.style.overflow = 'auto';
  };
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu cũ'),
    newPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu mới')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số')
      .max(255, 'Mật khẩu không được vượt quá 255 ký tự'),
    confirmPassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu mới')
      .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm<IChangePasswordType>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IChangePasswordType> = async (value) => {
    try {
      const response = await authApi.changePassword(value);
      if (response.httpStatus === 'OK') {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
      }
    } catch (error) {
      setShowFailModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <form className="grid grid-cols-12 my-8" onSubmit={handleSubmit(onSubmit)}>
      <UserProfileLabel label={label} />
      <div className="col-span-6 md:col-span-8 grid grid-cols-12 items-center">
        <div className={`mb-5 col-span-12 md:col-span-7 md:text-xl text-sm relative`}>
          <label
            htmlFor={'oldPassword'}
            className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500">
            Mật khẩu cũ
          </label>
          <input
            type="password"
            id={'oldPassword'}
            className={`w-full border border-gray-300 rounded px-3 py-2 `}
            placeholder={'Mật khẩu cũ'}
            {...register('oldPassword')}
          />
          {errors?.oldPassword && <span className="text-sm  text-red-400">{errors.oldPassword.message}</span>}
        </div>
        <div className={`mb-5 col-span-12 md:col-span-7 md:text-xl text-sm relative`}>
          <label
            htmlFor={'newPassword'}
            className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500">
            Mật khẩu mới
          </label>
          <input
            type="password"
            id={'newPassword'}
            className={`w-full border border-gray-300 rounded px-3 py-2 `}
            placeholder={'Mật khẩu mới'}
            {...register('newPassword')}
          />
          {errors?.newPassword && <span className="text-sm  text-red-400">{errors.newPassword.message}</span>}
        </div>
        <div className={`mb-5 col-span-12 md:col-span-7 md:text-xl text-sm relative`}>
          <label
            htmlFor={'confirmPassword'}
            className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id={'confirmPassword'}
            className={`w-full border border-gray-300 rounded px-3 py-2 `}
            placeholder={'Xác nhận mật khẩu'}
            {...register('confirmPassword')}
          />
          {errors?.confirmPassword && <span className="text-sm  text-red-400">{errors.confirmPassword.message}</span>}
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 flex justify-end">
        <div className="grid grid-cols-1 gap-4 w-4/5 text-xs md:text-base">
          <button
            className='justify-self-end'
            onClick={onClickCancel}
          >
            Hủy
          </button>
          <button type="submit" className={`rounded bg-mint-green md:h-12 h-10 hover:bg-opacity-50 border-2 w-4/5 text-xs md:text-base md:w-2/3 md:py-3 justify-self-end`}>
            <span className='text-xs md:text-base'>
              <FontAwesomeIcon icon={faBookmark} />
              Lưu
            </span>
          </button>
        </div>
      </div>
      <SuccessModal isVisible={showModal} onClose={closeModal} message='Cập nhật thành công' />
      <FailedModal isVisible={showFailModal} onClose={closeFailModal} message='Mật khẩu cũ không đúng!' />
    </form>
  );
}
