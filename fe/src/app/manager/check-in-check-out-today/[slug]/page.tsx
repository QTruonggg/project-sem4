'use client';
import { Breadcrumb, Collapse, message } from 'antd';
import * as React from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
import { IViewBookingDetailCheckInOutResponse } from '@/types/bookingType';
import bookingManagerApi from '@/api/bookingManagerApi';
import { TableRowSelection } from 'antd/es/table/interface';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/Components/common/LoadingPage';
import { set } from 'date-fns';

export interface ICheckInAndCheckOutTodayDetailManagementProps {
    params: {
        slug: string,
    }
}

export default function CheckInAndCheckOutTodayDetailManagement({ params: { slug } }: ICheckInAndCheckOutTodayDetailManagementProps) {
    const [selectedRoomKeys, setSelectedRoomKeys] = React.useState<React.Key[]>([]);
    const [selectedDormKeys, setSelectedDormKeys] = React.useState<React.Key[]>([]);
    const [loading, setLoading] = React.useState(false);

    // Danh sách chứa những booking detail có trạng thái của booking là BOOKED (chưa check in)
    const [listBookingBooked, setListBookingBooked] = React.useState<IViewBookingDetailCheckInOutResponse[]>([]);

    // Danh sách chứa những booking detail có trạng thái của booking là CHECKED_IN (chưa check out)
    const [listBookingCheckedIn, setListBookingCheckedIn] = React.useState<IViewBookingDetailCheckInOutResponse[]>([]);

    interface DataType {
        key: React.Key;
        id: number;
        bookingCode: string;
        homestayCode: string;
        roomTypeName: string;
        roomName: string;
        slotNumber: number;
        checkInCustomerName: string;
        price: number;
        bookingDetailStatus: string;
        isDorm: boolean;
    }

    const rooms: ColumnsType<DataType> = [
        {
            title: 'Homestay',
            dataIndex: 'homestayCode',
        },
        {
            title: 'Loại phòng',
            dataIndex: 'roomTypeName',
        },
        {
            title: 'Tên phòng',
            dataIndex: 'roomName',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'checkInCustomerName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'bookingDetailStatus',
            render: (text) => <p>
                {text === 'BOOKED' ? 'Chưa check in' :
                    (text === 'CHECKED_IN' ? 'Đã check in' : (
                        text === 'CHECKED_OUT' ? 'Đã check out' : ''
                    ))}
            </p>,
        },
    ];

    const dorms: ColumnsType<DataType> = [
        {
            title: 'Homestay',
            dataIndex: 'homestayCode',
        },
        {
            title: 'Loại phòng',
            dataIndex: 'roomTypeName',
        },
        {
            title: 'Tên phòng',
            dataIndex: 'roomName',
        },
        {
            title: 'Tên slot',
            dataIndex: 'slotNumber',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'checkInCustomerName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'bookingDetailStatus',
            render: (text) => <p>
                {text === 'BOOKED' ? 'Chưa check in' :
                    (text === 'CHECKED_IN' ? 'Đã check in' : (
                        text === 'CHECKED_OUT' ? 'Đã check out' : ''
                    ))}
            </p>,
        },
    ];

    // Lấy danh danh sách phòng và dorm của booking detail có trạng thái của booking là BOOKED (chưa check in)
    const listDormBooked: DataType[] = [];
    const listRoomBooked: DataType[] = [];

    // Lấy danh danh sách phòng và dorm của booking detail có trạng thái của booking là CHECKED_IN (chưa check out)
    const listDormCheckIn: DataType[] = [];
    const listRoomCheckIn: DataType[] = [];

    // Nếu danh sách booking detail có trạng thái của booking là BOOKED (chưa check in) có phần tử thì lấy ra danh sách phòng và dorm
    if (listBookingBooked.length > 0) {
        listBookingBooked.map((item) => {
            if (item.isDorm === true && item.bookingDetailStatus === 'BOOKED') {
                listDormBooked.push({
                    key: item.id,
                    id: item.id,
                    bookingCode: item.bookingCode,
                    homestayCode: item.homestayCode,
                    roomTypeName: item.roomTypeName,
                    roomName: item.roomName,
                    slotNumber: item.slotNumber,
                    checkInCustomerName: item.checkInCustomerName,
                    price: item.price,
                    bookingDetailStatus: item.bookingDetailStatus,
                    isDorm: item.isDorm,
                });
            } else if (item.isDorm === false && item.bookingDetailStatus === 'BOOKED') {
                listRoomBooked.push({
                    key: item.id,
                    id: item.id,
                    bookingCode: item.bookingCode,
                    homestayCode: item.homestayCode,
                    roomTypeName: item.roomTypeName,
                    roomName: item.roomName,
                    slotNumber: item.slotNumber,
                    checkInCustomerName: item.checkInCustomerName,
                    price: item.price,
                    bookingDetailStatus: item.bookingDetailStatus,
                    isDorm: item.isDorm,
                });
            }
        });

        // Nếu booking detail có trạng thái của booking là CHECKED_IN (chưa check out) có phần tử thì lấy ra danh sách phòng và dorm
    }
    if (listBookingCheckedIn.length > 0) {
        listBookingCheckedIn.map((item) => {
            if (item.isDorm === true && item.bookingDetailStatus === 'CHECKED_IN') {
                listDormCheckIn.push({
                    key: item.id,
                    id: item.id,
                    bookingCode: item.bookingCode,
                    homestayCode: item.homestayCode,
                    roomTypeName: item.roomTypeName,
                    roomName: item.roomName,
                    slotNumber: item.slotNumber,
                    checkInCustomerName: item.checkInCustomerName,
                    price: item.price,
                    bookingDetailStatus: item.bookingDetailStatus,
                    isDorm: item.isDorm,
                });
            } else if (item.isDorm === false && item.bookingDetailStatus === 'CHECKED_IN') {
                listRoomCheckIn.push({
                    key: item.id,
                    id: item.id,
                    bookingCode: item.bookingCode,
                    homestayCode: item.homestayCode,
                    roomTypeName: item.roomTypeName,
                    roomName: item.roomName,
                    slotNumber: item.slotNumber,
                    checkInCustomerName: item.checkInCustomerName,
                    price: item.price,
                    bookingDetailStatus: item.bookingDetailStatus,
                    isDorm: item.isDorm,
                });
            }
        });
    }

    const onSelectChangeRoom = (newSelectedRoomKeys: React.Key[],) => {
        setSelectedRoomKeys(newSelectedRoomKeys);
    };

    const onSelectChangeDorm = (newSelectedDormKeys: React.Key[]) => {
        setSelectedDormKeys(newSelectedDormKeys);
    };

    const roomSelection = {
        selectedRoomKeys,
        onChange: onSelectChangeRoom,
    };

    const dormSelection = {
        selectedDormKeys,
        onChange: onSelectChangeDorm,
    };

    React.useEffect(() => {
        // API lấy danh sách booking detail theo booking code
        setLoading(true);
        bookingManagerApi.getBookingDetailInOut(slug).then((res) => {
            let listBookingBooked: IViewBookingDetailCheckInOutResponse[] = [];
            let listBookingCheckedIn: IViewBookingDetailCheckInOutResponse[] = [];

            // Lọc ra những booking detail có trạng thái của booking là BOOKED (chưa check in)
            res.bookingDetails.map((item) => {
                if (item.bookingStatus === 'BOOKED') {
                    listBookingBooked.push(item);

                    // Lọc ra những booking detail có trạng thái của booking là CHECKED_IN (chưa check out)
                } else if (item.bookingStatus === 'CHECKED_IN') {
                    listBookingCheckedIn.push(item);
                }
            });
            setListBookingBooked(listBookingBooked);
            setListBookingCheckedIn(listBookingCheckedIn);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [slug]);

    const router = useRouter();

    const handleCheckInRoom = async (bookingCode: string) => {
        try {
            setLoading(true);
            await bookingManagerApi.checkInBookingDetail(bookingCode, selectedRoomKeys);
            message.success('Check-in thành công');
            router.push('/manager/check-in-check-out-today');
            // const updatedList = await bookingManagerApi.getBookingDetailInOut(slug);

            // let listBookingBooked: IViewBookingDetailCheckInOutResponse[] = [];
            // let listBookingCheckedIn: IViewBookingDetailCheckInOutResponse[] = [];

            // // Lọc ra những booking detail có trạng thái của booking là BOOKED (chưa check in)
            // updatedList.bookingDetails.map((item) => {
            //     if (item.bookingStatus === 'BOOKED') {
            //         listBookingBooked.push(item);

            //         // Lọc ra những booking detail có trạng thái của booking là CHECKED_IN (chưa check out)
            //     } else if (item.bookingStatus === 'CHECKED_IN') {
            //         listBookingCheckedIn.push(item);
            //     }
            // });
            // setListBookingBooked(listBookingBooked);
            // setListBookingCheckedIn(listBookingCheckedIn);
        } catch (error) {

        }finally{
            setLoading(false);
        }
    }

    const handleCheckInDorm = async (bookingCode: string) => {
        try {
            setLoading(true);
            await bookingManagerApi.checkInBookingDetail(bookingCode, selectedDormKeys);
            message.success('Check-in thành công');
            router.push('/manager/check-in-check-out-today');
            // const updatedList = await bookingManagerApi.getBookingDetailInOut(slug);
            // let listBookingBooked: IViewBookingDetailCheckInOutResponse[] = [];
            // let listBookingCheckedIn: IViewBookingDetailCheckInOutResponse[] = [];

            // // Lọc ra những booking detail có trạng thái của booking là BOOKED (chưa check in)
            // updatedList.bookingDetails.map((item) => {
            //     if (item.bookingStatus === 'BOOKED') {
            //         listBookingBooked.push(item);

            //         // Lọc ra những booking detail có trạng thái của booking là CHECKED_IN (chưa check out)
            //     } else if (item.bookingStatus === 'CHECKED_IN') {
            //         listBookingCheckedIn.push(item);
            //     }
            // });
            // setListBookingBooked(listBookingBooked);
            // setListBookingCheckedIn(listBookingCheckedIn);
        } catch (error) {

        }finally{
            setLoading(false);
        }
    }

    const handleCheckOutRoom = async (bookingCode: string) => {
        try {
            setLoading(true);
            await bookingManagerApi.checkOutBookingDetail(bookingCode, selectedRoomKeys);
            message.success('Check-out thành công');
            router.push('/manager/check-in-check-out-today');
            // const updatedList = await bookingManagerApi.getBookingDetailInOut(slug);

            // let listBookingIn: IViewBookingDetailCheckInOutResponse[] = [];
            // let listBookingOut: IViewBookingDetailCheckInOutResponse[] = [];

            // let listBookingBooked: IViewBookingDetailCheckInOutResponse[] = [];
            // let listBookingCheckedIn: IViewBookingDetailCheckInOutResponse[] = [];

            // // Lọc ra những booking detail có trạng thái của booking là BOOKED (chưa check in)
            // updatedList.bookingDetails.map((item) => {
            //     if (item.bookingStatus === 'BOOKED') {
            //         listBookingBooked.push(item);

            //         // Lọc ra những booking detail có trạng thái của booking là CHECKED_IN (chưa check out)
            //     } else if (item.bookingStatus === 'CHECKED_IN') {
            //         listBookingCheckedIn.push(item);
            //     }
            // });
            // setListBookingBooked(listBookingBooked);
            // setListBookingCheckedIn(listBookingCheckedIn);
        } catch (error) {
        }finally{
            setLoading(false);
        }
    }

    // <button
    //     onClick={() => {
    //         const bookingCode = listDormIn[0].bookingCode;
    //         handleCheckInDorm(bookingCode);
    //     }}
    //     className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
    //     Check-in
    // </button>

    const handleCheckOutDorm = async (bookingCode: string) => {
        try {
            setLoading(true);
            await bookingManagerApi.checkOutBookingDetail(bookingCode, selectedDormKeys);
            message.success('Check-out thành công');
            router.push('/manager/check-in-check-out-today');
            // const updatedList = await bookingManagerApi.getBookingDetailInOut(slug);

            // let listBookingBooked: IViewBookingDetailCheckInOutResponse[] = [];
            // let listBookingCheckedIn: IViewBookingDetailCheckInOutResponse[] = [];

            // // Lọc ra những booking detail có trạng thái của booking là BOOKED (chưa check in)
            // updatedList.bookingDetails.map((item) => {
            //     if (item.bookingStatus === 'BOOKED') {
            //         listBookingBooked.push(item);

            //         // Lọc ra những booking detail có trạng thái của booking là CHECKED_IN (chưa check out)
            //     } else if (item.bookingStatus === 'CHECKED_IN') {
            //         listBookingCheckedIn.push(item);
            //     }
            // });
            // setListBookingBooked(listBookingBooked);
            // setListBookingCheckedIn(listBookingCheckedIn);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        {loading && <LoadingPage />}
            <Breadcrumb
                className='px-5 py-5'
                items={[
                    {
                        href: '/manager/check-in-check-out-today',
                        title: (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarOutlined className='px-2' />
                                <span>Check-in & Check-out</span>
                            </div>
                        ),
                    },
                    {
                        title: (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className='font-bold'>{slug}</span>
                            </div>
                        ),
                    },
                ]}
            />

            <p className='font-semibold px-5'>Thông tin {listBookingBooked.length > 0 ? 'check-in' : (listBookingCheckedIn.length > 0 ? 'check-out' : '')} đặt phòng {slug}</p>

            {/* Collapse danh sách phòng */}
            <Collapse
                defaultActiveKey={['1']}
                className='mx-5 my-5'
                size="small"
                style={{ backgroundColor: 'lightgray' }}
                items={[{
                    key: '1', label: 'Danh sách phòng',
                    children:
                        <div>
                            {/* Nếu danh sách phòng booked có phần tử thì hiển thị danh sách phòng booked, ngược lại hiển thị danh sách phòng checked in  */}
                            {
                                listBookingBooked.length > 0 ? (
                                    listRoomBooked.length > 0 ? (
                                        <>
                                            <Table className='border-gray-500 border-collapse'
                                                rowSelection={roomSelection}
                                                columns={rooms}
                                                dataSource={listRoomBooked}
                                                pagination={{ pageSize: 5 }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const bookingCode = listRoomBooked[0].bookingCode;
                                                    handleCheckInRoom(bookingCode);
                                                }}
                                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                                Check-in
                                            </button>
                                        </>
                                    ) : (
                                        <p>Không có phòng để check-in</p>
                                    )
                                ) : (
                                    listRoomCheckIn.length > 0 ? (
                                        <>
                                            <Table className='border-gray-500 border-collapse'
                                                rowSelection={roomSelection}
                                                columns={rooms}
                                                dataSource={listRoomCheckIn}
                                                pagination={{ pageSize: 5 }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const bookingCode = listRoomCheckIn[0].bookingCode;
                                                    handleCheckOutRoom(bookingCode);
                                                }}
                                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                                Check-out
                                            </button>
                                        </>
                                    ) : (
                                        <p>Không có phòng để check-out</p>
                                    )
                                )
                            }
                        </div>
                }]}
            />

            {/* Collapse danh sách dorm */}
            <Collapse
                defaultActiveKey={['2']}
                className='mx-5 my-5'
                size="small"
                style={{ backgroundColor: 'lightgray' }}
                items={[{
                    key: '2', label: 'Danh sách dorm',
                    children:
                        <div>
                            {/* Nếu danh sách dorm booked có phần tử thì hiển thị danh sách dorm booked, ngược lại hiển thị danh sách dorm checked in  */}
                            {
                                listBookingBooked.length > 0 ? (
                                    listDormBooked.length > 0 ? (
                                        <>
                                            <Table className='border-gray-500 border-collapse'
                                                rowSelection={dormSelection}
                                                columns={dorms}
                                                dataSource={listDormBooked}
                                                pagination={{ pageSize: 5 }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const bookingCode = listDormBooked[0].bookingCode;
                                                    handleCheckInDorm(bookingCode);
                                                }}
                                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                                Check-in
                                            </button>
                                        </>
                                    ) : (
                                        <p>Không có dorm để check-in</p>
                                    )
                                ) : (
                                    listDormCheckIn.length > 0 ? (
                                        <>
                                            <Table className='border-gray-500 border-collapse'
                                                rowSelection={dormSelection}
                                                columns={dorms}
                                                dataSource={listDormCheckIn}
                                                pagination={{ pageSize: 5 }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const bookingCode = listDormCheckIn[0].bookingCode;
                                                    handleCheckOutDorm(bookingCode);
                                                }}
                                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                                Check-out
                                            </button>
                                        </>
                                    ) : (
                                        <p>Không có dorm để check-out</p>
                                    )
                                )
                            }

                        </div>

                }]}

            />
        </>
    )
}