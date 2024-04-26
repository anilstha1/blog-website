import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/get/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);
  return (
    <div className="p-2">
      <h1 className="text-xl font-bold text-center">{blog?.title}</h1>
      <p className="text-lg">{blog?.description}</p>
    </div>
  );
}

export default BlogDetails;
