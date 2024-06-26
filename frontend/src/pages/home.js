import React, {useEffect, useState} from "react";
import Blog from "../components/blog";
import axios from "axios";
function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/blog/getblogs").then((res) => {
      console.log(res.data);
      setBlogs(res.data);
    });
  }, []);
  return (
    <div className="w-full lg:w-1/2 lg:mx-auto px-2">
      {blogs?.map((blog) => {
        return <Blog key={blog._id} blog={blog} />;
      })}
    </div>
  );
}

export default Home;
