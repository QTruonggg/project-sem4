import { IBlog } from '@/types/blogType';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '../common/LoadingPage';

export interface IBlogItemProps {
    blog: IBlog;
}

export default function BlogItem({
    blog
}: IBlogItemProps) {
    const router = useRouter();
    const [loading, setLoading] = React.useState<boolean>(false);
    const convertDisplaySubject = (subject: string) => {
        switch (subject) {
            case "TRAVEL_NEWS":
                return "Tin tức du lịch";
            case "DESTINATION":
                return "Điểm đến";
            case "CULTURE_AND_FOOD":
                return "Văn hóa và Ẩm thực";
            case "TRAVEL_GUIDE":
                return "Cẩm nang du lịch";
            case "VOLUNTEER":
                return "Tình nguyện";
            case "OTHER":
                return "Khác";
            default:
                return "";
        }
    }

    return (
        <div className= 'shadow-md shadow-gray-300 rounded-xl overflow-hidden'>
            {loading && <LoadingPage/>}
            <div className='h-full flex-col flex justify-between'>
                <div>
                    <Image src={blog.thumbnail ||'/images/LuaTrai.jpg'}
                        height={1000}
                        width={1000}
                        alt='blog image'
                        className='w-full aspect-[16/9]' />

                    <div className='p-5 pb-0'>
                        <div className='flex text-sm items-baseline'>
                            <p className='p-2 rounded-md bg-mint-green'>{convertDisplaySubject(blog.subject)}</p>
                            <p className='px-2'>{blog.createdDate.split('T')[0].split('-').reverse().join('/')}</p>&#x2022;
                            <p className='px-1'>{blog.readTime} phút đọc</p>
                        </div>
                        <p className='text-xl my-2 font-bold whitespace-normal line-clamp-3 truncate'>{blog.title}</p>
                        <p className='text-gray-600 whitespace-normal line-clamp-4 truncate'>{blog.shortDescription}</p>
                    </div>
                </div>
                <div className='flex justify-end p-5'>
                    <button onClick={()=>{ setLoading(true)
                        router.push(`/blog/${blog.id}`)}}>
                        <p className='text-gray-800 hover:text-opacity-50'>Đọc thêm <FontAwesomeIcon icon={faAngleRight} /></p>
                    </button>
                </div>
            </div>

        </div>
    );
}
