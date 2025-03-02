"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserById, login } from "@/app/api/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(identifier, password);
      console.log("Login successful:", response);

      localStorage.setItem("token", response.token);

      const token = response.token;
      const shortId = response.shortId; 

      const user = await getUserById(token, shortId);

      if (user) {
        router.push("/");
      } else {
        setError("User not found. Please try again.");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <section 
      className="flex items-center justify-center w-full min-h-[100vh] bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/images/Cubes.png')" }}
    >
      <div className="py-4 px-5 bg-[#071c37] bg-opacity-60 rounded-lg shadow-xl border border-4 border-[#8c6d51] flex items-center flex-col">
        <Image width={60} height={60} src="/images/Logo.png" alt="Logo"/>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center pb-4 pt-2 text-[30px] text-white font-montserrat">Log In</h2>
          <div className="flex justify-center items-center flex-col md:flex-row gap-2 w-full">
            <Image width={250} height={250} src="/images/Group 2.png" alt="group" />
            <div>
              <div className="border-b border-white flex items-center justify-between py-2 px-4">
                <input 
                  className="border-none outline-none bg-transparent text-white md:text-xl letter-spacing-2 w-full font-montserrat placeholder-white placeholder-opacity-50"
                  type="text" 
                  placeholder="Username or Email" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required 
                />
              </div>
              <div className="border-b border-white flex py-2 px-4">
                <input 
                  className="border-none outline-none bg-transparent text-white letter-spacing-2 w-full md:text-xl font-montserrat placeholder-white placeholder-opacity-50"
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <Link href="#" className="text-white md:text-xl">Forgot?</Link>
              </div>
              <div className="flex justify-center items-center w-full mt-2 gap-2">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember" className="text-white md:text-xl">Remember me</label>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mt-2 flex flex-col gap-2">
            <button type="submit" className="w-full bg-[#071c37] py-2 rounded-md text-white shadow-xl">Log In</button>
            <button type="button" className="w-full flex justify-center items-center gap-x-2 bg-[#d7d6ce] bg-opacity-60 py-2 rounded-md text-white shadow-xl">
              <Image width={25} height={25} src="/images/google 1.png" alt="login with google" className="google-image" />
              Log In with Google
            </button>
          </div>
        </form>

        <div className="mt-2">
          <p className="text-white">Don&apos;t have an account? <Link href="/auth/signup" className="underline">Sign Up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
