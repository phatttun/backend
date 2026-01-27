import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Search, X } from 'lucide-react';

// Type definitions for Master Data
interface MasterService {
  id: string;
  service: string;
  serviceName: string;
  supportGroup: string;
  supportGroupName: string;
}

interface MasterSupportGroup {
  id: string;
  supportGroup: string;
  supportGroupName: string;
}

interface MasterType {
  id: string;
  code: string;
  typeName: string;
  category: string;
}

interface MasterFunction {
  id: string;
  code: string;
  functionName: string;
}

interface MasterBrand {
  id: string;
  code: string;
  brandName: string;
}

interface MasterLocation {
  id: string;
  code: string;
  locationName: string;
  customerName: string;
}

interface MasterCustomer {
  id: string;
  code: string;
  customerName: string;
}

interface MasterSystemName {
  id: string;
  code: string;
  name: string;
  serviceId: string; // Link to service
}

interface MasterApplication {
  id: string;
  code: string;
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
  { id: 'SVC001', service: 'APP_DEV', serviceName: 'Application Development', supportGroup: 'DEV_TEAM', supportGroupName: 'Dev Team' },
  { id: 'SVC002', service: 'INFRA', serviceName: 'Infrastructure', supportGroup: 'INFRA_TEAM', supportGroupName: 'Infra Team' },
  { id: 'SVC003', service: 'DB_MGMT', serviceName: 'Database Management', supportGroup: 'DB_TEAM', supportGroupName: 'DB Team' },
  { id: 'SVC004', service: 'CLOUD', serviceName: 'Cloud Services', supportGroup: 'CLOUD_TEAM', supportGroupName: 'Cloud Team' },
  { id: 'SVC005', service: 'SEC', serviceName: 'Security', supportGroup: 'SEC_TEAM', supportGroupName: 'Security Team' },
  { id: 'SVC006', service: 'NET_SVC', serviceName: 'Network Services', supportGroup: 'NET_TEAM', supportGroupName: 'Network Team' },
  { id: 'SVC007', service: 'DATA_ANALYTICS', serviceName: 'Data Analytics', supportGroup: 'ANALYTICS_TEAM', supportGroupName: 'Analytics Team' },
  { id: 'SVC008', service: 'MOBILE_DEV', serviceName: 'Mobile Development', supportGroup: 'MOBILE_TEAM', supportGroupName: 'Mobile Team' },
  { id: 'SVC009', service: 'INT_SVC', serviceName: 'Integration Services', supportGroup: 'INT_TEAM', supportGroupName: 'Integration Team' },
  { id: 'SVC010', service: 'QA', serviceName: 'Testing & QA', supportGroup: 'QA_TEAM', supportGroupName: 'QA Team' },
  { id: 'SVC011', service: 'DEVOPS', serviceName: 'DevOps', supportGroup: 'DEVOPS_TEAM', supportGroupName: 'DevOps Team' },
  { id: 'SVC012', service: 'SUPPORT', serviceName: 'Support Services', supportGroup: 'SUPPORT_TEAM', supportGroupName: 'Support Team' },
];

export const MOCK_SUPPORT_GROUPS: MasterSupportGroup[] = [
  { id: 'SG001', supportGroup: 'DEV_TEAM', supportGroupName: 'Dev Team' },
  { id: 'SG002', supportGroup: 'INFRA_TEAM', supportGroupName: 'Infra Team' },
  { id: 'SG003', supportGroup: 'DB_TEAM', supportGroupName: 'DB Team' },
  { id: 'SG004', supportGroup: 'CLOUD_TEAM', supportGroupName: 'Cloud Team' },
  { id: 'SG005', supportGroup: 'SEC_TEAM', supportGroupName: 'Security Team' },
  { id: 'SG006', supportGroup: 'NET_TEAM', supportGroupName: 'Network Team' },
  { id: 'SG007', supportGroup: 'ANALYTICS_TEAM', supportGroupName: 'Analytics Team' },
  { id: 'SG008', supportGroup: 'MOBILE_TEAM', supportGroupName: 'Mobile Team' },
  { id: 'SG009', supportGroup: 'INT_TEAM', supportGroupName: 'Integration Team' },
  { id: 'SG010', supportGroup: 'QA_TEAM', supportGroupName: 'QA Team' },
  { id: 'SG011', supportGroup: 'DEVOPS_TEAM', supportGroupName: 'DevOps Team' },
  { id: 'SG012', supportGroup: 'SUPPORT_TEAM', supportGroupName: 'Support Team' },
];

