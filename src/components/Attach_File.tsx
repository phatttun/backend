import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search, X, Plus, Trash2, FileText } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import '../styles/SoftwareRequestForm.css';

// Interface for Attach File item
interface AttachFileItem {
  id: string;
  description: string;
  file?: File;
  fileName: string;
  fileSize: number;
  fileBase64?: string; // Store file as base64 string for database persistence
  step?: number;
  updateBy?: string;
  updateDate?: string;
}

interface AttachFileProps {
  attachFiles: AttachFileItem[];
  setAttachFiles: (files: AttachFileItem[]) => void;
}

const Attach_File: React.FC<AttachFileProps> = ({ attachFiles, setAttachFiles }) => {
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
  const handleAddAttachFile = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!validateForm() || !formData.file) return;

    // Convert file to base64 for database storage
    const file = formData.file;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      
      const newItem: AttachFileItem = {
        id: `FILE-${Date.now()}`,
        description: formData.description.trim(),
        file: file,
        fileName: file.name,
        fileSize: file.size,
        fileBase64: base64String, // Store base64 for database
        step: attachFiles.length + 1,
        updateBy: 'Requester',
        updateDate: new Date().toLocaleDateString()
      };

      setAttachFiles([...attachFiles, newItem]);
      setFormData({ description: '', file: null });
      setShowModal(false);

      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    };
    
    reader.readAsDataURL(file);
  };

  // Remove attach file
  const handleRemoveAttachFile = (id: string) => {
    const updated = attachFiles.filter((item: AttachFileItem) => item.id !== id);
    // Re-number steps
    const renumbered = updated.map((item: AttachFileItem, index: number) => ({ ...item, step: index + 1 }));
    setAttachFiles(renumbered);
  };

  // Open file - handles both File objects and base64 strings
  const handleOpenFile = (e: React.MouseEvent, fileItem: AttachFileItem) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Opening file:', fileItem);
    console.log('File object:', fileItem.file);
    console.log('Base64:', fileItem.fileBase64 ? `exists (${fileItem.fileBase64.length} chars)` : 'not found');
    
    try {
      // If file object exists, use it directly
      if (fileItem.file && fileItem.file instanceof File) {
        console.log('Using File object directly');
        const url = URL.createObjectURL(fileItem.file);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileItem.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
        return;
      } 
      // Otherwise, try to convert base64 string to blob
      else if (fileItem.fileBase64 && typeof fileItem.fileBase64 === 'string') {
        console.log('Converting base64 to blob');
        try {
          // Extract base64 data - handle both "data:...;base64,XXX" and just "XXX" formats
          let base64Data = fileItem.fileBase64;
          if (base64Data.includes(',')) {
            base64Data = base64Data.split(',')[1] || base64Data;
          }
          
          // Clean up base64 string (remove newlines and spaces)
          base64Data = base64Data.replace(/\s/g, '');
          
          console.log('Base64 data length:', base64Data.length);
          
          // Decode base64
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          
          // Create blob and download
          const blob = new Blob([byteArray], { type: 'application/octet-stream' });
          console.log('Created blob:', blob);
          const url = URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.download = fileItem.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the URL after a delay to ensure download completes
          setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (decodeError) {
          console.error('Error decoding base64:', decodeError);
          alert('ไฟล์ไม่สามารถถอดรหัสได้');
          return;
        }
      }
      else {
        console.warn('No file or base64 available', { file: fileItem.file, base64: fileItem.fileBase64 });
        alert('ไฟล์ไม่พร้อมใช้งาน');
        return;
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์: ' + (error instanceof Error ? error.message : 'ไม่ทราบข้อผิดพลาด'));
    }
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
                type="button"
                className="btn-add-file"
                onClick={() => setShowModal(true)}
                disabled={false}
              >
                <Plus size={16} />
                แนบเอกสาร
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
                            onClick={(e) => handleOpenFile(e, item)}
                            title={`Download ${item.fileName}`}
                            type="button"
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
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveAttachFile(item.id); }}
                            title="Remove Attach File"
                            disabled={false}
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

      {showModal && ReactDOM.createPortal(
        <div className="modal-overlay file-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-medium file-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Attach File</h2>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-field">
                <label className="form-field-label">Description (Optional)</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Please enter Description (Optional)"
                  className={`clearable-input ${formErrors.description ? 'input-error' : ''}`}
                />
                {formErrors.description && (
                  <span className="error-message">{formErrors.description}</span>
                )}
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
                type="button"
                className="btn-secondary"
                onClick={() => setShowModal(false)}
                disabled={false}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleAddAttachFile}
                disabled={false}
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