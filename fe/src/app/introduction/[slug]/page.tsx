'use client';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import HomestayImage from '@/Components/homestay-booking/HomestayImage';
import LoadingPage from '@/Components/common/LoadingPage';
import introductionApi from '@/api/introductionApi';
import { HomestayDetail, Household, IntroductionRequest } from '@/types/introductionType';
import { faAngleRight, faLocationDot, faPhone, faPlusCircle, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';

export interface IHouseholdIntroductionProps {
    params: { slug: number };
}


export default function HouseholdIntroduction({ params }: IHouseholdIntroductionProps) {
    const router = useRouter();

  
    const [household, setHousehold] = React.useState<Household>();
    const [loading, setLoading] = React.useState<boolean>(true);

    const today = dayjs().startOf('day');

    const fixedButtonStyle = {
        position: 'fixed',
        bottom: '100px',
        right: '74px',
        zIndex: '1',
        textAlign: 'right',
        
    };

    const buttonAnimation = `
    @keyframes flash {
        0% { 
            opacity: 1; 
            color: #000000;
        }
        25% {
            opacity: 0.5; 
            color: #FF8682;
        }
        50% { 
            opacity: 1;
            color: #000000;
        }
        75% {
            opacity: 0.5; 
            color: #FF8682;
        }
        100% { 
            opacity: 1; 
            color: #000000;
        }
    }

    .flash-button {
        animation: flash 1s infinite;
        transition: opacity 0.9s ease;
    }
    .flash-button:hover{
        animation:none;
    }
`;


    React.useEffect(() => {
       
        introductionApi.getHouseholdIntroduction(params.slug).then((res) => {
            console.log(res);
            setHousehold(res);
            setLoading(false);
        }
        ).catch((err) => {
            console.log(err);
            setLoading(false);
        }
        )
        //EsLint disable next line;
    }, [params]);

    const getListHomestay = () => {
        if (!household?.homestayDetailForCustomerList) return "";
        let listHomestay = household.homestayDetailForCustomerList[0].homestayCode;
        for (let i = 1; i < household.homestayDetailForCustomerList.length; i++) {
            listHomestay += `-${household.homestayDetailForCustomerList[i].homestayCode}`;
        }
        return listHomestay;
    };

    const getPhoneNumber = () => {
        if (!household?.phoneNumberFirst && !household?.phoneNumberSecond) return "";
        if (!household?.phoneNumberFirst) return household.phoneNumberSecond;
        if (!household?.phoneNumberSecond) return household.phoneNumberFirst;
        let phoneNumber = household.phoneNumberFirst;
        phoneNumber += ` - ${household.phoneNumberSecond}`;
        return phoneNumber;
    };

    const getHomestayImageList = (homestay: HomestayDetail) => {
        if (!homestay.medias) return [];
        let imageList = [];
        for (let i = 0; i < homestay.medias.length; i++) {
            imageList.push(homestay.medias[i].filePath);
        }
        return imageList;
    };

    function convertToEmbedLink(youtubeLink: string) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;
        const match = youtubeLink.match(youtubeRegex);
      
        if (match) {
          const videoId = match[3];
          
          const embedLink = `https://www.youtube.com/embed/${videoId}`;
      
          return embedLink;
        } else {
          return "https://www.youtube.com/embed/mHPfynSpka8";
        }
      }

    return (
        <>
        {loading && <LoadingPage />}
        <div className='my-5 flex'>
            <Link href="/introduction"
                className='text-red-400 hover:text-red-500 cursor-pointer'>V-HomeStay</Link>
            <span className='mx-2'><FontAwesomeIcon icon={faAngleRight} /></span>
            <span className='mx-2'>{household?.householdName}</span>
        </div>
        <div className={`text-center h-96 overflow-hidden rounded-xl 
        bg-cover bg-[url("/images/LangMongPaViHome.jpg")]`}></div>

        <div className="-mt-[150px] relative w-full h-full rounded-full">
            <Image
                src={household?.avatar || '/images/Library2.jpg'}
                alt="Household avatar"
                width={1000}
                height={1000}
                className="w-[300px] h-[300px] object-cover rounded-full m-auto border-slamon border-4"
            />
        </div>

        <div className="w-3/5 my-5 m-auto text-center">
            <p className='font-semibold text-4xl mb-3'>{household?.householdName}</p>
            <p><FontAwesomeIcon icon={faLocationDot} className='text-green-500' /> {getListHomestay()}</p>
            <p><FontAwesomeIcon icon={faPhone} className='text-green-500' /> {getPhoneNumber()}</p>
            <div className='flex justify-center gap-4 my-3'>
                <Image width={100} height={100} onClick={() => router.push(household?.linkFacebook || "")} src="https://cdn-icons-png.flaticon.com/128/733/733547.png" alt="" className="h-10 w-10 cursor-pointer" />
                <Image width={100} height={100} onClick={() => router.push("mailto:".concat(household?.email || ""))} src="https://cdn-icons-png.flaticon.com/128/5968/5968534.png" alt="" className="h-10 w-10 cursor-pointer" />
                <Image width={100} height={100} onClick={() => router.push(household?.linkTiktok || "")} src="https://cdn-icons-png.flaticon.com/128/2504/2504942.png" alt="" className="h-10 w-10 cursor-pointer" />
            </div>
        </div>

        <div className='w-[70%] mx-auto my-16'>
            <div className='flex items-center justify-center my-14'>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <div className="text-6xl text-center font-bold px-16">
                    <FontAwesomeIcon icon={faQuoteLeft} />
                </div>
                <div className="flex-1 h-[1px] bg-gray-300"></div>

            </div>
            <p className='text-xl font-semibold text-center'>{household?.description}</p>

            <div className='flex items-center justify-center my-14'>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <div className="text-3xl text-center font-bold px-16">
                    <p>Khám phá</p>
                    <p>{household?.householdName}</p>
                </div>
                <div className="flex-1 h-[1px] bg-gray-300"></div>

            </div>
        </div>

        <div className='w-4/5 aspect-video m-auto'>
            <iframe className='w-full h-full rounded-2xl' src={convertToEmbedLink(household?.linkYoutube||"")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>

        <div className='w-[70%] mx-auto my-16'>
            <div className='flex items-center justify-center my-14'>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <div className="text-3xl text-center font-bold px-16">
                    <p>Thư viện ảnh</p>
                    <p>{household?.householdName}</p>
                </div>
                <div className="flex-1 h-[1px] bg-gray-300"></div>

            </div>
        </div>

        <div className='w-10/12 m-auto'>
            {household?.homestayDetailForCustomerList.map((homestay) => (
                <div key={homestay.homestayCode} className='text-center mb-16'>
                    <p className='font-bold text-xl'>Homestay {homestay.homestayCode}</p>
                    <p className='mb-7'><FontAwesomeIcon icon={faLocationDot} /> {homestay.fullAddress}</p>
                    <HomestayImage imageList={getHomestayImageList(homestay)} />
                </div>
            ))}
        </div>

        <div className='w-[70%] mx-auto my-16'>
            <div className='flex items-center justify-center my-14'>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <div className="text-3xl text-center font-bold px-16">
                    <p>Các loại phòng</p>
                    <p>{household?.householdName}</p>
                </div>
                <div className="flex-1 h-[1px] bg-gray-300"></div>

            </div>
        </div>

        <div className='w-10/12 m-auto grid grid-cols-3 gap-10'>
            {household?.householdRoomTypeForCustomerList.map((room) => (
                <div key={room.roomTypeName} className='grid-cols-4 grid rounded-xl  shadow-md shadow-gray-300  p-4'>
                    <Image  width={1000} height={1000} src={"https://cdn-icons-png.flaticon.com/512/489/489870.png"} alt="" className='col-span-1' />
                    <div className='col-span-3 ml-4'>
                        <p className='font-bold text-lg mb-2'>{room.roomTypeName}</p>
                        <p>Sức chứa: {room.capacity} khách</p>
                        <p>Gồm: {room.singleBed === 0 ? `${room.doubleBed} giường đôi` : `${room.singleBed} giường đơn`}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className='w-[70%] mx-auto my-16'>
            <div className='flex items-center justify-center my-14'>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <div className="text-3xl text-center font-bold px-16">
                    <p>Các dịch vụ</p>
                    <p>đặc biệt</p>
                </div>
                <div className="flex-1 h-[1px] bg-gray-300"></div>

            </div>
            <p className='text-center'>Các dịch vụ phải được đặt trước 24h, vui lòng liên hệ hotline: <span className="font-bold">{getPhoneNumber()}</span> để đặt trước</p>
        </div>

        <div className='w-4/5 mx-auto grid grid-cols-3 gap-10 my-10'>
            {household?.serviceDetailForCustomerList.map((item) => (
                <div key={item.serviceId} className='grid grid-cols-4 rounded-xl shadow-md shadow-gray-300 overflow-hidden items-center p-3'>
                    <div className='col-span-1 items-center'>
                        <Image
                            src={item.serviceAvatar || '/images/LuaTrai.jpg'}
                            alt='Ảnh homestay'
                            width={200}
                            height={200}
                            className='w-11/12 aspect-square rounded-xl'
                        />
                    </div>
                    <div className='col-span-3'>
                        <p className='font-semibold p-3'>{item.serviceName}</p>
                    </div>
                </div>
            ))}

        </div>
        <div className='w-full m-auto text-center'>
    <style>{buttonAnimation}</style>
    <div style={fixedButtonStyle}>
        <button
            className={`px-4 rounded-md font-semibold py-3 bg-mint-green flash-button`}
            onClick={() => {
                router.push(`/homestay-booking/search?householdId=${household?.householdId}&checkInDate=${today.format('YYYY-MM-DD')}&checkOutDate=${today.add(1,'day').format('YYYY-MM-DD')}&numberOfGuests=1`)
                setLoading(true);
            }}>
            <FontAwesomeIcon icon={faPlusCircle}/> Đặt phòng
        </button>
    </div>
</div>
    </>
    );
}
