'use client'
import LoadingPage from '@/Components/common/LoadingPage';
import serviceApi from '@/api/serviceApi';
import Modal from '@/Components/CustomField/Modal';
import { faCirclePlus, faFileArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { AdminServiceList, AdminServiceRequest } from '@/types/serviceType';
import AdminServiceItem from '@/Components/my-feedback/AdminServiceItem';
import Image from 'next/image';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import SuccessModal from '@/Components/CustomField/SuccessModal';

export interface IAdminServiceProps {
}

export default function AdminService(props: IAdminServiceProps) {
  const [loading, setLoading] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [serviceList, setServiceList] = React.useState<AdminServiceList>();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [img, setImg] = React.useState<File>();
  const [addSuccess, setAddSuccess] = React.useState(false);
  const fetchData = async () => { // Định nghĩa một hàm async để có thể sử dụng await
    try {
      setLoading(true);
      const response = await serviceApi.getAdminServiceList();
      console.log(response);
      setServiceList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setImg(file);
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  const schema = yup.object().shape({
    serviceName: yup.string().required('Tên dịch vụ không được để trống')
      .max(50, 'Tên dịch vụ không được quá 50 ký tự'),
    serviceDescription: yup.string().required('Mô tả dịch vụ không được để trống')
      .max(150, 'Mô tả dịch vụ không được quá 150 ký tự'),
    serviceId: yup.number().required('Mã dịch vụ không được để trống'),
    imageFile: yup.mixed().required('Ảnh dịch vụ không được để trống'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AdminServiceRequest>({
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AdminServiceRequest) => {
    try {
      setLoading(true);
      const newData: AdminServiceRequest =
      {
        ...data,
        imageFile: img as File
      }
      const response = await serviceApi.addAdminService(newData);
      console.log(response);
      reset();
      setShowAddModal(false);
      fetchData();
      setAddSuccess(true);
    } catch (error) {
      console.log('loi' + error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <LoadingPage />}
      <div className="w-11/12 my-5 m-auto">
        <div className='justify-between flex items-end my-4'>
          <button onClick={() => setShowAddModal(true)} className='py-2 px-4 bg-blue-500 text-white hover:bg-opacity-50 rounded-xl' >
            <FontAwesomeIcon icon={faPlus} /> Thêm dịch vụ
          </button>

          <div className='flex space-x-3'>
            <p className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-md shadow-md">Tổng dịch vụ: {serviceList?.serviceDetailList.length || 0}</p>
          </div>
        </div>

        <div className='grid grid-cols-5 gap-7'>
          {serviceList?.serviceDetailList.map((item, index) => (
            <AdminServiceItem key={index} fetchData={fetchData} serviceDetail={item}/>
          ))}
        </div>
      </div>
      <Modal isVisible={showAddModal} onClose={() => setShowAddModal(false)} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='p-7 w-[550px]'>
            <p className='font-bold text-center text-3xl my-5'>Thêm dịch vụ</p>
            <input type="hidden" {...register('serviceId')} value={'0'} />
            <div className='grid grid-cols-10 w-full gap-2 px-5'>
              <div className='col-span-4 font-bold'>Tên dịch vụ:</div>
              <div className='col-span-6 text-center'>
                <input type="text" {...register('serviceName')}
                  className='w-full h-full py-2 px-4 border border-gray-300 rounded-md' />
                {errors.serviceName && <p className='text-red-500'>{errors.serviceName.message}</p>}
              </div>
              <div className='col-span-4 font-bold mt-5'>Mô tả:</div>
              <div className='col-span-6 text-center mt-5'>
                <textarea {...register('serviceDescription')}
                  className='w-full h-full py-2 px-4 border border-gray-300 rounded-md' rows={5}>
                </textarea>
                {errors.serviceDescription && <p className='text-red-500'>{errors.serviceDescription.message}</p>}
              </div>

              <div className='col-span-4 flex mt-5 flex-col justify-between font-bold'>
                <div>Ảnh dịch vụ:</div>
                <label className="px-4 w-fit py-2 font-medium bg-blue-500 text-white rounded-sm shadow hover:bg-opacity-50">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("imageFile")}
                    onChange={handleImageChange} />
                  <FontAwesomeIcon icon={faFileArrowUp} /> Tải ảnh lên
                </label>
              </div>
              <div className='col-span-6 text-center mt-5'>
                <Image
                  src={selectedImage ? selectedImage : '/images/placeholder.png'}
                  width={275}
                  height={275}
                  alt="Image"
                  className="max-w-full rounded-md object-contain m-auto border-gray-400 border-2"
                />
              </div>
              {errors.imageFile && <div className='col-span-10 text-red-500 text-center'>{errors.imageFile.message}</div>}

            </div>
            <button
              type='submit'
              {...img ? {} : { disabled: true }}
              className={`py-2 px-4 ${!img ? 'border border-gray-300 text-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-opacity-50'} font-bold float-right mt-20 mb-10 rounded`}>
              <FontAwesomeIcon icon={faCirclePlus} className='mr-2' />
              Thêm dịch vụ
            </button>
          </div>
        </form>
      </Modal>
      <SuccessModal isVisible={addSuccess} onClose={() => setAddSuccess(false)} message='Thêm dịch vụ thành công' />
    </>
  );
}