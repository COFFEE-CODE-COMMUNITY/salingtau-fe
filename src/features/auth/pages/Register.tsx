import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputName from "../components/InputName.tsx";
import InputEmail from "../components/InputEmail.tsx";
import InputPassword from "../components/InputPassword.tsx";
import GoogleButton from "../components/GoogleButton.tsx";
import useRegister from "../hooks/useRegister.ts";
import {IRegister} from "../../../services/AuthService.ts";

export default function Register() {
  const { register, loading, error, success } = useRegister();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    const data: IRegister = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
    }

    await register(data);
    alert("Registrasi berhasil! (Simulasi) | Silakan login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-6">
          <img src="/SalingTau.png" alt="Logo" className="w-20 mx-auto" />
        </div>

        <form onSubmit={handleRegister}>
          {/* Nama Depan */}
          <InputName
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />

          {/* Nama Belakang */}
          <InputName
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          {/* Email */}
          <InputEmail
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          {/* Password */}
          <InputPassword
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Konfirmasi Password */}
          <InputPassword
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Tombol Register */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mt-3">
              Registration successful!
            </p>
          )}
        </form>

        {/* OR */}
        <div className="my-4 text-gray-500">atau</div>

        {/* Tombol Google */}
        <GoogleButton
          label={"Daftar"}
        />

        {/* Login Link */}
        <p className="mt-6 text-gray-700">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
