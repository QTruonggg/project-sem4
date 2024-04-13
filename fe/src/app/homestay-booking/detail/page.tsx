'use client';
import * as React from 'react';
import { faAngleLeft, faAngleRight, faBuilding, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISelectedHousehold } from '@/types/homestayBookingType';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BookingInformation from '@/Components/homestay-booking/BookingInformation';
import homestayBookingApi from '@/api/homestayBookingApi';
import { setSession, getSession } from '@/utils/sessionStorage';
import LoadingPage from '@/Components/common/LoadingPage';
import PopConfirm from '@/Components/homestay-booking/PopConfirm';
import dayjs from 'dayjs';

export interface IDetailHomestayBookingProps {
}
export default function DetailHomestayBooking(props: IDetailHomestayBookingProps) {
    const today = dayjs().startOf('day');
    const router = useRouter();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isConfirm, setIsConfirm] = React.useState<boolean>(false);
    // const sessionData: ISelectedHousehold = getSession('selectedHousehold') || {};
    const [sessionData, setSessionData] = React.useState<ISelectedHousehold>(getSession('selectedHousehold'));
    const [confirmData, setConfirmData] = React.useState<ISelectedHousehold>(sessionData);
    const [isCreatePayment, setIsCreatePayment] = React.useState<boolean>(false);
    setSession('isBooking', 'true');
    const convertPrice = (price: number | string) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    // React.useEffect(() => {
    //     setSessionData(getSession('selectedHousehold'));
    // }, []);

    const convertDate = (date: string) => {
        if (date === '') return ('');
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        return `Ngày ${day} Tháng ${month} Năm ${year}`;
    };

    const createPayment = async () => {
        try {
            const response = await homestayBookingApi.payBooking(confirmData);
            router.push(response.paymentUrl);
        } catch (error) {
            console.log(error);
            alert('Phòng này đã có người đặt, vui lòng thử lại sau!');
            router.push(`/homestay-booking/search?householdId=${sessionData?.householdId ? sessionData?.householdId:0}&checkInDate=${sessionData?.checkInDate?sessionData?.checkInDate:today.format('YYYY-MM-DD')}&checkOutDate=${sessionData?.checkOutDate?sessionData?.checkOutDate:today.add(1,'day').format('YYYY-MM-DD')}&numberOfGuests=${sessionData?.numberOfGuests?sessionData?.numberOfGuests:1}`);
        }
    };
    const totalRoom = () => {
        let total = 0
        if (sessionData?.bookingDetailList?.length === 0) return total;
        sessionData?.bookingDetailList?.map((room) => {
            total += (room.quantity || 0);
        })
        return total
    }
    return (
        <>
            <div className='flex items-center h-72 overflow-hidden rounded-b-xl text-white 
            bg-cover bg-[url("/images/LangMongPaViHome.jpg")]'>
                <h2 className='mt-20 mx-auto text-4xl font-bold'>ĐẶT PHÒNG TẠI {sessionData?.householdName ? sessionData?.householdName?.toUpperCase() : ''}</h2>
            </div>
            <div className='w-4/5 m-auto my-12'>
                <div className='mb-5 flex'>
                    <Link href={`/homestay-booking/search?householdId=${sessionData?.householdId ? sessionData?.householdId:0}&checkInDate=${sessionData?.checkInDate?sessionData?.checkInDate:today.format('YYYY-MM-DD')}&checkOutDate=${sessionData?.checkOutDate?sessionData?.checkOutDate:today.add(1,'day').format('YYYY-MM-DD')}&numberOfGuests=${sessionData?.numberOfGuests?sessionData?.numberOfGuests:1}`}
                        className='text-red-400 hover:text-red-500 cursor-pointer'>Chọn phòng</Link>
                    <span className='mx-2'><FontAwesomeIcon icon={faAngleRight} /></span>
                    <span className='mx-2'>Chi tiết đơn đặt phòng</span>
                </div>

                <div className='grid grid-cols-10 gap-5'>
                    <div className='col-span-6 grid grid-cols-5 items-center p-3 shadow-xl'>
                        <div className='p-4 rounded-xl border-2 border-gray-100 col-span-full grid grid-cols-5 mb-10'>
                            <div className='col-span-1'>
                                <Image
                                    src={sessionData?.imageUri ? sessionData?.imageUri : '/images/LuaTrai.jpg'}
                                    alt='Ảnh homestay'
                                    width={1000}
                                    height={1000}
                                    className='w-full aspect-square rounded-lg'
                                />
                            </div>
                            <div className='col-span-4 ml-3'>
                                <p className='text-2xl font-bold'>{sessionData?.householdName ? sessionData?.householdName : ''}</p>
                                {sessionData?.address?.map((address, index) => (
                                    <div className="text-sm" key={index}>
                                        <FontAwesomeIcon icon={faLocationDot} /> {address}
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className='col-span-full grid grid-cols-5 items-center p-4 py-5'>
                            <div className='col-span-2'>
                                <p className='text-lg font-bold'>{convertDate(sessionData?.checkInDate ? sessionData?.checkInDate : '')}</p>
                                <p className='text-sm'>Nhận phòng</p>
                            </div>
                            <div className='text-center font-bold justify-items-center'>
                                <FontAwesomeIcon icon={faAngleLeft} className='text-4xl' />
                                <FontAwesomeIcon icon={faBuilding} className='text-6xl' />
                                <FontAwesomeIcon icon={faAngleRight} className='text-4xl' />
                            </div>
                            <div className='text-right col-span-2'>
                                <p className='text-lg font-bold'>{convertDate(sessionData?.checkOutDate ? sessionData?.checkOutDate : '')}</p>
                                <p className='text-sm'>Trả phòng</p>
                            </div>
                        </div>

                        <div className='my-3 border col-span-full border-b-2 border-gray-300'></div>

                        <div className='col-span-full grid grid-cols-5 items-center p-4 py-5'>
                            <div className='col-span-3'>
                                <p> Tổng số đêm lưu trú <label className='font-bold'>{sessionData?.totalNight ? sessionData?.totalNight : ''} đêm</label></p>
                                <p> Tổng số khách lưu trú <label className='font-bold'>{sessionData?.numberOfGuests ? sessionData?.numberOfGuests : ''} khách</label></p>
                            </div>
                            <div className='text-right col-span-2'>
                                <p className='text-lg font-bold'>Tổng số phòng đặt: {totalRoom()} phòng</p>
                                {sessionData?.bookingDetailList?.map(room => { if (room.quantity && room.quantity > 0) return (<p className='text-sm'>{room.quantity} x {room.roomTypeName} | {room.homestayCode}</p>) }
                                )}

                            </div>
                        </div>

                    </div>

                    <div className='col-span-4'>
                        <div className='mb-10 p-4 shadow-xl h-fit'>

                            <p className='text-2xl font-bold'>Chi tiết giá</p>
                            <div className='my-3 border border-b-2 border-gray-300'>
                            </div>
                            {sessionData?.bookingDetailList?.map((bookingDetail) => {
                                if (bookingDetail?.quantity && bookingDetail?.quantity > 0) return (
                                    <div className='grid grid-cols-3' key={bookingDetail.homestayId.toString().concat(bookingDetail.householdRoomTypeId.toString())}>
                                        <p>{bookingDetail.roomTypeName}</p>
                                        <p className='text-center font-bold'>x{bookingDetail.quantity}</p>
                                        <p className='text-right'>{convertPrice((bookingDetail.price || 0) * (bookingDetail.quantity))} VNĐ</p>
                                    </div>
                                )
                            })
                            }

                            <div className='my-3 border border-b-2 border-gray-300'></div>
                            <div className='grid grid-cols-2 text-lg font-bold'>
                                <p>Tổng cộng ({sessionData?.totalNight ? sessionData?.totalNight : ''} đêm)</p>
                                <p className="text-right">{convertPrice(sessionData?.totalPrice || 0)} VNĐ</p>
                            </div>
                        </div>

                        {isConfirm && (
                            <>
                                <div className='col-span-4 p-4 pt-7 shadow-xl h-fit text-center'>
                                    <div className='text-xl font-semibold'>
                                        <p>Vui lòng thanh toán để hoàn tất đặt phòng.</p>
                                        <p>Hệ thống hỗ trợ thanh toán qua:</p>
                                    </div>

                                    <div className='my-3 border border-b-[1px] border-gray-300'></div>

                                    <div className='grid grid-cols-4 p-3 border-2 rounded-lg border-gray-200'>
                                        <Image
                                            alt='vnpay'
                                            src="data:image/png;base64,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"
                                            height={1000}
                                            width={1000}
                                            className='w-full aspect-square rounded-lg'>
                                        </Image>
                                        <div className='col-span-3 p-3 text-left'>
                                            <p className='text-3xl font-bold'>Thanh toán VNPAY</p>
                                            <p className='mt-2 text-sm'>VNPAY hỗ trợ thanh toán bằng mã QR,
                                                thẻ ngân hàng hoặc qua ví VNPAY</p>
                                        </div>

                                    </div>

                                    <p className='text-xs text-left mt-2 italic'><span className='font-bold'>Lưu ý:</span> Sau khi bấm <span className='font-bold'>Thanh toán</span> bạn sẽ có <span className='font-bold'>15</span> phút để hoàn tất thanh toán, nếu thanh toán thất bại, bạn sẽ bị hủy giữ chỗ và phải tiến hành đặt lại phòng.</p>
                                </div>
                                <div className='text-center mt-5'>
                                    <button onClick={()=>setIsCreatePayment(true)} className='p-2 w-full text-lg font-bold bg-mint-green rounded-md '>Thanh toán</button>
                                    {isCreatePayment && <PopConfirm 
                                    title={'Xác nhận thanh toán'} 
                                    message={'Bạn có muốn xác nhận thanh toán này?'} 
                                    onConfirm={createPayment}
                                    onCancel={()=>setIsCreatePayment(false)} />}
                                </div>
                            </>
                        )}
                    </div>

                    <BookingInformation isConfirm={isConfirm} setIsConfirm={setIsConfirm} confirmData={confirmData} setConfirmData={setConfirmData} />
                </div>
            </div>
        </>
    );
}
