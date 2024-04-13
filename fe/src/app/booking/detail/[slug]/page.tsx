'use client';
import * as React from 'react';
import { useState } from 'react';
import AddressInformation from '@/Components/booking/AddressInformation';
import Link from 'next/link';
import bookingApi from '@/api/bookingApi';
import { IBookingCancelForm, IBookingDetail, IBookingResponse, IEditBookingInfo } from '@/types/bookingType';
import { faBuilding, faCaretRight, faCircleXmark, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import CancelModal from '@/Components/booking/CancelModal';
import EditModal from '@/Components/booking/EditModal';
import LoadingPage from '@/Components/common/LoadingPage';


export interface IDetailBookingProps {
    params: { slug: string };
}
export default function DetailBooking({ params }: IDetailBookingProps) {
    const [loading, setLoading] = React.useState(false);
    const [bookingData, setbookingData] = useState<IBookingResponse>();
    const [cancelForm, setCancelForm] = useState<IBookingCancelForm>();
    const [isChange, setIsChange] = useState(false);

    const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    React.useEffect( () => {
        (async () => {
            try {
                setLoading(true);
                const res = await bookingApi.getBookingDetail(params.slug);
                setbookingData(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
        //EsLint disable next line
    }, [isChange, params.slug]);

    const handleCancelClick = async () => {
        try {
            setLoading(true);
            const res = await bookingApi.getCancellationForm(bookingData?.booking.bookingCode as string);
            console.log(res);
            setCancelForm(res);
            setIsCancelModalOpen(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    const handleCloseCancelModal = () => {
        setIsCancelModalOpen(false);
    }

    const onCloseEditBookingModal = () => {
        setIsEditBookingModalOpen(false);
    }

 

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

        return `${dayOfWeek}, ${day} tháng ${month}, ${year}`;
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
                <h2 className="col-span-3 text-left text-3xl font-bold mb-4">Lịch sử đặt trước</h2>
                <Link
                    href='/booking'
                    className='text-right'>
                    Danh sách đặt trước <FontAwesomeIcon icon={faCaretRight} />
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
                <div className='grid grid-cols-10 mb-10 border-collapse border-gray-300'>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                        Mã đặt trước
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                        {bookingData?.booking.bookingCode}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300'>
                        Số điện thoại người đặt
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300'>
                        {bookingData?.booking.bookingCheckInPhoneNumber}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                        Tên người đặt
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                        {bookingData?.booking.bookingCheckInName}
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300'>
                        Thời gian lưu trú
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300'>
                        {bookingData?.booking.totalNight} đêm
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100'>
                        Chi tiết đặt phòng
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
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
                    <div className='col-span-3 p-2 font-bold border border-gray-300'>
                        Trả phòng
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300'>
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
                        Trạng thái thanh toán
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300'>
                        Đã thanh toán
                    </div>
                    <div className='col-span-3 p-2 font-bold border border-gray-300 bg-gray-100 pr-10'>
                        Chính sách hủy đặt trước
                    </div>
                    <div className='col-span-7 p-2 border border-gray-300 bg-gray-100'>
                        Nếu hủy trước 7 ngày tính từ ngày nhận phòng sẽ được hoàn 100% tiền,
                        trường hợp còn lại sẽ không được hoàn tiền.
                    </div>
                </div>
                <div className='col-span-10 flex justify-between'>
                    <EditModal isVisible={isEditBookingModalOpen} onClose={onCloseEditBookingModal} bookingData={{
                        bookingCode: bookingData?.booking.bookingCode as string,
                        customerName: bookingData?.booking.bookingCheckInName || "",
                        customerPhone: bookingData?.booking.bookingCheckInPhoneNumber || "",
                    }}
                    isChange={isChange}
                    setIsChange={setIsChange} />
                    <button
                        onClick={() => setIsEditBookingModalOpen(true)}
                        className={`rounded-lg bg-mint-green hover:bg-opacity-50 border-2 px-3 py-1`}>
                        <span className='text-xs md:text-base'>
                            <FontAwesomeIcon icon={faPen} />  Chỉnh sửa thông tin người đặt phòng
                        </span>
                    </button>

                    <CancelModal isVisible={isCancelModalOpen} onClose={handleCloseCancelModal} cancelForm={cancelForm} />
                    <button
                        onClick={handleCancelClick}
                        className={`rounded-lg bg-[#FF9371] hover:bg-opacity-50 border-2 px-3 py-1`}>
                        <span className='text-xs md:text-base'>
                            <FontAwesomeIcon icon={faCircleXmark} />  Hủy toàn bộ
                        </span>
                    </button>
                </div>
            </div>
            {groupedHomestays.map((homestayGroup: IBookingDetail[], index) => (
                <AddressInformation key={index} bookingData={homestayGroup} checkInDate={bookingData?.booking.checkInDate} substractDays={bookingData?.booking.cancellationPeriod} totalPrices={bookingData?.booking.totalPrice} />
            ))
            }

        </div>
    );
}
