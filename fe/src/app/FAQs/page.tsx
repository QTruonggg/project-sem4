'use client';
import frequentlyQuestionApi from '@/api/frequentlyQuestionApi';
import { IFrequentlyQuestionsForCustomer } from '@/types/frequentlyQuestionType';
import * as React from 'react';


export interface FAQsProps {

}

export default function FAQs(props: FAQsProps) {
    const [showSecondDiv, setShowSecondDiv] = React.useState<string | null>(null); // Lưu ID của câu hỏi đang được chọn
    const [FAQs, setFAQs] = React.useState<IFrequentlyQuestionsForCustomer | null>(null);

    React.useEffect(() => {
        frequentlyQuestionApi.getAllfrequentlyQuestionCustomer().then(res => {
            setFAQs(res);
        });
    }, []);

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

            {FAQs?.frequentlyQuestions.map((item) => (
                <div key={item.type} className="w-[80vh] mt-10 mx-auto justify-center border border-black p-5">
                    <div className="border-b border-black flex justify-between">
                        <button
                            className="mb-5 font-semibold"
                            onClick={() => setShowSecondDiv(item.type)} // Lưu ID của câu hỏi được chọn
                        >
                           {item.type === 'CANCEL_BOOKING_OR_CHANGE_BOOKING' ? 'Hủy phòng / Thay đổi đặt phòng' : 
                           item.type === 'PAYMENT_METHOD' ? 'Phương thức thanh toán' :
                           item.type === 'BOOKING_DETAILS' ? 'Chi tiết đặt phòng' : 
                           item.type === 'ROOM_TYPE' ? 'Các loại phòng' :
                           item.type === 'PRICE' ? 'Giá cả' :
                           item.type === 'CHECK_IN_CHECK_OUT' ? 'Chính sách nhận & trả phòng' :
                           item.type === 'OTHERS' ? 'Câu hỏi khác' : ''
                        }
                        </button>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                            className=" text-3xl"
                        >
                        </svg>
                    </div>
                    {showSecondDiv === item.type && (
                        <div>
                            {item.frequentlyQuestions.map((data) => (
                                <div key={data.id} className="border-b border-black mt-3">
                                    <div className='border-b border-black'>
                                        <div className="flex justify-between">
                                            <p className="mb-5 font-semibold">{data.question}</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                className="w-6 h-6 mr-1"
                                            >

                                            </svg>
                                        </div>
                                        <p>{data.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            ))}
        </>
    );
}   