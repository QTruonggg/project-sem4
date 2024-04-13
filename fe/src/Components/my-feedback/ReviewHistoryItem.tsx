import * as React from 'react';
import { Rate, Input } from 'antd';
import Image from 'next/image';
import { faBuilding, faCheckDouble, faHouse, faClock, faCommentDots, faAngleRight, faPen, faMoneyBill, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMyFeedbackItem, IUpdateFeedbackItem } from '@/types/myFeedbackType';
import Modal from '../CustomField/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import SuccessModal from '../CustomField/SuccessModal';
import myFeedbackApi from '@/api/myFeedbackApi';

const { TextArea } = Input;
export interface IReviewHistoryItemProps {
    item: IMyFeedbackItem;
}

export default function ReviewHistoryItem({
    item,
}: IReviewHistoryItemProps) {
    const [showModal, setShowModal] = React.useState(false);
    const [showModalEdit, setShowModalEdit] = React.useState(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [rating, setRating] = React.useState(item.rating);
    const [content, setContent] = React.useState(item.content);
    const onCloseModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'auto';
    }
    const onCloseModalEdit = () => {
        setShowModalEdit(false);
        document.body.style.overflow = 'auto';
    }
    const onCloseModalSuccess = () => {
        setShowSuccessModal(false);
        setShowModalEdit(false);
        document.body.style.overflow = 'auto';
    }

    const { register, handleSubmit, setValue } = useForm<IUpdateFeedbackItem>({});
    const onSubmit: SubmitHandler<IUpdateFeedbackItem> = async (value) => {
        try {
            const response = await myFeedbackApi.updateFeedback(value);
            if (response.httpStatus === 'OK') {
                item.content = value.content;
                item.rating = value.rating;
                setShowSuccessModal(true);
                document.body.style.overflow = 'hidden';
            }
        } catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        setValue('rating', rating);
        setValue('content', content);
        //EsLint-disable-next-line
    }, [rating, content,setValue]); //rating, content

    const onChangeRating = (value: number) => {
        setRating(value);
    }
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }
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

    return (
        <div className="rounded-xl shadow-md shadow-gray-300 p-5 mt-3 mb-10 items-center">
            <div className="grid grid-cols-12 my-8 items-center">
                <div className='col-span-1'>
                    <Image
                        width={80}
                        height={80}
                        src='/images/logo.png'
                        alt='room'
                    />
                </div>
                <div className='col-span-10 grid grid-cols-10'>
                    <div className='col-span-10 grid grid-cols-4 items-center'>
                        <div className='col-span-2 grid grid-cols-5'>
                            <div className='col-span-2 grid grid-cols-6'>
                                <div className='col-span-1'>
                                    <FontAwesomeIcon icon={faBuilding} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                                </div>
                                <div className='col-span-5'>
                                    <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                        Homestay
                                    </p>
                                    <p className='text-blackish-green font-medium'>
                                        {item.householdName}
                                    </p>
                                </div>
                            </div>
                            <div className='col-span-3 grid grid-cols-6'>
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
                            <div className='col-span-2 grid grid-cols-6 mt-3'>
                                <div className='col-span-1'>
                                    <FontAwesomeIcon icon={faHouse} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                                </div>
                                <div className='col-span-5'>
                                    <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                        Số lượng phòng
                                    </p>
                                    <p className='text-blackish-green font-medium'>
                                        {item.totalRoom} phòng
                                    </p>
                                </div>
                            </div>
                            <div className='col-span-3 grid grid-cols-6 mt-3'>
                                <div className='col-span-1'>
                                    <FontAwesomeIcon icon={faCheckDouble} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                                </div>
                                <div className='col-span-5'>
                                    <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                        Đánh giá
                                    </p>
                                    <Rate value={item.rating} disabled className='text-mint-green' />
                                </div>
                            </div>

                        </div>
                        <div className='col-span-2 grid grid-cols-6'>
                            <div className='col-span-1 flex justify-end mr-3 items-center'>
                                <FontAwesomeIcon icon={faCommentDots} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                            </div>
                            <div className='col-span-5 ml-2'>
                                <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                    Nhận xét
                                </p>
                                <p className='text-blackish-green font-medium'>
                                    {item.content?.length > 0 ? item.content : 'Chưa có nhận xét'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 w-1/2 col-start-12 flex-col items-center justify-center'>
                    <button onClick={() => {
                        setShowModal(true);
                        document.body.style.overflow = 'hidden';
                    }}
                        className='h-12 w-12 rounded-lg border-2 hover:bg-custom-color'>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <button onClick={() => {
                        setShowModalEdit(true);
                        document.body.style.overflow = 'hidden';
                    }}
                        className='h-12 w-12 rounded-lg border-2 mt-2 hover:bg-custom-color'>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </div>
            </div>
            {/* Modal thông tin detai */}
            <Modal isVisible={showModal} onClose={onCloseModal}>
                <div className='px-7 py-10 w-11/12 m-auto '>
                    <h2 className="text-center md:text-left text-xl md:text-3xl font-bold mb-8">Đánh giá của bạn</h2>
                    <div className=' grid grid-cols-12 items-center gap-6'>
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
                            <Rate value={item.rating} disabled className='text-mint-green text-5xl' />
                        </div>

                    </div>
                    <div className='col-span-9 grid grid-cols-10 my-16'>
                        <div className='col-span-1 flex justify-end mr-3 items-center'>
                            <FontAwesomeIcon icon={faCommentDots} style={{ color: "#8dd3bb", }} className='bg-[#EBF6F2] p-2 min-w-[16px] rounded-sm' />
                        </div>
                        <div className='col-span-9 ml-2'>
                            <p className='font-semibold text-xs text-blackish-green opacity-75'>
                                Nhận xét
                            </p>
                            <p className='text-blackish-green font-medium w-[450px]'>
                                {item.content}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setShowModal(false)
                            setShowModalEdit(true)
                        }}
                        className='bg-mint-green rounded-md border-2 px-4 py-2 float-right mb-16'>
                        <FontAwesomeIcon icon={faPen} className='mr-2' /> Chỉnh sửa đánh giá
                    </button>
                </div>
            </Modal>
            {/* Modal edit feedback */}
            <Modal isVisible={showModalEdit} onClose={onCloseModalEdit}>
                <form
                    className='px-7 py-10 w-11/12 m-auto '
                    onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={item.id} {...register("feedbackId")} />
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
                                defaultValue={item.rating}
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
                                defaultValue={item.content}
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
            <SuccessModal isVisible={showSuccessModal} onClose={onCloseModalSuccess} message={'Cập nhật đánh giá thành công!'} />
        </div>
    );
}
