import { IEditBookingInfo } from '@/types/bookingType';
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import bookingApi from '@/api/bookingApi';
import LoadingPage from '../common/LoadingPage';

export interface IEditModalProps {
    isVisible: boolean;
    onClose: () => void;
    bookingData: IEditBookingInfo | undefined;
    isChange: boolean;
    setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditModal(props: IEditModalProps) {
    const [loading, setLoading] = React.useState(false);

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    }

    const schema = yup.object().shape({
        bookingCode: yup.string().required('Vui lòng nhập mã đặt trước'),
        customerName: yup
            .string()
            .required('Vui lòng nhập họ và tên')
            .matches(/^[\p{L}\s]+$/u
                , 'Chỉ chấp nhận chữ')
            .max(50, 'Họ và tên không được vượt quá 50 ký tự'),
        customerPhone: yup
            .string()
            .required('Vui lòng nhập số điện thoại')
            .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
    });
    const { register, handleSubmit, formState: { errors } } = useForm<IEditBookingInfo>(
        {
            resolver: yupResolver(schema),
        }
    );

    const onSubmit: SubmitHandler<IEditBookingInfo> = async (value) => {
        try {
            setLoading(true);
            const response = await bookingApi.editBookingInfo(value);
            console.log(response);
            props.onClose();
            props.setIsChange(!props.isChange);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    if (!props.isVisible) return (null)

    return (
        <div className={`fixed  backdrop-brightness-50 flex inset-0 justify-center items-center backdrop-filter z-50 overflow-hidden`}
            onClick={handleClose}
            id='wrapper'>
            {loading && <LoadingPage />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" value={props.bookingData?.bookingCode} {...register("bookingCode")} />
                <div className='flex flex-col'>
                    <button className='text-white text-xl self-end'
                        onClick={props.onClose}>X</button>
                    <div className='bg-white p-10 rounded shadow-md shadow-gray-300'>
                        <p className='text-3xl font-bold text-center py-10'>Chỉnh sửa thông tin người đặt</p>

                        <div className='grid grid-cols-10 mb-5'>
                            <div className='col-span-4'>
                                <p className='text-lg font-semibold py-3'>Tên người đặt :</p>
                            </div>
                            <div className='col-span-6'>
                                <input
                                    defaultValue={props.bookingData?.customerName}
                                    {...register("customerName")}
                                    className="w-full h-full rounded border border-gray-500 px-2"
                                />
                                {errors.customerName && <p className='text-red-500 text-sm'>{errors.customerName.message}</p>}
                            </div>
                        </div>
                        <div className='grid grid-cols-10 mb-5'>
                            <div className='col-span-4'>
                                <p className='text-lg font-semibold py-3'>Số điện thoại :</p>
                            </div>
                            <div className='col-span-6'>
                                <input
                                    defaultValue={props.bookingData?.customerPhone}
                                    {...register("customerPhone")}
                                    className="w-full h-full rounded border border-gray-500 px-2"
                                />
                                {errors.customerPhone && <p className='text-red-500 text-sm'>{errors.customerPhone.message}</p>}
                            </div>
                        </div>

                        <div className='flex justify-end mt-8'>
                            <button type="submit"
                                className='rounded-lg bg-mint-green hover:bg-green-600 px-4 py-2 mr-2'>Lưu</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
