import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../Service/adminApi";
import { appConfig } from "../../../config/appConfig";

// Custom debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const InvestmentPlan = () => {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Resolve image URL properly
  const resolveImageUrl = (imagePath) => {
    if (!imagePath) return "/no-image.png"; // fallback image

    // If it's already a full URL (http/https), return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // If it's a relative path or filename, prepend base URL
    return `${appConfig.baseURL}/uploads/${imagePath.replace(/^\/uploads\//, "")}`;
  };

  const { data: investmentPlans = [], isLoading, isError } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await adminApi.getProperties();
      const properties = res?.data || [];
      console.log("Fetched properties:", properties);

      return properties.map((item) => ({
        property_id: item.property_id,
        propertyName: item.title,
        category: item.category,
        image: item.images?.length > 0 ? resolveImageUrl(item.images[0]) : "",
        images: item.images?.map(img => resolveImageUrl(img)) || [], // Store all resolved images
        propertyValue: item.total_value_usd,
        totalProperty: item.total_units,
        status: item.status,
      }));
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch properties"
      );
    },
    staleTime: 5 * 60 * 1000,
  });

  const [filteredPlans, setFilteredPlans] = useState([]);

  useEffect(() => {
    setFilteredPlans(investmentPlans);
  }, [investmentPlans]);

  const handleSearch = useCallback(
    debounce((value) => {
      if (value === "") {
        setFilteredPlans(investmentPlans);
      } else {
        const filtered = investmentPlans.filter((item) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(value.toLowerCase())
          )
        );
        setFilteredPlans(filtered);
      }
    }, 300),
    [investmentPlans]
  );

  const { mutate: deleteProperty, isPending: isDeleting } = useMutation({
    mutationFn: (id) => adminApi.deleteProperty(id),
    onSuccess: () => {
      toast.success("Property deleted successfully");
      queryClient.invalidateQueries(["properties"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [[
        "S.No.",
        "Property ID",
        "Property Name",
        "Category",
        "Property Value",
        "Total Property",
        "Status",
      ]],
      body: filteredPlans.map((row, index) => [
        index + 1,
        row.property_id,
        row.propertyName,
        row.category,
        row.propertyValue,
        row.totalProperty,
        row.status,
      ]),
    });
    doc.save("properties.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredPlans.map((row, index) => ({
        "S.No.": index + 1,
        "Property ID": row.property_id,
        "Property Name": row.propertyName,
        Category: row.category,
        "Property Value": row.propertyValue,
        "Total Property": row.totalProperty,
        Status: row.status,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Properties");
    XLSX.writeFile(workbook, "properties.xlsx");
  };

  const isMutating = isDeleting;

  const columns = useMemo(
    () => [
      {
        Header: "S.No.",
        accessor: (_row, i) => i + 1,
        id: "serial",
      },
      {
        Header: "Property ID",
        accessor: "property_id",
      },
      {
        Header: "Property Name",
        accessor: "propertyName",
        Cell: ({ value }) => (
          <div className="max-w-[200px] truncate" title={value}>
            {value}
          </div>
        ),
      },

      // {
      //   Header: "Property Name",
      //   accessor: "propertyName",
      // },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ value }) => (
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
            {value.replace("_", " ")}
          </span>
        ),
      },
      {
        Header: "Property Image",
        accessor: "image",
        Cell: ({ value }) =>
          value ? (
            <img
              src={value}
              alt="Property"
              className="w-12 h-12 rounded object-cover border"
              onError={(e) => {
                e.target.src = "/no-image.png";
              }}
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          ),
      },
      {
        Header: "Property Value",
        accessor: "propertyValue",
      },
      {
        Header: "Total Property",
        accessor: "totalProperty",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${value === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(
                  `/admin/property-management/add-property-plan/edit-property/${row.original.property_id}`
                )
              }
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(row.original.property_id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredPlans,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    usePagination
  );

  return (
    <div className="p-1 sm:p-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#103944]">Property Plans</h2>
        <button
          onClick={() => navigate("/admin/property-management/add-property-plan/add-property")}
          className="flex items-center text-xs sm:text-lg gap-1 sm:gap-2 bg-[#103944] text-white px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-[#0e9d52]"
        >
          <FaPlus /> Add Property
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 text-xs sm:text-sm disabled:opacity-50"
            disabled={isLoading || isMutating}
            aria-label="Export to PDF"
          >
            Export PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-xs sm:text-sm disabled:opacity-50"
            disabled={isLoading || isMutating}
            aria-label="Export to Excel"
          >
            Export Excel
          </button>
        </div>
        <div className="flex items-center justify-end">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder="Search plans..."
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
            aria-label="Search investment plans"
          />
          <button
            onClick={() => handleSearch(searchInput)}
            className="ml-2 bg-[#103944] text-white px-4 py-2 rounded hover:bg-[#0e9d52] text-sm"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-1 sm:p-4 overflow-x-auto w-full">
        <table {...getTableProps()} className="min-w-[1200px] w-full text-sm text-left text-gray-800 table-fixed">
          <thead className="bg-[#103944] text-white uppercase">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-4 py-2 whitespace-nowrap" key={column.id}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-2 text-center">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-2 text-center text-red-500">
                  Error loading data. Please try again.
                </td>
              </tr>
            ) : page.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-2 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              page.map((row, index) => {
                prepareRow(row);
                const rowKey = row.original.property_id || `row-${index}`; // Fallback to index if property_id is missing
                return (
                  <tr {...row.getRowProps()} key={rowKey} className="border-b">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-4 py-2 whitespace-nowrap" key={cell.column.id}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-end mt-4">
          <span className="mr-4 text-[16px] font-semibold text-[#103944]" aria-live="polite">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage || isLoading || isMutating}
            className={`px-4 py-2 mr-2 font-semibold rounded ${canPreviousPage && !isLoading && !isMutating
              ? "bg-[#103944] text-white hover:bg-[#0e9d52]"
              : "bg-[#103944] text-white cursor-not-allowed opacity-50"
              }`}
            aria-label="Previous page"
          >
            Prev
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage || isLoading || isMutating}
            className={`px-4 py-2 font-semibold rounded ${canNextPage && !isLoading && !isMutating
              ? "bg-[#103944] text-white hover:bg-[#0e9d52]"
              : "bg-[#103944] text-white cursor-not-allowed opacity-50"
              }`}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlan;