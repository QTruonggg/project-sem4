'use client';
import homestayApi from '@/api/homestayApi';
import { IhomestayManagerList } from '@/types/dashboardType';
import * as React from 'react';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Badge, Breadcrumb, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import LoadingPage from '@/Components/common/LoadingPage';
import { useRouter } from 'next/navigation';


export interface IHomestayProps {
  params: { slug: number };
}

export default function Homestay({ params: { slug } }: IHomestayProps) {
  const [loading, setLoading] = React.useState(false);
  const [listhomestay, setlistHomestay] = React.useState<IhomestayManagerList>();
  const { register, handleSubmit, setValue } = useForm<IhomestayManagerList>({
    defaultValues: listhomestay
  });

  React.useEffect(() => {
    setLoading(true);
    homestayApi.getHomestayDetail(slug).then((value) => {
      setlistHomestay(value);
      setValue('homestayId', value?.homestayId);
      setValue('address', value?.address || '');
      setValue('totalRoom', value?.totalRoom);
      setValue('totalDorm', value?.totalDorm);
      setValue('homestayStatus', value?.homestayStatus);
      setValue('homestayCode', value?.homestayCode);
      setValue('homestayMediaList', value?.homestayMediaList);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [slug, setValue]);


  //Xử lý ảnh
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
    const mappedFileList = listhomestay?.homestayMediaList?.map((item) => ({
      uid: item.id.toString(),
      name: item.fileName,
      url: item.filePath,
      type: item.type === "IMAGE" ? "" : "",
    })) || [];

    setFileList(mappedFileList);
  }, [listhomestay]);

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

  if (selectedImages.length > 0) {
    console.log('Đay là list người dùng chọn' + JSON.stringify(selectedImages));
  }
  console.log('Đay là list sau khi set dữ liệu cho file list' + JSON.stringify(fileList));

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
  const router = useRouter();

  const onSubmit: SubmitHandler<IhomestayManagerList> = async (data) => {

    const validSelectedImages = selectedImages.filter(file => file !== undefined);
    let res: IhomestayManagerList = {
      ...data,
      imagesFile: validSelectedImages.length > 0 ? validSelectedImages : [],

      homestayMediaList: fileList.length > 0 ? fileList
        .filter(file => file.uid && file.name && (file.url || file.preview))
        .map(file => ({
          id: file.uid,
          fileName: file.name,
          filePath: file.url || (file.preview as string),
          type: file.type === "" ? "IMAGE" : "VIDEO",
          status: file.status || "",
        })) : [],
    };

    try {
      setLoading(true);
      await homestayApi.updateHomestay(res, slug);
      const update = await homestayApi.getHomestayDetail(slug);
      setlistHomestay(update);
      message.success('Cập nhật thành công');
      router.push('/manager/homestay');
    } catch (error) {

    } finally {
      setLoading(false);
    }

  };
  const breadcrumbItems = [
    {
      href: '/manager/homestay',
      title: (
        <>
          <button style={{ display: 'flex', alignItems: 'center' }} className='hover:font-semibold text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
              <path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z" />
            </svg>
            <span className='pl-2'>Phòng</span>
          </button>
        </>
      ),
    },
    {
      title: <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className='font-bold'>Chi tiết phòng</span>
      </div>,
    },
  ];
  return (
    <>
      {loading && <LoadingPage />}
      <Breadcrumb className='px-10 py-5'>
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
      {/* <Breadcrumb
        className='px-8 py-5'
        items={[
          {
            href: '/manager/homestay',
            title: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className='pl-2'>Homestay</span>
              </div>
            ),
          },
          {
            title: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className='font-bold'>{slug}</span>
              </div>
            ),
          },
        ]}
      /> */}
      <form className="w-full max-w-full" onSubmit={handleSubmit(onSubmit)} method='PUT' encType='multipart/form-data'>
        <div className="bg-white px-10 pb-5 mb-4">
          <table className='justify-center'>
            <thead>
              <tr>
                <th className='text-2xl font-bold pb-4'>
                  Chi tiết homestay
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Mã homestay</td>
                <td className="py-2 whitespace-nowrap pl-20">
                  <p>{listhomestay?.homestayCode}</p>
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Địa chỉ</td>
                <td className="py-2 whitespace-nowrap pl-20 w-[100vh]">
                  <textarea id="message" rows={2} {...register('address')} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Số phòng</td>
                <td className="py-2 whitespace-nowrap pl-20">
                  {listhomestay?.totalRoom}
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Số dorm</td>
                <td className="py-2 whitespace-nowrap pl-20">
                  {listhomestay?.totalDorm}
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Trạng thái</td>
                <td className="py-2 whitespace-nowrap pl-20">
                  {listhomestay?.homestayStatus === 'ACTIVE' ? <Badge status="success" style={{ color: 'green' }} text="Đang hoạt động" /> : <Badge status="warning" style={{ color: 'orange' }} text="Đã ẩn trên web" />}
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">
                  <label htmlFor="image">Tải lên ảnh của homestay</label>
                </td>
                <td className='pl-20'>
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
                    <Image width={100} height={100} alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </>
  );
}