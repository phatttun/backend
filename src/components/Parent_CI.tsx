import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search, X, Plus, Trash2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import '../styles/SoftwareRequestForm.css';

// Interface for CI (Configuration Item)
interface CI {
  id: string;
  ciName: string;
}

// Mock data for CMDB CI items
const MOCK_CMDB_CIS: CI[] = [
  { id: 'CI-001', ciName: 'Payment Gateway Service' },
  { id: 'CI-002', ciName: 'User Authentication Module' },
  { id: 'CI-003', ciName: 'Email Notification System' },
  { id: 'CI-004', ciName: 'Data Analytics Platform' },
  { id: 'CI-005', ciName: 'Database Server Cluster' },
  { id: 'CI-006', ciName: 'Load Balancer' },
  { id: 'CI-007', ciName: 'API Gateway' },
  { id: 'CI-008', ciName: 'Cache Server Redis' },
  { id: 'CI-009', ciName: 'Message Queue Service' },
  { id: 'CI-010', ciName: 'Monitoring System' },
  { id: 'CI-011', ciName: 'Backup Storage' },
  { id: 'CI-012', ciName: 'Security Firewall' },
  { id: 'CI-013', ciName: 'Web Server Apache' },
  { id: 'CI-014', ciName: 'Application Server Tomcat' },
  { id: 'CI-015', ciName: 'Database MySQL' },
  { id: 'CI-016', ciName: 'File Storage NFS' },
  { id: 'CI-017', ciName: 'Network Switch' },
  { id: 'CI-018', ciName: 'VPN Gateway' },
  { id: 'CI-019', ciName: 'SSL Certificate Manager' },
  { id: 'CI-020', ciName: 'Log Aggregation Service' },
];

interface ParentCIProps {
  currentCIId?: string;
  parentCIs: Array<{ id: string; ciName: string }>;
  setParentCIs: (cis: Array<{ id: string; ciName: string }>) => void;
  isViewMode?: boolean;
}

const ParentCI: React.FC<ParentCIProps> = ({ currentCIId, parentCIs, setParentCIs, isViewMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [selectedCIs, setSelectedCIs] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  // Filter parent CIs based on search query
  const filteredParentCIs = parentCIs.filter(ci =>
    ci.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ci.ciName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter CMDB CIs for modal
  const filteredCMDBCIs = MOCK_CMDB_CIS.filter(ci =>
    (ci.id.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
     ci.ciName.toLowerCase().includes(modalSearchQuery.toLowerCase())) &&
    ci.id !== currentCIId && // Prevent selecting current CI
    !parentCIs.some(parent => parent.id === ci.id) // Prevent selecting already added CIs
  );

  // Pagination for modal
  const totalPages = Math.ceil(filteredCMDBCIs.length / itemsPerPage);
  const paginatedCIs = filteredCMDBCIs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle CI selection in modal
  const handleCISelect = (ciId: string) => {
    const newSelected = new Set(selectedCIs);
    if (newSelected.has(ciId)) {
      newSelected.delete(ciId);
    } else {
      newSelected.add(ciId);
    }
    setSelectedCIs(newSelected);
  };

  // Add selected CIs to parent list
  const handleAddSelectedCIs = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const selectedCIObjects = MOCK_CMDB_CIS.filter(ci => selectedCIs.has(ci.id));
    setParentCIs(prev => [...prev, ...selectedCIObjects]);
    setSelectedCIs(new Set());
    setShowModal(false);
    setModalSearchQuery('');
    setCurrentPage(1);
  };

  // Remove parent CI
  const handleRemoveParentCI = (ciId: string) => {
    setParentCIs(prev => prev.filter(ci => ci.id !== ciId));
  };

  // Modal component
  const SelectParentCIModal = () => (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content modal-large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Parent CI</h2>
          <button className="modal-close-btn" onClick={() => setShowModal(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by CI ID or CI Name..."
              value={modalSearchQuery}
              onChange={(e) => {
                setModalSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
              autoFocus
            />
          </div>

          <table className="modal-table">
            <thead>
              <tr>
                <th>CI ID</th>
                <th>CI Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCIs.map((ci) => (
                <tr
                  key={ci.id}
                  className={`modal-table-row ${selectedCIs.has(ci.id) ? 'selected' : ''}`}
                  onClick={() => handleCISelect(ci.id)}
                >
                  <td>{ci.id}</td>
                  <td>{ci.ciName}</td>
                  <td>
                    <span className={`checkmark ${selectedCIs.has(ci.id) ? 'visible' : 'hidden'}`}>✓</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCMDBCIs.length === 0 && (
            <p className="no-results">No CIs found</p>
          )}

          {totalPages > 1 && (
            <div className="modal-pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                &lt;
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn-primary"
            disabled={selectedCIs.size === 0}
            onClick={handleAddSelectedCIs}
          >
            Add Selected ({selectedCIs.size})
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="parent-ci-section">
      <Accordion type="single" collapsible className="w-full" defaultValue="parent-ci">
        <AccordionItem value="parent-ci">
          <AccordionTrigger className="accordion-trigger">
            <div className="section-header">
              <h3>Parent CIs / Relation</h3>
              <span className="section-description">
                Specify parent CIs that have relationships with the current CI
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="accordion-content">
            <div className="parent-ci-controls">
              <div className="search-container">
                <div className="modal-search">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Type to search Parent CIs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
              <button
                className="btn-add-ci"
                onClick={() => setShowModal(true)}
                disabled={isViewMode}
              >
                <Plus size={16} />
                เพิ่ม CI
              </button>
            </div>

            <div className="parent-ci-table-container">
              {filteredParentCIs.length === 0 ? (
                <div className="no-data">
                  <p>No Data</p>
                </div>
              ) : (
                <table className="parent-ci-table">
                  <thead>
                    <tr>
                      <th>CI ID</th>
                      <th>CI Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParentCIs.map((ci) => (
                      <tr key={ci.id}>
                        <td>{ci.id}</td>
                        <td>{ci.ciName}</td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveParentCI(ci.id); }}
                            title="Remove Parent CI"
                            disabled={isViewMode}
                            type="button"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {showModal && ReactDOM.createPortal(<SelectParentCIModal />, document.body)}
    </div>
  );
};

export default ParentCI;