'use client';
import roomtypeApi from '@/api/roomtypeApi';
import { IGetRoomTypeToAdd } from '@/types/dashboardType';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Modal, Popconfirm, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import LoadingPage from '@/Components/common/LoadingPage';
import { useRouter } from 'next/navigation';



export interface IAddRoomTypeProps {

}

export default function AddRoomType(props: IAddRoomTypeProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState('Chọn loại phòng');
  const [roomTypeData, setRoomTypeData] = React.useState<IGetRoomTypeToAdd>();
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IGetRoomTypeToAdd>({
    defaultValues: roomTypeData,
  });


  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    roomtypeApi.getRoomTypeToAdd().then((res) => {
      setRoomTypeData(res);
      setSelectedOption(res.roomTypes[0]?.roomTypeName || '');
    }).catch((err) => { 
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };


  const [childrenAndBed, setChildrenAndBed] = React.useState(false);
  React.useEffect(() => {
    if (roomTypeData?.isChildrenAndBed !== undefined) {
      setChildrenAndBed(roomTypeData.isChildrenAndBed);
    }
  }, [roomTypeData]);
  const handleChildrenAndBedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChildrenAndBed(event.target.value === 'true');
  };

  const router = useRouter();
  const onSubmit: SubmitHandler<IGetRoomTypeToAdd> = async (data) => {
    const selectedRoomType = roomTypeData?.roomTypes.find((roomType) => roomType.roomTypeName === selectedOption);
    if (selectedRoomType) {
      // Truy xuất thông tin cần thiết từ selectedRoomType
      const { id, roomTypeName, doubleBed, singleBed } = selectedRoomType;
      data.roomTypes = [{ id, roomTypeName, doubleBed, singleBed }];
    }
    const selectedFacilities = data.facilities.filter((facility) => facility.facilityId);
    let res: IGetRoomTypeToAdd = {
      ...data,
      roomTypes: data.roomTypes,
      isChildrenAndBed: childrenAndBed,
      facilities: selectedFacilities,
      priceUpdate: data.priceUpdate,
      capacity: data.capacity,
      mediaFiles: selectedImages,
    }
   
    try {
    
      setLoading(true);
      await roomtypeApi.addRoomType(res);
      const updateData = await roomtypeApi.getRoomTypeToAdd();
      setRoomTypeData(updateData);
      message.success('Thêm loại phòng thành công');
      router.push('/manager/room-type');
    } catch (error) {
      message.error('Thêm loại phòng thất bại');
    }finally{
      setLoading(false);
    }
  }
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
  const [fileList, setFileList] = React.useState<UploadFile[]>([

  ]);

  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //gán cho setFileList = null
    setFileList(newFileList);

    const selectedFiles = newFileList
      .map(file => file.originFileObj as File);

    setSelectedImages(selectedFiles);
    // setFileList(newFileList);
  };

  const handleCancel = () => setPreviewOpen(false);


  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="flex justify-center h-screen">
      {loading && <LoadingPage />}
      <form className="w-full max-w-full" onSubmit={handleSubmit(onSubmit)} method='PUT' encType='multipart/form-data'>
        <div className="bg-white px-10 py-5">
          <table>
            <thead>
              <tr>
                <td className='text-2xl font-semibold pb-5'>
                  <Breadcrumb
                    items={[
                      {
                        href: '/manager/room-type',
                        title: (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                              <path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z" />
                            </svg>
                            <span className='pl-2'>Loại phòng</span>
                          </div>
                        ),
                      },
                      {
                        title: (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className='font-bold'>Thêm loại phòng</span>
                          </div>
                        ),
                      },
                    ]}
                  />
                </td>
              </tr>
              <tr>
                <td className='text-2xl font-semibold pb-5'>Thêm loại phòng</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 whitespace-nowrap font-semibold">Loại phòng</td>
                <td className="py-2 whitespace-nowrap pl-20">
                  <div className="relative">
                    <span
                      className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                      onClick={toggleDropdown}
                    >
                      <span>{selectedOption}</span>
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
                        {roomTypeData?.roomTypes.map((option) => (
                          <button
                            key={option.id}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            onClick={() => selectOption(option.roomTypeName)}
                          >
                            {option.roomTypeName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              {roomTypeData && (
                <tr>
                  <td className="py-4 whitespace-nowrap font-semibold" >Giường đơn</td>
                  <td className="py-4 whitespace-nowrap pl-20">
                    {roomTypeData.roomTypes.find((roomType) => roomType.roomTypeName === selectedOption)?.singleBed}
                  </td>
                </tr>
              )}

              {roomTypeData && (
                <tr>
                  <td className="py-4 whitespace-nowrap font-semibold" >Giường đôi</td>
                  <td className="py-4 whitespace-nowrap pl-20">
                    {roomTypeData.roomTypes.find((roomType) => roomType.roomTypeName === selectedOption)?.doubleBed}
                  </td>
                </tr>
              )}
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold" >Dịch vụ và trang thiết bị</td>
                <td className="py-4 whitespace-nowrap pl-20">
                  {roomTypeData?.facilities.map((facility, index) => {
                    return (
                      <div key={index} className='space-x-3'>
                        <input
                          type="checkbox"
                          {...register(`facilities.${index}.facilityId`)}
                        />
                        <label htmlFor={`facilityCheckbox-${index}`}>{facility.facilityName}</label>
                        <input
                          type="hidden"
                          {...register(`facilities.${index}.id`)}
                          value={facility.id}
                        />
                        <input
                          type="hidden"
                          {...register(`facilities.${index}.facilityName`)}
                          value={facility.facilityName}
                        />
                      </div>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold" >Chính sách trẻ em và nôi cũi</td>
                <td className="py-4 whitespace-nowrap pl-20">
                  <label htmlFor=""> Có </label>
                  <input
                    type="radio"
                    name="childrenAndBed"
                    value="true"
                    onChange={handleChildrenAndBedChange}
                  />

                  <label htmlFor="" className='ml-3'> Không</label>
                  <input
                    type="radio"
                    name="childrenAndBed"
                    value="true"
                    checked={true}
                    onChange={handleChildrenAndBedChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold">Giá phòng <span className="text-red-500">*</span></td>
                <td className="py-4 whitespace-nowrap pl-20">
                  <input type="text" {...register("priceUpdate")} className="border outline-none border-gray-300 px-2 py-1 rounded-md" />
                  <Popconfirm
                    title="Thêm giá của loại phòng"
                    description={<span style={{ fontSize: '12px' }}>Nếu bạn muốn thêm giá loại phòng này <br /> thì cần sự chấp nhận của quản trị viên <br /> trước khi giá được cập nhật chính thức trên trang web</span>}
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
              <td className="py-4 whitespace-nowrap font-semibold">Sức chứa tối đa <span className="text-red-500">*</span></td>
                  <td className="py-4 whitespace-nowrap pl-20">
                  <input type="text" {...register("capacity")} className="border border-gray-300 px-2 py-1 outline-none rounded-md" />
                  </td>
                </tr>
              <tr>
                <td className="py-4 whitespace-nowrap font-semibold" >Tải lên ảnh của homestay</td>
                <td className="py-4 whitespace-nowrap flex pl-20">
                  <Upload
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
                    <Image width={100} height={100} alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-between py-4 pb-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Thêm loại phòng
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
