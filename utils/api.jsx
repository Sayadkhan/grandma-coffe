// utils/api.js

// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const fetchCategories = async function fetchCategories(page = 1, limit = 10) {
  const res = await fetch(`${baseUrl}/api/categories?page=${page}&limit=${limit}`, {
    cache: "no-store", 
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

// lib/fetchProduct.js
export async function fetchProduct(page = 1, limit = 10) {
  const res = await fetch(`${baseUrl}/api/product?page=${page}&limit=${limit}`, {
    cache: "no-store", 
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}


export const featchAllCategory = async function featchAllCategory() {
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store", 
  })
  if (!res.ok) throw new Error("Failed to fetch All categories");
  return res.json();
}