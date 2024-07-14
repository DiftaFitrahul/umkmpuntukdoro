import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/router";

import firebaseConfig from "@/firebase/config";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const auth = getAuth(firebaseConfig.firebase_app);

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    console.log("makan nasi");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        toast.success("Verification Code is Send", {
          zIndex: 9999,
        });
      } else {
        toast.success("Success Login", {
          zIndex: 9999,
        });
        router.push("/");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" p-8 rounded-lg  max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-center text-[#212b35]">
          Welcome Back
        </h1>
        <p className="text-center mb-4 text-black text-center text-gray-500 text-[14px] mb-5">
          Silahkan masukkan email dan password
        </p>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-400 mr-2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-600"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-center mb-4 text-start">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#212b35] text-white p-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
