import * as React from 'react';
import { faBed, faMagnifyingGlass, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker } from 'antd';
import 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import viVN from 'antd/es/date-picker/locale/vi_VN';
import { IHousehold } from '@/types/homestayBookingType';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingPage from '../common/LoadingPage';

export interface ISearchBarProps {
    householdList: IHousehold[] | undefined;
}

export default function SearchBar({
    householdList
}: ISearchBarProps) {
    const router = useRouter();
    const { RangePicker } = DatePicker;

    const dateFormat = 'DD/MM/YYYY';

    const today = dayjs().startOf('day');

    const disabledDate = (current: any) => {
        return current && current < today;
    };

    const searchParams = useSearchParams();

    const [householdId, setHouseholdId] = React.useState<number | undefined>(Number(searchParams.get('householdId')) || 0);
    const [checkInDate, setCheckInDate] = React.useState<string>(searchParams.get('checkInDate') || today.format('YYYY-MM-DD'));
    const [checkOutDate, setCheckOutDate] = React.useState<string>(searchParams.get('checkOutDate') || today.add(1, 'day').format('YYYY-MM-DD'));
    const [numberOfGuests, setNumberOfGuests] = React.useState<number>(Number(searchParams.get('numberOfGuests')) || 1);
    const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
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
        if (checkOutDate.isSame(checkInDate)||checkOutDate.isBefore(checkInDate)) {
          setCheckOutDate(checkInDate.clone().add(1, 'day').format('YYYY-MM-DD'));
        }
      };

    const handleNumberOfGuestsChange = (value: number) => {
        setNumberOfGuests(value);
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

    const handleSearch = () => {
        setLoading(true);
        const url = `/homestay-booking/search?householdId=${householdId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuests=${numberOfGuests}`;
        router.push(url);
        const infoSection = document.getElementById('infoSection');
        if (infoSection) {
        infoSection.scrollIntoView({ behavior: 'smooth' });
        }
        setLoading(false)
    }

    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setIsGuestsDropdownOpen(true);
        }
    }
    return (
        <div className='relative w-full'>
            {loading && <LoadingPage />}
            <div className='h-72 overflow-hidden rounded-b-xl text-white 
            text-center bg-cover bg-[url("/images/LangMongPaViHome.jpg")]'>
                <h2 className='mt-20 text-4xl font-bold'>ĐẶT PHÒNG TẠI V-HOMESTAY</h2>
            </div>
            <div className="-mt-36 w-full h-full flex justify-center items-center rounded-2xl">
                <div className="bg-white p-10 pt-3 rounded-2xl shadow-lg md:w-4/5">
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
                                    className="w-full px-2 h-full rounded"
                                    value={householdId}
                                    onChange={e => handleHouseholdChange(Number(e.target.value))}>
                                    <option value={0} key={0}>
                                        &nbsp;Tất cả homestay
                                    </option>
                                    {householdList?.map((household) => (
                                        <option 
                                        value={household.householdId} 
                                        key={household.householdId}>
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
                                onClick={handleSearch}
                                className={`rounded-lg md:h-12 bg-[#66AF96] h-full border-2 w-full py-2 text-sm md:text-base md:py-3`}
                            >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
