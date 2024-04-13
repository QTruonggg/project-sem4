'use client'
import serviceApi from '@/api/serviceApi';
import { IHouseholdServiceSearchResult, IServiceIdList, IServiceList } from '@/types/serviceType';
import * as React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export interface IServiceProps {
}

export default function Service(props: IServiceProps) {
    const [service, setService] = React.useState<IServiceList>()
    const [serviceList, setServiceList] = React.useState<number[]>([])
    const [searchResult, setSearchResult] = React.useState<IHouseholdServiceSearchResult>()

    React.useEffect(() => {
        const addService = async () => {
            try {
                const response = await serviceApi.getServiceList();
                setService(response);
            } catch (error) {
                console.log(error);
            }
        }
        addService();
    }, [searchResult])

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const serviceId = parseInt(value, 10);
        if (checked) {
            setServiceList((prevServiceList) => [...prevServiceList, serviceId]);
        } else {
            setServiceList((prevServiceList) => prevServiceList.filter((item) => item !== serviceId));
        }
    };

    const handleSearch = async () => {
        console.log(serviceList);
        const requestData: IServiceIdList = {
            serviceIdList: serviceList
        };
        try {
            const response = await serviceApi.searchHouseholdByServiceList(requestData);
            console.log(response);
            setSearchResult(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className='w-3/5 mx-auto'>
            <div className=' flex items-center justify-center my-10'>
                <div className="flex-1 h-[1px] bg-gray-500"></div>
                <div className="text-3xl text-center font-bold px-16">
                    <p>Các dịch vụ</p>
                    <p>đặc biệt</p>
                </div>
                <div className="flex-1 h-[1px] bg-gray-500"></div>
            </div>

            <p className='text-gray-600 text-center'>Các dịch vụ phải được đặt trước 24h, vui lòng liên hệ hotline của từng homestay để đặt trước</p>
        </div>

        <div className='w-4/5 mx-auto grid grid-cols-4 gap-5 my-10'>
            {service?.serviceListForCustomer.map((item) => (
                <div key={item.serviceId} className='grid grid-cols-3 rounded-xl shadow-md shadow-gray-300 overflow-hidden items-center p-3'>
                    <div className='col-span-1 items-center'>
                        <Image
                            src={item.serviceAvatar || '/images/LuaTrai.jpg'}
                            alt='Ảnh homestay'
                            width={200}
                            height={200}
                            className='w-11/12 aspect-square rounded-xl'
                        />
                    </div>
                    <div className='col-span-2 items-center'>
                        <p className='font-semibold p-3'>{item.serviceName}</p>
                    </div>
                </div>
            ))}

        </div>


        <div className="mx-auto my-10 w-3/5 flex-1 h-[1px] bg-gray-500"></div>


        <div className='w-4/5 m-auto grid grid-cols-10 gap-16'>
            <div className='col-span-4 text-center first-letter p-10 rounded-xl shadow-xl'>
                <div>
                    <div className='text-lg font-bold mb-5'>Tìm kiếm homestay có dịch vụ đặc biệt</div>
                    {service?.serviceListForCustomer.map((item) => (
                        <div className="flex items-center mb-4 px-5" key={item.serviceId}>
                            <input
                                id={item.serviceName}
                                type="checkbox"
                                value={item.serviceId}
                                className="w-4 h-4 text-blue-600 bg-mint-green border-gray-300"
                                onChange={handleServiceChange}
                            />
                            <label htmlFor={item.serviceName} className="ml-2 font-semibold text-sm">{item?.serviceName}</label>
                        </div>
                    ))
                    }

                </div>

                <button onClick={handleSearch} className='p-2 px-5 my-4 font-bold bg-mint-green rounded-md'>
                    Tìm kiếm <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <div className='col-span-6 mt-10'>
                <p className='font-bold text-lg'>Kết quả tìm kiếm: {searchResult?.householdListForCustomer.length} kết quả</p>
                {searchResult && searchResult.householdListForCustomer.map((item) => (
                    <div key={item.householdId} className='w-5/6 grid grid-cols-5 rounded-xl shadow-md shadow-gray-300 overflow-hidden items-center p-3 mt-5'>
                        <div className='col-span-1 items-center'>
                            <Image
                                src={item.householdAvatar || '/images/LuaTrai.jpg'}
                                alt='Ảnh homestay'
                                width={200}
                                height={200}
                                className='w-11/12 aspect-square rounded-xl'
                            />
                        </div>
                        <div className='col-span-4'>
                            <p className='font-bold px-3'>{item.householdName}</p>
                            <p className='px-3 text-xs'>Liên hệ: {item.phoneNumberFirst ? item.phoneNumberSecond? item.phoneNumberFirst + ' - ' + item.phoneNumberSecond: item.phoneNumberFirst : item.phoneNumberSecond}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}
