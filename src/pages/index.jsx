import HeaderComp from "@/components/HeaderComp";
import FooterComp from "@/components/FooterComp";
import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";

import firebaseConfig from "@/firebase/config";
import Head from "next/head";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const ref = useRef(null);
  const handleClickMore = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firebaseConfig.firestoreDB, "products")
        );
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setData(products);
        console.log({ products });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Home | umkmpuntukdoro</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <div className="flex flex-col justify-center items-center bg-neutral-100">
          <HeaderComp />

          <div className="flex flex-col justify-center items-center h-[670px] sm:h-[870px] w-screen bg-[#315c48] mt-[5px] lg:mt-[10px] xl:mt-[20px]">
            <section className="relative w-screen h-full">
              <img
                src="/field.jpg"
                alt="Farmer"
                className="absolute right-0 h-full w-full w-screen lg:w-5/6 object-cover z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#315c48] to-transparent lg:hidden z-10"></div>
              <div className="hidden lg:block  lg:absolute lg:inset-0 lg:bg-gradient-to-r from-[#315c48] from-40% to-transparent to-100% lg:z-10"></div>
              <div className="hidden lg:block   absolute h-[170px] w-[900px] bg-gradient-to-r rigth-0 from-[#225248] to-transparent z-[11]"></div>
              <div className="hidden lg:block   absolute h-[170px] lg:w-[400px] xl:w-[500px] bg-gradient-to-r rigth-0 from-transparent from-5% via-[#225248] via-75% to-[#315c48] mt-[170px] z-[11]"></div>
              <div className="hidden lg:block   absolute h-[170px] w-[900px] bg-gradient-to-r rigth-0 from-[#225248] to-transparent z-[11] mt-[340px]"></div>
              <div className="hidden lg:block   absolute h-[170px] lg:w-[400px] xl:w-[500px] bg-gradient-to-r rigth-0 from-transparent from-5% via-[#225248] via-75% to-[#315c48] mt-[510px] z-[11]"></div>
              <div className="hidden lg:block   absolute h-[170px] w-[900px] bg-gradient-to-r rigth-0 from-[#225248] to-transparent z-[11] mt-[680px]"></div>

              <div className="relative flex justify-center items-center h-full z-20">
                <div className="w-1/2 pb-[100px] left-10 lg:w-1/2 absolute bottom-6 lg:bottom-auto lg:left-15 xl:left-40 text-start text-white  lg:pb-0">
                  <h1 className=" text-lg max-[300px]:text-xl max-[500px]:text-3xl  max-[700px]:text-5xl max-[2000px]:text-7xl font-bold">
                    Desa Wisata Puntukdoro Magetan
                  </h1>
                  <p className="mt-4 text-sm lg:text-base">
                    Mengedepankan persatuan, guyub rukun, beriman, dan
                    sejahtera, Desa ini menjadi desa yang kaya akan potensi
                    sumber daya alam dan manusia beserta keberagamannya
                  </p>
                  <button
                    onClick={handleClickMore}
                    className="mt-6 bg-orange-500 px-4 py-2 lg:px-6 lg:py-3 rounded text-white"
                  >
                    Discover More
                  </button>
                </div>
              </div>
            </section>
          </div>

          <div ref={ref} className="w-screen h-[100px]"></div>

          <section className="flex flex-col lg:flex-row items-center justify-between bg-neutral-100 py-12 px-6 overflow-x-hidden">
            <div
              className="relative flex-1 lg:w-1/2 lg:mr-8"
              data-aos="fade-right"
            >
              <img
                src="/magetan.svg"
                alt="Farmer"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className="flex-1 lg:w-1/2 mt-8 lg:mt-0 " data-aos="fade-left">
              <p className="text-green-500 text-sm font-semibold">
                Jl. Soekarno Hatta No.01, Weru, Puntukdoro, Kec. Plaosan,
                Kabupaten Magetan, Jawa Timur 63361
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                Visi dan Misi Desa Puntukdoro
              </h1>
              <p className="text-gray-900 font-bold pt-2">VISI</p>
              <p className="text-gray-500 ">
                MEWUJUDKAN MASYARAKAT DESA PUNTUKDORO YANG GUYUB RUKUN, BERIMAN
                DAN SEJAHTERA
              </p>
              <p className="text-gray-900 font-bold pt-2">Misi</p>

              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Tercapainya kerukunan dan kerjasama yang baik antara
                  pemerintah desa, lembaga desa dan masyarakat
                </li>
                <li>
                  Terwujudnya suasana guyub rukun, aman dan nyaman dalam
                  kehidupan masyarakat
                </li>
                <li>
                  Penyelenggaraan pemerintahan desa secara adil, terbuka dan
                  bertanggungjawab
                </li>
                <li>
                  Peningkatan perekonomian masyarakat melalui pengembangan
                  potensi desa, pembangunan sarana prasarana umum, sosial dasar
                  dan perekonomian
                </li>
                <li>
                  Pengembangan sumber daya desa dan sumber daya masyarakat
                </li>
              </ul>
            </div>
          </section>

          <div
            data-aos="fade"
            className="flex flex-col w-screen justify-center items-center "
          >
            <p className="text-[#315c48] font-bold text-5xl text-center">
              Produk UMKM
            </p>
            <p className="text-gray-500 mt-2 w-1/2 text-center">
              Hasil sentra olahan masyarakat puntukdoro menjadi sebuah produk
              yang bermanfaat dan memiliki nilai jual. Memanfaatkan bahan dari
              sumber daya lokal untuk menghasilkan kuliatas yang terbaik
            </p>
          </div>

          <div className="container mx-auto px-4 py-8   flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 self-center content-center items-center">
              {data.slice(0, visibleProducts).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {visibleProducts < data.length && (
            <button
              onClick={loadMore}
              className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              Discover More
            </button>
          )}

          <div className="w-screen h-[100px]"></div>
          <FooterComp />
        </div>
      </main>
    </>
  );
}
