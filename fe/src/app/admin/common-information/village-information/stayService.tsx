import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import villageInformationApi from '@/api/villageInformationApi';
import { Card, Col, Row, Image, Upload, Modal, Button, message } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IVillageInformationResponse, InformationAdminRequestDto } from '@/types/villageInformationType';
import LoadingPage from '@/Components/common/LoadingPage';
import { set } from 'date-fns';
export interface IStayServiceProps {
    stayServiceInformation: IVillageInformationResponse | undefined;
    setStayServiceInformation: (value: React.SetStateAction<IVillageInformationResponse | undefined>) => void;
}

export default function StayService({ stayServiceInformation, setStayServiceInformation }: IStayServiceProps) {
    const [loading, setLoading] = React.useState(false);
    const [isEditingStayService, setIsEditingStayService] = React.useState(false);

    const [previewOpen2, setPreviewOpen2] = React.useState(false);
    const [previewImage2, setPreviewImage2] = React.useState('');
    const [previewTitle2, setPreviewTitle2] = React.useState('');

    React.useEffect(() => {
        const mappedFileList = stayServiceInformation?.oldImages?.map((item) => ({
            uid: item.id.toString(),
            name: item.fileName,
            url: item.filePath,
            type: item.type === "IMAGE" ? "" : "",
        })) || [];
        setFileList2(mappedFileList);
    }, [stayServiceInformation]);


    const [fileList2, setFileList2] = React.useState<UploadFile[]>([]);
    const [selectedImages2, setSelectedImages2] = React.useState<File[]>([]);

    const handleCancel2 = () => setPreviewOpen2(false);

    const handlePreview2 = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage2(file.url || (file.preview as string));
        setPreviewOpen2(true);
        setPreviewTitle2(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange2: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        //gán cho setFileList = null
        setFileList2(newFileList);

        const selectedFiles = newFileList
            .map(file => file.originFileObj as File);

        setSelectedImages2(selectedFiles);

    };
    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<InformationAdminRequestDto>({
        defaultValues: stayServiceInformation
    });

    const onSubmit: SubmitHandler<InformationAdminRequestDto> = async (data) => {

        const validSelectedImages2 = selectedImages2.filter(file => file !== undefined);
        const res: InformationAdminRequestDto = {
            ...data,
            id: stayServiceInformation?.id || 0,
            type: stayServiceInformation?.type || '',
            totalVisitedCustomer: data.totalVisitedCustomer || 0,
            totalVisitor: data.totalVisitor || 0,
            title: data.title || '',
            description: data.description || '',
            newImages: validSelectedImages2.length > 0 ? validSelectedImages2 : [],
            oldImages: fileList2.length > 0 ? fileList2
                .filter(file => file.uid && file.name && (file.url || file.preview))
                .map(file => ({
                    id: Number(file.uid),
                    fileName: file.name,
                    filePath: file.url || (file.preview as string),
                    type: file.type === "" ? "IMAGE" : "VIDEO",
                    position: 'HOME_MAIN',
                })) : [],
        };
        try {
            setLoading(true);
            await villageInformationApi.updateStayServiceInformation(res)
            const updateData = villageInformationApi.getVillageInformationsByAdmin();
            setStayServiceInformation((await updateData).villageInformation[1]);
            message.success('Cập nhật dịch vụ lưu trú thành công');
            setIsEditingStayService(false);
        } catch (error) {

        }finally{
            setLoading(false);
        }

    }

    return (
        <div>
            {loading && <LoadingPage />}
            <Card className='mb-5' title="Dịch vụ lưu trú" size="small" headStyle={{ backgroundColor: '#8DD3BB', fontSize: '15px' }}>
                {
                    stayServiceInformation && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <Row>
                                    <Col span={18} push={6}>
                                        {
                                            isEditingStayService ? (
                                                <div className="relative w-full py-2">
                                                    <input type="text"
                                                        id='phone'
                                                        defaultValue={stayServiceInformation.title}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                        {...register("title")}
                                                    />
                                                </div>
                                            ) : (
                                                <p className='py-2 pr-2'>{stayServiceInformation.title}</p>
                                            )
                                        }
                                    </Col>
                                    <Col span={6} pull={18}>
                                        <p className='px-2 py-2 font-semibold'>Tiêu đề</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18} push={6}>
                                        {
                                            isEditingStayService ? (
                                                <div className="relative w-full py-2">
                                                    <textarea id="message" defaultValue={stayServiceInformation.description}
                                                        rows={4}
                                                        {...register("description")}
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    </textarea>
                                                </div>
                                            ) : (
                                                <p className='py-2 pr-2'>
                                                    {stayServiceInformation.description}
                                                </p>
                                            )
                                        }
                                    </Col>
                                    <Col span={6} pull={18}>
                                        <p className='px-2 py-2 font-semibold'>Nội dung</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18} push={6}>
                                        {
                                            isEditingStayService ? (
                                                <div className="relative w-full py-2">
                                                    <input type="text"
                                                        id='phone'
                                                        defaultValue={stayServiceInformation.totalVisitedCustomer}
                                                        {...register("totalVisitedCustomer")}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                            ) : (
                                                <p className='py-2 pr-2'>{stayServiceInformation.totalVisitedCustomer}</p>
                                            )
                                        }
                                    </Col>
                                    <Col span={6} pull={18}>
                                        <p className='px-2 py-2 font-semibold'>Lượt khách lưu trú (/năm)</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18} push={6}>
                                        {
                                            isEditingStayService ? (
                                                <div className="relative w-full py-2">
                                                    <input type="text"
                                                        id='phone'
                                                        {...register("totalVisitor")}
                                                        defaultValue={stayServiceInformation.totalVisitor}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                            ) : (
                                                <p className='py-2 pr-2'>{stayServiceInformation.totalVisitor}</p>


                                            )
                                        }
                                    </Col>
                                    <Col span={6} pull={18}>
                                        <p className='px-2 py-2 font-semibold'>Lượt khách tham quan (/năm)</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18} push={6}>
                                        {
                                            isEditingStayService ? (
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <Upload
                                                        listType="picture-card"
                                                        fileList={fileList2}
                                                        onPreview={handlePreview2}
                                                        onChange={handleChange2}
                                                        accept="image/*"
                                                        beforeUpload={(file) => {
                                                            const isImage = file.type.startsWith('image/*');
                                                            const isLt2M = file.size / 1024 / 1024 < 2; // Giới hạn kích thước là 2MB

                                                            return isImage && isLt2M;
                                                        }}
                                                    >
                                                        {fileList2.length >= 1 ? null : uploadButton}
                                                    </Upload>
                                                    <Modal open={previewOpen2} onCancel={handleCancel2}>
                                                        <Image width={1000} height={0} alt="example" style={{ width: '100%' }} src={previewImage2} />
                                                    </Modal>
                                                </div>
                                            ) : (
                                                <Image
                                                    width={100}
                                                    src={stayServiceInformation?.oldImages[0].filePath === null ? '/images/avt.png' : stayServiceInformation?.oldImages[0].filePath}
                                                />
                                            )
                                        }
                                    </Col>
                                    <Col span={6} pull={18}>
                                        <p className='px-2 py-2 font-semibold'>Ảnh</p>
                                    </Col>
                                </Row>
                                <div className='flex justify-end pb-2'>
                                    {
                                        isEditingStayService ? (
                                            <div className='flex'>
                                                <button
                                                    onClick={() => setIsEditingStayService(false)}
                                                    className='bg-[#F5222D] hover:bg-red-700 text-white py-2 px-4 rounded mr-3'
                                                >
                                                    Hủy cập nhật
                                                </button>
                                                <button

                                                    className='bg-[#52C41A] hover:bg-green-600 text-white py-2 px-4 rounded'>
                                                    Lưu
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setIsEditingStayService(true)}
                                                className='bg-[#8DD3BB] hover:bg-[#6AB79D] text-white font-medium py-2 px-4 rounded'>
                                                Chỉnh sửa
                                            </button>
                                        )
                                    }


                                </div>
                            </div>
                        </form>

                    )
                }
            </Card>
        </div>
    );
}
