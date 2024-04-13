import LoadingPage from '@/Components/common/LoadingPage';
import { IRequestProcessing } from '@/types/requestProcessingType';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import PopConfirm from '../user/PopConfirm';
import requestProcessingApi from '@/api/requestProcessingApi';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import FailedModal from '@/Components/CustomField/FailedModal';
import { Tag } from 'antd';

export interface IRequestDataProps {
    request: IRequestProcessing;
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RequestData({
    request,
    change,
    setChange,
}: IRequestDataProps) {
    const [loading, setLoading] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const [isRejecting, setIsRejecting] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showFailModal, setShowFailModal] = React.useState(false);

    const handleMouseEnter = (message: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setShowTooltip(true);
        setTooltipMessage(message);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const onCancel = () => {
        setShowModal(false);
        setShowFailModal(false);
        setIsRejecting(false);
        document.body.style.overflow = 'auto';
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

    const convertStatus = (status: string) => {
        if (status === "REJECTED") {
            return <Tag className='px-6 py-1 text-sm' color='red-inverse'>Từ chối</Tag>
            // <p className='px-2 py-1 rounded-xl bg-[#B00505]'>Từ chối</p>
        } else if (status === "PENDING") {
            return <Tag className='px-5 py-1 text-sm' color='gold-inverse'>Chờ xử lý</Tag>
            // <p className='px-2 py-1 rounded-xl bg-yellow-500'>Chờ xử lý</p>
        } else if (status === "APPROVED") {
            return <Tag className='px-4 py-1 text-sm' color='green-inverse'>Chấp nhận</Tag>
            // <p className='px-2 py-1 rounded-xl bg-[#059669]'>Chấp nhận</p>
        }
    }

    const handleCancel = async () => {
        try {
            setLoading(true);
            await requestProcessingApi.deleteRequest(request.requestId);
            setShowModal(true);
            document.body.style.overflow = 'hidden';
            setChange(!change);
        } catch (error) {
            console.log(error);
            setShowFailModal(true);
            document.body.style.overflow = 'hidden';
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {loading && <LoadingPage />}
            <td className="border border-gray-300 px-2 py-2">
                {request.requestTitle}
            </td>
            <td className="border max-w-[270px] border-gray-300 px-2 py-2">
                {request.requestContent}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {convertDate(request.createdDate)}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {request.solvedDate ? convertDate(request.solvedDate) : ''}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {request.requestResponse ? request.requestResponse : ''}
            </td>
            <td className="border border-gray-300 text-center px-2 py-2">
                <div className='text-white'>
                    {convertStatus(request.status)}
                </div>
            </td>
            <td className="border border-gray-300 text-center px-2 py-2">
                {request.status === 'PENDING' && (
                    <FontAwesomeIcon
                        onClick={() => {
                            setIsRejecting(true);
                        }}
                        onMouseEnter={(event) => handleMouseEnter('Xóa', event)}
                        onMouseLeave={handleMouseLeave}
                        className='text-xl hover:text-gray-300' icon={faCircleXmark} />
                )}
                {showTooltip && (
                    <div
                        className='absolute bg-white text-gray-800 px-2 py-1 rounded shadow-md opacity-100 transition-opacity'
                        style={{ top: tooltipPosition.y, left: tooltipPosition.x + 10 }}
                    >
                        {tooltipMessage}
                    </div>
                )}
                {isRejecting && (
                    <PopConfirm
                        onCancel={() => setIsRejecting(false)}
                        title={'Xóa yêu cầu'}
                        message={'Bạn có chắc chắn muốn xóa yêu cầu này?'}
                        onConfirm={handleCancel} />
                )}
                {showModal && (
                    <SuccessModal isVisible={showModal}
                        onClose={() => {
                            setShowModal(false)
                            onCancel()
                        }}
                        message={'Đã xóa yêu cầu'} />
                )}
                {showFailModal && (
                    <FailedModal
                        isVisible={showFailModal}
                        onClose={() => {
                            setShowFailModal(false)
                            onCancel()
                        }}
                        message={'Xóa yêu cầu thất bại'} />
                )}
            </td>
        </tr>
    );
}
