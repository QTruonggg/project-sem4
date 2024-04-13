'use client';
import localProductApi from '@/api/localProductApi';
import { ILocalProductList, IdAndPositionlocalProductTop } from '@/types/localProductType';
import { Badge, Breadcrumb, Button, Modal, Popconfirm, Select, message } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import * as React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export interface ITopLocalProductProps {
    key: number;
    localProductPosition: string,
    localProductId: number,
    localProductName: string,
    type: string
}

export default function TopLocalProduct() {
    const [localProduct, setLocalProduct] = React.useState<ILocalProductList>();
    React.useEffect(() => {
        localProductApi.getTopLocalProductForAdmin().then((res) => {
            return setLocalProduct(res);
        })
    }, []);

    const handleDelete = async (id: number, position: string) => {
        const data: IdAndPositionlocalProductTop = {
            localProductPosition: position,
            localProductId: id,
        }
        try {
            await localProductApi.deleteTopLocalProduct(data);
            const updateData = await localProductApi.getTopLocalProductForAdmin();
            setLocalProduct(updateData);
        } catch (error) {

        }
    }
    const data: ITopLocalProductProps[] = [];
    {
        localProduct?.localProductTop5DetailForAdmins.map((item, index) => {
            data.push({
                key: item.localProductId,
                localProductPosition: item.localProductPosition,
                localProductId: item.localProductId,
                localProductName: item.localProductName,
                type: item.type,
            })
        })
    }

    const columns: ColumnsType<ITopLocalProductProps> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'localProductName',
            key: 'localProductName',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => (
                record.type === 'FOOD' ? <span> Thực phẩm</span>
                    : record.type === 'SOUVENIR' ? <span color=''>Đồ lưu niệm</span>
                        : record.type === 'MEDICINE' ? <span color='red'>Dược phẩm</span>
                            : record.type === 'DRINK' ? <span color='orange'>Đồ uống</span> : <span color='green'>ORTHER</span>


            )
        },
        {
            title: 'Top',
            dataIndex: 'localProductPosition',
            key: 'localProductPosition',
            render: (text, record) => (
                <Badge count={text} style={{ backgroundColor: '#52c41a' }} />
            )
        },

        {
            key: 'delete',
            width: '10%',
            render: (text, record) => (
                <Popconfirm
                    title="Xoá Sản Phẩm"
                    description="Bạn chắc chắn muốn sản phẩm này?"
                    okType='danger'
                    okText={<span style={{ color: '' }}>Yes</span>}
                    cancelText="No"
                    onConfirm={() => handleDelete(record.localProductId, record.localProductPosition)}
                >
                    <Button className='' danger style={{ border: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </Button>
                </Popconfirm>
            )
        },

    ];
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [position, setPosition] = React.useState<string>();
    const [product, setProduct] = React.useState<number>();

    const handleUpdateTopProduct = async () => {
        const data: IdAndPositionlocalProductTop = {
            localProductPosition: position,
            localProductId: product,
        }

        try {
            await localProductApi.addTopLocalProduct(data);
            const updateData = await localProductApi.getTopLocalProductForAdmin();
            setLocalProduct(updateData);
            message.success('Thêm sản phẩm thành công');
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    }


    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModalEdit = () => {
        setIsModalOpen(true);
    };

    const onSelectedPosition = (value: string) => {
        setPosition(value);
    }

    const onSelectedProduct = (value: number) => {
        setProduct(value);
    }

    const router = useRouter();
    const breadcrumbItems = [
        {
            href: '/admin/service-local-product/local-product',
            title: (
                <>
                    <button className='hover:text-black underline'>Sản phẩm địa phương</button>
                </>
            ),
        },
        {
            title: 'Top sản phẩm địa phương',
        },
    ];
    return (
        <>
            <div className='ml-10 mt-3'>
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
            </div>
            <div className='justify-between flex m-10'>
                <div className='flex space-x-3'>
                    <button onClick={() => { showModalEdit() }} className="bg-blue-500  text-white py-3 px-4 rounded-md shadow-md flex" type="submit">
                        +
                        Thêm sản phẩm
                    </button>
                    <Modal
                        title="THÊM SẢN PHẨM NỔI BẬT"
                        footer={[
                            <Button
                                key="update"
                                className='bg-blue-500  text-white ounded-md shadow-md'
                                onClick={handleUpdateTopProduct}
                            >
                                Lưu
                            </Button>,
                        ]}
                        okText="Delete"
                        okType="danger"
                        open={isModalOpen}
                        onCancel={handleCancel}>

                        <table className='justify-center'>
                            <tbody>
                                <tr>
                                    <td className="py-2 whitespace-nowrap">Vị trí</td>
                                    <td className="py-2 whitespace-nowrap pl-20">
                                        <Select
                                            onChange={onSelectedPosition}
                                            allowClear
                                            className='w-[34vh]'
                                        >
                                            {localProduct?.localProductPositionList?.map((item) => (
                                                <Select.Option key={item} value={item}>{item}</Select.Option>
                                            ))}
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 whitespace-nowrap">Sản phẩm</td>
                                    <td className="py-2 whitespace-nowrap pl-20">
                                        <Select
                                            onChange={onSelectedProduct}
                                            allowClear
                                            className='w-[34vh]'
                                        >
                                            {localProduct?.localProductListForAdmin.map((item) => (
                                                <Select.Option key={item.localProductId}
                                                    value={item.localProductId}>{item.localProductName}</Select.Option>
                                            ))}
                                        </Select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal>
                </div>
            </div>
            <div className='ml-10 mr-10 border border-gray-300 rounded-md'>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            </div>
        </>

    );
}
