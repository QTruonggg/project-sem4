'use client';
import * as React from 'react';
import { Row, Col, Popconfirm, Button, Modal, Form, Upload, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { IAreaResponse } from '@/types/areaType';
import areaApi from '@/api/areaApi';
import Image from 'next/image';
import LoadingPage from '@/Components/common/LoadingPage';
import { fi } from 'date-fns/locale';

export interface IAreaManagementProps {
}

export default function AreaManagement(props: IAreaManagementProps) {
  const [form] = Form.useForm();
  const [selectedArea, setSelectedArea] = React.useState<IAreaResponse>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalFormCreateOpen, setModalFormCreateOpen] = React.useState(false);
  const [listArea, setListArea] = React.useState<IAreaResponse[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [areaUpdate, setAreaUpdate] = React.useState<IAreaResponse>();
  const [modaFormUpdatelOpen, setModalFormUpdateOpen] = React.useState(false);

  const [loading, setLoading] = React.useState<boolean>(true);

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

  React.useEffect(() => {
    setLoading(true);
    areaApi.getAllArea().then((res) => {
      setListArea(res.areaAdminResponseDtos);
    }).catch((err) => { }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleDeleteArea = async (id: number) => {
    try {
      setLoading(true);
      await areaApi.deleteArea(id);
      const updatedList = await areaApi.getAllArea();
      setListArea(updatedList.areaAdminResponseDtos);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalAreaDetail = (areaId: number) => {
    const area = listArea.filter((a) => a.id === areaId).at(0)
    setSelectedArea(area);
    setIsModalOpen(true);
  };

  const showModalAreaFormUpdate = (areaId: number) => {
    const area = listArea.filter((a) => a.id === areaId).at(0)
    setAreaUpdate(area);
    setModalFormUpdateOpen(true);
    resetForm();
  };

  React.useEffect(() => {
    form.setFieldsValue({
      id: areaUpdate?.id,
      name: areaUpdate?.name,
    });
    //eslint-disable-next-line
  }, [modaFormUpdatelOpen]);

  const resetForm = () => {
    form.resetFields();
  };

  const showModelFormCreate = () => {
    setModalFormCreateOpen(true);
    resetForm();
  };

  const onCreate = async (values: any) => {
    console.log(values)
    setModalFormCreateOpen(false);

    try {
      setLoading(true);
      await areaApi.createHouseholdByAdmin(values);
      const updatedData = await areaApi.getAllArea();
      setListArea(updatedData.areaAdminResponseDtos);
      message.success('Thêm khu thành công');
    } catch (error) {
      console.error('Failed to update homestay:', error);
      message.error('Thêm khu không thành công');
    } finally {
      setLoading(false);
    }
  }

  const onUpdate = async (values: any) => {
    console.log(values)
    setModalFormUpdateOpen(false);

    try {
      setLoading(true);
      await areaApi.updateAreaByAdmin(values);
      const updatedData = await areaApi.getAllArea();
      setListArea(updatedData.areaAdminResponseDtos);
      message.success('Cập nhật khu thành công');
    } catch (error) {
      

      message.error('Cập nhật khu không thành công');
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
              <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">Tổng số khu : {listArea?.length}</p>
            </div>
            <button className="inline-block"
              onClick={() => showModelFormCreate()}
            >
              <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">+ Thêm khu</p>
            </button>
          </div>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='p-8'>
        {
          listArea?.map((item, index) => (
            <Col key={index} className="gutter-row" span={6}>
              <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <Image width={1000} height={0} className="rounded-lg mx-auto w-auto h-40 object-fit-cover" src={item.image === null ? '/images/avt.png' : item.image} alt="product image" />                </a>
                <div className="px-5 pt-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center" style={{ color: '#9B1C1C' }}>{item.name}</h5>
                  </a>
                  <div className="flex justify-center items-center m-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Số homestay : {item.totalHomestay}</span>
                  </div>
                </div>
              </div>
              <div className='text-center flex justify-center pt-2'>
                <div className='flex items-center'>
                  <button className='px-2 text-green-500 px-4'
                    onClick={() => { showModalAreaDetail(item.id) }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                  </button>
                  <button className='px-2 text-blue-500'
                    onClick={() => { showModalAreaFormUpdate(item.id) }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>

                  <Popconfirm
                    title="Xoá khu"
                    description="Bạn chắc chắn muốn xoá khu này?"
                    okType='danger'
                    okText={<span style={{ color: '' }}>Yes</span>}
                    cancelText="No"
                    onConfirm={() => handleDeleteArea(item.id)}
                  >
                    <Button danger disabled={item.totalHomestay > 0} style={{ border: 'none' }}>
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

      {/* Model detail */}
      <Modal open={isModalOpen} style={{ top: 20 }} onOk={handleOk} okButtonProps={{ className: "bg-blue-500 text-white shadow-md" }} onCancel={handleCancel}>
        <div className="justify-center items-center">
          <p className='text-xl font-bold text-center py-3'>Thông tin chi tiết khu vực</p>
          <Image width={200} height={0} className=" rounded-lg mx-auto"
            src={selectedArea?.image == null ? '/images/avt.png' : selectedArea.image} alt="image description" />
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row py-3" span={24}>
              <p className='font-semibold text-center'>Tên khu</p>
            </Col>
            <Col className="gutter-row text-center" span={24}>
              {selectedArea?.name}
            </Col>
            <Col className="gutter-row py-3" span={24}>
              <p className='font-semibold text-center'>Số homestay</p>
            </Col>
            <Col className="gutter-row text-center" span={24}>
              {selectedArea?.totalHomestay}
            </Col>
            <Col className="gutter-row py-3" span={24}>
              <p className='font-semibold text-center'>Danh sách homestay</p>
            </Col>
            <Col className="gutter-row py-3" span={24}>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        Mã homestay
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Tên homestay
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedArea?.homestays.map((a, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-center">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {a.homestayCode}
                        </th>
                        <td className="px-6 py-4 text-center">
                          {a.householdName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </Col>
          </Row>
        </div>

      </Modal>

      {/* Model create */}
      <Modal
        style={{ top: 20 }}
        open={modalFormCreateOpen}
        onOk={() => { form.submit() }}
        okText='Thêm khu'
        okButtonProps={{ className: "bg-blue-500 text-white shadow-md" }}
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
              name="name"
              label="Tên khu"
              style={{ fontWeight: 'bolder' }}
              rules={[
                {
                  required: true,
                  message: <span style={{ fontSize: '10px' }}>Vui lòng nhập tên khu</span>,
                },
                {
                  max: 50,
                  message: <span style={{ fontSize: '10px' }}>Tên khu không được vượt quá 50 ký tự</span>,
                }
              ]}
            >
              <Input style={{ fontWeight: 'initial' }} />
            </Form.Item>
            <Form.Item
              name="image"
              label="Ảnh đại diện"
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

      {/* Modal update */}
      {
        areaUpdate && (
          <Modal
            style={{ top: 20 }}
            open={modaFormUpdatelOpen}
            onOk={() => { form.submit() }}
            okText='Chỉnh sửa thông tin khu'
            okButtonProps={{ className: "bg-blue-500 text-white shadow-md" }}
            cancelText='Huỷ'
            onCancel={() => setModalFormUpdateOpen(false)}
          >
            <p className='text-xl font-semibold text-center py-4'>Chỉnh sửa thông tin khu</p>
            <div>
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onUpdate}
                initialValues={{
                  id: areaUpdate.id,
                  name: areaUpdate.name,
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
                  name="name"
                  label="Tên khu"
                  style={{ fontWeight: 'bolder' }}
                  required
                >
                  <Input style={{ fontWeight: 'initial' }} />
                </Form.Item>
                <Form.Item
                  label="Ảnh đại diện"
                  style={{ fontWeight: 'bolder' }}
                >
                  <Image
                    width={1000}
                    height={0}
                    className="w-20 h-auto max-w-full"
                    src={areaUpdate?.image === null ? '/images/avt.png' : areaUpdate?.image}
                    alt="Household Avatar"
                  />
                </Form.Item>
                <Form.Item
                  name="image"
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
