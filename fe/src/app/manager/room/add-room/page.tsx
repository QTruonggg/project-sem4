'use client';
import LoadingPage from '@/Components/common/LoadingPage';
import homestayApi from '@/api/homestayApi';
import roomApi from '@/api/roomApi';
import { IGetRoomInformationToAdd, Passenger, responseRoomInformation, roomType } from '@/types/dashboardType';
import { Breadcrumb, Input, Tag, message } from 'antd';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { SubmitHandler, set, useForm } from 'react-hook-form';

export interface IAddRoomProps {
}

export default function AddRoom(props: IAddRoomProps) {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [selectedOptionRoom, setSelectedOptionRoom] = React.useState('');
  const [roomData, setRoomData] = React.useState<IGetRoomInformationToAdd>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);



  React.useEffect(() => {
    setLoading(true);
    roomApi.getRoomInformationToAdd().then((res) => {
      setRoomData(res);
      setSelectedOption(res.homestay[0]?.homestayCode || '');
      setSelectedOptionRoom(res.roomType[0]?.roomTypeName || '');
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = (e: any) => {
    e.preventDefault();
    toggleDropdown();
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleRoomTypeDropdownClick = (e: any) => {
    e.preventDefault();
    toggleRoomTypeDropdown();
  };

  const selectRoomTypeOption = (option: string) => {
    setSelectedOptionRoom(option);
    setIsRoomTypeOpen(false);

  };

  const [isRoomTypeOpen, setIsRoomTypeOpen] = React.useState(false);

  const toggleRoomTypeDropdown = () => {
    setIsRoomTypeOpen(!isRoomTypeOpen);
  };


  const [passengers, setPassengers] = React.useState<Passenger[]>([{ name: '' }]);

  const handleInputChange = (
    index: number,
    value: string
  ) => {
    const updatedPassengers = passengers.map((passenger, i) => {
      if (i === index) {
        return { ...passenger, name: value };
      }
      return passenger;
    });
    setPassengers(updatedPassengers);
  };

  const addPassenger = (e: any) => {
    e.preventDefault();
    setPassengers([...passengers, { name: '' }]);
  };

  const removePassenger = (index: number, e: any) => {
    e.preventDefault();
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };


  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<responseRoomInformation>({

  });
  const router = useRouter();
  const onSubmit: SubmitHandler<responseRoomInformation> = async (data) => {
    const selectedHomestay = roomData?.homestay.find((items) => items.homestayCode === selectedOption);
    if (selectedHomestay) {
      const { id } = selectedHomestay;
      data.homestayId = id;
    }

    const selectedRoomType = roomData?.roomType.find((items) => items.roomTypeName === selectedOptionRoom);
    if (selectedRoomType) {
      const { id } = selectedRoomType;
      data.householdRoomTypeId = id;
    }

    const res: responseRoomInformation = {
      ...data,
      homestayId: data.homestayId,
      householdRoomTypeId: data.householdRoomTypeId,
      roomNameList: passengers.map((passenger) => passenger.name),

    }
    try{
      setLoading(true);
      await roomApi.addRoom(res);
      const updateData = await roomApi.getRoomInformationToAdd();
      setRoomData(updateData);
      message.success('Thêm phòng thành công');
      router.push('/manager/room');
    }catch(err){
      console.log(err);
      message.error('Thêm phòng thất bại');
    }finally{
      reset();
      setPassengers([{ name: '' }]);
      setLoading(false);
    }
    
  }


  const breadcrumbItems = [
    {
      href: '/manager/room',
      title: (
        <>
          <button style={{ display: 'flex', alignItems: 'center' }} className='hover:font-semibold text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
              <path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z" />
            </svg>
            <span className='pl-2'>Phòng</span>
          </button>
        </>
      ),
    },
    {
      title: <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className='font-bold'>Thêm phòng</span>
      </div>,
    },
  ];

  return (
    <>
      {loading && <LoadingPage />}
      <Breadcrumb>
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            onClick={() => {
              if (item.href) {
                router.push(item.href);
              }
            }}
          >
            {item.title}
          </Breadcrumb.Item>
        ))}

      </Breadcrumb>
      <form className="w-full max-w-full pl-5" onSubmit={handleSubmit(onSubmit)}>
        <div className='text-2xl mb-6 font-semibold pt-10'>
          <h1>Thêm phòng</h1>
        </div>

        <div className='md: flex mb-4'>
          <div className='w-1/3 font-semibold'>
            <p>Homestay</p>
          </div>
          <div className='w-2/3'>
            <div className="relative" style={{ zIndex: 1 }}>
              <button
                className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                onClick={handleDropdownClick}
              >
                <span>{selectedOption}</span>
                <svg
                  className="fill-current h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                    className={`fill-current ${isOpen ? 'text-gray-600' : 'text-gray-400'}`}
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute mt-1 py-2 w-40 bg-white rounded-md shadow-lg overflow-y-auto max-h-48">
                  {roomData?.homestay.map((option) => (
                    <button
                      key={option.id}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                      onClick={() => selectOption(option.homestayCode)}
                    >
                      {option.homestayCode}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='md: flex mb-4'>
          <div className='w-1/3 font-semibold'>
            <p>Loại phòng</p>
          </div>
          <div className='w-2/3'>
            <div className="relative">
              <button
                className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                onClick={handleRoomTypeDropdownClick}
              >
                <span>{selectedOptionRoom}</span>
                <svg
                  className="fill-current h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                    className={`fill-current ${isRoomTypeOpen ? 'text-gray-600' : 'text-gray-400'}`}
                  />
                </svg>
              </button>
              {isRoomTypeOpen && (
                <div className="absolute mt-1 py-2 w-48 bg-white rounded-md shadow-lg overflow-y-auto max-h-48">
                  {roomData?.roomType.map((option) => (
                    <button
                      key={option.id}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                      onClick={() => selectRoomTypeOption(option.roomTypeName)}
                    >
                      {option.roomTypeName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {roomData && (
          <div className='md: flex mb-6'>
            <div className='w-1/3 font-semibold mb-3'>
              <p>Giường đơn</p>
            </div>
            <div className='w-2/3'>
              {roomData.roomType.find((roomType) => roomType.roomTypeName === selectedOptionRoom)?.singleBed}
            </div>
          </div>
        )}

        {roomData && (
          <div className='md: flex mb-4'>
            <div className='w-1/3 font-semibold mb-5'>
              <p>Giường đôi</p>
            </div>
            <div className='w-2/3'>
              {roomData.roomType.find((roomType) => roomType.roomTypeName === selectedOptionRoom)?.doubleBed}
            </div>
          </div>
        )}
        <div className='md: flex mb-4'>
          <div className='w-1/3 font-semibold mb-5'>
            <p>Giá</p>
          </div>
          <div className='w-2/3'>
            <Tag color='success'>
              {roomData?.roomType.find((roomType) => roomType.roomTypeName === selectedOptionRoom)?.price} VNĐ
            </Tag>
          </div>
        </div>
        <div className='md: flex mb-4'>
          <div className='w-1/3 font-semibold mb-5'>
            <p>Số lượng người</p>
          </div>
          <div className='w-2/3'>
            {roomData?.roomType.find((roomType) => roomType.roomTypeName === selectedOptionRoom)?.capacity}
          </div>
        </div>
        <div className='md: flex mb-4'>
          <div className='w-1/3 font-semibold mb-4'>
            <p>Tên phòng  <span className="text-red-500">*</span></p>
          </div>
          <div className='w-2/3'>
            {passengers.map((passenger, index) => (
              <div key={index} className="flex mb-4">
                <Input
                  required
                  type="text"
                  placeholder="Nhập tên phòng"
                  className="border border-gray-300 px-2 py-1 rounded-md w-1/5"
                  value={passenger.name}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                {index > 0 && (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2"
                    onClick={(e) => removePassenger(index, e)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              className="items-center bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              onClick={addPassenger}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Thêm toàn bộ phòng
          </button>
        </div>
      </form>
    </>
  );
}