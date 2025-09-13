"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Upload, Trash2, Star, Loader2 } from "lucide-react";
import { setCustomer } from "@/redux/slice/customerSlice";

const SettingsPage = () => {
  const user = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  // Initialize state from user
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setMobile(user.mobile || "");
      setAddresses(user.addresses || []);
    }
  }, [user]);

  // Profile image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  // Add new address
  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city) return;

    const updatedAddresses = [...addresses, newAddress];
    if (!updatedAddresses.some((addr) => addr.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }

    setAddresses(updatedAddresses);
    setNewAddress({
      label: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false,
    });
  };

  // Remove address
  const handleRemoveAddress = (index) => {
    setAddresses((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      if (!filtered.some((addr) => addr.isDefault) && filtered.length > 0) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  // Set primary address
  const handleSetPrimaryImmediate = async (index) => {
    if (!user?._id) return;

    try {
      const selectedAddress = addresses[index];
      const formData = new FormData();
      formData.append("setPrimary", selectedAddress._id || selectedAddress.id);

      const res = await fetch(`/api/user/${user._id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update primary address");

      const updatedUser = data.customer;

      // Update Redux & sessionStorage
      dispatch(setCustomer(updatedUser));
      sessionStorage.setItem(
        "customerAuth",
        JSON.stringify({ accessToken: updatedUser.accessToken || user.accessToken, customer: updatedUser })
      );

      // Update local state
      setAddresses(updatedUser.addresses || []);
    } catch (error) {
      console.error("Error setting primary address:", error);
      alert(error.message);
    }
  };

  // Save profile updates
  const handleSave = async () => {
    if (!user?._id) return;

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("addresses", JSON.stringify(addresses));
      if (profileImage) formData.append("profileImage", profileImage);

      const res = await fetch(`/api/user/${user._id}`, { method: "PATCH", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      const updatedUser = data.customer;

      // Update Redux & sessionStorage
      dispatch(setCustomer(updatedUser));
      sessionStorage.setItem(
        "customerAuth",
        JSON.stringify({ accessToken: updatedUser.accessToken || user.accessToken, customer: updatedUser })
      );

      // Update local state
      setName(updatedUser.name || "");
      setMobile(updatedUser.mobile || "");
      setAddresses(updatedUser.addresses || []);
      setProfileImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto px-4 space-y-10">
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Account Settings
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Profile Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="shadow-md border border-gray-100 rounded-2xl py-9">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-28 h-28 rounded-full ring-2 ring-amber-400 overflow-hidden group">
                  {profileImage ? (
                    <img src={URL.createObjectURL(profileImage)} alt="Profile" className="object-cover w-full h-full" />
                  ) : user?.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Upload className="text-gray-400 w-8 h-8" />
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm cursor-pointer">
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 mt-1" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <Input value={email} disabled className="h-11 mt-1 bg-gray-100 cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Mobile</label>
                  <Input value={mobile} onChange={(e) => setMobile(e.target.value)} className="h-11 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Address Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="shadow-md border border-gray-100 rounded-2xl py-9">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((addr, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">
                          {addr.label || "Address"}{" "}
                          {addr.isDefault && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">Primary</span>}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.street}, {addr.city}, {addr.state}, {addr.postalCode}, {addr.country}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant={addr.isDefault ? "secondary" : "outline"} onClick={() => handleSetPrimaryImmediate(i)} className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Primary
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveAddress(i)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center">No addresses yet. Add one below.</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Label (Home, Work)", "Street", "City", "State", "Postal Code", "Country"].map((placeholder, idx) => (
                  <Input
                    key={idx}
                    placeholder={placeholder}
                    value={
                      idx === 0
                        ? newAddress.label
                        : idx === 1
                        ? newAddress.street
                        : idx === 2
                        ? newAddress.city
                        : idx === 3
                        ? newAddress.state
                        : idx === 4
                        ? newAddress.postalCode
                        : newAddress.country
                    }
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, [idx === 0 ? "label" : idx === 1 ? "street" : idx === 2 ? "city" : idx === 3 ? "state" : idx === 4 ? "postalCode" : "country"]: e.target.value })
                    }
                  />
                ))}
              </div>
              <Button onClick={handleAddAddress} className="w-full">
                + Add Address
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end sticky bottom-4">
        <Button onClick={handleSave} size="lg" className="px-8" disabled={isSaving}>
          {isSaving ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
