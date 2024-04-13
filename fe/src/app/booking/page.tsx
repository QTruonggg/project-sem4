'use client';
import * as React from 'react';
import { useState } from 'react';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookingItem from '@/Components/booking/BookingItem';
import BookingList from '@/Components/booking/BookingList';
import NavBookingItem from '@/Components/booking/NavBookingItem';
import UserAccounMenu from '@/Components/profile/UserAccounMenu';
import bookingApi from '@/api/bookingApi';
import { IBookingItem } from '@/types/bookingType';
import LoadingPage from '@/Components/common/LoadingPage';
import Pagination from '@/Components/booking/Pagination';

export const CancelBookingContext = React.createContext({
    isCancelSuccess: false,
    setIsCancelSuccess: (value: boolean) => {},
});

export default function Booking() {
    const [bookingData, setbookingData] = useState<IBookingItem[]>([]);
    const [isCancelSuccess, setIsCancelSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;

    React.useEffect(() => {
        
        const fetchBookingData = async () => {
            try {
                setLoading(true);
                const res = await bookingApi.getBooking();
                setbookingData(res.bookingResponseDtos);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
        setIsCancelSuccess(false);
    }, [isCancelSuccess]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentData = bookingData.slice(startIndex, endIndex);

    return (
        <UserAccounMenu>
            {loading && <LoadingPage />}
            <h2 className="text-center md:text-left text-xl md:text-3xl font-bold mb-4">Lịch sử đặt trước</h2>
            <div className="rounded-xl shadow-md shadow-gray-300 mt-3 mb-10">
                <ul className="grid grid-cols-3 py-3 items-center justify-center relative">
                    <NavBookingItem path="/booking">
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#8f9e8f", }} /> Đặt trước đang diễn ra
                    </NavBookingItem>
                    <NavBookingItem path="/booking/done">
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1bec18", }} /> Đặt trước đã hoàn thành
                    </NavBookingItem>
                    <NavBookingItem path="/booking/cancel">
                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#df5858", }} /> Đặt trước đã hủy
                    </NavBookingItem>
                </ul>
            </div>
            <CancelBookingContext.Provider value={{ isCancelSuccess, setIsCancelSuccess }}>
                {currentData.length > 0 ? (
                    currentData.map((item) => (
                        <>
                            <BookingList key={item.bookingCode}>
                                <BookingItem item={item} />
                            </BookingList>

                        </>
                    ))
                ) : (
                    <p className='text-center'>Bạn chưa từng đặt phòng</p>
                )}

                <div className="flex justify-center text-center mt-5">
                <Pagination
                    currentPage={currentPage}
                    totalItems={bookingData.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
                </div>
            </CancelBookingContext.Provider>
        </UserAccounMenu>
    );
}
