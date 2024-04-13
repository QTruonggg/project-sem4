import * as React from 'react';

export interface IUserProfileLabelProps {
    label: string;
}

export default function UserProfileLabel({
    label
}: IUserProfileLabelProps) {

    const vietnameseLabels: Record<string, string> = {
        name: 'Họ và tên',
        email: 'Email',
        password: 'Mật khẩu',
        phone: 'Số điện thoại',
        gender: 'Giới tính',
        birthday: 'Ngày sinh',
        address: 'Địa chỉ'
    };
    return (
        <div className="col-span-2 flex items-center">
            <p className="text-sm md:text-lg font-normal opacity-75">{vietnameseLabels[label]}</p>
        </div>

    );
}
