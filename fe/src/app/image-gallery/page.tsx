'use client'
import LoadingPage from '@/Components/common/LoadingPage';
import imageGalleryApi from '@/api/imageGalleryApi';
import { faChevronLeft, faChevronRight, faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import * as React from 'react';

export interface IImageGalleryProps {
}

export default function ImageGallery(props: IImageGalleryProps) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [images, setImages] = React.useState<string[]>([]);
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
        const index = isFirstSlide ? images.length - 1 : currentImage - 1;
        setCurrentImage(index);
    }
    const nextSlide = () => {
        const isLastSlide = currentImage === images.length - 1;
        const index = isLastSlide ? 0 : currentImage + 1;
        setCurrentImage(index);
    }
    const jumpToSlide = (index: number) => {
        setCurrentImage(index);
    }
    React.useEffect(() => {
        setLoading(true);
        const response = imageGalleryApi.getCustomerImages();
        console.log(response)
        response.then((res) => {
            setImages(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <>
            {loading && <LoadingPage />}
            <div className='w-2/3 mx-auto'>
                <div className=' flex items-center justify-center my-10'>
                    <div className="flex-1 h-[1px] bg-gray-500"></div>
                    <div className="text-3xl text-center font-bold px-16">
                        <p>Vẻ đẹp của</p>
                        <p>miền đá nở hoa</p>
                    </div>
                    <div className="flex-1 h-[1px] bg-gray-500"></div>
                </div>

                <p className='text-gray-600 text-center'>Khám phá vẻ đẹp của V-HomeStay qua những bức hình!</p>

            </div>

            <div className='w-3/4 mx-auto mt-10 grid grid-cols-4 gap-3'>
                {!images ? (
                    <p className='font-bold text-2xl col-span-full text-center'>Không có ảnh để hiển thị</p>
                ) : (
                        <>
                            {images.map((image, index) => (
                                <div className='relative shadow-lg border border-gray-100 rounded-md overflow-hidden' key={index}>
                                    <Image
                                        onClick={() => {
                                            setIsModalVisible(true);
                                            jumpToSlide(index)
                                        }}
                                        width={1000}
                                        height={1000}
                                        src={image || '/images/LuaTrai.jpg'}
                                        alt={''}
                                        className='w-full aspect-[0.95] hover:scale-110 transition duration-300 ease-in-out' />
                                </div>
                            ))}
                        </>
                )}
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
                                style={{ backgroundImage: `url(${images[currentImage]})` }}
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
                                {images.map((image, index) => (
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
        </>
    );
}
