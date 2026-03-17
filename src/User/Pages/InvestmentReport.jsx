import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import { appConfig } from '../../config/appConfig';
import SkeletonLoader from '../Components/Comman/Skeletons';
import { useQuery } from '@tanstack/react-query';
import { useDemoMode } from '../Contexts/DemoModeContext';
import { getDemoData } from '../Data/demoData';

const columnHelper = createColumnHelper();

const InvestmentReport = () => {
  const { isDemoMode } = useDemoMode();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [propertySearch, setPropertySearch] = useState('');

  const [tempStatus, setTempStatus] = useState('');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const [tempPropertySearch, setTempPropertySearch] = useState('');

  // 🔹 Fetch investments (cached by React Query)
  const fetchInvestments = async () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!token) throw new Error('No authentication token found. Please log in.');

    let url = `${appConfig.baseURL}/user/investments?page=${currentPage}&limit=${pageSize}`;
    if (statusFilter) url += `&status=${statusFilter}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    if (propertySearch) url += `&propertyId=${propertySearch}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const apiPlans = response.data.data.investments || []; // Adjust based on actual response structure

    return {
      investments: apiPlans.map(plan => ({
        investmentId: plan._id,
        propertyId: plan.property_id,
        amountUsd: plan.amount_usd,
        unitsBought: plan.units_bought,
        entryPrice: plan.entry_price,
        rental_Percentage: plan.rental_Percentage,
        status: plan.status,
        createdAt: moment(plan.createdAt).utcOffset(330).format('YYYY-MM-DD HH:mm:ss'),
      })),
      total: response.data.data.total || 0,
    };
  };

  const { data = { investments: [], total: 0 }, isLoading, isError, error } = useQuery({
    queryKey: ['investments', currentPage, pageSize, statusFilter, startDate, endDate, propertySearch],
    queryFn: fetchInvestments,
    staleTime: 1000 * 60 * 2, // 2 minutes
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    enabled: !isDemoMode, // Disable API call in demo mode
  });

  // Use demo data if demo mode is active (client-side filtering for demo)
  const demoData = getDemoData("investmentReport");
  const filteredDemoData = useMemo(() => {
    let filtered = demoData;
    if (statusFilter) filtered = filtered.filter(row => row.status === statusFilter);
    if (startDate) filtered = filtered.filter(row => moment(row.createdAt).isSameOrAfter(moment(startDate)));
    if (endDate) filtered = filtered.filter(row => moment(row.createdAt).isSameOrBefore(moment(endDate)));
    if (propertySearch) filtered = filtered.filter(row => row.propertyId.includes(propertySearch));
    
    const startIndex = (currentPage - 1) * pageSize;
    return {
      investments: filtered.slice(startIndex, startIndex + pageSize),
      total: filtered.length,
    };
  }, [demoData, currentPage, pageSize, statusFilter, startDate, endDate, propertySearch]);

  const displayData = isDemoMode ? filteredDemoData : data;
  const totalPages = Math.ceil(displayData.total / pageSize);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusFilter(tempStatus);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setPropertySearch(tempPropertySearch);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const columns = [
    {
      id: 'sno',
      header: 'S.No',
      cell: ({ row }) => <div className="text-left text-sm text-secondary">{row.index + 1 + (currentPage - 1) * pageSize}</div>,
    },
    columnHelper.accessor('propertyId', { header: 'Property ID' }),
    columnHelper.accessor('amountUsd', { header: 'Amount USD', cell: info => `$${info.getValue()}` }),
    columnHelper.accessor('unitsBought', { header: 'Units Bought' }),
    columnHelper.accessor('entryPrice', { header: 'Entry Price', cell: info => `$${info.getValue()}` }),
    columnHelper.accessor('rental_Percentage', { header: 'Rental / Stake', cell: info => `${info.getValue()}%` }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${info.getValue() === 'ACTIVE'
            ? 'bg-green-800 text-green-300'
            : 'bg-red-800 text-red-300'}`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('createdAt', { header: 'Created At' }),
  ];

  const table = useReactTable({
    data: displayData.investments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // Server-side pagination
    pageCount: totalPages,
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(displayData.investments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'InvestmentReport');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'investment-report.xlsx');
  };

  return (
    <>
      <div className="theme-card-style border-gradient text-gray-800 p-6 rounded-md max-w-full mx-auto">
        <div className="flex justify-between mb-6 gap-4 flex-wrap-reverse">
          <h2 className="text-2xl font-bold">Property Investment Report</h2>
          <button
            onClick={exportToExcel}
            className="px-3 py-1 h-fit text-base border flex items-center justify-center gap-2 border-gray-300 rounded bg-white hover:bg-gray-50 transition"
          >
            <PiMicrosoftExcelLogo className="text-green-600" />
            <span>Export</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={tempPropertySearch}
            onChange={(e) => setTempPropertySearch(e.target.value)}
            placeholder="Search property ID..."
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded text-gray-800 focus:outline-none"
          />
          <select
            value={tempStatus}
            onChange={(e) => setTempStatus(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            {/* Add other statuses if available */}
          </select>
          <input
            type="date"
            value={tempStartDate}
            onChange={(e) => setTempStartDate(e.target.value)}
            placeholder="Start Date"
            className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-800 focus:outline-none"
          />
          <input
            type="date"
            value={tempEndDate}
            onChange={(e) => setTempEndDate(e.target.value)}
            placeholder="End Date"
            className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </form>

        <div className="overflow-auto rounded">
          <table className="w-full border-collapse text-sm">
            {isLoading && !isDemoMode ? (
              <SkeletonLoader variant="table" />
            ) : isError && !isDemoMode ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              <>
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className="text-left px-4 py-2 border-b border-gray-200 text-nowrap"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 transition text-nowrap">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-4 py-2 border-b border-gray-200">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>

          {table.getRowModel().rows.length === 0 && !isLoading && (
            <p className="text-center text-sm text-gray-500 mt-4">No data found.</p>
          )}
        </div>

        <div className="mt-6 flex md:flex-row flex-col gap-4 items-center justify-between text-sm">
          <div>
            Page {currentPage} of {totalPages || 1}
          </div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none"
          >
            {[10, 20, 30, 50].map(size => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
          <div className="space-x-2 flex">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border text-xs rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border text-xs rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border text-xs rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaAngleRight />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border text-xs rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentReport;