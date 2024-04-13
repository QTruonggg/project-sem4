'use client';
import * as React from 'react';
import { Tabs, Table, Modal, Input, InputRef, Popconfirm, message, Tag, Badge } from 'antd';
import { IViewBookingResponse } from '@/types/homestayBookingType';
import bookingManagerApi from '@/api/bookingManagerApi';
import { Space } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
const { TabPane } = Tabs;
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ICancellationHistory, ICustomerBankInformation } from '@/types/bookingType';
import LoadingPage from '@/Components/common/LoadingPage';
import Link from 'next/link';


export interface IBookingManagementProps {
  bookingCode: string,
  createdDate: string,
  bookingCustomerName: string,
  bookingCustomerPhoneNumber: string,
  checkInDate: string,
  checkOutDate: string,
  totalGuest: number,
  totalRoom: number,
  totalPrice: number,
  bookingStatus: string,
  paymentStatus: string,
  customerBankInformation: ICustomerBankInformation,
  cancellationHistory: ICancellationHistory
}

export default function BookingManagement(props: IBookingManagementProps) {
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

  const tabData = [
    { id: 'booked', title: 'Đặt trước đang diễn ra' },
    { id: 'check_in', title: 'Đặt trước đã check in' },
    { id: 'check_out', title: 'Đặt trước đã check out' },
    { id: 'cancelled', title: 'Đặt trước đã huỷ' },
  ];

  const showStatusPayment = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Tag color='gold'>Đã thanh toán</Tag>;
      case 'UNPAID':
        return <Tag color='red'>Chưa thanh toán</Tag>;
      default:
        return 'Chưa thanh toán';
    }
  };

  const showRefundStatus = (status: string) => {
    switch (status) {
      case 'REFUNDED':
        return <Tag color='gold'>Đã hoàn tiền</Tag>;
      case 'NOT_REFUNDED':
        return <Tag color='red'>Không được hoàn tiền</Tag>;
      case 'PENDING':
        return <Tag color='cyan'>Đang chờ hoàn tiền</Tag>;
      default:
        return 'Chưa hoàn tiền';
    }

  };
  const [loading, setLoading] = React.useState(false);
  const [viewBooking, setViewBooking] = React.useState<IViewBookingResponse>();
  React.useEffect(() => {
    setLoading(true);
    bookingManagerApi.getViewBookingInformation().then((res) => {
      return setViewBooking(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  const bookedData = viewBooking?.bookings.filter((item) => item.bookingStatus === "BOOKED");
  const checkinData = viewBooking?.bookings.filter((item) => item.bookingStatus === "CHECKED_IN");
  const chekcoutData = viewBooking?.bookings.filter((item) => item.bookingStatus === "CHECKED_OUT");
  const cancelled = viewBooking?.bookings.filter((item) => item.bookingStatus === "CANCELLED");


  const dataBooked: IBookingManagementProps[] = [];
  const dataCheckin: IBookingManagementProps[] = [];
  const dataCheckout: IBookingManagementProps[] = [];
  const dataCancelled: IBookingManagementProps[] = [];

  {
    bookedData?.map((item) => {
      dataBooked.push({
        bookingCode: item.bookingCode,
        createdDate: item.createdDate,
        bookingCustomerName: item.bookingCustomerName,
        bookingCustomerPhoneNumber: item.bookingCustomerPhoneNumber,
        checkInDate: item.checkInDate,
        checkOutDate: item.checkOutDate,
        totalGuest: item.totalGuest,
        totalRoom: item.totalRoom,
        totalPrice: item.totalPrice,
        bookingStatus: item.bookingStatus,
        paymentStatus: item.paymentStatus,
        cancellationHistory: item.cancellationHistory,
        customerBankInformation: item.customerBankInformation,
      });
    })
  }

  {
    checkinData?.map((item) => {
      dataCheckin.push({
        bookingCode: item.bookingCode,
        createdDate: item.createdDate,
        bookingCustomerName: item.bookingCustomerName,
        bookingCustomerPhoneNumber: item.bookingCustomerPhoneNumber,
        checkInDate: item.checkInDate,
        checkOutDate: item.checkOutDate,
        totalGuest: item.totalGuest,
        totalRoom: item.totalRoom,
        totalPrice: item.totalPrice,
        bookingStatus: item.bookingStatus,
        paymentStatus: item.paymentStatus,
        cancellationHistory: item.cancellationHistory,
        customerBankInformation: item.customerBankInformation,
      });
    })
  }

  {
    chekcoutData?.map((item) => {
      dataCheckout.push({
        bookingCode: item.bookingCode,
        createdDate: item.createdDate,
        bookingCustomerName: item.bookingCustomerName,
        bookingCustomerPhoneNumber: item.bookingCustomerPhoneNumber,
        checkInDate: item.checkInDate,
        checkOutDate: item.checkOutDate,
        totalGuest: item.totalGuest,
        totalRoom: item.totalRoom,
        totalPrice: item.totalPrice,
        bookingStatus: item.bookingStatus,
        paymentStatus: item.paymentStatus,
        cancellationHistory: item.cancellationHistory,
        customerBankInformation: item.customerBankInformation,
      });
    })
  }

  {
    cancelled?.map((item) => {
      dataCancelled.push({
        bookingCode: item.bookingCode,
        createdDate: item.createdDate,
        bookingCustomerName: item.bookingCustomerName,
        bookingCustomerPhoneNumber: item.bookingCustomerPhoneNumber,
        checkInDate: item.checkInDate,
        checkOutDate: item.checkOutDate,
        totalGuest: item.totalGuest,
        totalRoom: item.totalRoom,
        totalPrice: item.totalPrice,
        bookingStatus: item.bookingStatus,
        paymentStatus: item.paymentStatus,
        cancellationHistory: item.cancellationHistory,
        customerBankInformation: item.customerBankInformation,
      });
    })
  }
  type DataIndex = keyof IBookingManagementProps;
  
  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const searchInput = React.useRef<InputRef>(null);

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

  const refundBooking = async (bookingCode: string) => {

    try {
      await bookingManagerApi.refundBooking(bookingCode);
      const updatedList = await bookingManagerApi.getViewBookingInformation();
      setViewBooking(updatedList);
    } catch (error) {
      console.log(error);
    }
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IBookingManagementProps> => ({
    
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
            type="default"

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
    onFilter: (value, record) => record[dataIndex]
        .toString().toLowerCase().includes((value.toString()).toLowerCase().trim()),
    
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

  });

  const columnsBooked: ColumnsType<IBookingManagementProps> = [
    { title: 'Mã đặt phòng', dataIndex: 'bookingCode', key: 'bookingCode', ...getColumnSearchProps('bookingCode') },
    { title: 'Thời gian đặt phòng', dataIndex: 'createdDate', key: 'acreatedDatege', render: (text, record) => formatDateTime(record.createdDate) },
    { title: 'Người đặt phòng', dataIndex: 'bookingCustomerName', key: 'bookingCustomerName', ...getColumnSearchProps('bookingCustomerName') },
    { title: 'Số điện thoại ', dataIndex: 'bookingCustomerPhoneNumber', key: 'bookingCustomerPhoneNumber', },
    { title: 'Ngày đến', dataIndex: 'checkInDate', key: 'checkInDate' },
    { title: 'Ngày đi', dataIndex: 'checkOutDate', key: 'checkOutDate' },
    { title: 'Số khách', dataIndex: 'totalGuest', key: 'totalGuest' },
    {
      title: 'Tổng chi phí', dataIndex: 'totalPrice', key: 'totalPrice', render: (text, record) => (
        <Tag color='green'>{record.totalPrice.toLocaleString('vi-VI')} VNĐ</Tag>
      )
    },
    { title: 'Thanh toán', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (text, record) => showStatusPayment(record.paymentStatus) },
    {
      title: 'Chi tiết',
      render: (text, record) => (
        <Link className='text-blue-600' href={`/manager/booking-management/view-booking-detail/${record.bookingCode}`} type="link">
          Xem
        </Link>
      ),
    },
  ];

  const [bookingCode, setBookingCode] = React.useState<string>();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpen = (record: string) => {
    setIsModalOpen(true);
    setBookingCode(record);
  };

  const handleUpdatePaymentClick = async (record: string | undefined) => {
    try {
      setIsModalOpen(true);
      setLoading(true);
      await bookingManagerApi.updatePayment(record);
      const updatedList = await bookingManagerApi.getViewBookingInformation();
      setViewBooking(updatedList);
      message.success('Cập nhật thanh toán thành công');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setIsModalOpen(false);
  };

  const columns: ColumnsType<IBookingManagementProps> = [
    { title: 'Mã đặt phòng', dataIndex: 'bookingCode', key: 'bookingCode', ...getColumnSearchProps('bookingCode') },
    { title: 'Thời gian đặt phòng', dataIndex: 'createdDate', key: 'acreatedDatege', render: (text, record) => formatDateTime(record.createdDate) },
    { title: 'Người đặt phòng', dataIndex: 'bookingCustomerName', key: 'bookingCustomerName', ...getColumnSearchProps('bookingCustomerName') },
    { title: 'Số điện thoại ', dataIndex: 'bookingCustomerPhoneNumber', key: 'bookingCustomerPhoneNumber' },
    { title: 'Ngày đến', dataIndex: 'checkInDate', key: 'checkInDate' },
    { title: 'Ngày đi', dataIndex: 'checkOutDate', key: 'checkOutDate' },
    { title: 'Số khách', dataIndex: 'totalGuest', key: 'totalGuest' },
    {
      title: 'Tổng chi phí', dataIndex: 'totalPrice', key: 'totalPrice', render: (text, record) => (
        <Tag color='green'>{record.totalPrice.toLocaleString('vi-VI')} VNĐ</Tag>
      )
    },
    { title: 'Thanh toán', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (text, record) => showStatusPayment(record.paymentStatus) },
    {
      title: 'Chi tiết', key: 'paymentStatus',
      render: (text, record) => (
        <Link className='text-blue-600' href={`/manager/booking-management/view-booking-detail/${record.bookingCode}`} type="link">
          Xem
        </Link>
      ),
    },
    {
      title: 'Cập nhật thanh toán', key: 'paymentStatus',
      render: (text, record) => (
        record.paymentStatus === 'UNPAID' ?
          <Button type="link" onClick={() => handleOpen(record.bookingCode)}>
            Cập nhật
          </Button>
          : <Button type="link" disabled={true}>
            Cập nhật
          </Button>
      )
    },
  ];

  const columnsCancelled: ColumnsType<IBookingManagementProps> = [
    { title: 'Mã đặt phòng', dataIndex: 'bookingCode', key: 'bookingCode', ...getColumnSearchProps('bookingCode') },
    { title: 'Thời gian huỷ', dataIndex: 'createdDate', key: 'acreatedDatege', render: (text, record) => formatDateTime(record.cancellationHistory?.cancellationDate) },
    { title: 'Người đặt phòng', dataIndex: 'bookingCustomerName', key: 'bookingCustomerName', ...getColumnSearchProps('bookingCustomerName') },
    { title: 'Số điện thoại ', dataIndex: 'bookingCustomerPhoneNumber', key: 'bookingCustomerPhoneNumber' },
    {
      title: 'Tổng chi phí', dataIndex: 'totalPrice', key: 'totalPrice', render: (text, record) => (
        <Tag color='green'>{record.totalPrice.toLocaleString('vi-VI')} VNĐ</Tag>
      )
    },
    { title: 'Trạng thái', dataIndex: 'bookingStatus', key: 'bookingStatus', render: (text, record) => showRefundStatus(record.cancellationHistory.refundStatus) },
    { title: 'STK hoàn tiền', dataIndex: 'customerBankInformation', key: 'customerBankInformation', render: (text, record) => record.customerBankInformation?.accountNumber },
    { title: 'Ngân hàng', dataIndex: 'customerBankInformation', key: 'customerBankInformation', render: (text, record) => record.customerBankInformation?.bankName },
    { title: 'Tên chủ tài khoản', dataIndex: 'customerBankInformation', key: 'customerBankInformation', render: (text, record) => record.customerBankInformation?.accountHolder },
    {
      title: 'Hoàn tiền', key: 'refundStatus',
      render: (text, record) => (
        record.cancellationHistory?.refundStatus === 'PENDING' ?
          <Popconfirm
            title="Hoàn tiền cho khách hàng?"
            description="Bạn có chắc chắn muốn hoàn tiền cho khách hàng này?"
            okButtonProps={{ className: 'bg-blue-500', style: { color: 'white' } }}
            okText="Xác nhận"
            onConfirm={() => refundBooking(record.bookingCode)}
            cancelText="Hủy"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
              </svg>
            </Button>
          </Popconfirm>
          : <Popconfirm
            disabled={true}
            title="Hoàn tiền cho khách hàng?"
            description="Bạn có chắc chắn muốn hoàn tiền cho khách hàng này?"
            okButtonProps={{ className: 'bg-blue-500', style: { color: 'white' } }}
            okText="Xác nhận"
            cancelText="Hủy"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button danger disabled={true}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
              </svg>
            </Button>
          </Popconfirm>

      ),
    },
    {
      title: 'Chi tiết', key: 'paymentStatus',
      render: (text, record) => (
        <Link className='text-blue-600' href={`/manager/booking-management/view-booking-detail/${record.bookingCode}`} type="link">
          Xem
        </Link>
      ),
    },
  ];
  return (
    <>
      {loading && <LoadingPage />}
      <Tabs tabPosition="top" className='m-10'>
        <TabPane tab={<p className='font-semibold'>ĐẶT TRƯỚC</p>} key="booked">
          <Table dataSource={dataBooked} columns={columnsBooked} />
          <Modal
            open={isModalOpen}
            onOk={() => handleOpen}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" type="default" onClick={handleCancel}>
                Hủy
              </Button>,
              <Button key="update" type="dashed" onClick={() => handleUpdatePaymentClick(bookingCode)}>
                Cập nhật
              </Button>,
            ]}
          >
            <div>
              <h1 className='text-center font-semibold text-lg pt-5 pb-5'>Bạn muốn cập nhật thanh toán cho booking này ?</h1>
            </div>
          </Modal>
        </TabPane>

        <TabPane tab={<p className='font-semibold'>ĐÃ CHECK IN</p>} key="check_in">
          <Table dataSource={dataCheckin} columns={columnsBooked} />
        </TabPane>
        <TabPane tab={<p className='font-semibold'>ĐÃ CHECK OUT</p>} key="check_out">
          <Table dataSource={dataCheckout} columns={columns} />
        </TabPane>
        <TabPane tab={<p className='font-semibold'>ĐÃ HUỶ</p>} key="cancelled">
          <Table dataSource={dataCancelled} columns={columnsCancelled} />
        </TabPane>

      </Tabs>
    </>
  );
};

