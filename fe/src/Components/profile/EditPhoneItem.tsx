import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import UserProfileLabel from './UserProfileLabel';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import authApi from '@/api/authApi';
import { IUpdateProfileType } from '@/types/authType';
import { useForm, SubmitHandler } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SuccessModal from '../CustomField/SuccessModal';

export interface IEditPhoneItemProps {
    label: string;
    value: string;
    onClickCancel?: () => void;
    setEditArrayInfor: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function EditPhoneItem({
    label,
    value,
    onClickCancel,
    setEditArrayInfor,
}: IEditPhoneItemProps) {
    const { setAuthState, data } = React.useContext(AuthenticationContext);
    const [showModal, setShowModal] = React.useState(false);
    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'auto';
        setEditArrayInfor([false, false, false, false, false, false, false]);
    };
    const convertPhoneNumber = (phoneNumber: string) => {
        if (phoneNumber.startsWith('+84')) {
            return '0' + phoneNumber.slice(3);
        } else if (phoneNumber.startsWith('84')) {
            return '0' + phoneNumber.slice(2);
        }
        return phoneNumber;
    }
    const schema = yup.object().shape({
        phoneNumber: yup
            .string()
            .required('Vui lòng nhập số điện thoại')
            .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
    });
    const { register, handleSubmit, formState: { errors } } = useForm<IUpdateProfileType>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IUpdateProfileType> = async (value) => {
        try {
            const phoneNumber = convertPhoneNumber(value.phoneNumber as string);
            const response = await authApi.updateProfile({ ...value, phoneNumber });
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
                    phoneNumber: phoneNumber,
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 my-8">
            <UserProfileLabel label={label} />
            <div className={`col-span-6 md:col-span-8 flex ${errors.phoneNumber ? 'items-end' : 'items-center'}`}>
                <div className={`mb-5 md:m-0 md:mr-16 md:text-xl text-sm relative`}>
                    <label
                        htmlFor={'phoneNumber'}
                        className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500">
                        Số điện thoại
                    </label>
                    <input
                        id={'phoneNumber'}
                        className={`w-full border border-gray-300 rounded px-3 py-2 `}
                        placeholder={'Số điện thoại'}
                        defaultValue={value}
                        {...register('phoneNumber')}
                    />
                    {errors?.phoneNumber && <span className="text-sm  text-red-400">{errors.phoneNumber.message}</span>}
                </div>
            </div>

            <div className="col-span-4 md:col-span-2 flex justify-end">
                <div className="grid grid-cols-1 gap-4 w-full">
                    <button
                        className="justify-self-end"
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
        </form>
    );
}
