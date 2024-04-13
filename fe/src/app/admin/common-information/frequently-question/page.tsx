'use client';
import { Col, Form, Modal, Popconfirm, Row, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, Select } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import { IFrequentlyQuestionByAdminResponse, IFrequentlyQuestionFormUpdateResponse } from '@/types/frequentlyQuestionType';
import frequentlyQuestionApi from '@/api/frequentlyQuestionApi';
import { Finlandica } from 'next/font/google';
import LoadingPage from '@/Components/common/LoadingPage';

export interface IFrequentlyQuestionManagementProps {
}
export default function FrequentlyQuestionManagement(props: IFrequentlyQuestionManagementProps) {
    const [form] = Form.useForm();
    const [questionCreate, setQuestionCreate] = React.useState<string[]>();
    const [questionUpdate, setQuestionUpdate] = React.useState<IFrequentlyQuestionFormUpdateResponse>();
    const [listFrequentlyQuestion, setListFrequentlyQuestion] = React.useState<IFrequentlyQuestionByAdminResponse[]>([]);
    const [modalFormCreateOpen, setModalFormCreateOpen] = React.useState(false);
    const [modalFormUpdateOpen, setModalFormUpdateOpen] = React.useState(false);

    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setLoading(true);
        frequentlyQuestionApi.getAllfrequentlyQuestionByAdmin().then((res) => {
            setListFrequentlyQuestion(res.frequentlyQuestions);
        }).catch((err) => {}).finally(() => {
            setLoading(false);
        });
    }, []);

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

    const getQuestionTypeLabel = (questionType: string): string => {
        switch (questionType) {
            case 'CANCEL_BOOKING_OR_CHANGE_BOOKING':
                return 'Huỷ phòng/Thay đổi đặt phòng';
            case 'PAYMENT_METHOD':
                return 'Thanh toán/Hoá đơn';
            case 'BOOKING_DETAILS':
                return 'Chi tiết đặt phòng';
            case 'ROOM_TYPE':
                return 'Các loại phòng';
            case 'PRICE':
                return 'Giá cả';
            case 'CHECK_IN_CHECK_OUT':
                return 'Chính sách nhận phòng & trả phòng';
            case 'OTHERS':
                return 'Câu hỏi khác';
            default:
                return questionType;
        }
    };

    interface DataType {
        id: number,
        question: string,
        answer: string,
        type: string,
        status: string,
    }

    type DataIndex = keyof DataType;

    const data: DataType[] = listFrequentlyQuestion;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

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

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
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


    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            render: (text: string, record: DataType, index: number) => (
                <span>{index + 1}</span>
            ),
        },
        {
            title: 'Loại câu hỏi',
            dataIndex: 'type',
            key: 'type',
            width: '20%',
            render: (text: string) => (
                <p>{getQuestionTypeLabel(text)}</p>
            ),
        },
        {
            title: 'Câu hỏi',
            dataIndex: 'question',
            key: 'question',
            width: '20%',
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Câu trả lời',
            dataIndex: 'answer',
            key: 'answer',
            width: '40%',
        },
        {
            width: '5%',
            render: (record: DataType) => (
                <button className="inline-block text-blue-500"
                    onClick={() => showQuestionFormUpdate(record.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                </button>
            ),
        },
        {
            width: '5%',
            render: (record: DataType) => (
                <Popconfirm
                    title="Xoá câu hỏi"
                    description="Bạn chắc chắn muốn xoá câu hỏi này?"
                    okType='danger'
                    okText={<span style={{ color: '' }}>Có</span>}
                    cancelText="Không"
                    onConfirm={() => handleDeleteQuestion(record.id)}
                >
                    <Button danger style={{ border: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const resetForm = () => {
        form.resetFields();
    };

    const showQuestionFormCreate = () => {
        resetForm();
        frequentlyQuestionApi.getQuestionFormCreateAdmin().then(async (res) => {
            setQuestionCreate(res.frequentlyQuestionTypes);
            setModalFormCreateOpen(true);
        });
    };

    const showQuestionFormUpdate = (questionId: number) => {
        frequentlyQuestionApi.getQuestionFormUpdateAdmin(questionId).then(async (res) => {
            setQuestionUpdate(res);
            console.log(res)
            setModalFormUpdateOpen(true);
        });
    };

    const onCreate = async (values: any) => {
        console.log(values)
        setModalFormCreateOpen(false);

        try {
            setLoading(true);
            await frequentlyQuestionApi.createFrequentlyQuestionByAdmin(values);
            const updatedData = await frequentlyQuestionApi.getAllfrequentlyQuestionByAdmin();
            setListFrequentlyQuestion(updatedData.frequentlyQuestions);
            message.success('Thêm câu hỏi thành công');
        } catch (error) {
            console.error('Failed to create question', error);
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values: any) => {
        setModalFormUpdateOpen(false);
        console.log(values)
        try {
            setLoading(true);
            await frequentlyQuestionApi.updateFrentlyQuestionByAdmin(values);
            const updatedData = await frequentlyQuestionApi.getAllfrequentlyQuestionByAdmin();
            setListFrequentlyQuestion(updatedData.frequentlyQuestions);
            message.success('Thêm câu hỏi thành công');
        } catch (error) {
            console.error('Failed to update room type:', error);
            message.error('Thêm câu hỏi không thành công');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        form.setFieldsValue({
            id: questionUpdate?.frequentlyQuestion.id,
            type: questionUpdate?.frequentlyQuestion.type,
            question: questionUpdate?.frequentlyQuestion.question,
            answer: questionUpdate?.frequentlyQuestion.answer,
        });
    }, [questionUpdate, form]);

    const handleDeleteQuestion = async (questionId: number) => {
        try {
            setLoading(true);
            await frequentlyQuestionApi.deleteQuestionByAdmin(questionId);
            const updatedList = await frequentlyQuestionApi.getAllfrequentlyQuestionByAdmin();
            setListFrequentlyQuestion(updatedList.frequentlyQuestions);
            message.success('Xoá câu hỏi thành công');
        } catch (error) {
            message.error('Xoá câu hỏi không thành công');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <LoadingPage />}
            <div className='px-8 pt-5'>
                <p className='text-2xl font-semibold'>Câu hỏi thường gặp</p>
            </div>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='px-8 pt-5'>
                <Col className="gutter-row" span={24}>
                    <div className='flex'>
                        <div className="inline-block mr-4">
                            <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">Tổng số câu hỏi : {listFrequentlyQuestion?.length}</p>
                        </div>
                        <button className="inline-block"
                            onClick={() => showQuestionFormCreate()}
                        >
                            <p className="bg-blue-500 text-white py-3 px-4 rounded-md shadow-md">+ Thêm câu hỏi</p>
                        </button>
                    </div>
                </Col>
            </Row>

            <Table className='mx-8 my-5 border rounded-lg' columns={columns} dataSource={data} pagination={{pageSize:5}} />

            {
                questionCreate && (
                    <Modal
                        style={{ top: 20 }}
                        open={modalFormCreateOpen}
                        onOk={() => { form.submit() }}
                        okButtonProps={{ className: "bg-blue-500 text-white shadow-md" }}
                        okText='Thêm câu hỏi'
                        cancelText='Huỷ'
                        onCancel={() => setModalFormCreateOpen(false)}
                    >
                        <p className='text-xl font-semibold text-center py-4'>Thêm câu hỏi thường gặp</p>
                        <div>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onCreate}
                                style={{ maxWidth: 600 }}
                                initialValues={
                                    {
                                        type: questionCreate[0],
                                    }
                                }
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="type"
                                    label="Loại câu hỏi"
                                    style={{ fontWeight: 'bolder' }}
                                    required
                                >
                                    <Select defaultValue={questionCreate[0]}>
                                        {
                                            questionCreate?.map((item) => (
                                                <Select.Option key={item} value={item}>{getQuestionTypeLabel(item)}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="question"
                                    label="Câu hỏi"
                                    style={{ fontWeight: 'bolder' }}
                                    required
                                >
                                    <Input style={{ fontWeight: 'initial' }} />
                                </Form.Item>
                                <Form.Item
                                    name="answer"
                                    label="Câu trả lời"
                                    style={{ fontWeight: 'bolder' }}
                                    required
                                >
                                    <Input.TextArea style={{ fontWeight: 'initial' }} />
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                )
            }

            {questionUpdate && (
                <div>
                    <Modal
                        style={{ top: 20 }}
                        open={modalFormUpdateOpen}
                        onOk={() => { form.submit() }}
                        onCancel={() => setModalFormUpdateOpen(false)}
                        okButtonProps={{ className: "bg-blue-500 text-white shadow-md" }}
                        okText='Cập nhật câu hỏi'
                        cancelText='Huỷ'
                    >
                        <p className='text-xl font-semibold text-center py-4'>Chỉnh sửa câu hỏi</p>
                        <div>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{
                                    id: questionUpdate?.frequentlyQuestion.id,
                                    type: questionUpdate?.frequentlyQuestion.type,
                                    question: questionUpdate?.frequentlyQuestion.question,
                                    answer: questionUpdate?.frequentlyQuestion.answer,
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
                                    name="type"
                                    label="Loại câu hỏi"
                                    style={{ fontWeight: 'bolder' }}
                                    required
                                >
                                    <Select defaultValue={questionUpdate.frequentlyQuestionTypes.filter(item => item === questionUpdate.frequentlyQuestion.type)[0]
                                    }>
                                        {
                                            questionUpdate?.frequentlyQuestionTypes.map((item) => (
                                                <Select.Option key={item} value={item}>{getQuestionTypeLabel(item)}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="question"
                                    label="Câu hỏi"
                                    style={{ fontWeight: 'bolder' }}
                                    required
                                >
                                    <Input style={{ fontWeight: 'initial' }} />
                                </Form.Item>
                                <Form.Item
                                    name="answer"
                                    label="Câu trả lời"
                                    style={{ fontWeight: 'bolder' }}
                                    required
                                >
                                    <Input.TextArea style={{ fontWeight: 'initial' }} />
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                </div>
            )}

        </>
    );
}