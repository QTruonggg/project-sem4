'use client'
import * as React from 'react';
import LoadingPage from '@/Components/common/LoadingPage';
import HomestayItem from '@/Components/homestay-booking/HomestayItem';
import SearchBar from '@/Components/homestay-booking/SearchBar';
import SearchContent from '@/Components/homestay-booking/SearchContent';
import homestayBookingApi from '@/api/homestayBookingApi';
import { IHomestayBookingResponse, IHouseholdResponse } from '@/types/homestayBookingType';
import Pagination from '@/Components/booking/Pagination';

export interface HomestayBookingProps { }

export interface BookingContextProps {
  haveDorm: boolean;
  setHaveDorm: React.Dispatch<React.SetStateAction<boolean>>;
  services: string[];
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
}

export const BookingContext = React.createContext<BookingContextProps>({
  haveDorm: false,
  setHaveDorm: () => { },
  services: [],
  setServices: () => { },
});

export default function HomestayBooking(props: HomestayBookingProps) {
  const [booking, setBooking] = React.useState<IHomestayBookingResponse>();
  const [haveDorm, setHaveDorm] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    homestayBookingApi.getBooking().then((res) => {
      console.log(res);
      setBooking(res);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);
  const [services, setServices] = React.useState<string[]>(
    booking?.listService.map((item) => item.serviceName) || []
  );


  return (
    <BookingContext.Provider
      value={{
        haveDorm,
        setHaveDorm,
        services,
        setServices,
      }}
    >
      {loading && <LoadingPage />
      }
      <div className='relative'>
        <SearchBar householdList={booking?.householdNameList} />

        <div className='w-4/5 m-auto my-12'>
          <div className='grid grid-cols-10 gap-10'>
            <SearchContent serviceList={booking?.listService} />
            <div className='col-span-7 flex flex-col gap-5'>
              {booking?.householdListResponseDto?.map((item) => {
                if (item !== undefined)
                  if (services.length === 0 && haveDorm === false) {
                    return <HomestayItem household={item} key={item.householdId} />
                  } else if (services.length > 0 && haveDorm === false) {
                    if (services.every((service) => item.householdServiceList.some((item) => item.serviceName === service))) {
                      return <HomestayItem household={item} key={item.householdId} />
                    }
                  } else if (services.length === 0 && haveDorm === true) {
                    if (item?.haveDormitory === true) {
                      return <HomestayItem household={item} key={item.householdId} />
                    }
                  } else if (services.length > 0 && haveDorm === true) {
                    if (services.every((service) => item.householdServiceList.some((item) => item.serviceName === service)) && item.haveDormitory === true) {
                      return <HomestayItem household={item} key={item.householdId} />
                    }
                  }
              })
              }
            </div>
          </div>
        </div>
      </div>
    </BookingContext.Provider>
  );
}
