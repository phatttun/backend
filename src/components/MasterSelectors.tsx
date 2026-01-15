import React, { useEffect } from 'react';
import { Search, X } from 'lucide-react';

// Type definitions for Master Data
export interface MasterService {
  id: string;
  serviceName: string;
  supportGroupName: string;
}

export interface MasterSupportGroup {
  id: string;
  supportGroupName: string;
}

export interface MasterType {
  id: string;
  typeName: string;
  category: string;
}

export interface MasterFunction {
  id: string;
  functionName: string;
}

export interface MasterBrand {
  id: string;
  brandName: string;
}

export interface MasterLocation {
  id: string;
  locationName: string;
  customerName: string;
}

export interface MasterCustomer {
  id: string;
  customerName: string;
}

// Mock Master Data
export const MOCK_SERVICES: MasterService[] = [
  { id: 'SVC001', serviceName: 'Application Development', supportGroupName: 'Dev Team' },
  { id: 'SVC002', serviceName: 'Infrastructure', supportGroupName: 'Infra Team' },
  { id: 'SVC003', serviceName: 'Database Management', supportGroupName: 'DB Team' },
  { id: 'SVC004', serviceName: 'Cloud Services', supportGroupName: 'Cloud Team' },
  { id: 'SVC005', serviceName: 'Security', supportGroupName: 'Security Team' },
  { id: 'SVC006', serviceName: 'Network Services', supportGroupName: 'Network Team' },
];

export const MOCK_SUPPORT_GROUPS: MasterSupportGroup[] = [
  { id: 'SG001', supportGroupName: 'Dev Team' },
  { id: 'SG002', supportGroupName: 'Infra Team' },
  { id: 'SG003', supportGroupName: 'DB Team' },
  { id: 'SG004', supportGroupName: 'Cloud Team' },
  { id: 'SG005', supportGroupName: 'Security Team' },
  { id: 'SG006', supportGroupName: 'Network Team' },
];

export const MOCK_TYPES: MasterType[] = [
  { id: 'T001', typeName: 'Server', category: 'Hardware' },
  { id: 'T002', typeName: 'Laptop', category: 'Hardware' },
  { id: 'T003', typeName: 'Software Application', category: 'Software' },
  { id: 'T004', typeName: 'Database', category: 'Software' },
  { id: 'T005', typeName: 'Network Switch', category: 'Network Link' },
  { id: 'T006', typeName: 'Documentation', category: 'Document' },
];

export const MOCK_FUNCTIONS: MasterFunction[] = [
  { id: 'F001', functionName: 'Web Server' },
  { id: 'F002', functionName: 'Database Server' },
  { id: 'F003', functionName: 'Load Balancer' },
  { id: 'F004', functionName: 'Backup Server' },
  { id: 'F005', functionName: 'Monitoring Server' },
];

export const MOCK_BRANDS: MasterBrand[] = [
  { id: 'B001', brandName: 'Dell' },
  { id: 'B002', brandName: 'HP' },
  { id: 'B003', brandName: 'Cisco' },
  { id: 'B004', brandName: 'IBM' },
  { id: 'B005', brandName: 'Oracle' },
];

export const MOCK_LOCATIONS: MasterLocation[] = [
  { id: 'L001', locationName: 'Data Center A', customerName: 'Internal' },
  { id: 'L002', locationName: 'Data Center B', customerName: 'Internal' },
  { id: 'L003', locationName: 'Cloud Region US-East', customerName: 'Cloud Provider' },
];

export const MOCK_CUSTOMERS: MasterCustomer[] = [
  { id: 'C001', customerName: 'Internal' },
  { id: 'C002', customerName: 'Customer A' },
  { id: 'C003', customerName: 'Customer B' },
];

export type CIStatus = 'Check In' | 'Check Out' | 'Active' | 'Inactive';

export const generateCIId = (): string => {
  return 'CI-' + Date.now().toString().slice(-8);
};

export const getStatusBadgeColor = (status: CIStatus): string => {
  switch (status) {
    case 'Check In':
      return 'bg-blue-100 text-blue-800';
    case 'Check Out':
      return 'bg-yellow-100 text-yellow-800';
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Generic Modal Props
interface GenericModalProps<T> {
  isOpen: boolean;
  title: string;
  data: T[];
  searchFields: string[];
  selectedItem: T | null;
  onSelect: (item: T) => void;
  onConfirm: (item: T) => void;
  onClose: () => void;
  renderRow: (item: T, isSelected: boolean) => React.ReactNode;
  renderHeader: () => React.ReactNode;
  searchPlaceholder?: string;
}

const ITEMS_PER_PAGE = 5;

export const GenericSelectorModal = <T extends { id: string }>(
  props: GenericModalProps<T>
): JSX.Element | null => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  // Manage body overflow to prevent scroll jump when modal opens/closes
  useEffect(() => {
    if (props.isOpen) {
      // Modal is open - prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Modal is closed - restore scrolling
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [props.isOpen]);

  if (!props.isOpen) return null;

  const filterData = (data: T[]): T[] => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((item) =>
      props.searchFields.some((field) => {
        const value = (item as Record<string, string>)[field];
        return value?.toLowerCase().includes(query);
      })
    );
  };

  const filteredData = filterData(props.data);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handleClose = () => {
    setSearchQuery('');
    setCurrentPage(1);
    props.onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content modal-medium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{props.title}</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-search">
            <Search size={18} />
            <input
              type="text"
              placeholder={props.searchPlaceholder || 'Search...'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          <table className="modal-table">
            <thead>
              <tr>{props.renderHeader()}</tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className={`modal-table-row ${
                    props.selectedItem?.id === item.id ? 'selected' : ''
                  }`}
                  onClick={() => props.onSelect(item)}
                >
                  <td>
                    {props.selectedItem?.id === item.id && (
                      <span className="checkmark">✓</span>
                    )}
                  </td>
                  {props.renderRow(item, props.selectedItem?.id === item.id)}
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && <p className="no-results">No results found</p>}

          {totalPages > 1 && (
            <div className="modal-pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            disabled={!props.selectedItem}
            onClick={() => {
              if (props.selectedItem) {
                props.onConfirm(props.selectedItem);
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
