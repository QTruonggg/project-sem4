'use client'
import BlogItem from '@/Components/blog/BlogItem';
import Pagination from '@/Components/booking/Pagination';
import LoadingPage from '@/Components/common/LoadingPage';
import blogApi from '@/api/blogApi';
import { IBlog } from '@/types/blogType';
import * as React from 'react';

export interface IUserBlogProps {
}

export default function UserBlog(props: IUserBlogProps) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [blogs, setBlogs] = React.useState<IBlog[]>()
    const [displayData, setDisplayData] = React.useState<IBlog[]>();
    const [displayLength, setDisplayLength] = React.useState<number>(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedBlog, setSelectedBlog] = React.useState<string>("Tất cả");

    const isMin1850 = () => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth >= 1850;
    };
    const itemsPerPage = isMin1850() ? 8 : 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = displayData?.slice(startIndex, endIndex);

    React.useEffect(() => {
        setLoading(true);
        const response = blogApi.getBlogList();
        response.then((res) => {
            setBlogs(res);
            setDisplayData(res);
            setDisplayLength(res.length);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    const setDisplayList = (blog: string) => {
        setCurrentPage(1);
        if (blog === "Tất cả") {
            setDisplayData(blogs as IBlog[]);
            setDisplayLength(blogs?.length as number);
        } else if (blog === "Tin tức du lịch") {
            const pendingList = blogs?.filter((blogInFilter) => blogInFilter.subject === "TRAVEL_NEWS");
            setDisplayData(pendingList as IBlog[]);
            setDisplayLength(pendingList?.length as number);
        } else if (blog === "Điểm đến") {
            const acceptedList = blogs?.filter((blogInFilter) => blogInFilter.subject === "DESTINATION");
            setDisplayData(acceptedList as IBlog[]);
            setDisplayLength(acceptedList?.length as number);
        } else if (blog === "Văn hóa và Ẩm thực") {
            const rejectedList = blogs?.filter((blogInFilter) => blogInFilter.subject === "CULTURE_AND_FOOD");
            setDisplayData(rejectedList as IBlog[]);
            setDisplayLength(rejectedList?.length as number);
        } else if (blog === "Cẩm nang du lịch") {
            const pendingList = blogs?.filter((blogInFilter) => blogInFilter.subject === "TRAVEL_GUIDE");
            setDisplayData(pendingList as IBlog[]);
            setDisplayLength(pendingList?.length as number);
        } else if (blog === "Tình nguyện") {
            const acceptedList = blogs?.filter((blogInFilter) => blogInFilter.subject === "VOLUNTEER");
            setDisplayData(acceptedList as IBlog[]);
            setDisplayLength(acceptedList?.length as number);
        } else if (blog === "Khác") {
            const rejectedList = blogs?.filter((blogInFilter) => blogInFilter.subject === "OTHER");
            setDisplayData(rejectedList as IBlog[]);
            setDisplayLength(rejectedList?.length as number);
        }
        setSelectedBlog(blog);
    }



    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <>
            {loading && <LoadingPage />}
            <div className='w-2/3 mx-auto'>
                <div className=' flex items-center justify-center my-10'>
                    <div className="flex-1 h-[1px] bg-gray-500"></div>
                    <div className="text-3xl text-center font-bold px-16">
                        <p>Cập nhật tin tức</p>
                        <p>&</p>
                        <p>Lan tỏa giá trị tích cực</p>
                    </div>
                    <div className="flex-1 h-[1px] bg-gray-500"></div>
                </div>

                <p className='text-gray-600 text-center'>Những tin tức du lịch  về V-HomeStay và Hà Giang hay những chia sẻ kinh nghiệm du lịch và lan tỏa giá trị tích cực sẽ có tại đây!</p>

                <div className='flex items-center font-semibold justify-center gap-5 my-10'>
                    <button
                        onClick={() => setDisplayList("Tất cả")}
                        className={`px-4 py-2 rounded-lg ${selectedBlog === 'Tất cả' ? 'bg-mint-green hover:bg-opacity-50' : 'hover:bg-gray-300'}`}>
                        Tất cả
                    </button>
                    <button
                        onClick={() => setDisplayList("Tin tức du lịch")}
                        className={`px-4 py-2 rounded-lg ${selectedBlog === 'Tin tức du lịch' ? 'bg-mint-green hover:bg-opacity-50' : 'hover:bg-gray-300'}`}>
                        Tin tức du lịch
                    </button>
                    <button
                        onClick={() => setDisplayList("Điểm đến")}
                        className={`px-4 py-2 rounded-lg ${selectedBlog === 'Điểm đến' ? 'bg-mint-green hover:bg-opacity-50' : 'hover:bg-gray-300'}`}>
                        Điểm đến
                    </button>
                    <button
                        onClick={() => setDisplayList("Văn hóa và Ẩm thực")}
                        className={`px-4 py-2 rounded-lg ${selectedBlog === 'Văn hóa và Ẩm thực' ? 'bg-mint-green hover:bg-opacity-50' : 'hover:bg-gray-300'}`}>
                        Văn hóa và Ẩm thực
                    </button>
                    <button
                        onClick={() => setDisplayList("Cẩm nang du lịch")}
                        className={`px-4 py-2 rounded-lg ${selectedBlog === 'Cẩm nang du lịch' ? 'bg-mint-green hover:bg-opacity-50' : 'hover:bg-gray-300'}`}>
                        Cẩm nang du lịch
                    </button>
                    <button
                        onClick={() => setDisplayList("Tình nguyện")}
                        className={`px-4 py-2 rounded-lg ${selectedBlog === 'Tình nguyện' ? 'bg-mint-green hover:bg-opacity-50' : 'hover:bg-gray-300'}`}>
                        Tình nguyện
                    </button>
                    <button
                        onClick={() => setDisplayList("Khác")}
                        className={`px-4 py-2 rounded-lg ${selectedBlog === 'Khác' ? 'bg-mint-green hover:bg-opacity-50' : 'hover:bg-gray-300'}`}>
                        Khác
                    </button>
                </div>
            </div>

            <div className='w-3/4 mx-auto grid min-[1850px]:grid-cols-4 grid-cols-3 gap-5 my-10'>
                {!currentData ? (
                    <p className='font-bold col-span-full text-4xl text-center'>Không có dữ liệu để hiển thị</p>
                ) : (
                    currentData?.map((blog) => (
                        <BlogItem blog={blog} key={blog.id} />
                    ))
                )}
                <div className="flex col-span-full justify-center text-center mb-8">

                    <Pagination
                        currentPage={currentPage}
                        totalItems={displayLength}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
}
