'use client';
import householdApi from '@/api/householdApi';
import { GetAllHouseholManager } from '@/types/dashboardType';
import * as React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Image, Tag, TimePicker, InputNumber, Row, Col, message } from 'antd';
import dayjs from 'dayjs';
import { IHouseholdManagerInformationUpdateRequest, IHouseholdManagerRuleUpdateRequest, IImageUpdateRequest } from '@/types/householdType';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp, faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/Components/CustomField/Modal';
import { set } from 'date-fns';
import LoadingPage from '@/Components/common/LoadingPage';
import { fi } from 'date-fns/locale';



export interface IOverviewProps { }

export default function Overview(props: IOverviewProps) {
  const [householdData, setHouseholdData] = React.useState<GetAllHouseholManager>();
  const [isInformationFomrUpdate, setIsInformationFomrUpdate] = React.useState(false);
  const [isRuleFomrUpdate, setIsRuleFomrUpdate] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const format = 'HH:mm';

  React.useEffect(() => {
    setLoading(true);
    householdApi.getHousehold().then((res) => {
      setHouseholdData(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  function formatTimeToVietnamese(timeString: any | undefined) {
    if (timeString === undefined) return;
    const [hour, minute] = (timeString || '00:00').split(':').map(Number);
    const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const formattedMinute = minute.toString().padStart(2, '0');

    const period = hour >= 12 ? 'PM' : 'AM';

    return `${formattedHour} giờ ${formattedMinute} phút ${period}`;
  }

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IHouseholdManagerInformationUpdateRequest>({
    defaultValues: householdData,
  });

  const onSubmitHouseholdInformation: SubmitHandler<IHouseholdManagerInformationUpdateRequest> = async (data) => {
    const dataResponse: IHouseholdManagerInformationUpdateRequest = {
      ...data,
      id: householdData?.id,
    };

    console.log(dataResponse);
    try {
      setLoading(true);
      await householdApi.updateHouseholdInformationByManager(dataResponse);
      const updatedList = await householdApi.getHousehold();
      setHouseholdData(updatedList);
      message.success('Cập nhật thông tin thành công');
      setIsInformationFomrUpdate(false);
    } catch (error) {
      message.error('Cập nhật thông tin không thành công');
    } finally {
      setLoading(false);
    }
  };


  const onSubmitHouseholdRule: SubmitHandler<IHouseholdManagerInformationUpdateRequest> = async (data) => {
    const dataResponse: IHouseholdManagerInformationUpdateRequest = {
      ...data,
      id: householdData?.id,
    };
    try {
   
      householdApi.updateHouseholdRuleByManager(dataResponse).then((res) => {
        if (res.httpStatus === 'OK') {
          setLoading(true);
          householdApi.getHousehold().then((res) => {
            message.success('Cập nhật quy định và chính sách thành công');
            setHouseholdData(res);
          }).catch((err) => {

          }).finally(() => {
            setLoading(false);
          });
          setIsRuleFomrUpdate(false);
        }
      });
    } catch (error) {
      message.error('Cập nhật quy định và chính sách không thành công');
    } finally {
      setLoading(false);
    }
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const [showModal, setShowModal] = React.useState(false);
  const [showModalCoverImage, setShowModalCoverImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [selectedCoverImage, setSelectedCoverImage] = React.useState<string | null>(null);
  const [imageFile, setImageFile] = React.useState<File>();
  const [imageCoverFile, setImageCoverFile] = React.useState<File>();


  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleCoverImageModalClose = () => {
    setShowModalCoverImage(false);
    document.body.style.overflow = 'auto';
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCoverImage(reader.result as string);
        setImageCoverFile(file);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSaveImage = async () => {
    const dataResponse: IImageUpdateRequest = {
      avatar: imageFile,
      coverImage: imageCoverFile,
    };

    if (dataResponse.avatar === undefined && dataResponse.coverImage === undefined) {
      return message.error('Vui lòng chọn ảnh');
    }

    try {
      setLoading(true);
      await householdApi.updateImageHousehold(dataResponse)
      message.success('Cập nhật ảnh thành công');
      setShowModal(false);
      setShowModalCoverImage(false);
      const updatedList = await householdApi.getHousehold();
      setHouseholdData(updatedList);
      setIsInformationFomrUpdate(false);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };




  return (
    <>
      {loading && <LoadingPage />}
      <form onSubmit={handleSubmit(onSubmitHouseholdInformation)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className='text-2xl font-semibold px-10 py-5'>Thông tin hộ kinh doanh</h1>
          {
            isInformationFomrUpdate ? (
              <div className='flex px-10 py-5'>
                <button
                  onClick={() => setIsInformationFomrUpdate(false)}
                  className='bg-red-700 text-white py-2 px-4 rounded mr-3'
                >
                  Hủy cập nhật
                </button>
                <button
                  type='submit'
                  className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'>
                  Lưu
                </button>
              </div>
            ) : (
              <button className="inline-block px-10 py-5"
                onClick={() => setIsInformationFomrUpdate(true)}
              >
                <p className="bg-gray-500 text-white py-3 px-4 rounded-md shadow-md text-sm">Chỉnh sửa</p>
              </button>
            )
          }

        </div>

        <div className='bg-white rounded-xl shadow-lg px-10 pb-5'>
          <div className='md: flex py-2'>
            <div className='w-1/3 font-semibold'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
                <p className="ml-2">Tên homestay</p>
              </div>
            </div>

            <div className='w-2/3' style={{ fontSize: '15px' }}>
              {
                isInformationFomrUpdate ? (
                  <div className="relative w-full py-2">
                    <input type="text"
                      id='householdName'
                      defaultValue={householdData?.householdName}
                      {...register('householdName')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  <p>
                    {householdData?.householdName}
                  </p>
                )
              }
            </div>
          </div>
          <div className='md: flex py-2'>
            <div className='w-1/3 font-semibold'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
                <p className="ml-2">Số điện thoại 1</p>
              </div>
            </div>
            <div className='w-2/3' style={{ fontSize: '15px' }}>
              {
                isInformationFomrUpdate ? (
                  <div className="relative w-full py-2">
                    <input type="text"
                      id='phoneNumberFirst'
                      defaultValue={householdData?.phoneNumberFirst}
                      {...register('phoneNumberFirst')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  <p>
                    {householdData?.phoneNumberFirst}
                  </p>
                )
              }
            </div>
          </div>
          <div className='md: flex py-2'>
            <div className='w-1/3 font-semibold'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
                <p className="ml-2">Số điện thoại 2</p>
              </div>
            </div>
            <div className='w-2/3' style={{ fontSize: '15px' }}>
              {
                isInformationFomrUpdate ? (
                  <div className="relative w-full py-2">
                    <input type="text"
                      id='phoneNumberSecond'
                      defaultValue={householdData?.phoneNumberSecond}
                      {...register('phoneNumberSecond')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  <p>
                    {householdData?.phoneNumberSecond}
                  </p>
                )
              }
            </div>
          </div>
          <div className='md: flex py-2'>
            <div className='w-1/3 font-semibold'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <p className="ml-2">Email</p>
              </div>
            </div>
            <div className='w-2/3' style={{ fontSize: '15px' }}>
              {
                isInformationFomrUpdate ? (
                  <div className="relative w-full py-2">
                    <input type="text"
                      id='email'
                      defaultValue={householdData?.email}
                      {...register('email')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  <p>
                    {householdData?.email}
                  </p>
                )
              }
            </div>
          </div>
          <div className='md: flex py-2'>
            <div className='w-1/3 font-semibold'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
                <p className="ml-2">Link Facebook</p>
              </div>
            </div>
            <div className='w-2/3' style={{ fontSize: '15px' }}>
              {
                isInformationFomrUpdate ? (
                  <div className="relative w-full py-2">
                    <input type="text"
                      id='linkFacebook'
                      defaultValue={householdData?.linkFacebook}
                      {...register('linkFacebook')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  <a href={householdData?.linkFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline', color: 'blue' }}>
                    {householdData?.linkFacebook}
                  </a>
                )
              }
            </div>
          </div>
          <div className='md: flex py-2'>
            <div className='w-1/3 font-semibold'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
                <p className="ml-2">Link tiktok</p>
              </div>
            </div>
            <div className='w-2/3' style={{ fontSize: '15px' }}>
              {
                isInformationFomrUpdate ? (
                  <div className="relative w-full py-2">
                    <input type="text"
                      id='linkTiktok'
                      defaultValue={householdData?.linkTiktok}
                      {...register('linkTiktok')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  <a href={householdData?.linkTiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline', color: 'blue' }}>
                    {householdData?.linkTiktok}
                  </a>
                )
              }
            </div>
          </div>
          <div className='md: flex py-2'>
            <div className='w-1/3 font-semibold'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
                <p className="ml-2">Lời giới thiệu</p>
              </div>
            </div>
            <div className='w-2/3' style={{ fontSize: '15px' }}>
              {
                isInformationFomrUpdate ? (
                  <div className="relative w-full py-2">
                    <textarea
                      id="description"
                      rows={3}
                      defaultValue={householdData?.description}
                      {...register('description')}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
                    </textarea>
                  </div>
                ) : (
                  <p>
                    {householdData?.description}
                  </p>
                )
              }
            </div>
          </div>
          <div className='md: flex py-2'>
            <div className='w-1/3 font-semibold'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
                <p className="ml-2">Link video giới thiệu</p>
              </div>
            </div>
            <div className='w-2/3' style={{ fontSize: '15px' }}>
              {
                isInformationFomrUpdate ? (
                  <div className="relative w-full py-2">
                    <input type="text"
                      id='linkYoutube'
                      defaultValue={householdData?.linkYoutube}
                      {...register('linkYoutube')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  <a href={householdData?.linkYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline', color: 'blue' }}>
                    {householdData?.linkYoutube}
                  </a>
                )
              }
            </div>
          </div>

        </div>
      </form>

      <div className='bg-white rounded-xl shadow-lg pb-5'>
        <h1 className='text-2xl px-10 pt-10 pb-5 font-semibold'>Hình ảnh đại diện</h1>
        <Row>
          <Col span={18} push={8}>
            <div className='font-semibold'>
              <p>Ảnh bìa</p>
            </div>
            <div className='py-2'>
              <Image
                height={200}
                width={700}
                alt=''
                preview={false}
                style={{ objectFit: 'cover', borderRadius: '10px' }}
                src={householdData?.coverImage === null ? "/images/GioiThieu.jpg" : householdData?.coverImage}
              />

              <div className='w-full mx-auto py-5'>
                <button
                  onClick={() => setShowModalCoverImage(true)}
                >
                  <p className="bg-gray-500 text-white py-3 px-4 rounded-md shadow-md text-sm">Chỉnh sửa</p>
                </button>
                <Modal isVisible={showModalCoverImage} onClose={handleCoverImageModalClose}>
                  <div className="grid grid-cols-8 items-center">
                    <div className='col-span-3 p-8 flex-col'>
                      <Image
                        src={selectedCoverImage ? selectedCoverImage : householdData?.coverImage || '/images/avt.png'}
                        width={275}
                        height={275}
                        preview={false}
                        alt="Image"
                        className="w-[200px] h-[200px] object-contain rounded-full m-auto border-slamon border-2"
                      />

                      <div className='flex justify-between mt-5'>
                        <label className="ml-3 px-4 py-2 font-medium bg-mint-green rounded-sm shadow hover:bg-opacity-50">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverImageChange}
                          />
                          <FontAwesomeIcon icon={faFileArrowUp} /> Tải ảnh lên
                        </label>

                      </div>
                    </div>
                    <div className='col-span-5 h-full text-right p-8 flex flex-col justify-between'>
                      <h1 className="font-semibold text-3xl">
                        Chọn hình ảnh để tải lên
                      </h1>
                      <button
                        type='submit'
                        className="mt-2 px-4 py-2 font-medium bg-mint-green rounded-sm shadow hover:bg-opacity-50 self-end"
                        onClick={handleSaveImage}
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} /> Lưu ảnh
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </Col>
          <Col span={6} pull={18}>
            <div className='font-semibold px-10'>
              <p >Ảnh đại diện</p>
            </div>
            <div className='px-10 py-2'>
              <Space wrap>
                <Avatar
                  size={200}
                  src={householdData?.avatar === null ? '/images/AmazingMeoVac.jpg' : householdData?.avatar}
                  icon={<UserOutlined />} />
              </Space>
              <div className='mx-auto py-5'>
                <button
                  onClick={() => setShowModal(true)}
                >
                  <p className="bg-gray-500 text-white py-3 px-4 rounded-md shadow-md text-sm">Chỉnh sửa</p>
                </button>
                <Modal isVisible={showModal} onClose={handleModalClose}>

                  <div className="grid grid-cols-8 items-center">
                    <div className='col-span-3 p-8 flex-col'>
                      <Image
                        src={selectedImage ? selectedImage : householdData?.avatar || '/images/avt.png'}
                        width={275}
                        height={275}
                        preview={false}
                        alt="Image"
                        className="w-[200px] h-[200px] object-contain rounded-full m-auto border-slamon border-2"
                      />
                      <div className='flex justify-between mt-5'>
                        <label className="ml-3 px-4 py-2 font-medium bg-mint-green rounded-sm shadow hover:bg-opacity-50">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          <FontAwesomeIcon icon={faFileArrowUp} /> Tải ảnh lên
                        </label>
                      </div>
                    </div>
                    <div className='col-span-5 h-full text-right p-8 flex flex-col justify-between'>
                      <h1 className="font-semibold text-3xl">
                        Chọn hình ảnh để tải lên
                      </h1>
                      <button
                        type='submit'
                        className="mt-2 px-4 py-2 font-medium bg-mint-green rounded-sm shadow hover:bg-opacity-50 self-end"
                        onClick={handleSaveImage}
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} /> Lưu ảnh
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </Col>
        </Row>
      </div>


      <form onSubmit={handleSubmit(onSubmitHouseholdRule)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className='text-2xl font-semibold px-10 pt-10 pb-5'>Quy định và các chính sách</h1>
          {
            isRuleFomrUpdate ? (
              <div className='flex px-10 py-5'>
                <button
                  onClick={() => setIsRuleFomrUpdate(false)}
                  className='bg-red-700 text-white py-2 px-4 rounded mr-3'
                >
                  Hủy cập nhật
                </button>
                <button
                  type='submit'
                  className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'>
                  Lưu
                </button>
              </div>
            ) : (
              <button className="inline-block px-10 py-5"
                onClick={() => setIsRuleFomrUpdate(true)}
              >
                <p className="bg-gray-500 text-white py-3 px-4 rounded-md shadow-md text-sm">Chỉnh sửa</p>
              </button>
            )
          }
        </div>

        <div className='bg-white rounded-xl shadow-lg pb-5 mb-5'>
          <div className='md: flex px-10'>
            <div className='w-1/3 font-semibold'>
              <p>Thời gian nhận phòng</p>
            </div>
            <div className='w-2/3' >
              {
                isRuleFomrUpdate ? (
                  <TimePicker
                    name='checkInTime'
                    defaultValue={dayjs(householdData?.checkInTime, format)}
                    defaultPickerValue={dayjs(householdData?.checkInTime, format)}
                    onChange={(value: any) => setValue('checkInTime', value ? value.format(format) : '')}
                    format={format} />
                ) : (
                  <Tag color='success' style={{ fontSize: '15px' }}>
                    {formatTimeToVietnamese(householdData?.checkInTime)}
                  </Tag>
                )
              }
            </div>
          </div>
          <div className='md: flex px-10 py-2'>
            <div className='w-1/3 font-semibold'>
              <p>Thời gian trả phòng</p>
            </div>
            <div className='w-2/3'>

              {
                isRuleFomrUpdate ? (
                  <TimePicker
                    name='checkOutTime'
                    defaultValue={dayjs(householdData?.checkOutTime, format)}
                    defaultPickerValue={dayjs(householdData?.checkOutTime, format)}
                    onChange={(value: any) => setValue('checkOutTime', value ? value.format(format) : '')}
                    format={format} />
                ) : (
                  <Tag color='success' style={{ fontSize: '15px' }}>
                    {formatTimeToVietnamese(householdData?.checkOutTime)}
                  </Tag>
                )
              }
            </div>
          </div>
          <div className='md: flex px-10'>
            <div className='w-1/3 font-semibold'>
              <p>Thời gian hủy phòng được hoàn tiền</p>
            </div>
            <div className='w-2/3'>
              {
                isRuleFomrUpdate ? (
                  <InputNumber
                    name='cancellationPeriod'
                    addonAfter="ngày"
                    defaultValue={householdData?.cancellationPeriod}
                    onChange={(value: any) => setValue('cancellationPeriod', value)}
                  />
                ) : (
                  <Tag color='warning' style={{ fontSize: '15px' }}>
                    {householdData?.cancellationPeriod} ngày
                  </Tag>
                )
              }

            </div>
          </div>
        </div>
      </form>
    </>
  );
}