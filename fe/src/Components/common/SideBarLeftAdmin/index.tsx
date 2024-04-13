import Link from 'next/link';
import * as React from 'react';

export interface ISideBarLeftAdminProps {
}

export default function SideBarLeftAdmin(props: ISideBarLeftAdminProps) {

    const [dropdownOpenHomestay, setDropdownOpenHomestay] = React.useState(false);

    const toggleDropdownHomestay = () => {
        setDropdownOpenHomestay(!dropdownOpenHomestay);
    };
    const [dropdownOpenService, setDropdownOpenService] = React.useState(false);

    const toggleDropdownService = () => {
        setDropdownOpenService(!dropdownOpenService);
    };

    const [dropdownOpenReport, setDropdownOpenReport] = React.useState(false);

    const toggleDropdownReport = () => {
        setDropdownOpenReport(!dropdownOpenReport);
    };

    const [dropdownOpenBooking, setDropdownOpenBooking] = React.useState(false);
    const [dropdownOpenCommon, setDropdownOpenCommon] = React.useState(false);

    const [dropdownServiceProduct, setDropdownServiceProduct] = React.useState(false);

    const toggleDropdownServiceProduct = () => {
        setDropdownServiceProduct(!dropdownServiceProduct);
    };


    const toggleDropdownCommon = () => {
        setDropdownOpenCommon(!dropdownOpenCommon);
    };


    const toggleDropdownBooking = () => {
        setDropdownOpenBooking(!dropdownOpenBooking);
    };

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setIsExpanded(!isExpanded);
    };


    const [isExpanded, setIsExpanded] = React.useState(true);



    const sidebarWidth = isSidebarOpen ? "w-64" : "w-20";
    return (
        <>
            <div className={`grid grid-rows-[auto,1fr,auto] overflow-y-auto bg-[#001529] duration-300 text-white h-screen ${isExpanded ? 'w-64' : '20'} ${sidebarWidth}`}>
                <div className="py-6 px-4 text-center">
                    Hello
                </div>
                {isExpanded ? (
                    <>
                        <div className='duration-300'>
                            <div className="overflow-y-auto">
                                <ul>
                                    <li>
                                        <Link href="/admin/dashboard" className="flex items-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] hover:text-white group">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 ml-1 w-5 h-5 text-white transition duration-75 "
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M4 4h6v8H4zM4 16h6v4H4zM14 12h6v8h-6zM14 4h6v4h-6z" />
                                            </svg>
                                            <span className="flex-1 ml-2 whitespace-nowrap">Dashboard</span>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="space-y-2">

                                    <li>
                                        <button
                                            className="flex items-center py-3 px-5 hover:bg-[#1677FF] rounded-lg w-full focus:outline-none"
                                            onClick={toggleDropdownCommon}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1.3em"
                                                width="1.3em"

                                            >
                                                <path d="M21 11.1V8c0-1.1-.9-2-2-2h-8L9 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7.2c1.2 1.8 3.4 3 5.8 3 3.9 0 7-3.1 7-7 0-1.9-.8-3.6-2-4.9M9.3 18H3V8h16v1.7c-.9-.5-1.9-.7-3-.7-3.9 0-7 3.1-7 7 0 .7.1 1.4.3 2m6.7 3c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5m1-7h-2v-2h2v2m0 6h-2v-5h2v5z" />
                                            </svg>
                                            Thông tin chung
                                            <svg
                                                className={`ml-auto h-5 w-5 transform ${dropdownOpenCommon ? 'rotate-180' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {dropdownOpenCommon && (
                                            <ul className="pl-4 mt-2 space-y-2 bg-[#000C17]">
                                                <li>
                                                    <Link href="/admin/common-information/village-information" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg  dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className='flex-shrink-0 w-5 h-5  transition duration-75 dark:text-white group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg'
                                                        >
                                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm8.116 12.262a.74.74 0 01-.741-.74c0-.008.005-.016.005-.025l-1.46-1.46a1.31 1.31 0 01-.38-.917V5.731a.285.285 0 00-.284-.283h-.915a.284.284 0 00-.284.283v2.413L12.17 4.383a.284.284 0 00-.4.003L4.438 11.72a.283.283 0 000 .4l.696.697a.286.286 0 00.4 0l5.635-5.552a1.302 1.302 0 011.83.008l5.525 5.525a1.3 1.3 0 010 1.836l-.679.68a1.305 1.305 0 01-1.824.012l-3.876-3.766a.283.283 0 00-.4.004l-3.723 3.74a.285.285 0 000 .4l.687.69a.283.283 0 00.4 0l2.013-1.986a1.302 1.302 0 011.824 0l1.994 1.96.007.007a1.299 1.299 0 010 1.837l-1.985 1.984v.013a.74.74 0 11-.74-.741c.009 0 .016.005.025.005l1.975-1.98a.284.284 0 00.084-.201.28.28 0 00-.085-.2l-1.995-1.96a.285.285 0 00-.4 0l-2.006 1.98a1.3 1.3 0 01-1.83-.004l-.69-.689a1.301 1.301 0 010-1.834l3.72-3.74a1.303 1.303 0 011.826-.016l3.879 3.758a.285.285 0 00.4 0l.679-.679a.285.285 0 000-.4L12.28 7.986a.284.284 0 00-.4 0l-5.637 5.555a1.301 1.301 0 01-1.829-.008l-.698-.694-.002-.003a1.296 1.296 0 01.002-1.834l7.334-7.334a1.305 1.305 0 011.821-.015l2.166 2.097v-.019a1.3 1.3 0 011.299-1.298h.916a1.3 1.3 0 011.298 1.298v3.384a.282.282 0 00.083.2l1.467 1.467h.014a.74.74 0 01.001 1.48z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Thông tin giới thiệu</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/common-information/contact-us" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                            height="1em"
                                                            width="1em"
                                                            className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-white dark:group-hover:text-white"
                                                        >
                                                            <path d="M14.5 3a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h13zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" />
                                                            <path d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Thông tin liên hệ</span>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link href="/admin/common-information/image-library" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg fill="none" viewBox="0 0 24 24" height="1.2em" width="1.2em">
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M7 7a3 3 0 100 6 3 3 0 000-6zm-1 3a1 1 0 112 0 1 1 0 01-2 0z"
                                                                clipRule="evenodd"
                                                            />
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M3 3a3 3 0 00-3 3v12a3 3 0 003 3h18a3 3 0 003-3V6a3 3 0 00-3-3H3zm18 2H3a1 1 0 00-1 1v12a1 1 0 001 1h4.314l6.878-6.879a3 3 0 014.243 0L22 15.686V6a1 1 0 00-1-1zm0 14H10.142l5.465-5.464a1 1 0 011.414 0l4.886 4.886A1 1 0 0121 19z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Thư viện ảnh</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/common-information/frequently-question" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            viewBox="0 0 25 25"
                                                            height="1.5em"
                                                            width="1.5em"

                                                        >
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <path d="M20.136 11.136L12 3l-9 9h2v7a2 2 0 002 2h7" />
                                                            <path d="M9 21v-6a2 2 0 012-2h2c.467 0 .896.16 1.236.428M19 22v.01M19 19a2.003 2.003 0 00.914-3.782 1.98 1.98 0 00-2.414.483" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Câu hỏi thường gặp</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                                <ul className="space-y-2">

                                    <li>
                                        <button
                                            className="flex items-center py-3 px-4 hover:bg-[#1677FF] rounded-lg w-full focus:outline-none"
                                            onClick={toggleDropdownBooking}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1.5em"
                                                width="1.5em"
                                            >
                                                <path d="M17 16h-2v6h-3v-5H8v5H5v-6H3l7-6 7 6M6 2l4 4H9v3H7V6H5v3H3V6H2l4-4m12 1l5 5h-1v4h-3V9h-2v3h-1.66L14 10.87V8h-1l5-5z" />
                                            </svg>
                                            Hộ KD & Homestay
                                            <svg
                                                className={`ml-auto h-5 w-5 transform ${dropdownOpenBooking ? 'rotate-180' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {dropdownOpenBooking && (
                                            <ul className="pl-4 mt-2 space-y-2 bg-[#000C17]">
                                                <li>
                                                    <Link href="/admin/household-homestay/area-management" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg  dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className='flex-shrink-0 w-5 h-5  transition duration-75 dark:text-white group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg'
                                                        >
                                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm8.116 12.262a.74.74 0 01-.741-.74c0-.008.005-.016.005-.025l-1.46-1.46a1.31 1.31 0 01-.38-.917V5.731a.285.285 0 00-.284-.283h-.915a.284.284 0 00-.284.283v2.413L12.17 4.383a.284.284 0 00-.4.003L4.438 11.72a.283.283 0 000 .4l.696.697a.286.286 0 00.4 0l5.635-5.552a1.302 1.302 0 011.83.008l5.525 5.525a1.3 1.3 0 010 1.836l-.679.68a1.305 1.305 0 01-1.824.012l-3.876-3.766a.283.283 0 00-.4.004l-3.723 3.74a.285.285 0 000 .4l.687.69a.283.283 0 00.4 0l2.013-1.986a1.302 1.302 0 011.824 0l1.994 1.96.007.007a1.299 1.299 0 010 1.837l-1.985 1.984v.013a.74.74 0 11-.74-.741c.009 0 .016.005.025.005l1.975-1.98a.284.284 0 00.084-.201.28.28 0 00-.085-.2l-1.995-1.96a.285.285 0 00-.4 0l-2.006 1.98a1.3 1.3 0 01-1.83-.004l-.69-.689a1.301 1.301 0 010-1.834l3.72-3.74a1.303 1.303 0 011.826-.016l3.879 3.758a.285.285 0 00.4 0l.679-.679a.285.285 0 000-.4L12.28 7.986a.284.284 0 00-.4 0l-5.637 5.555a1.301 1.301 0 01-1.829-.008l-.698-.694-.002-.003a1.296 1.296 0 01.002-1.834l7.334-7.334a1.305 1.305 0 011.821-.015l2.166 2.097v-.019a1.3 1.3 0 011.299-1.298h.916a1.3 1.3 0 011.298 1.298v3.384a.282.282 0 00.083.2l1.467 1.467h.014a.74.74 0 01.001 1.48z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Quản lý khu</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/household-homestay/household-management" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                            height="1em"
                                                            width="1em"
                                                            className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-white dark:group-hover:text-white"
                                                        >
                                                            <path d="M14.5 3a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h13zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" />
                                                            <path d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Quản lý hộ kinh doanh</span>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link href="/admin/household-homestay/room-type-management" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 21 21"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className="flex-shrink-0 w-5 h-5  transition group-hover:text-white dark:group-hover:text-white"
                                                        >
                                                            <path d="M10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Loại phòng</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/household-homestay/facility-management" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 1024 1024"
                                                            fill="currentColor"
                                                            height="1.5em"
                                                            width="1.5em"
                                                        >
                                                            <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">CSVC</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/household-homestay/homestay-management" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 21 21"
                                                            fill="currentColor"
                                                            height="2em"
                                                            width="2em"
                                                            className='flex-shrink-0 mr-2 w-5 h-5 text-white transition  group-hover:text-white dark:group-hover:text-white'
                                                        >
                                                            <path d="M17 16h-2v6h-3v-5H8v5H5v-6H3l7-6 7 6M6 2l4 4H9v3H7V6H5v3H3V6H2l4-4m12 1l5 5h-1v4h-3V9h-2v3h-1.66L14 10.87V8h-1l5-5z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Homestay</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/household-homestay/top-household" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            viewBox="0 0 24 24"
                                                            height="1.2em"
                                                            width="1.2em"

                                                        >
                                                            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Top các hộ kinh doanh</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        )}
                                    </li>
                                </ul>


                                <ul className="space-y-2">

                                    <li>
                                        <button
                                            className="flex items-center py-3 px-4 hover:bg-[#1677FF] rounded-lg w-full focus:outline-none"
                                            onClick={toggleDropdownService}
                                        >
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                height="1.4em"
                                                width="1.4em"

                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M8.5 10A1.5 1.5 0 017 8.5a5.5 5.5 0 0111 0V19a2 2 0 01-2 2H9a2 2 0 01-2-2v-2c0-1.38.71-2.444 1.88-3.175l4.424-2.765C14.359 10.4 15 9.744 15 8.5a2.5 2.5 0 10-5 0A1.5 1.5 0 018.5 10z" />
                                            </svg>
                                            Dịch vụ & sản phẩm
                                            <svg
                                                className={`ml-auto h-5 w-5 transform ${dropdownOpenService ? 'rotate-180' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {dropdownOpenService && (
                                            <ul className="pl-4 mt-2 space-y-2 bg-[#000C17]">
                                                <li>
                                                    <Link href="/admin/service" className="flex items-center pl-4 pt-3 pb-3 text-gray-400 hover:text-white rounded-lg  dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="1.5em"
                                                            width="1.5em"
                                                        >
                                                            <path d="M12 5a2 2 0 012 2c0 .24-.04.47-.12.69C17.95 8.5 21 11.91 21 16H3c0-4.09 3.05-7.5 7.12-8.31-.08-.22-.12-.45-.12-.69a2 2 0 012-2m10 14H2v-2h20v2M12 9.5c-3.11 0-5.75 1.89-6.66 4.5h13.32c-.91-2.61-3.55-4.5-6.66-4.5z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Dịch vụ</span>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link href="/admin/service-local-product/local-product" className="flex items-center pl-4 pt-3 pb-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                            height="1.3em"
                                                            width="1.3em"
                                                        >
                                                            <path d="M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464L7.443.184z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Sản phẩm địa phương</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/admin/user" className="flex items-center pl-5 pt-3 pb-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 640 512"
                                                fill="currentColor"
                                                height="1.3em"
                                                width="1.3em"
                                            >
                                                <path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128-57.3 128-128 128zm-45.7 48h91.4c11.8 0 23.4 1.2 34.5 3.3-2.1 18.5 7.4 35.6 21.8 44.8-16.6 10.6-26.7 31.6-20 53.3 4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3 0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8 10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4 7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1.7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4L546.3 442c-6.9 5.1-14.3 9.4-22.3 12.8v30.6c0 7-4.5 13.3-11.3 14.8-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8v-30.6c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3.7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2 3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9v-30.4zm92.1 133.5c0-26.5-21.5-48-48.1-48s-48.1 21.5-48.1 48 21.5 48 48.1 48 48.1-21.5 48.1-48z" />
                                            </svg>
                                            <span className="flex-1 ml-2 whitespace-nowrap">Quản lý người dùng</span>
                                        </Link>
                                    </li>
                                </ul>

                                <ul>
                                    <li>
                                        <Link href="/admin/request-processing" className="flex items-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 22 22"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 ml-1 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h5.697M18 14v4h4M18 11V7a2 2 0 00-2-2h-2" />
                                                <path d="M10 3 H12 A2 2 0 0 1 14 5 V5 A2 2 0 0 1 12 7 H10 A2 2 0 0 1 8 5 V5 A2 2 0 0 1 10 3 z" />
                                                <path d="M22 18 A4 4 0 0 1 18 22 A4 4 0 0 1 14 18 A4 4 0 0 1 22 18 z" />
                                                <path d="M8 11h4M8 15h3" />
                                            </svg>
                                            <span className="flex-1 ml-2 whitespace-nowrap">Xử lý yêu cầu</span>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="space-y-2 pl-1">
                                    <li>
                                        <button
                                            className="flex items-center py-3 px-4 hover:bg-[#1677FF] rounded-lg w-full focus:outline-none"
                                            onClick={toggleDropdownReport}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1.2em"
                                                width="1.2em"

                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.427-3.427A1.75 1.75 0 0111.164 17h9.586a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25H3.25zm-1.75.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.586a.25.25 0 00-.177.073l-3.5 3.5A1.457 1.457 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75V4.25zM12 6a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 0112 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                                />
                                            </svg>
                                            Báo cáo
                                            <svg
                                                className={`ml-auto h-5 w-5 transform ${dropdownOpenReport ? 'rotate-180' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {dropdownOpenReport && (
                                            <ul className="pl-4 mt-2 space-y-2 bg-[#000C17]">
                                                <li>
                                                    <Link href="/admin/report" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg  dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 512 512"
                                                            fill="currentColor"
                                                            height="1.5em"
                                                            width="1.5em"
                                                       
                                                        >
                                                            <path d="M128 496H48V304h80zM352 496h-80V208h80zM464 496h-80V96h80zM240 496h-80V16h80z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Tổng quan</span>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link href="/admin/online-payment-report" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="1.5em"
                                                            width="1.5em"
                                                        >
                                                            <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2M8.43 14.44l-1.36-.61c.28-.56.43-1.16.43-1.78 0-.66-.15-1.29-.43-1.88l1.36-.61c.38.81.57 1.64.57 2.49 0 .75-.19 1.55-.57 2.39m3.1 1.5l-1.31-.65c.53-1.13.78-2.29.78-3.43 0-1.13-.25-2.17-.78-3.15l1.31-.75c.66 1.16.97 2.46.97 3.9 0 1.47-.31 2.83-.97 4.08m3.15 1.41l-1.37-.7c.79-1.54 1.19-3.08 1.19-4.65s-.4-3.13-1.19-4.69l1.37-.66C15.55 8.43 16 10.22 16 12c0 1.82-.45 3.6-1.32 5.35z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Thanh toán trực tuyến </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>

                                <ul>
                                    <li>
                                        <Link href="/admin/blog" className="flex items-center pl-5 pt-3 pb-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                height="1em"
                                                width="1em"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M6 0v1.5a8.46 8.46 0 016.01 2.489 8.472 8.472 0 012.489 6.01h1.5c0-5.523-4.477-10-10-10z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M6 3v1.5c1.469 0 2.85.572 3.889 1.611S11.5 8.531 11.5 10H13a7 7 0 00-7-7zM7.5 6l-1 1L3 8l-3 6.5.396.396 3.638-3.638a1 1 0 11.707.707l-3.638 3.638.396.396 6.5-3 1-3.5 1-1-2.5-2.5z"
                                                />
                                            </svg>
                                            <span className="flex-1 ml-2 whitespace-nowrap">Bài viết</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button onClick={toggleSidebar} className="flex justify-center items-center p-4">
                            <svg
                                viewBox="0 0 465 1000"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                className=""
                            >
                                <path d="M452 870c17.333 17.333 17.333 33.333 0 48-17.333 17.333-33.333 17.333-48 0L12 524c-16-16-16-32.667 0-50L404 80c14.667-17.333 30.667-17.333 48 0 17.333 14.667 17.333 30.667 0 48L94 500l358 370" />
                            </svg>
                        </button>
                    </>
                ) : (

                    <>
                        <div className='duration-300'>
                            <div className="overflow-y-auto">
                                <ul>
                                    <li>
                                        <Link href="/admin/dashboard" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] hover:text-white group">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition duration-75 "
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M4 4h6v8H4zM4 16h6v4H4zM14 12h6v8h-6zM14 4h6v4h-6z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/admin/dashboard" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] hover:text-white group">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1em"
                                                width="1em"
                                                className='flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white dark:group-hover:text-white'
                                            >
                                                <path d="M17 16h-2v6h-3v-5H8v5H5v-6H3l7-6 7 6M6 2l4 4H9v3H7V6H5v3H3V6H2l4-4m12 1l5 5h-1v4h-3V9h-2v3h-1.66L14 10.87V8h-1l5-5z" />
                                            </svg>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="space-y-2">
                                    <li className=''>
                                        <button
                                            className="flex justify-center py-3 px-4 hover:bg-[#1677FF] rounded-lg w-full focus:outline-none"
                                            onClick={toggleDropdownHomestay}
                                        >
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 17 17"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
                                                <path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-2 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
                                            </svg>
                                        </button>
                                    </li>

                                </ul>


                                <ul>
                                    <li>
                                        <Link href="/service" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 22 22"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 5a2 2 0 012 2c0 .24-.04.47-.12.69C17.95 8.5 21 11.91 21 16H3c0-4.09 3.05-7.5 7.12-8.31-.08-.22-.12-.45-.12-.69a2 2 0 012-2m10 14H2v-2h20v2M12 9.5c-3.11 0-5.75 1.89-6.66 4.5h13.32c-.91-2.61-3.55-4.5-6.66-4.5z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/service" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 23 23"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M22 1h-7a2.44 2.44 0 00-2.41 2l-.92 5.05a2.44 2.44 0 00.53 2 2.47 2.47 0 001.88.88H17l-.25.66a3.26 3.26 0 003 4.41 1 1 0 00.92-.59l2.24-5.06A1 1 0 0023 10V2a1 1 0 00-1-1zm-1 8.73l-1.83 4.13a1.33 1.33 0 01-.45-.4 1.23 1.23 0 01-.14-1.16l.38-1a1.68 1.68 0 00-.2-1.58A1.7 1.7 0 0017.35 9h-3.29a.46.46 0 01-.35-.16.5.5 0 01-.09-.37l.92-5A.44.44 0 0115 3h6zM9.94 13.05H7.05l.25-.66A3.26 3.26 0 004.25 8a1 1 0 00-.92.59l-2.24 5.06a1 1 0 00-.09.4v8a1 1 0 001 1h7a2.44 2.44 0 002.41-2l.92-5a2.44 2.44 0 00-.53-2 2.47 2.47 0 00-1.86-1zm-.48 7.58A.44.44 0 019 21H3v-6.73l1.83-4.13a1.33 1.33 0 01.45.4 1.23 1.23 0 01.14 1.16l-.38 1a1.68 1.68 0 00.2 1.58 1.7 1.7 0 001.41.74h3.29a.46.46 0 01.35.16.5.5 0 01.09.37z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/admin/report" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 22 22"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h5.697M18 14v4h4M18 11V7a2 2 0 00-2-2h-2" />
                                                <path d="M10 3 H12 A2 2 0 0 1 14 5 V5 A2 2 0 0 1 12 7 H10 A2 2 0 0 1 8 5 V5 A2 2 0 0 1 10 3 z" />
                                                <path d="M22 18 A4 4 0 0 1 18 22 A4 4 0 0 1 14 18 A4 4 0 0 1 22 18 z" />
                                                <path d="M8 11h4M8 15h3" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button onClick={toggleSidebar} className="flex justify-center items-center p-4">
                            <svg
                                viewBox="0 0 465 1000"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                {...props}
                            >
                                <path d="M13 870l358-370L13 128c-17.333-17.333-17.333-33.333 0-48 17.333-17.333 33.333-17.333 48 0l392 394c16 17.333 16 34 0 50L61 918c-14.667 17.333-30.667 17.333-48 0-17.333-14.667-17.333-30.667 0-48" />
                            </svg>
                        </button>
                    </>
                )}
            </div >


        </>


    );
}