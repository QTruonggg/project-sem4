'use client';
import React from "react";
import contactApi from "@/api/contactApi";
import { IContactInformationRespones } from "@/types/contactType";

export interface IContactInformation {

}

export default function IContactInformation() {

    const [contact, setContact] = React.useState<IContactInformationRespones>();

    React.useEffect(() => {
        contactApi.getContactInformatin().then(res => {
            return setContact(res);
        });
    }, [])
    return (
        <>
            <div className='text-center overflow-hidden rounded-b-xl 
            bg-cover bg-[url("/images/LangMongPaViHome.jpg")] h-60'>
                <p className='text-white font-bold text-3xl pt-16'>LIÊN HỆ CHÚNG TÔI</p>
                <p className='text-white font-bold text-3xl'>V-HOMESTAY</p>
            </div>

            <div className="text-center mt-10">
                <h1 className="font-semibold text-3xl">Thông tin liên hệ</h1>
                <p className="mt-3">Liên hệ với đội ngũ nhiệt huyết của chúng tôi</p>
            </div>


            <div className="text-center mt-20 mx-auto justify-center bg-white p-10 ml-40 mr-40">
                <h1 className="font-semibold text-3xl">V-HomeStay - Điểm đến không thể bỏ lỡ khi tới Hà Giang</h1>
                <p className="mt-5 w-[100vh] text-lg mx-auto justify-center">Chúng tôi muốn đảm bảo rằng chuyến đi của bạn là tất cả những gì bạn có thể mơ ước. Cho dù bạn muốn được truyền cảm hứng và hướng dẫn trong việc lập kế hoạch cho chuyến phiêu lưu tiếp theo của mình hay cần trợ giúp về việc đặt vé hiện có, các chuyên gia du lịch của chúng tôi luôn sẵn sàng trợ giúp. Gửi email, nhắn tin hoặc gọi cho chúng tôi để lên kế hoạch cho chuyến phiêu lưu của bạn hoặc nhận trợ giúp về bất kỳ vấn đề nào bạn gặp phải trên đường đi.</p>
            </div>

            <div className="mt-10 bg-white p-10 grid grid-cols-4 mx-auto justify-center ml-40 mr-40">
                <div className="mx-auto justify-center text-center">
                    <p className='text-4xl mb-2 font-semibold'>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="mx-auto justify-center"
                        >
                            <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
                        </svg>
                    </p>
                    <span className="text-xl font-semibold">Email</span>
                    <p>{contact?.contactUs[0]?.email}</p>
                </div>

                <div className="mx-auto justify-center text-center">
                    <p className='text-4xl mb-2 font-semibold '>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                            className="mx-auto justify-center"
                        >
                            <path d="M0 2a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4.414a1 1 0 00-.707.293L.854 15.146A.5.5 0 010 14.793V2zm3.5 1a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 2.5a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 2.5a.5.5 0 000 1h5a.5.5 0 000-1h-5z" />
                        </svg>
                    </p>
                    <span className="text-xl font-semibold">Live chat</span>
                    <p>{contact?.contactUs[0]?.liveChat}</p>
                </div>

                <div className="mx-auto justify-center text-center">
                    <p className='text-4xl mb-2 font-semibold'>
                        <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="mx-auto justify-center"
                        >
                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64c0 247.4 200.6 448 448 448 18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368c-70.4-33.3-127.4-90.3-160.7-160.7l49.3-40.3c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                        </svg>
                    </p>
                    <span className="text-xl font-semibold">Điện thoại</span>
                    <p>{contact?.contactUs[0]?.phone}</p>
                </div>

                <div className="mx-auto justify-center text-center">
                    <p className='text-4xl mb-2 font-semibold text-center'>
                        <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="mx-auto justify-center"
                        >
                            <path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z" />
                        </svg>
                    </p>
                    <span className="text-xl font-semibold mx-auto text-center">Địa điểm</span>
                    <p>{contact?.contactUs[0]?.address}</p>
                </div>
            </div>

            <div className="font-semibold  text-center mt-10 bg-white ml-40 mr-40 p-10">
                <h5>Vị trí</h5>
                <h1 className="text-3xl">V-HomeStay trên bản đồ</h1>
            </div>

            <div className="mt-10 ml-40 mr-40">
            <iframe className="mx-auto justify-center" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1833.5237335196214!2d105.41450683913791!3d23.204940694761646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cbdd48d578c06f%3A0xbae65faf206b1dc6!2zTMOgbmcgdsSDbiBow7NhIGR1IGzhu4tjaCBj4buZbmcgxJHhu5NuZyBkw6JuIHThu5ljIE3DtG5n!5e0!3m2!1svi!2s!4v1690479418902!5m2!1svi!2s"
                    width="1100" height="700" loading="lazy">Location</iframe>
            </div>


        </>
    );
}