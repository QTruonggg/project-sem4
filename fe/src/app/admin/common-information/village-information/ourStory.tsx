import { IVillageInformationResponse, InformationAdminRequestDto } from '@/types/villageInformationType';
import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import villageInformationApi from '@/api/villageInformationApi';
import { Card, Col, Row, Image, Upload, Modal, message } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoadingPage from '@/Components/common/LoadingPage';

export interface IOurStoryProps {
    ourStoryInformation: IVillageInformationResponse | undefined;
    setOurStoryInformation: (value: React.SetStateAction<IVillageInformationResponse | undefined>) => void;
}

export default function OurStory({ ourStoryInformation, setOurStoryInformation }: IOurStoryProps) {

    const [isEditingOurStory, setIsEditingOurStory] = React.useState(false);
    const [previewOpen1, setPreviewOpen1] = React.useState(false);
    const [previewImage1, setPreviewImage1] = React.useState('');
    const [previewTitle1, setPreviewTitle1] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const mappedFileList = ourStoryInformation?.oldImages?.map((item) => ({
            uid: item.id.toString(),
            name: item.fileName,
            url: item.filePath,
            type: item.type === "IMAGE" ? "" : "",
        })) || [];
        setFileList1(mappedFileList);
    }, [ourStoryInformation]);


    const [fileList1, setFileList1] = React.useState<UploadFile[]>([]);
    const [selectedImages1, setSelectedImages1] = React.useState<File[]>([]);

    const handleCancel1 = () => setPreviewOpen1(false);

    const handlePreview1 = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage1(file.url || (file.preview as string));
        setPreviewOpen1(true);
        setPreviewTitle1(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange1: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        //gán cho setFileList = null
        setFileList1(newFileList);

        const selectedFiles = newFileList
            .map(file => file.originFileObj as File);

        setSelectedImages1(selectedFiles);

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
        defaultValues: ourStoryInformation,
    });

    const onSubmit: SubmitHandler<InformationAdminRequestDto> = async (data) => {
        const validSelectedImages1 = selectedImages1.filter(file => file !== undefined);
        const res: InformationAdminRequestDto = {
            ...data,
            id: ourStoryInformation?.id || 0,
            type: ourStoryInformation?.type || 'OUR_STORY',
            title: data.title || '',
            description: data.description || '',
            newImages: validSelectedImages1.length > 0 ? validSelectedImages1 : [],
            oldImages: fileList1.length > 0 ? fileList1
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
            await villageInformationApi.updateOurStoryInformation(res)
            const update = villageInformationApi.getVillageInformationsByAdmin();
            setOurStoryInformation((await update).villageInformation[0]);
            message.success('Cập nhật thành công');
            setIsEditingOurStory(false);
        } catch (error) {
            message.success('Cập nhật không thành công');
        }finally{
            setLoading(false);
            reset();
        }
    };
    return (
        <>
         {loading && <LoadingPage />}
            <div>
                <Card className='mb-5' title="Câu chuyện của chúng tôi" size="small" headStyle={{ backgroundColor: '#8DD3BB', fontSize: '15px' }}>
                    {
                        ourStoryInformation && (
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col span={18} push={6}>
                                            {
                                                isEditingOurStory ? (
                                                    <div className="relative w-full py-2">
                                                        <input type="text"
                                                            id='title'
                                                            defaultValue={ourStoryInformation.title}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            required
                                                            {...register("title")}
        
                                                        />
                                                    </div>
                                                ) : (
                                                    <p className='py-2 pr-2'>{ourStoryInformation.title}</p>
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
                                                isEditingOurStory ? (
                                                    <div className="relative w-full py-2">
                                                        <textarea
                                                            id="message"
                                                            defaultValue={ourStoryInformation.description}
                                                            rows={4}
                                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            {...register("description")}
                                                            
                                                        >
                                                        </textarea>
                                                    </div>
                                                ) : (
                                                    <p className='py-2 pr-2'>
                                                        {ourStoryInformation.description}
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
                                                isEditingOurStory ? (
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <Upload
                                                            listType="picture-card"
                                                            fileList={fileList1}
                                                            onPreview={handlePreview1}
                                                            onChange={handleChange1}
                                                            accept="image/*"
                                                            beforeUpload={(file) => {
                                                                const isImage = file.type.startsWith('image/*');
                                                                const isLt2M = file.size / 1024 / 1024 < 2; // Giới hạn kích thước là 2MB

                                                                return isImage && isLt2M;
                                                            }}
                                                        >
                                                            {fileList1.length >= 1 ? null : uploadButton}
                                                        </Upload>
                                                        <Modal open={previewOpen1} onCancel={handleCancel1}>
                                                            <Image width={1000} height={0} alt="example" style={{ width: '100%' }} src={previewImage1} />
                                                        </Modal>
                                                    </div>
                                                ) : (
                                                    <Image
                                                        width={100}
                                                        src={ourStoryInformation.oldImages[0].filePath === null ? '/images/avt.png' : ourStoryInformation.oldImages[0].filePath}
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
                                            isEditingOurStory ? (
                                                <div className='flex'>
                                                    <button
                                                        onClick={() => setIsEditingOurStory(false)}
                                                        className='bg-[#F5222D] hover:bg-red-700 text-white py-2 px-4 rounded mr-3'
                                                    >
                                                        Hủy cập nhật
                                                    </button>
                                                    <button

                                                        type='submit'
                                                        className='bg-[#52C41A] hover:bg-green-600 text-white py-2 px-4 rounded'
                                                    >
                                                        Lưu
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setIsEditingOurStory(true)}
                                                    className='bg-[#8DD3BB] hover:bg-[#6AB79D] text-white font-medium py-2 px-4 rounded'>
                                                    Chỉnh sửa
                                                </button>
                                            )
                                        }
                                    </div>
                                </form>
                            </div>
                        )
                    }
                </Card>
            </div>
            <Modal open={previewOpen1} title={previewTitle1} footer={null} onCancel={handleCancel1}>
                <Image width={1000} height={0} alt="example" style={{ width: '100%' }} src={previewImage1} />
            </Modal>
        </>


    );
}
