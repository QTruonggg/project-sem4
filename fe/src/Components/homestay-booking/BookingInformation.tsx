import { AuthenticationContext } from '@/features/auth/AuthContext';
import { ISelectedBookingDetail, ISelectedHousehold } from '@/types/homestayBookingType';
import Link from 'next/link';
import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, SubmitHandler, set } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { getSession } from '@/utils/sessionStorage';

export interface IBookingInformationProps {
    isConfirm: boolean;
    setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    confirmData: ISelectedHousehold;
    setConfirmData: React.Dispatch<React.SetStateAction<ISelectedHousehold>>;
}

export default function BookingInformation({
    setIsConfirm,
    isConfirm,
    setConfirmData,
    confirmData,
}: IBookingInformationProps) {
    const [sessionData, setSessionData] = React.useState<ISelectedHousehold>(getSession('selectedHousehold'));
    const { data } = React.useContext(AuthenticationContext);
    const [isBookingForMe, setIsBookingForMe] = React.useState<boolean>(true);
    const [newBookingList, setNewBookingList] = React.useState<ISelectedBookingDetail[]>([]);

    React.useEffect(() => {
        let newBookingList: ISelectedBookingDetail[] = [];
        sessionData?.bookingDetailList.forEach((bookingDetail) => {
            const newBooking: ISelectedBookingDetail = {
                homestayId: bookingDetail.homestayId,
                roomTypeName: bookingDetail.roomTypeName,
                homestayCode: bookingDetail.homestayCode,
                householdRoomTypeId: bookingDetail.householdRoomTypeId,
                customerCheckInName: "",
            };
            for (let i = 0; i < (bookingDetail?.quantity || 0); i++) {
                newBookingList.push(newBooking);
            }
        });
        setNewBookingList(newBookingList);
    }, [sessionData]);

    // const schema: yup.ObjectSchema<ISelectedHousehold> = yup.object().shape({
    const schema = yup.object().shape({
        customerName: yup
            .string()
            .required('Vui lòng nhập tên')
            .matches(/^[\p{L}\s]+$/u
                , 'Chỉ chấp nhận chữ')
            .max(50, 'Tên không được vượt quá 50 ký tự'),
        customerPhone: yup
            .string()
            .required('Vui lòng nhập số điện thoại')
            .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
        bookingDetailList: yup
            .array()
            .of(
                yup.object().shape({
                    customerCheckInName: yup
                        .string()
                        .required('Vui lòng nhập tên người đại diện')
                        .matches(/^[\p{L}\s]+$/u, 'Chỉ chấp nhận chữ')
                        .max(50, 'Tên không được vượt quá 50 ký tự'),
                })
            ),

    });

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<ISelectedHousehold>({
        //@ts-ignore
        resolver: yupResolver(schema),
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'bookingDetailList',
    });

    React.useEffect(() => {
        if (isBookingForMe) {
            setValue('customerName', `${data?.firstName} ${data?.lastName}`);
        }
    }, [isBookingForMe, data, setValue]);

    const onConfirm: SubmitHandler<ISelectedHousehold> = async (value) => {
        setConfirmData(value);
        setIsConfirm(true);
    };

    function scrollUp() {
        window.scrollTo({
          top: 400,
          behavior: 'smooth'
        });
      }


    if (!data) {
        return (
            <div className='p-4 rounded-xl shadow-md shadow-gray-300 col-span-6'>
                <p className='text-2xl font-bold mb-5'>ĐĂNG NHẬP ĐỂ TIẾP TỤC ĐẶT PHÒNG</p>
                <Link href="/auth/login" className='bg-mint-green flex font-semibold justify-center text-lg p-2 rounded-sm'>Đăng nhập để tiếp tục</Link>
            </div>
        );
    } else {
        if (isConfirm === false) {
            return (
                <>
                    <form className='col-span-6' onSubmit={handleSubmit(onConfirm)}>
                        <input type="hidden" {...register("householdId")} value={sessionData?.householdId} />
                        <input type="hidden" {...register("checkInDate")} value={sessionData?.checkInDate} />
                        <input type="hidden" {...register("checkOutDate")} value={sessionData?.checkOutDate} />
                        <input type="hidden" {...register("numberOfGuests")} value={sessionData?.numberOfGuests} />
                        <input type="hidden" {...register("totalNight")} value={sessionData?.totalNight} />
                        <input type="hidden" {...register("totalPrice")} value={sessionData?.totalPrice} />
                        <input type="hidden" {...register("paymentGateway")} value="VN_PAY" />

                        <div className='p-4 rounded-xl shadow-md shadow-gray-300 mb-10'>
                            <p className='text-2xl font-bold mt-5'>Thông tin đặt phòng</p>
                            <div className='my-5 border border-b-[1px] border-gray-300'></div>
                            <div className='grid grid-cols-10 mb-5 items-center'>
                                <div className='col-span-4'>
                                    <p className='font-bold'>Bạn đặt phòng cho ai?</p>
                                </div>
                                <div className='col-span-6'>
                                    <div className='flex items-center'>
                                        <div className='w-1/3'>
                                            <input className='h-4 w-4 text-mint-green bg-gray-100 border-gray-300 border-2'
                                                type="radio" name="bookingFor" id="bookingForMe" checked={isBookingForMe} onChange={() => setIsBookingForMe(true)} />
                                            <label htmlFor="bookingForMe" className='ml-2'>Tôi</label>
                                        </div>
                                        <div>
                                            <input className='h-4 w-4 text-mint-green bg-gray-100 border-gray-300 border-2'
                                                type="radio" name="bookingFor" id="bookingOther" checked={!isBookingForMe} onChange={() => setIsBookingForMe(false)} />
                                            <label htmlFor="bookingOther" className='ml-2'>Đặt hộ người khác</label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='grid grid-cols-10 items-center mb-5'>
                                {!isBookingForMe &&
                                    <div className='col-span-4 '>
                                        <p className='font-bold'>Họ và tên người đặt <span className='text-red-600'>*</span></p>
                                    </div>
                                }
                                <div className='col-span-6'>
                                    <input type={isBookingForMe ? "hidden" : "text"}
                                        {...register("customerName")}
                                        className='w-3/4 border border-gray-300 p-2 rounded-md' />
                                    {!isBookingForMe && errors?.customerName && <p className="text-sm absolute text-red-400">{errors.customerName.message}</p>}

                                </div>
                            </div>

                            <div className='grid grid-cols-10 mb-5 items-center'>
                                <div className='col-span-4'>
                                    <p className='font-bold'>Số điện thoại liên hệ <span className='text-red-600'>*</span></p>
                                </div>
                                <div className='col-span-6'>
                                    <input type="text"
                                        className='w-3/4 border border-gray-300 p-2 rounded-md'
                                        {...register("customerPhone")}
                                        defaultValue={data.phoneNumber} />
                                    {errors?.customerPhone && <p className="text-sm absolute text-red-400">{errors.customerPhone.message}</p>}

                                </div>
                            </div>
                        </div>


                        <div className='p-4 rounded-xl shadow-md shadow-gray-300 mb-10'>
                            <p className='text-2xl font-bold mt-5'>Thông tin chi tiết</p>
                            {newBookingList.map((booking, index) => (
                                <div key={index} className='grid grid-cols-10 mb-5 items-center'>
                                    <div className='col-span-full '>
                                        <p className='text-xl font-bold mt-5'>Homestay {booking.homestayCode} - {booking.roomTypeName}</p>
                                        <div className='my-5 border border-b-[1px] border-gray-300'></div>
                                    </div>
                                    <div className='col-span-4'>
                                        <p className='font-bold'>Họ và tên người đại diện <span className='text-red-600'>*</span></p>
                                    </div>
                                    <div className='col-span-6'>
                                        <input type="text"
                                            className='w-3/4 border border-gray-300 p-2 rounded-md'
                                            defaultValue={confirmData.bookingDetailList[index]?.customerCheckInName ? confirmData.bookingDetailList[index].customerCheckInName : ''}
                                            {...register(`bookingDetailList.${index}.customerCheckInName`)} />

                                        {errors?.bookingDetailList?.[index]?.customerCheckInName?.message && (
                                            <p className="text-sm text-red-400 absolute">
                                                {errors.bookingDetailList[index]?.customerCheckInName?.message}
                                            </p>
                                        )}
                                    </div>


                                    <input
                                        {...register(`bookingDetailList.${index}.homestayId`)}
                                        type="hidden"
                                        value={booking.homestayId}
                                    />
                                    <input
                                        {...register(`bookingDetailList.${index}.householdRoomTypeId`)}
                                        type="hidden"
                                        value={booking.householdRoomTypeId}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='p-4 rounded-xl shadow-md shadow-gray-300 mb-10'>
                            <p className='text-2xl font-bold mt-5'>Lưu ý của homestay</p>
                            <div className='my-5 border border-b-[1px] border-gray-300'></div>
                            <div className='flex'>
                                <label className='font-bold'>Giờ nhận phòng (Check-in) : </label>
                                <p>&ensp;{sessionData?.checkInTime}</p>
                            </div>
                            <div className='flex'>
                                <label className='font-bold'>Giờ trả phòng (Check-out) : </label>
                                <p>&ensp;{sessionData?.checkOutTime}</p>
                            </div>
                            <div className='flex'>
                                <label className='font-bold'>Chính sách thanh toán : </label>
                                <p>&ensp;Thanh toán 100% tiền phòng khi đặt trước</p>
                            </div>
                            <div>
                                <label className='font-bold'>Chính sách hủy phòng - hoàn tiền: </label>
                                <ul className=''>
                                    <li>&emsp;&bull; Hoàn 100% tiền đặt trước khi hủy phòng trước 7 ngày (kể từ ngày nhận phòng)</li>
                                    <li>&emsp;&bull; Không hỗ trợ hoàn tiền với trường hợp hủy phòng còn lại.</li>
                                </ul>
                            </div>
                        </div>
                        <button type='submit' className='p-2 px-5 font-bold bg-mint-green rounded-md ' onClick={scrollUp}>Đặt phòng</button>

                    </form >
                </>
            )
        } else {
            return (
                <>
                    <div className='col-span-6'>
                        <div className='p-4 rounded-xl shadow-md shadow-gray-300 mb-10'>
                            <p className='text-2xl font-bold mt-5'>Thông tin đặt phòng</p>
                            <div className='my-5 border border-b-[1px] border-gray-300'></div>
                            <div className='grid grid-cols-10 mb-5 items-center'>
                            </div>


                            <div className='grid grid-cols-10 items-center mb-5'>
                                <div className='col-span-4'>
                                    <p className='font-bold'>Họ và tên người đặt <span className='text-red-600'>*</span></p>
                                </div>
                                <div className='col-span-6 items-center'>
                                    {/* <p>{confirmData.customerName}</p> */}
                                    <input type="text"
                                        className='w-3/4 border border-gray-300 p-2 rounded-md'
                                        disabled
                                        defaultValue={confirmData.customerName} />
                                        <FontAwesomeIcon icon={faPen} className='ml-2 hover:text-gray-400' onClick={() => setIsConfirm(false)}/>

                                </div>
                            </div>

                            <div className='grid grid-cols-10 mb-5 items-center'>
                                <div className='col-span-4'>
                                    <p className='font-bold'>Số điện thoại liên hệ <span className='text-red-600'>*</span></p>
                                </div>
                                <div className='col-span-6 items-center'>
                                    <input type="text"
                                        className='w-3/4 border border-gray-300 p-2 rounded-md'
                                        disabled
                                        defaultValue={confirmData.customerPhone} />
                                        <FontAwesomeIcon icon={faPen} className='ml-2 hover:text-gray-400' onClick={() => setIsConfirm(false)}/>

                                </div>
                            </div>
                        </div>


                        <div className='p-4 rounded-xl shadow-md shadow-gray-300 mb-10'>
                            <p className='text-2xl font-bold mt-5'>Thông tin chi tiết</p>
                            {confirmData.bookingDetailList.map((booking, index) => (
                                <div className='grid grid-cols-10 mb-5 items-center' key={index}>
                                    <div className='col-span-full '>
                                        <p className='text-xl font-bold mt-5'>Homestay {booking.homestayId} - {newBookingList[index].roomTypeName}</p>
                                        <div className='my-5 border border-b-[1px] border-gray-300'></div>
                                    </div>
                                    <div className='col-span-4'>
                                        <p className='font-bold'>Họ và tên người đại diện <span className='text-red-600'>*</span></p>
                                    </div>
                                    <div className='col-span-6'>
                                        <input type="text"
                                            className='w-3/4 border border-gray-300 p-2 rounded-md'
                                            disabled
                                            defaultValue={booking.customerCheckInName} />
                                        <FontAwesomeIcon icon={faPen} className='ml-2 hover:text-gray-400' onClick={() => setIsConfirm(false)}/>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='p-4 rounded-xl shadow-md shadow-gray-300 mb-10'>
                            <p className='text-2xl font-bold mt-5'>Lưu ý của homestay</p>
                            <div className='my-5 border border-b-[1px] border-gray-300'></div>
                            <div className='flex'>
                                <label className='font-bold'>Giờ nhận phòng (Check-in) : </label>
                                <p>&ensp;{sessionData?.checkInTime}</p>
                            </div>
                            <div className='flex'>
                                <label className='font-bold'>Giờ trả phòng (Check-out) : </label>
                                <p>&ensp;{sessionData?.checkOutTime}</p>
                            </div>
                            <div className='flex'>
                                <label className='font-bold'>Chính sách thanh toán : </label>
                                <p>&ensp;Thanh toán 100% tiền phòng khi đặt trước</p>
                            </div>
                            <div>
                                <label className='font-bold'>Chính sách hủy phòng - hoàn tiền: </label>
                                <ul className=''>
                                    <li>&emsp;&bull; Hoàn 100% tiền đặt trước khi hủy phòng trước 7 ngày (kể từ ngày nhận phòng)</li>
                                    <li>&emsp;&bull; Không hỗ trợ hoàn tiền với trường hợp hủy phòng còn lại.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </>
            )
        }

    }
}

