"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import imageCompression from "browser-image-compression";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "@/utils/api";
import RichTextEditor from "@/components/text-editor/Tiptap";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [variants, setVariants] = useState([]); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;
  const queryClient = useQueryClient();

  // ✅ Fetch categories
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["categories", page],
    queryFn: () => fetchCategories(page, limit),
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });

  // ✅ Mutation for adding product
  const addProductMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("/api/product", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add product");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  // Auto-generate slug
  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  }, [name]);

  // ✅ Handle image upload + compression
  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    for (let file of selectedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`❌ ${file.name} is larger than 10MB.`);
        continue;
      }

      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);

        setImages((prev) => [...prev, compressedFile]);
        setPreviewImages((prev) => [...prev, URL.createObjectURL(compressedFile)]);
      } catch (err) {
        console.error("Image compression error:", err);
      }
    }
  };

  // ✅ Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Variants functions
  const addVariant = () => {
    setVariants([...variants, { packetSize: "", price: "", stock: "" }]);
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

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

    // ✅ Add variants as JSON
    if (variants.length > 0) {
      formData.append("variants", JSON.stringify(variants));
    }

    images.forEach((file) => formData.append("images", file));

    addProductMutation.mutate(formData, {
      onSuccess: () => {
        alert("✅ Product added successfully!");
        resetForm();
        setLoading(false);
      },
      onError: (err) => {
        alert("❌ " + err.message);
        setLoading(false);
      },
    });
  };


  const resetForm = () => {
    setName("");
    setSlug("");
    setShortDesc("");
    setDesc("");
    setPrice("");
    setStock("");
    setDiscount("");
    setDiscountType("percentage");
    setCategory("");
    setTags("");
    setImages([]);
    setPreviewImages([]);
    setVariants([]);
  };

  return (
    <form    
    id="product-form"
    onSubmit={handleSubmit}
    className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <div className="flex ">
              <Button
              type="submit"
              disabled={loading}
              className=" bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
              >
                    {loading ? "Adding..." : "Add Product"}
              </Button>
              <Button variant="outline" type="button">
                Save Draft
              </Button>
          </div>
        </div>

        {/* Form */}
        <div
       
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* LEFT COLUMN */}
          <div className="col-span-2 space-y-6">
            <div className="bg-gray-50 p-5 rounded-xl border">
              <h2 className="text-lg font-semibold mb-4">General Information</h2>

              <FormInput label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />

              <FormSelect
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={data?.categories || []}
                loading={isLoading}
                error={isError}
                loadMore={() => setPage((prev) => prev + 1)}
                canLoadMore={data?.categories?.length >= limit}
                fetching={isFetching}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <FormInput label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
              </div>

              <FormTextArea label="Short Description" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} rows={2} />

              {/* Full Description */}
              <div className="mb-3">
                <label className="text-sm font-semibold mb-2 block">Full Description</label>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <RichTextEditor content={desc} onChange={setDesc} />
                </motion.div>
              </div>
            </div>

    
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

                    {/* ✅ Variants Section */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <h2 className="text-lg font-semibold mb-4">Product Variants (Packet Sizes)</h2>
              {variants.map((variant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-4 items-end mb-3"
                >
                  <FormInput
                    label="Packet Size"
                    value={variant.packetSize}
                    onChange={(e) => updateVariant(index, "packetSize", e.target.value)}
                    placeholder="e.g., 250g"
                  />
                  <FormInput
                    label="Price"
                    type="number"
                    value={variant.price}
                    onChange={(e) => updateVariant(index, "price", e.target.value)}
                  />
                  <FormInput
                    label="Stock"
                    type="number"
                    value={variant.stock}
                    onChange={(e) => updateVariant(index, "stock", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeVariant(index)}
                    className="col-span-3 mt-2"
                  >
                    <Trash2 size={16} className="mr-2" /> Remove
                  </Button>
                </motion.div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addVariant}
                className="w-full"
              >
                <Plus size={16} className="mr-2" /> Add Variant
              </Button>
            </div>
            {/* Images */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
              <div className="grid grid-cols-3 gap-3">
                {previewImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} alt="preview" className="w-24 h-24 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition">
                  <Plus size={20} className="text-gray-400" />
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <h2 className="text-lg font-semibold mb-4">SEO</h2>
              <FormInput label="Product Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
              <FormInput label="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
          </div>
        </div>
      </motion.div>
    </form>
  );
};

/* ---------- Small Reusable Form Components ---------- */
const FormInput = ({ label, ...props }) => (
  <div className="mb-3">
    <label className="text-sm font-semibold mb-2 block">{label}</label>
    <input {...props} className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-amber-500" />
  </div>
);

const FormTextArea = ({ label, rows = 3, ...props }) => (
  <div className="mb-3">
    <label className="text-sm font-semibold mb-2 block">{label}</label>
    <textarea
      rows={rows}
      {...props}
      className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-amber-500 resize-none"
    />
  </div>
);

const FormSelect = ({ label, value, onChange, options, loading, error, loadMore, canLoadMore, fetching }) => (
  <div className="mb-3">
    <label className="text-sm font-semibold mb-2 block">{label}</label>
    <select value={value} onChange={onChange} className="w-full rounded-lg border p-3 mb-3">
      <option value="">Select Category</option>
      {loading && <option>Loading categories...</option>}
      {error && <option>Error loading categories</option>}
      {options.map((cat) => (
        <option key={cat._id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
    {canLoadMore && (
      <Button
        type="button"
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
        onClick={loadMore}
        disabled={fetching}
      >
        {fetching ? "Loading..." : "Load More Categories"}
      </Button>
    )}
  </div>
);

export default AddProductPage;
