'use client';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Breadcrumb, Button, Input, Popconfirm, Space, Table, Tag, message } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import { IlocalProductListForAdminResponse } from '@/types/localProductType';
import localProductApi from '@/api/localProductApi';
import Link from 'next/link';
import LoadingPage from '@/Components/common/LoadingPage';


export interface ILocalProductProps {
  key: string;
  id: number,
  productName: string,
  productDescription: string,
  unit: string,
  status: string,
  type: string,
  lowestPrice: number,
  highestPrice: number,
  villageMedias: []
}

type DataIndex = keyof ILocalProductProps;

export default function LocalProduct() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [loading, setLoading] = useState(false);
  const [localProduct, setLocalProduct] = useState<IlocalProductListForAdminResponse>();
  React.useEffect(() => {
    localProductApi.getlocalProductListForAdmin().then((res) => {
      return setLocalProduct(res);

    })
  }, []);


  const data: ILocalProductProps[] = [];
  {
    localProduct?.localProductListForAdmin.map((item, index) => {
      data.push({
        key: index.toString(),
        id: item.id,
        productName: item.productName,
        productDescription: item.productDescription,
        unit: item.unit,
        status: item.status,
        type: item.type,
        lowestPrice: item.lowestPrice,
        highestPrice: item.highestPrice,
        villageMedias: []
      })
    })
  }
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ILocalProductProps> => ({
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

  const handleDelete = async (id: number) => {

    try {
      await localProductApi.deleteLocalProduct(id);
      const updateData = await localProductApi.getlocalProductListForAdmin();
      setLocalProduct(updateData);
    } catch (error) {

    }
  }

  const handleHideLocalProduct = async (id: number) => {
    try {
     setLoading(true);
      await localProductApi.hideLocalProductdByAdmin(id);
      const updatedList = await localProductApi.getlocalProductListForAdmin();
      setLocalProduct(updatedList);
      message.success('Ẩn sản phẩm thành công');
    } catch (error) {

    }finally{
      setLoading(false);
    }
  };

  const handleShowLocalProduct = async (id: number) => {
    try {
      setLoading(true);
      await localProductApi.showLocalProductdByAdmin(id);
      const updatedList = await localProductApi.getlocalProductListForAdmin();
      setLocalProduct(updatedList);
      message.success('Hiển thị sản phẩm thành công');
    } catch (error) {

    }finally{
      setLoading(false);
    }
  };


  const columns: ColumnsType<ILocalProductProps> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      width: '10%',
      ...getColumnSearchProps('productName'),
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      ...getColumnSearchProps('type'),
      render: (text, record) => (
        record.type === 'FOOD' ? <span> Thực phẩm</span>
          : record.type === 'SOUVENIR' ? <span color=''>Đồ lưu niệm</span>
            : record.type === 'MEDICINE' ? <span color='red'>Dược phẩm</span>
              : record.type === 'DRINK' ? <span color='orange'>Đồ uống</span> : <span color='green'>ORTHER</span>
      )
    },
    {
      title: 'Giới thiệu',
      dataIndex: 'productDescription',
      key: 'productDescription',
      width: '35%',
    },
    {
      title: 'Giá thấp nhất',
      dataIndex: 'lowestPrice',
      key: 'lowestPrice',
      render: (text, record) => (
        <Tag color='cyan'>{record.lowestPrice?.toLocaleString('vi-VI')} VNĐ</Tag>
      )
    },
    {
      title: 'Giá cao nhất',
      dataIndex: 'highestPrice',
      key: 'highestPrice',
      render: (text, record) => (
        <Tag color='orange'>{record.highestPrice?.toLocaleString('vi-VI')} VNĐ</Tag>
      )
    },
    {

      render: (text, record) => (
        <Button href={`/admin/service-local-product/local-product/view-local-product-detail/${record.id}`} type="link">
          Xem
        </Button>
      ),
    },
    {

      key: 'delete',
      render: (text, record) => (
        <Popconfirm
          title="Xoá sản phẩm"
          description="Bạn chắc chắn muốn sản phẩm này?"
          okType='danger'
          okText={<span style={{ color: '' }}>Yes</span>}
          cancelText="No"
          onConfirm={() => handleDelete(record.id)}
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
      width: '10%',
      render: (text, record) => (
        <div style={{ display: 'block', textAlign: 'center' }}>
          <div>
            {record?.status === 'ACTIVE' ? <span className='text-green-500'>Đang hiển thị</span> : <span className='text-red-500'>Đã ẩn</span>}
          </div>
          {
            record?.status === 'ACTIVE' ?
              <button className='px-2 text-black-500'
                onClick={() => handleHideLocalProduct(record?.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button> :
              (record?.status === 'INACTIVE' ?
                <button className='px-2 text-black-500'
                  onClick={() => handleShowLocalProduct(record?.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                </button> :
                <p></p>
              )
          }
        </div>
      ),
    },
  ];


  return (
    <>
    {loading && <LoadingPage/>}
      <div className='justify-between flex m-10'>
        <Link href="/admin/service-local-product/local-product/add-local-product" className=' bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md shadow-md'>+ Thêm sản phẩm địa phương</Link>

        <div className='flex space-x-3'>
          <Link href="/admin/service-local-product/local-product/top" className=' bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md shadow-md'>TOP 5 SẢN PHẨM</Link>

        </div>
      </div>
      <div className='ml-10 mr-10 border border-gray-300 rounded-md'>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </div>
    </>

  );
};

