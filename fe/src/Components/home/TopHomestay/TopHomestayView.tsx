import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { householdOutstanding } from '@/types/homeType';
import { Rate } from 'antd';
export interface ITopHomestayViewProps {
    householdOutstanding: householdOutstanding[]
}

export default function TopHomestayView({
    householdOutstanding
}: ITopHomestayViewProps) {
    const convertAverageRate = (rate: number) => {
        return Math.round(rate * 2) / 2;
    }
    return (
        <>
            <div>
                <ul className='flex justify-between mb-5 m-16 items-center'>
                    <li>
                        <h1 className='text-3xl font-bold mb-3'>Các Homestay nổi bật</h1>
                        <p className='mb-10 italic text-gray-400'>Các địa điểm lưu trú phổ biến này có nhiều điều chờ đón bạn</p>
                    </li>
                    <li>
                        <Link href='/homestays-booking' className='border font-semibold rounded-sm border-mint-green px-4 py-2'>Xem tất cả các homestays</Link>
                    </li>
                </ul>
            </div>
            <div className='grid grid-cols-5 gap-8'>
                {householdOutstanding.map((household, index) => (
                    <div className='col-span-1 flex flex-col rounded-xl shadow-lg overflow-hidden shadow-gray-500' key={index}>
                        <Link href={`/introduction/${household.id}`}>
                            <Image width={1000} height={1000} src={household.householdCoverImage} alt="" className='w-full aspect-[1.25]' />
                            <div className='p-4 text-center'>
                                <h1 className='text-lg font-bold mb-2'>{household.homestay + ' - ' + household.householdName}</h1>
                                <Rate value={convertAverageRate(household.rateAverage)} disabled allowHalf className='' />
                                <p className='text-gray-400'>{household.rateAverage}</p>
                                <p className='text-gray-400'>{household.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
