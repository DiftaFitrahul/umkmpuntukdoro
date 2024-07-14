import HeaderComp from "@/components/HeaderComp";
import FooterComp from "@/components/FooterComp";
import { useState } from "react";
import Head from "next/head";
import ProductCard from "@/components/ProductCard";

export const products = [
  {
    id: 1,
    title: "Fresh Fruits dengan nasi padang dan kotak makanan",
    description:
      "Extend maintainable e-commerce for resource maximizing functionalities. Interactively customize adaptive niches whereas granular benefits.",
    image: "/umkm.jpg",
  },
  {
    id: 2,
    title: "Organic Vegetables",
    description:
      "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.",
    image: "/umkm.jpg",
  },
  {
    id: 3,
    title: "Dairy Products",
    description:
      "Override the digital divide with additional clickthroughs from DevOps.",
    image: "/umkm.jpg",
  },
  {
    id: 4,
    title: "Bakery Items",
    description:
      "Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
    image: "/umkm.jpg",
  },
  {
    id: 5,
    title: "Meat & Poultry",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination.",
    image: "/umkm.jpg",
  },
  {
    id: 6,
    title: "Seafood",
    description:
      "At the end of the day, going forward, a new normal that has evolved from generation X is on the runway.",
    image: "/umkm.jpg",
  },
  {
    id: 7,
    title: "Beverages",
    description:
      "Efficiently unleash cross-media information without cross-media value.",
    image: "/umkm.jpg",
  },
  {
    id: 8,
    title: "Snacks",
    description: "Quickly maximize timely deliverables for real-time schemas.",
    image: "/umkm.jpg",
  },
  {
    id: 9,
    title: "Frozen Foods",
    description:
      "Dramatically maintain clicks-and-mortar solutions without functional solutions.",
    image: "/umkm.jpg",
  },
  {
    id: 10,
    title: "Dry Goods",
    description:
      "Collaboratively administrate empowered markets via plug-and-play networks.",
    image: "/umkm.jpg",
  },
  {
    id: 11,
    title: "Condiments",
    description:
      "Completely synergize resource taxing relationships via premier niche markets.",
    image: "/umkm.jpg",
  },
  {
    id: 12,
    title: "Canned Goods",
    description:
      "Holisticly predominate extensible testing procedures for reliable supply chains.",
    image: "/umkm.jpg",
  },
];

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState(6);

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };
  return (
    <>
      <Head>
        <title>Home | ticket.in</title>
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
                    Bring Growth Fresh Agriculture
                  </h1>
                  <p className="mt-4 text-sm lg:text-base">
                    Monotonically revolutionize sticky niche markets for
                    cross-media. Continually enhance diverse services before
                    efficient.
                  </p>
                  <button className="mt-6 bg-orange-500 px-4 py-2 lg:px-6 lg:py-3 rounded text-white">
                    Discover More
                  </button>
                </div>
              </div>
            </section>
          </div>

          <div className="w-screen h-[200px]"></div>

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
                25 Year Experience
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                Be Healthy & Eat Only Fresh Vegetables Firm
              </h1>
              <p className="text-gray-500 mt-4">
                We’ve 20 years of Agriculture Farming Experience. Monotonically
                revolutionize sticky niche markets for cross-media services.
                Continually enhance diverse services before efficient.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-700">
                <li>If you are going to use a passage</li>
                <li>Making this the first true generator on the Internet</li>
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
              {products.slice(0, visibleProducts).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {visibleProducts < products.length && (
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