export const MOCK_TYPES: MasterType[] = [
  { id: 'T001', code: 'T001', typeName: 'Server', category: 'Hardware' },
  { id: 'T002', code: 'T002', typeName: 'Laptop', category: 'Hardware' },
  { id: 'T003', code: 'T003', typeName: 'Software Application', category: 'Software' },
  { id: 'T004', code: 'T004', typeName: 'Database', category: 'Software' },
  { id: 'T005', code: 'T005', typeName: 'Network Switch', category: 'Network Link' },
  { id: 'T006', code: 'T006', typeName: 'Documentation', category: 'Document' },
];

export const MOCK_FUNCTIONS: MasterFunction[] = [
  { id: 'F001', code: 'F001', functionName: 'Web Server' },
  { id: 'F002', code: 'F002', functionName: 'Database Server' },
  { id: 'F003', code: 'F003', functionName: 'Load Balancer' },
  { id: 'F004', code: 'F004', functionName: 'Backup Server' },
  { id: 'F005', code: 'F005', functionName: 'Monitoring Server' },
];

export const MOCK_BRANDS: MasterBrand[] = [
  { id: 'B001', code: 'B001', brandName: 'Dell' },
  { id: 'B002', code: 'B002', brandName: 'HP' },
  { id: 'B003', code: 'B003', brandName: 'Cisco' },
  { id: 'B004', code: 'B004', brandName: 'IBM' },
  { id: 'B005', code: 'B005', brandName: 'Oracle' },
];

export const MOCK_LOCATIONS: MasterLocation[] = [
  { id: 'L001', code: 'L001', locationName: 'Data Center A', customerName: 'Internal' },
  { id: 'L002', code: 'L002', locationName: 'Data Center B', customerName: 'Internal' },
  { id: 'L003', code: 'L003', locationName: 'Cloud Region US-East', customerName: 'Cloud Provider' },
];

export const MOCK_CUSTOMERS: MasterCustomer[] = [
  { id: 'C001', code: 'C001', customerName: 'Internal' },
  { id: 'C002', code: 'C002', customerName: 'Customer A' },
  { id: 'C003', code: 'C003', customerName: 'Customer B' },
];

