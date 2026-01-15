import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Menu,
  LogOut,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import '../styles/Home.css';

interface RequestRow {
  id: string;
  requestNo: string;
  ciId: string;
  ciName: string;
  ciVersion: string;
  serviceName: string;
  requester: string;
  requestDate: string;
  status: "Draft" | "Pending" | "Approved" | "Rejected";
  operator: string;
}

const DUMMY_DATA: RequestRow[] = [
  {
    id: "1",
    requestNo: "REQ-2025-0001",
    ciId: "CI-001",
    ciName: "Payment Gateway Service",
    ciVersion: "2.1.0",
    serviceName: "Payment Service",
    requester: "Alice Johnson",
    requestDate: "2025-12-28",
    status: "Pending",
    operator: "Bob Smith",
  },
  {
    id: "2",
    requestNo: "REQ-2025-0002",
    ciId: "CI-002",
    ciName: "User Authentication Module",
    ciVersion: "1.5.2",
    serviceName: "Auth Service",
    requester: "Carol White",
    requestDate: "2025-12-25",
    status: "Approved",
    operator: "David Lee",
  },
  {
    id: "3",
    requestNo: "REQ-2025-0003",
    ciId: "CI-003",
    ciName: "Email Notification System",
    ciVersion: "3.0.1",
    serviceName: "Email Service",
    requester: "Emily Brown",
    requestDate: "2025-12-22",
    status: "Draft",
    operator: "Frank Miller",
  },
  {
    id: "4",
    requestNo: "REQ-2025-0004",
    ciId: "CI-004",
    ciName: "Data Analytics Platform",
    ciVersion: "1.8.0",
    serviceName: "Analytics Service",
    requester: "Grace Lee",
    requestDate: "2025-12-20",
    status: "Pending",
    operator: "Henry Davis",
  },
  {
    id: "5",
    requestNo: "REQ-2025-0005",
    ciId: "CI-005",
    ciName: "API Gateway",
    ciVersion: "2.3.1",
    serviceName: "Gateway Service",
    requester: "Isaac Wilson",
    requestDate: "2025-12-18",
    status: "Rejected",
    operator: "Jane Martinez",
  },
  {
    id: "6",
    requestNo: "REQ-2025-0006",
    ciId: "CI-006",
    ciName: "Database Connection Pool",
    ciVersion: "1.2.0",
    serviceName: "Database Service",
    requester: "Karen Taylor",
    requestDate: "2025-12-15",
    status: "Approved",
    operator: "Leo Anderson",
  },
  {
    id: "7",
    requestNo: "REQ-2025-0007",
    ciId: "CI-007",
    ciName: "Logging Service",
    ciVersion: "4.1.2",
    serviceName: "Logging Service",
    requester: "Michael Chen",
    requestDate: "2025-12-12",
    status: "Pending",
    operator: "Nina Thompson",
  },
  {
    id: "8",
    requestNo: "REQ-2025-0008",
    ciId: "CI-008",
    ciName: "Caching Module",
    ciVersion: "2.0.0",
    serviceName: "Cache Service",
    requester: "Oscar Garcia",
    requestDate: "2025-12-10",
    status: "Draft",
    operator: "Paula White",
  },
  {
    id: "9",
    requestNo: "REQ-2025-0009",
    ciId: "CI-009",
    ciName: "File Upload Handler",
    ciVersion: "1.4.3",
    serviceName: "File Service",
    requester: "Quinn Rodriguez",
    requestDate: "2025-12-08",
    status: "Approved",
    operator: "Rita Jones",
  },
  {
    id: "10",
    requestNo: "REQ-2025-0010",
    ciId: "CI-010",
    ciName: "Search Engine Integration",
    ciVersion: "3.5.0",
    serviceName: "Search Service",
    requester: "Samuel Brown",
    requestDate: "2025-12-05",
    status: "Pending",
    operator: "Tina Kim",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const itemsPerPage = 10;
  const totalItems = DUMMY_DATA.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredData = DUMMY_DATA.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-gray-50 home-container">
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden" data-sidebar-open={sidebarOpen}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm header">
          <div className="flex items-center justify-between mb-4">
            {/* Breadcrumbs and Menu Toggle */}
            <div className="flex items-center gap-4">
              <button
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu size={24} />
              </button>
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
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-3 py-2 text-xs text-gray-800 font-medium cell-bold">
                          {row.requestNo}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {row.ciId}
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
                          {row.operator}
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
