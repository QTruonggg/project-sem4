'use client'
import ApproveRequestModal from '@/Components/admin/request-processing/ApproveRequestModal';
import DenideRequestModal from '@/Components/admin/request-processing/DenideRequestModal';
import LoadingPage from '@/Components/common/LoadingPage';
import requestProcessingApi from '@/api/requestProcessingApi';
import { IRequestProcessingDetail } from '@/types/requestProcessingType';
import { faBabyCarriage, faChevronLeft, faChevronRight, faCircle, faCircleCheck, faCircleXmark, faDotCircle, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface IRequestDetailProps {
    params: { slug: string };
}

export default function RequestDetail({
    params: { slug },
}: IRequestDetailProps) {
    const router = useRouter();

    const [request, setRequest] = React.useState<IRequestProcessingDetail>();
    const [loading, setLoading] = React.useState(false);
    const [change, setChange] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const [isRejecting, setIsRejecting] = React.useState(false);
    const [isApproving, setIsApproving] = React.useState(false);
    const [currentImage, setCurrentImage] = React.useState(0);


    const handleMouseEnter = (message: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setShowTooltip(true);
        setTooltipMessage(message);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const convertDate = (date: string) => {
        const parts = date.split('T');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${timeParts[0]}:${timeParts[1]}`;
    }


    React.useEffect(() => {
            setLoading(true);
            requestProcessingApi.getRequestById(slug)
                .then((res) => {
                    setRequest(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                })

    }, [change, slug]);

    const convertStatus = (status: string) => {
        if (status === "REJECTED") {
            return <p className='px-4 py-2 rounded-xl bg-[#B00505]'>Từ chối</p>
        } else if (status === "PENDING") {
            return <p className='px-4 py-2 rounded-xl bg-yellow-500'>Chờ xử lý</p>
        } else if (status === "APPROVED") {
            return <p className='px-4 py-2 rounded-xl bg-[#059669]'>Chấp nhận</p>
        }
    }
    const prevSlide = () => {
        const isFirstSlide = currentImage === 0;
        const index = isFirstSlide ? (request?.roomTypeHouseholdUpdatePrice.imageListUri.length || 1) - 1 : currentImage - 1;
        setCurrentImage(index);
    }
    const nextSlide = () => {
        const isLastSlide = currentImage === (request?.roomTypeHouseholdUpdatePrice.imageListUri.length || 1) - 1;
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
        <div className='w-11/12 mx-auto'>
            {loading && <LoadingPage />}
            <div className='flex my-5'>
                <p onClick={() => {
                    setLoading(true);
                    router.push("admin/request-processing");
                }}
                    className='cursor-pointer'>Xử lý yêu cầu</p>
                <p className='mx-2'>/</p>
                <p>Chi tiết yêu cầu</p>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                <div className='col-span-1 rounded-lg border-gray-100 border shadow-lg'>
                    <div className='flex flex-col'>
                        <div className='m-auto pt-10 pb-5'>
                            <Image width={1000} height={1000} src={request?.requestDetail.avatarHousehold || '/images/avt.png'} alt="" className='w-40 h-40 m-auto rounded-md' />
                            <p className='text-xl font-bold mt-5'>{request?.requestDetail.householdName}</p>
                        </div>


                        <div className='p-6'>
                            <p className='text-xl font-semibold'>Thông tin quản lý</p>
                            <div className='border-b-2 my-5 border-gray-300 w-full'></div>

                            <div className='flex flex-col'>
                                <div className='flex mb-1 text-sm items-center'>
                                    <p className='font-semibold'>Họ và tên: </p>
                                    <p className='ml-2 text-gray-500'>{request?.requestDetail.managerFirstName + ' ' + request?.requestDetail.managerLastName}</p>
                                </div>
                                <div className='flex mb-1 text-sm items-center'>
                                    <p className='font-semibold'>Số điện thoại: </p>
                                    <p className='ml-2 text-gray-500'>{request?.requestDetail.managerPhone}</p>
                                </div>
                                <div className='flex mb-1 text-sm items-center'>
                                    <p className='font-semibold'>Email: </p>
                                    <p className='ml-2 text-gray-500'>{request?.requestDetail.managerEmail}</p>
                                </div>
                            </div>
                        </div>
                        <div className='px-6'>
                            <p className='text-xl font-semibold'>Thông tin yêu cầu</p>
                            <div className='border-b-2 my-5 border-gray-300 w-full'></div>

                            <div className='flex flex-col'>
                                <div className='flex mb-1 text-sm items-center'>
                                    <p className='font-semibold'>Thời gian tạo yêu cầu: </p>
                                    <p className='ml-2 text-gray-500'>{request?.requestDetail.createdDate ? convertDate(request?.requestDetail.createdDate) : ""}</p>
                                </div>
                                <div className='flex mb-1 text-sm items-center'>
                                    <p className='font-semibold'>Tiêu đề: </p>
                                    <p className='ml-2 text-gray-500'>{request?.requestDetail.requestTitle}</p>
                                </div>
                                <div className='flex mb-1 text-sm'>
                                    <p className='text-gray-500'> <span className='font-semibold text-black'>Nội dung:
                                    </span> {request?.requestDetail.requestContent}</p>
                                </div>
                                <div className='flex mb-1 text-sm items-center'>
                                    <p className='font-semibold'>Admin xử lý yêu cầu: </p>
                                    <p className='ml-2 text-gray-500'>
                                        {(request?.requestDetail.adminFirstName && request?.requestDetail.adminLastName) ?
                                            request?.requestDetail.adminFirstName + ' ' + request?.requestDetail.adminLastName : "Chưa xử lý"}
                                    </p>
                                </div>
                                <div className='flex mb-1 text-sm items-center'>
                                    <p className='font-semibold'>Thời gian xử lý yêu cầu: </p>
                                    <p className='ml-2 text-gray-500'>{request?.requestDetail.solvedDate ? convertDate(request?.requestDetail.solvedDate) : "Chưa xử lý"}</p>
                                </div>
                                <div className='flex mb-1 text-sm items-center'>
                                    <p className='font-semibold'>Phản hồi: </p>
                                    <p className='ml-2 text-gray-500'>{request?.requestDetail.requestResponse}</p>
                                </div>
                            </div>
                        </div>

                        <div className='text-white text-center w-fit mx-auto'>
                            {convertStatus(request?.requestDetail.status || "")}
                        </div>

                        <div className='flex justify-evenly mt-5 mb-16'>
                            {request?.requestDetail.status === 'PENDING' && (
                                <>
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            setIsApproving(true);
                                        }}
                                        onMouseEnter={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => handleMouseEnter('Chấp nhận', event)}
                                        onMouseLeave={handleMouseLeave}
                                        className='text-5xl m-1 hover:text-opacity-50 text-green-500' icon={faCircleCheck} />
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            setIsRejecting(true);
                                        }}
                                        onMouseEnter={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => handleMouseEnter('Từ chối', event)}
                                        onMouseLeave={handleMouseLeave}
                                        className='text-5xl m-1 hover:text-opacity-50 text-red-500' icon={faCircleXmark} />
                                </>
                            )}
                        </div>
                    </div>
                </div>


                <div className='col-span-2 rounded-lg border-gray-100 border shadow-lg'>
                    <div className='px-4'>
                        <p className='text-2xl ml-2 mt-5 font-semibold'>Cập nhật loại phòng</p>
                        <div className='grid grid-cols-2 bg-white rounded-2xl' >

                            <div className='max-w-[700px] h-[300px] w-full m-auto p-2 relative group'>
                                <div
                                    style={{ backgroundImage: `url(${request?.roomTypeHouseholdUpdatePrice.imageListUri[currentImage]})` }}
                                    className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
                                <div
                                    onClick={prevSlide}
                                    className='hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] left-2 text-2xl rounded-full py-2 px-4 bg-black/20 text-white cursor-pointer'>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </div>
                                <div
                                    onClick={nextSlide}
                                    className='hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] right-2 text-2xl rounded-full py-2 px-4 bg-black/20 text-white cursor-pointer'>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                                <div className='flex top-4 w-1/2 m-auto justify-evenly py-2'>
                                    {request?.roomTypeHouseholdUpdatePrice.imageListUri?.map((image, index) => (
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

                            <div className='p-2 text-left'>
                                <p className='text-xl font-bold pb-3'>{request?.roomTypeHouseholdUpdatePrice.roomTypeName}</p>
                                <div className="flex-1 h-[1px] bg-gray-300"></div>

                                <div className='grid grid-cols-3 text-sm pt-3 pb-2 font-bold'>
                                    <div>
                                        Sức chứa:
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faUser} /> x {request?.roomTypeHouseholdUpdatePrice.capacity}
                                    </div>
                                </div>
                                <div className='grid grid-cols-3 text-sm py-2 font-bold'>
                                    <div>
                                        Giường:
                                    </div>
                                    <div>
                                        {request?.roomTypeHouseholdUpdatePrice.singleBed === 0 ? `${request?.roomTypeHouseholdUpdatePrice.doubleBed} giường đôi` : `${request?.roomTypeHouseholdUpdatePrice.singleBed} giường đơn`}
                                    </div>
                                </div>
                                <div className="py-3 text-sm">
                                    <p className="font-bold pb-2">Cơ sở vật chất:</p>
                                    <div className='grid grid-cols-2 gap-2'>
                                        {request?.roomTypeHouseholdUpdatePrice.facilities?.map((item, index) => (
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

                                <p className="font-bold text-sm">Giường phụ cho trẻ em và nôi cũi: <span className='font-normal'>
                                    <FontAwesomeIcon className='ml-4 text-xl' icon={faBabyCarriage} /> {request?.roomTypeHouseholdUpdatePrice.isChildrenBed ? "Có hỗ trợ" : "Không hỗ trợ"}
                                </span></p>
                            </div>
                        </div>

                    </div>
                    <div className='px-6 grid grid-cols-2 mt-10'>
                        <div>
                            <p className='ml-2 mt-5 font-semibold'>
                                <FontAwesomeIcon icon={faCircle} className='mr-2 text-xs shadow-lg text-orange-500 rounded-full shadow-red-700' />
                                Giá phòng trước cập nhật:
                                <span className='ml-2 text-[#380087]'>{convertPrice(request?.roomTypeHouseholdUpdatePrice.price || 0)} VNĐ</span>
                            </p>
                        </div>
                        <div>
                            <p className='ml-2 mt-5 font-semibold'>
                                <FontAwesomeIcon icon={faCircle} className='mr-2 text-xs shadow-lg text-orange-500 rounded-full shadow-red-700' />
                                Giá phòng cập nhật:
                                <span className='ml-2 text-[#780007]'>{convertPrice(request?.roomTypeHouseholdUpdatePrice.priceUpdate || 0)} VNĐ</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {
                showTooltip && (
                    <div
                        className='absolute bg-white text-gray-800 px-2 py-1 rounded shadow-md opacity-100 transition-opacity'
                        style={{ top: tooltipPosition.y - 30, left: tooltipPosition.x + 10 }}
                    >
                        {tooltipMessage}
                    </div>
                )
            }
            {
                isRejecting && (
                    <DenideRequestModal
                        requestId={Number(slug)}
                        change={change}
                        setChange={setChange}
                        onCancel={() => setIsRejecting(false)}
                    />
                )
            }
            {
                isApproving && (
                    <ApproveRequestModal
                        requestId={Number(slug)}
                        change={change}
                        setChange={setChange}
                        onCancel={() => setIsApproving(false)}
                    />
                )
            }
        </div >
    );
}
