import { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { appConfig } from '../../../config/appConfig';
import moment from 'moment';
import SkeletonLoader from '../../Components/Comman/Skeletons';
import { useDemoMode } from '../../Contexts/DemoModeContext';
// import { getDemoData } from '../../Data/demoData';

const columnHelper = createColumnHelper();

const columns = [
  {
    id: 'sno',
    header: 'S.No',
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return pageIndex * pageSize + row.index + 1;
    },
  },
  // {
  //   id: 'sno',
  //   header: 'S.No',
  //   cell: ({ row }) => <div>{row.index + 1}</div>,
  // },
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('packageId', {
    header: 'Package ID',
    cell: (info) => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('amount1', {
    header: 'Amount',
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('roi', {
    header: 'ROI',
    cell: (info) => `${info.getValue().toFixed(2)}%`,
  }),
  columnHelper.accessor('roiAmount', {
    header: 'ROI Amount',
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  // columnHelper.accessor('status', {
  //   header: 'Status',
  //   cell: (info) => (
  //     <span
  //       className={`px-2 py-1 rounded text-xs font-semibold ${info.getValue() === 'Credited'
  //         ? 'bg-green-800 text-green-300'
  //         : 'bg-yellow-800 text-yellow-300'
  //         }`}
  //     >
  //       {info.getValue()}
  //     </span>
  //   ),
  // }),
];

// 🔹 API fetcher wrapped for React Query
const fetchDailyROI = async ({ queryKey }) => {
  const [_key, search, startDate, endDate, pageIndex, pageSize] = queryKey;

  const token =
    localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) throw new Error('No authentication token found');

  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  params.append('page', (pageIndex + 1).toString());
  params.append('limit', pageSize.toString());

  const response = await axios.get(
    `${appConfig.baseURL}/user/daily-roi?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const apiData = response.data.data;

  return {
    items: apiData.data.map((record) => ({
      date: moment(record.distributionDate)
        .utcOffset(330)
        .format('YYYY-MM-DD HH:mm:ss'),
      packageId: record.stakeId || 'N/A',
      amount1: record.stakeAmount || 0,
      roi: record.dailyROI || 0,
      roiAmount: record.amount || 0,
      // status: 'Credited',
    })),
    total: apiData.pagination.total,
  };
};



const StakeIncomeReport = () => {
  const { isDemoMode } = useDemoMode();
  // Final applied filters
  const [search, setSearch] = useState('');
  // const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Temporary input states
  const [tempSearch, setTempSearch] = useState('');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });



  const handleSubmit = (e) => {
    e.preventDefault();

    setSearch(tempSearch);
    // setStatus(tempStatus);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);

    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };



  // 🔹 React Query for fetching + caching
  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      'dailyROI',
      search,
      startDate,
      endDate,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: fetchDailyROI,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });




  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: data?.total
      ? Math.ceil(data.total / pagination.pageSize)
      : 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // 🔥 MUST
  });





  // 🔹 Excel Export
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data?.items ?? []);
    // const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StakeIncomeReport');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'stake-income-report.xlsx');
  };

  return (
    <div className="theme-card-style border-gradient text-gray-800 p-6 max-w-full mx-auto">
      <div className="flex justify-between mb-6 gap-4 flex-wrap-reverse">
        <h2 className="text-2xl text-blue-700 font-bold">Stake Income Report</h2>
        <button
          onClick={exportToExcel}
          disabled={loading || !data?.items?.length}
          // disabled={loading || data.length === 0}
          className="px-3 py-1 h-fit text-base border flex items-center gap-2 border-gray-300 rounded bg-white hover:bg-gray-50 transition disabled:opacity-50"
        >
          <PiMicrosoftExcelLogo className="text-green-600" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <form
        onSubmit={handleSubmit}
        className="w-full mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

          {/* Search */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Search
            </label>
            <input
              type="text"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              placeholder="Plan, Package ID, Status..."
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          {/* <div className="w-full">
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Status
            </label>
            <select
              value={tempStatus}
              onChange={(e) => setTempStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Credited">Credited</option>
              <option value="Pending">Pending</option>
            </select>
          </div> */}

          {/* Start Date */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Start Date
            </label>
            <input
              type="date"
              value={tempStartDate}
              onChange={(e) => setTempStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              End Date
            </label>
            <input
              type="date"
              value={tempEndDate}
              onChange={(e) => setTempEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="w-full max-w-[150px] flex justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
            >
              Apply Filters
            </button>
          </div>

        </div>
      </form>


      {loading ? (
        <div className="overflow-auto rounded">
          <SkeletonLoader variant="table" rows={6} />
        </div>
      ) : isError ? (
        <p className="text-center text-sm text-red-400 mt-4">{error.message}</p>
      ) : (
        <>
          <div className="overflow-auto rounded">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left px-4 py-2 border-b border-gray-200 text-blue-700 text-nowrap"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition text-nowrap"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-2 border-b border-gray-200"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {table.getRowModel().rows.length === 0 && (
              <p className="text-center text-sm text-gray-500 mt-4">No data found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex md:flex-row flex-col gap-4 items-center justify-between text-sm">
            <div className="text-secondary">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="space-x-2 flex">



              <button
                onClick={() =>
                  setPagination(prev => ({
                    ...prev,
                    pageIndex: 0
                  }))
                }
                disabled={pagination.pageIndex === 0 || loading}
                className="px-3 py-1 border text-xs rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                First
              </button>

              <button
                onClick={() =>
                  setPagination(prev => ({
                    ...prev,
                    pageIndex: Math.max(prev.pageIndex - 1, 0)
                  }))
                }
                disabled={pagination.pageIndex === 0 || loading}
                className="px-3 py-1 border text-xs rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FaAngleLeft />
              </button>

              <button
                onClick={() =>
                  setPagination(prev => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1
                  }))
                }
                disabled={
                  loading ||
                  pagination.pageIndex + 1 >= table.getPageCount()
                }
                className="px-3 py-1 border text-xs rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FaAngleRight />
              </button>

              <button
                onClick={() => {
                  const lastPage = table.getPageCount() - 1;

                  if (lastPage >= 0) {
                    setPagination(prev => ({
                      ...prev,
                      pageIndex: lastPage
                    }));
                  }
                }}
                disabled={
                  loading ||
                  table.getPageCount() === 0 ||
                  pagination.pageIndex + 1 >= table.getPageCount()
                }
                className="px-3 py-1 border text-xs rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Last
              </button>


            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StakeIncomeReport;