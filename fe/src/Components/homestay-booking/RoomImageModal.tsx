import { IRoomTypeAvailable } from '@/types/homestayBookingType';
import { faChevronLeft, faChevronRight, faDotCircle, faCircle, faAngleRight, faUser, faCircleCheck, faBabyCarriage, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface IRoomImageModalProps {
  room: IRoomTypeAvailable;
}

export default function RoomImageModal({
  room
}: IRoomImageModalProps) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onClose = () => {
    setIsModalVisible(false);
    document.body.style.overflow = 'auto';
  };

  const prevSlide = () => {
    const isFirstSlide = currentImage === 0;
    const index = isFirstSlide ? room.imageListUri?.length - 1 : currentImage - 1;
    setCurrentImage(index);
  }
  const nextSlide = () => {
    const isLastSlide = currentImage === room.imageListUri?.length - 1;
    const index = isLastSlide ? 0 : currentImage + 1;
    setCurrentImage(index);
  }
  const jumpToSlide = (index: number) => {
    setCurrentImage(index);
  }

  const convertPrice = (price: number | string) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      <div className='text-center'>
        <button onClick={() => setIsModalVisible(true)} className='bg-mint-green rounded-sm font-semibold p-2'>
          Xem chi tiết <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      {isModalVisible && (<div
        className='fixed bg-black/25 inset-0 flex backdrop-blur-sm justify-center items-center backdrop-filter z-50 overflow-hidden'
        onClick={handleClose}
        id='wrapper'>
        <p className='absolute top-5 right-5 text-white text-4xl cursor-pointer' onClick={onClose}>x</p>
        <div className='w-4/5 grid grid-cols-2 bg-white rounded-2xl' onClick={handleClose}
          id='close'>

          <div className='max-w-[1400px] h-[580px] w-full m-auto p-10 relative group'>
            <div
              style={{ backgroundImage: `url(${room.imageListUri[currentImage]})` }}
              className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
            <div
              onClick={prevSlide}
              className='hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[50%] left-10 text-2xl rounded-full py-2 px-4 bg-black/20 text-white cursor-pointer'>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div
              onClick={nextSlide}
              className='hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[50%] right-10 text-2xl rounded-full py-2 px-4 bg-black/20 text-white cursor-pointer'>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className='flex top-4 w-1/2 m-auto justify-evenly py-2'>
              {room.imageListUri?.map((image, index) => (
                <div key={index} onClick={() => jumpToSlide(index)} className='text-sm text-slate-700 cursor-pointer'>
                  {(index === currentImage) && (
                    <FontAwesomeIcon icon={faDotCircle} />
                  )}
                  {!(index === currentImage) && (
                    <FontAwesomeIcon icon={faCircle} />
                  )}
                </div>
              ))}
            </div>

          </div>

          <div className='p-10 text-left'>
            <p className='text-3xl font-bold pb-3'>{room.roomTypeName}</p>
            <div className="flex-1 h-[1px] bg-gray-300"></div>

            <div className='grid grid-cols-4 pt-3 pb-2 font-bold'>
              <div>
                Sức chứa:
              </div>
              <div>
                <FontAwesomeIcon icon={faUser} /> x {room.capacity}
              </div>
            </div>
            <div className='grid grid-cols-4 py-2 font-bold'>
              <div>
                Giường:
              </div>
              <div>
                {room.singleBed === 0 ? `${room.doubleBed} giường đôi` : `${room.singleBed} giường đơn`}
              </div>
            </div>
            <div className="py-3">
              <p className="font-bold pb-2">Cơ sở vật chất:</p>
              <div className='grid grid-cols-2 gap-2'>
                {room.facilities?.map((item, index) => (
                  <div key={index} className='flex items-center'>
                    <div className='mr-2 text-green-500'>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                    <div>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-bold">Giường phụ cho trẻ em và nôi cũi: <span className='font-normal'>
              <FontAwesomeIcon className='ml-4 text-xl' icon={faBabyCarriage} /> {room.isChildrenBed ? "Có hỗ trợ" : "Không hỗ trợ"}
            </span></p>

            <p className='mt-28 font-bold text-4xl text-red-400 text-right'>
              <FontAwesomeIcon className='mr-5' icon={faWallet} />
              {convertPrice(room.price)} VNĐ/ Đêm
              </p>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
