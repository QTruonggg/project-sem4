import { LocalProductType } from '@/types/localProductType';
import { faChevronLeft, faChevronRight, faDotCircle, faCircle, faUser, faBabyCarriage, faWallet, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import * as React from 'react';

export interface ILocalProductItemProps {
    product: LocalProductType;
}

export default function LocalProductItem({
    product
}: ILocalProductItemProps) {
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
        const index = isFirstSlide ? product.villageMedias?.length - 1 : currentImage - 1;
        setCurrentImage(index);
    }
    const nextSlide = () => {
        const isLastSlide = currentImage === product.villageMedias?.length - 1;
        const index = isLastSlide ? 0 : currentImage + 1;
        setCurrentImage(index);
    }
    const jumpToSlide = (index: number) => {
        setCurrentImage(index);
    }
    const convertPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const convertDisplayType = (type: string) => {
        switch (type) {
            case "FOOD":
                return "Thực phẩm";
            case "DRINK":
                return "Đồ uống";
            case "SOUVENIR":
                return "Đồ lưu niệm";
            case "MEDICINE":
                return "Dược phẩm";
            case "OTHER":
                return "Khác";
            default:
                return "";
        }
    }
    return (
        <div className='text-center p-4 shadow-lg shadow-gray-300 rounded-xl'>
            <Image src={product.villageMedias? product.villageMedias[0].filePath : '/images/LuaTrai.jpg'}
                height={1000}
                width={1000}
                alt='blog image'
                className='w-full aspect-square rounded-lg mb-3' />
            <p className='font-semibold whitespace-normal line-clamp-1 truncate'>{product.productName}</p>
            <p className='text-gray-600 text-xs mb-3'>{convertDisplayType(product.type)}</p>
            <p className='text-gray-600 italic text-xs mb-3'> Chỉ từ <span className='not-italic font-bold text-[#056520]'>{convertPrice(product.lowestPrice)} VNĐ</span>/{product.unit}</p>
            <button
            onClick={() => setIsModalVisible(true)}
            className='bg-mint-green rounded-lg w-full py-2'>
                Chi tiết
            </button>
            {isModalVisible && (<div
                className='fixed bg-black/25 inset-0 flex backdrop-blur-sm justify-center items-center backdrop-filter z-50 overflow-hidden'
                onClick={handleClose}
                id='wrapper'>
                <p className='absolute top-5 right-5 text-white text-4xl cursor-pointer' onClick={onClose}>x</p>
                <div className='w-5/6 grid grid-cols-2 bg-white rounded-2xl' onClick={handleClose}
                    id='close'>

                    <div className='max-w-[1400px] h-[580px] w-full m-auto p-10 relative group'>
                        <div
                            style={{ backgroundImage: `url(${product.villageMedias[currentImage].filePath})` }}
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
                            {product.villageMedias?.map((image, index) => (
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
                        <p className='text-3xl font-bold pb-3'>{product.productName}</p>
                        <div className="flex-1 h-[1px] bg-gray-300"></div>

                        <div className='grid grid-cols-3 items-baseline pt-3 pb-2 font-semibold'>
                            <div className=''>
                                Loại sản phẩm:
                            </div>
                            <div className='px-2 py-1 w-fit rounded-lg text-white bg-mint-green'>
                                {convertDisplayType(product.type)}
                            </div>
                        </div>
                        <div className='grid grid-cols-3 py-2 items-baseline'>
                            <div className=' font-semibold'>
                                Giới thiệu:
                            </div>
                            <div className='col-span-2 text-justify'>
                                {product.productDescription}
                            </div>
                        </div>
                        <div className='grid grid-cols-3 font-semibold py-2 items-baseline'>
                            <div>
                                Giá:
                            </div>
                            <div className='text-[#FF4848] col-span-2'>
                                {product.highestPrice ? convertPrice(product.lowestPrice) + ' - ' + convertPrice(product.highestPrice):convertPrice(product.lowestPrice)} VNĐ / {product.unit}
                            </div>
                        </div>


                        <p className="font-semibold mb-1">Cách thức mua hàng:</p>
                        <p className="text-sm">
                            <FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-mint-green' />mua sản phẩm trực tiếp tại <span className='font-semibold'>V-HomeStay</span></p>
                        <p className="text-sm">
                            <FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-mint-green' />liên hệ hotline <span className='font-semibold'>0987.654.321</span> để đặt hàng online</p>
                        <p className="text-sm">
                            <FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-mint-green' />nhắn tin qua fanpage <span className='font-semibold'>V-HomeStay</span> để đặt hàng online</p>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
