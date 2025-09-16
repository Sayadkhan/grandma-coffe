"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import imageCompression from "browser-image-compression";
import RichTextEditor from "@/components/text-editor/Tiptap";

export default function ProductEditForm({ productData, categories }) {

  
  const router = useRouter();

  const [name, setName] = useState(productData.name || "");
  const [slug, setSlug] = useState(productData.slug || "");
  const [shortDesc, setShortDesc] = useState(productData.shortDesc || "");
  const [desc, setDesc] = useState(productData.desc || "");
  const [price, setPrice] = useState(productData.price || "");
  const [stock, setStock] = useState(productData.stock || "");
  const [discount, setDiscount] = useState(productData.discount || "");
  const [discountType, setDiscountType] = useState(productData.discountType || "percentage");
  const [category, setCategory] = useState(productData.category || "");

  const [tags, setTags] = useState(productData.tags?.join(",") || "");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState(productData.images || []);
  const [variants, setVariants] = useState(productData.variants || []);
  const [loading, setLoading] = useState(false);

  // Auto-generate slug
  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  }, [name]);

  // Image upload
  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    for (let file of selectedFiles) {
      if (file.size > 10 * 1024 * 1024) continue;
      const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
      setImages((prev) => [...prev, compressedFile]);
      setPreviewImages((prev) => [...prev, URL.createObjectURL(compressedFile)]);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Variants handlers
  const addVariant = () => setVariants([...variants, { packetSize: "", price: "", stock: "" }]);
  const updateVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };
  const removeVariant = (index) => setVariants(variants.filter((_, i) => i !== index));

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("shortDesc", shortDesc);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("discount", discount);
      formData.append("discountType", discountType);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("variants", JSON.stringify(variants));
      images.forEach((file) => formData.append("images", file));

      const res = await fetch(`/api/product/${productData._id}`, { method: "PATCH", body: formData });
      if (res.ok) router.push("/admin/product/all");
      else alert("Failed to update product");
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-amber-50 to-white">
      <div className="w-full mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="col-span-2 space-y-6">
            <FormInput label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <FormSelect label="Category" value={category} onChange={(e) => setCategory(e.target.value)}   
              options={
              categories.some((c) => c.name === category)
              ? categories.map(c => ({ _id: c.name, name: c.name })) 
              : [{ _id: category, name: category || "Current Category" }, ...categories.map(c => ({ _id: c.name, name: c.name }))]
              } 
  />
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              <FormInput label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
            <FormTextArea label="Short Description" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} rows={2} />
            <div className="mb-3">
              <label className="text-sm font-semibold mb-2 block">Full Description</label>
              <RichTextEditor content={desc} onChange={setDesc} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Variants */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <h2 className="text-lg font-semibold mb-4">Product Variants</h2>
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 items-end mb-3">
                  <FormInput label="Packet Size" value={v.packetSize} onChange={(e) => updateVariant(i, "packetSize", e.target.value)} placeholder="e.g., 250g" />
                  <FormInput label="Price" type="number" value={v.price} onChange={(e) => updateVariant(i, "price", e.target.value)} />
                  <FormInput label="Stock" type="number" value={v.stock} onChange={(e) => updateVariant(i, "stock", e.target.value)} />
                  <Button type="button" variant="destructive" onClick={() => removeVariant(i)} className="col-span-3 mt-2"><Trash2 size={16} /> Remove</Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addVariant} className="w-full"><Plus size={16} /> Add Variant</Button>
            </div>

            {/* Images */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
              <div className="grid grid-cols-3 gap-3">
                {previewImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} className="w-24 h-24 object-cover rounded-lg border" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><Trash2 size={14} /></button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-amber-500 transition">
                  <Plus size={20} className="text-gray-400" />
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <h2 className="text-lg font-semibold mb-4">SEO</h2>
              <FormInput label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
              <FormInput label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>

            <Button type="submit" disabled={loading} className="w-full">{loading ? "Updating..." : "Update Product"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable Form Components ---------- */
const FormInput = ({ label, ...props }) => (
  <div className="mb-3">
    <label className="text-sm font-semibold mb-2 block">{label}</label>
    <input {...props} className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-amber-500" />
  </div>
);

const FormTextArea = ({ label, rows = 3, ...props }) => (
  <div className="mb-3">
    <label className="text-sm font-semibold mb-2 block">{label}</label>
    <textarea rows={rows} {...props} className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-amber-500 resize-none" />
  </div>
);

const FormSelect = ({ label, value, onChange, options }) => (
  <div className="mb-3">
    <label className="text-sm font-semibold mb-2 block">{label}</label>
    <select value={value || ""} onChange={onChange} className="w-full rounded-lg border p-3">
      {options.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
    </select>
  </div>
);
