// src/features/profiles/pages/EditProfilePage.tsx
import { useEditProfile } from "../hooks/useEditProfile"
import EditProfileForm from "../components/EditProfileForm"

export default function EditProfile() {
  const { user, loading, error, saving, message, handleChange, handleSubmit } = useEditProfile()

  if (loading) return <div className="p-8 text-gray-500">Loading profile...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>
  if (!user) return <div className="p-8 text-gray-500">No user data found.</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <EditProfileForm
        user={user}
        saving={saving}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
