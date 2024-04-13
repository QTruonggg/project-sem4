'use client';
import roomtypeApi from '@/api/roomtypeApi';
import { IRoomTypeAdminResponse } from '@/types/roomTypeType';
import { Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Tooltip, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export interface IRoomTypeManagementProps {
}

export default function RoomTypeManagement(props: IRoomTypeManagementProps) {
    const [form] = Form.useForm();
    const [formUpdate, setFormUpdate] = React.useState<IRoomTypeAdminResponse>();
    const [modal1Open, setModal1Open] = React.useState(false);
    const [modalFormCreateOpen, setModalFormCreateOpen] = React.useState(false);

    const [listRoomType, setListRoomType] = React.useState<IRoomTypeAdminResponse[]>([]);
    React.useEffect(() => {
        roomtypeApi.getRoomTypesAdmin().then((res) => {
            setListRoomType(res.roomTypeDtos);
        });
    }, []);

    const showRoomTypeFormUpdate = (roomtypeId: number) => {
        roomtypeApi.getRoomTypeFormUpdateAdmin(roomtypeId).then(async (res) => {
            setFormUpdate(res);
            console.log(res)
            setModal1Open(true);

        });
    };

    const resetForm = () => {
        form.resetFields();
    };

    const showRoomTypeFormCreate = () => {
        resetForm();
        setModalFormCreateOpen(true);
    };

    const onFinish = async (values: any) => {
        setModal1Open(false);

        try {
            // Gửi dữ liệu lên server để cập nhật thông tin loại phòng
            roomtypeApi.updateRoomTypeByAdmin(values).then((res) => {
                console.log(res)

                if (res.httpStatus === 'OK') {
                    message.success('Cập nhật loại phòng thành công');
                    roomtypeApi.getRoomTypesAdmin().then((res) => {
                        setListRoomType(res.roomTypeDtos);
                    });
                }
            });
        } catch (error) {
            console.error('Failed to update room type:', error);
        }
    };

    const onCreate = async (values: any) => {
        console.log(values)
        setModalFormCreateOpen(false);
        try {
            roomtypeApi.createRoomTypeByAdmin(values).then((res) => {
                console.log(res)

                if (res.httpStatus === 'OK') {
                    message.success('Thêm loại phòng thành công');
                    roomtypeApi.getRoomTypesAdmin().then((res) => {
                        setListRoomType(res.roomTypeDtos);
                    });
                }
            });
        } catch (error) {
            console.error('Failed to update room type:', error);
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

    React.useEffect(() => {
        form.setFieldsValue({
            id: formUpdate?.id,
            isDorm: formUpdate?.isDorm ? "true" : "false",
            roomTypeName: formUpdate?.roomTypeName,
            singleBed: formUpdate?.singleBed,
            doubleBed: formUpdate?.doubleBed,
        });

    }, [formUpdate, form]);

    React.useEffect(() => {
        form.setFieldsValue({
            isDorm: "false",
            roomTypeName: undefined,
            singleBed: 0,
            doubleBed: 0,
        });
    }, [modalFormCreateOpen, form]);

    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-8 pt-8'>
                <Col className="gutter-row" span={24}>
                    <div className='flex'>
                        <div className="inline-block mr-4">
                            <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">Tổng số loại phòng : {listRoomType.length}</p>
                        </div>
                        <button className="inline-block"
                            onClick={() => showRoomTypeFormCreate()}
                        >
                            <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">+ Thêm loại phòng</p>
                        </button>
                    </div>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='p-8'>
                {listRoomType.map((rt) => (
                    <Col key={''} className="gutter-row" span={4}>
                        <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <Image width={100} height={0} className="rounded-lg mx-auto w-auto h-40 object-fit-cover" src='/images/roomtypeAdmin.png' alt="product image" />
                            </a>
                            <div className="px-5 pt-2">
                                <a href="#">
                                    <Tooltip>
                                        <p style={{ color: '#9B1C1C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="font-semibold tracking-tight text-gray-900 dark:text-white text-center">{rt.roomTypeName}</p>
                                    </Tooltip>
                                </a>
                                <div className="flex justify-center items-center">
                                    <span style={{ fontSize: '8px' }} className="bg-green-100 text-blue-800 m-2 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 text-center">Giường đơn <br /> {rt.singleBed}</span>
                                    <span style={{ fontSize: '8px' }} className="bg-blue-100 text-blue-800 m-2 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 text-center">Giường đôi <br /> {rt.doubleBed}</span>
                                </div>
                            </div>
                        </div>
                        <div className='text-center flex justify-center pt-2 pb-2'>
                            <div className='flex items-center'>
                                <button className='px-2 text-blue-500' onClick={() => showRoomTypeFormUpdate(rt.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {formUpdate && (
                <div>
                    <Modal
                        style={{ top: 20 }}
                        open={modal1Open}
                        onOk={() => { form.submit() }}
                        okButtonProps={{ style: { border: 'none', color: 'white', backgroundColor: '#1890ff' } }}
                        okText="Cập nhật"
                        cancelText="Hủy"
                        onCancel={() => setModal1Open(false)}
                    >
                        <p className='text-xl font-semibold text-center py-4'>Chỉnh sửa thông tin loại phòng</p>
                        <div>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{
                                    id: formUpdate?.id,
                                    isDorm: formUpdate?.isDorm ? "true" : "false",
                                    roomTypeName: formUpdate?.roomTypeName,
                                    singleBed: formUpdate?.singleBed,
                                    doubleBed: formUpdate?.doubleBed,
                                }}
                                style={{ maxWidth: 600 }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="id"
                                    hidden
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="roomTypeName"
                                    label="Tên loại phòng"
                                    style={{ fontWeight: 'bolder' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: <span style={{ fontSize: '10px' }}>Vui lòng nhập tên loại phòng!</span>,
                                        },
                                    ]}
                                >
                                    <Input style={{ fontWeight: 'initial' }} />
                                </Form.Item>
                                <Form.Item
                                    name="isDorm"
                                    label="Kiểu phòng"
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <Radio.Group>
                                        <Radio value="false" style={{ fontWeight: 'initial' }}>
                                            Phòng thường
                                        </Radio>
                                        <Radio value="true" style={{ fontWeight: 'initial' }}>
                                            Phòng tập thể
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="singleBed"
                                    label="Giường đơn"
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <InputNumber style={{ width: '100%', fontWeight: 'initial' }}
                                        min={0}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="doubleBed"
                                    label="Giường đôi"
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <InputNumber style={{ width: '100%', fontWeight: 'initial' }}
                                        min={0}
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                </div>
            )}

            {/* Modal create */}
            <Modal
                style={{ top: 20 }}
                open={modalFormCreateOpen}
                onOk={() => { form.submit() }}
                okButtonProps={{ style: { border: 'none', color: 'white', backgroundColor: '#1890ff' } }}
                okText="Thêm loại phòng mới"
                cancelText="Hủy"
                onCancel={() => setModalFormCreateOpen(false)}
            >
                <p className='text-xl font-semibold text-center py-4'>Thêm loại phòng</p>
                <div>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onCreate}
                        initialValues={{
                            isDorm: "false",
                            roomTypeName: undefined,
                            singleBed: 0,
                            doubleBed: 0,
                        }}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="roomTypeName"
                            label="Tên loại phòng"
                            style={{ fontWeight: 'bolder' }}
                            rules={[
                                {
                                    required: true,
                                    message: <span style={{ fontSize: '10px' }}>Vui lòng nhập tên loại phòng!</span>,
                                },
                            ]}
                        >
                            <Input style={{ fontWeight: 'initial' }} />
                        </Form.Item>
                        <Form.Item
                            name="isDorm"
                            label="Kiểu phòng"
                            style={{ fontWeight: 'bolder' }}
                            initialValue={"false"}
                        >
                            <Radio.Group>
                                <Radio value="false" style={{ fontWeight: 'initial' }}>
                                    Phòng thường
                                </Radio>
                                <Radio value="true" style={{ fontWeight: 'initial' }}>
                                    Phòng tập thể
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="singleBed"
                            label="Giường đơn"
                            style={{ fontWeight: 'bolder' }}
                            initialValue={0}
                        >
                            <InputNumber style={{ width: '100%', fontWeight: 'initial' }}
                                min={0}
                            />
                        </Form.Item>
                        <Form.Item
                            name="doubleBed"
                            label="Giường đôi"
                            style={{ fontWeight: 'bolder' }}
                            initialValue={0}
                        >
                            <InputNumber style={{ width: '100%', fontWeight: 'initial' }}
                                min={0}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}