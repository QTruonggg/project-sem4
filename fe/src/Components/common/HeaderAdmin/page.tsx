import * as React from 'react';
import authApi from '@/api/authApi';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
export interface IHeaderAdminProps {
}

export default function HeaderAdmin(props: IHeaderAdminProps) {
    const { data, setAuthState } = useContext(AuthenticationContext);
    React.useEffect(() => {
        (async () => {
            try {
                let res = await authApi.getCurrentUserAdmin();
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
            <Menu.Item>
                <Link href="/admin/profile">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Quản lý tài khoản</span>
                </Link>
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Đăng xuất
            </Menu.Item>
        </Menu>
    )
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
            <div className="mr-10 flex items-center">
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
