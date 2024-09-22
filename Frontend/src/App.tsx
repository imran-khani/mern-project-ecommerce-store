import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetails';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import PrivateRoute from './components/PrivateRoute';

// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />, // Optional: Layout component if you have a common navbar for all routes
    children: [
      { path: '', element: <Home /> }, // Home route
      { path: 'product/:id', element: <ProductDetail /> }, // Product detail route
      { path: 'cart', element: <Cart /> }, // Cart route
      { path: 'profile', element: <PrivateRoute><Profile /></PrivateRoute> }, // Profile, protected route
      {
        path: 'admin',
        element: <PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>, // Admin dashboard, protected route
      },
      {
        path: 'admin/products',
        element: <PrivateRoute adminOnly><ManageProducts /></PrivateRoute>, // Manage products, protected route
      },
      {
        path: 'admin/orders',
        element: <PrivateRoute adminOnly><ManageOrders /></PrivateRoute>, // Manage orders, protected route
      },
      {
        path: 'admin/users',
        element: <PrivateRoute adminOnly><ManageUsers /></PrivateRoute>, // Manage users, protected route
      },
    ],
  },
]);

// The main App component with RouterProvider
const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
