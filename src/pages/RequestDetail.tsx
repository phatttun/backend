import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";

interface SoftwareRequest {
  id: number;
  form_data: any;
  status: string;
  request_date: string;
  request_no: string;
  ci_id: string;
}

export default function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<SoftwareRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/software-requests/${id}`)
        .then(response => response.json())
        .then(data => {
          setRequest(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching request:', error);
          setLoading(false);
        });
    }
  }, [id]);

  async function handleSave() {
    if (!request) return;
    try {
      const response = await fetch(`http://localhost:8080/software-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.form_data),
      });
      if (response.ok) {
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
        navigate('/');
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      console.error('Error saving request:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  }

  async function handleCancel() {
    if (confirm('คุณต้องการยกเลิก Draft นี้หรือไม่? ข้อมูลจะถูกลบออกจากระบบ')) {
      try {
        const response = await fetch(`http://localhost:8080/software-requests/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('ยกเลิกเรียบร้อยแล้ว');
          navigate('/');
        } else {
          alert('เกิดข้อผิดพลาดในการยกเลิก');
        }
      } catch (error) {
        console.error('Error deleting request:', error);
        alert('เกิดข้อผิดพลาดในการยกเลิก');
      }
    }
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