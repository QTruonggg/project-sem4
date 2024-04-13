import * as React from 'react';
import RoomDetail from './RoomDetail';
import { IBookingDetail } from '@/types/bookingType';

export interface IAddressInformationProps {
    bookingData?: IBookingDetail[];
    checkInDate?: string | undefined;
    substractDays?: number | undefined;
    totalPrices?: number | undefined;
}

export default function AddressInformation({
    bookingData,
    checkInDate,
    substractDays,
    totalPrices,
}: IAddressInformationProps) {
    const convertDate = (date: string | undefined, subtractDays: number | undefined, isDeadline: boolean) => {
        if (date === undefined || subtractDays === undefined) {
            return '';
        }
        const inputDate = new Date(date);
        if (isDeadline) inputDate.setDate(inputDate.getDate() - subtractDays + 1);
        else inputDate.setDate(inputDate.getDate() - subtractDays);

        const year = inputDate.getFullYear();
        const month = inputDate.toLocaleString('vi-VN', { month: 'long' });
        const day = inputDate.getDate();

        return `${day} ${month}, ${year}`;
    };
    const convertPrice = (num: number | undefined) => {
        if (typeof num === 'undefined') {
            return '';
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return (
        <div className='my-10'>
            <div className='grid grid-cols-4  items-center'>
                <h2 className="col-span-3 text-left text-3xl font-bold mb-4">Chi tiết chỗ nghỉ</h2>
            </div>
            <div className='p-8 rounded-xl shadow-md shadow-gray-300 '>
                <div className='grid grid-cols-10'>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                        Homestay
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                        {bookingData?.[0]?.homestayCode}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300'>
                        Địa chỉ
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300'>
                        {bookingData?.[0]?.homestayAddress}
                    </div>
                    {totalPrices && (
                        <>
                            <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                                Phí hủy phòng
                            </div>
                            <div className='col-span-7 p-2 grid grid-cols-12 border border-gray-300 bg-gray-100'>
                                <p>Đến</p>
                                <p className='col-span-11 -ml-3'> 23:59 ngày {convertDate(checkInDate, substractDays, false)}: 
                                <span className='font-bold ml-2'>0 VNĐ</span>
                                </p>


                                <p>Từ</p>
                                <p className='col-span-11 -ml-3'> 00:00 ngày {convertDate(checkInDate, substractDays, true)}: 
                                 <span className='font-bold ml-2'>{convertPrice(totalPrices)} VNĐ</span>
                                </p>
                            </div>
                        </>
                    )}
                    {
                        bookingData?.map((item, index) => (
                            <RoomDetail key={index} item={item} />
                        ))
                    }

                </div>
            </div>
        </div>
    );
}
