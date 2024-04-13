'use client'
import LoadingPage from '@/Components/common/LoadingPage';
import blogApi from '@/api/blogApi';
import { ICustomerBlogDetail } from '@/types/blogType';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as React from 'react';
import Link from 'next/link';
import BlogItem from '@/Components/blog/BlogItem';

export interface IBlogDetailProps {
    params: { slug: string };
}

export default function BlogDetail({
    params: { slug }
}: IBlogDetailProps) {
    const router = useRouter();

    const [blog, setBlog] = React.useState<ICustomerBlogDetail>();
    const [loading, setLoading] = React.useState(false);
    const [formatedContent, setFormatedContent] = React.useState('');

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


    React.useEffect(() => {
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
        getBlogData()
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

    return (
        <div className='w-3/5 m-auto'>
            {loading && <LoadingPage />}

            <div className='w-7/8 m-auto'>
                <div className='mt-5 flex'>
                    <p
                        onClick={() => {
                            setLoading(true);
                            router.push('/blog')
                        }}
                        className='hover:text-opacity-50 text-gray-800 cursor-pointer'>Tin tức</p>
                    <p className='mx-2'>/</p>
                    <p className='font-bold'>{convertDisplaySubject(blog?.news.subject || '')}</p>
                </div>

                <p className='my-8 font-bold text-5xl text-justify'>{blog?.news.title}</p>

                <div className='flex items-baseline'>
                    <p className='pr-2'>{blog?.news.createdDate.split('T')[0].split('-').reverse().join('/')}</p>&#x2022;
                    <p className='px-2'>{blog?.news.readTime} phút đọc</p>
                </div>

                <div className='mt-8 text-justify'> {blog?.news.shortDescription}</div>
            </div>

            <Image
                src={blog?.news.thumbnail || '/images/LuaTrai.jpg'}
                alt={''}
                width={1000}
                height={1000}
                className='w-full aspect-[16/9] my-12 rounded-xl' />

            <div className='w-5/6 m-auto pb-12 border-b border-black'>
                <div dangerouslySetInnerHTML={{ __html: formatedContent }}></div>
                <div className='flex justify-end mt-4 gap-4'>
                    <p
                        className={`px-4 py-2 font-bold rounded-lg bg-gray-300`}>
                        Tag
                    </p>
                    <p
                        className={`px-4 py-2 rounded-lg bg-mint-green`}>
                        {convertDisplaySubject(blog?.news.subject || '')}
                    </p>
                </div>
            </div>

            <h1 className='text-3xl my-8  text-center font-bold'>Bài viết liên quan</h1>
            <div className='grid grid-cols-3 gap-4 m-auto'>
                {blog?.threeNews.map((blog, index) => {
                    return <BlogItem blog={blog} key={index} />;
                })}
            </div>
            <div className='my-10 text-center'>
                <Link href='/blog' className='border hover:bg-mint-green font-semibold rounded-sm border-mint-green px-4 py-2'>Xem tất cả các tin tức</Link>
            </div>
        </div>
    );
}
