import React, { useState, useEffect, useRef } from 'react';
import { Camera, Globe, Facebook, Instagram, Linkedin, Youtube, Twitter, Loader2 } from 'lucide-react';
import { useUser } from '@/utils/user-context.tsx';
import { FALLBACK_USER } from '@/utils/fallbackProfile.ts';
import api from '@/services/api.ts';
import { getMe } from "@/services/getMe.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const UserProfilePage = () => {
  const { user: contextUser, saveUser } = useUser();
  const user = contextUser || FALLBACK_USER;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Alert Dialog states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoClick = () => {
    if (user.id === 'fallback-user') return;
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showAlert('error', 'Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showAlert('error', 'Image size should be less than 5MB');
      return;
    }

    setIsUploadingPhoto(true);

    try {
      const response = await api.put("/users/me/profile-picture", file, {
        headers: { "Content-Type": file.type },
      });

      if (response.status === 200) {
        const refreshedUser = await getMe();
        if (refreshedUser) {
          const originalUrl =
            refreshedUser.profilePictures?.[0]?.url ||
            response.data?.profilePictureUrl;

          if (originalUrl) {
            const newUrl = `${originalUrl}?t=${Date.now()}`;
            refreshedUser.profilePictures = [
              { url: newUrl, width: 400, height: 400 },
            ];
          }

          saveUser(refreshedUser);
        }

        showAlert('success', 'Profile picture updated successfully!');
      } else {
        throw new Error("Failed to upload profile picture");
      }
    } catch (error: any) {
      showAlert(
        'error',
        error.response?.data?.message ||
        "Failed to upload profile picture. Please try again."
      );
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (user.id === 'fallback-user') return;

    setIsSaving(true);

    try {
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
      ];

      const payload: Record<string, string | null> = {};

      editableFields.forEach((field) => {
        const original = (user as any)[field] ?? '';
        const updated = (formData as any)[field] ?? '';

        if (original !== updated) {
          payload[field] = updated === '' ? null : updated;
        }
      });

      if (Object.keys(payload).length === 0) {
        setIsEditing(false);
        setIsSaving(false);
        return;
      }

      const response = await api.patch('/users/me', payload);

      if (response.status === 200 && response.data) {
        saveUser(response.data);
        setIsEditing(false);
        showAlert('success', 'Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error: any) {
      showAlert(
        'error',
        error.response?.data?.message ||
        'Failed to update profile. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  const profilePictureUrl = user.profilePictures?.[0]?.url || "/fallback-avatar.jpg";

  const socialLinks = [
    { name: 'Website', url: user.websiteUrl, icon: Globe },
    { name: 'Facebook', url: user.facebookUrl, icon: Facebook },
    { name: 'Instagram', url: user.instagramUrl, icon: Instagram },
    { name: 'LinkedIn', url: user.linkedinUrl, icon: Linkedin },
    { name: 'X (Twitter)', url: user.xUrl, icon: Twitter },
    { name: 'YouTube', url: user.youtubeUrl, icon: Youtube },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Alert Dialog */}
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {alertType === 'success' ? '✅ Success' : '❌ Error'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {alertMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setAlertOpen(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Profile Picture Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col items-center">
            <div
              className={`relative group ${user.id !== 'fallback-user' ? 'cursor-pointer' : ''}`}
              onClick={handlePhotoClick}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <img
                  src={profilePictureUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-avatar.jpg";
                  }}
                />
              </div>

              {user.id !== 'fallback-user' && (
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-800 bg-opacity-0 group-hover:bg-opacity-70 rounded-full transition-all duration-300 flex items-center justify-center">
                  {isUploadingPhoto ? (
                    <Loader2 className="text-white animate-spin" size={28} />
                  ) : (
                    <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110" size={28} />
                  )}
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/webp,image/avif,image/jpeg,image/png,image/heic"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-gray-900 text-center break-words px-4">
              {user.firstName} {user.lastName}
            </h1>
            {user.headline && (
              <p className="text-sm sm:text-base text-gray-600 text-center mt-1 px-4 break-words">{user.headline}</p>
            )}

            {user.id !== 'fallback-user' && (
              <p className="text-xs text-gray-400 mt-2 hover:text-gray-600 transition-colors">
                Click photo to change
              </p>
            )}
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Informasi Profile</h2>
            {user.id !== 'fallback-user' && (
              !isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg touch-manipulation"
                  >
                    {isSaving && <Loader2 className="animate-spin" size={16} />}
                    {isSaving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              )
            )}
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Nama Depan
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  required
                />
              ) : (
                <p className="text-sm sm:text-base text-gray-900 break-words">{user.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Nama Belakang
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  required
                />
              ) : (
                <p className="text-sm sm:text-base text-gray-900 break-words">{user.lastName}</p>
              )}
            </div>

            {/* Email - Read Only */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-sm sm:text-base text-gray-900 break-all">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Headline
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="headline"
                  value={formData.headline || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  placeholder="Tambahkan headline singkat"
                  maxLength={100}
                />
              ) : (
                <p className="text-sm sm:text-base text-gray-900 break-words">{user.headline || '-'}</p>
              )}
            </div>

            {/* Biography */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Biografi
              </label>
              {isEditing ? (
                <textarea
                  name="biography"
                  value={formData.biography || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none touch-manipulation"
                  placeholder="Ceritakan tentang diri Anda"
                  maxLength={500}
                />
              ) : (
                <p className="text-sm sm:text-base text-gray-900 whitespace-pre-wrap break-words">{user.biography || '-'}</p>
              )}
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Social Media
              </label>
              {isEditing ? (
                <div className="space-y-2 sm:space-y-3">
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl || ''}
                    onChange={handleInputChange}
                    placeholder="Website URL"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  />
                  <input
                    type="url"
                    name="facebookUrl"
                    value={formData.facebookUrl || ''}
                    onChange={handleInputChange}
                    placeholder="Facebook URL"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  />
                  <input
                    type="url"
                    name="instagramUrl"
                    value={formData.instagramUrl || ''}
                    onChange={handleInputChange}
                    placeholder="Instagram URL"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  />
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl || ''}
                    onChange={handleInputChange}
                    placeholder="LinkedIn URL"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  />
                  <input
                    type="url"
                    name="xUrl"
                    value={formData.xUrl || ''}
                    onChange={handleInputChange}
                    placeholder="X (Twitter) URL"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  />
                  <input
                    type="url"
                    name="youtubeUrl"
                    value={formData.youtubeUrl || ''}
                    onChange={handleInputChange}
                    placeholder="YouTube URL"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  />
                  <input
                    type="url"
                    name="tiktokUrl"
                    value={formData.tiktokUrl || ''}
                    onChange={handleInputChange}
                    placeholder="TikTok URL"
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 touch-manipulation"
                        >
                          <Icon size={16} className="text-gray-600 flex-shrink-0 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm text-gray-700">{link.name}</span>
                        </a>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-xs sm:text-sm">Tidak ada social media yang ditambahkan</p>
                  )}
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="pt-3 sm:pt-4 border-t border-gray-200">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Informasi Akun</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="sm:col-span-2">
                  <span className="text-gray-500">Bergabung sejak:</span>
                  <span className="ml-2 text-gray-900 break-words">
                    {new Date(user.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {user.lastLoggedInAt && (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">Terakhir login:</span>
                    <span className="ml-2 text-gray-900 break-words">
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