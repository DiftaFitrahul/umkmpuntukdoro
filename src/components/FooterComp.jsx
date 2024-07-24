import Image from "next/image";
import Logo from "@/../public/magetan.svg";
import Link from "next/link";

export default function FooterComp() {
  return (
    <footer className="bg-[#315c48] h-[730px] md:h-[550px] xl:h-[500px] w-full flex flex-col justify-between items-start  text-white">
      <div className="absolute h-[160px] w-screen bg-gradient-to-r rigth-0 from-[#225248] to-transparent z-[1]"></div>
      <div className="absolute h-[160px] w-screen bg-gradient-to-r rigth-0 from-transparent from-5% via-[#225248] via-75% to-[#315c48] mt-[160px] z-[1]"></div>
      <div className="absolute h-[160px] w-screen bg-gradient-to-r rigth-0 from-[#225248] to-transparent z-[1] mt-[320px]"></div>
      <div className="flex flex-col xl:flex-row w-full justify-between z-[2] px-[36px]">
        <div className="flex flex-col w-full xl:w-1/3 ">
          <Image
            src={Logo}
            alt="Picture of the author"
            unoptimized
            className="w-[180px] mr-5 "
          />
          <p>
            Puntukdoro adalah sebuah nama desa di wilayah Kecamatan Plaosanl,
            Kabupaten Magetan, Provinsi Jawa Timur. Desa yang sangat kaya akan
            kekayaan alam dan sumber daya lokal. Komoditas utama di desa ini
            berupa sayur hasil pertanian yang sangat berkuliatas dan melimpah.
            Kedepannya desa ini akan menjadi desa wisata
          </p>
        </div>
        <div className=" w-1/4 "></div>
        <div className="flex flex-col md:flex-row justify-between w-full my-2 xl:mt-0 ">
          <div className="flex flex-col items-start mt-8">
            <p className="text-[18px] font-bold mb-4">Puntukdoro</p>

            <Link href="/" className="font-light font-[14px] mt-1">
              Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col  items-center w-full mb-5 z-[2]">
        <div className="bg-[#61867a] h-[2px] w-full"></div>
        <p className="text-[14px] mt-5 opacity-70">
          PEMERINTAH KABUPATEN MAGETAN | Copyright © 2023
        </p>
      </div>
    </footer>
  );
}
