"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const CategoriesPage = ({ initialData, page, limit }) => {
  const { categories, totalPages } = initialData;
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        queryClient.invalidateQueries(["categories"]);
        router.refresh(); // ✅ refresh server data
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateCategory = async (id, field, value) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: value }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        router.refresh(); // ✅ sync with SSR data
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>New Arrival</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {categories.map((cat, idx) => (
                <motion.tr
                  key={cat._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border-b last:border-0"
                >
                  <TableCell>{(page - 1) * limit + idx + 1}</TableCell>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.desc || "-"}</TableCell>
                  <TableCell>
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                    ) : "—"}
                  </TableCell>
                  <TableCell>{new Date(cat.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={cat.Featured}
                        onCheckedChange={(val) => updateCategory(cat._id, "Featured", val)}
                        className="data-[state=checked]:bg-amber-600"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Switch
                        checked={cat.New_Arrivable}
                        onCheckedChange={(val) => updateCategory(cat._id, "New_Arrivable", val)}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 hover:text-blue-600"
                        onClick={() => router.push(`/admin/category/edit/${cat._id}`)}
                      >
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1 hover:bg-red-700 hover:text-white"
                        onClick={() => handleDelete(cat._id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => router.push(`?page=${page - 1}`)}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => router.push(`?page=${page + 1}`)}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default CategoriesPage;