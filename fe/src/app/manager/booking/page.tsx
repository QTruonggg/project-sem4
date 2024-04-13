'use client';
import * as React from 'react';
import moment from 'moment';
import { Breadcrumb, InputNumber } from 'antd';
import { Input } from 'antd';
import { SubmitHandler, useForm } from "react-hook-form";
import { BookingDetailRandomDormSlot, BookingRandomDormSlotManagerRequestDto, IBookingInformation, IRandomDormSlotResponse, randomBookingDetails } from '@/types/homestayBookingType';
import homestayBookingApi from '@/api/homestayBookingApi';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import bookingManagerApi from '@/api/bookingManagerApi';
import * as sessionStorage from '@/utils/sessionStorage';
import LoadingPage from '@/Components/common/LoadingPage';


export interface IBookingProps {
    homestayId: number,
    homestayName: string,
    householdRoomTypeId: number,
    householdRoomTypeName: string,
    dormSlotId: number,
    dormSlotName: string,
    roomId: number,
    roomName: string,
    singleBed: number,
    doubleBed: number,
    price: number,
}

export default function Booking(props: IBookingProps) {
    // const [selectedRooms, setSelectedRooms] = React.useState<IBookingProps[]>([]);
    const checkinDate = sessionStorage.getSession('checkinDate');
    const checkoutDate = sessionStorage.getSession('checkoutDate');
    const sessionData = sessionStorage.getSession('selectedData');
    
    const [loading, setLoading] = React.useState(false);

    console.log('checkinDate' + checkinDate);
    console.log('checkoutDate' + checkoutDate);

    const bookingDetail = sessionData ? sessionData : [];

    const data: BookingRandomDormSlotManagerRequestDto = {
        checkInDate: checkinDate || '',
        checkOutDate: checkoutDate || '',
        bookingDetails: bookingDetail.map((item: BookingDetailRandomDormSlot) => {
            return {
                homestayId: item.homestayId,
                homestayName: item.homestayName,
                price: item.price,
                subTotal: 0,
                totalSlotDefault: item.totalSlotDefault,
                totalSlotSelected: item.totalSlotSelected,
                householdRoomTypeId: item.householdRoomTypeId,
                householdRoomTypeName: item.householdRoomTypeName,
                roomId: item.roomId,
                roomName: item.roomName,
                isDorm: item.isDorm,
            };
        }),
    };

    console.log(data);

    const [randomBooking, setRandomBooking] = React.useState<IRandomDormSlotResponse>();
    React.useEffect(() => {
        setLoading(true);
        bookingManagerApi.bookingRandomDormSlot(data).then((value) => {
            setRandomBooking(value);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const countDate = (dateCheckin: string | undefined, dateCheckout: string | undefined) => {
        const startDate = moment(typeof dateCheckin === 'string' ? dateCheckin : '');
        const endDate = moment(typeof dateCheckout === 'string' ? dateCheckout : '');
        const duration = moment.duration(endDate.diff(startDate));
        const numberOfDays = duration.asDays();

        return numberOfDays;
    };
    const parsedSessionData = sessionData ? sessionData : [];
    const count = parsedSessionData.length;

    const [guestNumber, setGuestNumber] = React.useState<number>();
    const handleGuestNumber = (value: 0 | null) => {
        const parsedValue = parseInt(value as unknown as string, 10);
        setGuestNumber(parsedValue);
    };

    const totalPrice = (price: number | undefined, countDate: number | undefined) => {
        return price && countDate ? price * countDate : 0;
    };
    const [bookingData, setBookingData] = React.useState<IBookingInformation>();

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IRandomDormSlotResponse>({
        defaultValues: randomBooking
    });

    const totalNight = countDate(checkinDate ?? undefined, checkoutDate ?? undefined);
    const totalPriceCaculate = parsedSessionData.reduce((acc: number, item: IBookingProps) => {
        const pricePerNight = item.price * totalNight;
        return acc + pricePerNight;
    }, 0);

    const householdId = randomBooking?.householdId;

    const router = useRouter();
    const onSubmit: SubmitHandler<IRandomDormSlotResponse> = async (data) => {
        console.log(data);
        try {
            const res: IRandomDormSlotResponse = {
                householdId: randomBooking?.householdId,
                checkInDate: checkinDate ?? '',
                checkOutDate: checkoutDate ?? '',
                totalNight: randomBooking?.totalNight,
                totalOfGuest: guestNumber || 0,
                checkInCustomerName: data.checkInCustomerName,
                checkInCustomerPhone: data.checkInCustomerPhone,
                checkInCustomerEmail: data.checkInCustomerEmail,
                totalRoom: randomBooking?.totalRoom,
                bookingDetails: randomBooking?.bookingDetails,
                totalPrice: randomBooking?.totalPrice,
            }
            setLoading(true);
            await homestayBookingApi.addBooking(res);
            router.push('booking-management');
            message.success('Đặt phòng thành công');
        } catch (error) {

            message.error('Phòng này đã được đặt trước đó');
            router.push('booking-overview');
        } finally {
            setLoading(false);
        }
    }


    const breadcrumbItems = [
        {
            href: '/manager/booking-overview',
            title: (
                <>
                    <button className='hover:text-black underline'>Tìm kiếm phòng</button>
                </>
            ),
        },
        {
            title: 'Thông tin đặt phòng',
        },
    ];
    return (
        <>
            <Breadcrumb className='p-5'>
                {breadcrumbItems.map((item, index) => (
                    <Breadcrumb.Item
                        key={index}
                        onClick={() => {
                            if (item.href) {
                                router.push(item.href);
                            }
                        }}
                    >
                        {item.title}
                    </Breadcrumb.Item>
                ))}

            </Breadcrumb>
            {loading && <LoadingPage />}
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='text-center text-4xl font-bold pt-10 mb-10'>
                    <h1>Thông tin đặt phòng</h1>
                </div>

                <div className='grid grid-cols-2 gap-4 p-5 justify-items-center items-center'>
                    <div className='grid grid-cols-2 gap-4 gap-x-40'>
                        <div className='font-semibold text-lg'>
                            Ngày đến
                        </div>
                        <div>
                            {checkinDate}
                        </div>
                        <div className='font-semibold text-lg'>
                            Ngày đi
                        </div>
                        <div>
                            {checkoutDate}
                        </div>
                        <div className='font-semibold text-lg'>
                            Số đêm lưu trú
                        </div>
                        <div>
                            {countDate(checkinDate ?? undefined, checkoutDate ?? undefined)}
                        </div>
                        <div className='font-semibold text-lg'>
                            Số khách
                        </div>
                        <div>
                            <InputNumber
                                min={0}
                                defaultValue={0}
                                size='large'
                                onChange={handleGuestNumber}
                            />
                        </div>

                    </div>
                    <div className='grid grid-cols-2 gap-4 gap-x-40'>
                        <div className='font-semibold text-lg'>
                            Thông tin khách hàng
                        </div>
                        <div>

                        </div>
                        <div className='font-semibold text-lg'>
                            Họ và tên
                        </div>
                        <div>
                            <Input
                                placeholder="Họ và tên"
                                {...register('checkInCustomerName')}
                                defaultValue={randomBooking?.checkInCustomerName}
                                onChange={(e) => setValue('checkInCustomerName', e.target.value)}
                            />

                        </div>
                        <div className='font-semibold text-lg'>
                            Số điện thoại
                        </div>
                        <div>
                            <Input
                                placeholder="Số điện thoại"
                                {...register('checkInCustomerPhone')}
                                defaultValue={randomBooking?.checkInCustomerPhone}
                                onChange={(e) => setValue('checkInCustomerPhone', e.target.value)}
                            />
                        </div>
                        <div className='font-semibold text-lg'>
                            Email
                        </div>
                        <div>
                            <Input
                                placeholder="Email"
                                {...register('checkInCustomerEmail')}
                                defaultValue={randomBooking?.checkInCustomerEmail}
                                onChange={(e) => setValue('checkInCustomerEmail', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='font-semibold text-center text-lg mt-10'>
                    Tổng số phòng đặt: {count} Phòng
                </div>

                <table className="w-[1000px] mx-auto mt-20">
                    <thead className="text-gray-700 uppercase bg-white text-base">
                        <tr>
                            <th scope="col" className="px-5 py-4">
                                Homestay
                            </th>
                            <th scope="col" className="px-5 py-4">
                                Loại phòng
                            </th>
                            <th scope="col" className="px-5 py-4">
                                Phòng
                            </th>
                            <th scope="col" className="px-5 py-4">
                                Tên chỗ
                            </th>
                            <th scope="col" className="px-5 py-4">
                                Giá phòng cho {countDate(checkinDate ?? undefined, checkoutDate ?? undefined)} đêm
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {randomBooking?.bookingDetails != undefined ? randomBooking?.bookingDetails.map((item: randomBookingDetails, index: number) => (
                            <tr key={index} className="text-base">
                                <th className="px-5 py-4 font-normal text-black whitespace-nowrap dark:text-white">
                                    {item.homestayName}
                                </th>
                                <th className="px-5 py-4 font-normal text-black whitespace-nowrap dark:text-white">
                                    {item.householdRoomTypeName}
                                </th>
                                <th className="px-5 py-4 font-normal text-black whitespace-nowrap dark:text-white">
                                    {item.roomName}
                                </th>
                                <th className="px-5 py-4 font-normal text-black whitespace-nowrap dark:text-white">
                                    {item.dormSlotName ? item.dormSlotName : 'Không có'}
                                </th>
                                <th className="px-5 py-4 font-normal text-black whitespace-nowrap dark:text-white">
                                    {totalPrice(item.price, countDate(checkinDate ?? undefined, checkoutDate ?? undefined)).toLocaleString('vi-VN')} VNĐ
                                </th>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
                <div className='grid grid-cols-2 gap-4 mt-10 pb-10'>
                    <div className='col-span-2 text-center text-lg'>
                        <h2 className='font-semibold'>Tổng tiền: {randomBooking?.totalPrice?.toLocaleString()} VNĐ</h2>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md mt-4'>
                            Đặt phòng
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}