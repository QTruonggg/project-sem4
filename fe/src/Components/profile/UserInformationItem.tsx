import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UserProfileLabel from './UserProfileLabel';

export interface IUserInformationItemProps {
  label: string;
  value: string;
  editable?: boolean;
  firstName?: string;
  lastName?: string;
  onClickEdit: () => void;
}

const genderOptions = [
  { value: 'MALE', label: 'Nam' },
  { value: 'FEMALE', label: 'Nữ' },
  { value: 'OTHER', label: 'Khác' },
];

const getGenderText = (gender: string) => {
  const selectedOption = genderOptions.find(option => option.value === gender);
  return selectedOption ? selectedOption.label : 'Chưa cập nhật thông tin';
};

const convertDate = (date: string) => {
  if(date === 'Chưa cập nhật thông tin'){
    return date;
  }
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `Ngày ${day} Tháng ${month} Năm ${year}`;
};

const getDisplayValue = (label: string, value: string) => {
  switch (label) {
    case 'gender':
      return getGenderText(value);
    case 'birthday':
      return convertDate(value);
    case 'password':
      return '********';
    default:
      return value;
  }
};

const UserInformationItem: React.FC<IUserInformationItemProps> = ({
  label,
  value,
  editable,
  onClickEdit,
}) => {
  const displayValue = getDisplayValue(label, value);
  const isEmailLabel = label === 'email';

  const renderActionButton = () => {
    if (editable) {
      return (
        <button
          onClick={onClickEdit}
          className={`rounded md:h-12 h-10 border-mint-green hover:bg-mint-green border-2 w-4/5 md:w-2/3 md:py-3`}
        >
          <span className="text-xs md:text-base">
            <FontAwesomeIcon icon={faPenToSquare}/>
            Chỉnh sửa
          </span>
        </button>
      );
    } else {
      return (
        <button
          disabled
          className={`rounded border-opacity-75 md:h-12 h-10 border-2 w-4/5 md:w-2/3 md:py-3`}
        >
          <span className="font-normal text-xs md:text-base opacity-75">
            <FontAwesomeIcon icon={faPenToSquare} />
            Chỉnh sửa
          </span>
        </button>
      );
    }
  };

  return (
    <div className="grid grid-cols-12 my-8">
      <UserProfileLabel label={label} />
      <div className="col-span-6 md:col-span-8 flex items-center">
        <p className="md:text-xl text-sm font-semibold">
          {displayValue}  {isEmailLabel && (
            <FontAwesomeIcon icon={faCircleCheck} beat style={{ color: '#0fd71c',animationDuration: '3s'  }} />
          )}
        </p>
      </div>

      {!isEmailLabel && (
        <div className="col-span-4 md:col-span-2 flex justify-end">
          {renderActionButton()}
        </div>
      )}
    </div>
  );
};

export default UserInformationItem;
