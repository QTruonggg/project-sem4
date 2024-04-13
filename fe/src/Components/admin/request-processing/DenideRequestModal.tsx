import FailedModal from '@/Components/CustomField/FailedModal';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoadingPage from '@/Components/common/LoadingPage';
import * as React from 'react';
import { IRequestProcessingRequest } from '@/types/requestProcessingType';
import requestProcessingApi from '@/api/requestProcessingApi';
import TextArea from 'antd/es/input/TextArea';

export interface IDenideRequestModalProps {
    requestId: number;
    onCancel: () => void;
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DenideRequestModal ({
    requestId,
    onCancel,
    change,
    setChange,
}: IDenideRequestModalProps) {
    const [loading, setLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showFailModal, setShowFailModal] = React.useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IRequestProcessingRequest>({});

    const onSubmit: SubmitHandler<IRequestProcessingRequest> = async (data) => {
        try {
            setLoading(true);
            await requestProcessingApi.changeRequestStatus(data);
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
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            {loading && <LoadingPage />}
            {showModal && (
                <SuccessModal isVisible={showModal}
                    onClose={() => {
                        setShowModal(false)
                        onCancel()
                    }}
                    message={'Đã từ chối yêu cầu'} />
            )}
            {showFailModal && (
                <FailedModal
                    isVisible={showFailModal}
                    onClose={() => {
                        setShowFailModal(false)
                        onCancel()
                    }}
                    message={'Từ chối yêu cầu thất bại'} />
            )}
            <div className="bg-white p-4 rounded-lg w-1/3 shadow-md">
                <div className='flex justify-between text-lg font-semibold mb-4'>
                    <h3>Xác nhận chấp nhận yêu cầu</h3>
                    <h3 onClick={onCancel} className='cursor-pointer'>X</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>

                        <input type="hidden" {...register('requestStatus')} value={'REJECTED'} />
                        <input type="hidden" {...register('requestId')} value={requestId} />
                        <div className='flex my-5'>
                        <label htmlFor="requestResponse" className='w-24 font-semibold'>Lý do từ chối</label>
                        <textarea
                            maxLength={150}
                            rows={5}
                            className='text-blackish-green font-medium w-[500px] border-2 rounded-md px-4 py-2'
                            {...register('requestResponse')}
                        />
                        </div>
                    </div>


                    <div className="my-3 flex justify-end">
                        <button
                            className="px-4 py-2 mr-2 bg-red-500 text-white rounded-lg"
                            type="submit"
                        >
                            Từ chối
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}