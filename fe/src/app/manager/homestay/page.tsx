'use client';
import * as React from 'react';
import { IhomestayManagerList } from '@/types/dashboardType';
import homestayApi from '@/api/homestayApi';
import { Badge, Popconfirm, Button, message } from 'antd';
import Link from 'next/link';
import LoadingPage from '@/Components/common/LoadingPage';



export interface IHomestayProps { }

export default function HomestayPage(props: IHomestayProps) {
  const [listHomestay, setListHomestay] = React.useState<IhomestayManagerList[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    homestayApi.getAllHomestay().then((res) => {
      setListHomestay(res.homestayListForManager);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  const handleDeleteHomestay = async (id: number) => {

    try {
      setLoading(true);
      await homestayApi.deleteHomestay(id);
      const updatedList = await homestayApi.getAllHomestay();
      setListHomestay(updatedList.homestayListForManager);
      message.success('Xoá homestay thành công');
    } catch (error) {
    }finally{
      setLoading(false);
    }
  };

  const handleDeactiveHomestay = async (id: number) => {
    try {
      setLoading(true);
      await homestayApi.deactiveHomestay(id);
      const updatedList = await homestayApi.getAllHomestay();
      setListHomestay(updatedList.homestayListForManager);
      message.success('Đổi trạng thái homestay thành công');
    } catch (error) {
      console.error('Error deacting homestay:', error);
    }finally{
      setLoading(false);
    }

  };
  return (
    <>
      {loading && <LoadingPage />}
      <div className='px-8 pt-5'>
        <p className="bg-blue-500 mb-10 text-white py-3 px-4 rounded-md shadow-md w-48">Tổng số homestay: {listHomestay.length}</p>
      </div>
      <div className="relative overflow-x-auto shadow-md shadow-gray-300 sm:rounded-xl mx-8">
        <table className="w-full text-sm text-left">
          <thead className="text-sm text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="py-4 text-center">
                Mã homestay
              </th>
              <th scope="col" className="py-4 text-center">
                Số phòng
              </th>
              <th scope="col" className="py-4 text-center">
                Số dorm
              </th>
              <th scope="col" className="py-4 text-center">
                Trạng thái
              </th>
              <th scope="col" className="py-4 text-center">
                Chỉnh sửa
              </th>
              <th scope="col" className="py-4 text-center">
                Xoá
              </th>
              <th scope="col" className="px-5 py-4 text-center">
                Ẩn
              </th>
            </tr>
          </thead>
          <tbody>
            {listHomestay.map((list, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="text-center px-10 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {list.homestayCode}
                </th>
                <td className="py-2 text-center">
                  {list.totalRoom}
                </td>
                <td className="py-2 text-center">
                  {list.totalDorm}
                </td>
                <td className="py-2 text-center">
                  {list.homestayStatus === 'ACTIVE' ? <Badge status="success" text="Đang hoạt động" /> : <Badge status="warning" text="Đã ẩn trên web" />}
                </td>
                <td className="py-2 text-center">
                  <button className='text-blue-500'>
                    <Link href={'/manager/homestay/' + list.homestayId}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </Link>
                  </button>
                </td>
                <td className="py-2 text-center">
                  <Popconfirm
                    title="Xoá homestay"
                    description="Bạn chắc chắn muốn xoá homestay này?"
                    okType='danger'
                    okText={<span style={{ color: '' }}>Có</span>}
                    cancelText="Không"
                    onConfirm={() => handleDeleteHomestay(list.homestayId)}
                  >
                    <Button danger>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </Button>
                  </Popconfirm>
                </td>
                <td className="py-2 text-center">
                  {
                    list.homestayStatus === 'ACTIVE' ?
                      (<button onClick={() => handleDeactiveHomestay(list.homestayId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>) :
                      (
                        <button onClick={() => handleDeactiveHomestay(list.homestayId)}>

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>

                        </button>
                      )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>


  );
}
