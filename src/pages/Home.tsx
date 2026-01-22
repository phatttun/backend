import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import '../styles/Home.css';

interface RequestRow {
  id: number;
  requestNo: string;
  ciId: string;
  ciName: string;
  ciVersion: string;
  serviceName: string;
  requester: string;
  requestDate: string;
  status: "Draft" | "Pending" | "Approved" | "Rejected";
  currentOperator: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    console.log('Fetching data from API...');
    fetch('http://localhost:8080/software-requests')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setData(data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(`Failed to load data: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log('Rendering Home component, loading:', loading, 'error:', error, 'data length:', data.length);

  if (error) {
    return (
      <div className="bg-gray-50 home-container">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm header">
            <div className="flex items-center justify-between mb-4">
              <nav className="breadcrumbs">
                <div className="breadcrumb-item">
                  <a href="#" className="breadcrumb-link">
                    <HomeIcon size={16} className="breadcrumb-icon" />
                    Home
                  </a>
                </div>
              </nav>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8 content-area">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error loading data: {error}</p>
              <p>Please check if the backend server is running at http://localhost:8080</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 home-container">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm header">
          <div className="flex items-center justify-between mb-4">
            {/* Breadcrumbs and Menu Toggle */}
            <div className="flex items-center gap-4">
              <nav className="breadcrumbs">
                <div className="breadcrumb-item">
                  <a href="#" className="breadcrumb-link">
                    <HomeIcon size={16} className="breadcrumb-icon" />
                    Home
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 content-area">
          {/* Page Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 page-title">
            งานที่รอท่านดำเนินการ
          </h2>

          {/* Toolbar */}
          <div className="mb-6 flex gap-4 items-center toolbar">
            <div className="search-container search-flex-group">
              <span className="search-icon-inside">
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="Type to search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input-inside"
                autoComplete="off"
              />
            </div>
            <button className="btn-primary" onClick={() => navigate('/request-form')}>
              <Plus size={20} />
              สร้างฟอร์ม
            </button>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden data-table-wrapper">
            <div className="overflow-x-auto table-scroll">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Request No
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      CI ID
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      CI Name
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      CI Version
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Service Name
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Requester
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Request Date
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Current Operator
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-3 py-4 text-center text-gray-500 empty-state"
                      >
                        กำลังโหลด...
                      </td>
                    </tr>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => navigate(`/request-form/${row.id}`)}
                      >
                        <td className="px-3 py-2 text-xs text-gray-800 font-medium cell-bold">
                          {row.requestNo || "-"}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {row.ciId || "-"}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600 cell-truncate">
                          {row.ciName}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {row.ciVersion}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600 cell-truncate">
                          {row.serviceName}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {row.requester}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {row.requestDate}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <span
                            className={`status-badge ${
                              row.status === "Draft"
                                ? "status-draft"
                                : row.status === "Pending"
                                ? "status-pending"
                                : row.status === "Approved"
                                ? "status-approved"
                                : "status-rejected"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {row.currentOperator || "-"}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button className="action-btn">
                            <MoreVertical
                              size={14}
                              className="text-gray-600"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-3 py-4 text-center text-gray-500 empty-state"
                      >
                        ไม่พบข้อมูล
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between pagination">
              <div className="text-sm text-gray-600 pagination-info">
                Show{" "}
                <span className="pagination-count">
                  {itemsPerPage}
                </span>
                {" items "}
                <span className="font-medium">
                  1-{Math.min(itemsPerPage, totalItems)} of {totalItems}
                </span>
              </div>

              <div className="flex items-center gap-4 pagination-controls">
                <span className="text-sm text-gray-600 pagination-info">
                  <span className="pagination-current">
                    {currentPage}
                  </span>
                  of {totalPages} pages
                </span>

                <div className="flex gap-20">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        prev > 1 ? prev - 1 : prev
                      )
                    }
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        prev < totalPages ? prev + 1 : prev
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
