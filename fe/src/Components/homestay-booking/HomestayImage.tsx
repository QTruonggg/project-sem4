import * as React from 'react';
import Image from 'next/image';
import { faChevronLeft, faChevronRight, faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IHomestayImageProps {
    imageList: string[];
}

export default function HomestayImage({
    imageList
}: IHomestayImageProps) {
    const [isModalVisible, setIsModalVisible] = React.useState(false);


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
        const index = isFirstSlide ? imageList.length - 1 : currentImage - 1;
        setCurrentImage(index);
    }
    const nextSlide = () => {
        const isLastSlide = currentImage === imageList.length - 1;
        const index = isLastSlide ? 0 : currentImage + 1;
        setCurrentImage(index);
    }
    const jumpToSlide = (index: number) => {
        setCurrentImage(index);
    }

    const [currentImage, setCurrentImage] = React.useState(0);

    return (
        <div className='rounded-lg overflow-hidden grid-cols-10 grid gap-2 relative'>
            <div className='col-span-4'>
                <Image src={imageList[0]} alt='' width={500} height={500} className='w-full object-cover aspect-square' />
            </div>
            <div className='col-span-6 grid grid-cols-3 gap-2'>
                {imageList.slice(1, 7).map((image, index) => (
                    <div key={index}>
                        <Image src={image} alt='' width={500} height={500} className='w-full object-cover aspect-square' />
                    </div>
                ))}
                <button
                    onClick={() => {
                        setIsModalVisible(true)
                        document.body.style.overflow = 'hidden';
                    }}
                    className='absolute place-self-end m-5 bg-mint-green rounded-sm font-semibold p-3'
                >
                    Xem tất cả ảnh
                </button>
            </div>

            {isModalVisible && (
                <div
                    className='fixed bg-black/25 inset-0 flex backdrop-blur-sm justify-center items-center backdrop-filter z-50 overflow-hidden'
                    onClick={handleClose}
                    id='wrapper'>
                    <p className='absolute top-5 right-5 text-white text-4xl cursor-pointer' onClick={onClose}>x</p>
                    <div className='w-3/4 m-auto' onClick={handleClose}
                        id='close'>

                        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
                            <div
                                style={{ backgroundImage: `url(${imageList[currentImage]})` }}
                                className='w-full h-full rounded-2xl bg-center bg-contain bg-no-repeat duration-500'></div>
                            <div
                                onClick={prevSlide}
                                className='hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full py-2 px-4 bg-black/20 text-white cursor-pointer'>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                            <div
                                onClick={nextSlide}
                                className='hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full py-2 px-4 bg-black/20 text-white cursor-pointer'>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className='flex top-4 w-1/2 m-auto justify-evenly py-2'>
                                {imageList.map((image, index) => (
                                    <div key={index} onClick={() => jumpToSlide(index)} className='text-sm text-white cursor-pointer'>
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
                    </div>
                </div>
            )}
        </div>
    );
}
