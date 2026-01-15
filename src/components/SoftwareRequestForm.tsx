import React, { useState } from 'react';
import { Home as HomeIcon, Menu, Search, X } from 'lucide-react';
import Sidebar from './Sidebar';
import '../styles/SoftwareRequestForm.css';

// Clearable Input Component
interface ClearableInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
}

const ClearableInput: React.FC<ClearableInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  type = 'text',
  disabled = false,
  error = false,
  maxLength
}) => (
  <div className="clearable-input-wrapper">
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={`clearable-input ${error ? 'input-error' : ''}`}
    />
    {value && (
      <button
        type="button"
        className="clear-btn"
        onClick={onClear}
        title="Clear input"
        aria-label="Clear input"
      >
        <X size={18} />
      </button>
    )}
  </div>
);

// Clearable Textarea Component
interface ClearableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
}

const ClearableTextarea: React.FC<ClearableTextareaProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  rows = 4,
  disabled = false,
  error = false
}) => (
  <div className="clearable-textarea-wrapper">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`clearable-textarea ${error ? 'input-error' : ''}`}
    />
    {value && (
      <button
        type="button"
        className="clear-btn-textarea"
        onClick={onClear}
        title="Clear textarea"
        aria-label="Clear textarea"
      >
        <X size={18} />
      </button>
    )}
  </div>
);

// Type definitions for Master Data
interface MasterService {
  id: string;
  serviceName: string;
  supportGroupName: string;
}

interface MasterSupportGroup {
  id: string;
  supportGroupName: string;
}

interface MasterType {
  id: string;
  typeName: string;
  category: string;
}

interface MasterFunction {
  id: string;
  functionName: string;
}

interface MasterBrand {
  id: string;
  brandName: string;
}

interface MasterLocation {
  id: string;
  locationName: string;
  customerName: string;
}

interface MasterCustomer {
  id: string;
  customerName: string;
}

// Mock Master Data
const MOCK_SERVICES: MasterService[] = [
  { id: 'SVC001', serviceName: 'Application Development', supportGroupName: 'Dev Team' },
  { id: 'SVC002', serviceName: 'Infrastructure', supportGroupName: 'Infra Team' },
  { id: 'SVC003', serviceName: 'Database Management', supportGroupName: 'DB Team' },
  { id: 'SVC004', serviceName: 'Cloud Services', supportGroupName: 'Cloud Team' },
  { id: 'SVC005', serviceName: 'Security', supportGroupName: 'Security Team' },
  { id: 'SVC006', serviceName: 'Network Services', supportGroupName: 'Network Team' },
];

const MOCK_SUPPORT_GROUPS: MasterSupportGroup[] = [
  { id: 'SG001', supportGroupName: 'Dev Team' },
  { id: 'SG002', supportGroupName: 'Infra Team' },
  { id: 'SG003', supportGroupName: 'DB Team' },
  { id: 'SG004', supportGroupName: 'Cloud Team' },
  { id: 'SG005', supportGroupName: 'Security Team' },
  { id: 'SG006', supportGroupName: 'Network Team' },
];

const MOCK_TYPES: MasterType[] = [
  { id: 'T001', typeName: 'Server', category: 'Hardware' },
  { id: 'T002', typeName: 'Laptop', category: 'Hardware' },
  { id: 'T003', typeName: 'Software Application', category: 'Software' },
  { id: 'T004', typeName: 'Database', category: 'Software' },
  { id: 'T005', typeName: 'Network Switch', category: 'Network Link' },
  { id: 'T006', typeName: 'Documentation', category: 'Document' },
];

const MOCK_FUNCTIONS: MasterFunction[] = [
  { id: 'F001', functionName: 'Web Server' },
  { id: 'F002', functionName: 'Database Server' },
  { id: 'F003', functionName: 'Load Balancer' },
  { id: 'F004', functionName: 'Backup Server' },
  { id: 'F005', functionName: 'Monitoring Server' },
];

const MOCK_BRANDS: MasterBrand[] = [
  { id: 'B001', brandName: 'Dell' },
  { id: 'B002', brandName: 'HP' },
  { id: 'B003', brandName: 'Cisco' },
  { id: 'B004', brandName: 'IBM' },
  { id: 'B005', brandName: 'Oracle' },
];

