'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { IBookingItem, IBookingCancelForm } from '@/types/bookingType';
import CancelModal from './CancelModal';
import bookingApi from '@/api/bookingApi';
import LoadingPage from '../common/LoadingPage';

export interface IBookingItemProps {
    item: IBookingItem;
}

export default function BookingItem({
    item

}: IBookingItemProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [cancelForm, setCancelForm] = useState<IBookingCancelForm>();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const handleClick = () => {
        setLoading(true);
        router.push(`/booking/detail/${item.bookingCode}`);
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
        if (!time) return ('');
        const timeArr = time.split(':');
        const hour = timeArr[0];
        const minute = timeArr[1];
        return `${hour}:${minute}`;
    };

    const handleCancel = async () => {
        try {
            setLoading(true);
            const res = await bookingApi.getCancellationForm(item.bookingCode);
            console.log(res);
            setCancelForm(res);
            setIsCancelModalOpen(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    const handleClose = () => {
        setIsCancelModalOpen(false);
    };

    return (
        <div className="grid items-center grid-cols-12 my-2">
            {loading && <LoadingPage />}
            <CancelModal isVisible={isCancelModalOpen} onClose={handleClose} cancelForm={cancelForm} />
            <div className='col-span-1'>
                <Image
                    width={150}
                    height={150}
                    src={item.householdImage ||'/images/LuaTrai.jpg'}
                    alt='room'
                    className='rounded-md w-full aspect-square'
                />
            </div>
            <div className='col-span-9 grid grid-cols-9 ml-4 items-center'>
                <div className='col-span-4 grid grid-cols-9'>
                    <div className='col-span-4'>
                        <p className='font-normal text-blackish-green opacity-75'>
                            Nhận phòng
                        </p>
                        <p className='font-semibold my-1 text-xl text-blackish-green'>
                            {convertDate(item.checkInDate)}
                        </p>
                        <p className='font-normal text-blackish-green opacity-75'>
                            {convertTime(item.householdCheckInTime)} - 00:00
                        </p>
                    </div>
                    <div className='col-span-1 items-center flex'>
                        <p className='font-semibold text-xl'>─</p>
                    </div>
                    <div className='col-span-4'>
                        <p className='font-normal text-blackish-green opacity-75'>
                            Trả phòng
                        </p>
                        <p className='font-semibold my-1 text-xl text-blackish-green'>
                            {convertDate(item.checkOutDate)}
                        </p>
                        <p className='font-normal text-blackish-green opacity-75'>
                            00:00 - {convertTime(item.householdCheckOutTime)}
                        </p>
                    </div>
                </div>
                <div className='col-span-5 ml-1 grid grid-cols-2'>
                    <div className='col-span-1 grid grid-cols-6'>
                        <div className='col-span-1'>
                            <FontAwesomeIcon icon={faBuilding} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-5 ml-1'>
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
                        <div className='col-span-5 ml-1'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Tổng số lượng lưu trú
                            </p>
                            <p className='text-blackish-green font-medium'>
                                {item.totalGuest} khách
                            </p>
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-cols-6'>
                        <div className='col-span-1'>
                            <FontAwesomeIcon icon={faHouse} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-5 ml-1'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Số lượng phòng
                            </p>
                            <p className='text-blackish-green font-medium'>
                                {item.totalRoom} phòng
                            </p>
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-cols-6'>
                        <div className='col-span-1'>
                            <FontAwesomeIcon icon={faMoneyBill} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-5 ml-1'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Chi phí
                            </p>
                            <p className='text-blackish-green font-medium'>
                                {convertPrice(item.totalPrice)} VNĐ
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='col-span-2 flex flex-col items-center text-right'>

                <button
                    onClick={handleClick}
                    className={`rounded-lg bg-mint-green md:h-12 hover:bg-opacity-50 self-end border-2 w-3/5 h-5`}>
                    <span className='text-xs md:text-base'>Chi tiết</span>
                </button>
                <button
                    onClick={handleCancel}
                    className={`rounded-lg bg-[#FF9371] md:h-12 hover:bg-opacity-50 self-end border-2 w-3/5 h-5`}>
                    <span className='text-xs md:text-base'>Hủy</span>
                </button>
                <p className='text-xs font-extralight italic'>Phòng hủy trước 7 ngày nhận phòng sẽ không được hoàn tiền</p>
            </div>

        </div>
    );
}
