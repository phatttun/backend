import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";
import apiClient from "@/services/apiClient";

interface SoftwareRequest {
  id: number;
  form_data: any;
  status: string;
  request_date: string;
  request_no: string | null;
  ci_id: string | null;
}

export default function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<SoftwareRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRequestData = async () => {
        try {
          console.log('Fetching request detail for ID:', id);
          const response = await apiClient.get<SoftwareRequest>(`/software-requests/${id}`);
          setRequest(response.data);
          setError(null);
          setLoading(false);
        } catch (err: any) {
          console.error('Error fetching request:', err);
          const errorMessage = err.response?.data?.error || err.message || 'Failed to load request data';
          setError(errorMessage);
          setLoading(false);
        }
      };

      fetchRequestData();
    }
  }, [id]);

  async function handleSave() {
    if (!request) return;
    try {
      console.log('Saving request:', id);
      await apiClient.put(`/software-requests/${id}`, request.form_data);
      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      navigate('/');
    } catch (err: any) {
      console.error('Error saving request:', err);
      const errorMessage = err.response?.data?.error || err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      alert(errorMessage);
    }
  }

  async function handleCancel() {
    if (confirm('คุณต้องการยกเลิก Draft นี้หรือไม่? ข้อมูลจะถูกลบออกจากระบบ')) {
      try {
        console.log('Deleting request:', id);
        await apiClient.delete(`/software-requests/${id}`);
        alert('ยกเลิกเรียบร้อยแล้ว');
        navigate('/');
      } catch (err: any) {
        console.error('Error deleting request:', err);
        const errorMessage = err.response?.data?.error || err.message || 'เกิดข้อผิดพลาดในการยกเลิก';
        alert(errorMessage);
      }
    }
  }

  if (error) {
    return (
      <div className="bg-gray-50 home-container">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm header">
            <div className="flex items-center gap-4">
              <nav className="breadcrumbs">
                <div className="breadcrumb-item">
                  <button onClick={() => navigate('/')} className="breadcrumb-link">
                    <HomeIcon size={16} className="breadcrumb-icon" />
                    Home
                  </button>
                </div>
                <div className="breadcrumb-item">
                  Request Detail
                </div>
              </nav>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8 content-area">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-semibold">Failed to load request data</p>
              <p className="text-sm mt-2">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                กลับไปหน้าแรก
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-50 home-container">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm header">
            <div className="flex items-center gap-4">
              <nav className="breadcrumbs">
                <div className="breadcrumb-item">
                  <button onClick={() => navigate('/')} className="breadcrumb-link">
                    <HomeIcon size={16} className="breadcrumb-icon" />
                    Home
                  </button>
                </div>
                <div className="breadcrumb-item">
                  Request Detail
                </div>
              </nav>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8 content-area">
            <p>กำลังโหลด...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="bg-gray-50 home-container">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm header">
            <div className="flex items-center gap-4">
              <nav className="breadcrumbs">
                <div className="breadcrumb-item">
                  <button onClick={() => navigate('/')} className="breadcrumb-link">
                    <HomeIcon size={16} className="breadcrumb-icon" />
                    Home
                  </button>
                </div>
                <div className="breadcrumb-item">
                  Request Detail
                </div>
              </nav>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8 content-area">
            <p>ไม่พบข้อมูลคำขอ</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 home-container">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm header">
          <div className="flex items-center gap-4">
            <nav className="breadcrumbs">
              <div className="breadcrumb-item">
                <button onClick={() => navigate('/')} className="breadcrumb-link">
                  <HomeIcon size={16} className="breadcrumb-icon" />
                  Home
                </button>
              </div>
              <div className="breadcrumb-item">
                Request Detail
              </div>
            </nav>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8 content-area">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Software Request Detail</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <p className="mt-1 text-sm text-gray-900">{request.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900">{request.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Request Date</label>
                <p className="mt-1 text-sm text-gray-900">{request.request_date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Request No</label>
                <p className="mt-1 text-sm text-gray-900">{request.request_no || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CI ID</label>
                <p className="mt-1 text-sm text-gray-900">{request.ci_id || 'N/A'}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Data</label>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(request.form_data, null, 2)}
              </pre>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                บันทึกข้อมูล
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}