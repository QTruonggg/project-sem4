'use client';
import React from 'react';

export interface IBookingProcessAndCancellationPolicy {

}

export default function IBookingProcessAndCancellationPolicy() {
    const [showFirstDiv, setShowFirstDiv] = React.useState(false);
    const [showSecondDiv, setShowSecondDiv] = React.useState(false);
    const [showThirdDiv, setShowThirdDiv] = React.useState(false);

    return (
        <>
            <div className='text-center overflow-hidden rounded-b-xl 
            bg-cover bg-[url("/images/LangMongPaViHome.jpg")] h-60'>
                <p className='text-white font-bold text-3xl pt-16'>CHÍNH SÁCH</p>
            </div>

            <div className="text-center">
                <p className="text-[#0F6900] font-semibold mt-5">
                    Chính sách
                </p>
                <h1 className="text-4xl font-semibold">
                    Quy trình đặt phòng và chính sách hủy
                </h1>
            </div>
            <div className="w-[80vh] mt-10 mx-auto justify-center border border-black p-5">
                <div className="border-b border-black flex justify-between">
                    <button
                        className="mb-5 font-semibold"
                        onClick={() => setShowFirstDiv(!showFirstDiv)}
                    >Quy trình đặt phòng</button>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        className=" text-3xl"
                    >
                        <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
                    </svg>
                </div>

                {showFirstDiv && ( // Kiểm tra nếu showSecondDiv là true thì hiển thị khối div thứ 2
                    <div className="mt-3">
                        <div className="flex justify-between">
                        </div>
                        <div>
                            <span className='font-semibold'>
                                Bước 1:
                            </span>
                            <p>
                                Khách hàng truy cập website V-HomeStay.com. Tại trang chủ hoặc trang đặt phòng, khách hàng lựa chọn homestay, ngày lưu trú và số khách, sau đó chọn “Tìm kiếm” để hệ thống đề xuất những phòng phù hợp. Chúng tôi sẽ cung cấp đầy đủ thông tin về homestay, các dịch vụ, hình ảnh cho khách hàng tìm hiểu và lựa chọn.
                            </p>
                        </div>
                        &nbsp;
                        <div>
                            <span className='font-semibold'>
                                Bước 2:
                            </span>
                            <p>
                                Khách hàng lựa chọn phòng theo nhu cầu và điền đẩy đủ thông tin đặt phòng, sau đó chọn “Thanh toán” để hoàn tất đặt phòng.</p>
                        </div>
                        &nbsp;
                        <div>
                            <span className='font-semibold'>
                                Bước 3:
                            </span>
                            <p>
                                Hệ thống xác nhận đơn đặt phòng của khách hàng và gửi đề nghị thanh toán trực tuyến qua cổng thanh toán VNPAY. Sau khi khách hàng thực hiện thanh toán thành công, email xác nhận đặt phòng sẽ gửi đến quý khách hàng.                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-[80vh] mt-10 mx-auto justify-center border border-black p-5">
                <div className="border-b border-black flex justify-between">
                    <button
                        className="mb-5 font-semibold"
                        onClick={() => setShowSecondDiv(!showSecondDiv)}
                    >Quy định dịch vụ lưu trú</button>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        className=" text-3xl"
                    >
                        <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
                    </svg>
                </div>

                {showSecondDiv && (
                    <div className="mt-3">
                        <div className="flex justify-between">
                        </div>
                        <ul className='list-disc pl-6'>
                            &nbsp;
                            <li>
                                Quý khách vui lòng cung cấp giấy tờ tùy thân (CCCD, hộ chiếu & thị thực xuất nhập cảnh còn hiệu lực) tại quầy Lễ tân của homestay khi làm thủ tục nhận phòng.
                            </li>
                            &nbsp;
                            <li>
                                Giờ nhận phòng và trả phòng tùy theo mỗi homestay (thời gian được thông tin trong email và lịch sử đặt phòng trên hệ thống). Quý khách có thể liên lạc với nhân viên Lễ tân khi có yêu cầu trả phòng sau giờ quy định.
                            </li>
                            &nbsp;
                            <li>
                                Khách lưu trú phải ở đúng phòng đã đăng ký, nếu cần chuyển phòng vui lòng liên hệ với quầy lễ tân. Không được ở chung phòng khi chưa đăng ký tại Quầy Lễ tân.
                            </li>
                            &nbsp;
                            <li>
                                Vì lý do an toàn và an ninh, xin lưu ý rằng khách đến thăm hoặc khách không đăng ký không được ở lại trong phòng khách sau 22:00 tối. Khách đến thăm vui lòng để lại giấy tờ tùy thân tại Quầy Lễ tân theo quy định
                            </li>
                            &nbsp;
                            <li>
                                Không được mang vũ khí, hàng quốc cấm, chất dễ cháy nổ vào phòng homestay. Quý khách vui lòng không mang các thực phẩm, trái cây nặng mùi và dễ vấy bẩn (sầu riêng, mít, măng cụt…) vào homestay. Quý khách có thể yêu cầu bộ phận hành lý sẽ cất giữ tại kho.
                            </li>
                            &nbsp;
                            <li>
                                Quý khách vui lòng không nấu nướng trong phòng homestay.
                            </li>
                            &nbsp;
                            <li>
                                Nghiêm cấm các hình thức cờ bạc, buôn lậu, mại dâm.
                            </li>
                            &nbsp;
                            <li>
                                Không di dời các vật dụng, đồ đạc trong phòng qua các phòng khác.
                            </li>
                            &nbsp;
                            <li>
                                Vui lòng không gây ồn ào sau 22:00.
                            </li>
                            &nbsp;
                            <li>
                                Homestay có quyền từ chối dịch vụ đối với các đối tượng có dấu hiệu bệnh truyền nhiễm hoặc gây phiền nhiễu cho những khách khác trong homesaty.
                            </li>
                            &nbsp;
                            <li>
                                Khách lưu trú chịu trách nhiệm và bồi thường về việc hư hỏng, mất mát trang thiết bị trong phòng theo quy định.
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="w-[80vh] mt-10 mx-auto justify-center border border-black p-5">
                <div className="border-b border-black flex justify-between">
                    <button
                        className="mb-5 font-semibold"
                        onClick={() => setShowThirdDiv(!showThirdDiv)}
                    >Chính sách hủy phòng</button>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        className=" text-3xl"
                    >
                        <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
                    </svg>
                </div>

                {showThirdDiv && ( // Kiểm tra nếu showSecondDiv là true thì hiển thị khối div thứ 2
                    <div className="mt-3">
                        <ul className='list-disc pl-6'>
                            &nbsp;
                            <li>
                                Phòng đã đặt sẽ được hủy phòng - hoàn tiền theo chính sách của từng homestay. Mỗi homestay sẽ có khoảng thời gian cho phép hủy phòng - hoàn tiền. Tiền hoàn sẽ được gửi lại khách hàng trong vòng 48h kể từ thời điểm hủy phòng.
                            </li>
                            &nbsp;
                            <li>
                                Trường hợp khách hàng  không đến nhận phòng, khách hàng sẽ không nhận được hoàn tiền cho đơn đặt phòng đó.
                            </li>
                        </ul>

                    </div>
                )}
            </div>

        </>
    );
}