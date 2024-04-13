'use client';
import roomApi from '@/api/roomApi';
import { IRoomInformation } from '@/types/dashboardType';
import React, { useState } from 'react';
import { Badge, Popconfirm, Button, Pagination, Tag, InputRef, Input, Space, Table, message } from 'antd';
import Link from 'next/link';
import { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import LoadingPage from '@/Components/common/LoadingPage';
interface IRoomProps {
  key: number;
  id: number;
  capacity: number;
  homestayCode: string;
  roomName: string;
  roomTypeName: string;
  price: number;
  roomStatus: string;
}

type DataIndex = keyof IRoomProps;

const Room: React.FC<IRoomProps> = () => {
  const [roomData, setRoomData] = useState<IRoomInformation[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef<InputRef>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    roomApi.getAllRoom().then((res) => {
      setRoomData(res.roomListForManager);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  const handleDeleteRoom = async (id: number) => {
    try {
      setLoading(true);
      await roomApi.deleteRoom(id);
      const updatedList = await roomApi.getAllRoom();
      setRoomData(updatedList.roomListForManager);
      message.success('Xoá thành công');
    } catch (error) {
      message.error('Xoá không thành công');
    }finally{
      setLoading(false);
    }
  };

  const handleDeactiveRoom = async (id: number) => {
    try {
      setLoading(true);
      await roomApi.deactiveRoom(id);
      const updatedList = await roomApi.getAllRoom();
      setRoomData(updatedList.roomListForManager);
      message.success('Đổi trạng thái phòng thành công');
    } catch (error) {
      message.error('Đổi trạng tháig không thành công');
    }finally{
      setLoading(false);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IRoomProps> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const data: IRoomProps[] = [];
  {
    roomData?.map((item, index) => {
      return data.push({
        key: index + 1,
        id: item.id,
        capacity: item.capacity,
        homestayCode: item.homestayCode,
        roomName: item.roomName,
        roomTypeName: item.roomTypeName,
        price: item.price,
        roomStatus: item.roomStatus,
      });
    })
  }

  const columns: ColumnsType<IRoomProps> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Homestay',
      dataIndex: 'homestayCode',
      key: 'homestayCode',
      ...getColumnSearchProps('homestayCode'),
    },
    {
      title: 'Loại phòng',
      dataIndex: 'roomTypeName',
      key: 'roomTypeName',

    },
    {
      title: 'Tên phòng',
      dataIndex: 'roomName',
      key: 'roomName',
      ...getColumnSearchProps('roomName'),
    },
    {
      title: ' Sức chứa',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: ' Trạng thái',
      dataIndex: 'roomStatus',
      key: 'roomStatus',
      render: (text, record) => (
        record.roomStatus === 'ACTIVE' ? <Badge status='success' text="Đang hoạt động"></Badge> : <Badge status='warning' text="Đã ẩn trên web"></Badge>
      )
    },
    {
      title: ' Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <Tag color='green'>{record.price.toLocaleString('vi-VI')} VNĐ</Tag>
      )
    },
    {
      title: ' Chi tiết',
      key: 'detail',
      render: (text, record) => (
        <Link className='text-blue-500' href={`/manager/room/${record.id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </Link>
      )
    },
    {
      key: 'delete',
      render: (text, record) => (
        <Popconfirm
          title="Xoá Sản Phẩm"
          description="Bạn chắc chắn muốn xóa phòng này?"
          okType='danger'
          okText={<span style={{ color: '' }}>Có</span>}
          cancelText="Không"
          onConfirm={() => handleDeleteRoom(record.id)}
        >
          <Button className='' danger style={{ border: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </Button>
        </Popconfirm>
      )
    },
    {
      key: 'deactive',
      render: (text, record) => (
        record.roomStatus === 'ACTIVE' ?
          <button
            className=''
            onClick={() => handleDeactiveRoom(record.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          :
          <button
            className=''
            onClick={() => handleDeactiveRoom(record.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          </button>
      )
    },
  ];
  return (
    <>
     {loading && <LoadingPage />}
      <div className='justify-between flex'>
        <div>
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Nhập loại phòng</label>
          <div className="relative">
          </div>
        </div>
        <div className='flex space-x-3'>
          <Link href="/manager/room/add-room" className=' bg-blue-500 mb-10 text-white py-3 px-4 rounded-md shadow-md'>+ Thêm phòng</Link>
          <p className="bg-blue-500 mb-10 text-white py-3 px-4 rounded-md shadow-md w-42">Tổng số phòng : {roomData.length}</p>
        </div>
      </div>
      <div className='border border-gray-300 rounded-md'>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};
export default Room;