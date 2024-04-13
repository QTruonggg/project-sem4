import { IHouseholdResponse } from '@/types/homestayBookingType';
import { faChevronRight, faCompass, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface ISearchHomestayItemProps {
    household: IHouseholdResponse;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: string;
}

export default function SearchHomestayItem({
    household,
    checkInDate,
    checkOutDate,
    numberOfGuests,
}: ISearchHomestayItemProps) {
    const router = useRouter();

    const convertPrice = (price: number | string) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
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
    return (
        <div className='my-5 grid grid-cols-9 rounded-lg shadow-lg'>
            <div className='col-span-3 flex items-center'>
                <Image
                    src={household?.imageUri || '/images/LuaTrai.jpg'}
                    alt='Ảnh homestay'
                    width={1000}
                    height={1000}
                    className='w-full aspect-square rounded-l-lg'
                />
            </div>
            <div className='col-span-6 p-6 grid grid-cols-6'>
                <div className='flex flex-col col-span-4'>
                    <div>
                        <div className='text-3xl font-bold pb-3'>{household?.householdName}</div>
                        {household?.address.map((address, index) => (
                            <div className="text-xs pb-2" key={index}>
                                <FontAwesomeIcon icon={faLocationDot} /> {address}
                            </div>
                        ))}
                    </div>
                    <div className='mt-auto flex-col items-center'>

                        <div className="text-sm font-semibold italic ">
                            <FontAwesomeIcon icon={faCompass} /> Đề xuất cho bạn
                        </div>
                        {household?.bookingDetailRecommendList?.map((room, index) => (
                            <div className='text-sm flex py-1 items-center border-l-2 border-mint-green' key={index}>
                                <div>
                                    <span className='text-red-400 text-lg font-bold ml-2'>{room.quantity} phòng</span>
                                </div>
                                <div className="ml-5">
                                    <p className="font-bold">
                                        {room.roomTypeName}
                                    </p>
                                    <p className="text-xs">
                                        {(room.doubleBed===0)?`${room.singleBed} giường đơn `:` ${room.doubleBed} giường đôi`}
                                    </p>
                                </div>
                            </div>
                        ))
                        }

                    </div>
                    <div className='text-sm mt-auto flex items-center'>
                        <div className='p-2 rounded-lg border-2 border-mint-green'>
                            {ratingConvert(household?.rating | 0)}
                        </div>
                        <div>
                            <span className='font-bold ml-2'>{ratingComment(household?.rating)}</span> {household?.numberOfReviews} đánh giá
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between col-span-2 text-right items-end'>
                    <div>
                        <div className='text-lg font-semibold'>Giá chỉ từ</div>
                        <span className="text-red-400 text-2xl font-bold">
                            {convertPrice(household?.bookingDetailRecommendList ? (household?.bookingDetailRecommendList.reduce((total, room) => total + (room.price * room.quantity), 0)*(household?.numberOfNight||1)):0)}VNĐ
                        </span>
                        <div className="text-sm">
                            {household.numberOfGuests} khách · {household.numberOfNight} đêm
                        </div>
                        <div className="text-sm">
                            Bao gồm thuế và chi phí
                        </div>
                    </div>
                    <div className='mt-auto flex items-center'>
                        <button 
                        onClick={() => router.push(`/homestay-booking/search?householdId=${household.householdId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuests=${numberOfGuests}`)}
                        className='bg-mint-green rounded-sm p-2'>
                            Xem và đặt phòng <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
