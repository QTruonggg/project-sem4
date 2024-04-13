import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import UserProfileLabel from './UserProfileLabel';
import authApi from '@/api/authApi';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { IUpdateProfileType } from '@/types/authType';
import { useForm, SubmitHandler } from 'react-hook-form';
import SuccessModal from '../CustomField/SuccessModal';

export interface IEditGenderItemProps {
  label: string;
  value: string;
  onClickCancel?: () => void;
  setEditArrayInfor: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const EditGenderItem: React.FC<IEditGenderItemProps> = ({
  label,
  value,
  onClickCancel,
  setEditArrayInfor,
}) => {
  const genderList = ['MALE', 'FEMALE', 'OTHER'];

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
  const { setAuthState, data } = React.useContext(AuthenticationContext);
  const [showModal, setShowModal] = React.useState(false);
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setEditArrayInfor([false, false, false, false, false, false, false]);
  };
  const { register, handleSubmit } = useForm<IUpdateProfileType>();
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
          firstName: data?.firstName as string,
          lastName: data?.lastName as string,
          phoneNumber: data?.phoneNumber as string,
          gender: value.gender as string,
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 my-8">
      <UserProfileLabel label={label} />
      <div className="col-span-6 md:col-span-8 flex items-center">
        <select
          className="md:w-52 w-32 h-12 px-3 py-2 border border-gray-300 rounded"
          {...register("gender")}>
          {genderList.map(gender => (
            <option
              selected={value === gender ? true : undefined}
              key={gender}
              value={gender}
            >
              {getGenderText(gender)}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-4 md:col-span-2 flex justify-end">
        <div className="grid grid-cols-1 gap-4  w-4/5 text-xs md:text-base">
          <button className='justify-self-end' onClick={onClickCancel}>
            Hủy
          </button>
          <button
            type="submit"
            className={`rounded bg-mint-green md:h-12 h-10 hover:bg-opacity-50 border-2 w-4/5 text-xs md:text-base md:w-2/3 md:py-3 justify-self-end`}
          >
            <span className='text-xs md:text-base'>
              <FontAwesomeIcon icon={faBookmark} /> Lưu
            </span>
          </button>
        </div>
      </div>
      <SuccessModal isVisible={showModal} onClose={closeModal} message='Cập nhật thành công' />
    </form>
  );
};

export default EditGenderItem;
