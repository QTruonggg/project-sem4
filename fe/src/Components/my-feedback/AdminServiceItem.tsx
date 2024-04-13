import { AdminService, AdminUpdateServiceRequest } from '@/types/serviceType';
import * as React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFileArrowUp, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../CustomField/Modal';
import LoadingPage from '../common/LoadingPage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import serviceApi from '@/api/serviceApi';
import PopConfirm from '../admin/user/PopConfirm';
import SuccessModal from '../CustomField/SuccessModal';


export interface IAdminServiceItemProps {
    serviceDetail: AdminService;
    fetchData: () => void;
}

export default function AdminServiceItem({
    serviceDetail,
    fetchData
}: IAdminServiceItemProps) {
    const [loading, setLoading] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [img, setImg] = React.useState<File>();
    const [isDeletingService, setIsDeletingService] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

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
    const schema = yup.object().shape({
        serviceName: yup.string().required('Tên dịch vụ không được để trống')
            .max(50, 'Tên dịch vụ không được quá 50 ký tự'),
        serviceDescription: yup.string().required('Mô tả dịch vụ không được để trống')
            .max(150, 'Mô tả dịch vụ không được quá 150 ký tự'),
        serviceId: yup.number().required('Mã dịch vụ không được để trống'),
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<AdminUpdateServiceRequest>({
        //@ts-ignore
        resolver: yupResolver(schema),
    });

    const handleEditService = async (data: AdminUpdateServiceRequest) => {
        try {
            setLoading(true);
            await serviceApi.updateAdminService(data);
            setShowEditModal(false);
            fetchData();
            setUpdateSuccess(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteService = async () => {
        try {
            setLoading(true);
            const response = await serviceApi.deleteAdminService(Number(serviceDetail.serviceId));
            console.log(response);
            setShowEditModal(false);
            setDeleteSuccess(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    React.useEffect(() => {
        reset(serviceDetail)
    }, [serviceDetail]);

    React.useEffect(() => {
        if (img) {
            setValue("imageFile", img as File);
            register("imageFile");
        }
    }, [img]);


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

            <SuccessModal isVisible={updateSuccess} onClose={() => setUpdateSuccess(false)} message='Cập nhật dịch vụ thành công' />
            <SuccessModal isVisible={deleteSuccess} onClose={() => {fetchData(); setDeleteSuccess(false)}} message='Xóa dịch vụ thành công' />
            <Modal isVisible={showEditModal} onClose={() => setShowEditModal(false)} >
                <form onSubmit={handleSubmit(handleEditService)}>
                    <div className='p-7 w-[550px]'>
                        <p className='font-bold text-center text-3xl my-5'>Chi tiết dịch vụ</p>
                        <input type="hidden" {...register('serviceId')} value={serviceDetail.serviceId} />
                        <div className='grid grid-cols-10 w-full gap-2 px-5'>
                            <div className='col-span-4 font-bold'>Tên dịch vụ:</div>
                            <div className='col-span-6 text-center'>
                                <input type="text" {...register('serviceName')}
                                    defaultValue={serviceDetail.serviceName}
                                    className='w-full h-full py-2 px-4 border border-gray-300 rounded-md' />
                                {errors.serviceName && <p className='text-red-500'>{errors.serviceName.message}</p>}
                            </div>
                            <div className='col-span-4 font-bold mt-5'>Mô tả:</div>
                            <div className='col-span-6 text-center mt-5'>
                                <textarea {...register('serviceDescription')}
                                    defaultValue={serviceDetail.serviceDescription}
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
                                        onChange={handleImageChange} />
                                    <FontAwesomeIcon icon={faFileArrowUp} /> Tải ảnh lên
                                </label>
                            </div>
                            <div className='col-span-6 text-center mt-5'>
                                <Image
                                    src={selectedImage ? selectedImage : serviceDetail.serviceAvatar || '/images/placeholder.png'}
                                    width={275}
                                    height={275}
                                    alt="Image"
                                    className="max-w-full rounded-md object-contain m-auto border-gray-400 border-2"
                                />
                            </div>

                        </div>
                        <button
                            type='submit'
                            className={`py-2 px-4 bg-blue-500 text-white hover:bg-opacity-50 font-bold float-right mt-20 mb-10 rounded`}>
                            <FontAwesomeIcon icon={faCirclePlus} className='mr-2' />
                            Cập nhật dịch vụ
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}