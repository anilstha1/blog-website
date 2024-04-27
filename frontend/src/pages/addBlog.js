import axios from "axios";
import React from "react";
import {useNavigate} from "react-router-dom";

function AddBlog() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");

    axios
      .post(
        "http://localhost:8000/blog/add",
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="text-black w-full md:w-1/2 mx-auto">
      <h1 className="text-lg font-bold text-center ">Add Blog</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="title"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            placeholder="description"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          className="border flex items-center rounded-lg px-5 py-2 hover:bg-gray-800 hover:text-gray-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
