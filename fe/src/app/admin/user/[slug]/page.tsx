'use client';
import PopConfirm from '@/Components/admin/user/PopConfirm';
import Pagination from '@/Components/booking/Pagination';
import LoadingPage from '@/Components/common/LoadingPage';
import userApi from '@/api/userApi';
import { IUserDetailType } from '@/types/userType';
import { faCircleXmark, faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface IUserDetailProps {
    params: { slug: string };
}

export default function UserDetail({
    params,
}: IUserDetailProps) {
    const router = useRouter();

    const [user, setUser] = React.useState<IUserDetailType>();
    const [loading, setLoading] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const [isChangingUserStatus, setIsChangingUserStatus] = React.useState(false);
    const [isDeletingUser, setIsDeletingUser] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = user?.bookingOfCustomer?.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleMouseEnter = (message: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setShowTooltip(true);
        setTooltipMessage(message);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const getUserData = async () => {
        setLoading(true);
        await userApi.getUserDetail(Number(params.slug))
            .then((res) => {
                setUser(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }
    React.useEffect(() => {
        getUserData()
    },[params.slug]);

    const convertRole = (role: string) => {
        if (role === "SUPER_ADMIN") {
            return <p className='px-2 py-1 rounded-xl bg-[#B00505]'>Super admin</p>
        } else if (role === "ADMIN") {
            return <p className='px-2 py-1 rounded-xl bg-yellow-500'>Admin</p>
        } else if (role === "MANAGER") {
            return <p className='px-2 py-1 rounded-xl bg-blue-500'>Quản lý</p>
        } else if (role === "CUSTOMER") {
            return <p className='px-2 py-1 rounded-xl bg-[#059669]'>Khách hàng</p>
        }
    }

    const convertBookingStatus = (status: string) => {
        if (status === "CHECK_IN") {
            return <p className='px-2 py-1 text-white rounded-xl bg-yellow-500'>ĐANG DIỄN RA</p>
        } else if (status === "BOOKED") {
            return <p className='px-2 py-1 text-white rounded-xl bg-blue-500'>ĐÃ ĐẶT PHÒNG</p>
        } else if (status === "CANCELLED") {
            return <p className='px-2 py-1 text-white rounded-xl bg-[#B00505]'>ĐÃ HỦY</p>
        } else if (status === "CHECKED_OUT") {
            return <p className='px-2 py-1 text-white rounded-xl bg-[#059669]'>HOÀN THÀNH </p>
        }
    }

    const convertDate = (date: string) => {
        const parts = date.split('-');

        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    const convertPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const handleChangeUserStatus = async () => {
        setLoading(true);
        await userApi.changeUserActiveStatus(Number(params.slug))
            .then((res) => {
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
        getUserData();
    }

    const handleDeleteUser = async () => {
        setLoading(true);
        await userApi.deleteUser(Number(params.slug))
            .then((res) => {
                router.push('/admin/user');
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }


    return (
        <div className='w-11/12 mx-auto'>
            {loading && <LoadingPage />}
            <div className='flex my-5'>
                <p onClick={() => {
                    setLoading(true);
                    router.push("admin/user")
                }}
                className='cursor-pointer'>Quản lý người dùng</p>
                <p className='mx-2'>/</p>
                <p>Thông tin chi tiết</p>
            </div>

            <div className='grid grid-cols-3 gap-5'>
                <div className='col-span-1 rounded-lg border-gray-100 border shadow-lg'>
                    <div className='flex flex-col'>
                        <div className='m-auto pt-10 pb-5'>
                            <Image width={1000} height={1000} src={user?.userDetail.avatar || '/images/avt.png'} alt="" className='w-40 h-40 m-auto rounded-md' />
                            <p className='text-xl font-bold mt-5'>{user?.userDetail.firstName + " " + user?.userDetail.lastName}</p>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className='text-center px-6'>
                                <p className='text-sm text-gray-500 mb-2'>Vai trò</p>
                                <div className='text-white text-sm'>
                                    {user?.userDetail.role ? convertRole(user?.userDetail.role) : ""}
                                </div>
                            </div>
                            <div className='text-center px-6'>
                                <p className='text-sm text-gray-500 mb-2'>Trạng thái</p>
                                <div className='text-white'>
                                    {user?.userDetail.status === "ACTIVE" ? (
                                        <p className="px-2 py-1 text-sm rounded-xl bg-[#00AD6F]">Đang hoạt động</p>
                                    ) : (
                                        <p className="px-2 py-1 text-sm rounded-xl bg-[#B00505]">Dừng hoạt động</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='p-6'>
                            <p className='text-xl font-semibold'>Thông tin chi tiết</p>
                            <div className='border-b-2 my-5 border-gray-300 w-full'></div>

                            <div className='flex flex-col'>
                                <div className='flex items-center'>
                                    <p className='font-semibold'>Họ và tên đệm: </p>
                                    <p className='ml-2 text-gray-500'>{user?.userDetail.firstName}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-semibold'>Tên: </p>
                                    <p className='ml-2 text-gray-500'>{user?.userDetail.lastName}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-semibold'>Email: </p>
                                    <p className='ml-2 text-gray-500'>{user?.userDetail.email}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-semibold'>Giới tính: </p>
                                    <p className='ml-2 text-gray-500'>{user?.userDetail.gender ? (user?.userDetail.gender === 'MALE' ? "Nam" : "Nữ") : ""}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-semibold'>Ngày sinh: </p>
                                    <p className='ml-2 text-gray-500'>{user?.userDetail.dateOfBirth ? convertDate(user?.userDetail.dateOfBirth) : ""}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-semibold'>Số điện thoại: </p>
                                    <p className='ml-2 text-gray-500'>{user?.userDetail.phoneNumber ? user?.userDetail.phoneNumber : ''}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-semibold'>Địa chỉ: </p>
                                    <p className='ml-2 text-gray-500'>{user?.userDetail.address ? user?.userDetail.address : ''}</p>
                                </div>
                            </div>

                            <div className='flex justify-evenly my-5'>
                                {user?.userDetail.status === 'ACTIVE' && (
                                    <FontAwesomeIcon
                                        onClick={() => setIsChangingUserStatus(true)}
                                        onMouseEnter={(event) => handleMouseEnter('Dừng hoạt động', event)}
                                        onMouseLeave={handleMouseLeave}
                                        className='text-3xl text-orange-500 hover:text-opacity-50' icon={faCircleXmark} />
                                )}
                                {user?.userDetail.status !== 'ACTIVE' && (
                                    <FontAwesomeIcon
                                        onClick={() => setIsChangingUserStatus(true)}
                                        onMouseEnter={(event) => handleMouseEnter('Cho phép hoạt động', event)}
                                        onMouseLeave={handleMouseLeave}
                                        className='text-3xl text-green-500 hover:text-opacity-50' icon={faCircleCheck} />
                                )}
                                {isChangingUserStatus && (
                                    <PopConfirm title={'Thay đổi trạng thái'}
                                        message={'Bạn có chắc chắn muốn thay đổi trạng thái của tài khoản này?'}
                                        onConfirm={handleChangeUserStatus}
                                        onCancel={() => setIsChangingUserStatus(false)} />
                                )}
                                <FontAwesomeIcon
                                    onClick={() => setIsDeletingUser(true)}
                                    onMouseEnter={(event) => handleMouseEnter('Xóa', event)}
                                    onMouseLeave={handleMouseLeave}
                                    className='text-3xl text-red-500 hover:text-opacity-50' icon={faTrashCan} />

                                {isDeletingUser && (
                                    <PopConfirm title={'Xóa tài khoản'}
                                        message={'Bạn có chắc chắn muốn xóa tài khoản này?'}
                                        onConfirm={handleDeleteUser}
                                        onCancel={() => setIsDeletingUser(false)} />
                                )}
                                {showTooltip && (
                                    <div
                                        className='absolute bg-white text-gray-800 px-2 py-1 rounded shadow-md opacity-100 transition-opacity'
                                        style={{ top: tooltipPosition.y, left: tooltipPosition.x + 10 }}
                                    >
                                        {tooltipMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {user?.userDetail.role !== 'ADMIN' &&
                    (<div className='col-span-2 rounded-lg border-gray-100 border shadow-lg'>
                        {user?.userDetail.role === 'CUSTOMER' &&
                            (
                                <div className='px-4'>
                                    <p className='text-2xl mb-5 font-semibold'>Lịch sử đặt phòng</p>

                                    <div className="rounded-xl overflow-hidden border border-gray-300 mb-3">

                                        <table className="w-full text-sm">
                                            <thead className=" text-gray-700 bg-white uppercase">
                                                <tr>
                                                    <th scope="col" className="px-2 py-2  bg-gray-100 text-center">
                                                        Mã đơn đặt phòng
                                                    </th>
                                                    <th scope="col" className="px-2 py-2 bg-gray-100 text-center">
                                                        NGÀY ĐẾN / NGÀY ĐI
                                                    </th>
                                                    <th scope="col" className="px-2 py-2 bg-gray-100 text-center">
                                                        Số khách / SỐ ĐÊM
                                                    </th>
                                                    <th scope="col" className="px-2 py-2 bg-gray-100 text-center">
                                                        Tổng SỐ Tiền
                                                    </th>
                                                    <th scope="col" className="px-2 py-2 bg-gray-100 text-center">
                                                        Trạng thái
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData?.map((bookingHistory, index) => (
                                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                                        <td className="px-2 py-2 text-center">
                                                            <p className="font-semibold">{bookingHistory?.bookingCode}</p>
                                                        </td>
                                                        <td className="px-2 py-2 text-center">
                                                            <p className="font-semibold">{convertDate(bookingHistory?.checkInDate)} / {convertDate(bookingHistory?.checkOutDate)}</p>
                                                        </td>
                                                        <td className="px-2 py-2 text-center">
                                                            <p className="font-semibold">{bookingHistory?.numberOfGuest} / {bookingHistory?.numberOfNight}</p>
                                                        </td>
                                                        <td className="px-2 py-2 text-center">
                                                            <p className="font-semibold">{convertPrice(bookingHistory?.totalAmount)}</p>
                                                        </td>
                                                        <td className="px-2 py-2 text-center">
                                                            <p className="font-semibold">{convertBookingStatus(bookingHistory?.bookingStatus)}</p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-center text-center mb-8">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalItems={user?.bookingOfCustomer?.length || 0}
                                            itemsPerPage={itemsPerPage}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            )}

                        {user?.userDetail.role === 'MANAGER' &&
                            (
                                <div className='px-4'>
                                    <p className='text-2xl my-5 font-semibold'>Thông tin hộ kinh doanh quản lý</p>

                                    <div className='grid grid-cols-10'>
                                        <div className='col-span-4 p-3'>
                                            <Image height={1000} width={1000} src={user.householdInfo?.householdAvatar || "/images/LuaTrai.jpg"} alt=""
                                                className='w-full aspect-square rounded-xl' />
                                        </div>
                                        <div className='col-span-6 p-3'>
                                            
                                            <div className='flex text-lg font-bold'>
                                                <p className=''>Tên hộ kinh doanh: </p>
                                                <p className='ml-2'>{user.householdInfo?.householdName}</p>
                                            </div>
                                            <div className='flex items-center text-sm text-opacity-75'>
                                                <p className='font-semibold'>Trạng thái: </p>
                                                <p className='ml-2 text-gray-500'>{user.householdInfo?.householdStatus === 'ACTIVE'? 'Đang hoạt động':'Dừng hoạt động'}</p>
                                            </div>
                                            <p className='mt-5 text-lg font-bold'>Thông tin liên hệ</p>
                                            <div className='flex items-center text-sm text-opacity-75'>
                                                <p className='font-semibold'>Số điện thoại: </p>
                                                <p className='ml-2 text-gray-500'>{user.householdInfo?.householdPhone1} | {user.householdInfo?.householdPhone2}</p>
                                            </div>
                                            <div className='flex items-center text-sm text-opacity-75'>
                                                <p className='font-semibold'>Email: </p>
                                                <p className='ml-2 text-gray-500'>{user.householdInfo?.householdEmail}</p>
                                            </div>

                                            <p className='mt-5 text-lg font-bold'>Homestay: </p>
                                            <div className='text-sm'>
                                                {user.householdInfo?.homestayCode.map((homestay, index) => (
                                                    <p key={index} className='text-gray-500'>Homestay {homestay}</p>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                    )}
            </div>
        </div>
    );
}
