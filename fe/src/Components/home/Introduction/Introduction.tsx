import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface IIntroductionProps {

}

export default function Introduction(props: IIntroductionProps) {
    return (

        <div className="relative my-20">
            <Image height={1000} width={1000} className="w-full aspect-[3] object-cover rounded-[25px] brightness-75" src="/images/GioiThieu.jpg" alt="" />
            <div className="absolute inset-24 w-[800px]">
                <h1 className='text-white text-5xl font-bold'>Đến Mèo Vạc ở V-HomeStay</h1>
                <p className='text-white text-lg font-semibold mt-5 mb-5'>Văn hóa du lịch cộng đồng dân tộc Mông (Mèo Vạc - Hà Giang) - một không gian mang đậm bản sắc
                    văn hóa Mông hiện đang là điểm du lịch nổi tiếng mà mỗi du khách khi đến Mèo Vạc đều muốn trải nghiệm.</p>
                <Link
                    href={'/introduction'}
                    className="w-32 h-12 hover:bg-gray-300 border-2 bg-[#FFFF] font-bold py-2 px-4 rounded"
                >
                    Xem thêm
                </Link>
            </div>
        </div>
    );
}
