import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search, X, Plus, Trash2, FileText } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import '../styles/SoftwareRequestForm.css';

// Interface for Attach File item
interface AttachFileItem {
  id: string;
  description: string;
  file: File;
  fileName: string;
  fileSize: number;
  step: number;
  updateBy: string;
  updateDate: string;
}

interface AttachFileProps {
  // Props if needed
}

const Attach_File: React.FC<AttachFileProps> = () => {
  const [attachFiles, setAttachFiles] = useState<AttachFileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    file: null as File | null
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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

  // Filter attach files based on search query
  const filteredAttachFiles = attachFiles.filter(item =>
    item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing/selecting
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange('file', file);
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.file) {
      errors.file = 'Attach File is required';
    } else if (formData.file.size > MAX_FILE_SIZE) {
      errors.file = 'ขนาดไฟล์เกินขีดจำกัด (สูงสุด 5 MB) กรุณาแนบไฟล์ใหม่อีกครั้ง';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Add new attach file
  const handleAddAttachFile = () => {
    if (!validateForm() || !formData.file) return;

    const newItem: AttachFileItem = {
      id: `FILE-${Date.now()}`,
      description: formData.description.trim(),
      file: formData.file,
      fileName: formData.file.name,
      fileSize: formData.file.size,
      step: attachFiles.length + 1,
      updateBy: 'Requester', // In real app, get from user context
      updateDate: new Date().toLocaleDateString()
    };

    setAttachFiles(prev => [...prev, newItem]);
    setFormData({ description: '', file: null });
    setShowModal(false);

    // Reset file input
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // Remove attach file
  const handleRemoveAttachFile = (id: string) => {
    setAttachFiles(prev => {
      const updated = prev.filter(item => item.id !== id);
      // Re-number steps
      return updated.map((item, index) => ({ ...item, step: index + 1 }));
    });
  };

  // Open file
  const handleOpenFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="attach-file-section">
      <Accordion type="single" collapsible className="w-full" defaultValue="attach-file">
        <AccordionItem value="attach-file">
          <AccordionTrigger className="accordion-trigger">
            <div className="section-header">
              <h3>Attach File</h3>
              <span className="section-description">
                Attach reference files related to Software CI such as documents, specifications, or other files
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="accordion-content">
            <div className="attach-file-controls">
              <div className="search-container">
                <div className="modal-search">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Type to search Attach Files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
              <button
                className="btn-add-file"
                onClick={() => setShowModal(true)}
              >
                <Plus size={16} />
                Add Attach File
              </button>
            </div>

            <div className="attach-file-table-container">
              {filteredAttachFiles.length === 0 ? (
                <div className="no-data">
                  <p>No Data</p>
                </div>
              ) : (
                <table className="attach-file-table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Description</th>
                      <th>Step</th>
                      <th>Update By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttachFiles.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <button
                            className="file-link"
                            onClick={() => handleOpenFile(item.file)}
                            title={`Download ${item.fileName}`}
                          >
                            <FileText size={16} />
                            {item.fileName}
                          </button>
                          <span className="file-size-display">({formatFileSize(item.fileSize)})</span>
                        </td>
                        <td>{item.description}</td>
                        <td>{item.step}</td>
                        <td>{item.updateBy}</td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={() => handleRemoveAttachFile(item.id)}
                            title="Remove Attach File"
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

      {showModal && ReactDOM.createPortal(
        <div className="modal-overlay file-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-medium file-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Attach File</h2>
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
                  className="clearable-input"
                />
              </div>

              <div className="form-field">
                <label className="form-field-label">Attach File <span className="required">*</span></label>
                <div className="file-input-wrapper">
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    className="file-input"
                    accept="*/*"
                  />
                  <label htmlFor="file-input" className="file-input-label">
                    <FileText size={16} />
                    Choose File
                  </label>
                  {formData.file && (
                    <div className="file-info">
                      <span className="file-name">{formData.file.name}</span>
                      <span className="file-size">({formatFileSize(formData.file.size)})</span>
                    </div>
                  )}
                </div>
                {formErrors.file && (
                  <span className="error-message">{formErrors.file}</span>
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
                onClick={handleAddAttachFile}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Attach_File;