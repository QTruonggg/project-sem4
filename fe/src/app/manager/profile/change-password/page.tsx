'use client'
import LoadingPage from '@/Components/common/LoadingPage';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import authApi from '@/api/authApi';
import { IChangePasswordType } from '@/types/authType';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FailedModal from '@/Components/CustomField/FailedModal';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import { faCircleXmark, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IChangePasswordProps {
}

export default function ChangePassword(props: IChangePasswordProps) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showFailModal, setShowFailModal] = React.useState(false);
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
            setLoading(true);
            const response = await authApi.changePassword(value);
            if (response.httpStatus === 'OK') {
                setShowModal(true);
                document.body.style.overflow = 'hidden';
            }
        } catch (error) {
            setShowFailModal(true);
            document.body.style.overflow = 'hidden';
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 m-auto'>
            <div className='w-2/3'>

                {loading && <LoadingPage />}
                <p className='font-bold text-3xl my-5'>Thông tin cá nhân</p>
                <div className='border-b my-3 border-gray-300 p-10 grid grid-cols-12 rounded-xl shadow-lg shadow-gray-300'>
                        <div className={`mb-5 col-span-12 grid grid-cols-7 md:text-xl text-sm items-center`}>
                            <span className='font-semibold col-span-2'>Mật khẩu cũ:</span>
                            <div className='col-span-5'>
                            <input
                                type="password"
                                id={'oldPassword'}
                                className={`w-full border border-gray-300 rounded px-3 py-2 `}
                                placeholder={'Mật khẩu cũ'}
                                {...register('oldPassword')}
                            />
                            {errors?.oldPassword && <span className="text-sm  text-red-400">{errors.oldPassword.message}</span>}

                            </div>
                        </div>
                        <div className={`mb-5 col-span-12 grid grid-cols-7 md:text-xl text-sm items-center`}>
                            <span className='font-semibold col-span-2'>Mật khẩu mới:</span>
                            <div className='col-span-5'>
                            <input
                                type="password"
                                id={'newPassword'}
                                className={`w-full border border-gray-300 rounded px-3 py-2 `}
                                placeholder={'Mật khẩu mới'}
                                {...register('newPassword')}
                            />
                            {errors?.newPassword && <span className="text-sm  text-red-400">{errors.newPassword.message}</span>}

                            </div>
                        </div>
                        <div className={`mb-5 col-span-12 grid grid-cols-7 md:text-xl text-sm items-center`}>
                            <span className='font-semibold col-span-2'>Xác nhận mật khẩu:</span>
                            <div className='col-span-5'>
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
                    
                </div>
                <div className='col-span-full gap-5 flex justify-end'>
                    <button
                        onClick={() => {
                            setLoading(true);
                            router.push('/manager/profile');
                        }}
                        className='px-4 py-2 font-semibold rounded-md hover:bg-gray-300 hover:border-opacity-30 border-gray-600 border'>
                        <FontAwesomeIcon icon={faCircleXmark} className='mr-2' />Hủy đổi mật khẩu
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 font-semibold rounded-md bg-blue-500 hover:bg-opacity-50'>
                        <FontAwesomeIcon icon={faSave} className='mr-2' />Lưu Mật khẩu
                    </button>
                </div>

                <SuccessModal isVisible={showModal}
                    onClose={() => {
                        setLoading(true)
                        router.push('/manager/profile')
                    }} message={'Cập nhật thông tin thành công'} />
                <FailedModal isVisible={showFailModal} onClose={closeFailModal} message='Mật khẩu cũ không đúng!' />
            </div>
        </form>
    );
}
