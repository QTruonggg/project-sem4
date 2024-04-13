import bookingApi from '@/api/bookingApi';
import { CancelBookingContext } from '@/app/booking/page';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { IBookingCancelForm, IBookingCancelRequest } from '@/types/bookingType';
import { useRouter, usePathname } from 'next/navigation';
import * as React from 'react';
import LoadingPage from '../common/LoadingPage';
import SuccessModal from '../CustomField/SuccessModal';

export interface ICancelModalProps {
    isVisible: boolean;
    onClose: () => void;
    cancelForm: IBookingCancelForm | undefined;
}

export default function CancelModal(props: ICancelModalProps) {
    const router = useRouter();
    const usePath = usePathname();
    const [loading, setLoading] = React.useState(false);
    const { isCancelSuccess, setIsCancelSuccess } = React.useContext(CancelBookingContext);
    const [ showSuccessModal, setShowSuccessModal ] = React.useState(false);
    const [reasonId, setReasonId] = React.useState<string>(props.cancelForm?.bookingCancelForm?.cancellationReasons[0].reason || "");
    const [bankName, setBankName] = React.useState<string>("");
    const [accountNumber, setAccountNumber] = React.useState<string>("");
    const [accountOwnerName, setAccountOwnerName] = React.useState<string>("");

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    }
    const handleSuccessModalClose = () => {
        if (usePath === '/booking') {
            setIsCancelSuccess(true);
            props.onClose();
            setShowSuccessModal(false);
        } else {
            setIsCancelSuccess(true);
            props.onClose();
            setShowSuccessModal(false);
            router.push('/booking/cancel');
        }
    }

    const handleReasonChange = (value: string) => {
        setReasonId(value);
    };

    const handleBankNameChange = (value: string) => {
        setBankName(value);
    };

    const handleAccountNumberChange = (value: string) => {
        setAccountNumber(value);
    };

    const handleAccountOwnerNameChange = (value: string) => {
        setAccountOwnerName(value);
    };

    const convertPrice = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const HandleCancel = async () => {
        try {
            setLoading(true);
            if (props.cancelForm) {
                const bookingRequest: IBookingCancelRequest = {
                    bookingCode: props.cancelForm.bookingCancelForm.bookingCode,
                    cancelReason: reasonId,
                    refundAmount: props.cancelForm.bookingCancelForm.refundAmount,
                    status: props.cancelForm.bookingCancelForm.status,
                    accountNumber: accountNumber,
                    bankName: bankName,
                    accountOwnerName: accountOwnerName,
                }

                const res = await bookingApi.cancelBooking(bookingRequest);
                // if(res.message === "success"){
                    setShowSuccessModal(true)
                
                // }
            }
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }

    if (!props.isVisible) return (null)
    return (
        <div className='fixed backdrop-brightness-50 flex inset-0 justify-center items-center backdrop-filter z-50 overflow-hidden'
            onClick={handleClose}
            id='wrapper'>
            <div className='flex flex-col'>
                <button className='text-white text-xl self-end'
                    onClick={props.onClose}>X</button>
                <div className='bg-white p-10 rounded shadow-md shadow-gray-300'>
                    <p className='text-3xl font-bold text-center py-10'>Xác nhận hủy đặt phòng</p>
                    <div className='grid grid-cols-10'>
                        <div className='col-span-4'>
                            <p className='text-lg font-semibold py-3'>Lý do hủy đặt phòng :</p>
                        </div>
                        <div className='col-span-6'>
                            <select
                                id="Homestay"
                                className="w-full h-full rounded border border-gray-500"
                                onChange={e => handleReasonChange(e.target.value)}>
                                {props.cancelForm?.bookingCancelForm?.cancellationReasons?.map((reason) => (
                                    <option
                                        value={reason.reason}
                                        key={reason.id}>
                                        &nbsp;{reason.reason}
                                    </option>
                                ))
                                }

                            </select>
                        </div>
                    </div>

                    {props.cancelForm?.bookingCancelForm?.status === "NOT_REFUND" && (
                        <div className='text-red-500 font-bold my-3'>
                            <p>Nếu bạn hủy đặt phòng này bạn sẽ không được hoàn tiền do hủy sau thời gian quy định.</p>
                            <p>Bạn vẫn muốn tiếp tục hủy đặt phòng?</p>
                        </div>
                    )}
                    {props.cancelForm?.bookingCancelForm?.status === "REFUND" && (
                        <>
                            <div className='text-red-500 font-bold my-3'>
                                <p>Nếu bạn hủy đặt phòng này bạn sẽ được hoàn {convertPrice(props.cancelForm.bookingCancelForm?.refundAmount)} VNĐ.</p>
                                <p>Bạn sẽ được nhân viên liên lạc và hỗ trợ hoàn tiền trong 48h kể từ thời điểm hủy phòng</p>
                            </div>

                            <p className='font-bold mb-3'>Thông tin tài khoản ngân hàng để nhận tiền hoàn :</p>

                            <div className='grid grid-cols-10 mb-3'>
                                <div className='col-span-4'>
                                    <p className='text-lg font-semibold py-3'>Ngân hàng :</p>
                                </div>
                                <div className='col-span-6'>
                                    <input
                                        onChange={e => handleBankNameChange(e.target.value)}
                                        className="w-full h-full rounded border border-gray-500 px-2"
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-10 mb-3'>
                                <div className='col-span-4'>
                                    <p className='text-lg font-semibold py-3'>Số tài khoản :</p>
                                </div>
                                <div className='col-span-6'>
                                    <input
                                        onChange={e => handleAccountNumberChange(e.target.value)}
                                        className="w-full h-full rounded border border-gray-500 px-2"
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-10 mb-3'>
                                <div className='col-span-4'>
                                    <p className='text-lg font-semibold py-3'>Chủ tài khoản :</p>
                                </div>
                                <div className='col-span-6'>
                                    <input
                                        onChange={e => handleAccountOwnerNameChange(e.target.value)}
                                        className="w-full h-full rounded border border-gray-500 px-2"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className='flex justify-end mt-8'>
                        <button
                            onClick={HandleCancel}
                            className='bg-[#F96131] font-bold rounded-lg p-2 mr-2'>Hủy phòng</button>
                    </div>
                </div>
            </div>
            {loading && (<LoadingPage />)}
            <SuccessModal
                isVisible={showSuccessModal}
                onClose={() => handleSuccessModalClose()}
                message={'Hủy đặt phòng thành công'}
            />
        </div>
    );
}
