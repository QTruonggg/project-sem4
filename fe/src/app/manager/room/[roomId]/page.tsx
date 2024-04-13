'use client';
import roomApi from '@/api/roomApi';
import { roomDetail } from '@/types/dashboardType';
import * as React from 'react';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { Breadcrumb, Image, message } from 'antd';
import LoadingPage from '@/Components/common/LoadingPage';
import { useRouter } from 'next/navigation';
export interface RoomDetailPageProps {
  params: { roomId: number; };
}

export default function RoomDetailPage({ params: { roomId } }: RoomDetailPageProps) {
  const [listRoom, setListRoom] = React.useState<roomDetail>();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, setValue } = useForm<roomDetail>({
    defaultValues: listRoom
  });

  React.useEffect(() => {
    setLoading(true);
    roomApi.getRoomDetail(roomId).then((value) => {
      setListRoom(value);
      setValue('roomName', value.roomName);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, [roomId, setValue]);

  const router = useRouter();
  const onSubmit: SubmitHandler<roomDetail> = async (data) => {
    let res = {
      ...data
    }
    try {
      setLoading(true);
      roomApi.updateRoom(roomId, res);
      const updateRoom = await roomApi.getRoomDetail(roomId);
      setListRoom(updateRoom);
      message.success('Cập nhật thành công');
      router.push('/manager/room');
    } catch (error) {

    } finally {
      setLoading(false);
    }

  };

  return (
    <form className="w-full max-w-full" onSubmit={handleSubmit(onSubmit)} method="PUT">
      {loading && <LoadingPage />}
      <div className="bg-white">
        <table className="justify-center">
          <thead>
            <tr>
              <th className="text-2xl font-bold">
                <Breadcrumb
                  items={[
                    {
                      href: '/manager/room',
                      title: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z" />
                          </svg>
                          <span className='pl-2'>Phòng</span>
                        </div>
                      ),
                    },
                    {
                      title: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className='font-bold'>{roomId}</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </th>
            </tr>
            <tr>
              <th className="text-2xl font-bold pt-5">
                Chi tiết phòng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Homestay</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.homestayCode}
              </td>
            </tr>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Loại phòng</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.roomTypeName}
              </td>
            </tr>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Tên phòng</td>
              <td className="py-2 whitespace-nowrap pl-20">
                <input required type="text" {...register('roomName')} className="border border-gray-300 px-2 py-1 rounded-md" />
              </td>
            </tr>

            {listRoom?.dorm === true ? (
              <tr>
                <td className="py-5 whitespace-nowrap font-semibold">Số chỗ</td>
                <td className="py-2 whitespace-nowrap pl-20">
                  {listRoom?.totalDormSlot}
                </td>
              </tr>
            ) : (
              <tr className='hidden'>
                <td className="py-5 whitespace-nowrap font-semibold">Số chỗ</td>
                <td className="py-2 whitespace-nowrap pl-20">
                  {listRoom?.totalDormSlot}
                </td>
              </tr>
            )}

            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Sức chứa tối đa</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.capacity}
              </td>
            </tr>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Giường đơn</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.singleBed}
              </td>
            </tr>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Giường đôi</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.doubleBed}
              </td>
            </tr>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Giá</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.price}
              </td>
            </tr>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Dịch vụ và trang thiết bị</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.facilities.map((item, index) => (
                  <div key={index}>{item.facilityName}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Chính sách trẻ em và nôi cũi</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.isChildrenAndBed ? "Có hỗ trợ" : "Không hỗ trợ"}
              </td>
            </tr>
            <tr>
              <td className="py-5 whitespace-nowrap font-semibold">Trạng thái</td>
              <td className="py-2 whitespace-nowrap pl-20">
                {listRoom?.roomStatus === 'ACTIVE' ? (
                  <span className="text-green-500">Đang hoạt động</span>
                ) : (
                  <span className="text-red-500">Ngừng hoạt động</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2 whitespace-nowrap font-semibold">Ảnh</td>
              <td className="py-2 whitespace-nowrap flex pl-20">
                {listRoom?.homestayMedias.map((item) => (
                  <div key={item.id} className="lg:w-1/4 pr-4 w-full">
                    <div className="aspect-w-4 aspect-h-3">
                      <a className="block relative rounded overflow-hidden">
                        <Image src={item.filePath} width={150} height={150} alt='' />
                      </a>
                    </div>
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-10">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Lưu
          </button>
        </div>
      </div>
    </form>

  );
}

