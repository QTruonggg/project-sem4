import { IService } from '@/types/homestayBookingType';
import * as React from 'react';
import { BookingContext } from '@/app/homestay-booking/page';
export interface ISearchContentProps {
    serviceList: IService[] | undefined;
}

export default function SearchContent({
    serviceList,
}: ISearchContentProps) {


    const { setServices, setHaveDorm } = React.useContext(BookingContext);

    const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const serviceName = event.target.value;
        if (event.target.checked) {
            // Nếu checkbox được chọn, thêm dịch vụ vào danh sách
            setServices((prevServices) => [...prevServices, serviceName]);
        } else {
            // Nếu checkbox được bỏ chọn, loại bỏ dịch vụ khỏi danh sách
            setServices((prevServices) =>
                prevServices.filter((service) => service !== serviceName)
            );
        }
    };

    const handleRoomTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const roomType = event.target.value;
        if (roomType === 'Phòng cá nhân') {
          setHaveDorm(false);
        } else if (roomType === 'Phòng cộng đồng (dorm)') {
          setHaveDorm(true);
        }
      };

    const formatter = (value: number | undefined) => {
        const number = value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${number} VNĐ`;
    };

    return (

        <div className='col-span-3'>
            <div className='mb-5 text-2xl font-medium'>Lọc kết quả</div>
            <div>
                <div className='text-lg font-bold mb-5'>Loại phòng</div>

                <div className="flex items-center mb-4">
                    <input 
                    id='roomType1' 
                    name="roomType" 
                    type="radio" 
                    className="w-4 h-4 text-blue-600 bg-mint-green border-gray-300"
                    value="Phòng cá nhân"
                    onChange={handleRoomTypeChange} />
                    <label htmlFor="roomType1" className="ml-2 text-sm">Phòng cá nhân</label>
                </div>
                <div className="flex items-center">
                    <input 
                    id='roomType2' 
                    name="roomType" 
                    type="radio" 
                    className="w-4 h-4 text-blue-600 bg-mint-green border-gray-300"
                    value="Phòng cộng đồng (dorm)"
                    onChange={handleRoomTypeChange}  />
                    <label htmlFor="roomType2" className="ml-2 text-sm">Phòng cộng đồng (dorm)</label>
                </div>
                <div className='my-10 border-b-2 border-gray-400 border-opacity-60'></div>

            </div>
            <div>
                <div className='text-lg font-bold mb-5'>Dịch vụ đặc biệt</div>
                {serviceList?.map((item) => (
                    <div className="flex items-center mb-4" key={item.serviceId}>
                        <input 
                        id={item.serviceName} 
                        type="checkbox" 
                        value={item.serviceName} 
                        className="w-4 h-4 text-blue-600 bg-mint-green border-gray-300"
                        onChange={handleServiceChange} />
                        <label htmlFor={item.serviceName} className="ml-2 text-sm">{item?.serviceName}</label>
                    </div>
                ))
                }

            </div>

        </div>


    );
}
