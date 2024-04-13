'use client';
import LoadingPage from '@/Components/common/LoadingPage';
import bookingManagerApi from '@/api/bookingManagerApi';
import { IGetDropDownBookingResponse, searchRoomEmptyResponse } from '@/types/dashboardType';
import * as sessionStorage from '@/utils/sessionStorage';
import { getSession } from '@/utils/sessionStorage';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { DatePickerProps } from 'antd';
import { DatePicker, InputNumber, Space } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import Link from 'next/link';
import * as React from 'react';

export interface IOverViewBookingProps {
  key: React.Key,
  homestayId: number,
  homestayName: string,
  householdRoomTypeId: number,
  householdRoomTypeName: string,
  totalSlotDefault: number,
  totalSlotSelected: number,
  roomId: number,
  roomName: string,
  capacity: number,
  singleBed: number,
  doubleBed: number,
  price: number,
  isDorm: boolean,
}

const columns: ColumnsType<IOverViewBookingProps> = [
  { title: 'Phòng', dataIndex: 'roomName', },
  {
    title: 'Loại phòng', dataIndex: 'householdRoomTypeName',
    filters: [
      {
        text: 'Phòng thường',
        value: false,
      },
      {
        text: 'Phòng dorm',
        value: true,
      },
    ],
    onFilter: (value, record) => record.isDorm.valueOf() === value,
  },
  { title: 'Slot còn trống', dataIndex: 'totalSlotDefault', },
  { title: 'Homestay', dataIndex: 'homestayName', },
  { title: 'Sức chứa', dataIndex: 'capacity', },
  { title: 'Giường đơn', dataIndex: 'singleBed', },
  { title: 'Giường đôi', dataIndex: 'doubleBed', },
  {
    title: 'Giá phòng', dataIndex: 'price', render: (price) => {
      return (
        <span>{price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
      );
    }
  },
];

export default function OverViewBooking(props: IOverViewBookingProps) {

  const [loading, setLoading] = React.useState(false);
  const today = dayjs().startOf('day');

  const disabledDate = (current: any) => {
    return current && current < today;
  };

  const [dateCheckin, setDateCheckin] = React.useState<string>(today.format('YYYY-MM-DD'));
  const checkinDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDateCheckin(dateString);
  };

  const [dateCheckout, setDateCheckout] = React.useState<string>(today.add(1, 'day').format('YYYY-MM-DD'));
  const checkoutDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDateCheckout(dateString);
  };

  sessionStorage.setSession('checkinDate', dateCheckin || '');
  sessionStorage.setSession('checkoutDate', dateCheckout || '');

  const [dropdownHomestay, setDropdownHomestay] = React.useState<IGetDropDownBookingResponse>();
  React.useEffect(() => {
    setLoading(true);
    bookingManagerApi.getDropDownBooking().then((res) => {
      return setDropdownHomestay(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  const [selectedHomestayId, setSelectedHomestayId] = React.useState<number>();
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    const selectHomestay = dropdownHomestay?.homestays.find(item => item.homestayCode === selectedValue);
    const selectHomestayId = selectHomestay?.homestayId;
    setSelectedHomestayId(selectHomestayId);
  };

  const [searchRoom, setSearchRoom] = React.useState<searchRoomEmptyResponse>();
  const handleClick = (event: any) => {
    event.preventDefault();
    if (dateCheckin && dateCheckout && selectedHomestayId != null) {
      setLoading(true);
      bookingManagerApi.searchRoomEmptyById(selectedHomestayId, dateCheckin, dateCheckout).then((response) => {
        setSearchRoom(response);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      })
    } else {
      bookingManagerApi.searchRoomEmpty(dateCheckin, dateCheckout)
        .then((response) => {
          setSearchRoom(response);
        })
        .catch((error) => {
        });
    }
  };

  const data: IOverViewBookingProps[] = [];
  {
    searchRoom?.rooms.map((item, index) => {
      data.push({
        key: index,
        homestayId: item.homestayId,
        homestayName: `${item.homestayName}`,
        householdRoomTypeId: item.householdRoomTypeId,
        householdRoomTypeName: `${item.householdRoomTypeName}`,
        totalSlotDefault: item.totalSlotDefault,
        totalSlotSelected: item.totalSlotSelected,
        roomId: item.roomId,
        roomName: `${item.roomName}`,
        capacity: item.capacity,
        singleBed: item.singleBed,
        doubleBed: item.doubleBed,
        price: item.price,
        isDorm: item.isDorm,
      });
    })
  }

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  // const [selectedDorms, setSelectedDorms] = React.useState<IOverViewBookingProps[]>([]);

  //Lấy dữ liệu input từ đây rồi nhét vào trong mảng
  const [selectedData, setSelectedData] = React.useState<IOverViewBookingProps[]>([]);

  React.useEffect(() => {
    // Lấy selectedData từ lưu trữ phiên khi thành phần được nạp lên
    const storedSelectedData = getSession('selectedData') || '[]';
    setSelectedData(storedSelectedData);
  }, []);

  React.useEffect(() => {
    // Lưu selectedData vào lưu trữ phiên mỗi khi nó thay đổi
    sessionStorage.setSession('selectedData', selectedData);
  }, [selectedData]);
 
  const handleTotalDormSlot = (value: number, data: IOverViewBookingProps) => {
   
    let currentRooms: IOverViewBookingProps[] = [];

    for (let i = 0; i < selectedData.length; i++) {
      let currentRoom = selectedData[i];
      if (currentRoom.key === data.key) {
        currentRoom.totalSlotSelected = value;
      }
      currentRooms.push(currentRoom);
    }
    // console.log(currentRooms);
    setSelectedData(currentRooms);
  }

  // Hàm xử lý khi người dùng thay đổi lựa chọn các phòng
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: IOverViewBookingProps[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    if (selectedData.length === 0) {
      const selectedData = selectedRows.filter((row) => newSelectedRowKeys.includes(row.key));
      setSelectedData(selectedData);
    } else {
      const selectedDataCopy = [...selectedData];
      for (const newRow of selectedRows) {
        // Kiểm tra xem phần tử đó đã tồn tại trong selectedData hay chưa
        const existingData = selectedDataCopy.find((row) => row.key === newRow.key);
        if (!existingData) {
          // Nếu chưa tồn tại, thêm phần tử đó vào selectedData
          selectedDataCopy.push(newRow);
        }
      }
      setSelectedData(selectedDataCopy);

      for (const existingRow of selectedData) {
        // Kiểm tra xem phần tử đó đã được chọn hay chưa
        const existingRowIsSelected = newSelectedRowKeys.includes(existingRow.key);
        if (!existingRowIsSelected) {
          // Nếu chưa được chọn, xóa phần tử đó khỏi selectedData
          const index = selectedDataCopy.findIndex((row) => row.key === existingRow.key);
          selectedDataCopy.splice(index, 1);
        }
      }
      setSelectedData(selectedDataCopy);
    }
  };
  sessionStorage.setSession('selectedData', selectedData);

  const rowSelection: TableRowSelection<IOverViewBookingProps> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div className='relative w-full mt-10'>
        {loading && <LoadingPage />}
        <form>
          <div className='rounded-b-xl text-black 
            text-center'>
            <h2 className='mb-5 text-2xl font-semibold'>Tìm kiếm phòng trống</h2>
          </div>
          <div className="w-full h-full flex justify-center items-center rounded-2xl">
            <div className="bg-white p-10 pt-3 rounded-2xl shadow-lg md:w-4/5 justify-center">
              <div className="grid grid-cols-11 gap-6 mt-10">
                <div className='col-span-3'>
                  <div className='w-full md:my-0 mb-6 h-full relative'>
                    <label
                      htmlFor='Date'
                      className='block absolute text-sm z-50 -top-3 left-3 bg-white px-2 text-gray-500'
                    >
                      Homestay
                    </label>
                    <div className='w-full h-full'>
                      <select onChange={handleDropdownChange} className="w-full h-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent">
                        <option value="all">Tất cả các homestay</option>
                        {dropdownHomestay?.homestays?.map((item) => {
                          return (
                            <option key={item.homestayId} value={item.homestayCode}>
                              {item.homestayCode}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className='col-span-3'>
                  <div className='w-full md:my-0 mb-6 h-full relative'>
                    <label
                      htmlFor='Date'
                      className='block absolute text-sm z-50 -top-3 left-3 bg-white px-2 text-gray-500'
                    >
                      Ngày đến
                    </label>
                    <div className='w-full h-full'>
                      <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
                        <DatePicker disabledDate={disabledDate}
                          style={{ width: '100%', height: '50px' }}
                          className='w-full h-full'
                          value={dayjs(dateCheckin)}
                          onChange={checkinDate} />
                      </Space>

                    </div>
                  </div>
                </div>

                <div className='col-span-3'>
                  <div className='w-full md:my-0 mb-6 h-full relative'>
                    <label
                      htmlFor='Date'
                      className='block absolute text-sm z-50 -top-3 left-3 bg-white px-2 text-gray-500'
                    >
                      Ngày đi
                    </label>
                    <div className='w-full h-full'>
                      <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
                        <DatePicker disabledDate={disabledDate}
                          style={{ width: '100%', height: '50px' }}
                          className='w-full h-full'
                          value={dayjs(dateCheckout)}
                          onChange={checkoutDate} />
                      </Space>
                    </div>
                  </div>
                </div>

                <div className='col-span-2 text-white'>
                  <button
                    type="submit"
                    className='rounded-lg md:h-12 bg-blue-500 h-full w-full py-2 text-sm md:text-base md:py-3'
                    onClick={handleClick}
                  >
                    <span className='text-xs md:text-base items-center'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} className="hidden md:inline-block" /> Tìm kiếm
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div className=' bg-blue-500 mt-10 mb-5 text-white py-3 px-4 rounded-md shadow-md w-48 ml-5'>
            <p>Số phòng đã chọn: {selectedRowKeys.length}</p>
          </div>

          <div className='mt-10 mb-10 rounded-lg'>
            <Table style={{ marginLeft: '20px', marginRight: '20px', border: '1px solid lightgray', borderRadius: '5px' }}
              rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>

          <div className=' bg-blue-500 float-right hover:bg-blue-600 text-center mb-10 py-3 px-4 rounded-md shadow-md w-32 mr-5'>
            {dateCheckin && dateCheckout && selectedRowKeys.length ? (
              <Link href='/manager/booking' className='text-white'>Đặt phòng</Link>
            ) : (
              <span className='text-gray-400 cursor-not-allowed'>Đặt phòng</span>
            )}

          </div>

          <div>
            {selectedData?.map((data, index) => (
              <div key={index} className="m-5">
                <table className='justify-center'>
                  <tbody>
                    {data.isDorm && (
                      <tr>
                        <td className="whitespace-nowrap">
                          Bạn muốn đặt
                          <InputNumber
                            min={1}
                            max={data.totalSlotDefault}
                            defaultValue={1}
                            onChange={(value) => handleTotalDormSlot(value as number, data)}
                          />
                          slot ở dorm {data.roomName}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </form>
      </div>

    </>
  );
}


