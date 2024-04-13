'use client';
import React from 'react';
import { Facility, IhouseholdRoomTypeResponseDtos } from '@/types/dashboardType';
import roomtypeApi from '@/api/roomtypeApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Modal, Popconfirm, Tag, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/Components/common/LoadingPage';


export interface IRoomTypeProps {
  params: { slug: string };
}

export default function RoomType({ params: { slug } }: IRoomTypeProps) {
  const [loading, setLoading] = React.useState(false);
  const [roomTypeData, setRoomTypeData] = React.useState<IhouseholdRoomTypeResponseDtos>();

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IhouseholdRoomTypeResponseDtos>({
    defaultValues: roomTypeData,
    
  });

  React.useEffect(() => {
    setLoading(true);
    roomtypeApi.getDetailRoomType(slug).then((value) => {
      setRoomTypeData(value);

      let newValue = value.facilityVillageList.map((room) => {
        let temp = value.facilities.filter(
          (room2) => room2.facilityId === room.facilityId
        );
        return {
          ...room,
          status: temp.length ? true : false,
        };
      });

      let newValue2: IhouseholdRoomTypeResponseDtos = {
        ...value,
        facilityVillageList: newValue,
      };
      console.log(newValue2);
      reset(newValue2);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [slug, reset]);

  //childrenAndBed Radio


  console.log('childrenAndBed ' + JSON.stringify(roomTypeData?.isChildrenAndBed));
  const onSubmit: SubmitHandler<IhouseholdRoomTypeResponseDtos> = async (data) => {
    // console.log('Onsubmit   ' + data.isChildrenAndBed);
    const validSelectedImages = selectedImages.filter(file => file !== undefined);
    if (validSelectedImages.length > 0) {
      console.log(validSelectedImages);
    } else {
      console.log("no image");
    }

    const newfacilityVillageList: Facility[] = data.facilityVillageList.map(
      (value) => {
        return {
          id: value.id,
          facilityId: value.facilityId,
          facilityName: value.facilityName,
        };
      }
    );
    let newFacility: Facility[] = [];
    for (let i of data.facilityVillageList) {
      if (i.status) {
        newFacility.push({
          id: i.id,
          facilityId: i.facilityId,
          facilityName: i.facilityName,
        });
      }
    }
    let res: IhouseholdRoomTypeResponseDtos = {
      ...data,
      facilityVillageList: newfacilityVillageList,
      facilities: newFacility,
      isChildrenAndBed: data.isChildrenAndBed,
      imageFiles: validSelectedImages.length > 0 ? validSelectedImages : [],

      homestayMedias: fileList.length > 0 ? fileList
        .filter(file => file.uid && file.name && (file.url || file.preview))
        .map(file => ({
          id: Number(file.uid),
          fileName: file.name,
          filePath: file.url || (file.preview as string),
          type: file.type === "" ? "IMAGE" : "VIDEO",
          status: file.status || "",
        })) : [],
    };

    console.log('RES' + res.isChildrenAndBed);
    roomtypeApi.editDetailRoomType(res, slug);
    const updatedRoomType = roomtypeApi.getDetailRoomType(slug);
    setRoomTypeData(await updatedRoomType);
    message.success('Cập nhật thành công');
    router.push('/manager/room-type');

  };

  // Xử lý ảnh 

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
    const mappedFileList = roomTypeData?.homestayMedias?.map((item) => ({
      uid: item.id.toString(),
      name: item.fileName,
      url: item.filePath,
      type: item.type === "IMAGE" ? "" : "",
    })) || [];

    setFileList(mappedFileList);
  }, [roomTypeData]);

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

  const router = useRouter();
  const breadcrumbItems = [
    {
      href: '/manager/room-type',
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
        <span className='font-bold'>Chi tiết loại phòng</span>
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

      <form className="w-full max-w-full" onSubmit={handleSubmit(onSubmit)} method='PUT' encType='multipart/form-data'>
        <div className="bg-white px-10 pb-8 mb-4">
          <div className='text-2xl font-bold mb-4'>
            Chi tiết loại phòng
          </div>
          <table className='justify-center'>
            <tbody>
              <tr>
                <td className="py-5 whitespace-nowrap font-semibold">Loại phòng</td>
                <td className="py-4 whitespace-nowrap pl-20">
                  <p>{roomTypeData?.roomTypeName}</p>
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Sức chứa tối đa</td>
                <td className="py-4 whitespace-nowrap pl-20">
                  <input min={1} required inlist={roomTypeData?.capacity} type="number" {...register('capacity')} className="border focus:border-gray-300 outline-none border-gray-300 px-3 py-1 rounded-md w-1/3" />
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Dịch vụ và trang thiết bị</td>
                <td className="py-4 whitespace-nowrap pl-20">
                  {roomTypeData?.facilityVillageList.map((room, index) => {
                    return (
                      <div key={index} className='space-x-3'>
                        <input type="checkbox" id={`facilityCheckbox-${index}`} {...register(`facilityVillageList.${index}.status`)}
                        />
                        <label htmlFor={`facilityCheckbox-${index}`}>{room.facilityName}</label>
                      </div>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Chính sách trẻ em và nôi cũi</td>
                <td className="py-4 whitespace-nowrap pl-20">
                  <label htmlFor=""> Có </label>
                  <input
                    type="radio"
                    value="true"
                    {...register('isChildrenAndBed')}
                    checked={roomTypeData?.isChildrenAndBed === true}
                   
                  />
                  <label htmlFor="" className='ml-3'> Không </label>
                  <input
                    type="radio"
                    value="false"
                    {...register('isChildrenAndBed')}
                    checked={roomTypeData?.isChildrenAndBed === false}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Giá phòng hiện tại</td>
                <td className="py-4 whitespace-nowrap pl-20">
                  <Tag color='green'>{roomTypeData?.price.toLocaleString('vi-VI')} VNĐ</Tag>
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Giá phòng mới</td>
                <td className="py-4 whitespace-nowrap pl-20 flex">
                  <input type="text" required {...register('priceUpdate')} className="border outline-none focus:border-gray-300 border-gray-300 px-2 py-1 rounded-md w-1/3" />
                  <Popconfirm
                    title="Cập nhật giá của loại phòng"
                    description={<span style={{ fontSize: '12px' }}>Nếu bạn muốn cập nhật giá loại phòng này <br /> thì cần sự chấp nhận của quản trị viên <br /> trước khi giá được cập nhật chính thức trên trang web</span>}
                    showCancel={false}
                    okType='default'
                    okText={<span style={{ color: '#4096FF' }}>Đã hiểu</span>}
                  >
                    <Button style={{ border: 'none', color: '#F7B217' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>

                    </Button>
                  </Popconfirm>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="image" className='font-semibold'>Chỉnh sửa ảnh của loại phòng</label>
                </td>
                <td className="pl-20">
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