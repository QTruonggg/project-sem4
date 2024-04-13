import * as React from 'react';
import ImageAndInformation from './ImageAndInformation';
import MenuItem from './MenuItem';
export interface IUserAccountMenuProps {
  children: React.ReactNode;
}
export default function UserAccountMenu({ children }: IUserAccountMenuProps) {

  return (
    <div className=' mx-0 md:mx-24 md:my-20'>
      <ImageAndInformation />
      <div className='md:my-20'>
        <div className="rounded-xl shadow-md shadow-box-color mt-3 mb-10">
          <ul className="grid grid-cols-4 py-3 items-center justify-center relative">
            <MenuItem path="/profile" label="Thông tin tài khoản" />
            <MenuItem path="/booking" label="Lịch sử đặt trước" />
            {/* <MenuItem path="/" label="Phương thức thanh toán" /> */}
            <p className='md:px-7 px-2 md:py-4 text-xs md:text-base cursor-not-allowed'>Phương thức thanh toán</p>
            <MenuItem path="/my-feedback" label="Lịch sử đánh giá" />
          </ul>
        </div>
        {children}
      </div>
    </div>

  );
}
