'use client'
import * as React from 'react';
import UserInformationItem from './UserInformationItem';
import EditNameItem from './EditNameItem';
import EditGenderItem from './EditGenderItem';
import EditAddressItem from './EditAddressItem';
import EditBirthdayItem from './EditBitrthdayItem';
import EditPasswordItem from './EditPasswordItem';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import EditPhoneItem from './EditPhoneItem';

export interface IUserInformationProps {}

const useUserInformationData = () => {
  const user = React.useContext(AuthenticationContext);

  const userInformations = {
    name: {
      first: user.data?.firstName,
      last: user.data?.lastName,
    },
    email: user.data?.email,
    password: "",
    phone: user.data?.phoneNumber,
    gender: user.data?.gender,
    birthday: user.data?.dateOfBirth,
    address: user.data?.address,
  };

  return userInformations;
};

export default function UserInformation(props: IUserInformationProps) {
  const [arrInfor, setEditArrayInfor] = React.useState([false, false, false, false, false, false, false]);
  const userInformations = useUserInformationData();

  const isAllFalse = arrInfor.every((item) => item === false);
  const userEntries = Object.entries(userInformations);

  const getValueAsString = (value: string | { first: string | undefined; last: string | undefined } | undefined) => {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    } else {
      const { first = '', last = '' } = value;
      return `${first} ${last}`;
    }
  };

  const onClickEdit = (index: number) => {
    let newArr = arrInfor.map((item, i) => i === index);
    setEditArrayInfor(newArr);
  };

  const onClickCancel = () => {
    setEditArrayInfor([false, false, false, false, false, false, false]);
  };
  return (
    <div className="">
      <h2 className="text-center md:text-left text-xl md:text-3xl font-bold mb-4">Thông tin tài khoản</h2>
      <div className="rounded-xl shadow-md shadow-box-color px-6 py-4">
        {userEntries.map(([key, value], index) => {
          if (isAllFalse) {
            return (
              <UserInformationItem
                onClickEdit={() => onClickEdit(index)}
                label={key}
                key={index}
                value={getValueAsString(value) === '' ? 'Chưa cập nhật thông tin' : getValueAsString(value)}
                editable={true}
              />
            );
          } else if (arrInfor[index]) {
            if (key === 'name') {
              return <EditNameItem label={key} key={index} onClickCancel={onClickCancel} value={getValueAsString(value)} setEditArrayInfor={setEditArrayInfor} />;
            } else if (key === 'password') {
              return <EditPasswordItem label={key} key={index} onClickCancel={onClickCancel} setEditArrayInfor={setEditArrayInfor}  />;
            } else if (key === 'gender') {
              return <EditGenderItem label={key} key={index} onClickCancel={onClickCancel} value={getValueAsString(value)} setEditArrayInfor={setEditArrayInfor} />;
            } else if (key === 'birthday') {
              return <EditBirthdayItem label={key} key={index} onClickCancel={onClickCancel} value={getValueAsString(value)} setEditArrayInfor={setEditArrayInfor} />;
            } else if (key === 'address') {
              return <EditAddressItem label={key} key={index} onClickCancel={onClickCancel} value={getValueAsString(value)} setEditArrayInfor={setEditArrayInfor} />;
            } else if (key === 'phone') {
              return <EditPhoneItem label={key} key={index} onClickCancel={onClickCancel} value={getValueAsString(value)} setEditArrayInfor={setEditArrayInfor} />;
            }
          } else {
            return (
              <UserInformationItem
                onClickEdit={() => onClickEdit(index)}
                label={key}
                key={index}
                value={getValueAsString(value) === '' ? 'Chưa cập nhật thông tin' : getValueAsString(value)}
                editable={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

