// Type definitions for Master Data
export interface MasterService {
  id: string;
  service: string;
  serviceName: string;
  supportGroup: string;
  supportGroupName: string;
}

export interface MasterSupportGroup {
  id: string;
  supportGroup: string;
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
  { id: 'SVC001', service: 'APP_DEV', serviceName: 'Application Development', supportGroup: 'DEV_TEAM', supportGroupName: 'Dev Team' },
  { id: 'SVC002', service: 'INFRA', serviceName: 'Infrastructure', supportGroup: 'INFRA_TEAM', supportGroupName: 'Infra Team' },
  { id: 'SVC003', service: 'DB_MGMT', serviceName: 'Database Management', supportGroup: 'DB_TEAM', supportGroupName: 'DB Team' },
  { id: 'SVC004', service: 'CLOUD', serviceName: 'Cloud Services', supportGroup: 'CLOUD_TEAM', supportGroupName: 'Cloud Team' },
  { id: 'SVC005', service: 'SEC', serviceName: 'Security', supportGroup: 'SEC_TEAM', supportGroupName: 'Security Team' },
  { id: 'SVC006', service: 'NET_SVC', serviceName: 'Network Services', supportGroup: 'NET_TEAM', supportGroupName: 'Network Team' },
];

export const MOCK_SUPPORT_GROUPS: MasterSupportGroup[] = [
  { id: 'SG001', supportGroup: 'DEV_TEAM', supportGroupName: 'Dev Team' },
  { id: 'SG002', supportGroup: 'INFRA_TEAM', supportGroupName: 'Infra Team' },
  { id: 'SG003', supportGroup: 'DB_TEAM', supportGroupName: 'DB Team' },
  { id: 'SG004', supportGroup: 'CLOUD_TEAM', supportGroupName: 'Cloud Team' },
  { id: 'SG005', supportGroup: 'SEC_TEAM', supportGroupName: 'Security Team' },
  { id: 'SG006', supportGroup: 'NET_TEAM', supportGroupName: 'Network Team' },
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
