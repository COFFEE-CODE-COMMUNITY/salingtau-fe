import React, {useCallback, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleButton } from "../../components/ui/google-button.tsx"
import api from "@/services/api.ts";
import { TextField } from "@/components/ui/textfield.tsx";
import { PasswordField } from "@/components/ui/passwordfield.tsx";

interface RegisterBody {
  firstName: string
  lastName: string
  email: string
  password: string
}

type RegisterErrors = {
  [K in keyof RegisterBody]?: string[]
}

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [data, setData] = useState<RegisterBody>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<RegisterErrors>({})

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }, [data, errors])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    await api.post("/auth/register", data, {
      withCredentials: false,
      skipAuth: true
    })
      .then(response => {
        if (response.status === 201) {
          setSuccess(true)
          navigate("/login")
        } else {
          setErrors(response.data.errors)
        }

        setLoading(false)
      })
    if (!errors) {
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4">
      <div className="bg-white/95 backdrop-blur p-6 sm:p-8 rounded-xl w-full max-w-md text-center shadow-md">

        {/* Logo */}
        <div className="mb-6">
          <img src="/SalingTau.png" alt="Logo" className="w-16 sm:w-20 mx-auto" />
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          <TextField
            type="text"
            placeholder="Firstname"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName && errors.firstName[0]}
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />

          <TextField
            type="text"
            placeholder="Lastname"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName && errors.lastName[0]}
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
          />

          <TextField
            type="email"
            placeholder="Email"
            error={Boolean(errors.email)}
            helperText={errors.email && errors.email[0]}
            name="email"
            value={data.email}
            onChange={handleChange}
          />

          <PasswordField
            placeholder="Password"
            error={Boolean(errors.password)}
            helperText={errors.password && errors.password[0]}
            name="password"
            value={data.password}
            onChange={handleChange}
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 text-base sm:text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {success && (
            <p className="text-green-600 text-xs sm:text-sm mt-3 bg-green-50 p-2 rounded">
              Registration successful!
            </p>
          )}
        </form>

        {/* OR */}
        <div className="my-4 text-gray-500 text-sm sm:text-base">or</div>

        <GoogleButton label="Register" />

        {/* Login Link */}
        <p className="mt-6 text-gray-700 text-xs sm:text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}