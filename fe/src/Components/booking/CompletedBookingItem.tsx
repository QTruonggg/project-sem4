import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBuilding, faClock, faCommentDots, faFlag, faFloppyDisk, faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { IBookingItem } from '@/types/bookingType';
import myFeedbackApi from '@/api/myFeedbackApi';
import { Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '../CustomField/Modal';
import { IUpdateFeedbackItem } from '@/types/myFeedbackType';
import SuccessModal from '../CustomField/SuccessModal';
import LoadingPage from '../common/LoadingPage';

export interface ICompletedBookingItemProps {
    item: IBookingItem;
}

export default function CompletedBookingItem({
    item,
}: ICompletedBookingItemProps) {
    const [loading, setLoading] = React.useState(false);
    const [showModalEdit, setShowModalEdit] = React.useState(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [isButtonShow, setIsButtonShow] = React.useState(!item.isFeedbacked);
    const [rating, setRating] = React.useState(5);
    const [content, setContent] = React.useState('');
    const onCloseModalEdit = () => {
        setShowModalEdit(false);
        document.body.style.overflow = 'auto';
    }
    const onCloseSuccessModal = () => {
        setShowModalEdit(false);
        setShowSuccessModal(false);
        setIsButtonShow(false);
        document.body.style.overflow = 'auto';
    }
    
    const { register, handleSubmit, setValue } = useForm<IUpdateFeedbackItem>({
    });
    const onSubmit: SubmitHandler<IUpdateFeedbackItem> = async (value) => {
        try {
            setLoading(true);
            const response = await myFeedbackApi.addFeedback(value);
            if (response.httpStatus === 'OK') {
                setShowSuccessModal(true);
                document.body.style.overflow = 'hidden';
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        setValue('rating', rating);
        setValue('content', content);
        //EsLint-disable-next-line
    }, [rating, content,setValue]);
    const onChangeRating = (value: number) => {
        setRating(value);
    }
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const router = useRouter();
    const handleClick = () => {
        setLoading(true);
        router.push(`/booking/done/detail/${item.bookingCode}`);
    };
    const convertDate = (date: string) => {
        const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        const dateArr = date.split('T');
        const dateStr = dateArr[0].split('-');
        const year = dateStr[0];
        const month = dateStr[1];
        const day = dateStr[2];

        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        const dayOfWeek = daysOfWeek[dateObj.getDay()];

        return `${dayOfWeek}, ${day}/${month}/${year}`;
    };
    const convertPrice = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    
    const convertTime = (time: string | null | undefined) => {
        // Kiểm tra nếu time là null hoặc undefined
        if (!time) {
          return "Invalid time"; // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
        }
      
        const timeArr = time.split(':');
        const hour = timeArr[0];
        const minute = timeArr[1];
        return `${hour}:${minute}`;
      };

    return (
        <div className="grid grid-cols-12 my-2 items-center">
            {loading && <LoadingPage />}
            <div className='col-span-1'>
                <Image
                    width={150}
                    height={150}
                    src={item.householdImage || '/images/LuaTrai.jpg'}
                    alt='room'
                    className='rounded-md w-full aspect-square'
                />
            </div>
            <div className='col-span-9 grid grid-cols-9 ml-4 items-center'>
                <div className='col-span-4 grid grid-cols-9'>
                    <div className='col-span-4'>
                        <p className='font-normal text-blackish-green opacity-75'>
                            Nhận phòng
                        </p>
                        <p className='font-semibold text-xl text-blackish-green'>
                            {convertDate(item.checkInDate)}
                        </p>
                        <p className='font-normal text-blackish-green opacity-75'>
                            {convertTime(item.householdCheckInTime)} - 00:00
                        </p>
                    </div>
                    <div className='col-span-1 flex items-center'>
                        <p className='font-semibold text-xl'>─</p>
                    </div>
                    <div className='col-span-4'>
                        <p className='font-normal text-blackish-green opacity-75'>
                            Trả phòng
                        </p>
                        <p className='font-semibold text-xl text-blackish-green'>
                            {convertDate(item.checkOutDate)}
                        </p>
                        <p className='font-normal text-blackish-green opacity-75'>
                            00:00 - {convertTime(item.householdCheckOutTime)}
                        </p>
                    </div>
                </div>
                <div className='col-span-5 ml-1 grid grid-cols-2'>
                    <div className='col-span-1 grid grid-cols-6'>
                        <div className='col-span-1'>
                            <FontAwesomeIcon icon={faBuilding} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-5 ml-1'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Homestay
                            </p>
                            <p className='text-blackish-green font-medium'>
                                {item.householdName}
                            </p>
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-cols-6'>
                        <div className='col-span-1'>
                            <FontAwesomeIcon icon={faBuilding} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-5 ml-1'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Tổng số lượng lưu trú
                            </p>
                            <p className='text-blackish-green font-medium'>
                                {item.totalGuest} khách
                            </p>
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-cols-6 mt-3'>
                        <div className='col-span-1'>
                            <FontAwesomeIcon icon={faHouse} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-5 ml-1'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Số lượng phòng
                            </p>
                            <p className='text-blackish-green font-medium'>
                                {item.totalRoom} phòng
                            </p>
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-cols-6 mt-3'>
                        <div className='col-span-1'>
                            <FontAwesomeIcon icon={faMoneyBill} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-5 ml-1'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Chi phí
                            </p>
                            <p className='text-blackish-green font-medium'>
                                {convertPrice(item.totalPrice)} VNĐ
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='col-span-1 col-start-12 grid grid-cols-1 items-center justify-items-center'>
                <button
                    onClick={handleClick}
                    className='h-12 w-12 rounded-lg border-2 col-span-1 hover:bg-custom-color'>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
                {isButtonShow && (
                    <button
                        onClick={() => setShowModalEdit(true)}
                        className='px-2 py-2 mt-2 rounded-lg border-2 col-span-1 bg-mint-green hover:bg-opacity-50'>
                        Đánh giá <FontAwesomeIcon icon={faFlag} className='text-sm' />
                    </button>
                )}
            </div>
            <Modal isVisible={showModalEdit} onClose={onCloseModalEdit}>
                <form
                    className='px-7 py-10 w-11/12 m-auto '
                    onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={item.bookingCode} {...register("bookingCode")} />
                    <h2 className="text-center md:text-left text-xl md:text-3xl font-bold mb-8">Đánh giá của bạn</h2>
                    <div className=' grid grid-cols-12 items-center'>
                        <div className='col-span-12 grid grid-cols-12 gap-5'>
                            <div className='col-span-4 grid grid-cols-6 '>
                                <div className='col-span-1'>
                                    <FontAwesomeIcon icon={faBuilding} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                                </div>
                                <div className='ml-3 col-span-5'>
                                    <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                        Homestay
                                    </p>
                                    <p className='text-blackish-green font-medium'>
                                        {item.householdName}
                                    </p>
                                </div>
                            </div>

                            <div className='col-span-4 grid grid-cols-6'>
                                <div className='col-span-1'>
                                    <FontAwesomeIcon icon={faMoneyBill} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                                </div>
                                <div className='ml-3 col-span-5'>
                                    <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                        Chi phí
                                    </p>
                                    <p className='text-blackish-green font-medium'>
                                        {convertPrice(item.totalPrice)} VNĐ
                                    </p>
                                </div>
                            </div>
                            <div className='col-span-4 grid grid-cols-6'>
                                <div className='col-span-1'>
                                    <FontAwesomeIcon icon={faHouse} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                                </div>
                                <div className='ml-3 col-span-5'>
                                    <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                        Số lượng phòng
                                    </p>
                                    <p className='text-blackish-green font-medium'>
                                        {item.totalRoom} phòng
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-4 grid grid-cols-6 mt-5'>
                            <div className='col-span-1'>
                                <FontAwesomeIcon icon={faHouse} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                            </div>
                            <div className='ml-3 col-span-5'>
                                <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                    Tổng số người lưu trú
                                </p>
                                <p className='text-blackish-green font-medium'>
                                    {item.totalGuest} người
                                </p>
                            </div>
                        </div>
                        <div className='col-span-6 grid grid-cols-6 mt-5'>
                            <div className='col-span-1'>
                                <FontAwesomeIcon icon={faClock} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                            </div>
                            <div className='col-span-5'>
                                <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                    Nhận phòng - Trả phòng
                                </p>
                                <p className='text-blackish-green font-medium'>
                                    {convertDate(item.checkInDate)} - {convertDate(item.checkOutDate)}
                                </p>
                            </div>
                        </div>
                        <div className='col-span-12 text-center my-5'>
                            <p className='font-semibold text- text-blackish-green opacity-75'>
                                Đánh giá
                            </p>
                            <Rate
                                defaultValue={5}
                                allowClear={false}
                                className='text-mint-green text-5xl'
                                onChange={onChangeRating}
                            />
                        </div>

                    </div>
                    <div className='col-span-9 grid grid-cols-10 mb-16'>
                        <div className='col-span-1 flex justify-end mr-3 items-center'>
                            <FontAwesomeIcon
                                icon={faCommentDots}
                                style={{ color: "#8dd3bb", }}
                                className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-9 ml-2'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Nhận xét
                            </p>
                            <TextArea
                                showCount
                                maxLength={255}
                                autoSize={{ minRows: 6, maxRows: 6 }}
                                placeholder='Nhận xét của bạn về chỗ nghỉ này'
                                style={{ resize: 'none' }}
                                className='text-blackish-green font-medium w-[500px] border-2 rounded-md px-4 py-2'
                                onChange={onChangeContent}
                            />
                        </div>
                    </div>
                    <button type='submit'
                        className='bg-mint-green rounded-md border-2 px-4 py-2 float-right mb-16'>
                        <FontAwesomeIcon icon={faFloppyDisk} />   Lưu
                    </button>
                </form>
            </Modal>
            <SuccessModal isVisible={showSuccessModal} onClose={onCloseSuccessModal} message={'Đánh giá thành công'} />
        </div>
    );
}
