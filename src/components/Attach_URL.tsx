import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search, X, Plus, Trash2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import '../styles/SoftwareRequestForm.css';

// Interface for Attach URL item
interface AttachURLItem {
  id: string;
  description: string;
  url: string;
  step: number;
  updateBy: string;
  updateDate: string;
}

interface AttachURLProps {
  // Props if needed
}

const Attach_URL: React.FC<AttachURLProps> = () => {
  const [attachURLs, setAttachURLs] = useState<AttachURLItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    url: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  // Filter attach URLs based on search query
  const filteredAttachURLs = attachURLs.filter(item =>
    item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.url.trim()) {
      errors.url = 'Attach URL is required';
    } else if (!isValidUrl(formData.url)) {
      errors.url = 'Please enter a valid URL';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Simple URL validation
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Add new attach URL
  const handleAddAttachURL = () => {
    if (!validateForm()) return;

    const newItem: AttachURLItem = {
      id: `URL-${Date.now()}`,
      description: formData.description.trim(),
      url: formData.url.trim(),
      step: attachURLs.length + 1,
      updateBy: 'Current User', // In real app, get from user context
      updateDate: new Date().toLocaleDateString()
    };

    setAttachURLs(prev => [...prev, newItem]);
    setFormData({ description: '', url: '' });
    setShowModal(false);
  };

  // Remove attach URL
  const handleRemoveAttachURL = (id: string) => {
    setAttachURLs(prev => {
      const updated = prev.filter(item => item.id !== id);
      // Re-number steps
      return updated.map((item, index) => ({ ...item, step: index + 1 }));
    });
  };

  // Modal component
  const AddAttachURLModal = () => (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Attach URL</h2>
          <button className="modal-close-btn" onClick={() => setShowModal(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-field">
            <label className="form-field-label">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please enter Description"
              className={`clearable-input ${formErrors.description ? 'input-error' : ''}`}
              autoFocus
            />
            {formErrors.description && (
              <span className="error-message">{formErrors.description}</span>
            )}
          </div>

          <div className="form-field">
            <label className="form-field-label">Attach URL <span className="required">*</span></label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="Please enter Attach URL"
              className={`clearable-input ${formErrors.url ? 'input-error' : ''}`}
            />
            {formErrors.url && (
              <span className="error-message">{formErrors.url}</span>
            )}
          </div>
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
            onClick={handleAddAttachURL}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="attach-url-section">
      <Accordion type="single" collapsible className="w-full" defaultValue="attach-url">
        <AccordionItem value="attach-url">
          <AccordionTrigger className="accordion-trigger">
            <div className="section-header">
              <h3>Attach URL</h3>
              <span className="section-description">
                Attach reference links related to Software CI such as Document, Wiki, Repository, or other URLs
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="accordion-content">
            <div className="attach-url-controls">
              <div className="search-container">
                <div className="modal-search">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Type to search Attach URLs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
              <button
                className="btn-add-url"
                onClick={() => setShowModal(true)}
              >
                <Plus size={16} />
                แนบ URL
              </button>
            </div>

            <div className="attach-url-table-container">
              {filteredAttachURLs.length === 0 ? (
                <div className="no-data">
                  <p>No Data</p>
                </div>
              ) : (
                <table className="attach-url-table">
                  <thead>
                    <tr>
                      <th>Attach URL</th>
                      <th>Description</th>
                      <th>Step</th>
                      <th>Update By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttachURLs.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="url-link"
                          >
                            {item.url}
                          </a>
                        </td>
                        <td>{item.description}</td>
                        <td>{item.step}</td>
                        <td>{item.updateBy}</td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={() => handleRemoveAttachURL(item.id)}
                            title="Remove Attach URL"
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

      {showModal && ReactDOM.createPortal(<AddAttachURLModal />, document.body)}
    </div>
  );
};

export default Attach_URL;