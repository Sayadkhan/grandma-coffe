

export const fetchCategories =  async function fetchCategories(page, limit) {

  const res = await fetch(`/api/categories?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}




// lib/fetchProduct.js
export async function fetchProduct(page = 1, limit = 10) {
  const res = await fetch(`/api/product?page=${page}&limit=${limit}`, {
    cache: "no-store", 
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