const MOCK_LOCATIONS: MasterLocation[] = [
  { id: 'L001', locationName: 'Data Center A', customerName: 'Internal' },
  { id: 'L002', locationName: 'Data Center B', customerName: 'Internal' },
  { id: 'L003', locationName: 'Cloud Region US-East', customerName: 'Cloud Provider' },
];

const MOCK_CUSTOMERS: MasterCustomer[] = [
  { id: 'C001', customerName: 'Internal' },
  { id: 'C002', customerName: 'Customer A' },
  { id: 'C003', customerName: 'Customer B' },
];

type CIStatus = 'Check In' | 'Check Out' | 'Active' | 'Inactive';

const generateCIId = (): string => {
  return 'CI-' + Date.now().toString().slice(-8);
};

const getStatusBadgeColor = (status: CIStatus): string => {
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

export function SoftwareRequestForm() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    // Header metadata
    createdDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    requestStatus: 'Draft',
    createdBy: 'John Smith',
    
    // Main required field
    reasonRequest: '',
    
    // CI Information - UPDATED FIELDS
    ciId: generateCIId(),
    ciVersion: '',
    ciName: '',
    ciStatus: 'Check In' as CIStatus,
    service: '',
    serviceName: '',
    serviceId: '',
    supportGroup: '',
    supportGroupName: '',
    supportGroupId: '',
    type: '',
    typeId: '',
    category: '',
    function: '',
    functionId: '',
    brand: '',
    brandId: '',
    location: '',
    locationId: '',
    customer: '',
    customerId: '',
    
    // Class Information
    systemName: '',
    application: '',
    environment: '',
    
    // MA Information
    needContinueMA: 'No',
    maStartDate: '',
    maEndDate: '',
    
    // Attachment / Remark
    parentCis: '',
    attachUrl: '',
    attachFile: null as File | null,
    remark: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Modal state management
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const itemsPerPage = 5;

  // Helper function to filter data based on search
  const filterData = (data: any[], searchFields: string[]): any[] => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(item =>
      searchFields.some(field => 
        item[field]?.toLowerCase().includes(query)
      )
    );
  };

  // Helper function for pagination
  const getPaginatedData = (data: any[]): any[] => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return data.slice(startIdx, startIdx + itemsPerPage);
  };

  // Helper function to get total pages
  const getTotalPages = (data: any[]): number => {
    return Math.ceil(data.length / itemsPerPage);
  };

  // Modal opener function
  const openModal = (modalType: string) => {
    setActiveModal(modalType);
    setSearchQuery('');
    setSelectedItem(null);
    setCurrentPage(1);
    setIsFirstOpen(true);
  };

  // Modal closer function
  const closeModal = () => {
    setActiveModal(null);
    setSearchQuery('');
    setSelectedItem(null);
    setIsFirstOpen(true);
  };

  // Selection handler
  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
  };

  // Confirm selection
  const confirmSelection = (selectedData: any) => {
    switch (activeModal) {
      case 'service':
        setFormData(prev => ({
          ...prev,
          service: selectedData.id,
          serviceId: selectedData.id,
          serviceName: selectedData.serviceName,
          supportGroupName: selectedData.supportGroupName,
          ciStatus: 'Active' as CIStatus // Auto-change status when service is linked
        }));
        break;
      case 'supportGroup':
        setFormData(prev => ({
          ...prev,
          supportGroup: selectedData.id,
          supportGroupId: selectedData.id,
          supportGroupName: selectedData.supportGroupName
        }));
        break;
      case 'type':
        setFormData(prev => ({
          ...prev,
          type: selectedData.id,
          typeId: selectedData.id,
          category: selectedData.category // Auto-populate category
        }));
        break;
      case 'function':
        setFormData(prev => ({
          ...prev,
          function: selectedData.id,
          functionId: selectedData.id
        }));
        break;
      case 'brand':
        setFormData(prev => ({
          ...prev,
          brand: selectedData.id,
          brandId: selectedData.id
        }));
        break;
      case 'location':
        setFormData(prev => ({
          ...prev,
          location: selectedData.id,
          locationId: selectedData.id,
          customer: selectedData.customerName,
          customerId: selectedData.id
        }));
        break;
      case 'customer':
        setFormData(prev => ({
          ...prev,
          customer: selectedData.id,
          customerId: selectedData.id
        }));
        break;
    }
    closeModal();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Simple file size validation (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, attachFile: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, attachFile: file }));
      setErrors(prev => ({ ...prev, attachFile: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    // Validate required fields
    const requiredFields = [
      { field: 'reasonRequest', label: 'Reason Request' },
      { field: 'ciName', label: 'CI Name' },
      { field: 'ciVersion', label: 'CI Version' },
      { field: 'service', label: 'Service' },
      { field: 'supportGroup', label: 'Support Group' },
      { field: 'type', label: 'Type' },
      { field: 'systemName', label: 'System Name' },
      { field: 'application', label: 'Application' }
    ];

    requiredFields.forEach(({ field, label }) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${label} is required`;
      }
    });

    // CI Name max length validation
    if (formData.ciName && formData.ciName.length > 250) {
      newErrors.ciName = 'CI Name cannot exceed 250 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const environmentOptions = ['Development', 'Testing', 'Staging', 'Production'];

  // MODAL COMPONENT: Service Selector
  const ServiceSelectorModal = () => {
    const filteredServices = filterData(MOCK_SERVICES, ['serviceName']);
    const paginatedServices = getPaginatedData(filteredServices);
    const totalPages = getTotalPages(filteredServices);

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      setIsFirstOpen(false);
    };

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-large ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Service</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Service Name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Service Name</th>
                  <th>Support Group Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedServices.map((service) => (
                  <tr
                    key={service.id}
                    className={`modal-table-row ${selectedItem?.id === service.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(service)}
                  >
                    <td>
                      <span className={`checkmark ${selectedItem?.id === service.id ? 'visible' : 'hidden'}`}>✓</span>
                    </td>
                    <td>{service.serviceName}</td>
                    <td>{service.supportGroupName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredServices.length === 0 && (
              <p className="no-results">No services found</p>
            )}

            {totalPages > 1 && (
              <div className="modal-pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  &lt;
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!selectedItem}
              onClick={() => confirmSelection(selectedItem)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // MODAL COMPONENT: Support Group Selector
  const SupportGroupSelectorModal = () => {
    const filteredGroups = filterData(MOCK_SUPPORT_GROUPS, ['supportGroupName']);
    const paginatedGroups = getPaginatedData(filteredGroups);
    const totalPages = getTotalPages(filteredGroups);

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      setIsFirstOpen(false);
    };

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Support Group</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Support Group Name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Support Group Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGroups.map((group) => (
                  <tr
                    key={group.id}
                    className={`modal-table-row ${selectedItem?.id === group.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(group)}
                  >
                    <td>
                      {selectedItem?.id === group.id && (
                        <span className="checkmark">✓</span>
                      )}
                    </td>
                    <td>{group.supportGroupName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredGroups.length === 0 && (
              <p className="no-results">No support groups found</p>
            )}

            {totalPages > 1 && (
              <div className="modal-pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  &lt;
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!selectedItem}
              onClick={() => confirmSelection(selectedItem)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // MODAL COMPONENT: Type Selector
  const TypeSelectorModal = () => {
    const filteredTypes = filterData(MOCK_TYPES, ['typeName']);
    const paginatedTypes = getPaginatedData(filteredTypes);
    const totalPages = getTotalPages(filteredTypes);

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      setIsFirstOpen(false);
    };

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Type</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Type Name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Type Name</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTypes.map((type) => (
                  <tr
                    key={type.id}
                    className={`modal-table-row ${selectedItem?.id === type.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(type)}
                  >
                    <td>
                      {selectedItem?.id === type.id && (
                        <span className="checkmark">✓</span>
                      )}
                    </td>
                    <td>{type.typeName}</td>
                    <td>{type.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTypes.length === 0 && (
              <p className="no-results">No types found</p>
            )}

            {totalPages > 1 && (
              <div className="modal-pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  &lt;
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!selectedItem}
              onClick={() => confirmSelection(selectedItem)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // MODAL COMPONENT: Function Selector
  const FunctionSelectorModal = () => {
    const filteredFunctions = filterData(MOCK_FUNCTIONS, ['functionName']);
    const paginatedFunctions = getPaginatedData(filteredFunctions);
    const totalPages = getTotalPages(filteredFunctions);

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      setIsFirstOpen(false);
    };

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Function</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Function Name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Function Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFunctions.map((func) => (
                  <tr
                    key={func.id}
                    className={`modal-table-row ${selectedItem?.id === func.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(func)}
                  >
                    <td>
                      {selectedItem?.id === func.id && (
                        <span className="checkmark">✓</span>
                      )}
                    </td>
                    <td>{func.functionName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFunctions.length === 0 && (
              <p className="no-results">No functions found</p>
            )}

            {totalPages > 1 && (
              <div className="modal-pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  &lt;
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!selectedItem}
              onClick={() => confirmSelection(selectedItem)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // MODAL COMPONENT: Brand Selector
  const BrandSelectorModal = () => {
    const filteredBrands = filterData(MOCK_BRANDS, ['brandName']);
    const paginatedBrands = getPaginatedData(filteredBrands);
    const totalPages = getTotalPages(filteredBrands);

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      setIsFirstOpen(false);
    };

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Brand</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Brand Name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Brand Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className={`modal-table-row ${selectedItem?.id === brand.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(brand)}
                  >
                    <td>
                      {selectedItem?.id === brand.id && (
                        <span className="checkmark">✓</span>
                      )}
                    </td>
                    <td>{brand.brandName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBrands.length === 0 && (
              <p className="no-results">No brands found</p>
            )}

            {totalPages > 1 && (
              <div className="modal-pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  &lt;
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!selectedItem}
              onClick={() => confirmSelection(selectedItem)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // MODAL COMPONENT: Location Selector
  const LocationSelectorModal = () => {
    const filteredLocations = filterData(MOCK_LOCATIONS, ['locationName', 'customerName']);
    const paginatedLocations = getPaginatedData(filteredLocations);
    const totalPages = getTotalPages(filteredLocations);

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      setIsFirstOpen(false);
    };

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Location</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Location Name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Location Name</th>
                  <th>Customer</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLocations.map((location) => (
                  <tr
                    key={location.id}
                    className={`modal-table-row ${selectedItem?.id === location.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(location)}
                  >
                    <td>
                      {selectedItem?.id === location.id && (
                        <span className="checkmark">✓</span>
                      )}
                    </td>
                    <td>{location.locationName}</td>
                    <td>{location.customerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLocations.length === 0 && (
              <p className="no-results">No locations found</p>
            )}

            {totalPages > 1 && (
              <div className="modal-pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  &lt;
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!selectedItem}
              onClick={() => confirmSelection(selectedItem)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // MODAL COMPONENT: Customer Selector
  const CustomerSelectorModal = () => {
    const filteredCustomers = filterData(MOCK_CUSTOMERS, ['customerName']);
    const paginatedCustomers = getPaginatedData(filteredCustomers);
    const totalPages = getTotalPages(filteredCustomers);

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      setIsFirstOpen(false);
    };

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Customer</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Customer Name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Customer Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className={`modal-table-row ${selectedItem?.id === customer.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(customer)}
                  >
                    <td>
                      {selectedItem?.id === customer.id && (
                        <span className="checkmark">✓</span>
                      )}
                    </td>
                    <td>{customer.customerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredCustomers.length === 0 && (
              <p className="no-results">No customers found</p>
            )}

            {totalPages > 1 && (
              <div className="modal-pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  &lt;
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!selectedItem}
              onClick={() => confirmSelection(selectedItem)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 home-container">
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
                  <a href="/" className="breadcrumb-link">
                    <HomeIcon size={16} className="breadcrumb-icon" />
                    Home
                  </a>
                </div>
                <div className="breadcrumb-item">
                  <span>Software Request Form</span>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 content-area">
          <div className="form-container">
      {/* Header Section */}
      <div className="form-header">
        <h1>Software Request Form</h1>
        <div className="form-header-grid">
          <div className="form-header-field">
            <label>Created Date</label>
            <input
              type="text"
              value={formData.createdDate}
              readOnly
            />
          </div>
          <div className="form-header-field">
            <label>Request Status</label>
            <input
              type="text"
              value={formData.requestStatus}
              readOnly
            />
          </div>
          <div className="form-header-field">
            <label>Created By</label>
            <input
              type="text"
              value={formData.createdBy}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="form-wrapper">
        {/* Reason Request */}
        <div className="form-section">
          <div className="form-field full-width">
            <label className="form-field-label">
              Reason Request <span className="required">*</span>
            </label>
            <ClearableTextarea
              value={formData.reasonRequest}
              onChange={(value) => handleInputChange('reasonRequest', value)}
              onClear={() => handleInputChange('reasonRequest', '')}
              rows={4}
              placeholder="Enter the reason for this software request..."
              error={!!errors.reasonRequest}
            />
            {errors.reasonRequest && (
              <span className="error-message">{errors.reasonRequest}</span>
            )}
          </div>
        </div>

        {/* CI Information Section */}
        <div className="form-section">
          <div className="form-section-header-with-status">
            <div>
              <h2 className="form-section-header">
                <span className="section-icon">ℹ️</span> CI Information
              </h2>
            </div>
            <div className={`ci-status-badge ${getStatusBadgeColor(formData.ciStatus)}`}>
              {formData.ciStatus}
            </div>
          </div>

          {/* CI ID and CI Version Row */}
          <div className="form-grid cols-2">
            <div className="form-field">
              <label className="form-field-label">CI ID</label>
              <input
                type="text"
                value={formData.ciId}
                readOnly
                className="input-readonly"
                title="Auto-generated by system"
              />
              <span className="field-hint">Auto-generated</span>
            </div>
            <div className="form-field">
              <label className="form-field-label">
                CI Version <span className="required">*</span>
              </label>
              <ClearableInput
                value={formData.ciVersion}
                onChange={(value) => handleInputChange('ciVersion', value)}
                onClear={() => handleInputChange('ciVersion', '')}
                placeholder="Please enter CI Version"
                maxLength={100}
                error={!!errors.ciVersion}
              />
              {errors.ciVersion && (
                <span className="error-message">{errors.ciVersion}</span>
              )}
            </div>
          </div>

          {/* CI Name Row */}
          <div className="form-grid cols-1">
            <div className="form-field">
              <label className="form-field-label">
                CI Name <span className="required">*</span>
              </label>
              <div className="field-with-counter">
                <ClearableInput
                  value={formData.ciName}
                  onChange={(value) => handleInputChange('ciName', value.slice(0, 250))}
                  onClear={() => handleInputChange('ciName', '')}
                  placeholder="Enter CI name (max 250 characters)"
                  maxLength={250}
                  error={!!errors.ciName}
                />
                <span className="char-counter">{formData.ciName.length}/250</span>
              </div>
              {errors.ciName && (
                <span className="error-message">{errors.ciName}</span>
              )}
            </div>
          </div>

          {/* Service Selection Row */}
          <div className="form-grid cols-2">
            <div className="form-field">
              <label className="form-field-label">
                Service <span className="required">*</span>
              </label>
              <div className="input-with-actions">
                <input
                  type="text"
                  value={formData.serviceName}
                  readOnly
                  placeholder="Select a service..."
                  className={`input-readonly ${errors.service ? 'input-error' : ''}`}
                />
                <div className="input-action-buttons">
                  <button
                    type="button"
                    className="action-btn search-btn"
                    title="Search Service"
                    onClick={() => openModal('service')}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    type="button"
                    className="action-btn select-btn"
                    onClick={() => openModal('service')}
                  >
                    Select
                  </button>
                </div>
              </div>
              {errors.service && (
                <span className="error-message">{errors.service}</span>
              )}
            </div>

            {/* Service Name (Auto-populated) */}
            <div className="form-field">
              <label className="form-field-label">Service Name</label>
              <input
                type="text"
                value={formData.serviceName}
                readOnly
                className="input-readonly"
                placeholder="Auto-populated"
              />
            </div>
          </div>

          {/* Support Group Selection Row */}
          <div className="form-grid cols-2">
            <div className="form-field">
              <label className="form-field-label">
                Support Group <span className="required">*</span>
              </label>
              <div className="input-with-actions">
                <input
                  type="text"
                  value={formData.supportGroupName}
                  readOnly
                  placeholder="Select a support group..."
                  className={`input-readonly ${errors.supportGroup ? 'input-error' : ''}`}
                />
                <div className="input-action-buttons">
                  <button
                    type="button"
                    className="action-btn search-btn"
                    title="Search Support Group"
                    onClick={() => openModal('supportGroup')}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    type="button"
                    className="action-btn select-btn"
                    onClick={() => openModal('supportGroup')}
                  >
                    Select
                  </button>
                </div>
              </div>
              {errors.supportGroup && (
                <span className="error-message">{errors.supportGroup}</span>
              )}
            </div>

            {/* Support Group Name (Auto-populated) */}
            <div className="form-field">
              <label className="form-field-label">Support Group Name</label>
              <input
                type="text"
                value={formData.supportGroupName}
                readOnly
                className="input-readonly"
                placeholder="Auto-populated"
              />
            </div>
          </div>

          {/* Type and Category Row */}
          <div className="form-grid cols-2">
            <div className="form-field">
              <label className="form-field-label">
                Type <span className="required">*</span>
              </label>
              <div className="input-with-actions">
                <input
                  type="text"
                  value={MOCK_TYPES.find(t => t.id === formData.typeId)?.typeName || ''}
                  readOnly
                  placeholder="Select a type..."
                  className={`input-readonly ${errors.type ? 'input-error' : ''}`}
                />
                <div className="input-action-buttons">
                  <button
                    type="button"
                    className="action-btn search-btn"
                    title="Search Type"
                    onClick={() => openModal('type')}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    type="button"
                    className="action-btn select-btn"
                    onClick={() => openModal('type')}
                  >
                    Select
                  </button>
                </div>
              </div>
              {errors.type && (
                <span className="error-message">{errors.type}</span>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label">Category</label>
              <input
                type="text"
                value={formData.category}
                readOnly
                className="input-readonly"
                placeholder="Auto-populated"
              />
            </div>
          </div>

          {/* Function, Brand, Location, Customer Row */}
          <div className="form-grid cols-2">
            <div className="form-field">
              <label className="form-field-label">Function</label>
              <div className="input-with-actions">
                <input
                  type="text"
                  value={MOCK_FUNCTIONS.find(f => f.id === formData.functionId)?.functionName || ''}
                  readOnly
                  placeholder="Select a function..."
                  className="input-readonly"
                />
                <div className="input-action-buttons">
                  <button
                    type="button"
                    className="action-btn search-btn"
                    title="Search Function"
                    onClick={() => openModal('function')}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    type="button"
                    className="action-btn select-btn"
                    onClick={() => openModal('function')}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label className="form-field-label">Brand</label>
              <div className="input-with-actions">
                <input
                  type="text"
                  value={MOCK_BRANDS.find(b => b.id === formData.brandId)?.brandName || ''}
                  readOnly
                  placeholder="Select a brand..."
                  className="input-readonly"
                />
                <div className="input-action-buttons">
                  <button
                    type="button"
                    className="action-btn search-btn"
                    title="Search Brand"
                    onClick={() => openModal('brand')}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    type="button"
                    className="action-btn select-btn"
                    onClick={() => openModal('brand')}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label className="form-field-label">Location</label>
              <div className="input-with-actions">
                <input
                  type="text"
                  value={MOCK_LOCATIONS.find(l => l.id === formData.locationId)?.locationName || ''}
                  readOnly
                  placeholder="Select a location..."
                  className="input-readonly"
                />
                <div className="input-action-buttons">
                  <button
                    type="button"
                    className="action-btn search-btn"
                    title="Search Location"
                    onClick={() => openModal('location')}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    type="button"
                    className="action-btn select-btn"
                    onClick={() => openModal('location')}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label className="form-field-label">Customer</label>
              <div className="input-with-actions">
                <input
                  type="text"
                  value={MOCK_CUSTOMERS.find(c => c.id === formData.customerId)?.customerName || ''}
                  readOnly
                  placeholder="Select a customer..."
                  className="input-readonly"
                />
                <div className="input-action-buttons">
                  <button
                    type="button"
                    className="action-btn search-btn"
                    title="Search Customer"
                    onClick={() => openModal('customer')}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    type="button"
                    className="action-btn select-btn"
                    onClick={() => openModal('customer')}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Class Information Section */}
        <div className="form-section">
          <h2 className="form-section-header">
            <span className="section-icon">📋</span> Class Information
          </h2>
          <div className="form-grid cols-2">
            <div className="form-field">
              <label className="form-field-label">
                System Name <span className="required">*</span>
              </label>
              <ClearableInput
                value={formData.systemName}
                onChange={(value) => handleInputChange('systemName', value)}
                onClear={() => handleInputChange('systemName', '')}
                placeholder="Enter system name"
                error={!!errors.systemName}
              />
              {errors.systemName && (
                <span className="error-message">{errors.systemName}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-field-label">
                Application <span className="required">*</span>
              </label>
              <ClearableInput
                value={formData.application}
                onChange={(value) => handleInputChange('application', value)}
                onClear={() => handleInputChange('application', '')}
                placeholder="Enter application name"
                error={!!errors.application}
              />
              {errors.application && (
                <span className="error-message">{errors.application}</span>
              )}
            </div>
            <div className="form-field full-width">
              <label className="form-field-label">Environment</label>
              <select
                value={formData.environment}
                onChange={(e) => handleInputChange('environment', e.target.value)}
              >
                <option value="">Select environment...</option>
                {environmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* MA Information Section */}
        <div className="form-section">
          <h2 className="form-section-header">
            <span className="section-icon">📅</span> MA Information
          </h2>
          <div className="form-grid cols-2">
            <div className="form-field full-width">
              <label className="form-field-label">Need Continue MA</label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="needContinueMA"
                    value="Yes"
                    checked={formData.needContinueMA === 'Yes'}
                    onChange={(e) => handleInputChange('needContinueMA', e.target.value)}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="needContinueMA"
                    value="No"
                    checked={formData.needContinueMA === 'No'}
                    onChange={(e) => handleInputChange('needContinueMA', e.target.value)}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            <div className="form-field">
              <label className="form-field-label">MA Start Date</label>
              <input
                type="date"
                value={formData.maStartDate}
                onChange={(e) => handleInputChange('maStartDate', e.target.value)}
                disabled={formData.needContinueMA === 'No'}
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">MA End Date</label>
              <input
                type="date"
                value={formData.maEndDate}
                onChange={(e) => handleInputChange('maEndDate', e.target.value)}
                disabled={formData.needContinueMA === 'No'}
              />
            </div>
          </div>
        </div>

        {/* Attachment / Remark Section */}
        <div className="form-section">
          <h2 className="form-section-header">
            <span className="section-icon">📎</span> Attachment & Remark
          </h2>
          <div className="form-grid cols-2">
            <div className="form-field full-width">
              <label className="form-field-label">Parent CIs / Relation</label>
              <ClearableInput
                value={formData.parentCis}
                onChange={(value) => handleInputChange('parentCis', value)}
                onClear={() => handleInputChange('parentCis', '')}
                placeholder="Enter parent CIs or relation"
              />
            </div>
            <div className="form-field full-width">
              <label className="form-field-label">Attach URL</label>
              <ClearableInput
                value={formData.attachUrl}
                onChange={(value) => handleInputChange('attachUrl', value)}
                onClear={() => handleInputChange('attachUrl', '')}
                placeholder="https://example.com/document"
                type="url"
              />
            </div>
            <div className="form-field full-width">
              <label className="form-field-label">Attach File</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="attachFile"
                  onChange={handleFileChange}
                  className="file-input"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                />
                <label htmlFor="attachFile" className="file-input-label">
                  Choose File
                </label>
              </div>
              {formData.attachFile && (
                <p className="file-selected-text">
                  {formData.attachFile.name}
                </p>
              )}
              {errors.attachFile && (
                <span className="error-message">{errors.attachFile}</span>
              )}
            </div>
            <div className="form-field full-width">
              <label className="form-field-label">Remark</label>
              <ClearableTextarea
                value={formData.remark}
                onChange={(value) => handleInputChange('remark', value)}
                onClear={() => handleInputChange('remark', '')}
                rows={4}
                placeholder="Enter any additional remarks..."
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
                window.location.reload();
              }
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Submit Request
          </button>
        </div>
      </form>
          </div>
        </div>
      </div>

      {/* Modal Rendering */}
      {activeModal === 'service' && <ServiceSelectorModal />}
      {activeModal === 'supportGroup' && <SupportGroupSelectorModal />}
      {activeModal === 'type' && <TypeSelectorModal />}
      {activeModal === 'function' && <FunctionSelectorModal />}
      {activeModal === 'brand' && <BrandSelectorModal />}
      {activeModal === 'location' && <LocationSelectorModal />}
      {activeModal === 'customer' && <CustomerSelectorModal />}
    </div>
  );
}
