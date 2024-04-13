export interface IPaymentPolicyProps {

}

export default function PaymentPolicy(props: IPaymentPolicyProps) {
    return (

        <>
            <div className='text-center overflow-hidden rounded-b-xl 
            bg-cover bg-[url("/images/LangMongPaViHome.jpg")] h-60'>
                <p className='text-white font-bold text-3xl pt-24'>QUY ĐỊNH & CHÍNH SÁCH</p>
            </div>
            <div className="mt-10 w-[100vh] mx-auto justify-center text-justify">
                <p className="text-[#0F6900] text-center font-semibold mt-5">
                    Quy định & Chính sách
                </p>
                <h1 className="text-4xl font-semibold text-center mb-10">
                   Chính sách thanh toán
                </h1>
                <p>
                    Nhằm mang đến cho quý khách hàng những trải nghiệm đặt phòng trực tuyến toàn diện nhất, tại V-HomeStay, chúng tôi lựa chọn <a className="font-bold">Cổng thanh toán Điện tử VNPAY</a> với đa dạng hình thức tích hợp thanh toán:
                </p>

                <ul className="list-disc pl-6">
                    &nbsp;
                    <li>
                        Quét mã QR thanh toán (sử dụng tính năng quét QR của các ngân hàng qua app banking)
                    </li>
                    &nbsp;
                    <li>
                        Liên kết tài khoản ngân hàng
                    </li>
                    &nbsp;
                    <li>
                        Liên kết thẻ ATM nội địa
                    </li>
                    &nbsp;
                    <li>
                        Liên kết thẻ thanh toán quốc tế VISA
                    </li>
                    &nbsp;
                    <li>
                        Thanh toán qua Ví điện tử VNPAY
                    </li>
                </ul>

            </div>
        </>
    );
}