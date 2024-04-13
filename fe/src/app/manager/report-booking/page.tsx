'use client';
import * as React from 'react';
import { DatePicker } from 'antd';
import * as XLSX from 'xlsx';
import 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import viVN from 'antd/es/date-picker/locale/vi_VN';
import { faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reportApi from '@/api/reportApi';
import LoadingPage from '@/Components/common/LoadingPage';
import Pagination from '@/Components/booking/Pagination';
import { IManagerBookingReport } from '@/types/reportType';

export interface IReportBookingProps {
}

export default function ReportBooking(props: IReportBookingProps) {
    const { RangePicker } = DatePicker;
    const [loading, setLoading] = React.useState(false);
    const [reportData, setReportData] = React.useState<IManagerBookingReport>();
    const [sumTotalCustomer, setSumTotalCustomer] = React.useState<number>(0);
    const [sumTotalRevenue, setSumTotalRevenue] = React.useState<number>(0);
    const [sumTotalCustomerByDay, setSumTotalCustomerByDay] = React.useState<number>(0);
    const [totalReport, setTotalReport] = React.useState<number>(0);
    const [totalCancelReport, setTotalCancelReport] = React.useState<number>(0);
    const [sumTotalCancelCustomer, setSumTotalCancelCustomer] = React.useState<number>(0);
    const [sumTotalCancelRevenue, setSumTotalCancelRevenue] = React.useState<number>(0);
    const [sumTotalCancelCustomerByDay, setSumTotalCancelCustomerByDay] = React.useState<number>(0);
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
        reportApi.getManagerBookingReport(checkInDate as string, checkOutDate as string).then((res) => {
            setReportData(res);
            let sumTotalCustomer = 0;
            let sumTotalRevenue = 0;
            let sumTotalCustomerByDay = 0;
            let sumTotalCancelCustomer = 0;
            let sumTotalCancelRevenue = 0;
            let sumTotalCancelCustomerByDay = 0;
            res.bookingReportDetailListForManager?.forEach((report) => {
                sumTotalCustomer += report.totalCustomer;
                sumTotalRevenue += report.totalRevenue;
                sumTotalCustomerByDay += report.totalCustomer * report.bookedNight;
                if (report.bookingStatus === 'CANCELED') {
                    sumTotalCancelCustomer += report.totalCustomer;
                    sumTotalCancelRevenue += report.totalRevenue;
                    sumTotalCancelCustomerByDay += report.totalCustomer * report.bookedNight;
                }
            })
            setSumTotalCustomer(sumTotalCustomer);
            setSumTotalRevenue(sumTotalRevenue);
            setSumTotalCustomerByDay(sumTotalCustomerByDay);
            setSumTotalCancelCustomer(sumTotalCancelCustomer);
            setSumTotalCancelRevenue(sumTotalCancelRevenue);
            setSumTotalCancelCustomerByDay(sumTotalCancelCustomerByDay);
            setTotalReport(res.bookingReportDetailListForManager?.length as number);
            setTotalCancelReport(res.bookingReportDetailListForManager?.filter((report) => report.bookingStatus === 'CANCELED').length as number);

            console.log(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        }
        )
    }

    const paymentMethod = (paymentMethod: string) => {
        switch (paymentMethod) {
            case 'OUTSIDE_SYSTEM':
                return 'Thanh toán trực tiếp';
            case 'SYSTEM':
                return 'Thanh toán qua hệ thống';
            default:
                return '';
        }
    }

    const exportToExcel = (data: any[], filename: string) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            [
                'BÁO CÁO LƯỢT KHÁCH LƯU TRÚ VÀ TỔNG DOANH THU', // Tiêu đề báo cáo
            ],
            [   '',
                'Từ ngày - Đến ngày: ', // Dòng chứa thông tin ngày tháng
                `${checkInDate} đến ${checkOutDate}`, // Ngày tháng từ state của component
            ],
            [
                '', // Dòng trống
            ],
            [
                '#',
                'Mã đặt phòng',
                'Thời gian đặt phòng',
                'Tên người đặt',
                'Số lượng (khách)',
                'Số đêm (đêm)',
                'Chi phí (VNĐ)',
                'Thời gian thanh toán',
                'Hình thức thanh toán',
                'Cổng thanh toán',
                'Ghi chú',
            ],
            ...data.map((report, index) => [
                index + 1,
                report.bookingCode,
                convertDate(report.checkInDate),
                report.customerName,
                report.totalCustomer,
                report.bookedNight,
                convertPrice(report.totalRevenue),
                report.paymentDate ? convertDate(report.paymentDate) : '',
                paymentMethod(report.paymentMethod),
                report.gateway ? report.gateway : '',
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
        exportToExcel(exportData, 'Báo cáo lượt khách lưu trú và tổng doanh thu');
    };



    const convertDate = (date: string) => {
        const parts = date.split('T');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${timeParts[0]}:${timeParts[1]}`;
    }


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
                    BÁO CÁO LƯỢT KHÁCH LƯU TRÚ VÀ TỔNG DOANH THU
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
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Thời gian thanh toán
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Hình thức thanh toán
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Cổng thanh toán
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
                                    <td className="border border-gray-300 px-2 py-2">
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
                                        {paymentMethod(report.paymentMethod)}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.gateway ? report.gateway : ''}
                                    </td>
                                    <td className="border border-gray-300 font-bold px-2 py-2">
                                        {report.note ? report.note : ''}
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


            <div className='m-auto w-fit'>
                <table className="border-collapse text-sm rounded-xl overflow-hidden">
                    <tbody>
                        <tr className='bg-[#f1f1f1] font-bold'>
                            <td className="py-2 px-4 border">TỔNG KẾT BÁO CÁO</td>
                            <td className="py-2 px-4 border">
                                Số đơn
                            </td>
                            <td className="py-2 px-4 border">
                                Số lượt khách lưu trú (lượt)
                            </td>
                            <td className="py-2 px-4 border">
                                Số lượt khách lưu trú theo ngày (lượt)
                            </td>
                            <td className="py-2 px-4 border">
                                Tổng doanh thu (VNĐ)
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-bold border">Tất cả đơn đặt phòng</td>
                            <td className="py-2 px-4 text-center border">
                                {totalReport}
                            </td>
                            <td className="py-2 px-4 text-center border">
                                {sumTotalCustomer}
                            </td>
                            <td className="py-2 px-4 text-center border">
                                {sumTotalCustomerByDay}
                            </td>
                            <td className="py-2 px-4 text-center border">
                                {convertPrice(sumTotalRevenue)}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-bold border">Đơn đặt phòng hủy & hoàn tiền</td>
                            <td className="py-2 px-4 text-center border">
                                {totalCancelReport}
                            </td>
                            <td className="py-2 px-4 text-center border">
                                {sumTotalCancelCustomer}
                            </td>
                            <td className="py-2 px-4 text-center border">
                                {sumTotalCancelCustomerByDay}
                            </td>
                            <td className="py-2 px-4 text-center border">
                                {convertPrice(sumTotalCancelRevenue)}
                            </td>
                        </tr>

                        <tr className='bg-[#f1f1f1] font-bold'>
                            <td className="py-2 px-4 border">TỔNG KẾT</td>
                            <td className="py-2 text-center px-4 border">
                                {totalReport - totalCancelReport}
                            </td>
                            <td className="py-2 text-center px-4 border">
                                {sumTotalCustomer - sumTotalCancelCustomer}
                            </td>
                            <td className="py-2 text-center px-4 border">
                                {sumTotalCustomerByDay - sumTotalCancelCustomerByDay}
                            </td>
                            <td className="py-2 text-center px-4 border">
                                {convertPrice(sumTotalRevenue - sumTotalCancelRevenue)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div >
    );
}
