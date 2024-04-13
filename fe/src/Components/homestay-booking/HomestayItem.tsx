import { IHouseholdResponse } from '@/types/homestayBookingType';
import { faLocationDot, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import LoadingPage from '../common/LoadingPage';
import dayjs from 'dayjs';

export interface IHomestayItemProps {
    household: IHouseholdResponse;
}

export default function HomestayItem({
    household,
}: IHomestayItemProps) {
    const router = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false);
    const ratingConvert = (rating: number) => {
        if (Number.isInteger(rating)) {
            return rating.toFixed(1);
        }
        return rating;
    }
    const ratingComment = (rating: number) => {
        if (rating >= 4.5) {
          return 'Rất tốt';
        } else if (rating >= 4) {
          return 'Tốt';
        } else if (rating >= 3.5) {
          return 'Khá tốt';
        } else if (rating >= 3) {
          return 'Khá';
        } else if (rating >= 2) {
          return 'Trung bình';
        } else if (rating >= 1) {
          return 'Kém';
        } else if (rating > 0) {
          return 'Tệ';
        }
        return '';
      }
      const today = dayjs().startOf('day');
    return (
        <div className='my-2 grid grid-cols-9 rounded-lg shadow-lg'>
            {loading && (<LoadingPage/>)}
            <div className='col-span-3 cursor-pointer' onClick={()=>{
            setLoading(true);
            router.push(`/introduction/${household?.householdId}`);
        }}>
                <Image
                    src={household?.imageUri || '/images/LuaTrai.jpg'}
                    alt='Ảnh homestay'
                    width={1000}
                    height={1000}
                    className='w-full aspect-square rounded-l-lg'
                />
            </div>
            <div className='col-span-6 flex flex-col justify-between p-6'>
                <div>
                    <div onClick={()=>{
                        setLoading(true);
                        router.push(`/introduction/${household?.householdId}`);
                    }} className='text-2xl font-bold cursor-pointer pb-3'>{household?.householdName}</div>
                    {household?.address.map((address,index) => (
                        <div className="text-sm" key={index}>
                        <FontAwesomeIcon icon={faLocationDot} /> {address}
                    </div>
                    ))}
                    
                </div>
                <div className='flex items-center justify-between'>
                    <div className='mt-auto flex items-center'>
                        <div className='p-2 rounded-lg border-2 border-mint-green'>
                            {ratingConvert(household?.rating | 0)}
                        </div>
                        <div>
                            <span className='font-bold ml-2'>{ratingComment(household?.rating)}</span> {household?.numberOfReviews} đánh giá
                        </div>
                    </div>
                    <div>
                        <button
                            className="px-4 rounded-md font-semibold py-3 bg-mint-green"
                            onClick={() => {
                                router.push(`/homestay-booking/search?householdId=${household?.householdId}&checkInDate=${today.format('YYYY-MM-DD')}&checkOutDate=${today.add(1,'day').format('YYYY-MM-DD')}&numberOfGuests=1`)
                                setLoading(true);
                            }}>
                            <FontAwesomeIcon icon={faPlusCircle}/> Đặt phòng ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
