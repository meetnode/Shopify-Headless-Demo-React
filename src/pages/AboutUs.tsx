import { useEffect, useState } from "react";
import aboutUsApi from "../api/aboutus";

const AboutUs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    aboutUsApi.all().then((res) => {
      setContent(res.body_html);
    });
  }, []);
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-3xl my-5 text-center">{title || 'About us'}</div>
      <div dangerouslySetInnerHTML={{ __html: content }}/>
    </div>
  );
};

export default AboutUs;
