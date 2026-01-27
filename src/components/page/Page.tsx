import React from 'react';

interface PageProps {
  title: string;
  children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <div className="bg-white rounded-lg shadow p-6">{children}</div>
      </div>
    </div>
  );
};
