import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

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

interface MasterSystemName {
  id: string;
  code: string;
  name: string;
}

interface MasterApplication {
  id: string;
  applicationName: string;
  systemId: string;
}

interface MasterProject {
  id: string;
  projectSaleNumber: string;
  projectName: string;
  poNumberGosoft: string;
  poNumberCustomer: string;
  supplier: string;
}

interface MasterSupplier {
  id: string;
  code: string;
  name: string;
}

interface MasterSRRelease {
  id: string;
  serviceName: string;
  documentNumber: string;
  status: string;
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

export const MOCK_SYSTEM_NAMES: MasterSystemName[] = [
  { id: 'SYS001', code: 'ERP', name: 'Enterprise Resource Planning' },
  { id: 'SYS002', code: 'CRM', name: 'Customer Relationship Management' },
  { id: 'SYS003', code: 'HRM', name: 'Human Resource Management' },
  { id: 'SYS004', code: 'FIN', name: 'Financial System' },
  { id: 'SYS005', code: 'SCM', name: 'Supply Chain Management' },
];

export const MOCK_APPLICATIONS: MasterApplication[] = [
  { id: 'APP001', applicationName: 'ERP Web Portal', systemId: 'SYS001' },
  { id: 'APP002', applicationName: 'ERP Mobile App', systemId: 'SYS001' },
  { id: 'APP003', applicationName: 'CRM Dashboard', systemId: 'SYS002' },
  { id: 'APP004', applicationName: 'CRM Analytics', systemId: 'SYS002' },
  { id: 'APP005', applicationName: 'HR Portal', systemId: 'SYS003' },
  { id: 'APP006', applicationName: 'Payroll System', systemId: 'SYS003' },
  { id: 'APP007', applicationName: 'Accounting Software', systemId: 'SYS004' },
  { id: 'APP008', applicationName: 'Budget Planning', systemId: 'SYS004' },
  { id: 'APP009', applicationName: 'Inventory Management', systemId: 'SYS005' },
  { id: 'APP010', applicationName: 'Order Processing', systemId: 'SYS005' },
];

export const MOCK_PROJECTS: MasterProject[] = [
  { id: 'P001', projectSaleNumber: 'PS001', projectName: 'ERP Implementation', poNumberGosoft: 'PO-G-001', poNumberCustomer: 'PO-C-001', supplier: 'Supplier A' },
  { id: 'P002', projectSaleNumber: 'PS002', projectName: 'CRM Upgrade', poNumberGosoft: 'PO-G-002', poNumberCustomer: 'PO-C-002', supplier: 'Supplier B' },
  { id: 'P003', projectSaleNumber: 'PS003', projectName: 'HR System Migration', poNumberGosoft: 'PO-G-003', poNumberCustomer: 'PO-C-003', supplier: 'Supplier C' },
  { id: 'P004', projectSaleNumber: 'PS004', projectName: 'Financial Software', poNumberGosoft: 'PO-G-004', poNumberCustomer: 'PO-C-004', supplier: 'Supplier D' },
  { id: 'P005', projectSaleNumber: 'PS005', projectName: 'Supply Chain Optimization', poNumberGosoft: 'PO-G-005', poNumberCustomer: 'PO-C-005', supplier: 'Supplier E' },
];

export const MOCK_SUPPLIERS: MasterSupplier[] = [
  { id: 'S001', code: 'SUP001', name: 'Supplier A' },
  { id: 'S002', code: 'SUP002', name: 'Supplier B' },
  { id: 'S003', code: 'SUP003', name: 'Supplier C' },
  { id: 'S004', code: 'SUP004', name: 'Supplier D' },
  { id: 'S005', code: 'SUP005', name: 'Supplier E' },
];

export const MOCK_SR_RELEASES: MasterSRRelease[] = [
  { id: 'SR001', serviceName: 'Application Development', documentNumber: 'SR-001', status: 'Active' },
  { id: 'SR002', serviceName: 'Infrastructure', documentNumber: 'SR-002', status: 'Pending' },
  { id: 'SR003', serviceName: 'Database Management', documentNumber: 'SR-003', status: 'Completed' },
  { id: 'SR004', serviceName: 'Cloud Services', documentNumber: 'SR-004', status: 'Active' },
  { id: 'SR005', serviceName: 'Security', documentNumber: 'SR-005', status: 'Pending' },
];

interface ModalProps {
  activeModal: string | null;
  onClose: () => void;
  onConfirm: (selectedData: any) => void;
  systemId?: string; // For filtering applications by system
}

export const Modal: React.FC<ModalProps> = ({ activeModal, onClose, onConfirm, systemId }) => {
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

  // Selection handler
  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
  };

  // Confirm selection
  const confirmSelection = (selectedData: any) => {
    onConfirm(selectedData);
    closeModal();
  };

  // Modal closer function
  const closeModal = () => {
    onClose();
    setSearchQuery('');
    setSelectedItem(null);
    setIsFirstOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setIsFirstOpen(false);
  };

