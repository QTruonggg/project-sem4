"use client"
import * as React from 'react';
import Image from 'next/image';
import { faCirclePlus, faCircleXmark, faFileArrowUp, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { IAdminBlogRequest, IAdminBlogUpdateForm } from '@/types/blogType';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/Components/common/LoadingPage';
import blogApi from '@/api/blogApi';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import dynamic from 'next/dynamic';

export interface ICreateBlogProps {
    params: { slug: string };
}

export default function CreateBlog({
    params: { slug }
}: ICreateBlogProps) {
    const router = useRouter();
    const [blogUpdateForm, setBlogUpdateForm] = React.useState<IAdminBlogUpdateForm>();
    const [loading, setLoading] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [imageFile, setImageFile] = React.useState<File>();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                setImageFile(file as File);
            };
            reader.readAsDataURL(file);
        }
    };
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm<IAdminBlogRequest>();

    React.useEffect(() => {
        setLoading(true);
        blogApi.getBlogAdminUpdate(slug).then((res) => {
            setBlogUpdateForm(res);
            reset(res.news)
            setContent(res.news.content);
            setValue("content", res.news.content);
        }).catch((err) => {

            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [reset]);


    React.useEffect(() => {
        setValue("content", content);
        register("content", { required: true });
        if (imageFile) {
            setValue("thumbnailFile", imageFile as File);
            register("thumbnailFile");
        }
    }, [content, imageFile, blogUpdateForm]);

    const onSubmit = async (data: IAdminBlogRequest) => {
        setLoading(true);
        blogApi.updateBlog(Number(slug), data).then((res) => {
            setLoading(false);
            setShowSuccess(true);
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        })
    };
    return (
        <>
            <form className="w-11/12 m-auto mb-10" onSubmit={handleSubmit(onSubmit)}>
                {loading && <LoadingPage />}
                <div className="mt-5 flex">
                    <p className="text-gray-800">Tin tức</p>
                    <p className="mx-2">/</p>
                    <p className="text-gray-800">Chỉnh sửa bài viết</p>
                </div>
                <p className="my-12 text-3xl font-bold">Chỉnh sửa bài viết</p>
                <input
                    type="hidden"
                    max={100}
                    required
                    defaultValue={blogUpdateForm?.news.thumbnail}
                    {...register("thumbnail")} />
                <div className="flex flex-col">
                    <div className="grid grid-cols-12 gap-4 items-center mb-5">
                        <div className="col-span-2">
                            <p className="font-semibold">Tiêu đề</p>
                            <p>(Tối đa 100 ký tự)</p>
                        </div>
                        <div className="col-span-10">
                            <input
                                type="text"
                                max={100}
                                required
                                defaultValue={blogUpdateForm?.news.title}
                                {...register("title")}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center mb-5">
                        <div className="col-span-2">
                            <p className="font-semibold">Chủ đề</p>
                        </div>
                        <div className="col-span-10">
                            <select
                                defaultValue={blogUpdateForm?.news.subject}
                                {...register("subject")}
                                className="w-1/5 border border-gray-300 rounded-lg px-4 py-2">
                                <option value="TRAVEL_NEWS">Tin tức du lịch</option>
                                <option value="DESTINATION">Điểm đến</option>
                                <option value="TRAVEL_GUIDE">Cẩm nang du lịch</option>
                                <option value="CULTURE_AND_FOOD">Văn hóa và Ẩm thực</option>
                                <option value="VOLUNTEER">Tình nguyện</option>
                                <option value="OTHER">Khác</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center mb-5">
                        <div className="col-span-2">
                            <p className="font-semibold">Mô tả tóm tắt</p>
                            <p>(Tối đa 255 ký tự)</p>
                        </div>
                        <div className="col-span-10">
                            <textarea defaultValue={blogUpdateForm?.news.shortDescription} {...register("shortDescription")} maxLength={255} required className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={5} />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center mb-5">
                        <div className="col-span-2">
                            <p className="font-semibold">Ảnh đại diện</p>
                        </div>
                        <div className="col-span-10 flex items-end">
                            <Image
                                src={selectedImage ? selectedImage : blogUpdateForm?.news.thumbnail || "/images/placeholder.png"}
                                width={275}
                                height={275}
                                alt="Image"
                                className="w-4/5 rounded-lg border-gray-300 border-"
                            />
                            <label className="ml-3 px-4 py-2 h-fit font-medium bg-blue-500 rounded-sm shadow hover:bg-opacity-50">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange} />
                                <FontAwesomeIcon icon={faFileArrowUp} /> Tải ảnh lên
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center mb-16">
                        <div className="col-span-2">
                            <p className="font-semibold">Nội dung</p>
                        </div>
                        <div className="col-span-10">
                            <ReactQuill theme="snow" className="h-96" value={content} onChange={setContent} />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center mb-5">
                        <div className="col-span-2">
                            <p className="font-semibold">Thời gian đọc</p>
                        </div>
                        <div className="col-span-10 flex items-center">
                            <input defaultValue={blogUpdateForm?.news.readTime} type="number" {...register("readTime")} required className="w-1/12 border border-gray-300 rounded-lg px-4 py-2" />
                            <p className="font-semibold ml-2">phút</p>
                        </div>
                    </div>
                    {(errors.content) && <p className="text-red-500 text-center">Vui lòng nhập đầy đủ dữ liệu trước khi chỉnh sửa bài viết</p>}
                    <div className="flex gap-6 mt-12 mb-10 justify-end">
                        <button
                            onClick={() => {
                                setLoading(true);
                                router.push(`/admin/blog`)
                            }}
                            className="px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-300">
                            <FontAwesomeIcon icon={faCircleXmark} className="mr-2" />Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-500 hover:bg-opacity-50">
                            <FontAwesomeIcon icon={faSave} className="mr-2" />Lưu chỉnh sửa
                        </button>
                    </div>
                    <SuccessModal
                        isVisible={showSuccess}
                        onClose={() => {
                            setShowSuccess(false);
                            setLoading(true)
                            router.push('/admin/blog');
                        }}
                        message={'Chỉnh sửa bài viết thành công'}
                    />
                </div>
            </form>
        </>
    );
}
