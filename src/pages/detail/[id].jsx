import HeaderComp from "@/components/HeaderComp";
import FooterComp from "@/components/FooterComp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import firebaseConfig from "@/firebase/config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import Head from "next/head";
const auth = getAuth(firebaseConfig.firebase_app);

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthUser = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      console.log("Check Auth User:", !!user);
    });

    // Clean up the subscription on unmount
    return () => checkAuthUser();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          toast.info("Getting Data...", {
            zIndex: 9999,
            toastId: "loading1",
          });
          const docRef = doc(firebaseConfig.firestoreDB, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            toast.success("Success Get Data", {
              zIndex: 9999,
              toastId: "success1",
            });
            setProduct({ id: docSnap.id, ...docSnap.data() });
            console.log({ product });
          } else {
            toast.error("Data Not Found", {
              zIndex: 9999,
              toastId: "noData1",
            });
            console.error("No such document!");
          }
        } catch (error) {
          toast.error("Error Happened", {
            zIndex: 9999,
            toastId: "error1",
          });
        }
      };

      fetchProduct();
    }
  }, [id]);

  const onDeleteData = () => {
    Swal.fire({
      title: "Apakah Kamu Yakin?",
      text: "Kamu akan menghapus data ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.value) {
        try {
          await deleteDoc(doc(firebaseConfig.firestoreDB, "products", id));
          toast.success("Success Delete Data", {
            zIndex: 9999,
            toastId: "succes2",
          });
          router.back();
        } catch (err) {
          console.log({ err });
          toast.error("Error Happened", {
            zIndex: 9999,
            toastId: "error2",
          });
        }
      } else {
      }
    });
  };

  return (
    <>
      <Head>
        <title>Detail | umkmpuntukdoro</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <div className="flex flex-col justify-center items-center bg-neutral-100">
          <HeaderComp />
          {isAuthenticated && (
            <button
              onClick={onDeleteData}
              className="bg-red-700 px-6 py-2 rounded-full"
            >
              Delete Data
            </button>
          )}
          <div className="container h-auto xl:h-screen  flex justify-center items-center mx-auto px-4 py-8">
            <div
              data-aos="fade-up"
              className="flex flex-col lg:flex-row overflow-hidden items-center justify-center"
            >
              {/* Product Image */}
              <div className="lg:w-1/2 w-full p-4">
                <img
                  src={product?.imageUrl}
                  alt="Product"
                  className="w-full h-auto object-fill shadow-lg bg-white rounded  p-4 max-h-[670px]"
                />
              </div>
              {/* Product Details */}
              <div className="lg:w-3/4 w-full p-4 flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">
                    {product?.title}
                  </h1>
                  <div className="flex items-center mt-2 mb-4">
                    <div className="flex items-center">
                      {/* Placeholder for stars */}
                      <span className="text-[#315c48] text-lg mr-1">
                        {product?.address}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-4 space-x-4">
                    <a
                      href={product?.igProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-gray-600 hover:text-gray-900 text-2xl"
                      />
                    </a>
                    <a
                      href={product?.tiktokProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faTiktok}
                        className="text-gray-600 hover:text-gray-900 text-2xl"
                      />
                    </a>
                    <a
                      href={product?.facebookProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="text-gray-600 hover:text-gray-900 text-2xl"
                      />
                    </a>
                  </div>
                  <p className="text-gray-700 mb-4">{product?.description}</p>
                </div>
                <div className="flex flex-col md:flex-row items-center mt-4 space-y-4 md:space-y-0 md:space-x-4">
                  <a
                    href={product?.tokopediaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="text-white px-4 py-2 rounded-md flex items-center space-x-2 border border-[#315c48] border-2">
                      <svg
                        viewBox="0 0 192 192"
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M96 28c-9.504 0-17.78 5.307-22.008 13.127C82.736 42.123 88.89 44 96 47.332c7.11-3.332 13.264-5.209 22.008-6.205C113.781 33.31 105.506 28 96 28Zm0-12c-15.973 0-29.568 10.117-34.754 24.28C52.932 40 42.462 40 28.53 40H28a6 6 0 0 0-6 6v124a6 6 0 0 0 6 6h92c27.614 0 50-22.386 50-50V46a6 6 0 0 0-6-6h-.531c-13.931 0-24.401 0-32.715.28C125.566 26.113 111.97 16 96 16ZM34 52.001V164h86c20.987 0 38-17.013 38-38V52.001c-18.502.009-29.622.098-37.872.966-8.692.915-13.999 2.677-21.445 6.4a6 6 0 0 1-5.366 0c-7.446-3.723-12.753-5.485-21.445-6.4-8.25-.868-19.37-.957-37.872-.966ZM50 96c0-9.941 8.059-18 18-18s18 8.059 18 18-8.059 18-18 18-18-8.059-18-18Zm18-30c-16.569 0-30 13.431-30 30 0 16.569 13.431 30 30 30 1.126 0 2.238-.062 3.332-.183l20.425 20.426a6 6 0 0 0 8.486 0l20.425-20.426c1.094.121 2.206.183 3.332.183 16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30-12.764 0-23.666 7.971-28 19.207C91.666 73.971 80.764 66 68 66Zm40.082 55.433A30.1 30.1 0 0 1 96 106.793a30.101 30.101 0 0 1-12.082 14.64L96 133.515l12.082-12.082ZM124 78c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18ZM76 96a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm48 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
                          fill="#315c48"
                        />
                      </svg>
                      <span className="text-[#315c48] font-semibold">
                        Tokopedia
                      </span>
                    </button>
                  </a>
                  <a
                    href={product?.shopeeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="border border-2 border-orange-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24.000000 24.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
                          fill="#ea580b"
                          stroke="none"
                        >
                          <path
                            d="M86 221 c-10 -11 -30 -21 -45 -23 -26 -3 -26 -3 -24 -86 1 -46 4 -90
                              7 -98 8 -20 184 -20 192 0 3 8 6 52 7 98 2 83 2 83 -24 86 -15 2 -35 12 -45
                              23 -22 24 -46 24 -68 0z m59 -11 c4 -6 -7 -10 -25 -10 -18 0 -29 4 -25 10 3 6
                              15 10 25 10 10 0 22 -4 25 -10z m65 -72 c0 -24 -3 -60 -6 -81 l-7 -37 -77 0
                              -77 0 -7 37 c-3 21 -6 57 -6 81 l0 42 90 0 90 0 0 -42z"
                          />
                          <path
                            d="M92 148 c-20 -20 -14 -36 18 -53 35 -18 31 -38 -6 -29 -14 4 -24 2
                              -24 -5 0 -17 48 -25 65 -11 23 19 18 39 -17 60 -24 15 -28 21 -16 25 8 3 20 5
                              26 3 5 -2 11 2 11 7 2 15 -42 18 -57 3z"
                          />
                        </g>
                      </svg>
                      <span className="text-orange-600 font-semibold">
                        Shopee
                      </span>
                    </button>
                  </a>
                  <a
                    href={`https://wa.me/${product?.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-green-500 text-white px-4 py-2  rounded-md flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="text-white w-6 h-6"
                      />
                      <span>WhatsApp</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <FooterComp />
        </div>
      </main>
    </>
  );
}
