import { useRouter } from "next/router";
import { useEffect } from "react";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

export default function ProductCard({ product }) {
  const router = useRouter();

  const navigateToProduct = (productId) => {
    router.push(`/detail/${productId}`);
  };

  return (
    <div
      data-aos="fade-up"
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 text-6xl text-gray-200 font-bold">
          {product.title.charAt(0)}
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">
          {truncateText(product.title, 29)}
        </div>
        <p className="text-gray-700 text-base">
          {truncateText(product.description, 75)}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => navigateToProduct(122)}
          className="mt-4 transition ease-in-out border border-black hover:border-none  hover:-translate-y-1 hover:scale-110 hover:bg-[#315c48] hover:text-white duration-300 px-4 py-2 rounded flex items-center bg-white text-black"
        >
          Explore More
        </button>
      </div>
    </div>
  );
}
