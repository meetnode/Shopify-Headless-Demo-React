import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ScrollToTop } from "../components";
import { useEffect, useState } from "react";
import headerApi from "../api/header";

const HomeLayout = () => {
  const [siteData, setSiteData] = useState<any>();
  useEffect(() => {
    const data = headerApi.siteData();
    data.then((res) => {
      setSiteData(res);
    });
  }, []);
  return (
    <>
      <ScrollToTop />
      <Header siteData={siteData} />
      <Outlet />
      <Footer siteData={siteData} />
    </>
  );
};
export default HomeLayout;
