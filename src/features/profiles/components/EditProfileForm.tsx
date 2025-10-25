import { UserProfile } from "../../../services/UserService.ts"
import React from "react"

interface EditProfileFormProps {
  user: UserProfile
  saving: boolean
  message: string | null
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function EditProfileForm({ user, saving, message, onChange, onSubmit }: EditProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input type="text" name="firstName" value={user.firstName} onChange={onChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input type="text" name="lastName" value={user.lastName} onChange={onChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={user.email} disabled className="w-full px-4 py-2.5 border rounded-lg bg-gray-100 cursor-not-allowed" />
        </div>
      </div>

      {/* Professional Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
        <input type="text" name="headline" value={user.headline} onChange={onChange} className="w-full px-4 py-2.5 border rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
        <textarea name="biography" rows={4} value={user.biography} onChange={onChange} className="w-full px-4 py-2.5 border rounded-lg"></textarea>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          ["websiteUrl", "Website"],
          ["linkedinUrl", "LinkedIn"],
          ["instagramUrl", "Instagram"],
          ["facebookUrl", "Facebook"],
          ["xUrl", "X (Twitter)"],
          ["youtubeUrl", "YouTube"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="url"
              name={key}
              value={(user as any)[key] || ""}
              onChange={onChange}
              className="w-full px-4 py-2.5 border rounded-lg"
              placeholder={`https://${label.toLowerCase()}.com/username`}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
    </form>
  )
}
