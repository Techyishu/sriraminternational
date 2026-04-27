"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Trash2, Mail, Image as ImageIcon, Trophy, Users, Activity, X, Music, FileText, Shield } from "lucide-react";

type Tab = "gallery" | "toppers" | "staff" | "activities" | "contact" | "music" | "slc" | "disclosures";

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<Tab>("gallery");
  
  // Data states
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [toppers, setToppers] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [slcRecords, setSlcRecords] = useState<any[]>([]);
  const [disclosures, setDisclosures] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [musicSettings, setMusicSettings] = useState<any>({
    enabled: false,
    music_url: "",
    image_url: "",
    volume: 0.5,
    loop: true
  });
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicImageFile, setMusicImageFile] = useState<File | null>(null);
  const [musicPreview, setMusicPreview] = useState<string | null>(null);
  const [musicImagePreview, setMusicImagePreview] = useState<string | null>(null);
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Check auth status via httpOnly cookie
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [activeTab, isAuthenticated]);

  const loadData = async () => {
    if (!isAuthenticated) return;
    
    try {
      
      if (activeTab === "gallery") {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setGalleryImages(data.images || []);
      } else if (activeTab === "toppers") {
        const res = await fetch("/api/toppers");
        const data = await res.json();
        setToppers(data.toppers || []);
      } else if (activeTab === "staff") {
        const res = await fetch("/api/staff");
        const data = await res.json();
        setStaff(data.staff || []);
      } else if (activeTab === "activities") {
        const res = await fetch("/api/activities");
        const data = await res.json();
        setActivities(data.activities || []);
      } else if (activeTab === "contact") {
        const res = await fetch("/api/contact/submissions");
        const data = await res.json();
        setContactSubmissions(data.submissions || []);
      } else if (activeTab === "music") {
        const res = await fetch("/api/music");
        const data = await res.json();
        // Ensure all fields have default values to prevent controlled/uncontrolled input issues
        setMusicSettings({
          enabled: data.enabled ?? false,
          music_url: data.music_url ?? "",
          image_url: data.image_url ?? "",
          volume: data.volume ?? 0.5,
          loop: data.loop ?? true
        });
        if (data.image_url) {
          setMusicImagePreview(data.image_url);
        }
      } else if (activeTab === "slc") {
        const res = await fetch("/api/slc");
        const data = await res.json();
        setSlcRecords(data.records || []);
      } else if (activeTab === "disclosures") {
        const res = await fetch("/api/disclosures");
        const data = await res.json();
        setDisclosures(data.disclosures || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Cookie is set automatically by the server (httpOnly)
        setIsAuthenticated(true);
        loadData();
      } else {
        const errorMsg = data.error || "Login failed";
        alert(errorMsg);
        console.error("Login error:", errorMsg);
      }
    } catch (error: any) {
      const errorMsg = error.message || "Login failed. Please check your connection and try again.";
      alert(errorMsg);
      console.error("Login error:", error);
    }
  };

  const handleImageUpload = async (file: File, folder: string): Promise<string | null> => {
    if (!isAuthenticated) return null;

    setUploadingImage(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', folder);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok && uploadData.url) {
        return uploadData.url;
      } else {
        alert(uploadData.error || "Failed to upload image");
        return null;
      }
    } catch (error) {
      alert("Failed to upload image");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, folder: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload an image (PNG, JPEG, GIF, or WEBP)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload image
    const imageUrl = await handleImageUpload(file, folder);
    if (imageUrl) {
      setFormData({ ...formData, image_url: imageUrl, imageFile: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login to add items.");
      return;
    }

    // If there's a file but no URL yet, upload it first
    if (formData.imageFile && !formData.image_url) {
      const folder = activeTab === "gallery" ? "gallery" : 
                     activeTab === "toppers" ? "toppers" :
                     activeTab === "staff" ? "staff" : "activities";
      const imageUrl = await handleImageUpload(formData.imageFile, folder);
      if (!imageUrl) return; // Upload failed
      formData.image_url = imageUrl;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Remove imageFile from formData before sending
      const { imageFile, ...dataToSend } = formData;

      let endpoint = "";
      if (activeTab === "gallery") endpoint = "/api/gallery";
      else if (activeTab === "toppers") endpoint = "/api/toppers";
      else if (activeTab === "staff") endpoint = "/api/staff";
      else if (activeTab === "activities") endpoint = "/api/activities";
      else if (activeTab === "slc") endpoint = "/api/slc";
      else if (activeTab === "disclosures") endpoint = "/api/disclosures";

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Item added successfully!");
        setShowForm(false);
        setFormData({});
        setImagePreview(null);
        loadData();
      } else {
        alert(data.error || "Failed to add item");
      }
    } catch (error) {
      alert("Failed to add item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAuthenticated) {
      alert("Please login to delete items.");
      return;
    }
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      let endpoint = "";

      if (activeTab === "gallery") endpoint = `/api/gallery?id=${id}`;
      else if (activeTab === "toppers") endpoint = `/api/toppers?id=${id}`;
      else if (activeTab === "staff") endpoint = `/api/staff?id=${id}`;
      else if (activeTab === "activities") endpoint = `/api/activities?id=${id}`;
      else if (activeTab === "slc") endpoint = `/api/slc?id=${id}`;
      else if (activeTab === "disclosures") endpoint = `/api/disclosures?id=${id}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        data = { error: "Invalid response from server" };
      }

      if (response.ok) {
        alert("Item deleted successfully!");
        loadData();
      } else {
        if (response.status === 401) {
          setIsAuthenticated(false);
          alert("Your session has expired. Please login again.");
          return;
        }
        alert(data.error || `Failed to delete item (${response.status})`);
      }
    } catch (error) {
      console.error("Delete request error:", error);
      alert("Failed to delete item: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    router.push("/");
  };

  const handleMusicFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/webm', 'audio/m4a', 'audio/aac'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload an audio file (MP3, OGG, WAV, WEBM, M4A, or AAC)');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setMusicFile(file);
    setMusicPreview(URL.createObjectURL(file));
  };

  const handleMusicImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload an image (PNG, JPEG, GIF, or WEBP)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setMusicImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setMusicImageFile(file);
  };

  const saveMusicSettings = async () => {
    if (!isAuthenticated) {
      alert("Please login to save music settings.");
      return;
    }

    try {
      // Upload music file if provided
      if (musicFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', musicFile);
        uploadFormData.append('folder', 'music');
        uploadFormData.append('fileType', 'audio');

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok && uploadData.url) {
          musicSettings.music_url = uploadData.url;
        } else {
          alert(uploadData.error || "Failed to upload music file");
          return;
        }
      }

      // Upload image file if provided
      if (musicImageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', musicImageFile);
        uploadFormData.append('folder', 'music');
        uploadFormData.append('fileType', 'image');

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok && uploadData.url) {
          musicSettings.image_url = uploadData.url;
        } else {
          alert(uploadData.error || "Failed to upload image file");
          return;
        }
      }

      // Save settings
      const response = await fetch("/api/music", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(musicSettings),
      });

      if (response.ok) {
        alert("Music settings saved successfully!");
        setMusicFile(null);
        setMusicImageFile(null);
        loadData(); // Reload to get updated URLs
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save music settings");
      }
    } catch (error) {
      alert("Failed to save music settings");
    }
  };

  const markAsRead = async (id: string) => {
    if (!isAuthenticated) {
      alert("Please login to mark submissions as read.");
      return;
    }

    try {
      const response = await fetch("/api/contact/submissions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, read: true }),
      });

      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#002147] mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#002147] text-white py-3 rounded-lg font-bold hover:bg-[#003370] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#002147] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: "gallery" as Tab, name: "Gallery", icon: ImageIcon },
              { id: "toppers" as Tab, name: "Toppers", icon: Trophy },
              { id: "staff" as Tab, name: "Staff", icon: Users },
              { id: "activities" as Tab, name: "Activities", icon: Activity },
              { id: "contact" as Tab, name: "Contact Forms", icon: Mail },
              { id: "music" as Tab, name: "Music Settings", icon: Music },
              { id: "slc" as Tab, name: "SLC Records", icon: FileText },
              { id: "disclosures" as Tab, name: "Disclosures", icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowForm(false);
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#002147] border-b-2 border-[#002147]"
                    : "text-gray-600 hover:text-[#002147]"
                }`}
              >
                <tab.icon size={20} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Add Button (except for contact and music) */}
          {activeTab !== "contact" && activeTab !== "music" && (
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#002147]">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h2>
              <button
                    onClick={() => {
                      setShowForm(true);
                      setFormData({});
                      setImagePreview(null);
                    }}
                className="flex items-center gap-2 px-4 py-2 bg-[#FEC301] text-[#002147] rounded-lg font-bold hover:bg-[#002147] hover:text-white transition-colors"
              >
                <Plus size={20} />
                Add New
              </button>
            </div>
          )}

          {/* Form Modal */}
          {showForm && activeTab !== "contact" && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#002147]">
                    Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).slice(0, -1)}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormData({});
                      setImagePreview(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {activeTab === "gallery" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Image *
                        </label>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
                          required
                          onChange={(e) => handleFileChange(e, "gallery")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#002147] file:text-white hover:file:bg-[#003370]"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supported: PNG, JPEG, GIF, WEBP, SVG (Max 5MB)
                        </p>
                        {imagePreview && (
                          <div className="mt-4">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                        {formData.image_url && !imagePreview && (
                          <div className="mt-4">
                            <img
                              src={formData.image_url}
                              alt="Current"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={formData.alt_text || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, alt_text: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                          placeholder="Description of the image"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === "toppers" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Class
                          </label>
                          <input
                            type="text"
                            value={formData.class || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, class: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Percentage
                          </label>
                          <input
                            type="text"
                            value={formData.percentage || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, percentage: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year
                        </label>
                        <input
                          type="text"
                          value={formData.year || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, year: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Achievement
                        </label>
                        <textarea
                          value={formData.achievement || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, achievement: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Image (Optional)
                        </label>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
                          onChange={(e) => handleFileChange(e, "toppers")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#002147] file:text-white hover:file:bg-[#003370]"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supported: PNG, JPEG, GIF, WEBP, SVG (Max 5MB)
                        </p>
                        {imagePreview && (
                          <div className="mt-4">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                        {formData.image_url && !imagePreview && (
                          <div className="mt-4">
                            <img
                              src={formData.image_url}
                              alt="Current"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {activeTab === "staff" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Designation
                        </label>
                        <input
                          type="text"
                          value={formData.designation || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, designation: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Qualification
                        </label>
                        <input
                          type="text"
                          value={formData.qualification || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, qualification: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience
                        </label>
                        <input
                          type="text"
                          value={formData.experience || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, experience: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={formData.bio || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Image (Optional)
                        </label>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
                          onChange={(e) => handleFileChange(e, "staff")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#002147] file:text-white hover:file:bg-[#003370]"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supported: PNG, JPEG, GIF, WEBP, SVG (Max 5MB)
                        </p>
                        {imagePreview && (
                          <div className="mt-4">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                        {formData.image_url && !imagePreview && (
                          <div className="mt-4">
                            <img
                              src={formData.image_url}
                              alt="Current"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {activeTab === "activities" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={formData.description || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Icon (Emoji)
                        </label>
                        <input
                          type="text"
                          value={formData.icon || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, icon: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                          placeholder="🏆"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={formData.image_url || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, image_url: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === "slc" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                        <input type="text" required value={formData.student_name || ""} onChange={(e) => setFormData({ ...formData, student_name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Father&apos;s Name</label>
                        <input type="text" value={formData.father_name || ""} onChange={(e) => setFormData({ ...formData, father_name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                          <input type="text" value={formData.class || ""} onChange={(e) => setFormData({ ...formData, class: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                          <input type="text" value={formData.section || ""} onChange={(e) => setFormData({ ...formData, section: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Admission No</label>
                          <input type="text" value={formData.admission_no || ""} onChange={(e) => setFormData({ ...formData, admission_no: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">SLC No</label>
                          <input type="text" value={formData.slc_no || ""} onChange={(e) => setFormData({ ...formData, slc_no: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Issue</label>
                          <input type="text" value={formData.date_of_issue || ""} onChange={(e) => setFormData({ ...formData, date_of_issue: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" placeholder="DD/MM/YYYY" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                          <input type="text" value={formData.academic_year || ""} onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" placeholder="2024-2025" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                        <input type="text" value={formData.reason || ""} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                        <textarea value={formData.remarks || ""} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" rows={2} />
                      </div>
                    </>
                  )}

                  {activeTab === "disclosures" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                        <select required value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] bg-white">
                          <option value="">Select Category</option>
                          <option value="General Information">General Information</option>
                          <option value="School Infrastructure">School Infrastructure</option>
                          <option value="Teaching Staff">Teaching Staff</option>
                          <option value="Academics">Academics</option>
                          <option value="Fee Structure">Fee Structure</option>
                          <option value="Recognition & Affiliation">Recognition & Affiliation</option>
                          <option value="Contact Details">Contact Details</option>
                          <option value="Results">Results</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input type="text" required value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" placeholder="e.g. School Name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Value *</label>
                        <textarea required value={formData.value || ""} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]" rows={3} placeholder="e.g. S.R. International School" />
                      </div>
                    </>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploadingImage}
                      className="flex-1 bg-[#002147] text-white py-3 rounded-lg font-bold hover:bg-[#003370] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploadingImage ? "Uploading..." : "Add Item"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({});
                        setImagePreview(null);
                      }}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* List Items */}
          <div className="space-y-4">
            {activeTab === "gallery" &&
              galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text || "Gallery"}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{image.alt_text || "No alt text"}</p>
                    <p className="text-sm text-gray-500">{image.image_url}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

            {activeTab === "toppers" &&
              toppers.map((topper) => (
                <div
                  key={topper.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  {topper.image_url && (
                    <img
                      src={topper.image_url}
                      alt={topper.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-lg">{topper.name}</p>
                    <p className="text-sm text-gray-600">
                      {topper.class} - {topper.percentage}% ({topper.year})
                    </p>
                    {topper.achievement && (
                      <p className="text-sm text-gray-500 mt-1">{topper.achievement}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(topper.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

            {activeTab === "staff" &&
              staff.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  {member.image_url && (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-lg">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.designation}</p>
                    {member.qualification && (
                      <p className="text-sm text-gray-500">{member.qualification}</p>
                    )}
                    {member.email && (
                      <p className="text-sm text-blue-600">{member.email}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

            {activeTab === "activities" &&
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="text-4xl">{activity.icon || "📋"}</div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{activity.title}</p>
                    {activity.description && (
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

            {activeTab === "slc" &&
              slcRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{record.student_name}</p>
                    <p className="text-sm text-gray-600">
                      {record.class && `Class ${record.class}`}{record.section && ` - ${record.section}`}
                      {record.admission_no && ` | Adm: ${record.admission_no}`}
                      {record.slc_no && ` | SLC: ${record.slc_no}`}
                    </p>
                    {record.father_name && (
                      <p className="text-sm text-gray-500">Father: {record.father_name}</p>
                    )}
                    {record.date_of_issue && (
                      <p className="text-xs text-gray-400 mt-1">Issued: {record.date_of_issue}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

            {activeTab === "disclosures" &&
              disclosures.map((disclosure) => (
                <div
                  key={disclosure.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                    <Shield size={20} className="text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{disclosure.category}</p>
                    <p className="font-bold text-gray-900">{disclosure.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{disclosure.value}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(disclosure.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

            {activeTab === "contact" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#002147] mb-4">
                  Contact Form Submissions
                </h2>
                {contactSubmissions.length === 0 ? (
                  <p className="text-gray-500">No submissions yet.</p>
                ) : (
                  contactSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className={`p-6 border rounded-lg ${
                        submission.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-bold text-lg">{submission.name}</p>
                          <p className="text-sm text-gray-600">{submission.email}</p>
                          {submission.subject && (
                            <p className="text-sm font-medium mt-1">{submission.subject}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </p>
                          {!submission.read && (
                            <button
                              onClick={() => markAsRead(submission.id)}
                              className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{submission.message}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Music Settings */}
            {activeTab === "music" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#002147] mb-6">
                    Background Music Settings
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Configure background music that will play when visitors enter your website. 
                    A welcome screen will appear for first-time visitors to enable music playback.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="music-enabled"
                      checked={musicSettings.enabled ?? false}
                      onChange={(e) =>
                        setMusicSettings({ ...musicSettings, enabled: e.target.checked })
                      }
                      className="w-5 h-5 text-[#002147] rounded focus:ring-[#002147]"
                    />
                    <label htmlFor="music-enabled" className="text-lg font-medium text-gray-900">
                      Enable Background Music
                    </label>
                  </div>

                  {musicSettings.enabled && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Music File *
                        </label>
                        <input
                          type="file"
                          accept="audio/mpeg,audio/mp3,audio/ogg,audio/wav,audio/webm,audio/m4a,audio/aac"
                          onChange={handleMusicFileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#002147] file:text-white hover:file:bg-[#003370]"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Supported: MP3, OGG, WAV, WEBM, M4A, AAC (Max 10MB)
                        </p>
                        {musicPreview && (
                          <div className="mt-4">
                            <audio controls src={musicPreview} className="w-full">
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        )}
                        {musicSettings.music_url && !musicPreview && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Current Music:</p>
                            <audio controls src={musicSettings.music_url} className="w-full">
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Music Cover Image (Optional)
                        </label>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
                          onChange={handleMusicImageFileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#002147] file:text-white hover:file:bg-[#003370]"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Supported: PNG, JPEG, GIF, WEBP, SVG (Max 5MB)
                        </p>
                        {musicImagePreview && (
                          <div className="mt-4">
                            <img
                              src={musicImagePreview}
                              alt="Music cover preview"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                        {musicSettings.image_url && !musicImagePreview && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Current Cover Image:</p>
                            <img
                              src={musicSettings.image_url}
                              alt="Music cover"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Volume: {Math.round(musicSettings.volume * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={musicSettings.volume ?? 0.5}
                          onChange={(e) =>
                            setMusicSettings({
                              ...musicSettings,
                              volume: parseFloat(e.target.value),
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          id="music-loop"
                          checked={musicSettings.loop ?? true}
                          onChange={(e) =>
                            setMusicSettings({ ...musicSettings, loop: e.target.checked })
                          }
                          className="w-5 h-5 text-[#002147] rounded focus:ring-[#002147]"
                        />
                        <label htmlFor="music-loop" className="text-lg font-medium text-gray-900">
                          Loop Music
                        </label>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Browsers require user interaction before playing audio. 
                          First-time visitors will see a welcome screen with an "Enter Website" button. 
                          After clicking, the music will start playing. Returning visitors will have 
                          music auto-play if they've previously interacted with the site.
                        </p>
                      </div>
                    </>
                  )}

                  <button
                    onClick={saveMusicSettings}
                    className="w-full bg-[#002147] text-white py-3 rounded-lg font-bold hover:bg-[#003370] transition-colors"
                  >
                    Save Music Settings
                  </button>
                </div>
              </div>
            )}

            {/* Empty states */}
            {activeTab !== "contact" &&
              activeTab !== "music" &&
              ((activeTab === "gallery" && galleryImages.length === 0) ||
                (activeTab === "toppers" && toppers.length === 0) ||
                (activeTab === "staff" && staff.length === 0) ||
                (activeTab === "activities" && activities.length === 0) ||
                (activeTab === "slc" && slcRecords.length === 0) ||
                (activeTab === "disclosures" && disclosures.length === 0)) && (
                <div className="text-center py-12 text-gray-500">
                  <p>No items yet. Click "Add New" to get started.</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
