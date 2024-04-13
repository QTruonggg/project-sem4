'use client';
import { Tag } from 'antd';
import roomtypeApi from '@/api/roomtypeApi';
import { IhouseholdRoomTypeResponseDtos } from '@/types/dashboardType';
import React, { useState } from 'react';
import Link from 'next/link';
import LoadingPage from '@/Components/common/LoadingPage';


interface IRoomTypePageProps { }

const RoomTypePage: React.FC<IRoomTypePageProps> = () => {
    const [roomTypeData, setRoomTypeData] = useState<IhouseholdRoomTypeResponseDtos[]>([]);
    const [loading, setLoading] = React.useState(false);
    
    console.log(roomTypeData);
    React.useEffect(() => {
        setLoading(true);
        roomtypeApi.getAllRoomType().then((res) => {
            setRoomTypeData(res.householdRoomTypeListForManager);
            console.log(res);
        }).catch((err) => {
            console.log(err);
          }).finally(() => {
            setLoading(false);
          })
    }, []);


   

    return (
        <>
          {loading && <LoadingPage />}
            <div className='mx-10 py-10'>
                <Link href="/manager/room-type/add-room-type" className='bg-blue-500 text-white py-3 px-4 rounded-md shadow-md'>
                    +
                    Thêm loại phòng
                </Link>
            </div>
            <div className="relative overflow-x-auto shadow-md shadow-gray-300 sm:rounded-xl mx-10">
                <table className="w-full text-sm text-left">
                    <thead className="text-sm text-gray-700 uppercase bg-white">
                        <tr>
                            <th scope="col" className="py-4 text-center">
                                STT
                            </th>
                            <th scope="col" className="py-4 text-center">
                                Loại phòng
                            </th>
                            <th scope="col" className="py-4 text-center">
                                Giường đơn
                            </th>
                            <th scope="col" className="py-4 text-center">
                                Giường đôi
                            </th>
                            <th scope="col" className="py-4 text-center">
                                Sức chứa tối đa
                            </th>
                            <th scope="col" className="py-4 text-center">
                                Giá phòng
                            </th>
                            <th scope="col" className="py-4 text-center">
                                Chỉnh sửa
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomTypeData.map((list, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-5 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="py-4 text-center">
                                    {list.roomTypeName}
                                </td>
                                <td className="py-4 text-center">
                                    {list.singleBed}
                                </td>

                                <td className="py-4 text-center">
                                    {list.doubleBed}
                                </td>
                                <td className="py-4 text-center">
                                    {list.capacity}
                                </td>
                                <td className="py-4 text-center">
                                    <Tag color='green'>{list.price.toLocaleString('vi-VI')} VNĐ</Tag>
                                </td>
                                <td className="py-4 text-center">
                                    <button className='text-blue-500'>
                                        <Link href={'/manager/room-type/' + list.householdRoomTypeId}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default RoomTypePage;