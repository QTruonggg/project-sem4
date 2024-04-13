'use client';
import LoadingPage from '@/Components/common/LoadingPage';
import facilityApi from '@/api/facilityApi';
import { IFacilityAdminResponse } from '@/types/facilityType';
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Tooltip, message } from 'antd';
import { set } from 'date-fns';
import Image from 'next/image';
import * as React from 'react';

export interface IFacilityManagementProps {

}

export default function FacilityManagement(props: IFacilityManagementProps) {
    const [form] = Form.useForm();
    const [listFacility, setListFacility] = React.useState<IFacilityAdminResponse[]>([]);
    const [modalFormCreateOpen, setModalFormCreateOpen] = React.useState(false);
    const [modaFormUpdatelOpen, setModalFormUpdateOpen] = React.useState(false);
    const [facilityUpdate, setFacilityUpdate] = React.useState<IFacilityAdminResponse>();
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        setLoading(true);
        facilityApi.getAllFacilityByAdmin().then((res) => {
            setListFacility(res.facilities);
        }).catch((err) => { }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleDeleteFacility = async (facilityId: number) => {
        try {
            await facilityApi.deleteFacilityByAdmin(facilityId)
            const data = facilityApi.getAllFacilityByAdmin()
            setListFacility((await data).facilities);
            message.success('Xóa cơ sở vật chất thành công');
        } catch (error) {

        }
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const resetForm = () => {
        form.resetFields();
    };


    const showModelFormCreate = () => {
        // resetForm();
        setModalFormCreateOpen(true);
    };

    React.useEffect(() => {
        form.setFieldsValue({
            id: facilityUpdate?.id,
            facilityName: facilityUpdate?.facilityName,
            status: facilityUpdate?.status
        });

    }, [modaFormUpdatelOpen, facilityUpdate, facilityUpdate?.id, facilityUpdate?.facilityName, facilityUpdate?.status, form]);


    React.useEffect(() => {
        form.setFieldsValue({
            id: undefined,
            facilityName: undefined,
            status: undefined
        });
    }, [modalFormCreateOpen, form]);

    const showModalFacilityFormUpdate = (facilityId: number) => {
        const facility = listFacility.filter((f) => f.id === facilityId).at(0)
        setFacilityUpdate(facility);
        setModalFormUpdateOpen(true);
    };

    const onCreate = async (values: any) => {
        setModalFormCreateOpen(false);
        try {
            setLoading(true);
            await facilityApi.createFacilityByAdmin(values)
            const data = facilityApi.getAllFacilityByAdmin()
            setListFacility((await data).facilities);
            message.success('Thêm cơ sở vật chất thành công');
        } catch (error) {
            console.error('Failed to update homestay:', error);
        } finally {
            setLoading(false);
        }
    }

    const onUpdate = async (values: any) => {
        setModalFormUpdateOpen(false);
        try {
            setLoading(true);
            await facilityApi.updateFacilityByAdmin(values)
            const data = facilityApi.getAllFacilityByAdmin()
            setListFacility((await data).facilities);
            message.success('Cập nhật cơ sở vật chất thành công');
        } catch (error) {
            console.error('Failed to update homestay:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <LoadingPage />}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-8 pt-8'>
                <Col className="gutter-row" span={24}>
                    <div className='flex'>
                        <div className="inline-block mr-4">
                            <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">Tổng số cơ sở vật chất : {listFacility.length}</p>
                        </div>
                        <button className="inline-block"
                            onClick={() => showModelFormCreate()}
                        >
                            <p className="bg-green-500 text-white py-3 px-4 rounded-md shadow-md">+ Thêm cơ sở vật chất</p>
                        </button>
                    </div>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='p-8'>
                {
                    listFacility?.map((item) => (
                        <Col key={item.id} className="gutter-row" span={4}>
                            <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <Image width={1000} height={1000} className="rounded-lg mx-auto w-auto h-40 object-fit-cover" src='/images/facility-default.jpg' alt="product image" />
                                </a>
                                <div className="px-5 pt-5">
                                    <Tooltip title={item.facilityName}>
                                        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white text-center" style={{ color: '#9B1C1C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.facilityName}</h5></Tooltip>
                                </div>
                            </div>
                            <div className='text-center flex justify-center pt-2 pb-2'>
                                <div className='flex items-center'>
                                    <button className='px-2 text-blue-500'
                                        onClick={() => { showModalFacilityFormUpdate(item.id) }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button>

                                    <Popconfirm
                                        title="Xoá cơ sở vật chất"
                                        description="Bạn chắc chắn muốn cơ sở vật chất này?"
                                        okType='danger'
                                        okText={<span style={{ color: '' }}>Có</span>}
                                        cancelText="Không"
                                        onConfirm={() => handleDeleteFacility(item.id)}
                                    >
                                        <Button danger style={{ border: 'none' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>

            {/* Form create */}
            <Modal
                style={{ top: 20 }}
                open={modalFormCreateOpen}
                onOk={() => { form.submit() }}
                okText='Thêm cơ sở vật chất'
                cancelText='Huỷ'
                okButtonProps={{ style: { border: 'none', color: 'white', backgroundColor: '#1890ff' } }}
                onCancel={() => setModalFormCreateOpen(false)}
            >
                <p className='text-xl font-semibold text-center py-4'>Thêm cơ sở vật chất</p>
                <div>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onCreate}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="facilityName"
                            label="Tên cơ sở vật chất"
                            style={{ fontWeight: 'bolder' }}
                            rules={[
                                {
                                    required: true,
                                    message: <span style={{ fontSize: '10px' }}>Vui lòng nhập tên cơ sở vật chất!</span>,
                                },
                                {
                                    max: 50,
                                    message: <span style={{ fontSize: '10px' }}>Tên cơ sở vật chất không quá 50 ký tự!</span>,
                                }
                            ]}
                        >
                            <Input style={{ fontWeight: 'initial' }} />
                        </Form.Item>

                    </Form>
                </div>
            </Modal>

            {/* Form update */}
            <Modal
                style={{ top: 20 }}
                open={modaFormUpdatelOpen}
                onOk={() => { form.submit() }}
                okText='Chỉnh sửa thông tin cơ sở vật chất'
                okButtonProps={{ style: { color: 'white', backgroundColor: '#1890ff' } }}
                cancelText='Huỷ'
                onCancel={() => setModalFormUpdateOpen(false)}
            >
                <p className='text-xl font-semibold text-center py-4'>Chỉnh sửa tên cơ sở vật chất</p>
                <div>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onUpdate}
                        initialValues={{
                            id: facilityUpdate?.id,
                            facilityName: facilityUpdate?.facilityName,
                            status: facilityUpdate?.status
                        }}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="id"
                            hidden
                        >
                        </Form.Item>
                        <Form.Item
                            name="facilityName"
                            label="Tên cơ sở vật chất"
                            style={{ fontWeight: 'bolder' }}
                            required
                        >
                            <Input style={{ fontWeight: 'initial' }} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}