'use client';
import * as React from 'react';
import localProductApi from '@/api/localProductApi';
import { IEditlocalProductListForAdmin } from '@/types/localProductType';
import { Breadcrumb, Modal, Upload, UploadFile, message } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/Components/common/LoadingPage';
import { set } from 'date-fns';

export interface IViewLocalProductDetailProps {
    params: { slug: number }
}

export default function ViewLocalProductDetail({ params: { slug } }: IViewLocalProductDetailProps) {
    const [localProduct, setLocalProduct] = React.useState<IEditlocalProductListForAdmin>();
    const [loading, setLoading] = React.useState(false);


    React.useEffect(() => {
        setLoading(true);
        localProductApi.getlocalProductListForAdminDetail(slug).then((res) => {
            return setLocalProduct(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [slug]);

    //Ảnh
    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');

    const [fileList, setFileList] = React.useState<UploadFile<any>[]>([]);

    React.useEffect(() => {
        const mappedFileList = localProduct?.villageMedias?.map((item) => ({
            uid: item.id.toString(),
            name: item.fileName,
            url: item.filePath,
            type: item.type === "IMAGE" ? "" : "",
        })) || [];

        setFileList(mappedFileList);
    }, [localProduct]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        //gán cho setFileList = null
        setFileList(newFileList);

        const selectedFiles = newFileList
            .map(file => file.originFileObj as File);

        setSelectedImages(selectedFiles);
        // setFileList(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleOnRemove = (file: UploadFile<any>) => {
        const updatedFileList = fileList.filter((f) => f.uid !== file.uid);
        setFileList(updatedFileList);
    };

    //react-hook-form
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IEditlocalProductListForAdmin>({
        defaultValues: localProduct,
    });
    const onSubmit: SubmitHandler<IEditlocalProductListForAdmin> = async (data) => {
        const validSelectedImages = selectedImages.filter(file => file !== undefined);
        if (validSelectedImages.length > 0) {
            console.log(validSelectedImages);
        } else {
            console.log("no image");
        }

        const res: IEditlocalProductListForAdmin = {
            ...data,
            localProductId: slug,
            localProductName: data?.localProductName === '' ? localProduct?.localProductName || '' : data?.localProductName,
            localProductType: selectedOption === '' ? localProduct?.localProductType || '' : selectedOption,
            localProductDescription: data?.localProductDescription === '' ? localProduct?.localProductDescription || '' : data?.localProductDescription,
            localProductUnit: data?.localProductUnit ? data?.localProductUnit : localProduct?.localProductUnit || '',
            localProductMinPrice: data?.localProductMinPrice ? data?.localProductMinPrice : localProduct?.localProductMinPrice || 0,
            localProductMaxPrice: data?.localProductMaxPrice ? data?.localProductMaxPrice : localProduct?.localProductMaxPrice || 0,
            imagesFile: validSelectedImages.length > 0 ? validSelectedImages : [],
            villageMedias: fileList.length > 0 ? fileList
                .filter(file => file.uid && file.name && (file.url || file.preview))
                .map(file => ({
                    id: Number(file.uid),
                    fileName: file.name,
                    filePath: file.url || (file.preview as string),
                    type: file.type === "" ? "IMAGE" : "VIDEO",
                    position: '',
                })) : [],
        }

        try {
            setLoading(true);
            await localProductApi.updateLocalProduct(res);
            const updatedLocalProduct = await localProductApi.getlocalProductListForAdminDetail(slug);
            setLocalProduct(updatedLocalProduct);
            message.success('Cập nhật sản phẩm thành công');
            reset();
        } catch (error) {

        } finally {
            setLoading(false);

        }
    };
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState('');
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleDropdownClick = (e: any) => {
        e.preventDefault();
        toggleDropdown();
    };

    const selectOption = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const convertToVietnamese = (type: string) => {
        if (type === 'FOOD') {
            return 'Thực phẩm';
        } else if (type === 'MEDICINE') {
            return 'Dược phẩm';
        } else if (type === 'SOUVENIR') {
            return 'Đồ lưu niệm';
        } else if (type === 'DRINK') {
            return 'Đồ uống';
        } else {
            return 'Khác';
        }
    };

    const router = useRouter();
    const breadcrumbItems = [
        {
            href: '/admin/service-local-product/local-product',
            title: (
                <>
                    <button className='hover:text-black underline'>Sản phẩm địa phương</button>
                </>
            ),
        },
        {
            title: 'Chi tiết sản phẩm địa phương',
        },
    ];

    return (
        <>
            {loading && <LoadingPage />}
            <div className='ml-10 mt-3'>
                <Breadcrumb>
                    {breadcrumbItems.map((item, index) => (
                        <Breadcrumb.Item
                            key={index}
                            onClick={() => {
                                if (item.href) {
                                    router.push(item.href);
                                }
                            }}
                        >
                            {item.title}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
            <div className='m-10 text-3xl font-semibold'>
                <h1>Thông tin chi tiết sản phẩm địa phương</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='m-10 border border-gray-500 rounded-md'>
                <div className="space-y-5 p-10">
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Tên sản phẩm</div>
                        <div className='col-span-2'>
                            <input type="text"
                                defaultValue={localProduct?.localProductName}
                                className="border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                {...register(`localProductName`)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Loại sản phẩm</div>
                        <div className='col-span-2'>
                            <div className="relative" style={{ zIndex: 1 }}>
                                <button
                                    className="border border-gray-300 rounded-md w-full text-gray-500 font-normal py-2 px-4  inline-flex items-center"
                                    onClick={handleDropdownClick}
                                >
                                    {selectedOption ? (
                                        <span>{convertToVietnamese(selectedOption)}</span>
                                    ) : (
                                        <span>{convertToVietnamese(localProduct?.localProductType || '')}</span>
                                    )}

                                    <svg
                                        className="fill-current h-4 w-4 ml-2"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 10l5 5 5-5z"
                                            className={`fill-current ${isOpen ? 'text-gray-600' : 'text-gray-400'}`}
                                        />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <div className="absolute mt-1 py-2 w-full bg-white rounded-md shadow-lg">
                                        {localProduct?.localProductTypes.map((option) => (
                                            <button
                                                key={option}
                                                className="block px-4 py-2 text-gray-500 hover:bg-gray-100 w-full text-left"
                                                onClick={() => selectOption(option)}
                                            >
                                                {convertToVietnamese(option)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Giới thiệu</div>
                        <div className='col-span-2'>
                            <textarea
                                defaultValue={localProduct?.localProductDescription}
                                className="border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                {...register('localProductDescription')}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Đơn vị</div>
                        <div className='col-span-2'>
                            <input
                                defaultValue={localProduct?.localProductUnit}
                                className="border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required type='text'
                                {...register('localProductUnit')}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Giá thấp nhất</div>
                        <div className='col-span-2'>
                            <input
                                defaultValue={localProduct?.localProductMinPrice}
                                className="border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required type='number'
                                {...register('localProductMinPrice')}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Giá cao nhất</div>
                        <div className='col-span-2'>
                            <input
                                defaultValue={localProduct?.localProductMaxPrice}
                                className="border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required type='number'
                                {...register('localProductMaxPrice')}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Ảnh</div>
                        <div className='col-span-2'>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                multiple={true}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onRemove={handleOnRemove}
                                onChange={handleChange}
                                accept="image/*"
                                beforeUpload={(file) => {
                                    const isImage = file.type.startsWith('image/*');
                                    const isLt2M = file.size / 1024 / 1024 < 2; // Giới hạn kích thước là 2MB

                                    return isImage && isLt2M;
                                }}
                            >
                                {fileList.length >= 30 ? null : uploadButton}
                            </Upload>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <Image alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </div>
                </div>
                <button type='submit' className='m-10 border border-blue-500 bg-blue-500 w-28 h-10 rounded-md text-white hover:bg-blue-700'>
                    Cập nhật
                </button>
            </form>
        </>
    );
}
