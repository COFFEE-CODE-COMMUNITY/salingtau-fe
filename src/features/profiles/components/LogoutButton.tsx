import useLogout from "../hooks/useLogout";

export default function LogoutButton() {
  const { logout, loading, error, success } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`bg-red-50 text-red-600 px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-100"}`}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">Logout successful</p>}
    </div>
  );
}
