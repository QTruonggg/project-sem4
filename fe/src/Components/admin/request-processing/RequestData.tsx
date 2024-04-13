import LoadingPage from '@/Components/common/LoadingPage';
import { IRequestProcessing } from '@/types/requestProcessingType';
import { faCircleInfo, faCircleXmark, faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import PopConfirm from '../user/PopConfirm';
import DenideRequestModal from './DenideRequestModal';
import ApproveRequestModal from './ApproveRequestModal';
import Image from 'next/image';

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
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const [isRejecting, setIsRejecting] = React.useState(false);
    const [isApproving, setIsApproving] = React.useState(false);

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

    const convertStatus = (status: string) => {
        if (status === "REJECTED") {
            return <p className='px-2 py-1 rounded-xl bg-[#B00505]'>Từ chối</p>
        } else if (status === "PENDING") {
            return <p className='px-2 py-1 rounded-xl bg-yellow-500'>Chờ xử lý</p>
        } else if (status === "APPROVED") {
            return <p className='px-2 py-1 rounded-xl bg-[#059669]'>Chấp nhận</p>
        }
    }




    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="border border-gray-300 px-2 py-2">
            {loading && <LoadingPage />}
                <div className='flex items-center'>
                    <div>
                        <Image height={1000} width={1000} className='w-10 aspect-square rounded-full' src={request.avatarHousehold || '/images/LuaTrai.jpg'} alt="" />
                    </div>
                    <div className='ml-2'>
                        <p className='font-bold'>{request.householdName}</p>
                    </div>
                </div>
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {convertDate(request.createdDate)}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {request.requestTitle}
            </td>
            <td className="border max-w-[270px] border-gray-300 px-2 py-2">
                {request.requestContent}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {request.solvedDate ? convertDate(request.solvedDate) : ''}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {(request.adminFirstName && request.adminLastName) ? request.adminFirstName + ' ' + request.adminLastName : ''}
            </td>
            <td className="border border-gray-300 text-center px-2 py-2">
                <div className='text-white'>
                    {convertStatus(request.status)}
                </div>
            </td>
            <td className="border border-gray-300 px-2 py-2">

                <div className='flex justify-around'>
                    <FontAwesomeIcon
                        onClick={() => {
                            setLoading(true);
                            router.push(`/admin/request-processing/${request.requestId}`)
                        }}
                        onMouseEnter={(event) => handleMouseEnter('Chi tiết', event)}
                        onMouseLeave={handleMouseLeave}
                        className='text-xl m-1 hover:text-gray-300' icon={faCircleInfo} />

                    {request.status === 'PENDING' && (
                        <>
                            <FontAwesomeIcon
                                onClick={() => {
                                    setIsApproving(true);
                                }}
                                onMouseEnter={(event) => handleMouseEnter('Chấp nhận', event)}
                                onMouseLeave={handleMouseLeave}
                                className='text-xl m-1 hover:text-gray-300' icon={faCircleCheck} />
                            <FontAwesomeIcon
                                onClick={() => {
                                    setIsRejecting(true);
                                }}
                                onMouseEnter={(event) => handleMouseEnter('Từ chối', event)}
                                onMouseLeave={handleMouseLeave}
                                className='text-xl m-1 hover:text-gray-300' icon={faCircleXmark} />
                        </>
                    )}
                </div>
                {showTooltip && (
                    <div
                        className='absolute bg-white text-gray-800 px-2 py-1 rounded shadow-md opacity-100 transition-opacity'
                        style={{ top: tooltipPosition.y, left: tooltipPosition.x + 10 }}
                    >
                        {tooltipMessage}
                    </div>
                )}
                {isRejecting && (
                    <DenideRequestModal
                        requestId={request.requestId}
                        change={change}
                        setChange={setChange}
                        onCancel={() => setIsRejecting(false)}
                    />
                )}
                {isApproving && (
                    <ApproveRequestModal
                        requestId={request.requestId}
                        change={change}
                        setChange={setChange}
                        onCancel={() => setIsApproving(false)}
                    />
                )}
            </td>
        </tr>
    );
}
