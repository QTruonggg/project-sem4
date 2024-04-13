'use client'
import Modal from '@/Components/CustomField/Modal';
import LoadingPage from '@/Components/common/LoadingPage';
import ServiceItem from '@/Components/my-feedback/ServiceItem';
import serviceManagerApi from '@/api/serviceManagerApi';
import { IAddServiceRequest, IServiceList } from '@/types/serviceManagerType';
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface IServiceManagerProps {
}

export default function ServiceManager(props: IServiceManagerProps) {
  
  const [loading, setLoading] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [serviceList, setServiceList] = React.useState<IServiceList>();
  const fetchData = async () => { // Định nghĩa một hàm async để có thể sử dụng await
    try {
      setLoading(true);
      const response = await serviceManagerApi.getListFeedback();
      console.log(response);
      setServiceList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  const schema = yup.object().shape({
    serviceDescription: yup.string().required('Mô tả dịch vụ không được để trống')
      .max(150, 'Mô tả dịch vụ không được quá 150 ký tự'),
    serviceId: yup.number().required('Mã dịch vụ không được để trống'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IAddServiceRequest>({
    resolver: yupResolver(schema),
  });

  const handleAddService = async (data: IAddServiceRequest) => {
    try {
      setLoading(true);
      const selectedServiceForAdd: IAddServiceRequest = {
        serviceId: data.serviceId,
        serviceDescription: data.serviceDescription
      }
      const response = await serviceManagerApi.addService(selectedServiceForAdd);
      console.log(response);
      setShowAddModal(false);
      reset();
      fetchData();
    } catch (error) {
      console.log(error);
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
            <p className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-md shadow-md">Tổng dịch vụ: {serviceList?.serviceDetailList.length}</p>
          </div>
        </div>

        <div className='grid grid-cols-5 gap-7'>
          {serviceList?.serviceDetailList.map((item, index) => (
            <ServiceItem key={index} serviceDetail={item} serviceList={serviceList} setServiceList={setServiceList} />
          ))}
        </div>
      </div>
      <Modal isVisible={showAddModal} onClose={() => setShowAddModal(false)} >
        <form onSubmit={handleSubmit(handleAddService)}>
          <div className='p-7 w-[550px]'>
            <p className='font-bold text-center text-3xl my-5'>Thêm dịch vụ</p>
            <div className='grid grid-cols-10 w-full gap-2 px-5'>
              <div className='col-span-4 font-bold'>Tên dịch vụ:</div>
              <div className='col-span-6 text-center'>
                <select id="serviceId"
                  {...register('serviceId')}
                  className="w-full h-full p-2 border border-gray-300 rounded-md truncate"
                >
                  {
                    serviceList?.serviceListForAdd.map((service, index) => (
                      <option
                        value={service.serviceId}
                        key={index}
                      >
                        &nbsp;{service.serviceName}
                      </option>
                    ))
                  }
                </select>
                {errors.serviceId && <p className='text-red-500 text-sm'>{errors.serviceId.message}</p> }
              </div>
              <div className='col-span-4 font-bold'>Mô tả:</div>
              <div className='col-span-6 text-center'>
                <textarea rows={5} cols={50}
                  id='serviceDescription'
                  {...register('serviceDescription')}
                  className='w-full h-full py-2 px-4 border border-gray-300 rounded-md' />
                {errors.serviceDescription && <p className='text-red-500 text-sm'>{errors.serviceDescription.message}</p> }
              </div>
              

            </div>
            <button
              type='submit'
              className={`py-2 px-4 bg-blue-500  text-white hover:bg-opacity-50 font-bold float-right mt-20 mb-10 rounded`}>
              <FontAwesomeIcon icon={faCirclePlus} className='mr-2' />
              Thêm dịch vụ
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
