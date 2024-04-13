'use client';

import LoadingPage from '@/Components/common/LoadingPage';
import dormApi from '@/api/dormApi';
import { dormEditDto, dormInformationResponseDtoList } from '@/types/dashboardType';
import { Button, InputNumber, Modal, Popconfirm, message } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';


interface IRoomDormProps { }

const Dorm: React.FC<IRoomDormProps> = () => {

  const [roomdormData, setRoomDormData] = useState<dormInformationResponseDtoList[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    dormApi.getAllDorm().then((res) => {
      setRoomDormData(res.dormListForManager);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  const [selectedRoom, setSelectedRoom] = useState<dormInformationResponseDtoList>();
  const [inputNumberValue, setInputNumberValue] = useState<number>(selectedRoom?.totalDormSlot || 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const showModalDelete = (data: dormInformationResponseDtoList) => {
    setSelectedRoom(data);
    setIsModalOpen(true);
  };

  const showAddModal = (data: dormInformationResponseDtoList) => {
    setSelectedRoom(data);
    setIsModalOpenAdd(true);
  };

  const handleDelete = async () => {
    if (isDeleting) {
      const deleteDormSlot: dormEditDto = {
        roomId: selectedRoom?.roomId || 0,
        numberOfSlots: inputNumberValue,
      };
      try {
        setIsModalOpen(false);
        setLoading(true);
        await dormApi.deleteDormSlot(deleteDormSlot);
        const updatedData = await dormApi.getAllDorm();
        message.success('Xóa chỗ dorm thành công');
        setRoomDormData(updatedData.dormListForManager);
      } catch (error) {
        message.error('Xóa chỗ dorm không thành công');
      } finally {
        setLoading(false);
      }
    }
    setIsModalOpen(false);
  };

  const handleAdd = async () => {
    if (isAdding) {
      const addDormSlot: dormEditDto = {
        roomId: selectedRoom?.roomId || 0,
        numberOfSlots: inputNumberValue,
      };
      try {
        setIsModalOpenAdd(false);
        setLoading(true);
        await dormApi.addDormSlot(addDormSlot);
        console.log('Thêm chỗ dorm thành công');
        const updatedData = await dormApi.getAllDorm();
        message.success('Thêm chỗ dorm thành công');
        setRoomDormData(updatedData.dormListForManager);
      } catch (error) {
        message.error('Thêm chỗ dorm không thành công');
      } finally {
        setLoading(false);
      }
    }
    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (value: any) => {
    setInputNumberValue(value);
  };

  const handleDeleteRoom = async (id: number) => {
    try {
      ;
      setLoading(true);
      await dormApi.deleteDorm(id);
      const updatedList = await dormApi.getAllDorm();
      setRoomDormData(updatedList.dormListForManager);
      message.success('Xoá thành công');

    } catch (error) {
      message.error('Xoá không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingPage />}
      <div className='flex space-x-3'>
          <p className="bg-blue-500  mb-10 text-white py-3 px-4 rounded-md shadow-md w-42">Tổng số phòng : {roomdormData.length}</p>
          <Link href="/manager/room-dorm/add-room-dorm" className=' bg-blue-500 hover:bg-blue-600 mb-10 text-white py-3 px-4 rounded-md shadow-md'>+ Thêm phòng</Link>
        </div>
      <div className="relative overflow-x-auto shadow-md shadow-gray-300 sm:rounded-xl mr-10">
        <table className="w-full text-sm text-left">
          <thead className="text-sm text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="px-10 py-4">
                #
              </th>
              <th scope="col" className="px-10 py-4">
                Homestay
              </th>
              <th scope="col" className="px-10 py-4">
                Tên phòng
              </th>
              <th scope="col" className="px-10 py-4">
                Số chỗ
              </th>
              <th scope="col" className="px-10 py-4">
                Giá
              </th>
              <th scope="col" className="px-5 py-4">
                Xóa chỗ
              </th>
              <th scope="col" className="py-4">
                Thêm chỗ
              </th>
              <th scope="col" className="py-4">
                Xóa phòng
              </th>
            </tr>
          </thead>
          <tbody>
            {roomdormData.map((list, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-16 py-4">
                  {list.homestayCode}
                </td>
                <td className="px-16 py-4">
                  {list.roomName}
                </td>
                <td className="px-16 py-4">
                  {list.totalDormSlot}
                </td>
                <td className="px-10 py-4">
                  {list.price}
                </td>
                <td className="px-5 py-4">
                  <Button danger onClick={() => { showModalDelete(list), setIsDeleting(true) }}>
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                    </svg>

                  </Button>
                  <Modal title="Xóa chỗ dorm" okText='Delete' okType='danger' open={isModalOpen} onOk={handleDelete} onCancel={handleCancel}>
                    <table className='justify-center'>
                      <tbody>
                        <tr>
                          <td className="py-4 whitespace-nowrap">Homestay</td>
                          <td className="py-4 whitespace-nowrap pl-20">{selectedRoom?.homestayCode}</td>
                        </tr>
                        <tr>
                          <td className="py-4 whitespace-nowrap">Tên phòng</td>
                          <td className="py-4 whitespace-nowrap pl-20">{selectedRoom?.roomName}</td>
                        </tr>
                        <tr>
                          <td className="py-4 whitespace-nowrap">Slot cần xóa</td>
                          <td className="py-4 whitespace-nowrap pl-20">
                            <InputNumber min={1} max={selectedRoom?.totalDormSlot} onChange={(value) => onChange(value)} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Modal>
                </td>
                <td className="px-4 py-4">
                  <Button className='text-green-500 ring-1 border-none ring-green-500' onClick={() => { showAddModal(list), setIsAdding(true) }} >
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                    </svg>
                  </Button>
                  <Modal title="Thêm chỗ dorm" okText='Save' okType='dashed' open={isModalOpenAdd} onOk={handleAdd} onCancel={handleCancelAdd}>
                    <table className='justify-center'>
                      <tbody>
                        <tr>
                          <td className="py-4 whitespace-nowrap">Homestay</td>
                          <td className="py-4 whitespace-nowrap pl-20">{selectedRoom?.homestayCode}</td>
                        </tr>
                        <tr>
                          <td className="py-4 whitespace-nowrap">Tên phòng</td>
                          <td className="py-4 whitespace-nowrap pl-20">{selectedRoom?.roomName}</td>
                        </tr>
                        <tr>
                          <td className="py-4 whitespace-nowrap">Slot cần thêm</td>
                          <td className="py-4 whitespace-nowrap pl-20">
                            <InputNumber min={1} max={50} defaultValue={1} onChange={(value) => onChange(value)} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Modal>
                </td>
                <td className='px-4 py-4'>
                  <Popconfirm
                    title="Xoá Phòng Dorm"
                    description="Bạn chắc chắn muốn xóa phòng này?"
                    okType='danger'
                    okText={<span style={{ color: '' }}>Có</span>}
                    cancelText="Không"
                    onConfirm={() => handleDeleteRoom(list.roomId)}
                  >
                    <Button className='' danger style={{ border: 'none' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </Button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dorm;