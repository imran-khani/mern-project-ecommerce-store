import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const response = await axios.get<Product[]>('http://localhost:5000/api/products');
        console.log('Products fetched:', response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (axios.isAxiosError(err)) {
          setError(`Failed to fetch products: ${err.message}`);
        } else {
          setError('An unexpected error occurred');
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home">
      <h1>Our Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
