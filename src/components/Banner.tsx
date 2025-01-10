import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import frontpageApi from "../api/frontpage";

const Banner = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [titleField, setTitleField] = useState("");
  const [subtitleField, setSubtitleField] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    frontpageApi.banner().then((res) => {
      setBannerImages(res.data.bannerImages);
      setTitleField(res.data.titleField.value);
      setSubtitleField(res.data.subTitleField.value);
    });
  }, []);

  useEffect(() => {
    if (bannerImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [bannerImages]);

  const BannerSection = () => {
    return bannerImages.map((item: any, index) => (
      <Fragment key={index}>
        <img
          src={item.src}
          alt="banner"
          className={`absolute h-full w-full object-cover transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      </Fragment>
    ));
  };

  return (
    <div className="banner w-full flex flex-col justify-end relative items-center max-sm:h-[550px] max-sm:gap-2">
      <div className="absolute inset-0 w-full h-full -z-10">
        <BannerSection />
      </div>

      <h2 className="text-white text-center text-6xl font-bold tracking-[1.86px] leading-[60px] max-sm:text-4xl max-[400px]:text-3xl">
        {titleField}
      </h2>
      <h3 className="text-white text-3xl font-normal leading-[72px] tracking-[0.9px] max-sm:text-xl max-[400px]:text-lg">
        {subtitleField}
      </h3>
      <div className="flex justify-center items-center gap-3 pb-14 max-[400px]:flex-col max-[400px]:gap-1 w-[420px] max-sm:w-[350px] max-[400px]:w-[300px]">
        <Link
          to="/shop"
          className="bg-white text-black text-center text-xl border border-[rgba(0, 0, 0, 0.40)] font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center"
        >
          Shop Now
        </Link>
        <Link
          to="/shop"
          className="text-white border-white border-2 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center"
        >
          See Collection
        </Link>
      </div>
    </div>
  );
};

export default Banner;
