'use client';
import LoadingPage from '@/Components/common/LoadingPage';
import bookingManagerApi from '@/api/bookingManagerApi';
import { IBookingCancelManagerRequestDto, IDropDownCancelBookingRequest, IEditBookingRequest, IGetDropDownCancelBookingResponse, bookingCancelManagerResponseDto, bookingManagerSummaryWithDetails, cancellationReasons } from '@/types/homestayBookingType';
import { Breadcrumb, Button, Input, InputNumber, Modal, message } from 'antd';
import { differenceInDays, parseISO, set } from 'date-fns';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface IViewBookingDetailProps {
    params: { slug: string }
}

export default function ViewBookingDetail({ params: { slug } }: IViewBookingDetailProps) {
    const [loading, setLoading] = React.useState(false);

    const formatDateTime = (dateTimeString: string | null | undefined) => {
        if (dateTimeString === null || dateTimeString === undefined) {
            return '';
        }
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    const [viewBookingDetail, setViewBookingDetail] = React.useState<bookingManagerSummaryWithDetails>();
    React.useEffect(() => {
        setLoading(true);
        bookingManagerApi.getBookingDetails(slug).then((res) => {
            setViewBookingDetail(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });

    }, [slug]);

    const [cancelBooking, setCancelBooking] = React.useState<bookingCancelManagerResponseDto>();
    React.useEffect(() => {
        bookingManagerApi.getDropDownCancel(slug).then((res) => {
            return setCancelBooking(res);
        });

    }, [slug]);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = React.useState(false);

    const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
    }

    const showModal = () => {
        checkDeadLineCancel();
        setIsModalOpen(true);
    };

    const showModalEdit = () => {
        setIsModalOpenEdit(true);
    };

    const router = useRouter();
    const handleCancelBooking = async () => {
        const res: IBookingCancelManagerRequestDto = {
            bookingCode: viewBookingDetail?.bookingManagerResponseDto.bookingCode,
            refundAmount: totalPrice,
            cancelReason: reasonCancel,
            refundStatus: statusCancel
        }
        await bookingManagerApi.cancelBooking(res);
        router.replace('/manager/booking-management');
        message.success('Hủy phòng thành công');
        setIsModalOpen(false);

    };


    const handSaveEdit = async () => {
        const res: IEditBookingRequest = {
            bookingCode: viewBookingDetail?.bookingManagerResponseDto.bookingCode,
            bookingCustomerName: bookingCustomerName,
            bookingCustomerPhoneNumber: bookingCustomerPhone
        }
        await bookingManagerApi.editInformationBooking(res);
        const update = await bookingManagerApi.getBookingDetails(slug);
        setViewBookingDetail(update);

        message.success('Cập nhật thông tin người đặt thành công');
        setIsModalOpenEdit(false);
    }


    const totalPrice = viewBookingDetail?.bookingSummaryDtos.reduce((total, item) => total + item.price, 0);

    const [dropdown, setDropdown] = React.useState<IGetDropDownCancelBookingResponse>();
    React.useEffect(() => {
        bookingManagerApi.getDropDownCancelBooking(slug).then((res) => {
            return setDropdown(res);
        });

    }, [slug]);

    const [reasonCancel, setReasonCancel] = React.useState<string>();
    const selectReasonCancel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const select = dropdown?.cancellationReasons?.find((item) => item.reason === selectedValue);
        setReasonCancel(select?.reason);
    }
    console.log('Lý do' + reasonCancel);
    const [statusCancel, setStatusCancel] = React.useState<string>();
    const selectStatusCancel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const select = dropdown?.refundStatuses?.find((item) => item === selectedValue);
        setStatusCancel(select);
    }

    const getDaysDifference = (checkInDate: string): number => {
        const today = new Date();
        const checkIn = parseISO(checkInDate);
        return differenceInDays(today, checkIn);
    };

    // Sử dụng hàm trong component của bạn
    const checkInDate = viewBookingDetail?.bookingManagerResponseDto.checkInDate; // Ngày check-in, bạn có thể lấy từ state hoặc props
    const daysDifference = getDaysDifference(checkInDate || '');

    const [messenger, setMessenger] = React.useState<string>('');
    const [check, setCheck] = React.useState<boolean>(false);
    const checkDeadLineCancel = () => {
        let deadline = dropdown?.cancellationPeriod;
        if (daysDifference >= -(deadline || 0)) {
            setMessenger('Nếu bạn hủy phòng này khách hàng sẽ không được hoàn tiền');
        } else {
            setMessenger('Nếu hủy đặt phòng này bạn sẽ hoàn ' + totalPrice + ' VNĐ cho khách hàng.');
            setCheck(true);
        }
        console.log(checkInDate);

        console.log('Bao nhiêu' + daysDifference);
    };

    const [bookingCustomerName, setBookingCustomerName] = React.useState('');
    const [bookingCustomerPhone, setBookingCustomerPhone] = React.useState('');

    const handleNameChange = (e: any) => {
        const newValue = e.target.value;
        setBookingCustomerName(newValue !== '' ? newValue : viewBookingDetail?.bookingManagerResponseDto.bookingCustomerName);
    };

    const handlePhoneChange = (e: any) => {
        const newValue = e.target.value;
        setBookingCustomerPhone(newValue !== '' ? newValue : viewBookingDetail?.bookingManagerResponseDto.bookingCustomerPhoneNumber);
    };
    const breadcrumbItems = [
        {
            href: '/manager/booking-management',
            title: (
                <>
                    <button className='hover:text-black underline'>Quản lý đặt phòng</button>
                </>
            ),
        },
        {
            title: 'Thông tin đặt trước',
        },
    ];

    return (
        <>
            <div className='flex space-x-5 px-5 py-5'>
                <div className="bg-white px-8 pt-3 mb-4 shadow-lg rounded-lg flex-grow">
                    <Breadcrumb>
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
                    <table className="justify-center">
                        {loading && <LoadingPage />}
                        <thead>
                            <tr>
                                <th className="text-2xl font-bold py-8">
                                    Thông tin đặt trước
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Mã đặt trước</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingManagerResponseDto?.bookingCode}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Thời gian đặt phòng</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {formatDateTime(viewBookingDetail?.bookingManagerResponseDto?.createdDate)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Tên người đặt</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingManagerResponseDto?.bookingCustomerName}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Số điện thoại</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingManagerResponseDto?.bookingCustomerPhoneNumber}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Thời gian lưu trú</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingManagerResponseDto?.totalNight} đêm
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Chi tiết đặt phòng</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingSummaryDtos.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                {item.quantity} - {item.roomTypeName}
                                            </tr>
                                        )
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Số khách</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingManagerResponseDto?.totalGuest} khách
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Nhận phòng</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingManagerResponseDto?.checkInDate}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Trả phòng</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingManagerResponseDto?.checkOutDate}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Giá</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    <div className="w-full h-full">
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                {viewBookingDetail?.bookingSummaryDtos.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="py-2 px-4 border">{item.quantity} {item.roomTypeName}</td>
                                                            <td className="py-2 px-4 border">{item?.price.toLocaleString()} VNĐ</td>
                                                        </tr>
                                                    )
                                                })}
                                                <tr className='bg-[#F5F5F5] font-bold'>
                                                    <td className="py-2 px-4 border">TỔNG CỘNG</td>
                                                    <td className="py-2 px-4 border">
                                                        {totalPrice?.toLocaleString()} VNĐ
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td className="py-2 whitespace-nowrap font-semibold text-base">Trạng thái thanh toán</td>
                                <td className="py-2 whitespace-nowrap pl-40">
                                    {viewBookingDetail?.bookingManagerResponseDto?.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'} ({viewBookingDetail?.bookingManagerResponseDto?.paymentType === 'SYSTEM' ? 'Thanh toán trên hệ thống' : 'Thanh toán tại quầy'})
                                </td>
                            </tr>
                            {
                                viewBookingDetail?.bookingManagerResponseDto?.paymentStatus === 'PAID' && (
                                    <tr>
                                        <td className="py-2 whitespace-nowrap font-semibold text-base">Thời gian thanh toán</td>
                                        <td className="py-2 whitespace-nowrap pl-40">
                                            {formatDateTime(viewBookingDetail?.bookingManagerResponseDto?.paymentDate)}
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                    {
                        viewBookingDetail?.bookingManagerResponseDto?.bookingStatus === 'BOOKED' &&
                        <div className="flex items-center justify-between mt-10 pb-10">

                            <button onClick={() => { showModalEdit() }} className="bg-[#98DE7F] hover:bg-[#73C154] text-black py-1 px-4 rounded-lg flex" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Chỉnh sửa thông tin người đặt phòng
                            </button>
                            <Modal
                                title="Chỉnh sửa thông tin người đặt"
                                footer={[
                                    <Button
                                        key="update"
                                        style={{ backgroundColor: '#73C154', color: 'black' }}
                                        onClick={handSaveEdit}
                                    >
                                        Lưu
                                    </Button>,
                                ]}
                                okText="Delete"
                                okType="danger"
                                open={isModalOpenEdit}
                                onCancel={handleCancelEdit}>

                                <table className='justify-center'>
                                    <tbody>
                                        <tr>
                                            <td className="py-4 whitespace-nowrap">Tên người đặt</td>
                                            <td className="py-4 whitespace-nowrap pl-20">
                                                <input
                                                    className='border focus:border-gray-300 outline-none border-gray-300 px-3 py-1 rounded-md w-1/3'
                                                    defaultValue={viewBookingDetail?.bookingManagerResponseDto.bookingCustomerName}
                                                    onChange={handleNameChange}
                                                    style={{ width: '165%' }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 whitespace-nowrap">Số điện thoại</td>
                                            <td className="py-4 whitespace-nowrap pl-20">
                                                <input
                                                    className='border focus:border-gray-300 outline-none border-gray-300 px-3 py-1 rounded-md w-1/3'
                                                    defaultValue={viewBookingDetail?.bookingManagerResponseDto.bookingCustomerPhoneNumber}
                                                    onChange={handlePhoneChange}
                                                    style={{ width: '165%' }} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Modal>

                            <button className="bg-[#FF9371] hover:bg-[#FF6A49] flex text-black py-1 px-4 rounded" type="submit" onClick={() => { showModal() }} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Hủy tất cả
                            </button>
                            <Modal
                                title="Hủy phòng"
                                footer={[
                                    <button
                                        type='button'
                                        key="update"
                                        style={{ backgroundColor: '#FF6A49', color: 'black', padding: '6px 12px', borderRadius:'4px' }}
                                        onClick={handleCancelBooking}
                                    >
                                        Hủy phòng
                                    </button>,
                                ]}
                                style={{ width: '600px' }}
                                okText="Delete"
                                okType="danger"
                                open={isModalOpen}
                                onCancel={handleCancel}

                            >
                                <table className='justify-center'>
                                    <tbody>
                                        <tr>
                                            <td className="py-4 whitespace-nowrap">Lý do hủy đặt phòng</td>
                                            <td className="py-4 whitespace-nowrap pl-10">
                                                <select onChange={selectReasonCancel} style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    padding: '8px',
                                                    outline: 'none',
                                                }} className="rounded-sm px-3 py-2 outline-none">
                                                    <option value='all'>Chọn lý do hủy phòng</option>
                                                    {dropdown?.cancellationReasons?.map((item, index) => {

                                                        return (
                                                            <option key={index} value={item.reason}>{item.reason}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        {
                                            check && (
                                                <tr>
                                                    <td className="py-4 whitespace-nowrap">Trạng thái hoàn tiền</td>
                                                    <td className="py-4 whitespace-nowrap pl-10">
                                                        <select onChange={selectStatusCancel}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '4px',
                                                                padding: '8px',
                                                                outline: 'none',
                                                            }}
                                                            className="rounded-sm px-3 py-2 outline-none"
                                                        >
                                                            <option value='all'>Chọn trạng thái hoàn tiền</option>
                                                            {dropdown?.refundStatuses?.map((item) => (
                                                                <option key={item} value={item}>
                                                                    {item === 'PENDING' ? 'Đang chờ xác nhận' : item === 'REFUNDED' ? 'Đã hoàn tiền' : item === 'NOT_REFUND' ? 'Không hoàn tiền' : 'Không hoàn tiền'}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                                <span className='font-semibold text-red-500 text-sm'>
                                    {messenger}
                                </span>
                            </Modal>
                        </div>
                    }
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold py-8'>Chi tiết chỗ nghỉ</h1>
                    {viewBookingDetail?.bookingDetailManagerResponseDtos.map((item, index) => {
                        return (
                            <div key={index} className="bg-white px-8 pt-3 pb-8 mb-4 shadow-lg rounded-lg h-80 flex-1">

                                <table className="justify-center">
                                    <thead>
                                        <tr>
                                            <th className="text-2xl font-bold py-4">
                                                {item.homestayCode} {item.roomTypeName}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 whitespace-nowrap font-semibold text-base">Phòng</td>
                                            <td className="py-2 whitespace-nowrap">
                                                {item.roomName}
                                            </td>
                                        </tr>
                                        {
                                            item.isDorm ?
                                                <tr>
                                                    <td className="py-2 whitespace-nowrap font-semibold text-base">Slot</td>
                                                    <td className="py-2 whitespace-nowrap">
                                                        {item?.slotNumber}
                                                    </td>
                                                </tr> : ''
                                        }
                                        <tr>
                                            <td className="py-2 whitespace-nowrap font-semibold text-base">Tên khách</td>
                                            <td className="py-2 whitespace-nowrap">
                                                {item.checkInCustomerName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 whitespace-nowrap font-semibold text-base">Giá phòng</td>
                                            <td className="py-2 whitespace-nowrap">
                                                {item.price.toLocaleString()} VNĐ
                                            </td>
                                        </tr>
                                        <tr className='font-bold'>
                                            <td className="py-2 whitespace-nowrap font-semibold text-base">Trạng thái</td>
                                            <td className="py-2 whitespace-nowrap">
                                                {item.bookingDetailStatus === 'CHECKED_IN' ? 'Đã nhận phòng' : 'Chưa nhận phòng'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        )
                    })}
                </div>

            </div>



        </>
    );
}
