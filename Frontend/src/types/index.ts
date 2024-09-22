// src/types/index.ts

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  }  

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  products: {
    product: string;
    quantity: number;
  }[];
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
}
