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
