import * as React from 'react';
import authApi from '@/api/authApi';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { faUser, faBook, faWallet, faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Dropdown, Menu, MenuProps, Space, Tag } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { da, el, id } from 'date-fns/locale';
import notificationApi from '@/api/notificationApi';
import { set } from 'date-fns';
import { INotification } from '@/types/notificationType';

export interface IHeaderManagerProps {
}

export default function HeaderManager(props: IHeaderManagerProps) {
    const { data, setAuthState } = useContext(AuthenticationContext);
    React.useEffect(() => {
        (async () => {
            try {
                let res = await authApi.getCurrentUserManager();
                setAuthState({
                    loading: false,
                    error: null,
                    data: { ...res },
                });
            } catch (error) {
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const router = useRouter();
    const handleLogout = async () => {
        try {
            await authApi.logout;

            // Đặt lại trạng thái xác thực (authentication state) của ứng dụng
            setAuthState({
                loading: false,
                error: null,
                data: null,
            });

            // Xóa token từ localStorage (nếu bạn sử dụng localStorage để lưu token)
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_role');
            sessionStorage.removeItem('isBooking');
            sessionStorage.removeItem('selectedHousehold');
            // Điều hướng về trang chủ
            router.push('/auth/login');
        } catch (error) {
            console.log(error);
        }
    };


    const dropdownMenu = (
        <Menu>
            <Menu.Item onClick={() => {
                router.push('/manager/profile')
            }}>
                <FontAwesomeIcon icon={faUser} />
                <span>Quản lý tài khoản</span>
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Đăng xuất
            </Menu.Item>
        </Menu>
    )
    //INotification
    const [latestNotifications, setLatestNotifications] = React.useState<INotification[]>([]);

    // const [latestNotifications, setLatestNotifications] = React.useState<{ content: JSX.Element; key: number }[]>([]);
    let unreadNotifications = [];

    // const handleReaded = (key: number) => {
    //     // Tìm kiếm thông báo có key trùng với key của thông báo được click
    //     const notification = latestNotifications.find((item) => item.key === key);

    //     // Tìm thấy thì xem notification đó là loại nào
    //     if (notification) {
    //         const content = notification.content;
    //         const type = content.props.children[0].id;

    //         console.log(content)
    //     }
    //     // setNewNotifications((prevCount) => prevCount - 1);
    //     // notificationApi.readNotification(key).then((res) => {
    //     //     if(res.status === 200) {

    //     //     }
    //     // });
    // };

    const handleReaded = (notificationId: number) => {
        // Tìm kiếm thông báo có key trùng với key của thông báo được click
        const notification = latestNotifications.find((item) => item.id === notificationId);

        // Tìm thấy thì xem notification đó là loại nào
        if (notification) {
            const bookingCode = notification.bookingCode;
            const type = notification.type;

            notificationApi.readNotification(notificationId).then((res) => {
                setNewNotifications((prevCount) => prevCount - 1);
                setLatestNotifications((prevNotifications) => prevNotifications.filter((item) => item.id !== notificationId));
                if (type === 'BOOKING_SUCCESS') {
                    router.push(`/manager/booking-management/view-booking-detail/${bookingCode}`);
                } else if (type === 'BOOKING_CANCEL') {
                    router.push(`/manager/booking-management/view-booking-detail/${bookingCode}`);
                } else if (type === 'REQUEST_RESULT') {
                    router.push(`/manager/request-processing`);
                }

            });
        }
    };
    const reversedNotifications = [...latestNotifications].reverse();

    // const items: MenuProps['items'] = reversedNotifications.map((n) => {
    //     return {
    //         label: n.content,
    //         key: n.key,
    //         onClick: () => handleReaded(n.key)
    //     };
    // });
    const items: MenuProps['items'] = reversedNotifications.map((n) => {
        return {
            label: n.content,
            key: n.id,
            onClick: () => handleReaded(n.id)
        };
    });

    // const dropdownNotification = (
    //     <Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
    //         {latestNotifications.map(item => (
    //             <Menu.Item onClick={() => handleReaded(item.key)} key={item.key} style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    //                 {item.content}
    //             </Menu.Item>
    //         ))}
    //     </Menu>
    // );
    const dropdownNotification = (
        <Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {latestNotifications.map(item => (
                <Menu.Item onClick={() => handleReaded(item.id)} key={item.id} style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {item.content}
                </Menu.Item>
            ))}
        </Menu>
    );

    const [newNotifications, setNewNotifications] = React.useState(0);
    const [showDropdown, setShowDropdown] = React.useState(false);

    // const isNotificationExist = (notification: any) => {
    //     return latestNotifications.some((item) => item.key === notification.id);
    // };
    const isNotificationExist = (notification: any) => {
        return latestNotifications.some((item) => item.id === notification.id);
    };

    const handleNewMessage = (message: any) => {
        if (!isNotificationExist(message)) {
            console.log(message.type);

            if (message.type === 'BOOKING_SUCCESS') {
                const content = JSON.parse(message.content);

                const id = message.id;
                const title = content.title;
                const customerName = content.customerName;
                const totalGuest = content.totalGuest;
                const checkInDate = content.checkInDate;
                const checkOutDate = content.checkOutDate;
                const bookingCode = content?.bookingCode;
                const isRead = message.isRead;

                const newNotification = (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                        <div style={{ flexGrow: 1 }}>
                            <Tag color="green" style={{ fontWeight: 'bold' }}>{title}</Tag>
                            <p>
                                Khách hàng <strong>{customerName}</strong> đã đặt <br />
                                phòng thành công cho <strong>{totalGuest}</strong> khách lưu trú <br />
                                từ <strong>{checkInDate}</strong> đến <strong>{checkOutDate}</strong>.
                            </p>
                        </div>
                        {
                            !isRead && (
                                <svg style={{ flexShrink: 0, fontSize: '10px', fill: 'blue' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                </svg>
                            )
                        }
                    </div>
                    // <div style={{ display: 'flex', alignItems: 'center' }}>
                    //     <div style={{ marginRight: '20px' }}>
                    //         <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="green">
                    //             <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    //         </svg>
                    //     </div>
                    //     <div id={id}>
                    //         <Tag color="green" style={{ fontWeight: 'bold' }}>{title}</Tag>
                    //         <p>
                    //             Khách hàng <strong>{customerName}</strong> đã đặt <br />
                    //             phòng thành công cho <strong>{totalGuest}</strong> khách lưu trú <br />
                    //             từ <strong>{checkInDate}</strong> đến <strong>{checkOutDate}</strong>.
                    //         </p>

                    //     </div>
                    //     {
                    //         !message.isRead && (
                    //             <svg style={{ marginLeft: '20px', fontSize: '10px' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='blue'>
                    //                 <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                    //             </svg>
                    //         )
                    //     }

                    // </div>
                );

                setLatestNotifications((prevNotifications) => [
                    ...prevNotifications,
                    { content: newNotification, id: message.id, bookingCode: content.bookingCode, type: message.type }
                ]);

            } else if (message.type === 'BOOKING_CANCEL') {
                const content = JSON.parse(message.content);

                const id = message.id;
                const title = content.title;
                const customerName = content.customerName;
                const bookingCode = content.bookingCode;
                console.log(bookingCode);

                const refundAmount = content.refundAmount;
                const deadlineRefundDate = content.deadlineRefundDate;
                const isRead = message.isRead;

                const newNotificationCancel = (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                        <div style={{ flexGrow: 1 }}>
                            <Tag color="error" style={{ fontWeight: 'bold' }}>{title}</Tag>
                            <p>
                                Khách hàng <strong>{customerName}</strong> đã huỷ thành <br />
                                công đơn đặt phòng <strong>{bookingCode}</strong>. Hãy kiểm <br />
                                tra thông tin và hoàn <strong>{refundAmount?.toLocaleString()} VNĐ</strong> <br />
                                trước <strong>{deadlineRefundDate}</strong>.
                            </p>
                        </div>
                        {
                            !isRead && (
                                <svg style={{ flexShrink: 0, fontSize: '10px', fill: 'blue' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                </svg>
                            )
                        }
                    </div>
                    // <div style={{ display: 'flex', alignItems: 'center' }}>
                    //     <div style={{ marginRight: '20px' }}>
                    //         <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='red'>
                    //             <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                    //         </svg>
                    //     </div>
                    //     <div id={bookingCode}>
                    //         <Tag color="error" style={{ fontWeight: 'bold' }}>{title}</Tag>
                    //         <p>
                    //             Khách hàng <strong>{customerName}</strong> đã huỷ thành <br />
                    //             công đơn đặt phòng <strong>{bookingCode}</strong>. Hãy kiểm tra <br />
                    //             thông tin và hoàn <strong>{refundAmount?.toLocaleString()} VNĐ</strong> <br />
                    //             trước <strong>{deadlineRefundDate}</strong>.
                    //         </p>
                    //     </div>
                    //     {
                    //         !message.isRead && (
                    //             <svg style={{ marginLeft: '20px', fontSize: '10px' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='blue'>
                    //                 <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                    //             </svg>
                    //         )
                    //     }
                    // </div>
                );

                setLatestNotifications((prevNotifications) => [
                    ...prevNotifications,
                    { content: newNotificationCancel, id: message.id, bookingCode: content.bookingCode, type: message.type }
                ]);

            } else if (message.type === 'REQUEST_RESULT') {
                const content = JSON.parse(message.content);

                const id = message.id;
                const title = content.title;
                const householdRoomTypeName = content.householdRoomTypeName;
                const requestStatus = content.requestStatus;
                const isRead = message.isRead;


                switch (requestStatus) {
                    case "APPROVED":
                        const newNotificationApprove = (
                            <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <Tag color="warning" style={{ fontWeight: 'bold' }}>{title}</Tag>
                                    <p>
                                        Yêu cầu cập nhật giá phòng cho <strong>{householdRoomTypeName}</strong> <br />
                                        đã được phê duyệt thành công!
                                    </p>
                                </div>
                                {
                                    !isRead && (
                                        <svg style={{ flexShrink: 0, fontSize: '10px', fill: 'blue' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                        </svg>
                                    )
                                }
                            </div>
                            // <div style={{ display: 'flex', alignItems: 'center' }}>
                            //     <div style={{ marginRight: '20px' }}>
                            //         <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='orange'>
                            //             <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                            //         </svg>
                            //     </div>
                            //     <div>
                            //         <Tag color="warning" style={{ fontWeight: 'bold' }}>{title}</Tag>
                            //         <p>
                            //             Yêu cầu cập nhật giá phòng cho <strong>{householdRoomTypeName}</strong> <br />
                            //             đã được phê duyệt thành công!
                            //         </p>
                            //     </div>
                            //     {
                            //         !message.isRead && (
                            //             <svg style={{ marginLeft: '20px', fontSize: '10px' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='blue'>
                            //                 <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                            //             </svg>
                            //         )
                            //     }
                            // </div>
                        );

                        setLatestNotifications((prevNotifications) => [
                            ...prevNotifications,
                            { content: newNotificationApprove, id: message.id, bookingCode: "", type: message.type }
                        ]);
                        break;
                    case "REJECTED":
                        const newNotificationReject = (
                            // <div style={{ display: 'flex', alignItems: 'center' }}>
                            //     <div style={{ marginRight: '20px' }}>
                            //         <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='orange'>
                            //             <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                            //         </svg>
                            //     </div>
                            //     <div>
                            //         <Tag color="warning" style={{ fontWeight: 'bold' }}>{title}</Tag>
                            //         <p>
                            //             Yêu cầu cập nhật giá phòng cho <strong>{householdRoomTypeName}</strong> <br />
                            //             đã bị từ chối. Vui lòng liên hệ Ban quản trị của V-HomeStay <br />
                            //             để biết thêm thông tin!.
                            //         </p>
                            //     </div>
                            //     {
                            //         !message.isRead && (
                            //             <svg style={{ marginLeft: '20px', fontSize: '10px' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='blue'>
                            //                 <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                            //             </svg>
                            //         )
                            //     }
                            // </div>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <Tag color="warning" style={{ fontWeight: 'bold' }}>{title}</Tag>
                                    <p>
                                        Yêu cầu cập nhật giá phòng cho <strong>{householdRoomTypeName}</strong> <br />
                                        đã bị từ chối. Vui lòng liên hệ Ban quản trị của <br />
                                        V-HomeStay để biết thêm thông tin!.
                                    </p>
                                </div>
                                {
                                    !isRead && (
                                        <svg style={{ flexShrink: 0, fontSize: '10px', fill: 'blue' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                        </svg>
                                    )
                                }
                            </div>
                        );

                        setLatestNotifications((prevNotifications) => [
                            ...prevNotifications,
                            { content: newNotificationReject, id: message.id, bookingCode: "", type: message.type }
                        ]);
                        break;
                }

            }
        };
    }


    React.useEffect(() => {
        const socket = new SockJS('https://api.langhmongpavi.com/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame: any) {

            stompClient.send("/app/get-unread-notifications/" + data?.id, {});


            // Gửi thông báo người dùng online khi kết nối thành công
            stompClient.subscribe('/user/' + data?.id + '/get-unread-notifications', function (message: any) {
                const body = JSON.parse(message.body);

                setNewNotifications(body.length);
                unreadNotifications = body;

                unreadNotifications.forEach((notification: any) => {
                    handleNewMessage(notification);
                });
            })

            stompClient.subscribe('/user/' + data?.id + '/notifications', function (message: any) {
                const body = JSON.parse(message.body);

                console.log(body);

                handleNewMessage(body);
            });

        });

        return () => {

            stompClient.disconnect();
        }
    });

    const handleButtonClick = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <ul className=" border-b-2 font-extrabold text-sm flex flex-wrap items-center justify-between h-20 text-green-900 p-0 mx-auto ">
            <Link href="/home" className="flex-shrink-0 ml-10">
                <Image
                    alt="Map"
                    src="/images/logo_footer.png"
                    width={96}
                    height={0}
                    className="w-16"
                />
            </Link>
            <div className="mr-10 flex items-center overflow-y-auto">
                {
                    latestNotifications.length > 0 ? (
                        <Dropdown
                            overlayStyle={{ maxHeight: '500px', overflowY: 'auto', borderRadius: '10px', border: '1px solid #ccc' }}
                            overlay={dropdownNotification}
                            menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space size={25} style={{ paddingRight: '10px' }}>
                                    <Badge count={newNotifications} >
                                        <BellOutlined style={{ fontSize: '25px' }} />
                                    </Badge>
                                </Space>
                            </a>
                        </Dropdown>
                    ) : (
                        <a onClick={(e) => e.preventDefault()}>
                            <Space size={25} style={{ paddingRight: '10px' }}>
                                <BellOutlined style={{ fontSize: '25px' }} />
                            </Space>
                        </a>
                    )
                }

                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <Image
                            className="inline-block h-12 w-12 rounded-full ring-2 ring-white m-3"
                            src={data?.avatar || '/images/avt.png'}
                            alt="avatar"
                            width={70}
                            height={70}
                        />
                        <span className="font-extrabold">Xin chào, {data?.lastName}</span>
                    </a>
                </Dropdown>
            </div>
        </ul>
    );
}
