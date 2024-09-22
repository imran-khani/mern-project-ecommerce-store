// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetails';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';

// src/App.tsx
import PrivateRoute from './components/PrivateRoute';



const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/products" element={<PrivateRoute adminOnly={true}><ManageProducts /></PrivateRoute>} />
          <Route path="/admin/orders" element={<PrivateRoute adminOnly={true}><ManageOrders /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute adminOnly={true}><ManageUsers /></PrivateRoute>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
