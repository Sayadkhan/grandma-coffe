
"use client";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBlogs } from "@/hooks/useBlog";


const BlogGrid = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  // ✅ Safe default
  const { data: blogs = [] } = useBlogs();

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      setDeletingId(id);
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["blogs"], (old) =>
        old ? old.filter((b) => b._id !== id) : []
      );
      setDeletingId(null);
    },
    onError: () => setDeletingId(null),
  });

  return (
    <AnimatePresence>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogs.map((blog, index) => {
          const cleanContent = blog.content?.replace(/<[^>]+>/g, "") || "";
          const preview =
            cleanContent.length > 120
              ? cleanContent.slice(0, 120) + "..."
              : cleanContent;

          return (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                delay: Math.min(index * 0.1, 0.5),
                duration: 0.4,
              }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group"
            >
              {/* Image */}
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover object-center"
                />
              )}

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={() => router.push(`/admin/blog/edit/${blog._id}`)}
                  className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1"
                >
                  <Edit2 size={16} /> Edit
                </Button>
                <Button
                  onClick={() =>
                    confirm("Delete this blog?") &&
                    deleteMutation.mutate(blog._id)
                  }
                  disabled={deletingId === blog._id}
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                >
                  <Trash2 size={16} />{" "}
                  {deletingId === blog._id ? "Deleting..." : "Delete"}
                </Button>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {preview}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                  <span className="flex items-center gap-1">
                    <User size={14} /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />{" "}
                    {new Date(blog.date).toDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
}

export default BlogGrid









