import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../types';

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/admin/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Manage Products</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Stock</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2">{product.name}</td>
              <td className="py-2">${product.price.toFixed(2)}</td>
              <td className="py-2">{product.stock}</td>
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

export default ManageProducts;
