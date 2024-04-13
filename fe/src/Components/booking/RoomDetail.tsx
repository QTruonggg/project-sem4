import { IBookingDetail } from '@/types/bookingType';
import * as React from 'react';

export interface IRoomDetailProps {
    item: IBookingDetail;
}

export default function RoomDetail({
    item,
}: IRoomDetailProps) {
    const convertPrice = (num: number | undefined) => {
        if (num === undefined) {
            return 0;
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };


    return (
        <div className='col-span-10'>
            <div className='border-t-mint-green border-[1px] mx-5 my-8'></div>
            <h2 className="col-span-3 text-left text-3xl font-bold mb-4">{item.roomTypeName}</h2>
            <div className='grid grid-cols-10'>
                <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                    Tên khách
                </div>
                <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                    {item?.checkInCustomerName}
                </div>
                <div className='col-span-3 p-2 font-bold border border-gray-300'>
                    Sức chứa tối đa
                </div>
                <div className='col-span-7 p-2 border border-gray-300'>
                    {item?.capacityOfRoomType} khách
                </div>
                <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                    Tiện ích bao gồm
                </div>
                <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                    {item?.facilities.length === 0 ? (
                        'Không có tiện ích nào'
                    ) : (
                        <span>
                            {item?.facilities.map((facility, index) => {
                                if (index === item.facilities.length - 1) {
                                    return facility;
                                }
                                return facility + ', ';
                            })}
                        </span>
                    )}

                </div>
                <div className='col-span-3 p-2 font-bold border border-gray-300'>
                    Trẻ em và giường phụ
                </div>
                <div className='col-span-7 p-2 border border-gray-300'>
                    {item?.isChildrenAndBed ? 'Có' : 'Không'} cung cấp nôi/ cũi và giường phụ
                </div>
                <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                    Giá phòng
                </div>
                <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                    {convertPrice(item?.price)} VNĐ/đêm
                </div>

            </div>
        </div>
    );
}
