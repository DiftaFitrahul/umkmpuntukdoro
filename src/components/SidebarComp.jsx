import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/magetan.svg";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import firebaseConfig from "@/firebase/config";
import { useRouter } from "next/router";
import { SidebarContext } from "@/components/HeaderComp";

const auth = getAuth(firebaseConfig.firebase_app);

const Sidebar = () => {
  const router = useRouter();
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);
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
    <div
      className={`bg-neutral-100 text-white   h-screen z-[999]  pb-5 pt-4 z-[10] fixed right-0 top-0 transition-all duration-300 ${
        showSidebar ? "w-[200px] sm:w-64" : "w-0 "
      }`}
    >
      <div className="flex justify-between items-center px-3 mb-4 w-full ">
        <Image
          src={Logo}
          alt="Picture of the author"
          unoptimized
          className="w-[100px] sm:w-[130px]  mr-5"
        />
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-[#697786] transition easy-in hover:text-[#303943]  font-bold w-[30px] sm:w-[40px] h-[40px] mr-2"
        >
          X
        </button>
      </div>
      <div
        className={`flex flex-col w-full justify-start ${
          isAuthenticated ? "h-[170px]" : "h-[120px]"
        } px-3`}
      >
        <Link
          href="/"
          className="text-[#697786] hover:text-[#303943] pl-3 pt-4  px-full w-full  rounded-xl font-semibold"
        >
          Home
        </Link>

        {isAuthenticated && (
          <button
            href=""
            className="text-[#697786] hover:text-[#303943] pl-3 pt-6 text-start  px-full w-full rounded-xl font-semibold"
            onClick={() => {
              router.push("/form");
            }}
          >
            Form
          </button>
        )}
      </div>
      <div className="flex flex-col">
        <button
          href=""
          className="text-orange-500 font-medium  mx-5 hover:cursor-pointer hover:text-white  hover:bg-orange-500  transition ease-in-out  border border-2 rounded-full border-orange-500 px-5 py-2"
          onClick={() => {
            isAuthenticated ? handleLogout() : router.push("/signin");
          }}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
