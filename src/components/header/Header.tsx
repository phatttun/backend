import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <h1 className="text-2xl font-bold">Software Request System</h1>
      <p className="text-sm text-blue-100">Manage your software requests</p>
    </header>
  );
};
