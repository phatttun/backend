import React, { useState, useRef } from 'react';
import { Home as HomeIcon, X } from 'lucide-react';
import '../styles/SoftwareRequestForm.css';
import { Modal, MOCK_TYPES, MOCK_FUNCTIONS, MOCK_BRANDS, MOCK_LOCATIONS, MOCK_CUSTOMERS } from './modal';
import Parent_CI from './Parent_CI';
import Attach_URL from './Attach_URL';
import Attach_File from './Attach_File';
import ClearableSelectInput from './ClearableSelectInput';

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
  maxLength?: number;
}

const ClearableTextarea: React.FC<ClearableTextareaProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  rows = 4,
  disabled = false,
  error = false,
  maxLength
}) => (
  <div className="clearable-textarea-wrapper">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      maxLength={maxLength}
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
  const [formData, setFormData] = useState({
    // Header metadata
    requestNo: 'REQ-' + Date.now().toString().slice(-8),
    createdDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    requestStatus: 'Draft',
    createdBy: 'John Smith',
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
    userGroup: '',
    installReleaseDate: '',
    systemLogPath: '',
    systemName: null as { id: string; code: string; name: string } | null,
    application: null as { id: string; applicationName: string; systemId: string } | null,
    contractNo: '',
    repositoryUrl: '',
    endOfLife: '',
    applicationUrl: '',
    
    // MA Information
    needContinueMA: 'Yes',
    pendingContinue: '',
    projectName: '',
    projectSaleNumber: '',
    poNumberCustomer: '',
    poNumberGosoft: '',
    maPoNumberCustomer: '',
    maPoNumberGosoft: '',
    supplier: '',
    supplierName: '',
    buyDate: '',
    warrantyStartDate: '',
    warrantyEndDate: '',
    maStartDate: '',
    maEndDate: '',
    maType: '',
    extendSupplier: '',
    extendSupplierName: '',
    decommissionDate: '',
    srNoReleaseManagement: '',
    srNoReleaseManagementName: '',
    
    // Remark
    remark: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Create refs for form fields to enable auto-scroll
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Modal state management
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // MA Type display state for placeholder behavior
  const [maTypeDisplay, setMaTypeDisplay] = useState("placeholder");

  // Modal opener function
  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  // Modal closer function
  const closeModal = () => {
    setActiveModal(null);
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
          systemName: null, // Clear system name when service changes
          application: null, // Clear application when service changes
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
      case 'system':
        setFormData(prev => ({
          ...prev,
          systemName: selectedData,
          application: null // Clear application when system changes
        }));
        break;
      case 'application':
        setFormData(prev => ({
          ...prev,
          application: selectedData
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
      case 'project':
        setFormData(prev => ({
          ...prev,
          projectName: selectedData.projectName,
          projectSaleNumber: selectedData.projectSaleNumber,
          poNumberGosoft: selectedData.poNumberGosoft,
          poNumberCustomer: selectedData.poNumberCustomer
        }));
        break;
      case 'supplier':
        setFormData(prev => ({
          ...prev,
          supplier: selectedData.id,
          supplierName: selectedData.name
        }));
        break;
      case 'extendSupplier':
        setFormData(prev => ({
          ...prev,
          extendSupplier: selectedData.id,
          extendSupplierName: selectedData.name
        }));
        break;
      case 'srRelease':
        setFormData(prev => ({
          ...prev,
          srNoReleaseManagement: selectedData.documentNumber,
          srNoReleaseManagementName: selectedData.documentNumber
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
      { field: 'type', label: 'Type' }
    ];

    requiredFields.forEach(({ field, label }) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${label} is required`;
      }
    });

    // Validate systemName and application as objects
    if (!formData.systemName) {
      newErrors.systemName = 'System Name is required';
    }
    if (!formData.application) {
      newErrors.application = 'Application is required';
    }

    // CI Name max length validation
    if (formData.ciName && formData.ciName.length > 250) {
      newErrors.ciName = 'CI Name cannot exceed 250 characters';
    }

    // MA Information validation
    if (formData.needContinueMA === 'Yes') {
      if (!formData.pendingContinue) {
        newErrors.pendingContinue = 'Pending Continue is required';
      }
      if (!formData.projectName) {
        newErrors.projectName = 'Project Name is required';
      }
      if (!formData.maStartDate) {
        newErrors.maStartDate = 'MA Start Date is required';
      }
      if (!formData.maEndDate) {
        newErrors.maEndDate = 'MA End Date is required';
      }
      if (formData.maStartDate && formData.maEndDate) {
        const startDate = new Date(formData.maStartDate);
        const endDate = new Date(formData.maEndDate);
        if (startDate >= endDate) {
          newErrors.maEndDate = 'MA End Date must be after MA Start Date';
        }
      }
    }

    // Max length validations for PO numbers
    const maxLengthFields = [
      { field: 'poNumberCustomer', max: 20 },
      { field: 'poNumberGosoft', max: 20 },
      { field: 'maPoNumberCustomer', max: 20 },
      { field: 'maPoNumberGosoft', max: 20 }
    ];
    maxLengthFields.forEach(({ field, max }) => {
      if (formData[field as keyof typeof formData] && (formData[field as keyof typeof formData] as string).length > max) {
        newErrors[field] = `Cannot exceed ${max} characters`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Scroll to the first field with an error
      const firstErrorField = Object.keys(newErrors)[0];
      const fieldElement = fieldRefs.current[firstErrorField];
      
      if (fieldElement) {
        fieldElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Optional: focus on the field if it's focusable
        const inputElement = fieldElement.querySelector('input, textarea, [role="button"]') as HTMLElement;
        if (inputElement) {
          inputElement.focus();
        }
      }
      return;
    }

    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

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
                  <a href="/" className="breadcrumb-link">
                    <HomeIcon size={16} className="breadcrumb-icon" />
                    Home
                  </a>
                </div>
                <div className="breadcrumb-item">
                  <span>Software Request</span>
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
        <h1>Software Request</h1>
        <div className="form-header-grid">
          <div className="form-header-field">
            <label>Request No</label>
            <input
              type="text"
              value={formData.requestNo}
              readOnly
            />
          </div>
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
        <div className="form-header-reason">
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

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="form-wrapper">
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
                className="input-readonly ci-id-input"
              />
            </div>
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['ciVersion'] = el;
              }}
            >
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
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['ciName'] = el;
              }}
            >
              <label className="form-field-label">
                CI Name <span className="required">*</span>
              </label>
              <div className="field-with-counter">
                <ClearableInput
                  value={formData.ciName}
                  onChange={(value) => handleInputChange('ciName', value.slice(0, 250))}
                  onClear={() => handleInputChange('ciName', '')}
                  placeholder="Please enter CI name"
                  maxLength={250}
                  error={!!errors.ciName}
                />
              </div>
              {errors.ciName && (
                <span className="error-message">{errors.ciName}</span>
              )}
            </div>
          </div>

          {/* Service Selection Row */}
          <div className="form-grid cols-2">
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['service'] = el;
              }}
            >
              <label className="form-field-label">
                Service <span className="required">*</span>
              </label>
              <ClearableSelectInput
                value={formData.service}
                displayText={formData.serviceName}
                onSelect={() => openModal('service')}
                onClear={() => {
                  handleInputChange('service', '');
                  handleInputChange('serviceId', '');
                  handleInputChange('serviceName', '');
                  handleInputChange('supportGroupName', '');
                  handleInputChange('systemName', null);
                  handleInputChange('application', null);
                }}
                placeholder="โปรดเลือก service"
                error={!!errors.service}
                selectTitle="Select"
              />
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
                className="input-readonly special-readonly"
                placeholder="Service Name"
              />
            </div>
          </div>

          {/* Support Group Selection Row */}
          <div className="form-grid cols-2">
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['supportGroup'] = el;
              }}
            >
              <label className="form-field-label">
                Support Group <span className="required">*</span>
              </label>
              <ClearableSelectInput
                value={formData.supportGroup}
                displayText={formData.supportGroupName}
                onSelect={() => openModal('supportGroup')}
                onClear={() => {
                  handleInputChange('supportGroup', '');
                  handleInputChange('supportGroupId', '');
                  handleInputChange('supportGroupName', '');
                }}
                placeholder="โปรดเลือก Support Group"
                error={!!errors.supportGroup}
                selectTitle="Select"
              />
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
                className="input-readonly special-readonly"
                placeholder="Support Group"
              />
            </div>
          </div>

          {/* Type and Category Row */}
          <div className="form-grid cols-2">
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['type'] = el;
              }}
            >
              <label className="form-field-label">
                Type <span className="required">*</span>
              </label>
              <ClearableSelectInput
                value={formData.type}
                displayText={MOCK_TYPES.find(t => t.id === formData.typeId)?.typeName || ''}
                onSelect={() => openModal('type')}
                onClear={() => {
                  handleInputChange('type', '');
                  handleInputChange('typeId', '');
                  handleInputChange('category', '');
                }}
                placeholder="โปรดเลือก Type"
                error={!!errors.type}
                selectTitle="Select"
              />
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
                className="input-readonly special-readonly"
                placeholder="Category"
              />
            </div>
          </div>

          {/* Function, Brand, Location, Customer Row */}
          <div className="form-grid cols-2">
            <div className="form-field">
              <label className="form-field-label">Function</label>
              <ClearableSelectInput
                value={formData.function}
                displayText={MOCK_FUNCTIONS.find(f => f.id === formData.functionId)?.functionName || ''}
                onSelect={() => openModal('function')}
                onClear={() => {
                  handleInputChange('function', '');
                  handleInputChange('functionId', '');
                }}
                placeholder="โปรดเลือก Function"
                selectTitle="Select"
              />
            </div>

            <div className="form-field">
              <label className="form-field-label">Brand</label>
              <ClearableSelectInput
                value={formData.brand}
                displayText={MOCK_BRANDS.find(b => b.id === formData.brandId)?.brandName || ''}
                onSelect={() => openModal('brand')}
                onClear={() => {
                  handleInputChange('brand', '');
                  handleInputChange('brandId', '');
                }}
                placeholder="โปรดเลือก Brand"
                selectTitle="Select"
              />
            </div>

            <div className="form-field">
              <label className="form-field-label">Location</label>
              <ClearableSelectInput
                value={formData.location}
                displayText={MOCK_LOCATIONS.find(l => l.id === formData.locationId)?.locationName || ''}
                onSelect={() => openModal('location')}
                onClear={() => {
                  handleInputChange('location', '');
                  handleInputChange('locationId', '');
                  handleInputChange('customer', '');
                  handleInputChange('customerId', '');
                }}
                placeholder="โปรดเลือก Location..."
                selectTitle="Select"
              />
            </div>

            <div className="form-field">
              <label className="form-field-label">Customer</label>
              <ClearableSelectInput
                value={formData.customer}
                displayText={MOCK_CUSTOMERS.find(c => c.id === formData.customerId)?.customerName || ''}
                onSelect={() => openModal('customer')}
                onClear={() => {
                  handleInputChange('customer', '');
                  handleInputChange('customerId', '');
                }}
                placeholder="โปรดเลือก Customer"
                selectTitle="Select"
              />
            </div>
          </div>
        </div>

        {/* Class Information Section */}
        <div className="form-section">
          <h2 className="form-section-header">
            <span className="section-icon">📋</span> Class Information
          </h2>
          <div className="form-grid cols-3">
            <div className="form-field">
              <label className="form-field-label">User Group</label>
              <ClearableInput
                value={formData.userGroup}
                onChange={(value) => handleInputChange('userGroup', value)}
                onClear={() => handleInputChange('userGroup', '')}
                placeholder="Please enter User Group"
                maxLength={250}
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">Install / Release Date</label>
              <input
                type="date"
                value={formData.installReleaseDate}
                onChange={(e) => handleInputChange('installReleaseDate', e.target.value)}
                placeholder="วว/ดด/ปปปป"
                className="form-field-input"
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">System Log Path</label>
              <ClearableInput
                value={formData.systemLogPath}
                onChange={(value) => handleInputChange('systemLogPath', value)}
                onClear={() => handleInputChange('systemLogPath', '')}
                placeholder="Please enter System Log Path"
                maxLength={250}
              />
            </div>
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['systemName'] = el;
              }}
            >
              <label className="form-field-label">
                System Name <span className="required">*</span>
              </label>
              <ClearableSelectInput
                value={formData.systemName?.id || ''}
                displayText={formData.systemName?.code || ''}
                onSelect={() => openModal('system')}
                onClear={() => {
                  handleInputChange('systemName', null);
                  handleInputChange('application', null);
                }}
                placeholder="โปรดเลือก System Name"
                error={!!errors.systemName}
                selectTitle="Select"
              />
              {errors.systemName && (
                <span className="error-message">{errors.systemName}</span>
              )}
            </div>
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['application'] = el;
              }}
            >
              <label className="form-field-label">
                Application <span className="required">*</span>
              </label>
              <ClearableSelectInput
                value={formData.application?.id || ''}
                displayText={formData.application?.applicationName || ''}
                onSelect={() => openModal('application')}
                onClear={() => {
                  handleInputChange('application', null);
                }}
                placeholder="โปรดเลือก Application"
                error={!!errors.application}
                selectTitle="Select"
              />
              {errors.application && (
                <span className="error-message">{errors.application}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-field-label">Contract No.</label>
              <ClearableInput
                value={formData.contractNo}
                onChange={(value) => handleInputChange('contractNo', value)}
                onClear={() => handleInputChange('contractNo', '')}
                placeholder="Please enter Contract No."
                maxLength={250}
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">Repository URL</label>
              <ClearableInput
                value={formData.repositoryUrl}
                onChange={(value) => handleInputChange('repositoryUrl', value)}
                onClear={() => handleInputChange('repositoryUrl', '')}
                placeholder="Please enter Repository URL"
                maxLength={250}
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">End of Life</label>
              <ClearableInput
                value={formData.endOfLife}
                onChange={(value) => handleInputChange('endOfLife', value)}
                onClear={() => handleInputChange('endOfLife', '')}
                placeholder="Please enter End of Life"
                maxLength={250}
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">Application URL</label>
              <ClearableInput
                value={formData.applicationUrl}
                onChange={(value) => handleInputChange('applicationUrl', value)}
                onClear={() => handleInputChange('applicationUrl', '')}
                placeholder="Please enter Application URL"
                maxLength={250}
              />
            </div>
          </div>
        </div>

        {/* MA Information Section */}
        <div className="form-section">
          <h2 className="form-section-header">
            <span className="section-icon">📅</span> MA Information
          </h2>
          <div className="form-grid cols-2">
            <div className="form-field">
              <label className="form-field-label">
                Need Continue MA <span className="required">*</span>
              </label>
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
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['pendingContinue'] = el;
              }}
            >
              <label className="form-field-label">
                Pending Continue {formData.needContinueMA === 'Yes' && <span className="required">*</span>}
              </label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="pendingContinue"
                    value="Yes"
                    checked={formData.pendingContinue === 'Yes'}
                    onChange={(e) => handleInputChange('pendingContinue', e.target.value)}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="pendingContinue"
                    value="No"
                    checked={formData.pendingContinue === 'No'}
                    onChange={(e) => handleInputChange('pendingContinue', e.target.value)}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.pendingContinue && (
                <span className="error-message">{errors.pendingContinue}</span>
              )}
            </div>
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['projectName'] = el;
              }}
            >
              <label className="form-field-label">
                Project Name {formData.needContinueMA === 'Yes' && <span className="required">*</span>}
              </label>
              <ClearableSelectInput
                value={formData.projectName}
                displayText={formData.projectName}
                onSelect={() => openModal('project')}
                onClear={() => {
                  handleInputChange('projectName', '');
                  handleInputChange('projectSaleNumber', '');
                  handleInputChange('poNumberGosoft', '');
                  handleInputChange('poNumberCustomer', '');
                }}
                placeholder="โปรดเลือก Project Name"
                error={!!errors.projectName}
                selectTitle="Select"
              />
              {errors.projectName && (
                <span className="error-message">{errors.projectName}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-field-label">เลขที่โครงการขาย</label>
              <input
                type="text"
                value={formData.projectSaleNumber}
                readOnly
                className="input-readonly special-readonly"
                placeholder="เลขที่โครงการขาย"
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">PO Number (Customer)</label>
              <ClearableInput
                value={formData.poNumberCustomer}
                onChange={(value) => handleInputChange('poNumberCustomer', value)}
                onClear={() => handleInputChange('poNumberCustomer', '')}
                placeholder="Please enter PO Number (Customer)"
                maxLength={20}
                error={!!errors.poNumberCustomer}
              />
              {errors.poNumberCustomer && (
                <span className="error-message">{errors.poNumberCustomer}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-field-label">PO Number (Gosoft)</label>
              <ClearableInput
                value={formData.poNumberGosoft}
                onChange={(value) => handleInputChange('poNumberGosoft', value)}
                onClear={() => handleInputChange('poNumberGosoft', '')}
                placeholder="Please enter PO Number (Gosoft)"
                maxLength={20}
                error={!!errors.poNumberGosoft}
              />
              {errors.poNumberGosoft && (
                <span className="error-message">{errors.poNumberGosoft}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-field-label">MA PO Number (Customer)</label>
              <ClearableInput
                value={formData.maPoNumberCustomer}
                onChange={(value) => handleInputChange('maPoNumberCustomer', value)}
                onClear={() => handleInputChange('maPoNumberCustomer', '')}
                placeholder="Please enter MA PO Number (Customer)"
                maxLength={20}
                error={!!errors.maPoNumberCustomer}
              />
              {errors.maPoNumberCustomer && (
                <span className="error-message">{errors.maPoNumberCustomer}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-field-label">MA PO Number (Gosoft)</label>
              <ClearableInput
                value={formData.maPoNumberGosoft}
                onChange={(value) => handleInputChange('maPoNumberGosoft', value)}
                onClear={() => handleInputChange('maPoNumberGosoft', '')}
                placeholder="Please enter MA PO Number (Gosoft)"
                maxLength={20}
                error={!!errors.maPoNumberGosoft}
              />
              {errors.maPoNumberGosoft && (
                <span className="error-message">{errors.maPoNumberGosoft}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-field-label">Supplier</label>
              <ClearableSelectInput
                value={formData.supplier}
                displayText={formData.supplierName}
                onSelect={() => openModal('supplier')}
                onClear={() => {
                  handleInputChange('supplier', '');
                  handleInputChange('supplierName', '');
                }}
                placeholder="โปรดเลือก Supplier"
                selectTitle="Select"
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">Buy Date</label>
              <input
                type="date"
                value={formData.buyDate}
                onChange={(e) => handleInputChange('buyDate', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">Warranty Start Date</label>
              <input
                type="date"
                value={formData.warrantyStartDate}
                onChange={(e) => handleInputChange('warrantyStartDate', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">Warranty End Date</label>
              <input
                type="date"
                value={formData.warrantyEndDate}
                onChange={(e) => handleInputChange('warrantyEndDate', e.target.value)}
              />
            </div>
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['maStartDate'] = el;
              }}
            >
              <label className="form-field-label">
                MA Start Date {formData.needContinueMA === 'Yes' && <span className="required">*</span>}
              </label>
              <input
                type="date"
                value={formData.maStartDate}
                onChange={(e) => handleInputChange('maStartDate', e.target.value)}
                className={errors.maStartDate ? 'input-error' : ''}
              />
              {errors.maStartDate && (
                <span className="error-message">{errors.maStartDate}</span>
              )}
            </div>
            <div 
              className="form-field"
              ref={(el) => {
                if (el) fieldRefs.current['maEndDate'] = el;
              }}
            >
              <label className="form-field-label">
                MA End Date {formData.needContinueMA === 'Yes' && <span className="required">*</span>}
              </label>
              <input
                type="date"
                value={formData.maEndDate}
                onChange={(e) => handleInputChange('maEndDate', e.target.value)}
                className={errors.maEndDate ? 'input-error' : ''}
              />
              {errors.maEndDate && (
                <span className="error-message">{errors.maEndDate}</span>
              )}
            </div>
            <div className="form-field">
              <label className="form-field-label">MA Type</label>
              <select
                value={maTypeDisplay}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange('maType', value);
                  setMaTypeDisplay(value);
                }}
                onFocus={() => {
                  if (maTypeDisplay === "placeholder") {
                    setMaTypeDisplay("");
                  }
                }}
                onBlur={() => {
                  if (!formData.maType) {
                    setMaTypeDisplay("placeholder");
                  }
                }}
                className="form-field-select"
              >
                <option value="placeholder" hidden>Select MA Type</option>
                <option value="8.5 x 5">8.5 x 5</option>
                <option value="24 x 7">24 x 7</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-field-label">Extend Supplier</label>
              <ClearableSelectInput
                value={formData.extendSupplier}
                displayText={formData.extendSupplierName}
                onSelect={() => openModal('extendSupplier')}
                onClear={() => {
                  handleInputChange('extendSupplier', '');
                  handleInputChange('extendSupplierName', '');
                }}
                placeholder="โปรดเลือก Extend Supplier"
                selectTitle="Select"
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">Decommission Date</label>
              <input
                type="date"
                value={formData.decommissionDate}
                onChange={(e) => handleInputChange('decommissionDate', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-field-label">SR No. / Release Management</label>
              <ClearableSelectInput
                value={formData.srNoReleaseManagement}
                displayText={formData.srNoReleaseManagementName}
                onSelect={() => openModal('srRelease')}
                onClear={() => {
                  handleInputChange('srNoReleaseManagement', '');
                  handleInputChange('srNoReleaseManagementName', '');
                }}
                placeholder="โปรดเลือก SR No./Release Management"
                selectTitle="Select"
              />
            </div>
          </div>
        </div>

        {/* Parent CIs / Relations Section */}
        <div className="form-section">
          <div className="form-grid cols-1">
            <div className="form-field full-width">
              <Parent_CI currentCIId={formData.ciId} />
            </div>
          </div>
        </div>

        {/* Attachments Section */}
        <div className="form-section">
          <div className="form-grid cols-2">
            <div className="form-field full-width">
              <Attach_URL />
            </div>
            <div className="form-field full-width">
              <Attach_File />
            </div>
          </div>
        </div>

        {/* Remark Section */}
        <div className="form-section">
          <div className="form-grid cols-1">
            <div className="form-field full-width">
              <label className="form-field-label">Remark</label>
              <div className="field-with-counter">
                <ClearableTextarea
                  value={formData.remark}
                  onChange={(value) => handleInputChange('remark', value.slice(0, 500))}
                  onClear={() => handleInputChange('remark', '')}
                  rows={4}
                  maxLength={500}
                  placeholder="Please enter Remark"
                />
              </div>
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
            ยกเลิก
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </form>
          </div>
        </div>
      </div>

      <Modal 
        activeModal={activeModal} 
        onClose={closeModal} 
        onConfirm={confirmSelection} 
        serviceId={formData.serviceId}
        systemId={formData.systemName?.id} 
      />
    </div>
  );
}
