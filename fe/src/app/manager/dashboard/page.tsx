'use client';

import LoadingPage from '@/Components/common/LoadingPage';
import dashboardApi from '@/api/dashboardApi';
import { DashboardManager } from '@/types/dashboard';
import { Card, Col, Collapse, Row, Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export interface IDashboardProps {
}

export default function Dashboard(props: IDashboardProps) {
    const [dataDashboard, setDataDashboard] = React.useState<DashboardManager>();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        dashboardApi.getDashboardInformatiuon().then((res) => {
            return setDataDashboard(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const [nameFromSession, setNameFromSession] = React.useState<string | null>(null);
    React.useEffect(() => {
        const dataFromSession = window.sessionStorage.getItem('selectedHousehold');
        if (dataFromSession) {
            const parsedData = JSON.parse(dataFromSession);

            const name = parsedData.customerName; // Thay 'name' bằng tên thuộc tính bạn quan tâm
            setNameFromSession(name);
        }
    }, []);

    return (
        <>
            {loading && <LoadingPage />}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-5 py-2'>
                <Col flex="1 1 300px">
                    <Card style={{ width: '100%', border: '1px solid lightgrey' }} bodyStyle={{ padding: '10px' }}>
                        <p className='font-semibold'>Dashboard</p>
                        <p className='text-sm text-gray-400'>Hệ thống quản lý và đặt phòng V-HomeStay</p>
                    </Card>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col flex="1 1 300px" className='ml-5 '>
                    <div className='text-center overflow-hidden rounded-b-xl bg-cover bg-[url("/images/dashboard.jpg")] h-60'>
                        <div className='mx-auto justify-center w-96 mt-16'>
                            <p className='text-base'>Chào {nameFromSession} (Quản lý)</p>
                            <p className='font-semibold text-xl'>V-HomeStay xin chào!</p>
                            <p className='italic mt-2'>Nhiệt độ bây giờ ở V-HomeStay là {dataDashboard?.dashboard.temperature} độ C, {dataDashboard?.dashboard.weather}.
                                Chúc bạn có một ngày làm việc vui vẻ và hạnh phúc!</p>
                        </div>
                    </div>
                    <Card className='mt-2' style={{ width: '100%', border: '1px solid lightgrey' }} bodyStyle={{ padding: '10px' }}>
                        <p className='text-sm font-semibold'>Quản lý tình trạng phòng</p>
                    </Card>
                    {dataDashboard?.roomStatusManagement?.map((item, index) => (
                        <Collapse key={index}
                            items={[{
                                key: item.homestayId, label: item.homestayCode,
                                children:
                                    <div>
                                        <Row key='1' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            {item?.roomInformationForDashboards?.map((room) => (
                                                room.available ? (
                                                    <Col key={item?.homestayId} span={6}>
                                                        <Card className='border-[#6712AA] rounded-md' style={{ width: '100%', marginBottom: '15px' }} bodyStyle={{ padding: '15px' }}>
                                                            <div className='flex items-center'>
                                                                <p className='text-lg font-semibold pb-1' style={{ flex: 1 }}>{room?.roomName}</p>
                                                            </div>
                                                            <p className='text-gray-500' style={{ fontSize: '12px' }}>{room?.roomTypeName}</p>
                                                            <div className='flex space-x-1'>
                                                                <svg
                                                                    viewBox="0 0 1024 1024"
                                                                    fill="currentColor"
                                                                    height="1.5em"
                                                                    width="1em"
                                                                    className='text-[#6712AA]'
                                                                >
                                                                    <path d="M120 160H72c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zm833 0h-48c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zM200 736h112c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm321 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm126 0h178c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H647c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-255 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-79 64H201c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm257 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm256 0H648c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h178c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-385 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                                                                </svg>
                                                                <p className='text-sm pb-1 text-[#6712AA] '>{room?.bookingCode}</p>
                                                            </div>

                                                            <div className='flex space-x-1'>
                                                                <svg
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    height="1.2em"
                                                                    width="1em"
                                                                    className='text-[#6712AA]'
                                                                >
                                                                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                                                                </svg>
                                                                <p className='text-[#6712AA]' style={{ fontSize: '12px' }}>{room?.customerName}</p>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                ) : (
                                                    <Col key={item?.homestayId} span={6}>
                                                        <Card className='border-[#6712AA] bg-gray-200 rounded-md' style={{ width: '100%', marginBottom: '15px' }} bodyStyle={{ padding: '15px' }}>
                                                            <div className='flex items-center'>
                                                                <p className='text-lg font-semibold pb-1' style={{ flex: 1 }}>{room?.roomName}</p>
                                                            </div>
                                                            <p className='text-gray-500' style={{ fontSize: '12px' }}>{room?.roomTypeName}</p>
                                                            <div className='flex space-x-1'>
                                                                <svg
                                                                    viewBox="0 0 1024 1024"
                                                                    fill="currentColor"
                                                                    height="1.5em"
                                                                    width="1em"
                                                                    className='text-[#6712AA]'
                                                                >
                                                                    <path d="M120 160H72c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zm833 0h-48c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zM200 736h112c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm321 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm126 0h178c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H647c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-255 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-79 64H201c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm257 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm256 0H648c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h178c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-385 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                                                                </svg>
                                                                <p className='text-sm pb-1 text-[#6712AA] '>{room?.bookingCode}</p>
                                                            </div>

                                                            <div className='flex space-x-1'>
                                                                <svg
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    height="1.2em"
                                                                    width="1em"
                                                                    className='text-[#6712AA]'
                                                                >
                                                                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                                                                </svg>
                                                                <p className='text-[#6712AA]' style={{ fontSize: '12px' }}>{room?.customerName}</p>
                                                            </div>

                                                        </Card>
                                                    </Col>
                                                )
                                            ))}
                                        </Row>
                                        <Row key='2' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            {item?.dormitoryInformationForDashboards?.map((room) => (
                                                <Col key={room?.roomId} span={6}>
                                                    <Card className='border-[#6712AA] rounded-md' style={{ width: '100%', marginBottom: '15px' }} bodyStyle={{ padding: '15px' }}>
                                                        <div className='flex items-center'>
                                                            <p className='text-lg font-semibold pb-1' style={{ flex: 1 }}>{room?.roomName}</p>
                                                        </div>
                                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>{room?.roomTypeName}</p>
                                                        <div className='flex space-x-1'>
                                                            <svg
                                                                viewBox="0 0 1024 1024"
                                                                fill="currentColor"
                                                                height="1.5em"
                                                                width="1em"
                                                                className='text-[#6712AA]'
                                                            >
                                                                <path d="M120 160H72c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zm833 0h-48c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zM200 736h112c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm321 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm126 0h178c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H647c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-255 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-79 64H201c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm257 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm256 0H648c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h178c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-385 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                                                            </svg>
                                                            <p className='text-sm pb-1 text-[#6712AA] '>{room?.totalSlot}</p>
                                                        </div>

                                                        <div className='flex space-x-1'>
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="1.2em"
                                                                width="1em"
                                                                className='text-[#6712AA]'
                                                            >
                                                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                                                            </svg>
                                                            <p className='text-[#6712AA]' style={{ fontSize: '12px' }}>{room?.availableSlot}/{room.totalSlot}</p>
                                                        </div>

                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                            }]}
                            className='mt-2'
                        />
                    ))}
                </Col>

                <Col flex="0 1 550px" className='mt-5'>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-5'>
                        <Col flex="1 1 300px">
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='pb-5'>
                                <Col span={12}>
                                    <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                                        <div className='flex items-center'>
                                            <p className='text-base font-semibold pb-1' style={{ flex: 1 }}>Homestay</p>
                                            <Tag color='success' style={{ fontSize: '10px' }}>
                                                Hoạt động
                                            </Tag>
                                        </div>
                                        <p className='text-base font-bold pb-1'>{dataDashboard?.dashboard.totalHomestay}</p>
                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>Căn homestay</p>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                                        <div className='flex items-center'>
                                            <p className='text-base font-semibold pb-1' style={{ flex: 1 }}>Số phòng</p>
                                            <Tag color='success' style={{ fontSize: '10px' }}>
                                                Hoạt động
                                            </Tag>
                                        </div>
                                        <p className='text-base font-bold pb-1'>{dataDashboard?.dashboard.totalRoom}</p>
                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>Phòng thường</p>
                                    </Card>
                                </Col>

                            </Row>

                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                                <Col span={12}>
                                    <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                                        <div className='flex items-center'>
                                            <p className='text-base font-semibold pb-1' style={{ flex: 1 }}>Số chỗ dorm</p>
                                            <Tag color='success' style={{ fontSize: '10px' }}>
                                                Hoạt động
                                            </Tag>
                                        </div>
                                        <p className='text-base font-bold pb-1'>{dataDashboard?.dashboard.totalDorm}</p>
                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>Chỗ</p>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                                        <div className='flex items-center'>
                                            <p className='text-base font-semibold pb-1' style={{ flex: 1 }}>Sức chứa tối đa</p>
                                            <Tag color='success' style={{ fontSize: '10px' }}>
                                                Hoạt động
                                            </Tag>
                                        </div>
                                        <p className='text-base font-bold pb-1'>{dataDashboard?.dashboard.totalCapacity}</p>
                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>Khách</p>
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='m-5'>
                                <Col span={12}>
                                    <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                                        <div className='flex items-center'>
                                            <p className='text-base font-semibold pb-1' style={{ flex: 1 }}>Đặt phòng mới</p>
                                            <Tag color='success' style={{ fontSize: '10px' }}>
                                                Hoạt động
                                            </Tag>
                                        </div>
                                        <p className='text-base font-bold pb-1'>{dataDashboard?.dashboard.totalBookingToday}</p>
                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>Đơn đặt phòng hoàn tất</p>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                                        <div className='flex items-center'>
                                            <p className='text-base font-semibold pb-1' style={{ flex: 1 }}>Đánh giá</p>
                                            <Tag color='success' style={{ fontSize: '10px' }}>
                                                Trên web
                                            </Tag>
                                        </div>
                                        <p className='text-base font-bold pb-1'>{dataDashboard?.dashboard.totalFeedbackScore} <span className='font-normal'>[{dataDashboard?.dashboard.totalFeedback} đánh giá]</span></p>
                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>Sao</p>
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='m-5'>
                                <Col span={12}>
                                    <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                                        <div className='flex items-center'>
                                            <p className='text-base font-semibold pb-1' style={{ flex: 1 }}>Check-in</p>
                                            <Tag color='success' style={{ fontSize: '10px' }}>
                                                Hôm nay
                                            </Tag>
                                        </div>
                                        <p className='text-base font-bold pb-1'>{dataDashboard?.dashboard.totalCheckInToday}</p>
                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>Phòng hoặc chỗ dorm</p>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                                        <div className='flex items-center'>
                                            <p className='text-base font-semibold pb-1' style={{ flex: 1 }}>Check-out</p>
                                            <Tag color='success' style={{ fontSize: '10px' }}>
                                                Hôm nay
                                            </Tag>
                                        </div>
                                        <p className='text-base font-bold pb-1'>{dataDashboard?.dashboard.totalCheckOutToday}</p>
                                        <p className='text-gray-500' style={{ fontSize: '12px' }}>Phòng hoặc chỗ dorm</p>
                                    </Card>
                                </Col>
                            </Row>

                        </Col>
                        <Card className='ml-4 mr-4' style={{ width: '100%', border: '1px solid lightgrey' }} bodyStyle={{ padding: '10px' }}>
                            <p className='text-base font-semibold'>Đơn đặt phòng đã hủy - chờ hoàn tiền</p>
                            <p className='text-sm font-thin'>Hoàn tiền cho khách hàng trong vòng 48h</p>
                        </Card>
                        <Card style={{ width: '100%' }} className='ml-4 mr-4 m-3 shadow-md '>
                            <div className='mx-auto text-center justify-center text-base font-semibold mb-5'>
                                Đơn đặt phòng đã hủy - chờ hoàn tiền
                            </div>
                            {dataDashboard?.dashboard.bookingCancelListForManager.map((item, index) => (
                                <div key={index} className='bg-[#EEE6E2] rounded-md p-2 mt-2'>
                                    <div className='flex'>
                                        <Image width={1000} height={0} src="/images/avt.png" alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
                                        <div className='w-full'>
                                            <div className='flex justify-between'>
                                                <p>{item.bookingCode}</p>
                                                <p className='text-gray-400'>{item.createdDate}</p>
                                            </div>
                                            <div className='flex justify-between'>
                                                <p className='font-semibold'>{item.customerFirstName} {item.customerLastName}</p>
                                                <p className='text-red-600 font-semibold'>{item.refundAmount}VNĐ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Link href={'/manager/booking-management'} className='text-blue-500 float-right mt-5'>Đến trang quản lý hoàn tiền</Link>
                        </Card>
                        <Col flex="0 1 400px">
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-5 rounded border-lg'>


            </Row>


        </>
    );
}