export const MOCK_SYSTEM_NAMES: MasterSystemName[] = [
  // Application Development (SVC001)
  { id: 'SYS001', code: 'ERP', name: 'Enterprise Resource Planning', serviceId: 'SVC001' },
  { id: 'SYS002', code: 'CRM', name: 'Customer Relationship Management', serviceId: 'SVC001' },
  { id: 'SYS003', code: 'HRM', name: 'Human Resource Management', serviceId: 'SVC001' },
  { id: 'SYS004', code: 'FIN', name: 'Financial System', serviceId: 'SVC001' },
  { id: 'SYS005', code: 'SCM', name: 'Supply Chain Management', serviceId: 'SVC001' },
  
  // Infrastructure (SVC002)
  { id: 'SYS006', code: 'INFRA-SERVER', name: 'Server Infrastructure', serviceId: 'SVC002' },
  { id: 'SYS007', code: 'INFRA-NETWORK', name: 'Network Infrastructure', serviceId: 'SVC002' },
  { id: 'SYS008', code: 'INFRA-STORAGE', name: 'Storage Infrastructure', serviceId: 'SVC002' },
  { id: 'SYS009', code: 'INFRA-MONITOR', name: 'Infrastructure Monitoring', serviceId: 'SVC002' },
  
  // Database Management (SVC003)
  { id: 'SYS010', code: 'DB-ORACLE', name: 'Oracle Database', serviceId: 'SVC003' },
  { id: 'SYS011', code: 'DB-MYSQL', name: 'MySQL Database', serviceId: 'SVC003' },
  { id: 'SYS012', code: 'DB-SQLSERVER', name: 'SQL Server Database', serviceId: 'SVC003' },
  { id: 'SYS013', code: 'DB-MONGODB', name: 'MongoDB Database', serviceId: 'SVC003' },
  
  // Cloud Services (SVC004)
  { id: 'SYS014', code: 'CLOUD-AWS', name: 'AWS Cloud Services', serviceId: 'SVC004' },
  { id: 'SYS015', code: 'CLOUD-AZURE', name: 'Azure Cloud Services', serviceId: 'SVC004' },
  { id: 'SYS016', code: 'CLOUD-GCP', name: 'Google Cloud Platform', serviceId: 'SVC004' },
  
  // Security (SVC005)
  { id: 'SYS017', code: 'SEC-FIREWALL', name: 'Firewall Security', serviceId: 'SVC005' },
  { id: 'SYS018', code: 'SEC-ENCRYPT', name: 'Data Encryption', serviceId: 'SVC005' },
  { id: 'SYS019', code: 'SEC-AUTH', name: 'Authentication System', serviceId: 'SVC005' },
  
  // Network Services (SVC006)
  { id: 'SYS020', code: 'NET-ROUTER', name: 'Network Routing', serviceId: 'SVC006' },
  { id: 'SYS021', code: 'NET-SWITCH', name: 'Network Switching', serviceId: 'SVC006' },
  { id: 'SYS022', code: 'NET-VPN', name: 'VPN Services', serviceId: 'SVC006' },
  
  // Data Analytics (SVC007)
  { id: 'SYS023', code: 'ANALYTICS-BI', name: 'Business Intelligence', serviceId: 'SVC007' },
  { id: 'SYS024', code: 'ANALYTICS-ML', name: 'Machine Learning', serviceId: 'SVC007' },
  { id: 'SYS025', code: 'ANALYTICS-REPORT', name: 'Reporting System', serviceId: 'SVC007' },
  
  // Mobile Development (SVC008)
  { id: 'SYS026', code: 'MOBILE-IOS', name: 'iOS Mobile Apps', serviceId: 'SVC008' },
  { id: 'SYS027', code: 'MOBILE-ANDROID', name: 'Android Mobile Apps', serviceId: 'SVC008' },
  { id: 'SYS028', code: 'MOBILE-HYBRID', name: 'Hybrid Mobile Apps', serviceId: 'SVC008' },
  
  // Integration Services (SVC009)
  { id: 'SYS029', code: 'INTEGRATION-API', name: 'API Integration', serviceId: 'SVC009' },
  { id: 'SYS030', code: 'INTEGRATION-ESB', name: 'Enterprise Service Bus', serviceId: 'SVC009' },
  { id: 'SYS031', code: 'INTEGRATION-MQ', name: 'Message Queue', serviceId: 'SVC009' },
  
  // Testing & QA (SVC010)
  { id: 'SYS032', code: 'QA-AUTOMATION', name: 'Test Automation', serviceId: 'SVC010' },
  { id: 'SYS033', code: 'QA-MANUAL', name: 'Manual Testing', serviceId: 'SVC010' },
  { id: 'SYS034', code: 'QA-PERFORMANCE', name: 'Performance Testing', serviceId: 'SVC010' },
  
  // DevOps (SVC011)
  { id: 'SYS035', code: 'DEVOPS-CI', name: 'Continuous Integration', serviceId: 'SVC011' },
  { id: 'SYS036', code: 'DEVOPS-CD', name: 'Continuous Deployment', serviceId: 'SVC011' },
  { id: 'SYS037', code: 'DEVOPS-MONITOR', name: 'DevOps Monitoring', serviceId: 'SVC011' },
  
  // Support Services (SVC012)
  { id: 'SYS038', code: 'SUPPORT-HELPDESK', name: 'Help Desk System', serviceId: 'SVC012' },
  { id: 'SYS039', code: 'SUPPORT-TICKET', name: 'Ticket Management', serviceId: 'SVC012' },
  { id: 'SYS040', code: 'SUPPORT-KB', name: 'Knowledge Base', serviceId: 'SVC012' },
];

