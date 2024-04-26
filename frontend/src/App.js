import React from "react";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";

// import Login from "./pages/login";
// import Signup from "./pages/signup";

import Home from "./pages/home";
import Blogs from "./pages/blogs";
// import AddBlogs from "./pages/addblog";
import BlogDetails from "./pages/blogDetails";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* <Route path="/addblogs" element={<AddBlogs />} /> */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} /> */}
      </Routes>
    </>
  );
};

export default App;
