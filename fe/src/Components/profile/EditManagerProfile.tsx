import * as React from 'react';
import LoadingPage from '@/Components/common/LoadingPage';
import Image from 'next/image';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { faCircleCheck, faCircleXmark, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import { IUser } from '@/types/authType';
import authApi from '@/api/authApi';
dayjs.locale('vi');


export interface IEditManagerProfileProps {
    data: IUser | undefined;
}

export default function EditManagerProfile({
    data,
}: IEditManagerProfileProps) {
    const router = useRouter();
    const [loading, setLoading] = React.useState<boolean>(false);
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

    //   const schema = yup.object().shape({
    //     id: yup
    //       .number()
    //       .required(),
    //     firstName: yup
    //       .string()
    //       .required('Vui lòng nhập họ và tên đệm')
    //       .matches(/^[\p{L}\s]+$/u
    //         , 'Chỉ chấp nhận chữ')
    //       .max(50, 'Họ và tên đệm không được vượt quá 50 ký tự'),
    //     lastName: yup
    //       .string()
    //       .required('Vui lòng nhập tên')
    //       .matches(/^[\p{L}]+$/u
    //         , 'Chỉ nhập tên bao gồm một từ')
    //       .max(50, 'Tên không được vượt quá 50 ký tự'),
    //     address: yup
    //       .string()
    //       .required('Vui lòng nhập địa chỉ')
    //       .max(255, 'Địa chỉ không được vượt quá 255 ký tự'),
    //     phoneNumber: yup
    //       .string()
    //       .required('Vui lòng nhập số điện thoại')
    //       .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    //     dateOfBirth: yup
    //       .string()
    //       .required('Vui lòng chọn ngày sinh'),
    //     accountId: yup
    //       .number()
    //       .required(),
    //     avatar: yup
    //       .string()
    //       .required(),
    //     email: yup
    //       .string()
    //       .required(),
    //     gender: yup
    //       .string()
    //       .required(),
    //     role: yup
    //       .string()
    //       .required()
    //   });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUser>({});

    const onSubmit: SubmitHandler<IUser> = async (value) => {
        try {
            setLoading(true);
            const response = await authApi.updateManagerProfile(value);
            setShowModal(true);
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loading && <LoadingPage />}
            <input type="hidden" value={data?.id} {...register("id")} />
            <input type="hidden" value={data?.accountId} {...register("accountId")} />
            <input type="hidden" value={data?.avatar} {...register("avatar")} />
            <input type="hidden" value={data?.email} {...register("email")} />
            <input type="hidden" value={data?.role} {...register("role")} />

            <p className='font-bold text-3xl my-5'>Thông tin cá nhân</p>
            <div className='grid grid-cols-3 gap-5'>
                <div className='py-16 justify-center rounded-xl shadow-lg shadow-gray-300'>
                    <Image src={data?.avatar || '/images/avt.png'} width={1000} height={1000} className='w-1/2 m-auto rounded-xl aspect-square mb-7' alt={''} />
                    <div className='w-1/2 text-center m-auto'>
                        <p className='text-sm mb-2'>Vai trò</p>
                        {convertRole(data?.role || '')}
                    </div>
                </div>

                <div className='col-span-2 p-10 rounded-xl shadow-lg shadow-gray-300'>
                    <p className='text-xl font-semibold'>Thông tin chi tiết</p>
                    <div className='border-b my-3 border-gray-300'></div>
                    <div className='grid grid-cols-12 mb-5 items-center'>
                        <span className='font-semibold col-span-2'>Họ và tên đệm:</span>
                        <div className='col-span-8'>
                            <input
                                id={'firstName'}
                                className={`border w-full border-gray-300 rounded px-3 py-2`}
                                placeholder={'Họ và tên đệm'}
                                defaultValue={data?.firstName}
                                {...register('firstName', { required: 'Vui lòng nhập họ và tên đệm', pattern: /^[\p{L}\s]+$/u })}
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
                                defaultValue={data?.lastName}
                                {...register('lastName', {
                                    required: 'Vui lòng nhập tên',
                                    pattern: /^[\p{L}]+$/u,
                                    maxLength: {
                                        value: 50,
                                        message: 'Tên không được vượt quá 50 ký tự',
                                    },
                                })}
                            />
                            {errors?.lastName && (
                                <p className="px-3 absolute text-xs  text-red-400">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className='grid grid-cols-12 mb-5 items-center'>
                        <span className='font-semibold col-span-2'>Email:</span>
                        <span className='ml-2 col-span-8'>{data?.email}
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
                                    selected={data?.gender === gender ? true : undefined}
                                    key={gender}
                                    value={gender}
                                >
                                    {getGenderText(gender)}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className='grid grid-cols-12 mb-5 items-center'>
                        <span className='font-semibold col-span-2'>Ngày sinh:</span>
                        <div className=' col-span-3'>
                            <input
                                id={'dateOfBirth'}
                                className={`w-full border border-gray-300 rounded px-3 py-2`}
                                type='date'
                                defaultValue={dayjs(data?.dateOfBirth).format('YYYY-MM-DD')}
                                max={dayjs().format('YYYY-MM-DD')}
                                {...register('dateOfBirth', { required: 'Vui lòng chọn ngày sinh' })}
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
                                defaultValue={data?.phoneNumber}
                                {...register('phoneNumber', {
                                    required: 'Vui lòng nhập số điện thoại',
                                    pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
                                })}
                            />
                            {errors?.phoneNumber && (
                                <p className="px-3 absolute text-xs  text-red-400">
                                    {errors.phoneNumber.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='grid grid-cols-12 mb-5 items-center'>
                        <span className='font-semibold col-span-2'>Địa chỉ:</span>
                        <div className='col-span-8'>
                            <input
                                id={'address'}
                                className={`w-full border border-gray-300 rounded px-3 py-2`}
                                placeholder={'Địa chỉ'}
                                defaultValue={data?.address}
                                {...register('address', {
                                    required: 'Vui lòng nhập địa chỉ',
                                    maxLength: {
                                        value: 255,
                                        message: 'Địa chỉ không được vượt quá 255 ký tự',
                                    },
                                })}
                            />
                            {errors?.address && (
                                <p className="px-3 absolute text-xs  text-red-400">
                                    {errors.address.message}
                                </p>
                            )}
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
                        <FontAwesomeIcon icon={faCircleXmark} className='mr-2' />Hủy chỉnh sửa
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 font-semibold rounded-md bg-mint-green hover:bg-opacity-50'>
                        <FontAwesomeIcon icon={faSave} className='mr-2' />Lưu thông tin
                    </button>
                </div>

            </div>
            <SuccessModal isVisible={showModal}
                onClose={() => {
                    setLoading(true)
                    router.push('/manager/profile')
                }} message={'Cập nhật thông tin thành công'} />
        </form>
    );
}
