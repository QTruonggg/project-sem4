'use client'
import LoadingPage from '@/Components/common/LoadingPage';
import homestayBookingApi from '@/api/homestayBookingApi';
import { IVnpayResponse } from '@/types/homestayBookingType';
import { faAngleLeft, faAngleRight, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface IPaymentStatusProps {
}

export default function PaymentStatus(props: IPaymentStatusProps) {
  const router = useRouter();
  const today = dayjs().startOf('day');
  const [paymentStatus, setPaymentStatus] = React.useState<IVnpayResponse>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [detailUrl, setDetailUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);


  React.useEffect(() => {
    // Gọi hàm async ngay tại đây
    const fetchPaymentStatus = async () => {
      try {
        const response = await homestayBookingApi.getPaymentStatus(window.location.href.split('?')[1]);
        setPaymentStatus(response);
        if (response.paymentStatus === "PAID") {
          sessionStorage.removeItem('isBooking');
          sessionStorage.removeItem('selectedHousehold');
          setIsSuccess(true);
          setIsLoading(false);
          setDetailUrl(`/booking/detail/${response.bookingCode}`);
        } else {
          setIsLoading(false);
          setIsSuccess(false);
          setDetailUrl(`/homestay-booking/detail`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Gọi hàm async
    fetchPaymentStatus();
  }, []);

  const convertPrice = (price: number | string) => {
    return (Number(price) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const convertDate = (date: string) => {
    const dateList: string[] = date.split('T');
    return dateList[0] + ' ' + dateList[1];
  }

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className='flex items-center h-72 overflow-hidden rounded-b-xl text-white 
      bg-cover bg-[url("/images/LangMongPaViHome.jpg")]'>
        <h2 className='mt-20 mx-auto text-4xl font-bold'>ĐẶT PHÒNG TẠI {paymentStatus?.houseName?.toUpperCase()}</h2>
      </div>
      <div className='w-4/5 m-auto my-12'>
        <div className='mb-5 flex'>
          <p className='text-red-400 cursor-not-allowed'>Chọn phòng</p>
          <span className='mx-2'><FontAwesomeIcon icon={faAngleRight} /></span>
          <p className='text-red-400 cursor-not-allowed'>Chi tiết đơn đặt phòng</p>
          <span className='mx-2'><FontAwesomeIcon icon={faAngleRight} /></span>
          <span className='mx-2'>Thanh toán</span>
        </div>
        <div className='m-auto w-3/5'>
          <div className='text-center shadow-md shadow-gray-300 p-4'>
            {isSuccess && (<>
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1cbe0e", }} className='text-5xl my-6' />
              <p className='mb-8 text-2xl font-bold text-[#1cbe0e]'>THANH TOÁN THÀNH CÔNG</p>

              <div className='w-3/5 m-auto'>
                <p className='mb-2 text-lg font-bold'>THÔNG TIN ĐẶT PHÒNG VÀ THANH TOÁN</p>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Mã đặt phòng</p>
                  <p className="font-bold">{paymentStatus?.bookingCode}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Homestay</p>
                  <p className="font-bold">{paymentStatus?.houseName}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Số tiền thanh toán</p>
                  <p className="font-bold">{convertPrice(paymentStatus?.amount || "")}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Phương thức thanh toán</p>
                  <p className="font-bold">{paymentStatus?.paymentMethod}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Ngân hàng</p>
                  <p className="font-bold">{paymentStatus?.bankCode}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Thời gian thanh toán</p>
                  <p className="font-bold">{convertDate(paymentStatus?.payDate || "")}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Trạng thái thanh toán</p>
                  <p className="font-bold">{paymentStatus?.message}</p>
                </div>

              </div>
            </>)
            }
            {!isSuccess && (<>
              {!isLoading && (<>
                <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#d62222", }} className='text-5xl my-6' />
                <p className='mb-8 text-2xl font-bold text-[#d62222]'>THANH TOÁN KHÔNG THÀNH CÔNG</p>
              </>
              )}
              <div className='w-3/5 m-auto'>
                <p className='mb-2 text-lg font-bold'>THÔNG TIN ĐẶT PHÒNG VÀ THANH TOÁN</p>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Mã đặt phòng</p>
                  <p className="font-bold">{paymentStatus?.bookingCode}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Homestay</p>
                  <p className="font-bold">{paymentStatus?.houseName}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Số tiền thanh toán</p>
                  <p className="font-bold">{convertPrice(paymentStatus?.amount || "")}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Thời gian thanh toán</p>
                  <p className="font-bold">{convertDate(paymentStatus?.payDate || "")}</p>
                </div>
                <div className='border-t-2 border-gray-300 text-lg p-2'>
                  <p>Trạng thái thanh toán</p>
                  <p className="font-bold text-[#d62222]">{paymentStatus?.message}</p>
                </div>

                <button onClick={() => router.push("/homestay-booking/detail")} className='p-2 px-5 my-4 font-bold bg-mint-green rounded-md '>Thực hiện lại thanh toán</button>
              </div>
            </>
            )
            }
          </div>
          <div className='flex justify-between py-4'>
            <Link href="/home"><FontAwesomeIcon icon={faAngleLeft} /> Quay về trang chủ</Link>
            <Link href={detailUrl}>Chi tiết đặt phòng <FontAwesomeIcon icon={faAngleRight} /></Link>
          </div>
        </div>
      </div>
    </>

  );
}

