import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBuilding, faCircleInfo, faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { IBookingItem } from '@/types/bookingType';
import LoadingPage from '../common/LoadingPage';
export interface ICancelBookingItemProps {
    item: IBookingItem;
}

export default function CancelBookingItem({
    item
}: ICancelBookingItemProps) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const handleClick = () => {
        setLoading(true);
        router.push(`/booking/cancel/detail/${item.bookingCode}`);
    };
    const convertDate = (date: string) => {
        const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        const dateArr = date.split('T');
        const dateStr = dateArr[0].split('-');
        const year = dateStr[0];
        const month = dateStr[1];
        const day = dateStr[2];

        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        const dayOfWeek = daysOfWeek[dateObj.getDay()];

        return `${dayOfWeek}, ${day}/${month}/${year}`;
    };
    const convertPrice = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const convertTime = (time: string) => {
        const timeArr = time.split(':');
        const hour = timeArr[0];
        const minute = timeArr[1];
        return `${hour}:${minute}`;
    };
    const convertStatus = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Đang chờ hoàn tiền';
            case 'REFUNDED':
                return 'Đã hoàn tiền';
            case 'NOT_REFUNDED':
                return 'Không hỗ trợ hoàn tiền do hủy trước 7 ngày';
            default:
                return '';
        }
    };
    return (
        <div className="grid grid-cols-12 items-center my-2 ">
            {loading && <LoadingPage />}
            <div className='col-span-1'>
                <Image
                    width={150}
                    height={150}
                    src={item.householdImage || '/images/LuaTrai.jpg'}
                    alt='room'
                    className='rounded-md w-full aspect-square'
                />
            </div>
            <div className='col-span-10 grid grid-cols-10'>
                <div className='col-span-4 grid grid-cols-9 ml-4 items-center'>
                    <div className='col-span-4'>
                        <p className='font-normal text-blackish-green opacity-75'>
                            Nhận phòng
                        </p>
                        <p className='font-semibold text-xl text-blackish-green'>
                            {convertDate(item.checkInDate)}
                        </p>
                        <p className='font-normal text-blackish-green opacity-75'>
                            {convertTime(item.householdCheckInTime)} - 00:00
                        </p>
                    </div>
                    <div className='col-span-1 flex '>
                        <p className='font-semibold text-xl'>─</p>
                    </div>
                    <div className='col-span-4'>
                        <p className='font-normal text-blackish-green opacity-75'>
                            Trả phòng
                        </p>
                        <p className='font-semibold text-xl text-blackish-green'>
                            {convertDate(item.checkOutDate)}
                        </p>
                        <p className='font-normal text-blackish-green opacity-75'>
                            00:00 - {convertTime(item.householdCheckOutTime)}
                        </p>
                    </div>
                </div>
                <div className='col-span-6 ml-1 grid grid-cols-3'>
                    <div className='col-span-2 grid grid-cols-2'>
                        <div className='col-span-1 grid grid-cols-6'>
                            <div className='col-span-1'>
                                <FontAwesomeIcon icon={faBuilding} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                            </div>
                            <div className='ml-1 col-span-5'>
                                <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                    Homestay
                                </p>
                                <p className='text-blackish-green font-medium'>
                                    {item.householdName}
                                </p>
                            </div>
                        </div>
                        <div className='col-span-1 grid grid-cols-6'>
                            <div className='col-span-1'>
                                <FontAwesomeIcon icon={faBuilding} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                            </div>
                            <div className='ml-1 col-span-5'>
                                <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                    Tổng số lượng lưu trú
                                </p>
                                <p className='text-blackish-green font-medium'>
                                    {item.totalGuest} khách
                                </p>
                            </div>
                        </div>
                        <div className='col-span-1 grid grid-cols-6 mt-3'>
                            <div className='col-span-1'>
                                <FontAwesomeIcon icon={faHouse} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                            </div>
                            <div className='ml-1 col-span-5'>
                                <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                    Số lượng phòng
                                </p>
                                <p className='text-blackish-green font-medium'>
                                    {item.totalRoom} phòng
                                </p>
                            </div>
                        </div>
                        <div className='col-span-1 grid grid-cols-6 mt-3'>
                            <div className='col-span-1'>
                                <FontAwesomeIcon icon={faMoneyBill} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                            </div>
                            <div className='ml-1 col-span-5'>
                                <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                    Chi phí
                                </p>
                                <p className='text-blackish-green font-medium'>
                                    {convertPrice(item.totalPrice)} VNĐ
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-cols-6 items-center'>
                        <div className='col-span-1 flex'>
                            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-4 ml-2'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Trạng thái
                            </p>
                            <p className='text-blackish-green font-medium'>
                                {convertStatus(item.cancellationHistory.refundStatus)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-1 col-start-12 flex items-center justify-center'>
                <button
                    onClick={handleClick}
                    className='h-12 w-12 rounded-lg border-2 hover:bg-custom-color'>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    );
}
