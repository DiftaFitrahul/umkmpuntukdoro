import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import HeaderComp from "@/components/HeaderComp";
import FooterComp from "@/components/FooterComp";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseConfig from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const auth = getAuth(firebaseConfig.firebase_app);

export default function Form() {
  const router = useRouter();

  const initialFormData = {
    title: "",
    description: "",
    address: "",
    tiktokProfile: "",
    igProfile: "",
    facebookProfile: "",
    tokopediaLink: "",
    shopeeLink: "",
    whatsappNumber: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const inputFile = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login page if not authenticated
        toast.error("Not Authorized User", {
          zIndex: 9999,
        });
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleResetFileName = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required.";
    if (!formData.description)
      tempErrors.description = "Description is required.";
    if (!formData.address) tempErrors.address = "Address is required.";
    if (!formData.whatsappNumber)
      tempErrors.whatsappNumber = "WhatsApp link is required.";
    if (!formData.image) tempErrors.image = "Image is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      Swal.fire({
        title: "Apakah Sudah Benar?",
        text: "Pastikan data yang kamu masukkan benar",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          try {
            toast.info("Processing...", {
              zIndex: 9999,
            });
            // Upload image to Firebase Storage
            const storageRef = ref(
              firebaseConfig.storage,
              `images/${formData.image.name}`
            );
            await uploadBytes(storageRef, formData.image);
            const imageUrl = await getDownloadURL(storageRef);

            // Store form data
            await addDoc(collection(firebaseConfig.firestoreDB, "products"), {
              title: formData.title,
              description: formData.description,
              address: formData.address,
              tiktokProfile: formData.tiktokProfile,
              igProfile: formData.igProfile,
              facebookProfile: formData.facebookProfile,
              tokopediaLink: formData.tokopediaLink,
              shopeeLink: formData.shopeeLink,
              whatsappNumber: formData.whatsappNumber,
              imageUrl: imageUrl,
            });

            toast.success("Success add Data UMKM", {
              zIndex: 9999,
            });

            setFormData(initialFormData);
            handleResetFileName();
          } catch (error) {
            toast.error("Error Happened", {
              zIndex: 9999,
            });
          }
        } else {
        }
      });
    }
  };
  return (
    <>
      <Head>
        <title>Product Form | My Store</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <div className="flex flex-col justify-center items-center bg-neutral-100">
          <HeaderComp />
          <div className="container mx-auto px-7 sm:px-4 py-16">
            <h1 className="text-[#315c48] text-2xl font-bold mb-4">
              Product Form
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Title of Product <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">
                  Description of Product <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded h-32 text-black"
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">
                  Address of Product Produced{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">TikTok Profile</label>
                <input
                  type="url"
                  name="tiktokProfile"
                  value={formData.tiktokProfile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700">Instagram Profile</label>
                <input
                  type="url"
                  name="igProfile"
                  value={formData.igProfile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700">Facebook Profile</label>
                <input
                  type="url"
                  name="facebookProfile"
                  value={formData.facebookProfile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700">Tokopedia Link</label>
                <input
                  type="url"
                  name="tokopediaLink"
                  value={formData.tokopediaLink}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700">Shopee Link</label>
                <input
                  type="url"
                  name="shopeeLink"
                  value={formData.shopeeLink}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
                {errors.whatsappNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">
                  Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  ref={inputFile}
                  name="image"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  accept="image/*"
                  required
                />

                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded "
              >
                Submit
              </button>
            </form>
          </div>

          <FooterComp />
        </div>
      </main>
    </>
  );
}
