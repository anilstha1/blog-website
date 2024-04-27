import React, {useEffect, useState} from "react";
import Blog from "../components/blog";
import axios from "axios";
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get("http://localhost:8000/blog/get", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
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

export default Blogs;
