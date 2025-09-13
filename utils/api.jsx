

export const fetchCategories =  async function fetchCategories(page, limit) {

  const res = await fetch(`/api/categories?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}


export const fetchProduct = async function fetchProducts(page, limit) {
  const res = await fetch(`/api/product?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
