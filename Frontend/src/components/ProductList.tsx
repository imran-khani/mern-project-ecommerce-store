import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return <div className="text-center py-8 text-red-500">Error: Unable to display products</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link to={`/product/${product._id}`}>
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-2">${product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
