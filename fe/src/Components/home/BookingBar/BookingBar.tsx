import * as React from 'react';
import { DatePicker } from 'antd';
import 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import viVN from 'antd/es/date-picker/locale/vi_VN';
import { faBed, faMagnifyingGlass, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { householdListForSearchBooking } from '@/types/homeType';

export interface IBookingBarProps {
    householdList: householdListForSearchBooking[] | undefined;
}

export default function BookingBar({
    householdList
}: IBookingBarProps) {

    const { RangePicker } = DatePicker;

    const dateFormat = 'DD/MM/YYYY';

    const today = dayjs().startOf('day');

    const disabledDate = (current: any) => {
        return current && current < today;
    };
    const [householdId, setHouseholdId] = React.useState<number | undefined>(0);
    const [checkInDate, setCheckInDate] = React.useState<string>(today.format('YYYY-MM-DD'));
    const [checkOutDate, setCheckOutDate] = React.useState<string>(today.add(1, 'day').format('YYYY-MM-DD'));
    const [numberOfGuests, setNumberOfGuests] = React.useState<number>(1);
    const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = React.useState<boolean>(false);
    const handleHouseholdChange = (value: number) => {
        setHouseholdId(value);
    };

    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        const checkInDateString = convertDateFormat(dateStrings[0] as string);
        const checkOutDateString = convertDateFormat(dateStrings[1] as string);

        setCheckInDate(checkInDateString);
        setCheckOutDate(checkOutDateString);

        const checkInDate = dayjs(checkInDateString);
        const checkOutDate = dayjs(checkOutDateString);

        // Kiểm tra nếu ngày checkOutDate trước hoặc bằng ngày checkInDate, thì tăng ngày checkOutDate lên 1 ngày
        if (checkOutDate.isSame(checkInDate) || checkOutDate.isBefore(checkInDate)) {
            setCheckOutDate(checkInDate.clone().add(1, 'day').format('YYYY-MM-DD'));
        }
    };

    const convertDateFormat = (dateString: string) => {
        if (typeof dateString == "string" && dateString.indexOf('/') > -1) {
            const parts = dateString.split('/');
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            return `${year}-${month}-${day}`;
        } else {
            return dateString;
        }
    }
    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setIsGuestsDropdownOpen(true);
        }
    }
    return (
        <div className="top-1/4 -mt-24 relative w-full h-full flex justify-center items-center">
            <div className="bg-white p-10 pt-3 rounded-2xl shadow-lg w-4/5">
                <label className="font-bold mb-2  text-black"><FontAwesomeIcon icon={faBed} /> Tìm chỗ lưu trú tại V-HomeStay</label>

                <div className="grid grid-cols-12 gap-6 mt-10">

                    <div className='col-span-3 border border-gray-300 rounded '>
                        <div className="w-full md:my-0 mb-6 h-full relative">
                            <label
                                htmlFor="Homestay"
                                className="block absolute text-sm -top-3 left-3 bg-white px-2 text-gray-500" >
                                Homestay
                            </label>
                            <select
                                id="Homestay"
                                className="w-full h-full p-2 rounded"
                                value={householdId}
                                onChange={e => handleHouseholdChange(Number(e.target.value))}>
                                <option value={0} key={0}>
                                    &nbsp;Tất cả homestay
                                </option>
                                {
                                    householdList?.map((household, index) => (
                                        <option value={household.householdId} key={index + 1}>
                                            &nbsp;{household.householdName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className='col-span-4 rounded border border-gray-300'>
                        <div className="w-full md:my-0 mb-6 h-full relative">
                            <label
                                htmlFor="Date"
                                className="block absolute text-sm z-20 -top-3 left-3 bg-white px-2 text-gray-500">
                                Ngày đến - Ngày đi
                            </label>
                            <RangePicker
                                format={dateFormat}
                                className="w-full h-full px-5 rounded"
                                disabledDate={disabledDate}
                                id='Date'
                                locale={viVN}
                                onChange={handleDateChange}
                                value={checkInDate && checkOutDate ? [dayjs(checkInDate), dayjs(checkOutDate)] : null}
                            />
                        </div>
                    </div>

                    <div className='col-span-3 rounded border border-gray-300'>
                        <div className="w-full md:my-0 mb-6 h-full relative">
                            <label
                                htmlFor="Guests"
                                className="block absolute text-sm -top-3 left-3 bg-white px-2 text-gray-500"
                            >
                                Số lượng khách
                            </label>
                            <div className='w-full h-full p-3 rounded cursor-pointer'
                                onClick={handleOpen}
                            >
                                <span>{numberOfGuests} khách</span>
                                {isGuestsDropdownOpen && (
                                    <div className="absolute top-full left-0 w-full border bg-white mt-1 rounded text-center">
                                        <div className='flex justify-center items-center my-2'>
                                            <button
                                                onClick={() => {
                                                    setNumberOfGuests(numberOfGuests - 1)
                                                }}
                                                disabled={numberOfGuests <= 1}
                                                className='mx-2 px-4 py-2 text-center bg-mint-green border-2 rounded-md'>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <input
                                                type="text"
                                                value={numberOfGuests}
                                                readOnly
                                                className='py-2 mx-3 w-1/4 h-fit text-center border-mint-green border-2 rounded-md'
                                            />
                                            <button
                                                onClick={() => {
                                                    setNumberOfGuests(numberOfGuests + 1)
                                                }}
                                                disabled={numberOfGuests >= 35}
                                                className='mx-2 px-4 py-2 text-center bg-mint-green border-2 rounded-md'>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                        <button onClick={() => setIsGuestsDropdownOpen(false)} className='text-center w-11/12 py-2 mb-2 bg-mint-green hover:bg-opacity-50 rounded-md'>Xong</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='col-span-2 text-white text-right'>
                        <button
                            className={`rounded-lg md:h-12 bg-mint-green h-full border-2 w-full py-2 text-sm md:text-base md:py-3`}
                        >
                            <Link
                                className={`text-xs md:text-base items-center`}
                                href={`/homestay-booking/search?householdId=${householdId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuests=${numberOfGuests}`}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
