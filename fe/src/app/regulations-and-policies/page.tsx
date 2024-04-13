'use client';
import React from "react";
export interface IregulationsAndPolicies {

}

export default function IregulationsAndPolicies() {
    const [showSecondDiv, setShowSecondDiv] = React.useState(false);
    return (
        <>
            <div className='text-center overflow-hidden rounded-b-xl 
            bg-cover bg-[url("/images/LangMongPaViHome.jpg")] h-60'>
                <p className='text-white font-bold text-3xl pt-16'>FAQs</p>
            </div>
            <div className="text-center">
                <p className="text-[#0F6900] font-semibold mt-5">
                    FAQs
                </p>
                <h1 className="text-4xl font-semibold">
                    Các câu hỏi thường gặp
                </h1>
            </div>

            <div className="w-[80vh] mt-10 mx-auto justify-center border border-black p-5">
                <div className="border-b border-black flex justify-between">
                    <button
                        className="mb-5 font-semibold"
                        onClick={() => setShowSecondDiv(!showSecondDiv)}
                    >Hủy phòng/Thay đổi đặt phòng</button>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        className=" text-3xl"
                    >
                        <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
                    </svg>
                </div>

                {showSecondDiv && ( // Kiểm tra nếu showSecondDiv là true thì hiển thị khối div thứ 2
                    <div className="border-b border-black mt-3">
                        <div className="flex justify-between">
                            <p className="mb-5 font-semibold">Hủy phòng/Thay đổi đặt phòng</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="w-6 h-6 mr-1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                        <p></p>
                    </div>
                )}
            </div>
        </>
    );
}

