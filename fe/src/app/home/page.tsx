'use client'
import * as React from 'react';
import Introduction from '@/Components/home/Introduction/Introduction';
import BookingBar from '@/Components/home/BookingBar/BookingBar';
import { HomeType, areaListForMap, serviceList } from '@/types/homeType';
import homeApi from '@/api/homeApi';
import LoadingPage from '@/Components/common/LoadingPage';
import Link from 'next/link';
import Image from 'next/image';
import { Rate } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BlogItem from '@/Components/blog/BlogItem';
import LocalProductItem from '@/Components/local-product/LocalProductItem';
import FacebookMsg from '@/Components/facebook-msg/FacebookMsg';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import imageGalleryApi from '@/api/imageGalleryApi';

export interface HomePageProps {

}

export default function HomePage(props: HomePageProps) {

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { data, setAuthState } = React.useContext(AuthenticationContext);
  const [homeData, setHomeData] = React.useState<HomeType>();
  const [services, setServices] = React.useState<serviceList[]>();
  const [householdData, setHouseholdData] = React.useState<areaListForMap[]>();
  const [displayHousehold, setDisplayHousehold] = React.useState<areaListForMap[]>();
  const [currentHousehold, setCurrentHousehold] = React.useState<number>(0);
  const [selectedHousehold, setSelectedHousehold] = React.useState<string>("Tất cả");
  const today = dayjs().startOf('day');
  const [startIndex, setStartIndex] = React.useState(0);
  const [images, setImages] = React.useState<string[]>([]);
  React.useEffect(() => {

    setLoading(true);
    homeApi.getHome()
      .then((res) => {
        setHomeData(res);
        setServices(res.serviceList);

        setHouseholdData(res.areaListForMap);
        setDisplayHousehold(res.areaListForMap);
        setSelectedHousehold("Tất cả");
        setCurrentHousehold(0);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      })
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const response = imageGalleryApi.getCustomerImages();
    response.then((res) => {
      setImages(res);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        setLoading(false);
    })
  }, []);

  const convertPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const setDisplayHouseholdList = (areaName: string) => {
    setCurrentHousehold(0);
    if (areaName === "Tất cả") {
      setDisplayHousehold(householdData);
    } else {
      const householdList = householdData?.filter((household) => household.areaName === areaName);
      setDisplayHousehold(householdList);
    }
    setSelectedHousehold(areaName);
  }

  const getItemsToShow = () => {
    const totalItemsToShow = 5;
    const itemsToShow = [];
    if (services) {
      for (let i = startIndex; i < startIndex + totalItemsToShow; i++) {
        itemsToShow.push(services[i % services.length]);
      }

      return itemsToShow;
    }
  };

  const handleNextHousehold = () => {
    if (!displayHousehold) return;
    setCurrentHousehold((prevData) => (prevData + 1) % displayHousehold.length);
  };

  const handlePreviousHousehold = () => {
    if (!displayHousehold) return;
    setCurrentHousehold((prevData) => (prevData - 1 + displayHousehold.length % displayHousehold.length));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % (services?.length || 1));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + (services?.length || 1)) % (services?.length || 1));
  };

  const isMin1850 = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1850;
  };

  const itemsToShow = getItemsToShow();

  const convertDisplayType = (type: string) => {
    switch (type) {
      case "FOOD":
        return "Thực phẩm";
      case "DRINK":
        return "Đồ uống";
      case "SOUVENIR":
        return "Đồ lưu niệm";
      case "MEDICINE":
        return "Dược phẩm";
      case "OTHER":
        return "Khác";
      default:
        return "";
    }
  }
  return (
    <div className='m-auto w-4/5'>
      {loading && <LoadingPage />}
      <BookingBar householdList={homeData?.householdListForSearchBooking} />

      <div className='flex justify-between mt-10'>
        <div className='rounded-xl overflow-hidden h-fit shadow-md shadow-gray-200 w-[78%] aspect-[6.51851852]' >
          <Image
            src={'/images/banner.jpg'}
            alt='banner'
            width={2000}
            height={2000}
          />
        </div>
        <div className='w-1/5 flex-col justify-between gap-5'>
          <div className=' p-4 rounded-xl shadow-md shadow-gray-200'>
            <p className='text-center text-xl font-bold'>{homeData?.locationAndWeather.location}</p>
            <div className='flex justify-center items-center'>
              <Image
                src={homeData?.locationAndWeather.weatherIconUrl || '/images/LuaTrai.jpg'}
                alt='banner'
                width={2000}
                height={2000}
                className='rounded-xl w-[45%]' />
              <div>
                <p className='text-3xl'><span className='font-semibold'>{homeData?.locationAndWeather.weatherTemp}</span>&deg;
                  <span className='-ml-1 text-xl'>C</span></p>
                <p className='italic '>{homeData?.locationAndWeather.weatherDescription}</p>
              </div>
            </div>
          </div>
          <p className='text-right text-gray-600 text-sm italic mt-5'>{homeData?.locationAndWeather.weatherWarning}</p>
        </div>
      </div>


      <div className="container px-5 mx-auto flex flex-col">
        <div className='mt-10 mb-5 text-center'>
          <h1 className='text-3xl font-bold '>Sơ đồ V-HomeStay</h1>
          <p className='my-3 text-sm'>Khám phá văn hóa người H&rsquo;Mông trong lòng Mèo Vạc - Hà Giang</p>
        </div>
        <div className="lg:w-full mx-auto">
          <div className="rounded-[50px] overflow-hidden shadow-black shadow-md ">
            <Image width={1000} height={1000} alt="content" className="object-cover object-center h-full w-full" src="/images/Map3.jpg" />
          </div>
          <div className='my-5 flex justify-center gap-5'>
            <button style={{display:'none'}}
              onClick={() => setDisplayHouseholdList("Tất cả")}
              className={`px-4 py-2 font-bold rounded-full ${selectedHousehold === "Tất cả" ? "bg-mint-green shadow-inner text-white " : "border-mint-green text-mint-green border shadow-md"}`}
            >
              Tất cả
            </button>
            <button style={{display:'none'}}
              onClick={() => setDisplayHouseholdList("A")}
              className={`px-4 py-2 font-bold rounded-full ${selectedHousehold === "A" ? "bg-mint-green shadow-inner text-white " : "border-mint-green text-mint-green border shadow-md"}`}
            >
              A
            </button>
            <button style={{display:'none'}}
              onClick={() => setDisplayHouseholdList("B")}
              className={`px-4 py-2 font-bold rounded-full ${selectedHousehold === "B" ? "bg-mint-green shadow-inner text-white " : "border-mint-green text-mint-green border shadow-md"}`}
            >
              B
            </button>
            <button style={{display:'none'}}
              onClick={() => setDisplayHouseholdList("C")}
              className={`px-4 py-2 font-bold rounded-full ${selectedHousehold === "C" ? "bg-mint-green shadow-inner text-white " : "border-mint-green text-mint-green border shadow-md"}`}
            >
              C
            </button>

          </div>

        </div>
        <div className="flex gap-10 w-full mt-3 items-center">
          <FontAwesomeIcon onClick={handlePreviousHousehold} className="cursor-pointer" icon={faChevronLeft} size="2x" />
          <div className="grid grid-cols-10 gap-16 px-10 py-7 rounded-xl duration-300 shadow-gray-300 shadow-md">
            <Image width={1000} height={1000} alt="content" className="object-cover shadow-black shadow-md col-span-3 object-center aspect-[1.5] rounded-xl w-full" src={displayHousehold?.at(currentHousehold)?.householdCoverImage || '/images/LuaTrai.jpg'} />
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-3">
                  <span className='text-white px-4 py-1 bg-mint-green text-base rounded-md mr-4'>Khu {displayHousehold?.at(currentHousehold)?.areaName}</span>
                  {displayHousehold?.at(currentHousehold)?.homeStayCode + ' - ' + displayHousehold?.at(currentHousehold)?.householdName}
                </h1>
                <p className="text-justify whitespace-normal line-clamp-4 truncate">
                  {displayHousehold?.at(currentHousehold)?.description}
                </p>
              </div>
              {displayHousehold?.at(currentHousehold)?.status === 'ACTIVE' &&
                <div className='flex justify-between items-baseline font-semibold'>
                  <Link className='text-blue-500 hover:text-opacity-50' href={`/introduction/${displayHousehold?.at(currentHousehold)?.householdId}`}>
                    Đi đến trang thông tin
                  </Link>
                  <button
                    onClick={() => {
                      router.push(`/homestay-booking/search?householdId=${displayHousehold?.at(currentHousehold)?.householdId}&checkInDate=${today.format('YYYY-MM-DD')}&checkOutDate=${today.add(1, 'day').format('YYYY-MM-DD')}&numberOfGuests=1`)
                      setLoading(true);
                    }}
                    className='text-white px-4 py-2 rounded-lg hover:bg-opacity-60 bg-mint-green'>
                    Đặt phòng <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              }
            </div>
          </div>
          <FontAwesomeIcon onClick={handleNextHousehold} className="cursor-pointer" icon={faChevronRight} size="2x" />
        </div>
      </div>


      <div className="mt-20">
        <ul className='flex justify-between mb-5 m-16 items-center'>
          <li>
            <h1 className='text-3xl font-bold mb-3'>Các Homestay nổi bật</h1>
            <p className='italic text-sm text-gray-400'>Các địa điểm lưu trú phổ biến này có nhiều điều chờ đón bạn</p>
          </li>
          <li>
            <Link href='/homestay-booking' className='border hover:bg-mint-green font-semibold  text-sm rounded-sm border-mint-green px-4 py-2'>Xem tất cả các homestays</Link>
          </li>
        </ul>
      </div>
      <div className='grid grid-cols-5 gap-4 w-11/12 m-auto'>
        {homeData?.householdOutstanding?.map((household, index) => (
          <div className='col-span-1 flex flex-col justify-between rounded-xl shadow-md overflow-hidden shadow-gray-300' key={index}>
            <Image width={1000} height={1000} src={household.householdCoverImage || '/images/LuaTrai.jpg'} onClick={() => {
                  setLoading(true);
                  router.push(`/homestay-booking/search?householdId=${household.id}&checkInDate=${today.format('YYYY-MM-DD')}&checkOutDate=${today.add(1, 'day').format('YYYY-MM-DD')}&numberOfGuests=1`)
                }} alt="" className='w-full aspect-[1.25]' style={{cursor:'pointer'}} />
            <div className='p-4 text-center'>
              <h1 className='font-semibold mb-1'>{household.homestay}</h1>
              <h1 className='font-semibold mb-1'>{household.householdName}</h1>
              <Rate value={Math.round((household.rateAverage * 2) / 2)} disabled allowHalf className='text-[#f5a100]' />
              <p className='text-gray-400 italic text-sm my-2'> Giá chỉ từ
                <span className='font-semibold ml-2 text-black not-italic'>{convertPrice(household.price)} VNĐ</span>
              </p>
              <button
                className='font-semibold text-white px-4 py-2 rounded-md bg-mint-green hover:bg-opacity-50'
                onClick={() => {
                  setLoading(true);
                  router.push(`/homestay-booking/search?householdId=${household.id}&checkInDate=${today.format('YYYY-MM-DD')}&checkOutDate=${today.add(1, 'day').format('YYYY-MM-DD')}&numberOfGuests=1`)
                }}>
                Đặt phòng
              </button>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-20">
        <ul className='flex justify-between mb-5 m-16 items-center'>
          <li>
            <h1 className='text-3xl font-bold mb-3'>Các dịch vụ đặc biệt</h1>
            <p className='italic text-sm text-gray-400'>Các dịch vụ đặc biệt chỉ có tại V-HomeStay</p>
          </li>
          <li>
            <Link href='/service' className='border hover:bg-mint-green text-sm font-semibold rounded-sm border-mint-green px-4 py-2'>Xem tất cả các dịch vụ</Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center'>
        <button className='bg-gray-200 rounded-full hover:bg-opacity-50 px-4 py-2' onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} className='text-2xl' />
        </button>
        <div className='m-auto w-11/12 grid grid-cols-5 gap-4'>
          {itemsToShow ? itemsToShow.map((service, index) => (
            <div className='col-span-1 flex flex-col rounded-xl shadow-md overflow-hidden shadow-gray-300' key={index}>
              <Image width={1000} height={1000} src={service.image} alt="" className='w-full aspect-[1.25]' />
              <div className='p-4 text-center'>
                <h1 className='text-sm font-bold mb-3  whitespace-normal line-clamp-2 truncate'>{service.serviceName}</h1>
                <p className='text-gray-400 text-xs  whitespace-normal line-clamp-5 truncate'>{service.description} </p>
              </div>
            </div>
          )) :

            homeData?.serviceList?.map((service, index) => (
              <div className='col-span-1 flex flex-col rounded-xl shadow-md overflow-hidden shadow-gray-300' key={index}>
                <Image width={1000} height={1000} src={service.image} alt="" className='w-full aspect-[1.25]' />
                <div className='text-center'>
                  <h1 className='font-bold text-sm mb-3'>{service.serviceName}</h1>
                  <p className='text-gray-400 text-xs'>{service.description} </p>
                </div>
              </div>
            ))}
        </div>

        <button className='bg-gray-200 rounded-full hover:bg-opacity-50 px-4 py-2' onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} className='text-2xl' />
        </button>
      </div>


      <div className="mt-20">
        <ul className='flex justify-between mb-5 m-16 items-center'>
          <li>
            <h1 className='text-3xl font-bold mb-3'>Các sản phẩm địa phương tiêu biểu</h1>
            <p className='italic text-sm text-gray-400'>Các dịch vụ đặc biệt chỉ có tại V-HomeStay</p>
          </li>
          <li>
            <Link href='/local-product' className='border hover:bg-mint-green text-sm  font-semibold rounded-sm border-mint-green px-4 py-2'>Xem tất cả các sản phẩm</Link>
          </li>
        </ul>
      </div>
      <div className='grid grid-cols-5 gap-4 w-11/12 m-auto'>
        {homeData?.localProductOutstanding?.map((product, index) => (
          <LocalProductItem product={product} key={index} />
        ))}
      </div>


      <Introduction />
      {/* <Carousel /> */}
      <div>
        <p className='text-center text-3xl font-semibold mb-5'>KHÁM PHÁ</p>
        <h1 className='font-bold text-5xl text-center mb-10'>V-HOMESTAY</h1>

        <div className='my-7'>
          <p className='bg-mint-green/50 w-fit rounded-full m-auto px-3 py-2'> </p>
        </div>

        <div className='grid grid-cols-4 gap-4 w-11/12 m-auto'>
          <div className='flex flex-col gap-4'>
          {images.slice(0, 1).map((image, index) => (
            <Image
              key={index}
              width={1000}
              height={1000}
              src={image || '/images/LuaTrai.jpg'}
              alt={''}
              className='w-full aspect-square hover:scale-90 shadow-stone-700 shadow-md transition duration-300 ease-in-out rounded-tl-2xl'
            />
          ))}
          {images.slice(1, 2).map((image, index) => (
            <Image
              key={index}
              width={1000}
              height={1000}
              src={image || '/images/LuaTrai.jpg'}
              alt={''}
              className='w-full aspect-square hover:scale-90 shadow-stone-700 shadow-md transition duration-300 ease-in-out rounded-bl-2xl'
            />
          ))}
          </div>
          <Image src={homeData?.villageMediaOutstanding?.[2] || '/images/LuaTrai.jpg'} width={1000} height={1000} alt="" className='col-span-2 w-full aspect-square hover:scale-90 shadow-stone-700 shadow-md transition duration-300 ease-in-out' />
          <div className='flex flex-col gap-4'>
            {images.slice(3, 4).map((image, index) => (
              <Image
                key={index}
                width={1000}
                height={1000}
                src={image || '/images/LuaTrai.jpg'}
                alt={''}
                className='w-full aspect-square hover:scale-90 shadow-stone-700 shadow-md transition duration-300 ease-in-out rounded-tr-2xl'
              />
            ))}
            {images.slice(4, 5).map((image, index) => (
              <Image
                key={index}
                width={1000}
                height={1000}
                src={image || '/images/LuaTrai.jpg'}
                alt={''}
                className='w-full aspect-square hover:scale-90 shadow-stone-700 shadow-md transition duration-300 ease-in-out rounded-br-2xl'
              />
            ))}
          </div>

        </div>

        <div className='my-20 text-center'>
          <Link href='/image-gallery' className='border hover:bg-mint-green text-sm font-semibold rounded-md border-mint-green px-4 py-2'>Khám phá thư viện ảnh</Link>
        </div>
      </div>


      <div className='mt-20'>
        <div className='flex justify-between mb-5 m-16 items-center'>
          <div>
            <h1 className='text-3xl font-bold mb-3'>Tin tức và bài viết mới nhất</h1>
            <p className='italic text-sm text-gray-400'>Trang tin tức du lịch về V-HomeStay và Hà Giang hay</p>
            <p className='mb-10 text-sm italic text-gray-400'>những chia sẻ kinh nghiệm du lịch và lan tỏa giá trị tích cực sẽ có tại đây!</p>
          </div>
          <div>
            <Link href='/blog' className='border hover:bg-mint-green font-semibold  text-sm rounded-sm border-mint-green px-4 py-2'>Xem tất cả các tin tức</Link>
          </div>
        </div>
      </div>
      <div className='grid min-[1850px]:grid-cols-4 grid-cols-3 gap-10 w-11/12 m-auto'>
        {homeData?.newsLatest?.map((blog, index) => {
          if (isMin1850() || index < 3) {
            return <BlogItem blog={blog} key={index} />;
          }
          return null;
        })}
      </div>

      <div className="mt-20 text-center">
        <div>
          <div className='text-3xl font-bold w-full'>
            Du khách nói về chúng tôi
          </div>

          <div className='grid grid-cols-3 items-center gap-10 mt-10'>
            <div className="h-fit rounded-xl shadow-md shadow-gray-300 p-6">
              <div className="flex items-center mb-4">
                <Rate allowHalf defaultValue={5} disabled className={`${isMin1850() ? `text-2xl` : `text-md`} text-mint-green`} />
              </div>
              <div className={`${isMin1850() ? `text-xl` : `text-md`} text-gray-600 text-justify`}>
                &quot;V-HomeStay là một điểm đến tuyệt vời cho du khách muốn khám phá văn hóa và đời sống của người dân địa phương. Với cảnh quan đẹp, khí hậu mát mẻ và những hoạt động truyền thống hấp dẫn như trekking, trồng rau, hái quả và tham gia các nghi lễ tôn giáo, V-HomeStay đã thu hút được sự quan tâm của nhiều du khách trong và ngoài nước.&quot;
              </div>
              <div className="flex items-center text-gray-800 font-semibold my-10">
                <Image width={300} height={300} src="/images/avt.png" alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
                <div className='text-left ml-2'>
                  <span className={`${isMin1850() ? `text-xl` : `text-md`}`}>Nguyễn Trọng Tuấn</span>
                  <div className={`${isMin1850() ? `text-md` : `text-xs`} text-gray-600`}>Giáo viên, Hải Phòng</div>
                </div>
              </div>
            </div>

            <div className="h-fit rounded-xl shadow-md shadow-gray-300 p-6">
              <div className="flex items-center mb-4">
                <Rate allowHalf defaultValue={5} disabled className={`${isMin1850() ? `text-2xl` : `text-md`} text-mint-green`} />
              </div>
              <div className={`${isMin1850() ? `text-xl` : `text-md`} text-gray-600 text-justify`}>
                &quot;V-HomeStay ở Hà Giang còn được khen ngợi vì những món ăn đậm chất địa phương, đặc biệt là món thịt lợn nướng trên lò đất và thịt trâu gác bếp. Những món ăn này được làm từ những nguyên liệu tươi ngon, được chế biến và nấu theo cách truyền thống của người H&rsquo;Mông, mang đến hương vị đặc trưng và hấp dẫn. Ngoài ra, du khách còn có thể học hỏi và tìm hiểu thêm về ẩm thực địa phương.&quot;
              </div>
              <div className="flex items-center text-gray-800 font-semibold my-10">
                <Image width={300} height={300} src="/images/avt.png" alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
                <div className='text-left ml-2'>
                  <span className={`${isMin1850() ? `text-xl` : `text-md`}`}>Trịnh Đức Anh</span>
                  <div className={`${isMin1850() ? `text-md` : `text-xs`} text-gray-600`}>Dịch vụ tài chính, Hải Phòng</div>
                </div>
              </div>
            </div>
            <div className="h-fit rounded-xl shadow-md shadow-gray-300 p-6">
              <div className="flex items-center mb-4">
                <Rate allowHalf defaultValue={5} disabled className={`${isMin1850() ? `text-2xl` : `text-md`} text-mint-green`} />
              </div>
              <div className={`${isMin1850() ? `text-xl` : `text-md`} text-gray-600 text-justify`}>
                &quot;Một trong những điểm đặc biệt của V-HomeStay là sự hiện diện của những chú mèo đáng yêu. Các chú mèo này được coi là vật nuôi may mắn cho gia đình. Du khách đến homestay ở đây sẽ được thưởng thức cảnh quan yên bình, ngắm nhìn những chú mèo đang vui đùa hay nằm nghỉ trên mái nhà, tạo nên không khí thư giãn cho du khách.&quot;
              </div>
              <div className="flex items-center text-gray-800 font-semibold my-10">
                <Image width={300} height={300} src="/images/avt.png" alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
                <div className='text-left ml-2'>
                  <span className={`${isMin1850() ? `text-xl` : `text-md`}`}>Nguyễn Hải Linh</span>
                  <div className={`${isMin1850() ? `text-md` : `text-xs`} text-gray-600`}>CEO Pet Care, Hải Dương</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.role === null ? <FacebookMsg /> : (data?.role === 'CUSTOMER' ? <FacebookMsg /> : '')}

    </div>
  );
}
