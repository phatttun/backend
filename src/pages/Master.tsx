import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Master() {
  const location = useLocation();
  const selected = location.pathname.replace('/master/', '') || 'overview';

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Master</h1>
      <p className="text-slate-600 mb-6">Manage master data and reference information.</p>

      <div className="bg-white rounded-md shadow-sm p-6">
        <h2 className="font-medium text-slate-800 mb-2">Selected</h2>
        <div className="text-slate-700">{selected}</div>
      </div>
    </div>
  );
}
