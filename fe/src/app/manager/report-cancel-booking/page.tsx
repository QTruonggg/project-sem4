'use client';
import * as React from 'react';
import { DatePicker } from 'antd';
import 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import viVN from 'antd/es/date-picker/locale/vi_VN';
import { faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reportApi from '@/api/reportApi';
import { IManagerBookingReport } from '@/types/reportType';
import LoadingPage from '@/Components/common/LoadingPage';
import Pagination from '@/Components/booking/Pagination';

export interface IReportCancelBookingProps {
}

export default function ReportCancelBooking(props: IReportCancelBookingProps) {
    const { RangePicker } = DatePicker;
    const [loading, setLoading] = React.useState(false);
    const [reportData, setReportData] = React.useState<IManagerBookingReport>();
    const [sumTotalRevenue, setSumTotalRevenue] = React.useState<number>(0);
    const [checkInDate, setCheckInDate] = React.useState<string>();
    const [checkOutDate, setCheckOutDate] = React.useState<string>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const dateFormat = 'DD/MM/YYYY';
    const today = dayjs().startOf('day');

    const disabledDate = (current: any) => {
        return current && current > today;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = reportData?.bookingReportDetailListForManager.slice(startIndex, endIndex);

    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        const checkInDateString = convertDateFormat(dateStrings[0] as string);
        const checkOutDateString = convertDateFormat(dateStrings[1] as string);

        setCheckInDate(checkInDateString);
        setCheckOutDate(checkOutDateString);

        const checkInDate = dayjs(checkInDateString);
        const checkOutDate = dayjs(checkOutDateString);

        // Kiểm tra nếu ngày checkOutDate trước hoặc bằng ngày checkInDate, thì tăng ngày checkOutDate lên 1 ngày
        if (checkOutDate.isSame(checkInDate) || checkOutDate.isBefore(checkInDate)) {
            setCheckOutDate(checkInDate.clone().add(1, 'day').format('YYYY-MM-DD'));
        }
    };

    const convertDateFormat = (dateString: string) => {
        if (typeof dateString == "string" && dateString.indexOf('/') > -1) {
            const parts = dateString.split('/');
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            return `${year}-${month}-${day}`;
        } else {
            return dateString;
        }
    }

    const getReport = () => {
        setLoading(true);
        reportApi.getManagerCancelBookingReport(checkInDate as string, checkOutDate as string).then((res) => {
            setReportData(res);
            let sumTotalRevenue = 0;
            res.bookingReportDetailListForManager?.forEach((report) => {
                sumTotalRevenue += report.refundAmount ? report.refundAmount : 0;
            })
            setSumTotalRevenue(sumTotalRevenue);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        }
        )
    }

    const convertDate = (date: string) => {
        const parts = date.split('T');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${timeParts[0]}:${timeParts[1]}`;
    }

    const exportToExcel = (data: any, filename: string) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            [
                'BÁO CÁO ĐƠN ĐẶT PHÒNG HỦY KÈM HOÀN TIỀN'
            ],
            [   '',
                'Từ ngày - Đến ngày: ', // Dòng chứa thông tin ngày tháng
                `${checkInDate} đến ${checkOutDate}`, // Ngày tháng từ state của component
            ],
            [
                '#',
                'Mã đơn đặt phòng',
                'Thời gian đặt phòng',
                'Tên người đặt',
                'Số lượng (khách)',
                'Số đêm (đêm)',
                'Chi phí (VNĐ)',
                'Thời gian hủy phòng',
                'Thời gian hoàn tiền',
                'Số tiền hoàn (VNĐ)',
                'Ghi chú',
            ],
            ...data.map((report: any, index: number) => [
                index + 1,
                report.bookingCode,
                convertDate(report.checkInDate),
                report.customerName,
                report.totalCustomer,
                report.bookedNight,
                convertPrice(report.totalRevenue),
                report.paymentDate ? convertDate(report.paymentDate) : '',
                report.refundDate ? convertDate(report.refundDate) : '',
                report.refundAmount ? convertPrice(report.refundAmount) : '',
                report.note ? report.note : '',
            ]),
        ]);
        const wscols = [
            { wch: 5 },
            { wch: 20 },
            { wch: 25 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 15 },
            { wch: 20 },
        ];
        worksheet['!cols'] = wscols;
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, filename + '.xlsx');
    };


    const handleExportExcel = () => {
        const exportData = reportData?.bookingReportDetailListForManager || [];
        exportToExcel(exportData, 'Báo cáo đơn đặt phòng hủy kèm hoàn tiền');
    };


    const convertPrice = (num: number | undefined) => {
        if (typeof num === 'undefined') {
            return '';
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return (
        <div className='w-11/12 mx-auto my-5'>
            {loading && <LoadingPage />}
            <div className='grid grid-cols-8 text-sm mb-10'>
                <p className='col-span-4 pr-8 font-bold text-2xl'>
                    BÁO CÁO ĐƠN ĐẶT PHÒNG HỦY KÈM HOÀN TIỀN
                </p>
                <div className='col-span-3 rounded flex items-end'>
                    <div className="relative mr-4">
                        <label
                            htmlFor="Date"
                            className="block absolute text-sm z-20 -top-3 left-3 bg-white px-2 text-gray-500">
                            Từ ngày - Đến ngày
                        </label>
                        <RangePicker
                            format={dateFormat}
                            className="w-full py-2 h-full rounded"
                            disabledDate={disabledDate}
                            id='Date'
                            locale={viVN}
                            onChange={handleDateChange}
                        />
                    </div>
                    <button
                        onClick={getReport}
                        {...(checkInDate && checkOutDate) ? {} : { disabled: true }}
                        className={`py-2 px-4  ${(checkInDate && checkOutDate) ? 'bg-blue-500 hover:bg-opacity-60 text-white' : 'bg-gray-400/50 cursor-not-allowed'} w-fit rounded `}>
                        Xuất báo cáo
                    </button>
                </div>

                <div className='col-span-1 flex items-end'>
                    <button
                        onClick={handleExportExcel}
                        {...(reportData) ? {} : { disabled: true }}
                        className={`py-2 px-4 border-2 ${(reportData) ? 'hover:border-black' : 'cursor-not-allowed'} border-gray-300 w-fit rounded`} >
                        File Excel <FontAwesomeIcon icon={faDownload} />
                    </button>
                </div>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-gray-300 mb-3">

                <table className="w-full text-sm">
                    <thead className=" text-gray-700 bg-white">
                        <tr>
                            <th scope="col" className="px-2 py-2  bg-gray-300 text-center">
                                #
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Mã đặt phòng
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Thời gian đặt phòng
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Tên người đặt
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số lượng (khách)
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số đêm (đêm)
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Chi phí (VNĐ)
                            </th>
                            <th scope="col" className="px-2 py-2 max-w-fit bg-gray-300 text-center">
                                Thời gian hủy phòng
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Thời gian hoàn tiền
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số tiền hoàn (VNĐ)
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Ghi chú
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!reportData?.bookingReportDetailListForManager ? (
                            <tr>
                                <td colSpan={10} className="text-center text-xl py-2">
                                    Vui lòng chọn ngày tháng để xuất báo cáo
                                </td>
                            </tr>

                        ) : (
                            currentData?.map((report, index) => (
                                <tr key={index} className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700">

                                    <th scope="row" className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="border border-gray-300 px-2  py-2">
                                        {report.bookingCode}
                                    </td>
                                    <td className="border text-center border-gray-300 px-2 py-2">
                                        {convertDate(report.checkInDate)}
                                    </td>
                                    <td className="border text-center border-gray-300 px-2 py-2">
                                        {report.customerName}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.totalCustomer}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.bookedNight}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {convertPrice(report.totalRevenue)}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.paymentDate ? convertDate(report.paymentDate) : ''}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.refundDate ? convertDate(report.refundDate) : ''}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.refundAmount ? convertPrice(report.refundAmount) : ''}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.note}
                                    </td>
                                </tr>
                            )))
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center text-center mb-8">
                <Pagination
                    currentPage={currentPage}
                    totalItems={reportData?.bookingReportDetailListForManager.length || 0}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>



            <div className='flex float-right p-4 border border-black rounded-xl text-center uppercase'>
                <p className='text-2xl font-bold'>TỔNG TIỀN HOÀN: {convertPrice(sumTotalRevenue)} vnd</p>
            </div>

        </div >
    );
}
