'use client';
import bookingManagerApi from '@/api/bookingManagerApi';
import { IBookingCheckInOutResponse } from '@/types/bookingType';
import { dropdownHomestay } from '@/types/dashboardType';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, DatePicker, Row, Space, Tag, DatePickerProps, message } from 'antd';
import Link from 'next/link';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import LoadingPage from '@/Components/common/LoadingPage';
import { set } from 'date-fns';


export interface ICheckInAndCheckOutTodayManagementProps {
}


export default function CheckInAndCheckOutTodayManagement() {
    dayjs.extend(customParseFormat);
    const [listBookingIn, setListBookingIn] = React.useState<IBookingCheckInOutResponse[]>([]);
    const [listBookingOut, setListBookingOut] = React.useState<IBookingCheckInOutResponse[]>([]);
    const [checkInDate, setCheckInDate] = React.useState<string>();
    const [checkOutDate, setCheckOutDate] = React.useState<string>();
    const [listHomestay, setListHomestay] = React.useState<dropdownHomestay[]>([]);
    const [loading, setLoading] = React.useState(false);

    const checkinDate: DatePickerProps['onChange'] = (date, dateString) => {
        setCheckInDate(dateString);
    };


    const checkoutDate: DatePickerProps['onChange'] = (date, dateString) => {
        setCheckOutDate(dateString);
    };

    const dateFormat = 'YYYY-MM-DD';

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const customFormat: DatePickerProps['format'] = (value) =>
        ` ${value.format(dateFormat)}`;

    const gridStyle: React.CSSProperties = {
        width: '50%',
        textAlign: 'center',
    };


    React.useEffect(() => {
        setLoading(true);
        bookingManagerApi.getBookingInOut().then((res) => {
            setCheckInDate(res.checkInDate);
            setCheckOutDate(res.checkOutDate);
            setListHomestay(res.homestays);
            setListBookingIn(res.bookingsCheckIn);
            setListBookingOut(res.bookingsCheckOut);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, []);


    const handleCheckIn = (bookingCode: string) => {
        setLoading(true);
        bookingManagerApi.checkInBooking(bookingCode).then((res) => {
            message.success('Check-in thành công đơn đặt phòng ' + bookingCode);
            if (res) {
                setLoading(true);
                bookingManagerApi.getBookingInOut().then((res) => {
                    setCheckInDate(res.checkInDate);
                    setCheckOutDate(res.checkOutDate);
                    setListHomestay(res.homestays);
                    setListBookingIn(res.bookingsCheckIn);
                    setListBookingOut(res.bookingsCheckOut);
                });
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        }
        ).finally(() => {
            setLoading(false);
        });
    }


    const handleCheckOut = (bookingCode: string) => {
        setLoading(true);
        bookingManagerApi.checkOutBooking(bookingCode).then((res) => {
            message.success('Check-out thành công đơn đặt phòng ' + bookingCode);
            if (res) {
                setLoading(true);
                bookingManagerApi.getBookingInOut().then((res) => {
                    setCheckInDate(res.checkInDate);
                    setCheckOutDate(res.checkOutDate);
                    setListHomestay(res.homestays);
                    setListBookingIn(res.bookingsCheckIn);
                    setListBookingOut(res.bookingsCheckOut);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setLoading(false);
                });
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleSearchCheckIn = (data: any) => {
        data.preventDefault();
        if (checkInDate && selectedHomestayId != null) {
            setLoading(true);
            bookingManagerApi.searchCheckInById(selectedHomestayId, checkInDate).then((response) => {
                setListBookingIn(response.bookingsCheckIn);
            })
                .catch((error) => {
                }).finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(true);
            bookingManagerApi.searchCheckIn(checkInDate).then((response) => {
                setListBookingIn(response.bookingsCheckIn);
            })
                .catch((error) => {
                }).finally(() => {
                    setLoading(false);
                });;
        }
        console.log(checkInDate);
    }


    const handleSearchCheckOut = (data: any) => {
        data.preventDefault();
        if (checkOutDate && selectedHomestayId != null) {
            setLoading(true);
            bookingManagerApi.searchCheckOutById(selectedHomestayId, checkOutDate).then((response) => {
                setListBookingOut(response.bookingsCheckOut);
            })
                .catch((error) => {

                }).finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(true);
            bookingManagerApi.searchCheckOut(checkOutDate).then((response) => {
                setListBookingOut(response.bookingsCheckOut);
            })
                .catch((error) => {

                }).finally(() => {
                    setLoading(false);
                });
        }
        console.log(data);
    }


    const [selectedHomestayId, setSelectedHomestayId] = React.useState<number>();


    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectHomestay = listHomestay.find(item => item.homestayId.toString() === selectedValue);
        // const selectHomestayId = selectHomestay?.homestayId;
        setSelectedHomestayId(selectHomestay?.homestayId);
    };


    return (
        <>
            {loading && <LoadingPage />}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='py-5 px-5' >
                <Col className="gutter-row" span={12}>
                    <Card style={{ width: '100%', textAlign: 'center' }}>
                        <p className='font-semibold text-xl'>CHECK-IN</p>



                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='pt-8'>
                            {/* <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <label
                                    htmlFor='Date'
                                    className='block absolute text-sm z-50 -top-3 left-5 bg-white px-2 text-gray-500'
                                >
                                    Homestay
                                </label>
                                <div className='w-full h-full'>
                                    <select onChange={handleDropdownChange} className="w-full h-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent">
                                        <option value="all">Tất cả các homestay</option>
                                        {listHomestay?.map((item) => {
                                            return (
                                                <option key={item.homestayId} value={item.homestayId}>
                                                    {item.homestayCode}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </Col> */}


                            <Col xs={2} sm={4} md={6} lg={8} xl={20}>
                                <label
                                    htmlFor='Date'
                                    className='block absolute text-sm z-50 -top-3 left-5 bg-white px-2 text-gray-500'
                                >
                                    Ngày đến
                                </label>
                                <div className='w-full h-full'>
                                    <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
                                        <DatePicker
                                            onChange={checkinDate}
                                            name='checkInDate'
                                            defaultValue={dayjs(checkInDate).startOf('day')}
                                            style={{ width: '100%', height: '50px' }}
                                            className='w-full h-full' />
                                    </Space>
                                </div>
                            </Col>
                            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                                <button
                                    type="submit"
                                    onClick={handleSearchCheckIn}
                                    className='rounded-lg md:h-12 bg-blue-500 text-white h-full w-full py-2 text-sm md:text-base md:py-3'
                                >
                                    <span className='text-xs md:text-base items-center'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="hidden md:inline-block" />
                                    </span>
                                </button>
                            </Col>
                        </Row>

                        {
                            listBookingIn.length === 0 ? (
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='mt-5'>
                                    <Card style={{ width: '100%', border: '1px solid lightgray' }}>
                                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            <Col className="gutter-row pb-2" span={24}>
                                                <p className='pb-3 text-center'>
                                                    Bạn không có khách hàng nào cần check-in hôm nay
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                            ) :
                                listBookingIn.map((item) => (
                                    <Row key={item.bookingCode} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='mt-5'>
                                        <Card style={{ width: '100%', border: '1px solid lightgray' }}>
                                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col className="gutter-row pb-2" span={12}>
                                                    <p className='pb-3' style={{ textAlign: 'left', marginLeft: 0 }}>
                                                        <Tag color='success'>
                                                            <p className='font-semibold'>
                                                                {item.bookingCode}
                                                            </p>
                                                        </Tag>
                                                    </p>
                                                    <div className='pb-2' style={{ display: 'flex', alignItems: 'center' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                                        </svg>
                                                        <p style={{ marginLeft: '0.5rem' }}>
                                                            {item.bookingCustomerName}
                                                        </p>
                                                    </div>
                                                    <div className='pb-2' style={{ display: 'flex', alignItems: 'center' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            height="1em"
                                                            viewBox="0 0 512 512">
                                                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                                        </svg>
                                                        <p style={{ marginLeft: '0.5rem' }}>{item.bookingCustomerPhone}</p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            height="1em"
                                                            viewBox="0 0 512 512">
                                                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                                        </svg>
                                                        <p style={{ marginLeft: '0.5rem' }}>{item.bookingCustomerEmail == null ? 'Không có email' : item.bookingCustomerEmail}</p>
                                                    </div>
                                                </Col>


                                                <Col className="gutter-row pt-2" span={12}>
                                                    <p className='font-semibold'>Chi tiết</p>


                                                    {
                                                        item.bookingDetailCheckInOutTodayResponseDtos.map((detail) => (
                                                            <p key={detail.homestayId} className='border-l-2 border-black py-1 px-5' style={{ textAlign: 'left', marginLeft: 0 }}>{detail.homestayCode} | {detail.roomTypeName} - <strong>{detail.roomName}</strong> {detail.isDorm ? (<strong>({detail.totalSlot} slots)</strong>) : ''}</p>
                                                        ))
                                                    }


                                                </Col>
                                            </Row>
                                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col className="gutter-row pt-2" span={12}>
                                                    <div className="flex justify-start">
                                                        <button
                                                            onClick={() => handleCheckIn(item.bookingCode)}
                                                            className="bg-blue-500 text-white py-2 px-3 rounded-md shadow-md text-sm">
                                                            Check-in tất cả
                                                        </button>
                                                    </div>
                                                </Col>
                                                <Col className="gutter-row pt-6" span={12}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                        <Link href={`/manager/check-in-check-out-today/${item.bookingCode}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" fill='orange'>
                                                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Row>
                                ))
                        }


                    </Card >
                </Col >


                <Col className="gutter-row" span={12}>
                    <Card style={{ width: '100%', textAlign: 'center' }}>
                        <p className='font-semibold text-xl'>CHECK-OUT</p>



                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='pt-8'>
                            {/* <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <label
                                    htmlFor='Date'
                                    className='block absolute text-sm z-50 -top-3 left-5 bg-white px-2 text-gray-500'
                                >
                                    Homestay
                                </label>
                                <div className='w-full h-full'>
                                    <select
                                        onChange={handleDropdownChange}
                                        className="w-full h-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent">
                                        <option value="all">Tất cả các homestay</option>
                                        {listHomestay?.map((item) => {
                                            return (
                                                <option key={item.homestayId} value={item.homestayCode}>
                                                    {item.homestayCode}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </Col> */}
                            <Col xs={2} sm={4} md={6} lg={8} xl={20}>
                                <label
                                    htmlFor='Date'
                                    className='block absolute text-sm z-50 -top-3 left-5 bg-white px-2 text-gray-500'
                                >
                                    Ngày đi
                                </label>
                                <div className='w-full h-full'>
                                    <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
                                        <DatePicker
                                            onChange={checkoutDate}
                                            name='checkOutDate'
                                            defaultValue={dayjs(checkOutDate).startOf('day')}
                                            style={{ width: '100%', height: '50px' }} className='w-full h-full' />
                                    </Space>


                                </div>
                            </Col>
                            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                                <button
                                    onClick={handleSearchCheckOut}
                                    className='rounded-lg md:h-12 bg-blue-500 text-white h-full w-full py-2 text-sm md:text-base md:py-3'

                                >
                                    <span className='text-xs md:text-base items-center'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="hidden md:inline-block" />
                                    </span>
                                </button>
                            </Col>
                        </Row>

                        {
                            listBookingOut.length === 0 ? (
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='mt-5'>
                                    <Card style={{ width: '100%', border: '1px solid lightgray' }}>
                                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            <Col className="gutter-row pb-2" span={24}>
                                                <p className='pb-3 text-center'>
                                                    Bạn không có khách hàng nào cần check-out hôm nay
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                            ) :
                                listBookingOut.map((item) => (
                                    <Row key={item.bookingCode} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='mt-5'>
                                        <Card style={{ width: '100%', border: '1px solid lightgray' }}>
                                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col className="gutter-row pb-2" span={12}>
                                                    <p className='pb-3' style={{ textAlign: 'left', marginLeft: 0 }}>
                                                        <Tag color='success'>
                                                            <p className='font-semibold'>
                                                                {item.bookingCode}
                                                            </p>
                                                        </Tag>
                                                    </p>
                                                    <div className='pb-2' style={{ display: 'flex', alignItems: 'center' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                                        </svg>
                                                        <p style={{ marginLeft: '0.5rem' }}>
                                                            {item.bookingCustomerName}
                                                        </p>
                                                    </div>
                                                    <div className='pb-2' style={{ display: 'flex', alignItems: 'center' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            height="1em"
                                                            viewBox="0 0 512 512">
                                                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                                        </svg>
                                                        <p style={{ marginLeft: '0.5rem' }}>{item.bookingCustomerPhone}</p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            height="1em"
                                                            viewBox="0 0 512 512">
                                                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                                        </svg>
                                                        <p style={{ marginLeft: '0.5rem' }}>{item.bookingCustomerEmail == null ? 'Không có email' : item.bookingCustomerEmail}</p>
                                                    </div>
                                                </Col>


                                                <Col className="gutter-row pt-2" span={12}>
                                                    <p className='font-semibold'>Chi tiết</p>


                                                    {
                                                        item.bookingDetailCheckInOutTodayResponseDtos.map((detail) => (
                                                            <p key={detail.homestayId} className='border-l-2 border-black py-1 px-5' style={{ textAlign: 'left', marginLeft: 0 }}>{detail.homestayCode} | {detail.roomTypeName} - <strong>{detail.roomName}</strong> {detail.isDorm ? (<strong>({detail.totalSlot} slots)</strong>) : ''}</p>
                                                        ))
                                                    }


                                                </Col>
                                            </Row>
                                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col className="gutter-row pt-2" span={12}>
                                                    <div className="flex justify-start">
                                                        <button
                                                            onClick={() => handleCheckOut(item.bookingCode)}
                                                            className="bg-blue-500 text-white py-2 px-3 rounded-md shadow-md text-sm">
                                                            Check-out tất cả
                                                        </button>
                                                    </div>
                                                </Col>
                                                <Col className="gutter-row pt-6" span={12}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                        <Link href={`/manager/check-in-check-out-today/${item.bookingCode}`}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" fill='orange'>
                                                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                                            </svg>
                                                        </Link>


                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Row>
                                ))
                        }
                    </Card>
                </Col>
            </Row >


        </>
    )
}


