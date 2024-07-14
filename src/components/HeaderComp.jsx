import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/magetan.svg";
import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import firebaseConfig from "@/firebase/config";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/router";
import Sidebar from "./SidebarComp";

const auth = getAuth(firebaseConfig.firebase_app);

export const SidebarContext = createContext();
export default function HeaderComp() {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className=" w-creen h-[70px]  ">
      <div className="flex w-screen h-[70px] flex-row items-center justify-evenly">
        <div className="flex flex-row items-center justify-center">
          <Link href="/">
            <Image
              src={Logo}
              alt="Picture of the author"
              unoptimized
              className="hidden sm:block w-[100px] "
            />
          </Link>
          <p className="text-[#212b35] text-3xl font-bold">Desa Puntukdoro</p>
        </div>

        <button
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className="block xl:hidden ml-10 items-center justify-center flex h-[30px] min-[700px]:h-[0]"
        >
          <FiMenu className="text-[#697786] hover:text-[#303943] absolute text-[32px] right-[20px]  " />
        </button>

        <div className="flex flex-shrink-0 gap-5 items-center justify-center hidden xl:block ">
          <Link
            href="/"
            className="text-[#697786] my-10 mx-5 hover:cursor-pointer hover:text-[#303943] hover:font-semibold transition ease-in-out"
          >
            Home
          </Link>

          <button
            href=""
            className="text-[#697786] my-10 mx-5 hover:cursor-pointer hover:text-[#303943] hover:font-semibold transition ease-in-out border-none"
            onClick={() => {}}
          >
            About
          </button>
          {isAuthenticated && (
            <button
              href=""
              className="text-[#697786] my-10 mx-5 hover:cursor-pointer hover:text-[#303943] hover:font-semibold transition ease-in-out border-none"
              onClick={() => {
                router.push("/form");
              }}
            >
              create
            </button>
          )}
          <button
            href=""
            className="text-orange-500 font-medium my-10 mx-5 hover:cursor-pointer hover:text-white  hover:bg-orange-500  transition ease-in-out  border border-2 rounded-full border-orange-500 px-5 py-2"
            onClick={() => {
              isAuthenticated ? handleLogout() : router.push("/signin");
            }}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
      <SidebarContext.Provider
        value={{ showSidebar: showSidebar, setShowSidebar }}
      >
        <Sidebar />
      </SidebarContext.Provider>
    </nav>
  );
}
