'use client';
import LoadingPage from '@/Components/common/LoadingPage';
import homestayApi from '@/api/homestayApi';
import { IHomestayAdminResponse, IHomestayDetailAdminResponse, IHomestayFormUpdateAdminResponse, IHomestayFormUpdateResponseAdmin, IHomestayMediaAdminResponse } from '@/types/homestayType';
import { Badge, Button, Col, Form, Modal, Popconfirm, Row, Upload, UploadFile, Select, Input, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export interface IHomestayManagementProps {
}

export default function HomestayManagement(props: IHomestayManagementProps) {
    const [form] = Form.useForm();
    const { Option } = Select;

    const [loading, setLoading] = React.useState<boolean>(true);

    const [listHomestay, setListHomestay] = React.useState<IHomestayAdminResponse[]>([]);
    React.useEffect(() => {
        setLoading(true);
        homestayApi.getAllHomestayByAdmin().then((res) => {
            setListHomestay(res.homestayListAdminResponseDtos);
        }).catch((err) => { }).finally(() => {
            setLoading(false);
        });
    }, []);

    const [selectedHomestay, setSelectedHomestay] = React.useState<IHomestayDetailAdminResponse>();

    const showModelHomestayDetail = (homestayId: number) => {

        homestayApi.getHomestayAdmin(homestayId).then((res) => {
            setSelectedHomestay(res);
        });
        setModalDetailOpen(true);
    };

    const [modalDetailOpen, setModalDetailOpen] = React.useState(false);
    const [modalFormUpdateOpen, setModalFormUpdateOpen] = React.useState(false);
    const [modalFormCreateOpen, setModalFormCreateOpen] = React.useState(false);


    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [fileList, setFileList] = React.useState<UploadFile<any>[]>();



    React.useMemo(() => {
        const homestayMedia = selectedHomestay?.homestayMediaDtoList.map((item) => ({
            uid: item.id.toString(),
            name: item.id.toString(),
            url: item.filePath,
        })) || [];
        setFileList(homestayMedia);
        //Eslint-disable-next-line
    }, [selectedHomestay?.homestayMediaDtoList]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleDeleteHomestay = async (homestayId: number) => {
        try {
            setLoading(true);
            await homestayApi.deleteHomestayByAdmin(homestayId);
            const updatedList = await homestayApi.getAllHomestayByAdmin();
            setListHomestay(updatedList.homestayListAdminResponseDtos);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    const [formUpdate, setFormUpdate] = React.useState<IHomestayFormUpdateAdminResponse>();
    const [formCreate, setFormCreate] = React.useState<IHomestayFormUpdateResponseAdmin>();


    const showHomestayFormUpdate = (homestayId: number) => {
        homestayApi.getHomestayFormUpdateAdmin(homestayId).then(async (res) => {
            setFormUpdate(res);
            console.log(res)
            setModalFormUpdateOpen(true);
        });
    };

    const handleDeactiveHomestay = async (homestayId: number) => {
        try {
            setLoading(true);
            await homestayApi.deactiveHomestayByAdmin(homestayId);
            const updatedList = homestayApi.getAllHomestayByAdmin();
            setListHomestay((await updatedList).homestayListAdminResponseDtos);
            message.success('Cập nhật trạng thái homestay thành công');
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    const handleShowHomestay = async (homestayId: number) => {
        try {
            await homestayApi.showHomestayByAdmin(homestayId);
            const updatedList = await homestayApi.getAllHomestayByAdmin();
            setListHomestay(updatedList.homestayListAdminResponseDtos);
        } catch (error) {

        }
    }

    const showHomestayFormCreate = () => {
        homestayApi.getHomestayFormCreateAdmin().then(async (res) => {
            setFormCreate(res);
            console.log(res)
            setModalFormCreateOpen(true);
        });
    };

    const onFinish = async (values: any) => {
        setModalFormUpdateOpen(false);

        try {
            setLoading(true);
            await homestayApi.updateHomestayByAdmin(values);
            const updatedData = await homestayApi.getAllHomestayByAdmin();
            setListHomestay(updatedData.homestayListAdminResponseDtos);
            message.success('Cập nhật homestay thành công');
        } catch (error) {
            console.error('Failed to update homestay:', error);
        } finally {
            setLoading(false);
        }
    }

    const onCreate = async (values: any) => {
        setModalFormCreateOpen(false);

        try {
            setLoading(true);
            await homestayApi.createHomestayByAdmin(values);
            const updatedData = await homestayApi.getAllHomestayByAdmin();
            setListHomestay(updatedData.homestayListAdminResponseDtos);
            message.success('Thêm homestay thành công');
        } catch (error) {
            console.error('Failed to update homestay:', error);
        } finally {
            setLoading(false);
        }
    }

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
            homestayId: formUpdate?.homestayAdminRequestDto.homestayId,
            homestayName: formUpdate?.homestayAdminRequestDto.homestayName,
            areaId: formUpdate?.homestayAdminRequestDto.areaId,
            householdId: formUpdate?.homestayAdminRequestDto.householdId
        });
        //Eslint-disable-next-line
    }, [formUpdate, form]);

    React.useEffect(() => {
        form.setFieldsValue({
            homestayId: null,
            homestayName: null,
            areaId: formCreate?.areaAdminResponseDtoList[0].id,
            householdId: formCreate?.householdResponseDtoList[0].id
        });
        //Eslint-disable-next-line
    }, [formCreate, form]);

    return (

        <>
            {loading && <LoadingPage />}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-8 pt-4'>
                <Col className="gutter-row" span={24}>
                    <div className='flex'>
                        <div className="inline-block mr-4">
                            <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">Tổng số homestay : {listHomestay.length}</p>
                        </div>
                        <button className="inline-block"
                            onClick={() => showHomestayFormCreate()}
                        >
                            <p className="bg-green-500 text-white py-3 px-4 rounded-md shadow-md">+ Thêm homestay</p>
                        </button>
                    </div>
                </Col>
            </Row>

            {
                listHomestay.map((h) => (
                    <>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-8 pt-4'>
                            <Col flex={50}>
                                <div>
                                    <p className="bg-green-500 text-white py-3 px-4 rounded-md shadow-md">{h.area}</p>
                                </div>
                            </Col>
                            <Col flex={0}>
                                <div>
                                    <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">Số homestay : {h.homestayList.length}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-8 py-4'>

                            {
                                h.homestayList.map((hd, index) => (
                                    <Col key={index} className="gutter-row" span={6}>
                                        <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <a href="#">
                                                <Image width={100} height={0} className="rounded-lg mx-auto w-auto h-40 object-fit-cover" src='/images/home_stay_default.jpg' alt="product image" />
                                            </a>
                                            <div className="">
                                                <a href="#">
                                                    <h5 className="pt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center" style={{ color: '#9B1C1C' }}>{hd.homestayCode}</h5>
                                                </a>
                                                <a href="#">
                                                    <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-center">{hd.householdName}</p>
                                                </a>
                                                <div className="flex justify-center items-center">
                                                    <span style={{ fontSize: '10px' }} className="bg-green-100 text-blue-800 m-2 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 text-center">Sức chứa <br /> {hd.capacityOfHomestay}</span>
                                                    <span style={{ fontSize: '10px' }} className="bg-blue-100 text-blue-800 m-2 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 text-center">Phòng <br /> {hd.totalRoomOfHomestay}</span>
                                                    <span style={{ fontSize: '10px' }} className="bg-red-100 text-blue-800 m-2 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 text-center">Dorm <br /> {hd.totalDormOfHomestay}</span>
                                                </div>
                                            </div>
                                            <div className='text-center pt-1'>
                                                {hd.homestayStatus === 'ACTIVE' ?
                                                    <Badge status='success' text={<span className='text-xs font-semibold' style={{ color: 'green' }}>Đang hoạt động</span>}></Badge> :
                                                    <Badge status='warning' text={<span className='text-xs font-semibold' style={{ color: 'orange' }}>Đã ẩn trên trang web</span>}></Badge>
                                                }
                                            </div>
                                        </div>
                                        <div className='text-center flex justify-center pt-2 pb-2'>
                                            <div className='flex items-center'>
                                                <button className='text-green-500 px-4'
                                                    onClick={() => showModelHomestayDetail(hd.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                                    </svg>
                                                </button>
                                                <button className='text-blue-500'
                                                    onClick={() => showHomestayFormUpdate(hd.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                                {hd.homestayStatus === 'ACTIVE' ?
                                                    <button className='pl-3 text-black-500'
                                                        onClick={() => handleDeactiveHomestay(hd.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </button> :
                                                    <button className='pl-3 text-black-500'
                                                        onClick={() => handleShowHomestay(hd.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>

                                                    </button>
                                                }
                                                <Popconfirm
                                                    title="Xoá homestay"
                                                    description="Bạn chắc chắn muốn xoá homestay?"
                                                    okType='danger'
                                                    okText={<span style={{ color: '' }}>Yes</span>}
                                                    cancelText="No"
                                                    onConfirm={() => handleDeleteHomestay(hd.id)}
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


                    </>
                ))
            }

            {/* Modal detail */}
            {selectedHomestay && (
                <Modal
                    style={{ top: 20 }}
                    open={modalDetailOpen}
                    okText="Đóng"
                    cancelButtonProps={{ hidden: true }}
                    onOk={() => setModalDetailOpen(false)}
                    onCancel={() => setModalDetailOpen(false)}
                    okButtonProps={{ className: "bg-blue-500 text-white shadow-md" }}
                >
                    <div className="justify-center items-center pb-7">
                        <p className='text-2xl font-bold text-center py-3'>Thông tin chi tiết homestay</p>
                    </div>
                    <p className='text-lg font-semibold pb-5'>Thông tin homestay</p>
                    <div>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.homestayCode}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Mã homestay</p>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.capacityOfHomestay}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Sức chứa tối đa</p>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.totalRoomOfHomestay}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Số phòng</p>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.totalDormOfHomestay}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Số chỗ ở tập thể</p>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.fullAddress}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Địa chỉ</p>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={24}>
                                <p className='font-semibold pb-2'>Ảnh homestay</p>
                            </Col>
                            <Col className="gutter-row" span={24}>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    showUploadList={{ showRemoveIcon: false }}
                                    onPreview={handlePreview}
                                >
                                </Upload>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                {selectedHomestay?.homestayStatus === 'ACTIVE' ?
                                    <Badge status='success' text={<span className='text-xs font-semibold' style={{ color: 'green' }}>Đang hoạt động</span>}></Badge> :
                                    <Badge status='warning' text={<span className='text-xs font-semibold' style={{ color: 'orange' }}>Đã ẩn trên trang web</span>}></Badge>
                                }
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Trạng thái</p>
                            </Col>
                        </Row>
                        <p className='text-lg font-semibold py-5'>Thông tin chủ hộ kinh doanh</p>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.householdName}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Tên hộ kinh doanh</p>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.householderName}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Chủ hộ kinh doanh</p>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.householdPhone}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Số điện thoại</p>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12} push={10}>
                                <p className='py-1'>{selectedHomestay?.householdEmail}</p>
                            </Col>
                            <Col span={10} pull={12}>
                                <p className='font-semibold'>Email chủ hộ kinh doanh</p>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            )}

            {/* Modal preview image */}
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <Image alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>

            {/* Modal form update */}
            {formUpdate && (
                <div>
                    <Modal
                        style={{ top: 20 }}
                        open={modalFormUpdateOpen}
                        onOk={() => { form.submit() }}
                        okText="Cập nhật"
                        cancelText="Huỷ"
                        onCancel={() => setModalFormUpdateOpen(false)}
                        okButtonProps={{ className: "bg-blue-500 text-white shadow-md" }}
                    >
                        <p className='text-xl font-semibold text-center py-4'>Chỉnh sửa thông tin homestay</p>
                        <div>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}


                                initialValues={{
                                    homestayId: formUpdate.homestayAdminRequestDto.homestayId,
                                    homestayName: formUpdate.homestayAdminRequestDto.homestayName,
                                    areaId: formUpdate.homestayAdminRequestDto.areaId,
                                    householdId: formUpdate.homestayAdminRequestDto.householdId
                                }}
                                style={{ maxWidth: 600 }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="homestayId"
                                    hidden
                                    initialValue={formUpdate?.homestayAdminRequestDto.homestayId}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="areaId"
                                    label="Khu"

                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <Select placeholder="Please select a country" style={{ fontWeight: 'initial' }}>
                                        {
                                            formUpdate.homestayAdminResponseDto
                                                .areaAdminResponseDtoList
                                                .map((area) => (
                                                    <Option key={area.id} value={area.id}>{area.name}</Option>
                                                ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="householdId"
                                    label="Hộ kinh doanh"
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <Select placeholder="Please select a country" style={{ fontWeight: 'initial' }}>
                                        {
                                            formUpdate.homestayAdminResponseDto
                                                .householdResponseDtoList
                                                .map((household) => (
                                                    <Option key={household.id} value={household.id}>{household.householdName}</Option>

                                                ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="homestayName"
                                    label="Mã homestay"
                                    style={{ fontWeight: 'bolder' }}
                                    initialValue={formUpdate.homestayAdminRequestDto.homestayName}
                                >
                                    <Input style={{ fontWeight: 'initial' }} />
                                </Form.Item>

                            </Form>
                        </div>
                    </Modal>
                </div>
            )}

            {/* Modal form add */}
            {formCreate && (
                <div>
                    <Modal
                        style={{ top: 20 }}
                        open={modalFormCreateOpen}
                        onOk={() => { form.submit() }}
                        okText="Thêm"
                        cancelText="Huỷ"
                        onCancel={() => setModalFormCreateOpen(false)}
                        okButtonProps={{ className: "bg-blue-500 text-white shadow-md" }}
                    >
                        <p className='text-xl font-semibold text-center py-4'>Thêm homestay</p>
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
                                    name="areaId"
                                    label="Khu"
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <Select
                                        defaultValue={formCreate.areaAdminResponseDtoList[0].id}
                                        defaultActiveFirstOption={true}
                                        style={{ fontWeight: 'initial' }}>
                                        {
                                            formCreate.areaAdminResponseDtoList
                                                .map((area) => (
                                                    <Option key={area.id} value={area.id}>{area.name}</Option>
                                                ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="householdId"
                                    label="Hộ kinh doanh"
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <Select
                                        defaultValue={formCreate.householdResponseDtoList[0].id}
                                        defaultActiveFirstOption={true}
                                        style={{ fontWeight: 'initial' }}>
                                        {
                                            formCreate.householdResponseDtoList
                                                .map((household) => (
                                                    <Option key={household.id} value={household.id}>{household.householdName}</Option>

                                                ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="homestayName"
                                    label="Mã homestay"
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <Input style={{ fontWeight: 'initial' }} />
                                </Form.Item>

                            </Form>
                        </div>
                    </Modal>
                </div>
            )}
        </>
    );
}