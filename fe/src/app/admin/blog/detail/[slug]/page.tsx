'use client'
import LoadingPage from '@/Components/common/LoadingPage';
import blogApi from '@/api/blogApi';
import { IAdminBlogDetail } from '@/types/blogType';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleArrowLeft, faCircleXmark, faDotCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import PopConfirm from '@/Components/admin/user/PopConfirm';
import SuccessModal from '@/Components/CustomField/SuccessModal';
export interface IAdminBlogDetailProps {
    params: { slug: string };
}

export default function AdminBlogDetail({
    params: { slug }
}: IAdminBlogDetailProps) {
    const router = useRouter();

    const [blog, setBlog] = React.useState<IAdminBlogDetail>();
    const [loading, setLoading] = React.useState(false);
    const [formatedContent, setFormatedContent] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const applyStylesToHtml = (htmlContent: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        doc.querySelectorAll('h1').forEach((h2) => {
            h2.classList.add('text-3xl', 'font-bold');
        });

        doc.querySelectorAll('h2').forEach((h2) => {
            h2.classList.add('text-2xl', 'font-bold');
        });

        doc.querySelectorAll('h3').forEach((h3) => {
            h3.classList.add('text-xl', 'font-bold');
        });

        doc.querySelectorAll('p').forEach((p) => {
            p.classList.add('text-base');
        });

        doc.querySelectorAll('em').forEach((em) => {
            em.classList.add('italic');
        });

        doc.querySelectorAll('u').forEach((u) => {
            u.classList.add('underline');
        });

        doc.querySelectorAll('strong').forEach((strong) => {
            strong.classList.add('font-bold');
        });

        doc.querySelectorAll('ol').forEach((ol) => {
            ol.classList.add('list-decimal', 'list-inside');
        });

        doc.querySelectorAll('ul').forEach((ul) => {
            ul.classList.add('list-disc', 'list-inside');
        });

        doc.querySelectorAll('li').forEach((li) => {
            li.classList.add('my-2');
        });

        doc.querySelectorAll('a').forEach((a) => {
            a.classList.add('text-blue-500', 'hover:text-blue-700');

            const link = document.createElement('div');
            const href = a.getAttribute('href');
            const as = a.getAttribute('as');
            const text = a.textContent;
            link.innerHTML = `<Link href="${href}" as="${as}">${text}</Link>`;
            a.parentNode?.replaceChild(link, a);

        })


        return doc.body.innerHTML;
    };

    const getBlogData = async () => {
        setLoading(true);
        await blogApi.getBlogDetail(Number(slug))
            .then((res) => {
                setBlog(res);
                setFormatedContent(applyStylesToHtml(res.news.content || ''));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    React.useEffect(() => {
        getBlogData();
    }, [slug]);

    const convertDisplaySubject = (subject: string) => {
        switch (subject) {
            case "TRAVEL_NEWS":
                return "Tin tức du lịch";
            case "DESTINATION":
                return "Điểm đến";
            case "CULTURE_AND_FOOD":
                return "Văn hóa và Ẩm thực";
            case "TRAVEL_GUIDE":
                return "Hướng dẫn du lịch";
            case "VOLUNTEER":
                return "Tình nguyện";
            case "OTHER":
                return "Khác";
            default:
                return "";
        }
    }

    const convertDate = (date: string) => {
        if (date === '') return ('');
        const parts = date.split('T');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${timeParts[0]}:${timeParts[1]}`;
    }
    const handleDelete = async () => {
        if(!blog?.news.id) return;
        blogApi.deleteBlog(blog?.news.id).then((res) => {
            setShowSuccess(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='w-11/12 m-auto'>
            {loading && <LoadingPage />}
            <div className='mt-5 flex'>
                <p className='text-gray-800'>Tin tức</p>
                <p className='mx-2'>/</p>
                <p className='text-gray-800'>{blog?.news.title}</p>
            </div>

            <div className='my-5 p-7 rounded-xl shadow-md shadow-gray-300'>
                <p className='text-xl font-bold mb-3'>Lịch sử bài đăng</p>
                <p className='font-semibold text-lg mb-2'><FontAwesomeIcon icon={faCircle} className='mr-5 text-xs shadow-lg shadow-orange-900 rounded-full text-orange-500' />Thông tin đăng bài</p>
                <div className='px-7 ml-1 border-l border-gray-300'>
                    <p className='font-semibold text-gray-700 mb-1'>Người đăng: <span className='font-normal '>{blog?.news.createdBy}</span></p>
                    <p className='font-semibold text-gray-700 mb-1'>Thời gian đăng:  <span className='font-normal '>{convertDate(blog?.news.createdDate || '')}</span></p>
                </div>
                <p className='font-semibold text-lg mb-2'><FontAwesomeIcon icon={faCircle} className='mr-5 text-xs shadow-lg shadow-purple-900 rounded-full text-purple-500' />Thông tin chỉnh sửa bài lần cuối</p>
                <div className='px-7 ml-1 border-l border-gray-300'>
                    <p className='font-semibold text-gray-700 mb-1'>Người chỉnh sửa: <span className='font-normal '>{blog?.news.lastModifiedBy}</span></p>
                    <p className='font-semibold text-gray-700 mb-1'>Thời chỉnh sửa:  <span className='font-normal '>{convertDate(blog?.news.lastModifiedDate || '')}</span></p>
                </div>

            </div>
            <div className='w-3/4 m-auto'>
                <div className='w-7/8 m-auto'>

                    <p className='my-8 font-semibold text-xl text-purple-700'>{convertDisplaySubject(blog?.news.subject || '')}</p>
                    <p className='my-8 font-bold text-5xl text-justify'>{blog?.news.title}</p>

                    <div className='flex items-baseline'>
                        <p className='pr-2'>{blog?.news.createdDate.split('T')[0].split('-').reverse().join('/')}</p>&#x2022;
                        <p className='px-2'>{blog?.news.readTime} phút đọc</p>
                    </div>

                    <div className='mt-8 text-justify'> {blog?.news.shortDescription}</div>
                </div>

                <Image
                    src={blog?.news.thumbnail||'/images/LuaTrai.jpg'}
                    alt={''}
                    width={1000}
                    height={1000}
                    className='w-full aspect-[16/9] my-12 rounded-xl' />

                <div className='pb-12 border-b border-black'>
                    <div dangerouslySetInnerHTML={{ __html: formatedContent }}></div>
                    <div className='flex justify-end mt-4 gap-4'>
                        <p
                            className={`px-4 py-2 font-bold rounded-lg bg-gray-300`}>
                            Tag
                        </p>
                        <p
                            className={`px-4 py-2 rounded-lg bg-blue-500`}>
                            {convertDisplaySubject(blog?.news.subject || '')}
                        </p>
                    </div>
                </div>

                <div className='flex gap-6 mt-12 mb-20 justify-end'>
                    <button
                        onClick={() => {
                            setLoading(true);
                            router.push(`/admin/blog`)
                        }}
                        className='px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-300'>
                        <FontAwesomeIcon icon={faCircleArrowLeft} className='mr-2' />Quay lại danh sách bài viết
                    </button>
                    <button
                        onClick={() => {
                            setLoading(true);
                            router.push(`/admin/blog/edit/${blog?.news.id}`)}}
                        className='px-4 py-2 rounded-md bg-blue-500 hover:bg-opacity-50'>
                        <FontAwesomeIcon icon={faEdit} className='mr-2' />Chỉnh sửa
                    </button>
                    <button
                        onClick={() => {
                            setIsDeleting(true);
                        }}
                        className='px-4 py-2 rounded-md bg-orange-400 hover:bg-opacity-50'>
                        <FontAwesomeIcon icon={faCircleXmark} className='mr-2' />Xóa
                    </button>
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
                            router.push('/admin/blog');
                        }}
                        message={'Xoá bài viết thành công'}
                    />
                </div>
            </div>

        </div>
    );
}