export const MOCK_APPLICATIONS: MasterApplication[] = [
  // ERP (SYS001)
  { id: 'APP001', code: 'ERP-WEB', applicationName: 'ERP Web Portal', systemId: 'SYS001' },
  { id: 'APP002', code: 'ERP-MOB', applicationName: 'ERP Mobile App', systemId: 'SYS001' },
  { id: 'APP003', code: 'ERP-DESKTOP', applicationName: 'ERP Desktop Client', systemId: 'SYS001' },
  
  // CRM (SYS002)
  { id: 'APP004', code: 'CRM-DASH', applicationName: 'CRM Dashboard', systemId: 'SYS002' },
  { id: 'APP005', code: 'CRM-ANALYTICS', applicationName: 'CRM Analytics', systemId: 'SYS002' },
  { id: 'APP006', code: 'CRM-MOBILE', applicationName: 'CRM Mobile App', systemId: 'SYS002' },
  
  // HRM (SYS003)
  { id: 'APP007', code: 'HR-PORTAL', applicationName: 'HR Portal', systemId: 'SYS003' },
  { id: 'APP008', code: 'PAYROLL', applicationName: 'Payroll System', systemId: 'SYS003' },
  { id: 'APP009', code: 'HR-MOBILE', applicationName: 'HR Mobile App', systemId: 'SYS003' },
  
  // FIN (SYS004)
  { id: 'APP010', code: 'ACCT', applicationName: 'Accounting Software', systemId: 'SYS004' },
  { id: 'APP011', code: 'BUDGET', applicationName: 'Budget Planning', systemId: 'SYS004' },
  { id: 'APP012', code: 'FIN-REPORT', applicationName: 'Financial Reporting', systemId: 'SYS004' },
  
  // SCM (SYS005)
  { id: 'APP013', code: 'INV', applicationName: 'Inventory Management', systemId: 'SYS005' },
  { id: 'APP014', code: 'ORDER', applicationName: 'Order Processing', systemId: 'SYS005' },
  { id: 'APP015', code: 'SCM-DASH', applicationName: 'SCM Dashboard', systemId: 'SYS005' },
  
  // INFRA-SERVER (SYS006)
  { id: 'APP016', code: 'SERVER-MGMT', applicationName: 'Server Management Console', systemId: 'SYS006' },
  { id: 'APP017', code: 'SERVER-MONITOR', applicationName: 'Server Monitoring Tool', systemId: 'SYS006' },
  
  // INFRA-NETWORK (SYS007)
  { id: 'APP018', code: 'NETWORK-MGMT', applicationName: 'Network Management', systemId: 'SYS007' },
  { id: 'APP019', code: 'NETWORK-MONITOR', applicationName: 'Network Monitoring', systemId: 'SYS007' },
  
  // INFRA-STORAGE (SYS008)
  { id: 'APP020', code: 'STORAGE-MGMT', applicationName: 'Storage Management', systemId: 'SYS008' },
  { id: 'APP021', code: 'BACKUP-TOOL', applicationName: 'Backup Tool', systemId: 'SYS008' },
  
  // INFRA-MONITOR (SYS009)
  { id: 'APP022', code: 'INFRA-ALERTS', applicationName: 'Infrastructure Alerts', systemId: 'SYS009' },
  { id: 'APP023', code: 'INFRA-DASH', applicationName: 'Infrastructure Dashboard', systemId: 'SYS009' },
  
  // DB-ORACLE (SYS010)
  { id: 'APP024', code: 'ORACLE-ADMIN', applicationName: 'Oracle Admin Console', systemId: 'SYS010' },
  { id: 'APP025', code: 'ORACLE-MONITOR', applicationName: 'Oracle Monitor', systemId: 'SYS010' },
  
  // DB-MYSQL (SYS011)
  { id: 'APP026', code: 'MYSQL-ADMIN', applicationName: 'MySQL Admin', systemId: 'SYS011' },
  { id: 'APP027', code: 'MYSQL-WORKBENCH', applicationName: 'MySQL Workbench', systemId: 'SYS011' },
  
  // DB-SQLSERVER (SYS012)
  { id: 'APP028', code: 'SQL-MGMT', applicationName: 'SQL Server Management', systemId: 'SYS012' },
  { id: 'APP029', code: 'SQL-REPORT', applicationName: 'SQL Server Reporting', systemId: 'SYS012' },
  
  // DB-MONGODB (SYS013)
  { id: 'APP030', code: 'MONGO-COMPASS', applicationName: 'MongoDB Compass', systemId: 'SYS013' },
  { id: 'APP031', code: 'MONGO-ADMIN', applicationName: 'MongoDB Admin', systemId: 'SYS013' },
  
  // CLOUD-AWS (SYS014)
  { id: 'APP032', code: 'AWS-CONSOLE', applicationName: 'AWS Management Console', systemId: 'SYS014' },
  { id: 'APP033', code: 'AWS-CLI', applicationName: 'AWS CLI Tools', systemId: 'SYS014' },
  
  // CLOUD-AZURE (SYS015)
  { id: 'APP034', code: 'AZURE-PORTAL', applicationName: 'Azure Portal', systemId: 'SYS015' },
  { id: 'APP035', code: 'AZURE-CLI', applicationName: 'Azure CLI', systemId: 'SYS015' },
  
  // CLOUD-GCP (SYS016)
  { id: 'APP036', code: 'GCP-CONSOLE', applicationName: 'Google Cloud Console', systemId: 'SYS016' },
  { id: 'APP037', code: 'GCP-CLI', applicationName: 'GCP CLI Tools', systemId: 'SYS016' },
  
  // SEC-FIREWALL (SYS017)
  { id: 'APP038', code: 'FIREWALL-MGMT', applicationName: 'Firewall Management', systemId: 'SYS017' },
  { id: 'APP039', code: 'FIREWALL-LOG', applicationName: 'Firewall Logging', systemId: 'SYS017' },
  
  // SEC-ENCRYPT (SYS018)
  { id: 'APP040', code: 'ENCRYPT-TOOL', applicationName: 'Encryption Tool', systemId: 'SYS018' },
  { id: 'APP041', code: 'KEY-MGMT', applicationName: 'Key Management', systemId: 'SYS018' },
  
  // SEC-AUTH (SYS019)
  { id: 'APP042', code: 'AUTH-SERVER', applicationName: 'Authentication Server', systemId: 'SYS019' },
  { id: 'APP043', code: 'AUTH-CLIENT', applicationName: 'Authentication Client', systemId: 'SYS019' },
  
  // NET-ROUTER (SYS020)
  { id: 'APP044', code: 'ROUTER-CONFIG', applicationName: 'Router Configuration', systemId: 'SYS020' },
  { id: 'APP045', code: 'ROUTER-MONITOR', applicationName: 'Router Monitoring', systemId: 'SYS020' },
  
  // NET-SWITCH (SYS021)
  { id: 'APP046', code: 'SWITCH-CONFIG', applicationName: 'Switch Configuration', systemId: 'SYS021' },
  { id: 'APP047', code: 'SWITCH-MONITOR', applicationName: 'Switch Monitoring', systemId: 'SYS021' },
  
  // NET-VPN (SYS022)
  { id: 'APP048', code: 'VPN-CLIENT', applicationName: 'VPN Client', systemId: 'SYS022' },
  { id: 'APP049', code: 'VPN-SERVER', applicationName: 'VPN Server', systemId: 'SYS022' },
  
  // ANALYTICS-BI (SYS023)
  { id: 'APP050', code: 'BI-DASHBOARD', applicationName: 'BI Dashboard', systemId: 'SYS023' },
  { id: 'APP051', code: 'BI-REPORT', applicationName: 'BI Reporting Tool', systemId: 'SYS023' },
  
  // ANALYTICS-ML (SYS024)
  { id: 'APP052', code: 'ML-STUDIO', applicationName: 'ML Studio', systemId: 'SYS024' },
  { id: 'APP053', code: 'ML-MODEL', applicationName: 'ML Model Builder', systemId: 'SYS024' },
  
  // ANALYTICS-REPORT (SYS025)
  { id: 'APP054', code: 'REPORT-BUILDER', applicationName: 'Report Builder', systemId: 'SYS025' },
  { id: 'APP055', code: 'REPORT-VIEWER', applicationName: 'Report Viewer', systemId: 'SYS025' },
  
  // MOBILE-IOS (SYS026)
  { id: 'APP056', code: 'IOS-XCODE', applicationName: 'iOS Xcode Project', systemId: 'SYS026' },
  { id: 'APP057', code: 'IOS-SWIFT', applicationName: 'Swift iOS App', systemId: 'SYS026' },
  
  // MOBILE-ANDROID (SYS027)
  { id: 'APP058', code: 'ANDROID-STUDIO', applicationName: 'Android Studio Project', systemId: 'SYS027' },
  { id: 'APP059', code: 'ANDROID-KOTLIN', applicationName: 'Kotlin Android App', systemId: 'SYS027' },
  
  // MOBILE-HYBRID (SYS028)
  { id: 'APP060', code: 'HYBRID-IONIC', applicationName: 'Ionic Hybrid App', systemId: 'SYS028' },
  { id: 'APP061', code: 'HYBRID-REACT', applicationName: 'React Native App', systemId: 'SYS028' },
  
  // INTEGRATION-API (SYS029)
  { id: 'APP062', code: 'API-GATEWAY', applicationName: 'API Gateway', systemId: 'SYS029' },
  { id: 'APP063', code: 'API-CLIENT', applicationName: 'API Client', systemId: 'SYS029' },
  
  // INTEGRATION-ESB (SYS030)
  { id: 'APP064', code: 'ESB-CONSOLE', applicationName: 'ESB Management Console', systemId: 'SYS030' },
  { id: 'APP065', code: 'ESB-MONITOR', applicationName: 'ESB Monitoring', systemId: 'SYS030' },
  
  // INTEGRATION-MQ (SYS031)
  { id: 'APP066', code: 'MQ-ADMIN', applicationName: 'Message Queue Admin', systemId: 'SYS031' },
  { id: 'APP067', code: 'MQ-MONITOR', applicationName: 'Message Queue Monitor', systemId: 'SYS031' },
  
  // QA-AUTOMATION (SYS032)
  { id: 'APP068', code: 'SELENIUM', applicationName: 'Selenium Test Suite', systemId: 'SYS032' },
  { id: 'APP069', code: 'CYPRESS', applicationName: 'Cypress Test Suite', systemId: 'SYS032' },
  
  // QA-MANUAL (SYS033)
  { id: 'APP070', code: 'TEST-RAIL', applicationName: 'TestRail', systemId: 'SYS033' },
  { id: 'APP071', code: 'JIRA-XRAY', applicationName: 'Jira Xray', systemId: 'SYS033' },
  
  // QA-PERFORMANCE (SYS034)
  { id: 'APP072', code: 'JMETER', applicationName: 'JMeter Load Testing', systemId: 'SYS034' },
  { id: 'APP073', code: 'LOADRUNNER', applicationName: 'LoadRunner', systemId: 'SYS034' },
  
  // DEVOPS-CI (SYS035)
  { id: 'APP074', code: 'JENKINS', applicationName: 'Jenkins CI', systemId: 'SYS035' },
  { id: 'APP075', code: 'GITLAB-CI', applicationName: 'GitLab CI/CD', systemId: 'SYS035' },
  
  // DEVOPS-CD (SYS036)
  { id: 'APP076', code: 'ANSIBLE', applicationName: 'Ansible Automation', systemId: 'SYS036' },
  { id: 'APP077', code: 'TERRAFORM', applicationName: 'Terraform', systemId: 'SYS036' },
  
  // DEVOPS-MONITOR (SYS037)
  { id: 'APP078', code: 'PROMETHEUS', applicationName: 'Prometheus Monitoring', systemId: 'SYS037' },
  { id: 'APP079', code: 'GRAFANA', applicationName: 'Grafana Dashboard', systemId: 'SYS037' },
  
  // SUPPORT-HELPDESK (SYS038)
  { id: 'APP080', code: 'HELPDESK-PRO', applicationName: 'HelpDesk Pro', systemId: 'SYS038' },
  { id: 'APP081', code: 'HELPDESK-PLUS', applicationName: 'HelpDesk Plus', systemId: 'SYS038' },
  
  // SUPPORT-TICKET (SYS039)
  { id: 'APP082', code: 'TICKET-SYSTEM', applicationName: 'Ticket Management System', systemId: 'SYS039' },
  { id: 'APP083', code: 'TICKET-TRACKER', applicationName: 'Ticket Tracker', systemId: 'SYS039' },
  
  // SUPPORT-KB (SYS040)
  { id: 'APP084', code: 'KB-SEARCH', applicationName: 'Knowledge Base Search', systemId: 'SYS040' },
  { id: 'APP085', code: 'KB-EDITOR', applicationName: 'Knowledge Base Editor', systemId: 'SYS040' },
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
  { id: 'SR006', serviceName: 'Network Services', documentNumber: 'SR-006', status: 'Active' },
  { id: 'SR007', serviceName: 'Data Analytics', documentNumber: 'SR-007', status: 'Completed' },
  { id: 'SR008', serviceName: 'Mobile Development', documentNumber: 'SR-008', status: 'Active' },
  { id: 'SR009', serviceName: 'Integration Services', documentNumber: 'SR-009', status: 'Pending' },
  { id: 'SR010', serviceName: 'Testing & QA', documentNumber: 'SR-010', status: 'Active' },
  { id: 'SR011', serviceName: 'DevOps', documentNumber: 'SR-011', status: 'Completed' },
  { id: 'SR012', serviceName: 'Support Services', documentNumber: 'SR-012', status: 'Active' },
];

