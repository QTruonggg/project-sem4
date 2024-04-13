'use client'
import * as React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp, faFloppyDisk, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import Modal from '../CustomField/Modal';
import { useForm } from 'react-hook-form';
import authApi from '@/api/authApi';
import SuccessModal from '../CustomField/SuccessModal';
import LoadingPage from '../common/LoadingPage';

export interface IImageAndInformationProps { }

export default function ImageAndInformation(props: IImageAndInformationProps) {
  const { data, setAuthState } = React.useContext(AuthenticationContext);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showDeleteAvtModal, setShowDeleteAvtModal] = React.useState(false);
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
    document.body.style.overflow = 'auto';
  };
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    document.body.style.overflow = 'auto';
  }
  const handleDeleteAvtModalClose = () => {
    setShowDeleteAvtModal(false);
    document.body.style.overflow = 'auto';
  }
  const onSubmit = async () => {
    if (imageFile) {

      try {
        setLoading(true);
        const response = await authApi.updateAvatar(imageFile);
        setAuthState({
          loading: false,
          data: {
            id: data?.id as number,
            avatar: response.imageUpdate as string,
            email: data?.email as string,
            firstName: data?.firstName as string,
            lastName: data?.lastName as string,
            phoneNumber: data?.phoneNumber as string,
            gender: data?.gender as string,
            dateOfBirth: data?.dateOfBirth as string,
            address: data?.address as string,
            accountId: data?.accountId as number,
            role: data?.role as string,
          },
          error: null,
        });
        setShowSuccessModal(true);
        handleModalClose();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleDeleteImage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedImage("");
    try {
      setLoading(true);
      const response = await authApi.deleteAvatar();
      setAuthState({
        loading: false,
        data: {
          id: data?.id as number,
          avatar: selectedImage as string,
          email: data?.email as string,
          firstName: data?.firstName as string,
          lastName: data?.lastName as string,
          phoneNumber: data?.phoneNumber as string,
          gender: data?.gender as string,
          dateOfBirth: data?.dateOfBirth as string,
          address: data?.address as string,
          accountId: data?.accountId as number,
          role: data?.role as string,
        },
        error: null,
      });
      setShowDeleteAvtModal(true);
      handleModalClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full grid justify-center text-blackish-green text-center">
      {loading && <LoadingPage />}
      <div className="relative">
        <div className="relative w-full h-full rounded-full">
          <Image
            src={data?.avatar || '/images/avt.png'}
            alt="User Image"
            width={200}
            height={200}
            className="w-[200px] h-[200px] object-contain rounded-full m-auto border-slamon border-[5px] cursor-pointer"
            onClick={handleModalOpen}
          />
          <div
            className="absolute bg-slamon flex justify-center items-center rounded-full h-10 w-10 right-0 bottom-0 m-4 cursor-pointer"
            onClick={handleModalOpen}
          >
            <FontAwesomeIcon icon={faPencil} size="lg" />
          </div>
        </div>
      </div>
      <h1 className="font-semibold text-2xl pt-6 leading-7">
        {data?.firstName + ' ' + data?.lastName}
      </h1>
      <p className="font-light mt-3">{data?.email}</p>
      <Modal isVisible={showModal} onClose={handleModalClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-8 items-center">
            <div className='col-span-3 p-8 flex-col'>
              <Image
                src={selectedImage ? selectedImage : data?.avatar || '/images/avt.png'}
                width={275}
                height={275}
                alt="Image"
                className="w-[200px] h-[200px] object-contain rounded-full m-auto border-slamon border-2"
              />

              <div className='flex justify-between mt-5'>
                <button
                  onClick={handleDeleteImage}
                  className="px-4 py-2 font-medium rounded-sm border-2 border-blackish-green hover:bg-gray-300">
                  <FontAwesomeIcon icon={faTrashCan} /> Xóa ảnh
                </button>

                <label className="ml-3 px-4 py-2 font-medium bg-mint-green rounded-sm shadow hover:bg-opacity-50">
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
                className="mt-2 px-4 py-2 font-medium bg-mint-green rounded-sm shadow hover:bg-opacity-50 self-end">
                <FontAwesomeIcon icon={faFloppyDisk} /> Lưu ảnh
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <SuccessModal isVisible={showSuccessModal} onClose={handleSuccessModalClose} message={'Cập nhật ảnh đại diện thành công!'} />
      <SuccessModal isVisible={showDeleteAvtModal} onClose={handleDeleteAvtModalClose} message={'Xóa ảnh đại diện thành công!'} />
    </div>
  );
}