  // MODAL COMPONENT: Service Selector
  const ServiceSelectorModal = () => {
    const filteredServices = filterData(MOCK_SERVICES, ['serviceName']);
    const paginatedServices = getPaginatedData(filteredServices);
    const totalPages = getTotalPages(filteredServices);

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

  // MODAL COMPONENT: System Name Selector
  const SystemSelectorModal = () => {
    const filteredSystems = filterData(MOCK_SYSTEM_NAMES, ['code', 'name']);
    const paginatedSystems = getPaginatedData(filteredSystems);
    const totalPages = getTotalPages(filteredSystems);

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select System Name</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Code or Name..."
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
                  <th>Code</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSystems.map((system) => (
                  <tr
                    key={system.id}
                    onClick={() => handleSelectItem(system)}
                    className={selectedItem?.id === system.id ? 'selected' : ''}
                  >
                    <td>
                      <div className={`checkmark ${selectedItem?.id === system.id ? 'visible' : 'hidden'}`}>
                        ✓
                      </div>
                    </td>
                    <td>{system.code}</td>
                    <td>{system.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSystems.length === 0 && (
              <p className="no-results">No systems found</p>
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

  // MODAL COMPONENT: Application Selector
  const ApplicationSelectorModal = () => {
    const filteredApplications = systemId
      ? filterData(MOCK_APPLICATIONS.filter(app => app.systemId === systemId), ['applicationName'])
      : [];
    const paginatedApplications = getPaginatedData(filteredApplications);
    const totalPages = getTotalPages(filteredApplications);

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Application</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Application Name..."
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
                  <th>Application Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApplications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => handleSelectItem(app)}
                    className={selectedItem?.id === app.id ? 'selected' : ''}
                  >
                    <td>
                      <div className={`checkmark ${selectedItem?.id === app.id ? 'visible' : 'hidden'}`}>
                        ✓
                      </div>
                    </td>
                    <td>{app.applicationName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredApplications.length === 0 && (
              <p className="no-results">No applications found for the selected system</p>
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

  // MODAL COMPONENT: Project Selector
  const ProjectSelectorModal = () => {
    const filteredProjects = filterData(MOCK_PROJECTS, ['projectName', 'projectSaleNumber']);
    const paginatedProjects = getPaginatedData(filteredProjects);
    const totalPages = getTotalPages(filteredProjects);

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-large ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Project</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Project Name or Sale Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>เลขที่โครงการขาย</th>
                  <th>Project Name</th>
                  <th>PO Number (Gosoft)</th>
                  <th>PO Number (Customer)</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => handleSelectItem(project)}
                    className={selectedItem?.id === project.id ? 'selected-row' : ''}
                  >
                    <td>{project.projectSaleNumber}</td>
                    <td>{project.projectName}</td>
                    <td>{project.poNumberGosoft}</td>
                    <td>{project.poNumberCustomer}</td>
                    <td>{project.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProjects.length === 0 && (
              <div className="no-data">No projects found</div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
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

  // MODAL COMPONENT: Supplier Selector
  const SupplierSelectorModal = () => {
    const filteredSuppliers = filterData(MOCK_SUPPLIERS, ['code', 'name']);
    const paginatedSuppliers = getPaginatedData(filteredSuppliers);
    const totalPages = getTotalPages(filteredSuppliers);

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Supplier</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Code or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    onClick={() => handleSelectItem(supplier)}
                    className={selectedItem?.id === supplier.id ? 'selected-row' : ''}
                  >
                    <td>{supplier.code}</td>
                    <td>{supplier.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSuppliers.length === 0 && (
              <div className="no-data">No suppliers found</div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
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

  // MODAL COMPONENT: SR/Release Management Selector
  const SRReleaseSelectorModal = () => {
    const filteredSRReleases = filterData(MOCK_SR_RELEASES, ['serviceName', 'documentNumber']);
    const paginatedSRReleases = getPaginatedData(filteredSRReleases);
    const totalPages = getTotalPages(filteredSRReleases);

    return (
      <div className={`modal-overlay ${!isFirstOpen ? 'no-animate' : ''}`} onClick={closeModal}>
        <div className={`modal-content modal-medium ${!isFirstOpen ? 'no-animate' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select SR No. / Release Management</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by Service Name or Document Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
            </div>

            <table className="modal-table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Document Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSRReleases.map((sr) => (
                  <tr
                    key={sr.id}
                    onClick={() => handleSelectItem(sr)}
                    className={selectedItem?.id === sr.id ? 'selected-row' : ''}
                  >
                    <td>{sr.serviceName}</td>
                    <td>{sr.documentNumber}</td>
                    <td>{sr.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSRReleases.length === 0 && (
              <div className="no-data">No SR/Release found</div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
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

  if (!activeModal) return null;

  switch (activeModal) {
    case 'service':
      return <ServiceSelectorModal />;
    case 'supportGroup':
      return <SupportGroupSelectorModal />;
    case 'type':
      return <TypeSelectorModal />;
    case 'function':
      return <FunctionSelectorModal />;
    case 'brand':
      return <BrandSelectorModal />;
    case 'system':
      return <SystemSelectorModal />;
    case 'application':
      return <ApplicationSelectorModal />;
    case 'location':
      return <LocationSelectorModal />;
    case 'customer':
      return <CustomerSelectorModal />;
    case 'project':
      return <ProjectSelectorModal />;
    case 'supplier':
      return <SupplierSelectorModal />;
    case 'extendSupplier':
      return <SupplierSelectorModal />;
    case 'srRelease':
      return <SRReleaseSelectorModal />;
    default:
      return null;
  }
};