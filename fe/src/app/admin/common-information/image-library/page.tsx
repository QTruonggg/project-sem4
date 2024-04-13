'use client';
import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import villageInformationApi from '@/api/villageInformationApi';
import { ILibraryVillage } from '@/types/villageInformationType';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { set } from 'date-fns';
import LoadingPage from '@/Components/common/LoadingPage';

export interface IImageLibraryProps {
}


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function ImageLibrary() {
  const [previewOpen1, setPreviewOpen1] = React.useState(false);
  const [previewImage1, setPreviewImage1] = React.useState('');
  const [previewTitle1, setPreviewTitle1] = React.useState('');


  const [previewOpen2, setPreviewOpen2] = React.useState(false);
  const [previewImage2, setPreviewImage2] = React.useState('');
  const [previewTitle2, setPreviewTitle2] = React.useState('');


  const [previewOpen3, setPreviewOpen3] = React.useState(false);
  const [previewImage3, setPreviewImage3] = React.useState('');
  const [previewTitle3, setPreviewTitle3] = React.useState('');
  const [fileList3, setFileList3] = React.useState<UploadFile[]>([]);

  const [loading, setLoading] = React.useState(false);

  const handleCancel3 = () => setPreviewOpen3(false);


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [ImageLibraryImage, setImageLibraryImage] = React.useState<ILibraryVillage>();
  React.useEffect(() => {
    setLoading(true);
    villageInformationApi.getAllVillageMedia().then((res) => {
      return setImageLibraryImage(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);


  //mapped FileList1
  React.useEffect(() => {
    const mappedFileList = ImageLibraryImage?.imageHomeMain?.map((item) => ({
      uid: item?.id.toString() || "",
      name: item.fileName,
      url: item.filePath,
      type: item.type === "IMAGE" ? "" : "",
      position: item.position,
    })) || [];

    setFileList1(mappedFileList);
  }, [ImageLibraryImage]);
  const [selectedImages1, setSelectedImages1] = React.useState<File[]>([]);

  const [fileList1, setFileList1] = React.useState<UploadFile[]>([]);

  const handleCancel1 = () => setPreviewOpen2(false);

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

  //mapped FileList2
  React.useEffect(() => {
    const mappedFileList = ImageLibraryImage?.imageHomeSub?.map((item) => ({
      uid: item?.id.toString() || "",
      name: item.fileName,
      url: item.filePath,
      type: item.type === "IMAGE" ? "" : "",
      position: item.position,
    })) || [];

    setFileList2(mappedFileList);
  }, [ImageLibraryImage]);
  const [selectedImages2, setSelectedImages2] = React.useState<File[]>([]);

  const [fileList2, setFileList2] = React.useState<UploadFile[]>([]);

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

  //mapped FileList3
  React.useEffect(() => {
    const mappedFileList = ImageLibraryImage?.imageGallery?.map((item) => ({
      uid: item?.id.toString() || "",
      name: item.fileName,
      url: item.filePath,
      type: item.type === "IMAGE" ? "" : "",
      position: item.position,
    })) || [];

    setFileList3(mappedFileList);
  }, [ImageLibraryImage]);


  const handlePreview3 = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage3(file.url || (file.preview as string));
    setPreviewOpen3(true);
    setPreviewTitle3(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const [selectedImages3, setSelectedImages3] = React.useState<File[]>([]);

  const handleChange3: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //gán cho setFileList = null
    setFileList3(newFileList);

    const selectedFiles = newFileList
      .map(file => file.originFileObj as File);

    setSelectedImages3(selectedFiles);

  };

  //Call API
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ILibraryVillage>({
    defaultValues: ImageLibraryImage,
  });
  const onSubmit: SubmitHandler<ILibraryVillage> = async (data) => {
    const validSelectedImages3 = selectedImages3.filter(file => file !== undefined);
    const validSelectedImages2 = selectedImages2.filter(file => file !== undefined);
    const validSelectedImages1 = selectedImages1.filter(file => file !== undefined);
    console.log('data' + data.imageHomeSub);

    const res: ILibraryVillage = {
      ...data,
      imageHomeMainUpload: validSelectedImages1.length > 0 ? validSelectedImages1 : [],
      imageHomeMain: fileList1.length > 0 ? fileList1
        .filter(file => file.uid && file.name && (file.url || file.preview))
        .map(file => ({
          id: Number(file.uid),
          fileName: file.name,
          filePath: file.url || (file.preview as string),
          type: file.type === "" ? "IMAGE" : "VIDEO",
          position: 'HOME_MAIN',
        })) : [],

      imageHomeSubUploads: validSelectedImages2.length > 0 ? validSelectedImages2 : [],
      imageHomeSub: fileList2.length > 0 ? fileList2
        .filter(file => file.uid && file.name && (file.url || file.preview))
        .map(file => ({
          id: Number(file.uid),
          fileName: file.name,
          filePath: file.url || (file.preview as string),
          type: file.type === "" ? "IMAGE" : "VIDEO",
          position: 'HOME_SUB',
        })) : [],
      imageGalleryUploads: validSelectedImages3.length > 0 ? validSelectedImages3 : [],
      imageGallery: fileList3.length > 0 ? fileList3
        .filter(file => file.uid && file.name && (file.url || file.preview))
        .map(file => ({
          id: Number(file.uid),
          fileName: file.name,
          filePath: file.url || (file.preview as string),
          type: file.type === "" ? "IMAGE" : "VIDEO",
          position: 'GALLERY',
        })) : [],
    }
    try {
      setLoading(true);
      await villageInformationApi.updateVillageMedia(res);
      const updateData = villageInformationApi.getAllVillageMedia();
      setImageLibraryImage((await updateData));
      message.success('Cập nhật ảnh thành công');
    } catch (error) {

    } finally {
      setLoading(false);
    }


  }

  return (
    <>
      {loading && <LoadingPage />}
      <div className='m-10 text-3xl font-semibold'>
        <h1>Thư viện ảnh</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='m-10 border border-gray-500 rounded-md'>
        <div className="space-y-10 p-10">
          <div className="grid grid-cols-3 items-center" style={{display:'none'}}>
            <div className="col-span-1 font-semibold">Ảnh trang chủ chính giữa <a className='font-thin '>(1 ảnh)</a></div>
            <div className='col-span-2 '>
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
          </div>
          <div className="grid grid-cols-3 items-center" style={{display:'none'}}>
            <div className="col-span-1 font-semibold">Ảnh trang chủ hai bên <a className='font-thin'>(4 ảnh)</a></div>
            <div className='col-span-2'>
              <Upload
                listType="picture-card"
                fileList={fileList2}
                onPreview={handlePreview2}
                onChange={handleChange2}
                multiple={true}
              >
                {fileList2.length >= 4 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen2} onCancel={handleCancel2}>
                <Image width={1000} height={0} alt="example" style={{ width: '100%' }} src={previewImage2} />
              </Modal>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center">
            <div className="col-span-1 font-semibold">Ảnh trong thư viện ảnh <a className='font-thin'>(tối đa 30 ảnh)</a></div>
            <div className='col-span-2'>
              <Upload
                listType="picture-card"
                fileList={fileList3}
                onPreview={handlePreview3}
                onChange={handleChange3}
                accept="image/*"
                multiple={true}
              >
                {fileList3.length >= 30 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen3} onCancel={handleCancel3}>
                <Image width={1000} height={0} alt="example" style={{ width: '100%' }} src={previewImage3} />
              </Modal>
            </div>
          </div>
        </div>
        <button type='submit' className='m-10 border border-blue-500 bg-blue-500 w-28 h-10 rounded-md text-white hover:bg-blue-700'>
          Cập nhật
        </button>
      </form >
    </>


  );
}
