import authApi from '@/api/authApi';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { faTrashCan, faFileArrowUp, faFloppyDisk, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../CustomField/Modal';
import Image from 'next/image';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import SuccessModal from '../CustomField/SuccessModal';
import LoadingPage from '../common/LoadingPage';

export interface IUpdateProfileAdminProps {
    isEditAvatar: boolean;
    setIsEditAvatar: React.Dispatch<React.SetStateAction<boolean>>;
    avatar: string;
}

export default function UpdateProfileAdmin({
    setIsEditAvatar,
    isEditAvatar,
    avatar,
}: IUpdateProfileAdminProps) {
    const [loading, setLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [imageFile, setImageFile] = React.useState<File | undefined>();
    const { handleSubmit } = useForm();
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

    const handleModalOpen = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const handleModalClose = () => {
        setShowModal(false);
        setIsEditAvatar(!isEditAvatar);
        document.body.style.overflow = 'auto';
    };
    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        document.body.style.overflow = 'auto';
    }
    const onSubmit = async () => {
        if (imageFile) {
            try {
                setLoading(true);
                await authApi.updateAdminAvatar(imageFile);
                setShowSuccessModal(true);
                handleModalClose();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };
    return (
        <div className='my-3'>
            {loading && <LoadingPage />}
            <button
                onClick={handleModalOpen}
                className='px-4 py-2 font-semibold rounded-md bg-blue-500 hover:bg-opacity-50'>
                <FontAwesomeIcon icon={faEdit} className='mr-2' />Sửa ảnh đại diện
            </button>
            <Modal isVisible={showModal} onClose={handleModalClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-8 items-center">
                        <div className='col-span-3 p-8 flex-col'>
                            <Image
                                src={selectedImage ? selectedImage : avatar || '/images/avt.png'}
                                width={275}
                                height={275}
                                alt="Image"
                                className="w-[200px] h-[200px] object-contain rounded-full m-auto border-slamon border-2"
                            />

                            <div className='flex justify-between mt-5'>

                                <label className="ml-3 px-4 py-2 font-medium bg-blue-500 rounded-sm shadow hover:bg-opacity-50">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange} />
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
                                className="mt-2 px-4 py-2 font-medium bg-blue-500 rounded-sm shadow hover:bg-opacity-50 self-end">
                                <FontAwesomeIcon icon={faFloppyDisk} /> Lưu ảnh
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
            <SuccessModal isVisible={showSuccessModal} onClose={handleSuccessModalClose} message={'Cập nhật ảnh đại diện thành công!'} />
        </div>
    );
}
