'use client';
import { Card, Col, Row, Tag } from 'antd';
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dashboardApi from '@/api/dashboardApi';
import { DashboardAdmin } from '@/types/dashboard';
import Image from 'next/image';
import LoadingPage from '@/Components/common/LoadingPage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export interface IDashboardProps {
}

export default function Dashboard(props: IDashboardProps) {
  const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK 
  const onFinish: CountdownProps['onFinish'] = () => {
    console.log('finished!');
  };
  const [loading, setLoading] = React.useState(false);

  const formatDateTime = (dateTimeString: string | null) => {
    if (dateTimeString === null) {
      return '';
    }
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const onChange: CountdownProps['onChange'] = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };
  const [dataDashboard, setDataDashboard] = React.useState<DashboardAdmin>();
  React.useEffect(() => {
    setLoading(true);
    dashboardApi.getDashboardAdminInformatiuon().then((res) => {
      return setDataDashboard(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  //Bar Chart

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;

    console.log(selectedValue);

    if (selectedValue === "thisyear") {
      setChartData({
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [
          {
            label: 'Sales $',
            data: dataDashboard?.getTotalGuestByMonthForThisYear,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.4)', // Chỉnh sửa tại đây
          },
        ],
      } as any);

    } else if (selectedValue === "lastyear") {
      setChartData({
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [
          {
            label: 'Sales $',
            data: dataDashboard?.getTotalGuestByMonthForLastYear,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.4)', // Chỉnh sửa tại đây
          },
        ],
      } as any);
    }
  };


  React.useEffect(() => {
    setChartData({
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      datasets: [
        {
          label: 'Khách',
          data: dataDashboard?.getTotalGuestByMonthForThisYear,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.4)', // Chỉnh sửa tại đây
        },
      ],
    } as any);
    setChartOptions({
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Tổng lượt khách lưu trú tại các homestay đang hoạt động tại V-HomeStay'
        }

      },
      maintainAspectRatio: false,
      responsive: true
    })

  }, [setChartData, setChartOptions])



  const [nameFromSession, setNameFromSession] = React.useState<string | null>(null);
  React.useEffect(() => {
    const dataFromSession = window.sessionStorage.getItem('selectedHousehold');
    if (dataFromSession) {
      const parsedData = JSON.parse(dataFromSession);

      const name = parsedData.customerName; // Thay 'name' bằng tên thuộc tính bạn quan tâm
      setNameFromSession(name);
    }
  }, []);

  return (
    <>
      {loading && <LoadingPage />}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-5 py-2'>
        <Col flex="1 1 450px">
          <Card style={{ width: '100%', border: '1px solid lightgrey' }} bodyStyle={{ padding: '10px' }}>
            <p className='font-semibold'>Dashboard</p>
            <p className='text-sm text-gray-400'>Hệ thống quản lý và đặt phòng V-HomeStay</p>
          </Card>
        </Col>
        <Col flex="0 1 400px">
          <Card style={{ width: '100%', border: '1px solid lightgrey' }} bodyStyle={{ padding: '10px' }}>
            <p className='font-semibold'>Hoạt động</p>
            <p className='text-sm text-gray-400'>Giải quyết các yêu cầu</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-5'>
        <Col flex="1 1 450px">
          <div className='text-center overflow-hidden rounded-b-xl bg-cover bg-[url("/images/dashboard.jpg")] h-60'>
            <div className='mx-auto justify-center w-96 mt-16'>
              <p className='text-base'>Chào {nameFromSession} (Quản trị viên)</p>
              <p className='font-semibold text-xl'>V-HomeStay xin chào!</p>
              <p className='italic mt-2'>Nhiệt độ bây giờ ở V-HomeStay là {dataDashboard?.temperature} độ C, {dataDashboard?.weather}.
                Chúc bạn có một ngày làm việc vui vẻ và hạnh phúc!</p>
            </div>
          </div>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='pb-5 mt-5'>
            <Col span={6}>
              <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                <div className='flex items-center'>
                  <p className='font-semibold pb-1' style={{ flex: 1 }}>Khu</p>
                  <Tag color='success' style={{ fontSize: '10px' }}>
                    Hoạt động
                  </Tag>
                </div>
                <p className='text-4xl font-bold pb-1'>{dataDashboard?.totalArea}</p>
                <p className='text-gray-500' style={{ fontSize: '12px' }}>Khu</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                <div className='flex items-center'>
                  <p className='font-semibold pb-1' style={{ flex: 1 }}>Hộ KD</p>
                  <Tag color='success' style={{ fontSize: '10px' }}>
                    Hoạt động
                  </Tag>
                </div>
                <p className='text-4xl font-bold pb-1'>{dataDashboard?.totalHousehold}</p>
                <p className='text-gray-500' style={{ fontSize: '12px' }}>Hộ kinh doanh</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                <div className='flex items-center'>
                  <p className='font-semibold pb-1' style={{ flex: 1 }}>Homestay</p>
                  <Tag color='success' style={{ fontSize: '10px' }}>
                    Hoạt động
                  </Tag>
                </div>
                <p className='text-4xl font-bold pb-1'>{dataDashboard?.totalHomestay}</p>
                <p className='text-gray-500' style={{ fontSize: '12px' }}>Căn homestay</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                <div className='flex items-center'>
                  <p className='font-semibold pb-1' style={{ flex: 1 }}>Loại phòng</p>
                  <Tag color='success' style={{ fontSize: '10px' }}>
                    Hoạt động
                  </Tag>
                </div>
                <p className='text-4xl font-bold pb-1'>{dataDashboard?.totalRoomType}</p>
                <p className='text-gray-500' style={{ fontSize: '12px' }}>Loại phòng</p>
              </Card>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='pb-5'>
            <Col span={6}>
              <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                <div className='flex items-center'>
                  <p className='font-semibold pb-1' style={{ flex: 1 }}>Người dùng</p>
                  <Tag color='success' style={{ fontSize: '10px' }}>
                    Hoạt động
                  </Tag>
                </div>
                <p className='text-4xl font-bold pb-1'>{dataDashboard?.totalUser}</p>
                <p className='text-gray-500' style={{ fontSize: '12px' }}>Người dùng (khách hàng)</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                <div className='flex items-center'>
                  <p className='font-semibold pb-1' style={{ flex: 1 }}>Dịch vụ</p>
                  <Tag color='success' style={{ fontSize: '10px' }}>
                    Hoạt động
                  </Tag>
                </div>
                <p className='text-4xl font-bold pb-1'>{dataDashboard?.totalService}</p>
                <p className='text-gray-500' style={{ fontSize: '12px' }}>Dịch vụ đặc biệt</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                <div className='flex items-center'>
                  <p className='font-semibold pb-1' style={{ flex: 1 }}>Sản phẩm</p>
                  <Tag color='success' style={{ fontSize: '10px' }}>
                    Hoạt động
                  </Tag>
                </div>
                <p className='text-4xl font-bold pb-1'>{dataDashboard?.totalLocalProduct}</p>
                <p className='text-gray-500' style={{ fontSize: '12px' }}>Sản phẩm địa phương</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ width: '100%' }} bodyStyle={{ padding: '15px' }}>
                <div className='flex items-center'>
                  <p className='font-semibold pb-1' style={{ flex: 1 }}>Tin tức</p>
                  <Tag color='success' style={{ fontSize: '10px' }}>
                    Hoạt động
                  </Tag>
                </div>
                <p className='text-4xl font-bold pb-1'>{dataDashboard?.totalNews}</p>
                <p className='text-gray-500' style={{ fontSize: '12px' }}>Tin tức & bài viết</p>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col flex="0 1 400px">
          <div className="w-full max-w-md p-4 mt-10 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl font-semibold leading-none text-gray-900 dark:text-white">Các yêu cầu</p>
              <Link href="request-processing" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Xem tất cả
              </Link>
            </div>
            <div className="flow-root">
              {dataDashboard?.requestDetailListForAdmin?.map((item, index) => (
                <ul key={item.requestId} role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image width={100} height={0} className="w-12 h-12 rounded-full" src="https://storage.googleapis.com/hbs_bucket1/357617284.jpg" alt="Neil image" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item.householdName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {formatDateTime(item.createdDate)}
                        </p>
                        <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                          {item.requestTitle}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      <div className='w-[100vh] md:col-span-2 relative lg:h-[50vh] h-[50vh] p-4 border rounded-lg bg-white mt-10 ml-5'>
        <div>
          <select onChange={handleSelectChange} className='outline-none'>
            <option value="thisyear">Năm nay</option>
            <option value="lastyear">Năm trước</option>
          </select>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
}
