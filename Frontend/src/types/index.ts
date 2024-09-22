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