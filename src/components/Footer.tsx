import { HiChevronDown } from "react-icons/hi2";

const Footer = ({ siteData }: { siteData: any }) => {
  return (
    <>
      <footer className="max-w-screen-2xl mx-auto border-b-8 border-secondaryBrown px-5 max-[400px]:px-3">
        <div className="flex flex-col gap-8 my-10">
          <p className="flex justify-center items-center text-2xl gap-2 max-sm:text-xl">
            Worldwide / English <HiChevronDown />
          </p>
          <h2 className="text-6xl font-light text-center max-sm:text-xl">
            {siteData?.name || "FASHION"}
          </h2>
          <p className="text-base text-center max-sm:text-sm">
            All rights reserved ©{new Date().getFullYear()}
          </p>
          <ul className="flex justify-center items-center gap-7 text-base max-sm:text-sm max-[350px]:flex-col max-[350px]:gap-5">
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Legal Notes</li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default Footer;
