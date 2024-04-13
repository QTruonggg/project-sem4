import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import FailedModal from '@/Components/CustomField/FailedModal';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import RegisterInput from '@/Components/CustomField/RegisterInput';
import { IInsertUserType } from '@/types/userType';
import userApi from '@/api/userApi';
import LoadingPage from '@/Components/common/LoadingPage';

export interface IAddAdminProps {
    onCancel: () => void;
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddAdmin({
    onCancel,
    change,
    setChange,
}: IAddAdminProps) {
    const [loading, setLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showFailModal, setShowFailModal] = React.useState(false);

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
            .max(50, 'Tên không được vượt quá 50 ký tự'),
        email: yup
            .string()
            .required('Vui lòng nhập email')
            .email('Email không hợp lệ')
            .max(50, 'Email không được vượt quá 50 ký tự'),
        phoneNumber: yup
            .string()
            .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<IInsertUserType>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IInsertUserType> = async (data) => {
        try {
            setLoading(true);
            await userApi.insertUser(data);
            setShowModal(true);
            document.body.style.overflow = 'hidden';
            setChange(!change);
        } catch (error) {
            console.log(error);
            setShowFailModal(true);
            document.body.style.overflow = 'hidden';
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            {loading && <LoadingPage />}
            {showModal && (
                <SuccessModal isVisible={showModal}
                    onClose={() => {
                        setShowModal(false)
                        onCancel()
                    }}
                    message={'Thêm tài khoản Quản lý thành công'} />
            )}
            {showFailModal && (
                <FailedModal
                    isVisible={showFailModal}
                    onClose={() => {
                        setShowFailModal(false)
                        onCancel()
                    }}
                    message={'Email đã tồn tại'} />
            )}
            <div className="bg-white p-4 rounded-lg w-1/3 shadow-md">
                <div className='flex justify-between text-lg font-semibold mb-4'>
                    <h3>Thêm tài khoản Admin</h3>
                    <h3 onClick={onCancel} className='cursor-pointer'>X</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>


                        <input type="hidden" {...register('role')} value={'ADMIN'} />

                        <label htmlFor="firstName">Họ và tên đệm <span className='text-red-500'>*</span></label>
                        <input {...register('firstName')} type="text" name='firstName' id='firstName' className='border border-gray-300 rounded-lg p-2 mb-5' />
                        {errors.firstName && <span className='text-red-500'>{errors.firstName.message}</span>}

                        <label htmlFor="lastName">Tên <span className='text-red-500'>*</span></label>
                        <input {...register('lastName')} type="text" name='lastName' id='lastName' className='border border-gray-300 rounded-lg p-2 mb-5' />
                        {errors.lastName && <span className='text-red-500'>{errors.lastName.message}</span>}

                        <label htmlFor="email">Email <span className='text-red-500'>*</span></label>
                        <input {...register('email')} type="text" name='email' id='email' className='border border-gray-300 rounded-lg p-2 mb-5' />
                        {errors.email && <span className='text-red-500'>{errors.email.message}</span>}

                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input {...register('phoneNumber')} type="text" name='phoneNumber' id='phoneNumber' className='border border-gray-300 rounded-lg p-2 mb-5' />
                        {errors.phoneNumber && <span className='text-red-500'>{errors.phoneNumber.message}</span>}
                    </div>


                    <div className="mt-4 flex justify-end">
                        <button
                            className="px-4 py-2 mr-2 bg-yellow-500 text-white rounded-lg"
                            type="submit"
                        >
                            Thêm tài khoản Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
