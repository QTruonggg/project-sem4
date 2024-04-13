'use client';


import householdApi from '@/api/householdApi';
import { IHouseholdAdminResponse } from '@/types/householdType';
import { Badge, Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Tooltip, Upload, UploadFile, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as React from 'react';
import Image from 'next/image';


export interface IHouseholdManagementProps {
}
export default function HouseholdManagement(props: IHouseholdManagementProps) {
    const [form] = Form.useForm();
    const [selectedHousehold, setSelectedHousehold] = React.useState<IHouseholdAdminResponse>();
    const [householdUpdate, setHouseholdUpdate] = React.useState<IHouseholdAdminResponse>();
    const [modalDetailOpen, setModalDetailOpen] = React.useState(false);
    const [modaFormUpdatelOpen, setModalFormUpdateOpen] = React.useState(false);
    const [modalFormCreateOpen, setModalFormCreateOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const [messageApi, contextHolder] = message.useMessage();


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Bạn đã thêm hộ kinh doanh thành công',
        });
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


    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }


        // Lấy file từ event
        const file = e?.file;


        const fileUrl = file.originFileObj as File;


        // Lưu file vào state selectedImage
        setSelectedImage(fileUrl);


        return fileUrl;
    };




    const [listHousehold, setListHousehold] = React.useState<IHouseholdAdminResponse[]>([]);
    React.useEffect(() => {
        householdApi.getHouseholdsAdmin().then((res) => {
            setListHousehold(res.householdDetailListForAdmin);
        });
    }, []);


    const showModelHouseholdDetail = (householdId: number) => {
        const household = listHousehold.filter((h) => h.householdId === householdId).at(0);
        setSelectedHousehold(household);
        setModalDetailOpen(true);
    };


    const handleDeleteHousehold = async (housholdId: number) => {
        try {
            householdApi.deleteHouseholdByAdmin(housholdId).then((res) => {
                console.log(res);
                message.success('Bạn đã xoá hộ kinh doanh thành công', 3);


                householdApi.getHouseholdsAdmin().then((res) => {
                    setListHousehold(res.householdDetailListForAdmin);
                });


            });


        } catch (error) {


        }
    };


    const handleHideHousehold = async (housholdId: number) => {
        try {
            householdApi.hideHouseholdByAdmin(housholdId).then((res) => {
                console.log(res);
                message.success('Bạn đã ẩn hộ kinh doanh thành công', 3);


                householdApi.getHouseholdsAdmin().then((res) => {
                    setListHousehold(res.householdDetailListForAdmin);
                });


            });
        } catch (error) {


        }
    };


    const handleShowHousehold = async (housholdId: number) => {
        try {
            householdApi.showHouseholdByAdmin(housholdId).then((res) => {
                console.log(res);
                message.success('Bạn đã hiện hộ kinh doanh thành công', 3);


                householdApi.getHouseholdsAdmin().then((res) => {
                    setListHousehold(res.householdDetailListForAdmin);
                });


            });
        } catch (error) {


        }
    };


    const resetForm = () => {
        form.resetFields();
    };


    const showModelFormCreate = () => {
        setModalFormCreateOpen(true);
        resetForm();
    };


    const showModelFormUpdate = (householdId: number) => {
        const household = listHousehold.filter((h) => h.householdId === householdId).at(0);
        setHouseholdUpdate(household);
        setModalFormUpdateOpen(true);
        resetForm();
    };


    React.useEffect(() => {
        form.setFieldsValue({
            householdId: householdUpdate?.householdId,
            householdName: householdUpdate?.householdName,
        });
    }, [modaFormUpdatelOpen, form, householdUpdate?.householdId, householdUpdate?.householdName]);




    const onCreate = async (values: any) => {
        console.log(values)
        setModalFormCreateOpen(false);


        try {
            householdApi.createHouseholdByAdmin(values).then((res) => {
                console.log(res);
                message.success('Bạn đã thêm hộ kinh doanh thành công', 3);


                householdApi.getHouseholdsAdmin().then((res) => {
                    setListHousehold(res.householdDetailListForAdmin);
                });


            });
        } catch (error) {
            console.error('Failed to create household:', error);
        }
    }


    const onUpdate = async (values: any) => {
        console.log(values)
        setModalFormUpdateOpen(false);


        try {
            householdApi.updateHouseholdByAdmin(values).then((res) => {
                console.log(res);
                message.success('Bạn đã cập nhật hộ kinh doanh thành công', 3);


                householdApi.getHouseholdsAdmin().then((res) => {
                    setListHousehold(res.householdDetailListForAdmin);
                });


            });
        } catch (error) {
            console.error('Failed to update homestay:', error);
        }
    }


    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-5 pt-5'>
                <Col className="gutter-row" span={24}>
                    <div className='flex'>
                        <div className="inline-block mr-4">
                            <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">Tổng số hộ kinh doanh : {listHousehold.length}</p>
                        </div>
                        <button className="inline-block"
                            onClick={() => showModelFormCreate()}
                        >
                            <p className="bg-green-500 text-white py-3 px-4 rounded-md shadow-md">+ Thêm hộ kinh doanh</p>
                        </button>
                    </div>
                </Col>
            </Row>


            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-5'>
                {
                    listHousehold.map((hh) => (
                        <Col key={hh.householdId} className="gutter-row pt-5" span={8}>
                            <Card style={{ width: '100%' }} className='h-40'>
                                <Row>
                                    <Col span={8}>
                                        <Image
                                            width={1000}
                                            height={1000}
                                            className="object-contain w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 rounded"
                                            src={hh?.avatar === null ? '/images/avt.png' : hh?.avatar}
                                            alt="Image"
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <div className="flex flex-col justify-between leading-normal">
                                            <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                                <Tooltip title={hh.householdName}>
                                                    <p className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hh.householdName}</p></Tooltip>
                                            </p>
                                            <p className="text-gray-900">
                                                <span className="text-sm font-normal" style={{ fontWeight: 'bolder', fontSize: '12px' }}>Homestay :</span>
                                                <br />
                                                {hh?.homestayDetailForAdminList.length > 0 ? (
                                                    hh.homestayDetailForAdminList.map((detail, index) => (
                                                        <span key={index}>
                                                            {detail.homestayCode}
                                                            {index !== hh.homestayDetailForAdminList.length - 1 ? ' - ' : ''}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span style={{ fontSize: '11px' }}>Không có homestay</span>
                                                )}
                                            </p>
                                            <p className="mb-2 text-gray-700">
                                                {hh?.householdStatus === 'ACTIVE' ? (
                                                    <Badge status="success" text={<span className="text-xs font-semibold" style={{ color: 'green' }}>Đang hoạt động</span>} />
                                                ) : hh?.householdStatus === 'DELETED' ? (
                                                    <Badge status="error" text={<span className="text-xs font-semibold" style={{ color: 'red' }}>Không hoạt động</span>} />
                                                ) : (
                                                    <Badge status="warning" text={<span className="text-xs font-semibold" style={{ color: 'orange' }}>Đã ẩn trên trang web</span>} />
                                                )}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div className="flex flex-col justify-between items-center">
                                            <button className="px-2 text-green-500" onClick={() => showModelHouseholdDetail(hh?.householdId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                                </svg>
                                            </button>
                                            {hh.householdStatus !== 'DELETED' ? (
                                                <button className="px-2 text-blue-500" onClick={() => showModelFormUpdate(hh.householdId)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                            ) : null}
                                            {hh.householdStatus === 'ACTIVE' ? (
                                                <button className='px-2 text-black-500'
                                                    onClick={() => handleHideHousehold(hh?.householdId)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button className='px-2 text-black-500'
                                                    onClick={() => handleShowHousehold(hh?.householdId)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                    </svg>
                                                </button>
                                            )
                                            }
                                            {hh.householdStatus !== 'DELETED' ? (
                                                <Popconfirm
                                                    title="Xoá hộ kinh doanh"
                                                    description="Bạn chắc chắn muốn xoá hộ kinh doanh này?"
                                                    okType="danger"
                                                    okText="Có"
                                                    cancelText="Không"
                                                    okButtonProps={{ style: { border: 'none', color: 'white', backgroundColor: 'red' } }}
                                                    onConfirm={() => handleDeleteHousehold(hh.householdId)}
                                                >
                                                    <Button danger style={{ border: 'none' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a3 3 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </Button>
                                                </Popconfirm>
                                            ) : null}
                                        </div>
                                    </Col>
                                </Row>

                            </Card>

                        </Col>
                    ))
                }
            </Row>


            {/* Model detail */}
            {
                selectedHousehold && (
                    <Modal
                        style={{ top: 20 }}
                        open={modalDetailOpen}
                        onOk={() => setModalDetailOpen(false)}
                        onCancel={() => setModalDetailOpen(false)}
                        okText="Đóng"
                        okButtonProps={{ style: { border: 'none', color: 'white', backgroundColor: '#1890ff' } }}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        width={800}
                    >
                        <div className="justify-center items-center pb-4">
                            <p className='text-2xl font-bold text-center py-3'>Thông tin chi tiết hộ kinh doanh</p>
                        </div>
                        <p className='text-lg font-semibold pb-5'>Thông tin chủ hộ kinh doanh</p>
                        <div>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold.householdName === null ? (
                                            <p className='py-1'>Chưa có tên hộ kinh doanh</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.householdName}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Tên hộ kinh doanh</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    <p className='py-1'>{selectedHousehold?.managerFirstName + ' ' + selectedHousehold?.managerLastName}</p>
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Chủ hộ kinh doanh</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.phoneNumberFirst === null ? (
                                            <p className='py-1'>Chưa có số điện thoại</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.phoneNumberFirst}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Số điện thoại</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.managerEmail === null ? (
                                            <p className='py-1'>Chưa có email</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.managerEmail}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Email chủ hộ</p>
                                </Col>
                            </Row>


                            <p className='text-lg font-semibold py-5'>Thông tin homestay</p>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.homestayDetailForAdminList.length === 0 ? (
                                            <p className='py-1'>0 homestay</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.homestayDetailForAdminList.length} homestay</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Số homestay</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {/* <p className='py-1'>a</p> */}
                                    {
                                        selectedHousehold?.homestayDetailForAdminList.length === 0 ? (
                                            <p className='py-1'>Chưa có homestay</p>
                                        ) : (


                                            selectedHousehold?.homestayDetailForAdminList.map((detail) => (
                                                <div key={detail.homestayId} className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                        <thead className="text-xs text-blue-700 uppercase dark:text-gray-400">
                                                            <tr>
                                                                <th scope="col" className="px-4 py-2 bg-gray-50 dark:bg-gray-800">
                                                                    Homestay {detail.homestayCode}
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                                    Mã homestay
                                                                </th>
                                                                <td className="px-4 py-2">
                                                                    {detail.homestayCode}
                                                                </td> </tr>
                                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                                    Sức chứa tối đa
                                                                </th>
                                                                <td className="px-4 py-2">
                                                                    {detail.homestayCode}
                                                                </td>


                                                            </tr>
                                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                                    Số phòng
                                                                </th>
                                                                <td className="px-4 py-2">
                                                                    {detail.numberOfRoom}
                                                                </td>


                                                            </tr>
                                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                                    Số chỗ ở tập thể
                                                                </th>
                                                                <td className="px-4 py-2">
                                                                    {detail.numberOfDorm}
                                                                </td>
                                                            </tr>


                                                        </tbody>
                                                    </table>
                                                </div>


                                            ))
                                        )
                                    }


                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Thông tin homestay</p>
                                </Col>
                            </Row>


                            <p className='text-lg font-semibold py-5'>Thông tin giới thiệu hộ kinh doanh</p>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    <p className='font-semibold'>Ảnh bìa</p>
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold'>Ảnh đại diện</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='pb-2'>
                                <Col span={12} push={10}>
                                    <Image height={1000} width={1000} src={selectedHousehold?.coverImage === null ? "/images/avt.png" : selectedHousehold?.coverImage} className="w-full h-48 max-w-xl object-cover rounded-lg py-1" alt="image description" />
                                </Col>
                                <Col span={10} pull={12}>
                                    <Image height={1000} width={1000} className="rounded-full w-48 h-48 py-1" src={selectedHousehold?.avatar === null ? "/images/avt.png" : selectedHousehold?.avatar} alt="image description" />
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.phoneNumberFirst === null ? (
                                            <p className='py-1'>Chưa có số điện thoại</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.phoneNumberFirst}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Số điện thoại 1</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.phoneNumberSecond === null ? (
                                            <p className='py-1'>Chưa có số điện thoại</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.phoneNumberSecond}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Số điện thoại 2</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.managerEmail === null ? (
                                            <p className='py-1'>Chưa có email</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.managerEmail}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Email</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.linkFacebook === null ? (
                                            <p className='py-1'>Chưa có link facebook</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.linkFacebook}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Link facebook</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.linkTiktok === null ? (
                                            <p className='py-1'>Chưa có link tiktok</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.linkTiktok}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Link tiktok</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.description === null ? (
                                            <p className='py-1'>Chưa có mô tả cho hộ kinh doanh</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.description}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Lời giới thiệu</p>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12} push={10}>
                                    {
                                        selectedHousehold?.linkYoutube === null ? (
                                            <p className='py-1'>Chưa có link video giới thiệu</p>
                                        ) : (
                                            <p className='py-1'>{selectedHousehold?.linkYoutube}</p>
                                        )
                                    }
                                </Col>
                                <Col span={10} pull={12}>
                                    <p className='font-semibold py-1'>Link video giới thiệu</p>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                )
            }


            {/* Model create */}
            <Modal
                style={{ top: 20 }}
                open={modalFormCreateOpen}
                onOk={() => { form.submit() }}
                okText='Thêm hộ kinh doanh'
                okButtonProps={{ style: { color: 'white', backgroundColor: '#1890ff' } }}
                cancelText='Huỷ'
                onCancel={() => setModalFormCreateOpen(false)}
            >
                <p className='text-xl font-semibold text-center py-4'>Thêm khu</p>
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
                            name="householdName"
                            label="Tên hộ kinh doanh"
                            style={{ fontWeight: 'bolder' }}
                            rules={[
                                {
                                    required: true,
                                    message: <span style={{ fontSize: '10px' }}>Vui lòng nhập tên hộ kinh doanh</span>,
                                },
                                {
                                    max: 50,
                                    message: <span style={{ fontSize: '10px' }}>Tên hộ kinh doanh không được vượt quá 50 ký tự</span>,
                                }
                            ]}
                        >
                            <Input style={{ fontWeight: 'initial' }} />
                        </Form.Item>
                        <Form.Item
                            name="avatar"
                            label="Ảnh đại diện"
                            getValueFromEvent={normFile}
                            style={{ fontWeight: 'bolder' }}
                            rules={[
                                {
                                    required: true,
                                    message: <span style={{ fontSize: '10px' }}>Vui lòng tải lên ảnh đại diện</span>,
                                },
                            ]}
                        >
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                maxCount={1}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />}>Ấn để tải lên</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>


            {/* Modal update */}
            {
                householdUpdate && (
                    <Modal
                        style={{ top: 20 }}
                        open={modaFormUpdatelOpen}
                        onOk={() => { form.submit() }}
                        okText='Chỉnh sửa hộ kinh doanh'
                        cancelText='Huỷ'
                        okButtonProps={{ style: { color: 'white', backgroundColor: '#1890ff' } }}
                        onCancel={() => setModalFormUpdateOpen(false)}
                    >
                        <p className='text-xl font-semibold text-center py-4'>Chỉnh sửa hộ kinh doanh</p>
                        <div>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onUpdate}
                                initialValues={{


                                }}
                                style={{ maxWidth: 600 }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="householdId"
                                    hidden
                                >
                                </Form.Item>
                                <Form.Item
                                    name="householdName"
                                    label="Tên hộ kinh doanh"
                                    style={{ fontWeight: 'bolder' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: <span style={{ fontSize: '10px' }}>Vui lòng nhập tên hộ kinh doanh</span>,
                                        },
                                        {
                                            max: 50,
                                            message: <span style={{ fontSize: '10px' }}>Tên hộ kinh doanh không được vượt quá 50 ký tự</span>,
                                        }
                                    ]}
                                >
                                    <Input style={{ fontWeight: 'initial' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Ảnh đại diện"
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <Image
                                        width={1000}
                                        height={1000}
                                        className="w-20 h-auto max-w-full"
                                        src={householdUpdate.avatar === null ? '/images/avt.png' : householdUpdate.avatar}
                                        alt="Household Avatar"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="avatar"
                                    label="Cập nhật"
                                    getValueFromEvent={normFile}
                                    style={{ fontWeight: 'bolder' }}
                                >
                                    <Upload name="image" listType="picture" maxCount={1}>
                                        <Button icon={<UploadOutlined />}>Ấn để tải lên</Button>
                                    </Upload>
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                )
            }


        </>
    );
}


