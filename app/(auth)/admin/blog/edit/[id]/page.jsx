"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, Trash2, FileText, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/text-editor/Tiptap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ Fetch single blog
async function fetchBlog(id) {
  const res = await fetch(`/api/blog/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

// ✅ Blog edit form (isolated inside Suspense)
function BlogEditForm({ id }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: blog } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id),
    suspense: true,
  });

  const [title, setTitle] = useState(blog.title || "");
  const [author, setAuthor] = useState(blog.author || "");
  const [date, setDate] = useState(blog.date?.slice(0, 10) || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(blog.image || null);
  const [content, setContent] = useState(blog.content || "");

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update blog");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      queryClient.invalidateQueries(["blog", id]);
      router.push("/admin/blog/all");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("content", content);
    if (image) formData.append("image", image);

    updateMutation.mutate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ✏️ Edit Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileText size={16} /> Blog Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter blog title..."
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <User size={16} /> Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Author name..."
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar size={16} /> Publish Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Cover Image
          </label>
          {preview ? (
            <div className="relative w-48 h-32">
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-32 object-cover rounded-lg border"
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
            <label className="flex flex-col items-center justify-center w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition">
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

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Content
          </label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Button
            type="submit"
            disabled={updateMutation.isLoading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-lg shadow-md transition"
          >
            {updateMutation.isLoading ? "Updating..." : "Update Blog"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

// ✅ Page wrapper with Suspense
export default function EditBlogPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <Suspense
        fallback={
          <p className="text-center text-gray-500 animate-pulse">
            Loading blog...
          </p>
        }
      >
        <BlogEditForm id={id} />
      </Suspense>
    </div>
  );
}
