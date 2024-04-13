import LoadingPage from '@/Components/common/LoadingPage';
import PopConfirm from '@/Components/admin/user/PopConfirm';
import userApi from '@/api/userApi';
import { UserInfoResponseDto } from '@/types/userType';
import { faCircleCheck, faCircleInfo, faCircleXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SuccessModal from '@/Components/CustomField/SuccessModal';

export interface IUserDataProps {
    user: UserInfoResponseDto;
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserData({
    user,
    change,
    setChange,
}: IUserDataProps) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const [isChangingUserStatus, setIsChangingUserStatus] = React.useState(false);
    const [isDeletingUser, setIsDeletingUser] = React.useState(false);
    const [changeUserStatus, setChangeUserStatus] = React.useState(false);
    const [deleteUser, setDeleteUser] = React.useState(false);

    const handleMouseEnter = (message: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setShowTooltip(true);
        setTooltipMessage(message);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const convertDate = (date: string) => {
        const parts = date.split('T');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${timeParts[0]}:${timeParts[1]}`;
    }

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

    const handleChangeUserStatus = async () => {
        setLoading(true);
        await userApi.changeUserActiveStatus(user.accountId)
            .then((res) => {
                setChangeUserStatus(true);
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }

    const handleDeleteUser = async () => {
        setLoading(true);
        await userApi.deleteUser(user.accountId)
            .then((res) => {
                setDeleteUser(true);
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }




    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {loading && <LoadingPage />}
            <td className="border border-gray-300 px-2 py-2">
                <div className='flex'>
                    <div>
                        <Image width={1000} height={1000} className='w-10 h-10 rounded-full' src={user.avatar || '/images/avt.png'} alt="" />
                    </div>
                    <div className='ml-2'>
                        <p className='font-bold'>{user.firstName + " " + user.lastName}</p>
                        <p className='text-sm text-gray-500'>{user.email}</p>
                    </div>
                </div>
            </td>
            <td className="border text-center border-gray-300 px-2 py-2">
                <div className='text-white'>
                    {convertRole(user.role)}
                </div>
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {user.createdDate ? convertDate(user.createdDate) : ""}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {user.houseHoldName ? user.houseHoldName : ""}
            </td>
            <td className="border border-gray-300 text-center px-2 py-2">
                <div className='text-white'>
                    {user.status === "ACTIVE" ? (
                        <p className="px-2 py-1 rounded-xl bg-[#00AD6F]">Đang hoạt động</p>
                    ) : (
                        <p className="px-2 py-1 rounded-xl bg-[#B00505]">Dừng hoạt động</p>
                    )}
                </div>
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {!(user.role === 'SUPER_ADMIN') && (
                    <div className='flex justify-around'>
                        <FontAwesomeIcon
                            onClick={() => {
                                setLoading(true);
                                router.push(`/admin/user/${user.accountId}`)
                            }}
                            onMouseEnter={(event) => handleMouseEnter('Chi tiết', event)}
                            onMouseLeave={handleMouseLeave}
                            className='text-xl m-1 hover:text-gray-300' icon={faCircleInfo} />

                        {user.status === 'ACTIVE' && (
                            <FontAwesomeIcon
                                onClick={() => setIsChangingUserStatus(true)}
                                onMouseEnter={(event) => handleMouseEnter('Dừng hoạt động', event)}
                                onMouseLeave={handleMouseLeave}
                                className='text-xl m-1 hover:text-gray-300' icon={faCircleXmark} />
                        )}
                        {user.status !== 'ACTIVE' && (
                            <FontAwesomeIcon
                                onClick={() => setIsChangingUserStatus(true)}
                                onMouseEnter={(event) => handleMouseEnter('Cho phép hoạt động', event)}
                                onMouseLeave={handleMouseLeave}
                                className='text-xl m-1 hover:text-gray-300' icon={faCircleCheck} />
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
                            className='text-xl m-1 hover:text-gray-300' icon={faTrashCan} />

                        {isDeletingUser && (
                            <PopConfirm title={'Xóa tài khoản'}
                                message={'Bạn có chắc chắn muốn xóa tài khoản này?'}
                                onConfirm={handleDeleteUser}
                                onCancel={() => setIsDeletingUser(false)} />
                        )}
                    </div>
                )}
                {showTooltip && (
                    <div
                        className='absolute bg-white text-gray-800 px-2 py-1 rounded shadow-md opacity-100 transition-opacity'
                        style={{ top: tooltipPosition.y, left: tooltipPosition.x + 10 }}
                    >
                        {tooltipMessage}
                    </div>
                )}
                <SuccessModal
                    isVisible={changeUserStatus}
                    onClose={()=>{
                        setChangeUserStatus(false);
                        setChange(!change);
                    }}
                    message={'Thay đổi trạng thái người dùng thành công'} />
                <SuccessModal
                    isVisible={deleteUser}
                    onClose={()=>{
                        setDeleteUser(false);
                        setChange(!change);
                    }}
                    message={'Xóa người dùng thành công'} />
            </td>
        </tr>
    );
}
