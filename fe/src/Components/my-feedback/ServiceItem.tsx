import * as React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEdit, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IEditServiceRequest, IService, IServiceList } from '@/types/serviceManagerType';
import LoadingPage from '../common/LoadingPage';
import serviceManagerApi from '@/api/serviceManagerApi';
import Modal from '../CustomField/Modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import PopConfirm from '../admin/user/PopConfirm';
export interface IServiceItemProps {
    serviceDetail: IService;
    serviceList: IServiceList | undefined;
    setServiceList: React.Dispatch<React.SetStateAction<IServiceList | undefined>>;
}

export default function ServiceItem({
    serviceDetail,
    serviceList,
    setServiceList
}: IServiceItemProps) {
    const [loading, setLoading] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [isDeletingService, setIsDeletingService] = React.useState(false);

    const schema = yup.object().shape({
        serviceDescription: yup.string().required('Mô tả dịch vụ không được để trống')
            .max(150, 'Mô tả dịch vụ không được quá 150 ký tự'),
        householdServiceId: yup.number().required('Mã dịch vụ không được để trống'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<IEditServiceRequest>({
        resolver: yupResolver(schema),
    });

    const handleEditService = async (data: IEditServiceRequest) => {
        try {
            setLoading(true);
            const selectedServiceForEdit: IEditServiceRequest = {
                householdServiceId: data.householdServiceId,
                serviceDescription: data.serviceDescription
            }
            const response = await serviceManagerApi.editService(selectedServiceForEdit);
            console.log(response);
            const newServiceList: IServiceList = {
                serviceListForAdd: serviceList?.serviceListForAdd || [],
                serviceDetailList: serviceList?.serviceDetailList.map((service) => {
                    if (service.householdServiceId === serviceDetail.householdServiceId) {
                        return {
                            ...service,
                            serviceDescription: data.serviceDescription
                        }
                    }
                    return service;
                }
                ) || []
            }
            setServiceList(newServiceList);
            setShowEditModal(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteService = async () => {
        try {
            setLoading(true);
            const response = await serviceManagerApi.deleteService(serviceDetail.householdServiceId);
            console.log(response);
            const newServiceList: IServiceList = {
                serviceListForAdd: serviceList?.serviceListForAdd || [],
                serviceDetailList: serviceList?.serviceDetailList.filter((service) => service.householdServiceId !== serviceDetail.householdServiceId) || []
            }
            setServiceList(newServiceList);
            setShowEditModal(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='p-3 rounded-xl text-center shadow-md shadow-gray-300 flex flex-col justify-between'>
            <div>
                <Image
                    src={serviceDetail.serviceAvatar || '/images/LuaTrai.jpg'}
                    alt='Ảnh homestay'
                    width={1000}
                    height={1000}
                    className='w-full aspect-square rounded-xl mb-2'
                />

                <p className='px-2 text-sm mb-3 whitespace-normal font-bold line-clamp-2 truncate'>{serviceDetail.serviceName}</p>
                <p className='px-2 text-opacity-50 text-xs mb-3  whitespace-normal line-clamp-2 truncate'>{serviceDetail.serviceDescription}</p>
            </div>
            <div className='flex justify-around bottom-1'>
                <button onClick={() => setShowEditModal(true)} className='py-2 px-4 border-2 border-gray-300 hover:border-black rounded-md' >
                    <FontAwesomeIcon icon={faPen} /> Sửa
                </button>
                <button onClick={() => setIsDeletingService(true)} className='py-2 px-4 bg-red-400 text-white hover:bg-opacity-75 rounded-md' >
                    <FontAwesomeIcon icon={faTrash} /> Xóa
                </button>
            </div>
            {isDeletingService &&
                <PopConfirm title={'Xóa dịch vụ'} message={'Bạn có chắc chắn xóa dịch vụ này khỏi homestay không?'}
                    onConfirm={handleDeleteService}
                    onCancel={() => { setIsDeletingService(false) }} />
            }
            {loading && <LoadingPage />}

            <Modal isVisible={showEditModal} onClose={() => setShowEditModal(false)} >
                <form onSubmit={handleSubmit(handleEditService)}>
                    <div className='p-7 w-[550px]'>
                        <input type="hidden" {...register('householdServiceId')} value={serviceDetail.householdServiceId} />
                        <p className='font-bold text-center text-3xl my-5'>Chi tiết dịch vụ</p>
                        <div className='grid grid-cols-10 w-full gap-2 px-5'>
                            <div className='col-span-4 font-bold'>Tên dịch vụ:</div>
                            <div className='col-span-6 text-center'>
                                <p className="w-full h-full p-2">
                                    {serviceDetail.serviceName}
                                </p>
                            </div>
                            <div className='col-span-4 font-bold'>Mô tả:</div>
                            <div className='col-span-6 text-center'>
                                <textarea rows={5} cols={50}
                                    defaultValue={serviceDetail.serviceDescription}
                                    {...register('serviceDescription')}
                                    className='w-full h-full py-2 px-4 border border-gray-300 rounded-md' />
                            </div>

                        </div>
                        <button
                            type='submit'
                            className={`py-2 px-4 bg-green-500 hover:bg-green-500/50 font-bold float-right mt-20 mb-10 rounded`}>
                            <FontAwesomeIcon icon={faEdit} className='mr-2' />
                            Chỉnh sửa
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
