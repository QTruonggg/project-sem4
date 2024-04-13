import { IFeedback, IListFeedback } from '@/types/feedbackManagerType';
import { faCircleInfo, faEye, faEyeSlash, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Modal from '../CustomField/Modal';
import feedbackManagerApi from '@/api/feedbackManagerApi';
import LoadingPage from '../common/LoadingPage';
import PopConfirm from '../admin/user/PopConfirm';
import SuccessModal from '../CustomField/SuccessModal';
import FailedModal from '../CustomField/FailedModal';

export interface IFeedbackTableItemProps {
    feedback: IFeedback;
    index: number;
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedbackTableItem({
    feedback
    , index
    , change
    , setChange
}: IFeedbackTableItemProps) {

    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [isChange, setIsChange] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [showFailModal, setShowFailModal] = React.useState(false);

    const handleMouseEnter = (message: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setShowTooltip(true);
        setTooltipMessage(message);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };


    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear().toString();

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    const renderRatingStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                // Thêm icon ngôi sao đầy nếu i nhỏ hơn hoặc bằng rating
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-lg" />);
            }
        }
        return stars;
    };

    const hideOrShowFeedback = async () => {
        try {
            setLoading(true);
            if (feedback.status === 'SHOWED') {
                const response = await feedbackManagerApi.hideFeedback(feedback.feedbackId);
                console.log(response);
            } else {
                const response = await feedbackManagerApi.showFeedback(feedback.feedbackId);
                console.log(response);
            }

            setShowSuccessModal(true);
        } catch (error) {
            console.log(error);
            setShowFailModal(true);
        } finally {
            setChange(!change);
            setLoading(false);
        }
    };
    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                <th scope="row" className="border border-gray-300 px-2 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                </th>
                <td className="border border-gray-300 px-2  py-4">
                    {feedback.bookingCode}
                </td>
                <td className="border text-center border-gray-300 px-2 py-4">
                    {formatDateTime(feedback.createdDate)}
                </td>
                <td className="border border-gray-300 px-2 py-4">
                    {feedback.customerFirstName + " " + feedback.customerLastName}
                </td>
                <td className="border border-gray-300 px-2 max-w-md py-4">
                    {feedback.content}
                </td>
                <td className="border text-center font-bold text-green-500 border-gray-300 px-2 py-4">
                    {renderRatingStars(feedback.rating)}
                </td>
                <td className={`border border-gray-300 px-2 font-semibold ${feedback.status === 'SHOWED' ? "text-green-500" : "text-red-500"} py-4`}>
                    {feedback.status === 'SHOWED' ? "HIỆN TRÊN WEB" : "ẨN TRÊN WEB"}
                </td>
                <td className="border border-gray-300 px-2 py-4">
                    <div className='flex'>
                        <FontAwesomeIcon
                            onMouseEnter={(event) => handleMouseEnter('Chi tiết', event)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setShowDetailModal(true)}
                            className='text-xl m-1 hover:text-gray-300' icon={faCircleInfo} />

                        {feedback.status === 'SHOWED' && (
                            <FontAwesomeIcon
                                onMouseEnter={(event) => handleMouseEnter('Ẩn feedback', event)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setIsChange(true)}
                                className='text-xl m-1 hover:text-gray-300' icon={faEye} />
                        )}

                        {feedback.status !== 'SHOWED' && (
                            <FontAwesomeIcon
                                onMouseEnter={(event) => handleMouseEnter('Hiện feedback', event)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setIsChange(true)}
                                className='text-xl m-1 hover:text-gray-300' icon={faEyeSlash} />
                        )}

                        {isChange && <PopConfirm title={`${feedback.status === 'SHOWED' ? 'Ẩn' : 'Hiện'} đánh giá`}
                            message={`Bạn có chắc chắn muốn ${feedback.status === 'SHOWED' ? 'ẩn' : 'hiện'} đánh giá này?`}
                            onConfirm={hideOrShowFeedback}
                            onCancel={() => setIsChange(false)}
                        />
                        }

                    </div>


                    {showTooltip && (
                        <div
                            className='absolute bg-white text-gray-800 px-2 py-1 rounded shadow-md opacity-100 transition-opacity'
                            style={{ top: tooltipPosition.y - 30, left: tooltipPosition.x - 10 }}
                        >
                            {tooltipMessage}
                        </div>
                    )}
                </td>
            </tr>
            <Modal isVisible={showDetailModal} onClose={() => setShowDetailModal(false)} >
                <div className='p-7 w-[550px]'>
                    <p className='font-bold text-center text-3xl my-5'>Chi tiết đánh giá</p>
                    <div className='grid grid-cols-10 w-full gap-2 px-5'>
                        <div className='col-span-4 font-bold'>Mã đặt chỗ:</div>
                        <div className='col-span-6 text-center'>{feedback.bookingCode}</div>
                        <div className='col-span-4 font-bold'>Thời gian đánh giá:</div>
                        <div className='col-span-6 text-center'>{formatDateTime(feedback.createdDate)}</div>
                        <div className='col-span-4 font-bold'>Tên người đánh giá:</div>
                        <div className='col-span-6 text-center'>{feedback?.customerFirstName + ' ' + feedback?.customerLastName}</div>
                        <div className='col-span-4 font-bold'>Đánh giá sao:</div>
                        <div className='col-span-6 text-center'>{renderRatingStars(feedback.rating)}</div>
                        <div className='col-span-4 font-bold'>Nội dung đánh giá:</div>
                        <div className='col-span-6 text-center'>{feedback.content}</div>
                        <div className='col-span-4 font-bold'>Trạng thái:</div>
                        <div className='col-span-6 text-center font-bold'>{feedback.status === 'SHOWED' ? "HIỆN TRÊN WEB" : "ẨN TRÊN WEB"}</div>

                    </div>
                    <button
                        onClick={() => setIsChange(true)}
                        className={`py-2 px-4 ${feedback.status === 'SHOWED' ? "bg-red-500 hover:bg-red-500/50" : "bg-green-500 hover:bg-green-500/50"} font-bold float-right mt-20 mb-10 rounded`}>
                        {feedback.status === 'SHOWED' && <FontAwesomeIcon icon={faEyeSlash} className='mr-2' />}
                        {feedback.status !== 'SHOWED' && <FontAwesomeIcon icon={faEye} className='mr-2' />}
                        {feedback.status === 'SHOWED' ? "Ẩn đánh giá" : "Hiện đánh giá"}
                    </button>

                    {isChange && <PopConfirm title={`${feedback.status === 'SHOWED' ? 'Ẩn' : 'Hiện'} đánh giá`}
                        message={`Bạn có chắc chắn muốn ${feedback.status === 'SHOWED' ? 'ẩn' : 'hiện'} đánh giá này?`}
                        onConfirm={hideOrShowFeedback}
                        onCancel={() => setIsChange(false)}
                    />}
                </div>
            </Modal>
            {loading && <LoadingPage />}
            <SuccessModal isVisible={showSuccessModal}
                onClose={() => {
                    setIsChange(false)
                    setShowSuccessModal(false)
                }}
                message={'Thay đổi trạng thái đánh giá thành công'} />
            <FailedModal isVisible={showFailModal}
                onClose={() => {
                    setIsChange(false)
                    setShowFailModal(false)
                }}
                message={'Thay đổi trạng thái đánh giá thất bại'} />
        </>
    );
}
