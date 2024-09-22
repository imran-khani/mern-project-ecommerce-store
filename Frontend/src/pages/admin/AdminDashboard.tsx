import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-blue-500 text-white p-4 rounded shadow">
          Manage Products
        </Link>
        <Link to="/admin/orders" className="bg-green-500 text-white p-4 rounded shadow">
          Manage Orders
        </Link>
        <Link to="/admin/users" className="bg-red-500 text-white p-4 rounded shadow">
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
