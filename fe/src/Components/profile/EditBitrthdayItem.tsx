import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import UserProfileLabel from './UserProfileLabel';
import authApi from '@/api/authApi';
import { AuthenticationContext } from '@/features/auth/AuthContext';
import { IUpdateProfileType } from '@/types/authType';
import { useForm, SubmitHandler } from 'react-hook-form';
import SuccessModal from '../CustomField/SuccessModal';

export interface IEditBirthdayItemProps {
  label: string;
  value: string;
  onClickCancel?: () => void;
  setEditArrayInfor: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function EditBirthdayItem({
  label,
  value,
  onClickCancel,
  setEditArrayInfor,
}: IEditBirthdayItemProps) {
  const timerRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const splitValue = value ? value.split('-') : ['00', '01', '00'];
  const [day, setDay] = React.useState(splitValue[0]===''?'00':splitValue[2]);
  const [month, setMonth] = React.useState(splitValue[0]===''?'00':splitValue[1]);
  const [year, setYear] = React.useState(splitValue[0]);
  const [dayError, setDayError] = React.useState('');
  const [yearError, setYearError] = React.useState('');
  const [canSubmit, setCanSubmit] = React.useState(false);
  const { setAuthState, data } = React.useContext(AuthenticationContext);
  const { register, handleSubmit, setValue } = useForm<IUpdateProfileType>();
  const [showModal, setShowModal] = React.useState(false);
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setEditArrayInfor([false, false, false, false, false, false, false]);
  };
  React.useEffect(() => {
    setCanSubmit(dayError === '' && yearError === '');
  }, [dayError, yearError]);
  
  const monthOptions = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const validateDay = (value: string) => {
    const dayNumber = parseInt(value, 10);
    const selectElement = document.getElementById('inputMonth') as HTMLSelectElement;
    const monthNumber = selectElement ? parseInt(selectElement.value, 10) : NaN;
    const yearNumber = parseInt(year, 10);

    if (isNaN(dayNumber) || isNaN(yearNumber)) {
      return false;
    }

    const isValidDate = new Date(yearNumber, monthNumber - 1, dayNumber).getDate() === dayNumber;
    return isValidDate;
  };

  const handleChangeDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const isValid = validateDay(e.target.value);
        setDayError(isValid ? '' : 'Giá trị không hợp lệ');
      }, 700);

  };
  const handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
    clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const isValid = validateDay(day);
        setDayError(isValid ? '' : 'Giá trị không hợp lệ');
        const isValidYear = validateYear(year);
        setYearError(isValidYear ? '' : 'Giá trị không hợp lệ');
      }, 700);
    };

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const isValidDay = validateDay(day);
        setDayError(isValidDay ? '' : 'Giá trị không hợp lệ');
        const isValid = validateYear(e.target.value);
        setYearError(isValid ? '' : 'Giá trị không hợp lệ');
      }, 700);
    
  };

  const validateYear = (value: string) => {
    const currentYear = new Date().getFullYear();
    const yearNumber = parseInt(value, 10);
    return yearNumber >= 1900 && yearNumber <= currentYear;
  };

  const onSubmit: SubmitHandler<IUpdateProfileType> = async (value) => {
    try {
      const response = await authApi.updateProfile(value);
      if (response.httpStatus === 'OK') {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
      }
      setAuthState({
        loading: false,
        data: {
          id: data?.id as number,
          avatar: data?.avatar as string,
          email: data?.email as string,
          firstName: data?.firstName as string,
          lastName: data?.lastName as string,
          phoneNumber: data?.phoneNumber as string,
          gender: data?.gender as string,
          dateOfBirth: value.dateOfBirth as string,
          address: data?.address as string,
          accountId: data?.accountId as number,
          role: data?.role as string,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setValue('dateOfBirth', `${year}-${month}-${day}`);
  }, [setValue, year, month, day]);

  return (
    <form className="grid grid-cols-12 my-8" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
      <UserProfileLabel label={label} />
      <div className="col-span-6 md:col-span-8 md:flex items-center">
        <div className="md:flex md:justify-between w-full md:w-96">
          <div className={`w-24 md:my-0 mb-6 h-12 relative`}>
            <label
              htmlFor='day'
              className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500"
            >
              Ngày
            </label>
            <input
              id='day'
              className={`w-full border border-gray-300 rounded px-3 py-2 ${dayError ? 'border-red-400' : ''}`}
              placeholder='Ngày'
              value={day}
              onChange={handleChangeDay}
            />
            {dayError && <span className="text-sm text-red-400">{dayError}</span>}
          </div>
          <div className="w-24 md:my-0 mb-6 h-[41.6px] border border-gray-300 rounded relative">
            <label
              htmlFor="inputMonth"
              className="block absolute text-sm -top-3 left-3 bg-white px-2 text-gray-500"
            >
              Tháng
            </label>
            <select id="inputMonth" onChange={handleChangeMonth} defaultValue={month} className="w-full h-full">
              {monthOptions.map((option) => (
                <option key={option} value={option}>
                  &nbsp; {option}
                </option>
              ))}
            </select>
          </div>
          <div className={`w-24 md:my-0 mb-6 h-12 relative`}>
            <label
              htmlFor='year'
              className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500"
            >
              Năm
            </label>
            <input
              id='year'
              className={`w-full border border-gray-300 rounded px-3 py-2 ${yearError ? 'border-red-400' : ''}`}
              placeholder='Năm'
              value={year}
              onChange={handleChangeYear}
            />
            {yearError && <span className="text-sm text-red-400">{yearError}</span>}
          </div>
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 flex justify-end">
        <div className="grid grid-cols-1 gap-4 w-4/5">
          <button 
          className='justify-self-end' 
          onClick={onClickCancel}>
            Hủy
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className={`rounded ${canSubmit?'bg-mint-green hover:bg-opacity-50':'border-opacity-75'} md:h-12 h-10  border-2 w-full py-2 text-sm md:text-base md:w-2/3 md:py-3 justify-self-end`}
          >
            <span className={`text-xs md:text-base ${canSubmit?'':'opacity-75'}`}>
              <FontAwesomeIcon icon={faBookmark} /> Lưu
            </span>
          </button>
        </div>
      </div>
      <SuccessModal isVisible={showModal} onClose={closeModal} message='Cập nhật thành công' />
      <input type="hidden" {...register('dateOfBirth')} />
    </form>
  );
}
