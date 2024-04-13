import { IBlogAdmin } from '@/types/blogType';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import LoadingPage from '@/Components/common/LoadingPage';
import { faCircleInfo, faCircleXmark, faCircleCheck, faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopConfirm from '../admin/user/PopConfirm';
import blogApi from '@/api/blogApi';
import SuccessModal from '../CustomField/SuccessModal';

export interface IBlogDataProps {
    blog: IBlogAdmin;
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
    index: number;
}

export default function BlogData({
    blog,
    change,
    setChange,
    index,
}: IBlogDataProps) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleMouseEnter = (message: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setShowTooltip(true);
        setTooltipMessage(message);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const convertDate = (date: string) => {
        if (date === '') return '';
        const parts = date.split('T');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${timeParts[0]}:${timeParts[1]}`;
    }

    const convertDisplaySubject = (subject: string) => {
        switch (subject) {
            case "TRAVEL_NEWS":
                return <p className='px-4 py-2 rounded-xl bg-blue-500 text-white text-center'>Tin tức du lịch</p>;
            case "DESTINATION":
                return <p className='px-2 py-1 rounded-xl bg-blue-500 text-white text-center'>Điểm đến</p>;
            case "CULTURE_AND_FOOD":
                return <p className='px-2 py-1 rounded-xl bg-blue-500 text-white text-center'>Văn hóa và Ẩm thực</p>;
            case "TRAVEL_GUIDE":
                return <p className='px-2 py-1 rounded-xl bg-blue-500 text-white text-center'>Cẩm nang du lịch</p>;
            case "VOLUNTEER":
                return <p className='px-2 py-1 rounded-xl bg-blue-500 text-white text-center'>Tình nguyện</p>;
            case "OTHER":
                return <p className='px-2 py-1 rounded-xl bg-blue-500 text-white text-center'>Khác</p>;
            default:
                return "";
        }
    }
    const handleDelete = async () => {
        blogApi.deleteBlog(blog.id).then((res) => {
            setShowSuccess(true);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {loading && <LoadingPage />}
            <td className="border border-gray-300 px-2 py-2">
                {index + 1}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {blog.title}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {convertDisplaySubject(blog.subject)}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {blog.shortDescription}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {blog.createdDate ? convertDate(blog.createdDate) : ''}
            </td>
            <td className="border border-gray-300 px-2 py-2">

                <div className='flex justify-around'>
                    <FontAwesomeIcon
                        onClick={() => {
                            setLoading(true);
                            router.push(`/admin/blog/detail/${blog.id}`)
                        }}
                        onMouseEnter={(event) => handleMouseEnter('Chi tiết', event)}
                        onMouseLeave={handleMouseLeave}
                        className='text-xl m-1 hover:text-gray-300' icon={faCircleInfo} />
                    <FontAwesomeIcon
                        onClick={() => {
                            setLoading(true);
                            router.push(`/admin/blog/edit/${blog.id}`)
                        }}
                        onMouseEnter={(event) => handleMouseEnter('Chỉnh sửa', event)}
                        onMouseLeave={handleMouseLeave}
                        className='text-xl m-1 hover:text-gray-300' icon={faEdit} />
                    <FontAwesomeIcon
                        onClick={() => {
                            setIsDeleting(true);
                        }}
                        onMouseEnter={(event) => handleMouseEnter('Xóa', event)}
                        onMouseLeave={handleMouseLeave}
                        className='text-xl m-1 hover:text-gray-300' icon={faTrashCan} />

                </div>
                {showTooltip && (
                    <div
                        className='absolute bg-white text-gray-800 px-2 py-1 rounded shadow-md opacity-100 transition-opacity'
                        style={{ top: tooltipPosition.y, left: tooltipPosition.x + 10 }}
                    >
                        {tooltipMessage}
                    </div>
                )}
                {isDeleting && (
                    <PopConfirm title={'Xóa bài viết'}
                        message={'Bạn có chắc chắn muốn xóa bài viết này?'}
                        onConfirm={() => handleDelete()}
                        onCancel={() => setIsDeleting(false)}
                    />
                )}
                <SuccessModal
                    isVisible={showSuccess}
                    onClose={() => {
                        setShowSuccess(false);
                        setChange(!change);
                    }}
                    message={'Xoá bài viết thành công'}
                />
            </td>
        </tr>
    );
}
