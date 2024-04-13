'use client';
import LogoAndTitleRegister from '@/Components/home/LogoAndTitleRegister/page';
import authApi from '@/api/authApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import * as React from 'react';
import LoadingPage from '@/Components/common/LoadingPage';
import Cookies from 'js-cookie';

export interface IOtpCodeProps {
}


export default function OtpCode(props: IOtpCodeProps) {

    const [otp, setOTP] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [inputBlank, setInputBlank] = React.useState(false);

    const [remainingTime, setRemainingTime] = React.useState(300); // 300 seconds (5 minutes)
    const [showResendButton, setShowResendButton] = React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    React.useEffect(() => {
        if (remainingTime === 0) {
            setShowResendButton(true);
        }
    }, [remainingTime]);

    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    const handleOTPChange = (e: any) => {
        const newOTP = e.target.value;
        setOTP(newOTP);
        // Xóa thông báo lỗi khi người dùng bắt đầu gõ lại
        setErrorMessage('');
        setInputBlank(false);
    };


    const email = Cookies.get("email");
    const handleResendOTP = async () => {
        try {
            setLoading(true);
            // Gọi API để gửi lại mã OTP
            await authApi.forgotPassword(email || '');
            setRemainingTime(300); // Reset thời gian còn lại về 5 phút
            setShowResendButton(false); // Ẩn nút "Gửi lại"
            message.success('Đã gửi lại mã OTP');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {

            if (otp.trim() === '') {
                setInputBlank(true);
                return; // Không thực hiện xử lý gửi nếu input trống
            }
            // Gọi API để xác minh mã OTP
            setLoading(true);
            await authApi.verifyOtp(otp);
            router.push('/auth/newpassword');
            message.success('Xác minh thành công');

        } catch (error: Error | any) {
            console.log(error);
            message.error('Mã OTP không chính xác');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="leading-normal pl-20">
                {loading && <LoadingPage />}
                <LogoAndTitleRegister
                    title='Nhập mã xác minh'
                    href='/home'
                    imageURL='/images/logo_footer.png'
                    description='Nhập mã xác minh đã được gửi đến email của bạn.' />

                <div className={`relative w-96 mb-3`}>
                    <label
                        htmlFor='code'
                        className="block absolute text-sm top-0 left-3 -mt-2 bg-white px-1 text-gray-500"
                    >
                        Mã xác minh
                    </label>
                    <input
                        type='text'
                        required={true}
                        id='code'
                        className="w-full h-12 px-3 py-2 border border-gray-300 rounded outline-none"
                        placeholder='Nhập mã xác minh'
                        onChange={handleOTPChange} />
                    {errorMessage && <span className='text-sm text-red-500'>{errorMessage}</span>}
                    {inputBlank && <span className='text-red-500 text-sm'>Vui lòng nhập mã otp đã được gửi đến email của bạn.</span>}
                </div>

                <div className="">
                    {remainingTime > 0 && (
                        <p className="text-red-500">
                            Gửi lại mã sau: {Math.floor(remainingTime / 60)}:{remainingTime % 60}
                        </p>
                    )}
                    {showResendButton && (
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={handleResendOTP}
                        >
                            Gửi lại
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className='w-96 py-2 px-4 bg-mint-green text-black rounded hover:bg font-normal'
                    onClick={handleSubmit}
                >
                    Xác minh
                </button>
            </div>

            <div>
                <Image src='/images/Login.png' alt='login' width={500} height={500} />
            </div>

        </>
    );
}
