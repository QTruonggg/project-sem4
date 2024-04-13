'use client';
import AddressInformation from '@/Components/booking/AddressInformation';
import LoadingPage from '@/Components/common/LoadingPage';
import bookingApi from '@/api/bookingApi';
import { IBookingResponse, IBookingDetail } from '@/types/bookingType';
import { faBuilding, faCaretRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
export interface IDetailCancelBookingProps {
    params: { slug: string };
}
export default function CancelBookingDetail({ params }: IDetailCancelBookingProps) {
    const router = useRouter();
    const today = dayjs().startOf('day');
    const [loading, setLoading] = React.useState(false);
    const [bookingData, setbookingData] = React.useState<IBookingResponse>();
    React.useEffect(() => {
        bookingApi.getBookingDetail(params.slug).then((res) => {
            setbookingData(res);
        });
        //EsLint disable next line
    }, [params.slug]);
    const convertDate = (date: string) => {
        if (!date) {
            return '';
        }
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

        const dateArr = date.split('T');
        const dateStr = dateArr[0].split('-');
        const year = dateStr[0];
        const month = dateStr[1];
        const day = dateStr[2];

        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        const dayOfWeek = daysOfWeek[dateObj.getDay()];

        return `${dayOfWeek}, ${day} tháng ${month} năm ${year}`;
    };
    const convertDateTime = (date: string) => {
        if (!date) {
            return '';
        }
        const dateArr = date.split('T');
        const timeArr = dateArr[1].split(':');
        const dateStr = dateArr[0].split('-');
        const year = dateStr[0];
        const month = dateStr[1];
        const day = dateStr[2];

        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));

        return `${timeArr[0]}:${timeArr[1]}, ${day} tháng ${month} năm ${year}`;
    };
    const convertPrice = (num: number | undefined) => {
        if (typeof num === 'undefined') {
            return '';
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    function groupHomestaysByCode(bookingDetails: IBookingDetail[] | undefined) {
        if (!bookingDetails) return [];

        const homestayGroups: { [key: string]: IBookingDetail[] } = {};
        bookingDetails.forEach((homestay) => {
            const homestayCode = homestay.homestayCode;
            if (!homestayGroups[homestayCode]) {
                homestayGroups[homestayCode] = [];
            }
            homestayGroups[homestayCode].push(homestay);
        });

        return Object.values(homestayGroups);
    }
    const groupedHomestays = groupHomestaysByCode(bookingData?.bookingDetails);
    return (
        <div className='w-3/5 mx-auto text-blackish-green mt-10 mb-28'>
            {loading && <LoadingPage />}
            <div className='grid grid-cols-4  items-center'>
                <h2 className="col-span-3 text-left text-3xl font-bold mb-4">Thông tin đặt trước đã hủy</h2>
                <Link
                    href='/booking/cancel'
                    className='text-right'>
                    Danh sách đặt trước đã hủy <FontAwesomeIcon icon={faCaretRight} />
                </Link>
            </div>
            <div className='p-8 rounded-xl shadow-md shadow-gray-300'>
                <div className='mb-5 flex'>
                    <div>
                        <FontAwesomeIcon icon={faBuilding} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                    </div>
                    <div className='ml-2'>
                        <p className='font-semibold text-xs text-blackish-green opacity-75'>
                            Homestay
                        </p>
                        <p className='text-blackish-green font-medium'>
                            {bookingData?.booking.householdName}
                        </p>
                    </div>
                </div>
                <div className='grid grid-cols-10 mb-20 border-collapse border-gray-300'>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                        Mã đặt trước
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                        {bookingData?.booking.bookingCode}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300'>
                        Thời gian lưu trú
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300'>
                        {bookingData?.booking.totalNight} đêm
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300  bg-gray-100 '>
                        Chi tiết đặt phòng
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300  bg-gray-100 items-start'>
                        {bookingData?.bookingSummary?.map((item) => (
                            <p key={item.roomTypeId} className={bookingData.bookingSummary.length === 1 ? '' : 'pb-2'}>
                                {item.quantity} {item.roomTypeName}
                            </p>
                        ))}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300'>
                        Bạn đã đặt cho
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300'>
                        {bookingData?.booking.totalGuest} khách
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                        Nhận phòng
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                        {convertDate(bookingData?.booking.checkInDate as string)}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 '>
                        Trả phòng
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300 '>
                        {convertDate(bookingData?.booking.checkOutDate as string)}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                    Thành tiền
                    </div>
                    <div className='col-span-7 border-collapse border-gray-300 bg-gray-100 p-2'>
                        <div className='border border-gray-300 rounded-sm'>
                            {bookingData?.bookingSummary?.map((item) => (
                                <div key={item.roomTypeId} className='grid grid-cols-3 w-full bg-white border-b border-gray-300'>
                                    <p className='col-span-2 py-2 px-4 border-r border-gray-300'>{item.quantity} {item.roomTypeName}</p>
                                    <p className='col-span-1 py-2 px-4 text-right'>{convertPrice(item.price)} VNĐ</p>
                                </div>
                            ))}
                            <div className='grid grid-cols-3 w-full bg-gray-200 border-gray-300'>
                                <p className='col-span-2 py-2 px-4 font-bold border-r border-gray-300'>TỔNG CỘNG</p>
                                <p className='col-span-1 py-2 px-4 font-bold text-right'>
                                    {convertPrice(bookingData?.booking.totalPrice)} VNĐ
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300'>
                        Thời gian hủy
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300'>
                        {convertDateTime(bookingData?.booking.cancellationHistory.cancellationDate as string)}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300  bg-gray-100 '>
                        Lý do hủy phòng
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300  bg-gray-100'>
                        {bookingData?.booking.cancellationHistory.cancellationReason}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300'>
                        Trạng thái
                    </div>
                    <div className='col-span-7 p-2 border font-bold border-gray-300'>
                        {bookingData?.booking.cancellationHistory.refundStatus === 'REFUND' ? 'Đã hoàn tiền' : 'Chưa hoàn tiền'}
                    </div>
                </div>
                <div className='col-span-10 text-center'>
                    <button onClick={() => {
                        router.push(`/homestay-booking/search?householdId=${bookingData?.booking.householdId}&checkInDate=${today.format('YYYY-MM-DD')}&checkOutDate=${today.add(1,'day').format('YYYY-MM-DD')}&numberOfGuests=1`)
                        setLoading(true);
                    }} className={`rounded-lg bg-mint-green hover:bg-opacity-50 border-2 px-3 py-1`}>
                        <span className='text-xs md:text-base'>
                            <FontAwesomeIcon icon={faCirclePlus} />  Đặt lại homestay tại {bookingData?.booking.householdName}
                        </span>
                    </button>
                </div>
            </div>
            {groupedHomestays.map((homestayGroup: IBookingDetail[],index) => (
                <AddressInformation key={index} bookingData={homestayGroup} />
            ))
            }
        </div>
    );
}
