/**
 * Software Request API Service
 * Handles API calls for software requests
 */

import apiClient from './apiClient';

export interface SoftwareRequest {
  id: number;
  requestNo: string;
  ciId: string;
  ciName: string;
  ciVersion: string;
  serviceName: string;
  requester: string;
  requestDate: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
  currentOperator: string;
}

export interface CreateDraftRequest {
  ciName: string;
  ciVersion: string;
  serviceName: string;
  createdBy: string;
  [key: string]: any;
}

const softwareRequestService = {
  /**
   * Get all software requests for the current user (Draft status)
   */
  getDrafts: async (): Promise<SoftwareRequest[]> => {
    try {
      const response = await apiClient.get<SoftwareRequest[]>('/software-requests');
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch requests',
        status: error.response?.status,
        error,
      };
    }
  },

  /**
   * Get a specific software request by ID
   */
  getDraftById: async (id: number): Promise<SoftwareRequest> => {
    try {
      const response = await apiClient.get<SoftwareRequest>(`/software-requests/${id}`);
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch request',
        status: error.response?.status,
        error,
      };
    }
  },

  /**
   * Create a new draft
   */
  createDraft: async (data: CreateDraftRequest): Promise<SoftwareRequest> => {
    try {
      const response = await apiClient.post<SoftwareRequest>('/software-requests', data);
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to create draft',
        status: error.response?.status,
        error,
      };
    }
  },

  /**
   * Update a draft
   */
  updateDraft: async (id: number, data: any): Promise<SoftwareRequest> => {
    try {
      const response = await apiClient.put<SoftwareRequest>(`/software-requests/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to update draft',
        status: error.response?.status,
        error,
      };
    }
  },

  /**
   * Delete a draft
   */
  deleteDraft: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/software-requests/${id}`);
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to delete draft',
        status: error.response?.status,
        error,
      };
    }
  },

  /**
   * Delete child item (Parent CI, Relation, Attach URL, Attach File)
   */
  deleteChildItem: async (parentId: number, childType: string, childId: string): Promise<void> => {
    try {
      await apiClient.delete(`/software-requests/${parentId}/${childType}/${childId}`);
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to delete item',
        status: error.response?.status,
        error,
      };
    }
  },
};

export default softwareRequestService;
