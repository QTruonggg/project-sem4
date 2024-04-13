'use client';
import LogoAndTitleRegister from '@/Components/home/LogoAndTitleRegister/page';
import Image from 'next/image';
import * as React from 'react';
import authApi from '@/api/authApi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import LoadingPage from '@/Components/common/LoadingPage';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IChangePasswordType, IConfirmPasswordType } from '@/types/authType';

export interface INewPasswordProps {
    newPassword: string;
    confirmPassword: string;
}

export default function NewPassword(children: INewPasswordProps) {
    const [loading, setLoading] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState('');
    const [inputBlank, setInputBlank] = React.useState(false);
    const email = Cookies.get('email');
    const router = useRouter();

    // Định nghĩa schema validation
    const schema = yup.object().shape({
        newPassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số')
            .max(255, 'Mật khẩu không được vượt quá 255 ký tự'),
        confirmPassword: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu')
            .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<INewPasswordProps>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<INewPasswordProps> = async (value) => {

        const res: IConfirmPasswordType = {
            ...value,
            email: email || '',
        }

        console.log('RES' + res);
        try {
            setLoading(true);
            await authApi.changeForgotPassword(res);
            Cookies.remove('email');
            router.push('/auth/login');
            message.success('Thay đổi mật khẩu thành công');
        } catch (error: Error | any) {
            const message = error.response.data.message;
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="leading-normal pl-20">
                {loading && <LoadingPage />}
                <LogoAndTitleRegister
                    title='Nhập mật khẩu mới'
                    href='/home'
                    imageURL='/images/logo_footer.png'
                    description='Mật khẩu trước đó của bạn đã được đặt lại. Vui lòng đặt mật khẩu mới cho tài khoản của bạn.' />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-96 mb-3 relative'>
                        <label htmlFor='passwordId' className="block absolute text-sm top-0 left-3 -mt-2 bg-white px-1 text-gray-500">
                            Mật khẩu mới
                        </label>
                        <input type='password'
                            id='newPassword'
                            className="w-full h-12 px-3 py-2 border border-gray-300 rounded outline-none" placeholder='Nhập mật khẩu mới'
                            {...register('newPassword')}
                        />
                        {errors?.newPassword && <span className="text-sm text-red-400">{errors.newPassword.message}</span>}
                        {inputBlank && <span className='text-red-500 text-sm'>Vui lòng nhập mật khẩu mới.</span>}
                    </div>

                    <div className='w-96 mb-3 relative'>
                        <label htmlFor='confirmPasswordId' className="block absolute text-sm top-0 left-3 -mt-2 bg-white px-1 text-gray-500">
                            Xác nhận mật khẩu mới
                        </label>
                        <input type='password'
                            id='confirmPassword'
                            className="w-full h-12 px-3 py-2 border border-gray-300 rounded outline-none" placeholder='Nhập xác mật khẩu mới'
                            {...register('confirmPassword')}
                        />
                        {errors?.confirmPassword && <span className="text-sm text-red-400">{errors.confirmPassword.message}</span>}
                        {errorMessage && <span className='text-sm text-red-500'>{errorMessage}</span>}
                    </div>

                    <button
                        type="submit"
                        className='w-96 py-2 px-4 bg-mint-green text-black rounded hover:bg font-normal'
                    >
                        Cập nhật
                    </button>
                </form>

            </div>

            <div>
                <Image src='/images/Login.png' alt='login' width={500} height={500} />
            </div>
        </>
    );
}
