'use client'
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import SearchBar from '@/Components/homestay-booking/SearchBar';
import SearchHomestayItem from '@/Components/homestay-booking/SearchHomestayItem';
import SearchPageSearchContent from '@/Components/homestay-booking/SearchPageSearchContent';
import homestayBookingApi from '@/api/homestayBookingApi';
import { Dropdown, Empty } from 'antd';
import { IHomestayBookingResponse, IHouseholdResponse, ISelectedBookingDetail, ISelectedHousehold, IbookingDetailRecommend } from '@/types/homestayBookingType';
import { faAngleRight, faChevronDown, faLocationDot, faPaperPlane, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingPage from '@/Components/common/LoadingPage';
import HomestayImage from '@/Components/homestay-booking/HomestayImage';
import RoomImageModal from '@/Components/homestay-booking/RoomImageModal';
import Pagination from '@/Components/booking/Pagination';
import { setSession, getSession } from '@/utils/sessionStorage';
import SelectRoomItem from '@/Components/homestay-booking/SelectRoomItem';

export interface SearchHomestayProps { }

export interface SearchBookingContextProps {
  haveDorm: boolean;
  setHaveDorm: React.Dispatch<React.SetStateAction<boolean>>;
  services: string[];
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}

export const SearchBookingContext = React.createContext<SearchBookingContextProps>({
  haveDorm: false,
  setHaveDorm: () => { },
  services: [],
  setServices: () => { },
  priceRange: [0, 10000000],
  setPriceRange: () => { },
});


const convertPrice = (price: number | string) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const ratingConvert = (rating: number) => {
  const roundedRating = Math.round(rating * 2) / 2;
  if (Number.isInteger(roundedRating)) {
    return roundedRating.toFixed(1);
  }
  return roundedRating;
}

const ratingComment = (rating: number) => {
  if (rating >= 4.5) {
    return 'Rất tốt';
  } else if (rating >= 4) {
    return 'Tốt';
  } else if (rating >= 3.5) {
    return 'Khá tốt';
  } else if (rating >= 3) {
    return 'Khá';
  } else if (rating >= 2) {
    return 'Trung bình';
  } else if (rating >= 1) {
    return 'Kém';
  } else if (rating > 0) {
    return 'Tệ';
  }
  return '';
}


export default function SearchHomestay(props: SearchHomestayProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  let householdId = searchParams ? searchParams.get('householdId') : "";
  let checkInDate = searchParams ? searchParams.get('checkInDate') : "";
  let checkOutDate = searchParams ? searchParams.get('checkOutDate') : "";
  let numberOfGuests = searchParams ? searchParams.get('numberOfGuests') : "";
  const [loading, setLoading] = React.useState<boolean>(true);
  const [booking, setBooking] = React.useState<IHomestayBookingResponse | null>(null);;
  const itemsPerPage = 5;
  const [haveDorm, setHaveDorm] = React.useState<boolean>(false);
  const [priceRange, setPriceRange] = React.useState<number[]>([]);
  const [maxPrice, setMaxPrice] = React.useState<number>(0);
  const [roomSelected, setRoomSelected] = React.useState<ISelectedBookingDetail[]>([]);
  const [totalSelectedPrice, setTotalSelectedPrice] = React.useState<number>(0);
  const [householdSelected, setHouseholdSelected] = React.useState<ISelectedHousehold>({
    householdId: 0,
    householdName: '',
    address: [],
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 0,
    totalNight: 0,
    imageUri: '',
    customerName: '',
    customerPhone: '',
    bookingDetailList: [],
    totalPrice: 0,
    paymentGateway: ''
  });
  const [selectedRoomCount, setSelectedRoomCount] = React.useState<number>(0);
  const user = React.useContext(AuthenticationContext);


  React.useEffect(() => {
    setLoading(true);
    homestayBookingApi.searchBooking(
      householdId as string,
      checkInDate as string,
      checkOutDate as string,
      numberOfGuests as string).then((res) => {
        setBooking(res);
        setMaxPrice(res.maxPrice || 0)
        setPriceRange([0, res.maxPrice || 0])
        if (householdId !== "0") {
          setHouseholdSelected({
            householdId: Number(householdId),
            householdName: res.householdResponseDto?.householdName || '',
            address: res.householdResponseDto?.address || [],
            checkInDate: checkInDate as string,
            checkOutDate: checkOutDate as string,
            imageUri: res.householdResponseDto?.imageUri || '',
            checkInTime: res.householdResponseDto?.checkInTime || '',
            checkOutTime: res.householdResponseDto?.checkOutTime || '',
            numberOfGuests: Number(numberOfGuests),
            totalNight: res.householdResponseDto?.numberOfNight || 0,
            customerName: user.data?.firstName.concat(' ', user.data?.lastName) || '',
            customerPhone: user.data?.phoneNumber || '',
            bookingDetailList: [],
            totalPrice: 0,
            paymentGateway: ''
          });

          setRoomSelected(res.householdResponseDto?.homestayAndTypeRoomAvailableList
            ?.flatMap((item) =>
              item.roomTypeAvailableList?.map((room) => ({
                homestayId: item.homestayId,
                homestayCode: item.homestayCode,
                householdRoomTypeId: room.roomTypeHouseholdId,
                roomTypeName: room.roomTypeName,
                quantity: 0,
                price: room.price * (res.householdResponseDto?.numberOfNight || 1),
              }))
            ) ?? []);
        }
        setTotalSelectedPrice(0)
        setSelectedRoomCount(0)
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        alert('Thông tin tìm kiếm không hợp lệ');
        setLoading(false);
        router.push('/homestay-booking');
      });
    // }, [householdId, checkInDate, checkOutDate, numberOfGuests,router,user.data?.firstName,user.data?.lastName,user.data?.phoneNumber]);
  }, [householdId, checkInDate, checkOutDate, numberOfGuests]);

  const [services, setServices] = React.useState<string[]>(
    booking?.listService.map((item) => item.serviceName) || []
  );

  const [currentFeedbackPage, setCurrentFeedbackPage] = React.useState(1);
  const startIndex = (currentFeedbackPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFeedbackTypes = (booking?.householdResponseDto?.reviewHouseholdList?.slice(startIndex, endIndex) || []);


  const handlePageChange = (page: number) => {
    setCurrentFeedbackPage(page);
  };


  const [sort, setSort] = React.useState("Mức độ phù hợp")
  const items = [
    {
      key: "Mức độ phù hợp",
      label: (
        <p onClick={() => setSort("Mức độ phù hợp")}>
          Mức độ phù hợp
        </p>
      ),
    },
    {
      key: "Giá (từ thấp đến cao)",
      label: (
        <p onClick={() => setSort("Giá (từ thấp đến cao)")}>
          Giá (từ thấp đến cao)
        </p>
      ),
    },
    {
      key: "Giá (từ cao đến thấp)",
      label: (
        <p onClick={() => setSort("Giá (từ cao đến thấp)")}>
          Giá (từ cao đến thấp)
        </p>
      ),
    },
  ];

  const totalPrice = (list: IbookingDetailRecommend[] | undefined) => {
    let total = 0;
    if (list === undefined) return 0;
    list.forEach((household) => {
      if (household.price === undefined) return;
      total += household.price * household.quantity;
    });
    return total;
  };

  const countTotalPriceSelected = (list: ISelectedBookingDetail[]) => {
    let total = 0;
    list.forEach((household) => {
      total += (household.price || 0) * (household.quantity || 0);
    });
    return total;
  };

  const handleRecommendClick = (recommendList: IbookingDetailRecommend[] | undefined, totalPrice: number) => {
    if (recommendList === undefined) return;
    let newBookingListSelected: ISelectedBookingDetail[] = [];
    recommendList.forEach((recommend) => {
      let newBookingSelected: ISelectedBookingDetail = {
        homestayId: recommend.homestayId,
        homestayCode: recommend.homestayCode,
        roomTypeName: recommend.roomTypeName,
        householdRoomTypeId: recommend.roomTypeHouseholdId,
        quantity: recommend.quantity,
        price: recommend.price * (booking?.householdResponseDto?.numberOfNight || 1),
      };
      newBookingListSelected.push(newBookingSelected);
    });

    setSession("selectedHousehold", {
      ...householdSelected,
      bookingDetailList: newBookingListSelected,
      totalPrice: totalPrice,
    });

    router.push("/homestay-booking/detail");
  };

  const handleBookingClick = () => {
    setLoading(true);
    let newBookingListSelected: ISelectedBookingDetail[] = [];
    roomSelected.forEach((room) => {
      let newBookingSelected: ISelectedBookingDetail = {
        homestayId: room.homestayId,
        homestayCode: room.homestayCode,
        householdRoomTypeId: room.householdRoomTypeId,
        roomTypeName: room.roomTypeName,
        price: room.price,
        quantity: room.quantity,
      };
      newBookingListSelected.push(newBookingSelected);
    });
    setSession("selectedHousehold", {
      ...householdSelected,
      bookingDetailList: newBookingListSelected,
      totalPrice: totalSelectedPrice,
    });
    if (newBookingListSelected.length === 0) return;
    router.push("/homestay-booking/detail");
  };


  const handleRoomQuantityChange = (homestayId: number, householdRoomTypeId: number, quantity: number) => {
    const index = roomSelected.findIndex((item) => item.homestayId === homestayId && item.householdRoomTypeId === householdRoomTypeId);
    if (index === -1) return;
    const newRoomSelected = [...roomSelected];
    newRoomSelected[index].quantity = quantity;
    setRoomSelected(newRoomSelected);
    setTotalSelectedPrice(countTotalPriceSelected(newRoomSelected));
    setSelectedRoomCount(
      newRoomSelected.reduce((total, item) => total + (item.quantity || 0), 0)
    );
  };

  function scrollToInfoSection() {
    const infoSection = document.getElementById('infoSection');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const sortList = (list: (IHouseholdResponse | undefined)[] | undefined) => {
    if (list === undefined) {
      return [];
    } else {
      if (sort === "Mức độ phù hợp") {
        return list.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
      } else if (sort === "Giá (từ thấp đến cao)") {
        return list.sort((a, b) => {
          if (a?.bookingDetailRecommendList === undefined || b?.bookingDetailRecommendList === undefined) return 0;
          const totalPriceA = a.bookingDetailRecommendList.reduce((total, room) => total + (room.price * room.quantity), 0);
          const totalPriceB = b.bookingDetailRecommendList.reduce((total, room) => total + (room.price * room.quantity), 0);
          return totalPriceA - totalPriceB;
        });
      } else if (sort === "Giá (từ cao đến thấp)") {
        return list.sort((a, b) => {
          if (a?.bookingDetailRecommendList === undefined || b?.bookingDetailRecommendList === undefined) return 0;
          const totalPriceA = a.bookingDetailRecommendList.reduce((total, room) => total + (room.price * room.quantity), 0);
          const totalPriceB = b.bookingDetailRecommendList.reduce((total, room) => total + (room.price * room.quantity), 0);
          return totalPriceB - totalPriceA;
        });
      }
    }
    return list;
  };
  if (loading) return <LoadingPage />
  else {
    if (booking === undefined) {
      return (
        <div className='w-4/5 m-auto my-12'>
          <div className='text-right'>
            <Link
              href="/homestay-booking"
              className='text-gray-700 hover:text-black '>Quay lại trang booking <FontAwesomeIcon icon={faAngleRight} /></Link>
          </div>

          <div className='h-4/5 p-40 shadow-md shadow-gray-300'>
            <Empty description="Không tìm được homestay" />
          </div>
        </div>
      );
    } else {
      if (householdId === "0") {
        return (
          <SearchBookingContext.Provider value={{
            haveDorm,
            setHaveDorm,
            services,
            setServices,
            priceRange,
            setPriceRange,
          }}>
            <div className='relative'>
              <SearchBar householdList={booking?.householdNameList} />

              <div className='w-4/5 m-auto my-12'>
              

                <div className='grid grid-cols-10 gap-10'>
                  <SearchPageSearchContent maxPrice={maxPrice} serviceList={booking?.listService} />
                  <div className='col-span-7'>
                    <div className='font-medium flex justify-between'>
                      <span></span>

                      <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottom"
                        arrow={{
                          pointAtCenter: true,
                        }}
                      >
                        <p>Sắp xếp theo: {sort} <FontAwesomeIcon icon={faChevronDown} /></p>
                      </Dropdown>
                    </div>

                    {!loading && sortList(booking?.householdListResponseDto).map((item) => {
                      if (item === undefined) return <></>;

                      if (services.length === 0 && haveDorm === false
                        && (item.bookingDetailRecommendList?.reduce((total, room) => total + (room.price * room.quantity), 0) || 0) * (item.numberOfNight || 1) >= priceRange[0]
                        && (item.bookingDetailRecommendList?.reduce((total, room) => total + (room.price * room.quantity), 0) || 0) * (item.numberOfNight || 1) <= priceRange[1]) {
                        return <SearchHomestayItem household={item} key={item.householdId.toString().concat("household")} checkInDate={checkInDate || ""} checkOutDate={checkOutDate || ''} numberOfGuests={numberOfGuests || ''} />


                      } else if (services.length > 0 && haveDorm === false
                        && (item.bookingDetailRecommendList?.reduce((total, room) => total + (room.price * room.quantity), 0) || 0) * (item.numberOfNight || 1) >= priceRange[0]
                        && (item.bookingDetailRecommendList?.reduce((total, room) => total + (room.price * room.quantity), 0) || 0) * (item.numberOfNight || 1) <= priceRange[1]) {
                        if (services.every((service) => item.householdServiceList.some((item) => item.serviceName === service))) {
                          return <SearchHomestayItem household={item} key={item.householdId.toString().concat("household")} checkInDate={checkInDate || ""} checkOutDate={checkOutDate || ''} numberOfGuests={numberOfGuests || ''} />
                        }


                      } else if (services.length === 0 && haveDorm === true
                        && item.bookingDetailRecommendList?.map((item) => item.price)
                        && (item.bookingDetailRecommendList?.reduce((total, room) => total + (room.price * room.quantity), 0) || 0) * (item.numberOfNight || 1) >= priceRange[0]
                        && (item.bookingDetailRecommendList?.reduce((total, room) => total + (room.price * room.quantity), 0) || 0) * (item.numberOfNight || 1) <= priceRange[1]) {
                        if (item.haveDormitory === true) {
                          return <SearchHomestayItem household={item} key={item.householdId.toString().concat("household")} checkInDate={checkInDate || ""} checkOutDate={checkOutDate || ''} numberOfGuests={numberOfGuests || ''} />
                        }

                      } else if (services.length > 0 && haveDorm === true
                        && item.bookingDetailRecommendList?.map((item) => item.price)
                        && (item.bookingDetailRecommendList?.reduce((total, room) => total + (room.price * room.quantity), 0) || 0) * (item.numberOfNight || 1) >= priceRange[0]
                        && (item.bookingDetailRecommendList?.reduce((total, room) => total + (room.price * room.quantity), 0) || 0) * (item.numberOfNight || 1) <= priceRange[1]) {
                        if (services.every((service) => item.householdServiceList.some((item) => item.serviceName === service)) && item.haveDormitory === true) {
                          return <SearchHomestayItem household={item} key={item.householdId.toString().concat("household")} checkInDate={checkInDate || ""} checkOutDate={checkOutDate || ''} numberOfGuests={numberOfGuests || ''} />
                        }
                      }
                    })
                    }
                  </div>
                </div>
              </div>
            </div>
          </SearchBookingContext.Provider>
        );
      } else if (householdId !== "0") {
        return (
          <div className='relative'>
            {/* <div onClick={scrollToInfoSection}> */}
            <SearchBar householdList={booking?.householdNameList} />
            {/* </div> */}
            <div className='w-4/5 m-auto my-12'>
              <div className='mb-5'>
                <Link
                  href={`/homestay-booking/search?householdId=0&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuests=${numberOfGuests}`}
                  className='text-red-500 hover:text-red-600 font-medium'>Tất cả homestays</Link>
                <span className='mx-2 font-medium'><FontAwesomeIcon icon={faAngleRight} /></span>
                <span className='mx-2 font-semibold'>{booking?.householdResponseDto?.householdName}</span>
              </div>

              <div className='grid grid-cols-8'>
                <div className='col-span-7'>
                  <div className='text-3xl font-bold pb-3'>{booking?.householdResponseDto?.householdName}</div>
                  {booking?.householdResponseDto?.address.map((address, index) => (
                    <div className="text-lg pb-2" key={"address".concat(index.toString())}>
                      <FontAwesomeIcon icon={faLocationDot} /> {address}
                    </div>
                  ))}
                </div>

                <div className='col-span-1 flex items-center'>
                  <div className=' mr-2 text-right'>
                    <div className='font-bold'>{ratingComment(booking?.householdResponseDto?.rating || 0)}</div>
                    {booking?.householdResponseDto?.numberOfReviews} đánh giá
                  </div>

                  <div className='p-3 rounded-lg bg-mint-green text-white font-bold h-fit'>
                    {ratingConvert(booking?.householdResponseDto?.rating || 0)}
                  </div>
                </div>
              </div>


              <div className='my-10 border border-b-2 border-gray-300'>
              </div>
              

              
              {booking?.householdResponseDto?.homestayAndTypeRoomAvailableList?.map((item) => (
                <div className='my-6' key={item.homestayId.toString().concat("#")}>
                  <div className='flex items-center font-bold text-lg'>
                    <div className='rounded-md bg-mint-green px-3 py-1 w-fit mr-2 mb-2'>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    Homestay {item.homestayCode}
                  </div>

                  <HomestayImage imageList={item.imageUriList} />
                </div>
              ))}
              

              

              <div className='my-10 border border-b-2 border-gray-300'>
              </div>
              
              <div className='grid grid-cols-2 gap-14' id="infoSection">
                <div className='col-span-1 pr-10'>
                  <p className='text-2xl font-bold pb-3'>Giới thiệu</p>
                  <p>
                    {booking?.householdResponseDto?.householdDescription || "Chưa có thông tin"}
                  </p>

                  <div className='text-center my-16'>
                    <button
                      onClick={() => {
                        setLoading(true)
                        router.push(`/introduction/${booking?.householdResponseDto?.householdId}`)
                      }}
                      className='bg-mint-green rounded-md font-semibold p-2'>
                      Khám phá {booking?.householdResponseDto?.householdName} <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                </div>

                <div className='col-span-1'>
                  <p className='text-2xl font-bold pb-3'>Đề xuất cho {booking?.householdResponseDto?.numberOfGuests} khách: </p>
                  <div className='grid grid-cols-3 border-2 border-collapse border-mint-green rounded-md overflow-hidden'>
                    {booking?.householdResponseDto?.bookingDetailRecommendList?.map((item, index) => (
                      <>
                        <div className='col-span-2 p-4 border-[1px] border-mint-green' key={index.toString().concat("1", "detailRecommend")}>
                          <div className=''>
                            <div className='font-bold text-lg'>{item.homestayCode} | {item.quantity} phòng x {item.roomTypeName}</div>
                            <div className='text-md'>Sức chứa: <label className='font-bold'><FontAwesomeIcon icon={faUser} /> x {item.capacity}</label></div>
                            <div className='text-md'>Giường theo phòng: &nbsp;
                              <label className='font-bold'>{item.doubleBed === 0 ? `${item.singleBed} giường đơn` : `${item.doubleBed} giường đôi`} </label>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-1 p-4 border-[1px] border-mint-green text-right' key={index.toString().concat("2", "detailRecommend")}>
                          <div className='font-bold text-lg'>{convertPrice(item.price * item.quantity * (booking?.householdResponseDto?.numberOfNight || 1))} VNĐ</div>
                          <div className='text-lg'>{item.quantity} phòng, {booking?.householdResponseDto?.numberOfNight} đêm</div>
                          <div className='text-lg'>Bao gồm thuế và phí</div>
                        </div>
                      </>
                    ))}
                    <div className='col-span-3 p-4 border-[1px] border-mint-green text-right'>
                      <div className='font-bold text-3xl text-red-400'>
                        {convertPrice(totalPrice(booking?.householdResponseDto?.bookingDetailRecommendList) * (booking?.householdResponseDto?.numberOfNight || 1))} VNĐ
                      </div>
                      <div className='text-lg'>{booking?.householdResponseDto?.numberOfNight} đêm, {booking?.householdResponseDto?.numberOfGuests} khách</div>
                      <div className='text-lg'>Bao gồm thuế và phí</div>
                      <div className='text-lg'>Hoàn tiền 100% nếu hủy phòng trước 7 ngày</div>
                      <button onClick={() => {
                        handleRecommendClick(booking?.householdResponseDto?.bookingDetailRecommendList,
                          totalPrice(booking?.householdResponseDto?.bookingDetailRecommendList) * (booking?.householdResponseDto?.numberOfNight || 1))
                        setLoading(true)
                      }} className='bg-mint-green rounded-md font-semibold p-2 mt-16'>
                        Đặt phòng ngay <FontAwesomeIcon icon={faAngleRight} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              <div>
                <p className='text-3xl font-bold mb-10'>Lựa chọn phòng khác</p>
                {booking?.householdResponseDto?.homestayAndTypeRoomAvailableList?.map((item) => {
                  if (item.roomTypeAvailableList.length == 0) {
                    return (
                      <></>
                    )
                  } else return (
                    <>
                      <div className='flex' key={item.homestayId}>
                        <div className='rounded-md bg-mint-green flex p-2 w-fit mr-2 mb-10'>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <span className='text-xl font-bold mb-8'>Homestay {item.homestayCode}</span>
                      </div>


                      <div className='grid grid-cols-4 gap-10'>
                        {item.roomTypeAvailableList?.map((typeRoom) => (

                          <div className='col-span-1 rounded-xl border-2 border-mint-green overflow-hidden mb-8' key={item.homestayCode.concat(typeRoom.roomTypeHouseholdId.toString())}>
                            <div className='bg-mint-green text-center p-4'>
                              <p className='font-bold'>{typeRoom.roomTypeName}</p>
                            </div>

                            <div className='text-center p-3'>
                              <p className='font-bold'><FontAwesomeIcon icon={faUser} /> x {typeRoom.capacity}</p>
                              <p className='font-bold'>{typeRoom.doubleBed === 0 ? `${typeRoom.singleBed} giường đơn` : `${typeRoom.doubleBed} giường đôi`}</p>

                              <div className='p-4'>
                                <p className='font-bold text-xl text-red-400'>
                                  {convertPrice(typeRoom.price * (booking?.householdResponseDto?.numberOfNight || 1))} VNĐ
                                </p>
                                <div className='text-sm'>{booking?.householdResponseDto?.numberOfNight} đêm, {booking?.householdResponseDto?.numberOfGuests} khách</div>
                                <div className='text-sm'>Bao gồm thuế và phí</div>
                              </div>
                              <RoomImageModal room={typeRoom} />
                            </div>

                            <div className='text-center p-2 border-t-2 border-mint-green bg-[#F0F5F1]'>
                              <p className='mb-2'>Chọn số phòng muốn đặt:</p>

                              <SelectRoomItem
                                handleRoomQuantityChange={handleRoomQuantityChange}
                                item={item}
                                typeRoom={typeRoom}
                              />

                              <p className='font-bold'>Còn {typeRoom.quantity} phòng</p>
                            </div>
                          </div>

                        ))}
                      </div>
                    </>
                  )
                })}
              </div>

              <div className='my-10 border border-b-2 border-gray-300'>
              </div>

              <div className='grid grid-cols-10 gap-5'>
                <div className='col-span-7 p-5 rounded-xl border-2 border-mint-green'>
                  <div className='flex'>
                    <label className='font-bold'>Giờ nhận phòng (Check-in) : </label>
                    <p>&ensp;{booking?.householdResponseDto?.checkInTime}</p>
                  </div>
                  <div className='flex'>
                    <label className='font-bold'>Giờ trả phòng (Check-out) : </label>
                    <p>&ensp;{booking?.householdResponseDto?.checkOutTime}</p>
                  </div>
                  <div className='flex'>
                    <label className='font-bold'>Chính sách thanh toán : </label>
                    <p>&ensp;Thanh toán 100% tiền phòng khi đặt trước</p>
                  </div>
                  <div>
                    <label className='font-bold'>Chính sách hủy phòng - hoàn tiền: </label>
                    <ul className=''>
                      <li>&emsp;&bull; Hoàn 100% tiền đặt trước khi hủy phòng trước 7 ngày (kể từ ngày nhận phòng)</li>
                      <li>&emsp;&bull; Không hỗ trợ hoàn tiền với trường hợp hủy phòng còn lại.</li>
                    </ul>
                  </div>
                </div>

                <div className='col-span-3 p-5 rounded-xl border-2 border-mint-green text-right'>
                  <div className='mb-3'>
                    <p>Bạn đã chọn <span className='font-bold'>{selectedRoomCount}</span> phòng</p>
                  </div>
                  <div className='font-bold text-3xl text-red-400'>
                    {convertPrice(totalSelectedPrice)} VNĐ
                  </div>
                  <div className='text-sm'>
                    <p>{booking?.householdResponseDto?.numberOfNight} đêm, {booking?.householdResponseDto?.numberOfGuests} khách</p>
                    <p>Bao gồm thuế và phí</p>
                  </div>
                  <button
                    disabled={selectedRoomCount === 0}
                    onClick={handleBookingClick}
                    className={`${selectedRoomCount === 0 ? 'cursor-not-allowed bg-gray-300' : 'bg-mint-green'}  rounded-sm font-semibold p-2 mt-16`}>
                    Đặt phòng ngay <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
              </div>


              <div className='my-10 border border-b-2 border-gray-300'>
              </div>

              <div className='mb-14 '>
                <p className='col-span-10 text-3xl font-bold'>Dịch vụ đặc biệt</p>
                <p className=' mb-10'>Các dịch vụ phải được đặt trước 24h, vui lòng liên hệ hotline: <span className='font-bold'>{booking?.householdResponseDto?.phoneNumber1}</span> để đặt trước</p>

                <div className='grid grid-cols-3 gap-4'>
                  {booking?.householdResponseDto?.householdServiceList.map((item) => (
                    <div key={item.serviceId} className='grid grid-cols-4 rounded-lg shadow-lg overflow-hidden items-center'>
                      <div className='col-span-1'>
                        <Image
                          src={item.imageUri || '/images/LuaTrai.jpg'}
                          alt='Ảnh homestay'
                          width={200}
                          height={200}
                          className='w-full aspect-square'
                        />
                      </div>
                      <div className='col-span-3'>
                        <p className='font-semibold p-3'>{item.serviceName}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div className='my-10 border border-b-2 border-gray-300'>
              </div>

              <div className='my-10 '>
                <p className='text-3xl font-bold mb-10'>Đánh giá</p>
                <div className='h-fit flex'>
                  <div className='text-6xl font-extrabold'>
                    {ratingConvert(booking?.householdResponseDto?.rating || 0)}
                  </div>
                  <div className='ml-2 self-center'>
                    <div className='font-bold'>{ratingComment(booking?.householdResponseDto?.rating || 0)}</div>
                    {booking?.householdResponseDto?.numberOfReviews} đánh giá
                  </div>
                </div>
                {currentFeedbackTypes.length > 0 && currentFeedbackTypes.map((item) => (
                  <div key={item.id}>
                    <div className='my-7 border border-b-[1px] border-gray-300'></div>

                    <div className='grid-cols-12 grid'>
                      <div className='col-span-1'>
                        <Image
                          src={item.avatar || '/images/avt.png'}
                          alt='Ảnh homestay'
                          width={100}
                          height={100}
                          className='w-2/3 m-auto aspect-square rounded-full'
                        />
                      </div>
                      <div className='col-span-11'>
                        <p className='mb-1 font-bold'>{item.rating} <FontAwesomeIcon icon={faStar} /> | {item.firstName} {item.lastName}</p>
                        <p className='min-h-[7px]'>{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {currentFeedbackTypes.length > 0 &&
                  <div className='my-16'>
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentFeedbackPage}
                      totalItems={booking?.householdResponseDto?.reviewHouseholdList?.length || 0}
                      onPageChange={handlePageChange}
                    />
                  </div>
                }
              </div>


            </div>
          </div>
        );
      }
    }
  }
}
