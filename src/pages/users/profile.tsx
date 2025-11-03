import React, { useState, useEffect, useRef } from 'react';
import { Camera, Globe, Facebook, Instagram, Linkedin, Youtube, Twitter, Loader2 } from 'lucide-react';
import { useUser } from '@/utils/user-context';
import { FALLBACK_USER } from '@/utils/fallback-profile.ts';
import api from '@/services/api';
import {getMe} from "@/services/getMe.ts";

const UserProfilePage = () => {
  const { user: contextUser, saveUser } = useUser();
  const user = contextUser || FALLBACK_USER;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  // Upload Profile Picture
  const handlePhotoClick = () => {
    if (user.id === 'fallback-user') return;
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setSaveError("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveError("Image size should be less than 5MB")
      return
    }

    setIsUploadingPhoto(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      console.log("📤 Uploading profile picture...")

      // === Upload ke backend ===
      const response = await api.put("/users/me/profile-picture", file, {
        headers: { "Content-Type": file.type },
      })

      if (response.status === 200) {
        console.log("✅ Upload success, refreshing user data...")

        const refreshedUser = await getMe()
        if (refreshedUser) {
          const originalUrl =
            refreshedUser.profilePictures?.[0]?.url ||
            response.data?.profilePictureUrl

          if (originalUrl) {
            const newUrl = `${originalUrl}?t=${Date.now()}`
            refreshedUser.profilePictures = [
              { url: newUrl, width: 400, height: 400 },
            ]
          }

          // Simpan ke context → foto langsung berubah di UI
          saveUser(refreshedUser)
          console.log("🔁 User data updated in context after photo upload")
        }

        // Notifikasi sukses
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        throw new Error("Failed to upload profile picture")
      }
    } catch (error: any) {
      console.error("❌ Profile picture upload failed:", error)
      setSaveError(
        error.response?.data?.message ||
        "Failed to upload profile picture. Please try again."
      )
    } finally {
      setIsUploadingPhoto(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }


  // Save Profile Data
  const handleSave = async () => {
    if (user.id === 'fallback-user') return

    setIsSaving(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      // Daftar field yang bisa diedit
      const editableFields = [
        'firstName',
        'lastName',
        'headline',
        'biography',
        'websiteUrl',
        'facebookUrl',
        'instagramUrl',
        'linkedinUrl',
        'xUrl',
        'youtubeUrl',
        'tiktokUrl',
      ]

      const payload: Record<string, string | null> = {}

      editableFields.forEach((field) => {
        const original = user[field] ?? ''
        const updated = formData[field] ?? ''

        if (original !== updated) {
          payload[field] = updated === '' ? null : updated
        }
      })

      if (Object.keys(payload).length === 0) {
        console.log('⚪ Tidak ada perubahan, skip request')
        setIsEditing(false)
        setIsSaving(false)
        return
      }

      console.log('📤 Sending changed fields only:', payload)

      const response = await api.patch('/users/me', payload)

      if (response.status === 200 && response.data) {
        console.log('✅ Profile updated successfully:', response.data)

        saveUser(response.data)
        setIsEditing(false)
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error: any) {
      setSaveError(
        error.response?.data?.message ||
        'Failed to update profile. Please try again.'
      )
    } finally {
      setIsSaving(false)
    }
  }


  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
    setSaveError(null);
  };

  const profilePictureUrl = user.profilePictures?.[0]?.url || "/fallback-avatar.jpg"

  const socialLinks = [
    { name: 'Website', url: user.websiteUrl, icon: Globe },
    { name: 'Facebook', url: user.facebookUrl, icon: Facebook },
    { name: 'Instagram', url: user.instagramUrl, icon: Instagram },
    { name: 'LinkedIn', url: user.linkedinUrl, icon: Linkedin },
    { name: 'X (Twitter)', url: user.xUrl, icon: Twitter },
    { name: 'YouTube', url: user.youtubeUrl, icon: Youtube },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm font-medium">
              ✅ Profile updated successfully!
            </p>
          </div>
        )}

        {/* Error Message */}
        {saveError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-medium">
              ❌ {saveError}
            </p>
          </div>
        )}

        {/* Profile Picture Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col items-center">
            <div
              className={`relative group ${user.id !== 'fallback-user' ? 'cursor-pointer' : ''}`}
              onClick={handlePhotoClick}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100">
                  <img
                    src={profilePictureUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-avatar.jpg"
                    }}
                  />
              </div>


              {/* Hover Overlay */}
              {user.id !== 'fallback-user' && (
                <div className="absolute inset-0 bg-gray-800 bg-opacity-0 group-hover:bg-opacity-60 rounded-full transition-all duration-300 flex items-center justify-center">
                  {isUploadingPhoto ? (
                    <Loader2 className="text-white animate-spin" size={32} />
                  ) : (
                    <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                  )}
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/webp,image/avif,image/jpeg,image/png,image/heic"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            {user.headline && (
              <p className="text-gray-600 text-center mt-1">{user.headline}</p>
            )}

            {user.id !== 'fallback-user' && (
              <p className="text-xs text-gray-400 mt-2">
                Click photo to change
              </p>
            )}
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Informasi Profile</h2>
            {user.id !== 'fallback-user' && (
              !isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSaving && <Loader2 className="animate-spin" size={16} />}
                    {isSaving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              )
            )}
          </div>

          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Depan
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ) : (
                <p className="text-gray-900">{user.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Belakang
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              ) : (
                <p className="text-gray-900">{user.lastName}</p>
              )}
            </div>

            {/* Email - Read Only */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Headline
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="headline"
                  value={formData.headline || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tambahkan headline singkat"
                  maxLength={100}
                />
              ) : (
                <p className="text-gray-900">{user.headline || '-'}</p>
              )}
            </div>

            {/* Biography */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biografi
              </label>
              {isEditing ? (
                <textarea
                  name="biography"
                  value={formData.biography || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ceritakan tentang diri Anda"
                  maxLength={500}
                />
              ) : (
                <p className="text-gray-900 whitespace-pre-wrap">{user.biography || '-'}</p>
              )}
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Media
              </label>
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl || ''}
                    onChange={handleInputChange}
                    placeholder="Website URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="facebookUrl"
                    value={formData.facebookUrl || ''}
                    onChange={handleInputChange}
                    placeholder="Facebook URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="instagramUrl"
                    value={formData.instagramUrl || ''}
                    onChange={handleInputChange}
                    placeholder="Instagram URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl || ''}
                    onChange={handleInputChange}
                    placeholder="LinkedIn URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="xUrl"
                    value={formData.xUrl || ''}
                    onChange={handleInputChange}
                    placeholder="X (Twitter) URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="youtubeUrl"
                    value={formData.youtubeUrl || ''}
                    onChange={handleInputChange}
                    placeholder="YouTube URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="tiktokUrl"
                    value={formData.tiktokUrl || ''}
                    onChange={handleInputChange}
                    placeholder="TikTok URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Icon size={18} className="text-gray-600" />
                          <span className="text-sm text-gray-700">{link.name}</span>
                        </a>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">Tidak ada social media yang ditambahkan</p>
                  )}
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Informasi Akun</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Bahasa:</span>
                  <span className="ml-2 text-gray-900">{user.language}</span>
                </div>
                <div>
                  <span className="text-gray-500">Role:</span>
                  <span className="ml-2 text-gray-900">{user.roles.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-500">Bergabung sejak:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {user.lastLoggedInAt && (
                  <div>
                    <span className="text-gray-500">Terakhir login:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(user.lastLoggedInAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;