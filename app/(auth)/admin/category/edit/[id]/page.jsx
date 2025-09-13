"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [featured, setFeatured] = useState(false);
  const [newArrivable, setNewArrivable] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch category details
  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`/api/categories/${id}`);
        const data = await res.json();
        if (res.ok) {
          setName(data.name);
          setDesc(data.desc || "");
          setFeatured(data.Featured || false);
          setNewArrivable(data.New_Arrivable || false);
          setPreview(data.image || "");
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (id) fetchCategory();
  }, [id]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("Featured", featured);
      formData.append("New_Arrivable", newArrivable);
      if (image) formData.append("image", image);

      const res = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Category updated successfully!");
        router.push("/admin/category/all");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Espresso"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="3"
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="Write a short description..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>
            {preview ? (
              <div className="relative w-32 h-32">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition">
                <Upload className="text-gray-400" size={24} />
                <span className="text-xs text-gray-500 mt-1">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Extra Options */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newArrivable}
                onChange={(e) => setNewArrivable(e.target.checked)}
              />
              New Arrivable
            </label>
          </div>

          {/* Submit */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-lg shadow-md transition"
            >
              {loading ? "Updating..." : "Update Category"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
