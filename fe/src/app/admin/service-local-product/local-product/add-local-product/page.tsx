'use client';
import { PlusOutlined } from '@ant-design/icons';
import * as React from 'react';
import localProductApi from '@/api/localProductApi';
import { IEditlocalProductListForAdmin, IListTypeLocalProduct } from '@/types/localProductType';
import { Breadcrumb, Modal, Select, Upload, UploadFile, message } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface IAddLocalProductProps {

}

export default function AddLocalProduct(props: IAddLocalProductProps) {
    const { Option } = Select;

    const [listType, setListType] = React.useState<IListTypeLocalProduct>();
    React.useEffect(() => {
        localProductApi.getListType().then((res) => {
            setListType(res);
            setSelectedOption(res.localProductTypeList[0]);
        });
    }, []);

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IEditlocalProductListForAdmin>({

    });

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

    const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
    const onSubmit: SubmitHandler<IEditlocalProductListForAdmin> = async (data) => {
        const validSelectedImages = selectedImages.filter(file => file !== undefined);
        if (validSelectedImages.length > 0) {
            console.log(validSelectedImages);
        } else {
            console.log("no image");
        }
        const res: IEditlocalProductListForAdmin = {
            ...data,
            localProductType: selectedOption,
            localProductId: 0,
            imagesFile: validSelectedImages.length > 0 ? validSelectedImages : [],
        }

        await localProductApi.addNewLocalProduct(res);
        message.success('Thêm sản phẩm thành công');
        router.push('/admin/service-local-product/local-product');

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


    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

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
            title: 'Thêm sản phẩm địa phương',
        },
    ];

    return (
        <>
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
                <h1>Thêm sản phẩm địa phương</h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='m-10 border border-gray-500 rounded-md'>
                <div className="space-y-5 p-10">
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Tên sản phẩm</div>
                        <div className='col-span-2'>
                            <input type="text"
                                className="border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                {...register('localProductName', { required: true })}
                            />
                        </div>
                    </div>
                
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-1 font-semibold">Loại sản phẩm</div>
                        <div className='col-span-2'>
                            <div className="relative" style={{ zIndex: 1 }}>
                                <span
                                    className="border justify-between border-gray-300 rounded-md w-full text-black font-normal p-2.5 px-4  inline-flex items-center"
                                    onClick={handleDropdownClick}
                                >
                                    <span>{convertToVietnamese(selectedOption)}</span>
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
                                </span>
                                {isOpen && (
                                    <div className="absolute mt-1 py-2 w-full bg-white rounded-md shadow-lg">
                                        {listType?.localProductTypeList.map((option) => (
                                            <span
                                                key={option}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                                onClick={() => selectOption(option)}
                                            >
                                                {/* {option.charAt(0).toUpperCase() + option.slice(1)} */}
                                                
                                                {convertToVietnamese(option)}
                                            </span>
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
                                className="border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type='number'
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
                    Thêm
                </button>
            </form>
        </>
    );
}
