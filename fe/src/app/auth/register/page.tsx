'use client'
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterType } from '@/types/authType';
import authApi from '@/api/authApi';
import FailedModal from '@/Components/CustomField/FailedModal';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import RegisterInput from '@/Components/CustomField/RegisterInput';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/Components/common/LoadingPage';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../login/config';
export interface RegisterPageProps { }

export default function RegisterPage(props: RegisterPageProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showFailModal, setShowFailModal] = React.useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);

  const closeModal = () => {
    setShowModal(false);
    setLoading(true);
    router.push('/auth/login');
  };
  const closeFailModal = () => {
    setShowFailModal(false);
    document.body.style.overflow = 'auto';
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
      .max(50, 'Tên không được vượt quá 50 ký tự'),
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Email không hợp lệ')
      .max(50, 'Email không được vượt quá 50 ký tự'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số')
      .max(255, 'Mật khẩu không được vượt quá 255 ký tự'),
    confirmPassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IRegisterType>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IRegisterType> = async (value) => {
    try {
      const newValues = {
        ...value,
        firstName: value.firstName.trim(),
        lastName: value.lastName.trim(),
      };
      setLoading(true);
      await authApi.register(newValues);
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.log(error);
      setShowFailModal(true);
      document.body.style.overflow = 'hidden';
    } finally {
      setLoading(false);
    }
  };
  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };
  return (
    <>
      <div>
        <Image
          alt="Map"
          src="/images/Login.png"
          className="w-full h-full"
          width={500}
          height={500}
        />
      </div>
      {loading && <LoadingPage />}
      <div className="p-10">
        <Image
          src={'/images/logo_name.png'}
          alt="Logo Image"
          width={100}
          height={100}
        />
        <h1 className="text-3xl font-extrabold my-4 mt-8 ">Đăng Ký</h1>
        <h4 className="text-sm font-medium text-gray-400">
          Hãy sẵn sàng để truy cập vào tài khoản cá nhân của bạn
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-3">
            <div className='w-1/2'>
              <RegisterInput type="text" id="firstName" label="Họ và tên đệm" register={register} />
              {errors?.firstName && <span className="text-sm  text-red-400">{errors.firstName.message}</span>}
            </div>
            <div className='w-1/2'>
              <RegisterInput type="text" id="lastName" label="Tên" register={register} />
              {errors?.lastName && <span className="text-sm  text-red-400">{errors.lastName.message}</span>}
            </div>
          </div>

          <RegisterInput type="text" id="email" label="Email" register={register} />
          {errors?.email && <span className="text-sm  text-red-400">{errors.email.message}</span>}
          <RegisterInput type="password" id="password" label="Mật khẩu" register={register} />
          {errors?.password && <span className="text-sm  text-red-400">{errors.password.message}</span>}
          <RegisterInput
            type="password"
            id="confirmPassword"
            label="Xác nhận mật khẩu"
            register={register} />
          {errors?.confirmPassword && <span className="text-sm  text-red-400">{errors.confirmPassword.message}</span>}
          <button
            type="submit"
            className={`bg-green-300 text-xl mt-4 text-black w-full text-center border-1 h-12 rounded-md my-4 
            ${!isCheckboxChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isCheckboxChecked}>
            Đăng Ký
          </button>

          <div className="flex justify-between items-center mt-4 ml-1">
            <div className="flex items-center ">
              <input
                type="checkbox"
                id="saveSessionLogin"
                className="h-4 w-4 rounded border-gray-300 border-2 focus:border-blue-500"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="saveSessionLogin"
                className="ml-2 text-gray-700 font-medium text-sm"
              >
                Tôi đồng ý với{' '}
                <Link href="/regulations-and-policies/information-privacy-policy" className="text-orange-500">
                  Bảo mật và Điều khoản hoạt động
                </Link>{' '}
                của V-HomeStay
              </label>
            </div>
          </div>
        </form>
        <SuccessModal isVisible={showModal} onClose={closeModal} message='Đăng ký thành công! Đường link xác nhận đã được gửi tới email của bạn' />
        <FailedModal isVisible={showFailModal} onClose={closeFailModal} message='Email được sử dụng cho tài khoản khác!' />
      </div>
    </>
  );
}
function setAuthState(arg0: { loading: boolean; error: null; data: import("@/types/authType").IUser; }) {
  throw new Error('Function not implemented.');
}

