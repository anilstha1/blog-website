import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BiSolidEdit} from "react-icons/bi";
import {BsTrashFill} from "react-icons/bs";

function BlogDetails() {
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const {id} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/get/${id}`)
      .then((res) => {
        console.log(res.data);
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/get", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteBlog = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/blog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("post deleted");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container mx-auto p-2">
      <h1 className="text-xl font-bold text-center">{blog?.title}</h1>

      <p className="text-lg">{blog?.description}</p>
      {user?._id === blog?.user?._id && (
        <div className=" mt-2 flex gap-2">
          <Link
            className="border rounded-md py-2 px-5 hover:cursor-pointer"
            to={`/edit/${blog?._id}`}
          >
            <BiSolidEdit />
          </Link>

          <button
            className="border rounded-md py-2 px-5 hover:cursor-pointer"
            onClick={deleteBlog}
          >
            <BsTrashFill />
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
