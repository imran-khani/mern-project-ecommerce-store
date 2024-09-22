// src/pages/admin/ManageOrders.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '../../types';

const ManageOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/admin/orders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Order ID</th>
            <th className="py-2">User</th>
            <th className="py-2">Total Price</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2">{order._id}</td>
              <td className="py-2">{order.user.name}</td>
              <td className="py-2">${order.totalPrice.toFixed(2)}</td>
              <td className="py-2">{order.orderStatus}</td>
              <td className="py-2">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