interface ModalProps {
  activeModal: string | null;
  onClose: () => void;
  onConfirm: (selectedData: any) => void;
  serviceId?: string; // For filtering systems by service
  systemId?: string; // For filtering applications by system
}

export const Modal: React.FC<ModalProps> = ({ activeModal, onClose, onConfirm, serviceId, systemId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (activeModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [activeModal]);

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
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // MODAL COMPONENT: Service Selector
  const ServiceSelectorModal = () => {
    const filteredServices = filterData(MOCK_SERVICES, ['serviceName']);
    const paginatedServices = getPaginatedData(filteredServices);
    const totalPages = getTotalPages(filteredServices);

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-large" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Service</h2>
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
                  <th>Service Name</th>
                  <th>Support Group Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedServices.map((service) => (
                  <tr
                    key={service.id}
                    className={`modal-table-row ${selectedItem?.id === service.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(service)}
                  >
                    <td>{service.serviceName}</td>
                    <td>{service.supportGroupName}</td>
                    <td>
                      <span className={`checkmark ${selectedItem?.id === service.id ? 'visible' : 'hidden'}`}>✓</span>
                    </td>
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Support Group</h2>
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
                  <th>Code</th>
                  <th>Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGroups.map((group) => (
                  <tr
                    key={group.id}
                    className={`modal-table-row ${selectedItem?.id === group.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(group)}
                  >
                    <td>{group.supportGroup}</td>
                    <td>{group.supportGroupName}</td>
                    <td>
                      <span className={`checkmark ${selectedItem?.id === group.id ? 'visible' : 'hidden'}`}>✓</span>
                    </td>
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
              ยกเลิก
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Type</h2>
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
                  <th>Code</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTypes.map((type) => (
                  <tr
                    key={type.id}
                    className={`modal-table-row ${selectedItem?.id === type.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(type)}
                  >
                    <td>{type.code}</td>
                    <td>{type.typeName}</td>
                    <td>{type.category}</td>
                    <td>
                      <span className={`checkmark ${selectedItem?.id === type.id ? 'visible' : 'hidden'}`}>✓</span>
                    </td>
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Function</h2>
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
                  <th>Code</th>
                  <th>Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFunctions.map((func) => (
                  <tr
                    key={func.id}
                    className={`modal-table-row ${selectedItem?.id === func.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(func)}
                  >
                    <td>{func.code}</td>
                    <td>{func.functionName}</td>
                    <td>
                      <span className={`checkmark ${selectedItem?.id === func.id ? 'visible' : 'hidden'}`}>✓</span>
                    </td>
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Brand</h2>
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
                  <th>Code</th>
                  <th>Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className={`modal-table-row ${selectedItem?.id === brand.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(brand)}
                  >
                    <td>{brand.code}</td>
                    <td>{brand.brandName}</td>
                    <td>
                      <span className={`checkmark ${selectedItem?.id === brand.id ? 'visible' : 'hidden'}`}>✓</span>
                    </td>
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
    const systemsForService = serviceId ? MOCK_SYSTEM_NAMES.filter(system => system.serviceId === serviceId) : [];
    const filteredSystems = filterData(systemsForService, ['code', 'name']);
    const paginatedSystems = getPaginatedData(filteredSystems);
    const totalPages = getTotalPages(filteredSystems);

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>System Name</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            {!serviceId ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray-500)' }}>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>กรุณาเลือก Service ก่อน เพื่อแสดงรายการ System Name</p>
                <p style={{ fontSize: '14px' }}>Please select a Service first to view available System Names.</p>
              </div>
            ) : (
              <>
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
                      <th>Code</th>
                      <th>Name</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSystems.map((system) => (
                      <tr
                        key={system.id}
                        onClick={() => handleSelectItem(system)}
                        className={selectedItem?.id === system.id ? 'selected' : ''}
                      >
                        <td>{system.code}</td>
                        <td>{system.name}</td>
                        <td>
                          <div className={`checkmark ${selectedItem?.id === system.id ? 'visible' : 'hidden'}`}>
                            ✓
                          </div>
                        </td>
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
              </>
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
              disabled={!selectedItem || !serviceId}
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
      ? filterData(MOCK_APPLICATIONS.filter(app => app.systemId === systemId), ['code', 'applicationName'])
      : [];
    const paginatedApplications = getPaginatedData(filteredApplications);
    const totalPages = getTotalPages(filteredApplications);

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Application</h2>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            {systemId ? (
              <>
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
                      <th>Code</th>
                      <th>Name</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedApplications.map((app) => (
                      <tr
                        key={app.id}
                        onClick={() => handleSelectItem(app)}
                        className={selectedItem?.id === app.id ? 'selected' : ''}
                      >
                        <td>{app.code}</td>
                        <td>{app.applicationName}</td>
                        <td>
                          <div className={`checkmark ${selectedItem?.id === app.id ? 'visible' : 'hidden'}`}>
                            ✓
                          </div>
                        </td>
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
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray-500)' }}>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>กรุณาเลือก System Name ก่อน เพื่อแสดงรายการ Application</p>
                <p style={{ fontSize: '14px' }}>Please select a System Name first to view available Applications.</p>
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
              disabled={!selectedItem || !systemId}
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Location</h2>
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
                  <th>Code</th>
                  <th>Name</th>
                  <th>Customer</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLocations.map((location) => (
                  <tr
                    key={location.id}
                    className={`modal-table-row ${selectedItem?.id === location.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(location)}
                  >
                    <td>{location.code}</td>
                    <td>{location.locationName}</td>
                    <td>{location.customerName}</td>
                    <td>
                      <span className={`checkmark ${selectedItem?.id === location.id ? 'visible' : 'hidden'}`}>✓</span>
                    </td>
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Customer</h2>
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
                  <th>Code</th>
                  <th>Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className={`modal-table-row ${selectedItem?.id === customer.id ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(customer)}
                  >
                    <td>{customer.code}</td>
                    <td>{customer.customerName}</td>
                    <td>
                      <span className={`checkmark ${selectedItem?.id === customer.id ? 'visible' : 'hidden'}`}>✓</span>
                    </td>
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-large" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Project</h2>
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
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => handleSelectItem(project)}
                    className={selectedItem?.id === project.id ? 'selected' : ''}
                  >
                    <td>{project.projectSaleNumber}</td>
                    <td>{project.projectName}</td>
                    <td>{project.poNumberGosoft}</td>
                    <td>{project.poNumberCustomer}</td>
                    <td>{project.supplier}</td>
                    <td>
                      <div className={`checkmark ${selectedItem?.id === project.id ? 'visible' : 'hidden'}`}>
                        ✓
                      </div>
                    </td>
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Supplier</h2>
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
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    onClick={() => handleSelectItem(supplier)}
                    className={selectedItem?.id === supplier.id ? 'selected' : ''}
                  >
                    <td>{supplier.code}</td>
                    <td>{supplier.name}</td>
                    <td>
                      <div className={`checkmark ${selectedItem?.id === supplier.id ? 'visible' : 'hidden'}`}>
                        ✓
                      </div>
                    </td>
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
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content modal-medium" onClick={e => e.stopPropagation()}>
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
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSRReleases.map((sr) => (
                  <tr
                    key={sr.id}
                    onClick={() => handleSelectItem(sr)}
                    className={selectedItem?.id === sr.id ? 'selected' : ''}
                  >
                    <td>{sr.serviceName}</td>
                    <td>{sr.documentNumber}</td>
                    <td>{sr.status}</td>
                    <td>
                      <div className={`checkmark ${selectedItem?.id === sr.id ? 'visible' : 'hidden'}`}>
                        ✓
                      </div>
                    </td>
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

  const modalContent = (() => {
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
  })();

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};


