import Link from 'next/link';
import * as React from 'react';

export interface ISideBarLeftProps {
}

export default function SideBarLeft(props: ISideBarLeftProps) {

    const [dropdownOpenHomestay, setDropdownOpenHomestay] = React.useState(false);

    const toggleDropdownHomestay = () => {
        setDropdownOpenHomestay(!dropdownOpenHomestay);
    };

    const [dropdownOpenBooking, setDropdownOpenBooking] = React.useState(false);

    const toggleDropdownBooking = () => {
        setDropdownOpenBooking(!dropdownOpenBooking);
    };

    const [dropdownOpenReport, setDropdownOpenReport] = React.useState(false);

    const toggleDropdownReport = () => {
        setDropdownOpenReport(!dropdownOpenReport);
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
                        <div className='duration-500'>
                            <div className="overflow-y-auto">
                                <ul>
                                    <li>
                                        <Link href="dashboard" className="flex items-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] hover:text-white group">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 ml-1 w-5 h-5 text-white transition"
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
                                            className="flex items-center py-3 px-4 hover:bg-[#1677FF] rounded-lg w-full focus:outline-none"
                                            onClick={toggleDropdownHomestay}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1em"
                                                width="1em"
                                                className='flex-shrink-0 mr-2 w-5 h-5 text-white transition  group-hover:text-white dark:group-hover:text-white'
                                            >
                                                <path d="M17 16h-2v6h-3v-5H8v5H5v-6H3l7-6 7 6M6 2l4 4H9v3H7V6H5v3H3V6H2l4-4m12 1l5 5h-1v4h-3V9h-2v3h-1.66L14 10.87V8h-1l5-5z" />
                                            </svg>
                                            Homestay
                                            <svg
                                                className={`ml-auto h-5 w-5 transform ${dropdownOpenHomestay ? 'rotate-180' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {dropdownOpenHomestay && (
                                            <ul className="pl-4 mt-2 space-y-2 bg-[#000C17]">
                                                <li>
                                                    <Link href="/manager/overview" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg hover:bg-[#1677FF] dark:hover:text-white group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className='flex-shrink-0 w-5 h-5 transition dark:text-white group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg'
                                                        >
                                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm8.116 12.262a.74.74 0 01-.741-.74c0-.008.005-.016.005-.025l-1.46-1.46a1.31 1.31 0 01-.38-.917V5.731a.285.285 0 00-.284-.283h-.915a.284.284 0 00-.284.283v2.413L12.17 4.383a.284.284 0 00-.4.003L4.438 11.72a.283.283 0 000 .4l.696.697a.286.286 0 00.4 0l5.635-5.552a1.302 1.302 0 011.83.008l5.525 5.525a1.3 1.3 0 010 1.836l-.679.68a1.305 1.305 0 01-1.824.012l-3.876-3.766a.283.283 0 00-.4.004l-3.723 3.74a.285.285 0 000 .4l.687.69a.283.283 0 00.4 0l2.013-1.986a1.302 1.302 0 011.824 0l1.994 1.96.007.007a1.299 1.299 0 010 1.837l-1.985 1.984v.013a.74.74 0 11-.74-.741c.009 0 .016.005.025.005l1.975-1.98a.284.284 0 00.084-.201.28.28 0 00-.085-.2l-1.995-1.96a.285.285 0 00-.4 0l-2.006 1.98a1.3 1.3 0 01-1.83-.004l-.69-.689a1.301 1.301 0 010-1.834l3.72-3.74a1.303 1.303 0 011.826-.016l3.879 3.758a.285.285 0 00.4 0l.679-.679a.285.285 0 000-.4L12.28 7.986a.284.284 0 00-.4 0l-5.637 5.555a1.301 1.301 0 01-1.829-.008l-.698-.694-.002-.003a1.296 1.296 0 01.002-1.834l7.334-7.334a1.305 1.305 0 011.821-.015l2.166 2.097v-.019a1.3 1.3 0 011.299-1.298h.916a1.3 1.3 0 011.298 1.298v3.384a.282.282 0 00.083.2l1.467 1.467h.014a.74.74 0 01.001 1.48z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Tổng quan</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/manager/homestay" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg hover:bg-[#1677FF]  group">

                                                        <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em"
                                                            className="flex-shrink-0 w-5 h-5 transition group-hover:text-white dark:group-hover:text-white">
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M21 8.772l-6.98-6.979a3 3 0 00-4.242 0L3 8.571v14.515h7v-6a2 2 0 114 0v6h7V8.772zm-9.808-5.565L5 9.4v11.686h3v-4a4 4 0 018 0v4h3V9.6l-6.393-6.394a1 1 0 00-1.415 0z"
                                                                clipRule="evenodd" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Homestay</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/manager/room-type" className="flex items-center p-3 text-gray-400 hover:text-white hover:bg-[#1677FF] rounded-lg group">

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
                                                    <Link href="/manager/room" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg hover:bg-[#1677FF] group">                      <svg
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        height="1em"
                                                        width="1em"
                                                        className="flex-shrink-0 w-5 h-5  transition   group-hover:text-white dark:group-hover:text-white"
                                                    >
                                                        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                                        <path d="M10.828.122A.5.5 0 0111 .5V1h.5A1.5 1.5 0 0113 2.5V15h1.5a.5.5 0 010 1h-13a.5.5 0 010-1H3V1.5a.5.5 0 01.43-.495l7-1a.5.5 0 01.398.117zM11.5 2H11v13h1V2.5a.5.5 0 00-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                                                    </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Phòng</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/manager/room-dorm" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg hover:bg-[#1677FF] group">

                                                        <svg
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className="flex-shrink-0 w-5 h-5 transition  group-hover:text-white dark:group-hover:text-white"
                                                        >
                                                            <path d="M19 10V7a2 2 0 00-2-2H7a2 2 0 00-2 2v3a2 2 0 00-2 2v5h1.33L5 19h1l.67-2h10.66l.67 2h1l.67-2H21v-5a2 2 0 00-2-2M7 7h10v3H7m12 5H5v-3h14z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Phòng dorm</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <button
                                            className="flex items-center py-3 px-4 hover:bg-[#1677FF] rounded-lg w-full focus:outline-none"
                                            onClick={toggleDropdownBooking}
                                        >
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 17 17"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 mr-2 w-5 h-5 text-white transition  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
                                                <path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-2 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
                                            </svg>
                                            Booking
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
                                                    <Link href="/manager/booking-overview" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg  dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className='flex-shrink-0 w-5 h-5  transition  dark:text-white group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg'
                                                        >
                                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm8.116 12.262a.74.74 0 01-.741-.74c0-.008.005-.016.005-.025l-1.46-1.46a1.31 1.31 0 01-.38-.917V5.731a.285.285 0 00-.284-.283h-.915a.284.284 0 00-.284.283v2.413L12.17 4.383a.284.284 0 00-.4.003L4.438 11.72a.283.283 0 000 .4l.696.697a.286.286 0 00.4 0l5.635-5.552a1.302 1.302 0 011.83.008l5.525 5.525a1.3 1.3 0 010 1.836l-.679.68a1.305 1.305 0 01-1.824.012l-3.876-3.766a.283.283 0 00-.4.004l-3.723 3.74a.285.285 0 000 .4l.687.69a.283.283 0 00.4 0l2.013-1.986a1.302 1.302 0 011.824 0l1.994 1.96.007.007a1.299 1.299 0 010 1.837l-1.985 1.984v.013a.74.74 0 11-.74-.741c.009 0 .016.005.025.005l1.975-1.98a.284.284 0 00.084-.201.28.28 0 00-.085-.2l-1.995-1.96a.285.285 0 00-.4 0l-2.006 1.98a1.3 1.3 0 01-1.83-.004l-.69-.689a1.301 1.301 0 010-1.834l3.72-3.74a1.303 1.303 0 011.826-.016l3.879 3.758a.285.285 0 00.4 0l.679-.679a.285.285 0 000-.4L12.28 7.986a.284.284 0 00-.4 0l-5.637 5.555a1.301 1.301 0 01-1.829-.008l-.698-.694-.002-.003a1.296 1.296 0 01.002-1.834l7.334-7.334a1.305 1.305 0 011.821-.015l2.166 2.097v-.019a1.3 1.3 0 011.299-1.298h.916a1.3 1.3 0 011.298 1.298v3.384a.282.282 0 00.083.2l1.467 1.467h.014a.74.74 0 01.001 1.48z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Tổng quan</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/manager/check-in-check-out-today" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg  dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className='flex-shrink-0 w-5 h-5  transition  dark:text-white group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg'
                                                        >
                                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm8.116 12.262a.74.74 0 01-.741-.74c0-.008.005-.016.005-.025l-1.46-1.46a1.31 1.31 0 01-.38-.917V5.731a.285.285 0 00-.284-.283h-.915a.284.284 0 00-.284.283v2.413L12.17 4.383a.284.284 0 00-.4.003L4.438 11.72a.283.283 0 000 .4l.696.697a.286.286 0 00.4 0l5.635-5.552a1.302 1.302 0 011.83.008l5.525 5.525a1.3 1.3 0 010 1.836l-.679.68a1.305 1.305 0 01-1.824.012l-3.876-3.766a.283.283 0 00-.4.004l-3.723 3.74a.285.285 0 000 .4l.687.69a.283.283 0 00.4 0l2.013-1.986a1.302 1.302 0 011.824 0l1.994 1.96.007.007a1.299 1.299 0 010 1.837l-1.985 1.984v.013a.74.74 0 11-.74-.741c.009 0 .016.005.025.005l1.975-1.98a.284.284 0 00.084-.201.28.28 0 00-.085-.2l-1.995-1.96a.285.285 0 00-.4 0l-2.006 1.98a1.3 1.3 0 01-1.83-.004l-.69-.689a1.301 1.301 0 010-1.834l3.72-3.74a1.303 1.303 0 011.826-.016l3.879 3.758a.285.285 0 00.4 0l.679-.679a.285.285 0 000-.4L12.28 7.986a.284.284 0 00-.4 0l-5.637 5.555a1.301 1.301 0 01-1.829-.008l-.698-.694-.002-.003a1.296 1.296 0 01.002-1.834l7.334-7.334a1.305 1.305 0 011.821-.015l2.166 2.097v-.019a1.3 1.3 0 011.299-1.298h.916a1.3 1.3 0 011.298 1.298v3.384a.282.282 0 00.083.2l1.467 1.467h.014a.74.74 0 01.001 1.48z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Check-in & Check-out</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/manager/booking-management" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                                        <svg
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                            height="1em"
                                                            width="1em"
                                                            className="flex-shrink-0 w-5 h-5 transition  group-hover:text-white dark:group-hover:text-white"
                                                        >
                                                            <path d="M14.5 3a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h13zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" />
                                                            <path d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Quản lý đặt phòng</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        )}
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/manager/service" className="flex items-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                className="flex-shrink-0 ml-1 w-5 h-5 text-white transition  group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 5a2 2 0 012 2c0 .24-.04.47-.12.69C17.95 8.5 21 11.91 21 16H3c0-4.09 3.05-7.5 7.12-8.31-.08-.22-.12-.45-.12-.69a2 2 0 012-2m10 14H2v-2h20v2M12 9.5c-3.11 0-5.75 1.89-6.66 4.5h13.32c-.91-2.61-3.55-4.5-6.66-4.5z" />
                                            </svg>
                                            <span className="flex-1 ml-2 whitespace-nowrap">Dịch vụ</span>
                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/manager/feedback" className="flex items-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 ml-1 w-5 h-5 text-white transition  dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M22 1h-7a2.44 2.44 0 00-2.41 2l-.92 5.05a2.44 2.44 0 00.53 2 2.47 2.47 0 001.88.88H17l-.25.66a3.26 3.26 0 003 4.41 1 1 0 00.92-.59l2.24-5.06A1 1 0 0023 10V2a1 1 0 00-1-1zm-1 8.73l-1.83 4.13a1.33 1.33 0 01-.45-.4 1.23 1.23 0 01-.14-1.16l.38-1a1.68 1.68 0 00-.2-1.58A1.7 1.7 0 0017.35 9h-3.29a.46.46 0 01-.35-.16.5.5 0 01-.09-.37l.92-5A.44.44 0 0115 3h6zM9.94 13.05H7.05l.25-.66A3.26 3.26 0 004.25 8a1 1 0 00-.92.59l-2.24 5.06a1 1 0 00-.09.4v8a1 1 0 001 1h7a2.44 2.44 0 002.41-2l.92-5a2.44 2.44 0 00-.53-2 2.47 2.47 0 00-1.86-1zm-.48 7.58A.44.44 0 019 21H3v-6.73l1.83-4.13a1.33 1.33 0 01.45.4 1.23 1.23 0 01.14 1.16l-.38 1a1.68 1.68 0 00.2 1.58 1.7 1.7 0 001.41.74h3.29a.46.46 0 01.35.16.5.5 0 01.09.37z" />
                                            </svg>
                                            <span className="flex-1 ml-2 whitespace-nowrap">Đánh giá</span>
                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/manager/request-processing" className="flex items-center pl-4 pt-3 pb-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1.2em"
                                                width="1.2em"
                                            >
                                                <path d="M8.625 8.5h-4.5a1 1 0 01-1-1V3a1 1 0 012 0v3.5h3.5a1 1 0 010 2z" />
                                                <path d="M21 13a1 1 0 01-1-1A7.995 7.995 0 005.08 8.001a1 1 0 01-1.731-1.002A9.995 9.995 0 0122 12a1 1 0 01-1 1zm-1.125 9a1 1 0 01-1-1v-3.5h-3.5a1 1 0 010-2h4.5a1 1 0 011 1V21a1 1 0 01-1 1z" />
                                                <path d="M12 22A10.012 10.012 0 012 12a1 1 0 012 0 7.995 7.995 0 0014.92 3.999 1 1 0 011.731 1.002A10.032 10.032 0 0112 22z" />
                                            </svg>
                                            <span className="flex-1 ml-2 whitespace-nowrap">Xử lý yêu cầu</span>
                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>

                                        <button
                                            className="flex items-center py-3 px-4 hover:bg-[#1677FF] rounded-lg w-full focus:outline-none"
                                            onClick={toggleDropdownReport}
                                        >
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 22 22"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition  dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >

                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h5.697M18 14v4h4M18 11V7a2 2 0 00-2-2h-2" />
                                                <path d="M10 3 H12 A2 2 0 0 1 14 5 V5 A2 2 0 0 1 12 7 H10 A2 2 0 0 1 8 5 V5 A2 2 0 0 1 10 3 z" />
                                                <path d="M22 18 A4 4 0 0 1 18 22 A4 4 0 0 1 14 18 A4 4 0 0 1 22 18 z" />
                                                <path d="M8 11h4M8 15h3" />
                                            </svg>
                                            <span className="ml-2 whitespace-nowrap">Báo cáo</span>
                                            <svg
                                                className={`ml-auto h-5 w-5 transform ${dropdownOpenReport ? 'rotate-180' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {dropdownOpenReport && (
                                            <ul className="space-y-2 bg-[#000C17]">
                                                <li>
                                                    <Link href="/manager/report-booking" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg hover:bg-[#1677FF] dark:hover:text-white group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className='flex-shrink-0 mr-2 w-5 h-5 text-white transition  group-hover:text-white dark:group-hover:text-white'
                                                        >
                                                            <path d="M17 16h-2v6h-3v-5H8v5H5v-6H3l7-6 7 6M6 2l4 4H9v3H7V6H5v3H3V6H2l4-4m12 1l5 5h-1v4h-3V9h-2v3h-1.66L14 10.87V8h-1l5-5z" />
                                                        </svg>
                                                        <span className="flex-1 whitespace-nowrap">Báo cáo theo đơn đặt phòng</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/manager/report-room-type" className="flex items-center p-3 text-gray-400 hover:text-white rounded-lg hover:bg-[#1677FF]  group">

                                                        <svg
                                                            viewBox="0 0 21 21"
                                                            fill="currentColor"
                                                            height="1em"
                                                            width="1em"
                                                            className="flex-shrink-0 w-5 h-5  transition group-hover:text-white dark:group-hover:text-white"
                                                        >
                                                            <path d="M10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Báo cáo theo loại phòng</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/manager/report-cancel-booking" className="flex items-center p-3 text-gray-400 hover:text-white hover:bg-[#1677FF] rounded-lg group">

                                                        <svg
                                                            viewBox="0 0 22 22"
                                                            fill="currentColor"
                                                            height="2em"
                                                            width="2em"
                                                            className="flex-shrink-0 w-5 h-5  transition  group-hover:text-white dark:group-hover:text-white"
                                                        >
                                                            <path d="M12 18.5c0 .5.07 1 .18 1.5H4a2 2 0 01-2-2V6c0-1.11.89-2 2-2h6l2 2h8a2 2 0 012 2v5.04c-.61-.39-1.28-.68-2-.86V8H4v10h8.03c-.03.17-.03.33-.03.5m11 0c0 2.5-2 4.5-4.5 4.5S14 21 14 18.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5m-3 2.58L15.92 17c-.27.42-.42.94-.42 1.5 0 1.66 1.34 3 3 3 .56 0 1.08-.15 1.5-.42m1.5-2.58c0-1.66-1.34-3-3-3-.56 0-1.08.15-1.5.42L21.08 20c.27-.42.42-.94.42-1.5z" />
                                                        </svg>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Báo cáo hoàn tiền đơn hủy</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        )}
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
                                        <Link href="/manager/dashboard" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] hover:text-white group">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition  "
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M4 4h6v8H4zM4 16h6v4H4zM14 12h6v8h-6zM14 4h6v4h-6z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/manager/overview" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] hover:text-white group">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1em"
                                                width="1em"
                                                className='flex-shrink-0 w-5 h-5 text-white transition  group-hover:text-white dark:group-hover:text-white'
                                            >
                                                <path d="M17 16h-2v6h-3v-5H8v5H5v-6H3l7-6 7 6M6 2l4 4H9v3H7V6H5v3H3V6H2l4-4m12 1l5 5h-1v4h-3V9h-2v3h-1.66L14 10.87V8h-1l5-5z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/manager/booking-overview" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] hover:text-white group">
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 17 17"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
                                                <path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-2 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>

                                <ul>
                                    <li>
                                        <Link href="manager/service" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 22 22"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition  group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 5a2 2 0 012 2c0 .24-.04.47-.12.69C17.95 8.5 21 11.91 21 16H3c0-4.09 3.05-7.5 7.12-8.31-.08-.22-.12-.45-.12-.69a2 2 0 012-2m10 14H2v-2h20v2M12 9.5c-3.11 0-5.75 1.89-6.66 4.5h13.32c-.91-2.61-3.55-4.5-6.66-4.5z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="manager/request-processing" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="1.2em"
                                                width="1.2em"
                                            >
                                                <path d="M8.625 8.5h-4.5a1 1 0 01-1-1V3a1 1 0 012 0v3.5h3.5a1 1 0 010 2z" />
                                                <path d="M21 13a1 1 0 01-1-1A7.995 7.995 0 005.08 8.001a1 1 0 01-1.731-1.002A9.995 9.995 0 0122 12a1 1 0 01-1 1zm-1.125 9a1 1 0 01-1-1v-3.5h-3.5a1 1 0 010-2h4.5a1 1 0 011 1V21a1 1 0 01-1 1z" />
                                                <path d="M12 22A10.012 10.012 0 012 12a1 1 0 012 0 7.995 7.995 0 0014.92 3.999 1 1 0 011.731 1.002A10.032 10.032 0 0112 22z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="manager/feedback" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                viewBox="0 0 23 23"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition  dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M22 1h-7a2.44 2.44 0 00-2.41 2l-.92 5.05a2.44 2.44 0 00.53 2 2.47 2.47 0 001.88.88H17l-.25.66a3.26 3.26 0 003 4.41 1 1 0 00.92-.59l2.24-5.06A1 1 0 0023 10V2a1 1 0 00-1-1zm-1 8.73l-1.83 4.13a1.33 1.33 0 01-.45-.4 1.23 1.23 0 01-.14-1.16l.38-1a1.68 1.68 0 00-.2-1.58A1.7 1.7 0 0017.35 9h-3.29a.46.46 0 01-.35-.16.5.5 0 01-.09-.37l.92-5A.44.44 0 0115 3h6zM9.94 13.05H7.05l.25-.66A3.26 3.26 0 004.25 8a1 1 0 00-.92.59l-2.24 5.06a1 1 0 00-.09.4v8a1 1 0 001 1h7a2.44 2.44 0 002.41-2l.92-5a2.44 2.44 0 00-.53-2 2.47 2.47 0 00-1.86-1zm-.48 7.58A.44.44 0 019 21H3v-6.73l1.83-4.13a1.33 1.33 0 01.45.4 1.23 1.23 0 01.14 1.16l-.38 1a1.68 1.68 0 00.2 1.58 1.7 1.7 0 001.41.74h3.29a.46.46 0 01.35.16.5.5 0 01.09.37z" />
                                            </svg>

                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="manager/report-booking" className="flex justify-center p-3 text-white rounded-lg dark:text-white hover:bg-[#1677FF] dark:hover:bg-gray-700 group">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 22 22"
                                                height="1em"
                                                width="1em"
                                                className="flex-shrink-0 w-5 h-5 text-white transition  dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
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
                        <button onClick={toggleSidebar} className="bg-[#002140] duration-300 flex justify-center items-center p-4">
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



