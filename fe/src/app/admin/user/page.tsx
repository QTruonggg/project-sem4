'use client'
import * as React from 'react';
import { IUserType, UserInfoResponseDto } from '@/types/userType';
import userApi from '@/api/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import LoadingPage from '@/Components/common/LoadingPage';
import Pagination from '@/Components/booking/Pagination';
import UserData from '@/Components/admin/user/UserData';
import AddManager from '@/Components/admin/user/AddManagerModal';
import { add } from 'date-fns';
import AddAdmin from '@/Components/admin/user/AddAdmin';

export interface IUserProps {
}


export default function User(props: IUserProps) {
    const { data } = React.useContext(AuthenticationContext);
    const isDataLoaded = React.useRef(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [userData, setUserData] = React.useState<IUserType>();
    const [displayData, setDisplayData] = React.useState<UserInfoResponseDto[]>();
    const [searchData, setSearchData] = React.useState<UserInfoResponseDto[]>();
    const [displayLength, setDisplayLength] = React.useState<number>(0);

    const [selectedRole, setSelectedRole] = React.useState<string>("Tất cả vai trò");

    const [searchValue, setSearchValue] = React.useState<string>("");
    const [changeData, setChangeData] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentSearchPage, setCurrentSearchPage] = React.useState(1);

    const [isAddManagerModalVisible, setAddManagerModalVisible] = React.useState(false);
    const [isAddAdminModalVisible, setAddAdminModalVisible] = React.useState(false);
    const [isDropdownVisible, setDropdownVisible] = React.useState(false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSearchPageChange = (page: number) => {
        setCurrentSearchPage(page);
    };


    const setDisplayList = (role: string) => {

        setCurrentPage(1);
        if (role === "Tất cả vai trò") {
            setDisplayData(userData?.userInfoResponseDto as UserInfoResponseDto[]);
            setDisplayLength(userData?.userInfoResponseDto.length as number);
        } else if (role === "Admin") {
            const adminList = userData?.userInfoResponseDto.filter((user) => (user.role === "ADMIN" || user.role === "SUPER_ADMIN"));
            setDisplayData(adminList as UserInfoResponseDto[]);
            setDisplayLength(adminList?.length as number);
        } else if (role === "Quản lý") {
            const managerList = userData?.userInfoResponseDto.filter((user) => user.role === "MANAGER");
            setDisplayData(managerList as UserInfoResponseDto[]);
            setDisplayLength(managerList?.length as number);
        } else if (role === "Khách hàng") {
            const customerList = userData?.userInfoResponseDto.filter((user) => user.role === "CUSTOMER");
            setDisplayData(customerList as UserInfoResponseDto[]);
            setDisplayLength(customerList?.length as number);
        }
        setSelectedRole(role);

    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement> | string) => {
        const searchValue = typeof e === "string" ? e : e.target.value;
        setSearchValue(searchValue);
        if (searchValue === "") {
            setSearchData(undefined);
            setCurrentSearchPage(1);
        } else {
            const searchResult = displayData?.filter((user) => {
                return (
                    user.firstName.concat(" "+user.lastName).toLowerCase().includes(searchValue.toLowerCase())
                    || user.email.toLowerCase().includes(searchValue.toLowerCase()))
            });
            setSearchData(searchResult);
            setCurrentSearchPage(1);
        }
    }


    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = displayData?.slice(startIndex, endIndex);
    const currentSearchData = searchData?.slice(startIndex, endIndex);

    React.useEffect(() => {
        setLoading(true);
        userApi.getAllUser().then((res) => {
            setUserData(res);
            setDisplayData(res?.userInfoResponseDto);
            setDisplayLength(res?.userInfoResponseDto.length);
            console.log(data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            isDataLoaded.current = true;
            setLoading(false);
        }
        );
        setDisplayList(selectedRole);
        handleSearch(searchValue);

    }, [changeData]);


    React.useEffect(() => {
        if (isDataLoaded.current) {
            handleSearch(searchValue);
            setDisplayList(selectedRole);
        }

    }, [displayData, displayLength, searchValue]);


    return (
        <div className='w-11/12 mx-auto'>
            {loading && <LoadingPage />}
            <p className='text-2xl font-bold my-4'>Quản lý người dùng</p>

            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-5'>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                            </svg>
                        </span>
                        <input type="text"
                            onChange={handleSearch}
                            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tìm kiếm" />
                    </div>
                </div>


                <div className='col-span-7 grid grid-cols-3 gap-6'>
                    <button
                        onClick={() => setAddManagerModalVisible(true)}
                        {...(userData?.householdName && userData?.householdName.length > 0) ? {} : { disabled: true }}
                        className={`p-2 rounded-lg bg-blue-500 ${(userData?.householdName && userData?.householdName.length > 0) ? " hover:bg-opacity-50 text-white" : "border-gray-300 bg-gray-100 text-gray-300 border cursor-not-allowed"} font-bold`}>
                        Tạo tài khoản quản lý <FontAwesomeIcon icon={faPlus} />
                    </button>

                    <button
                        onClick={() => setAddAdminModalVisible(true)}
                        {...data?.role === "SUPER_ADMIN" ? {} : { disabled: true }}
                        className={`p-2 rounded-lg ${data?.role === "SUPER_ADMIN" ?  "bg-yellow-500 hover:bg-opacity-50 text-white":"border-gray-300 bg-gray-100 text-gray-300 border cursor-not-allowed"}  font-bold`}>
                        Tạo tài khoản Admin <FontAwesomeIcon icon={faPlus} />
                    </button>

                    <div className='relative'>
                        <button
                            className="w-full justify-around text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => setDropdownVisible(!isDropdownVisible)}
                        >
                            Lọc theo: {selectedRole}
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {isDropdownVisible && (
                            <div className="z-10 bg-white divide-y absolute mt-2 divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul className="text-sm text-gray-700 dark:text-gray-200">
                                    <li className="py-2 hover:bg-gray-100 px-2">
                                        <p onClick={() => {
                                            setDropdownVisible(false)
                                            setDisplayList("Tất cả vai trò")
                                        }}>Tất cả vai trò</p>
                                    </li>
                                    {data?.role === "SUPER_ADMIN" && <li className="py-2 hover:bg-gray-100 px-2">
                                        <p onClick={() => {
                                            setDropdownVisible(false)
                                            setDisplayList("Admin")
                                        }}>Admin</p>
                                    </li>}
                                    <li className="py-2 hover:bg-gray-100 px-2">
                                        <p onClick={() => {
                                            setDropdownVisible(false)
                                            setDisplayList("Quản lý")
                                        }}>Quản lý</p>
                                    </li>
                                    <li className="py-2 hover:bg-gray-100 px-2">
                                        <p onClick={() => {
                                            setDropdownVisible(false)
                                            setDisplayList("Khách hàng")
                                        }}>Khách hàng</p>
                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className='col-span-3 rounded-lg border border-gray-300 p-4'>
                    <p className='mb-2 text-sm text-gray-600'>Admin</p>
                    <p className='text-lg font-bold'>{userData?.numberOfAdmin}</p>
                </div>
                <div className='col-span-3 rounded-lg border border-gray-300 p-4'>
                    <p className='mb-2 text-sm text-gray-600'>Quản lý</p>
                    <p className='text-lg font-bold'>{userData?.numberOfManager}</p>
                </div>
                <div className='col-span-3 rounded-lg border border-gray-300 p-4'>
                    <p className='mb-2 text-sm text-gray-600'>Khách hàng</p>
                    <p className='text-lg font-bold'>{userData?.numberOfCustomer}</p>
                </div>
                <div className='col-span-3 rounded-lg border border-gray-300 p-4'>
                    <p className='mb-2 text-sm text-gray-600'>Tổng số người dùng hệ thống</p>
                    <p className='text-lg font-bold'>
                        {(userData?.numberOfAdmin || 0)
                            + (userData?.numberOfManager || 0)
                            + (userData?.numberOfCustomer || 0)}</p>
                </div>
            </div>

            <div className='mt-8'>
                <p className='p-4'>
                    <span className='text-lg font-bold'>Danh sách người dùng</span>
                </p>
                <div className="rounded-xl overflow-hidden border-2 border-gray-300 mb-3">

                    <table className="w-full">
                        <thead className=" text-gray-700 bg-white">
                            <tr>
                                <th scope="col" className="px-2 py-2  bg-gray-300 text-center">
                                    Tên người dùng
                                </th>
                                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                    Vai trò
                                </th>
                                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                    Ngày tạo tài khoản
                                </th>
                                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                    Thông tin thêm
                                </th>
                                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchData && (
                                currentSearchData?.map((user, index) => (
                                    <UserData key={index} user={user} change={changeData} setChange={setChangeData} />
                                ))
                            )}
                            {!searchData && (!displayData ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-xl py-2">
                                        Không có dữ liệu để hiển thị
                                    </td>
                                </tr>

                            ) : (
                                currentData ? (currentData?.map((user, index) => (
                                    <UserData key={index} user={user} change={changeData} setChange={setChangeData} />
                                ))) :
                                    (
                                        <tr>
                                            <td colSpan={6} className="text-center text-xl py-2">
                                                Không có dữ liệu để hiển thị
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center text-center mb-8">
                    {!searchData && (<Pagination
                        currentPage={currentPage}
                        totalItems={displayLength}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    )}
                    {searchData && (
                        <Pagination
                            currentPage={currentSearchPage}
                            totalItems={searchData?.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handleSearchPageChange}
                        />
                    )}
                </div>
            </div>

            {isAddManagerModalVisible && (
                <AddManager change={changeData} setChange={setChangeData} householdName={userData?.householdName} onCancel={() => setAddManagerModalVisible(false)} />
            )}
            {isAddAdminModalVisible && (
                <AddAdmin change={changeData} setChange={setChangeData} onCancel={() => setAddAdminModalVisible(false)} />
            )}
        </div>
    );
}


