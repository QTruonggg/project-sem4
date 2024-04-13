import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import villageInformationApi from '@/api/villageInformationApi';
import { Card, Col, Row, Image, Upload, Modal, message } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IVillageInformationResponse } from '@/types/villageInformationType';
import LoadingPage from '@/Components/common/LoadingPage';
export interface ICultureInformationProps {
  cultureInformation: IVillageInformationResponse | undefined;
  setCultureInformation: (value: React.SetStateAction<IVillageInformationResponse | undefined>) => void;
}

export default function CultureInformation({ cultureInformation, setCultureInformation }: ICultureInformationProps) {
  const [isEditingCulture, setIsEditingCulture] = React.useState(false);

  const [previewOpen3, setPreviewOpen3] = React.useState(false);
  const [previewImage3, setPreviewImage3] = React.useState('');
  const [previewTitle3, setPreviewTitle3] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const [fileList3, setFileList3] = React.useState<UploadFile[]>([]);
  const [selectedImages3, setSelectedImages3] = React.useState<File[]>([]);

  const handleCancel3 = () => setPreviewOpen3(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });


  const handlePreview3 = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage3(file.url || (file.preview as string));
    setPreviewOpen3(true);
    setPreviewTitle3(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange3: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //gán cho setFileList = null
    setFileList3(newFileList);

    const selectedFiles = newFileList.map(file => file.originFileObj as File);
    console.log('selectedFiles', selectedFiles);
    setSelectedImages3(selectedFiles);

  };

  React.useEffect(() => {
    const mappedFileList = cultureInformation?.oldImages?.map((item) => ({
      uid: item.id.toString(),
      name: item.fileName,
      url: item.filePath,
      type: item.type === "IMAGE" ? "" : "",
    })) || [];

    setFileList3(mappedFileList);
  }, [cultureInformation]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IVillageInformationResponse>({
    defaultValues: cultureInformation
  });

  const onSubmit: SubmitHandler<IVillageInformationResponse> = async (data) => {

    const validSelectedImages3 = selectedImages3.filter(file => file !== undefined);
    const res: IVillageInformationResponse = {
      ...data,
      id: cultureInformation?.id || 0,
      type: cultureInformation?.type || '',
      title: data.title || '',
      description: data.description || '',
      newImages: validSelectedImages3.length > 0 ? validSelectedImages3 : [],
      oldImages: fileList3.length > 0 ? fileList3
        .filter(file => file.uid && file.name && (file.url || file.preview))
        .map(file => ({
          id: Number(file.uid),
          fileName: file.name,
          filePath: file.url || (file.preview as string),
          type: file.type === "" ? "IMAGE" : "VIDEO",
        })) : [],
    };
    try {
      setLoading(true);
      await villageInformationApi.updateCultureInformation(res)
      const updateData = villageInformationApi.getVillageInformationsByAdmin();
      setCultureInformation((await updateData).villageInformation[2]);
      message.success('Cập nhật văn hóa thành công');
      setIsEditingCulture(false);
    } catch (error) {

    } finally {
      setLoading(false);
      reset();
    }
  }

  return (
    <div>
      {loading && <LoadingPage />}
      <Card className='mb-5' title="Văn hoá" size="small" headStyle={{ backgroundColor: '#8DD3BB', fontSize: '15px' }}>
        {
          cultureInformation && (

            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col span={18} push={6}>
                  {
                    isEditingCulture ? (
                      <div className="relative w-full py-2">
                        <input type="text"
                          defaultValue={cultureInformation.title}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          {...register('title')}
                        />
                      </div>
                    ) : (
                      <p className='py-2 pr-2'>{cultureInformation.title}</p>
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
                    isEditingCulture ? (
                      <div className="relative w-full py-2">
                        <textarea id="message" defaultValue={cultureInformation.description}
                          rows={4}
                          {...register('description')}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </textarea>
                      </div>
                    ) : (
                      <p className='py-2 pr-2'>
                        {cultureInformation.description}
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
                    isEditingCulture ? (
                      <div>
                        <Upload
                          listType="picture-card"
                          fileList={fileList3}
                          onPreview={handlePreview3}
                          onChange={handleChange3}
                          accept="image/*"
                          beforeUpload={(file) => {
                            const isImage = file.type.startsWith('image/*');
                            const isLt2M = file.size / 1024 / 1024 < 2; // Giới hạn kích thước là 2MB

                            return isImage && isLt2M;
                          }}
                        >
                          {fileList3.length >= 3 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen3} onCancel={handleCancel3}>
                          <Image width={1000} height={0} alt="example" style={{ width: '100%' }} src={previewImage3} />
                        </Modal>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Image
                          width={100}
                          src={cultureInformation.oldImages[0].filePath === null ? '/images/avt.png' : cultureInformation.oldImages[0].filePath}
                        />
                        <Image
                          width={100}
                          src={cultureInformation.oldImages[1].filePath === null ? '/images/avt.png' : cultureInformation.oldImages[1].filePath}
                        />
                        <Image
                          width={100}
                          src={cultureInformation.oldImages[2].filePath === null ? '/images/avt.png' : cultureInformation.oldImages[2].filePath}
                        />
                      </div>
                    )
                  }
                </Col>
                <Col span={6} pull={18}>
                  <p className='px-2 py-2 font-semibold'>Ảnh</p>
                </Col>
              </Row>
              <div className='flex justify-end pb-2'>
                {
                  isEditingCulture ? (
                    <div className='flex'>
                      <button
                        onClick={() => setIsEditingCulture(false)}
                        className='bg-[#F5222D] hover:bg-red-700 text-white py-2 px-4 rounded mr-3'
                      >
                        Hủy cập nhật
                      </button>
                      <button
                        type='submit'
                        className='bg-[#52C41A] hover:bg-green-600 text-white py-2 px-4 rounded'>
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingCulture(true)}
                      className='bg-[#8DD3BB] hover:bg-[#6AB79D] font-medium text-white py-2 px-4 rounded'>
                      Chỉnh sửa
                    </button>
                  )
                }
              </div>
            </form>
          )
        }
      </Card>
    </div>
  );
}
