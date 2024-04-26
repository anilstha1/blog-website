import React from "react";
import {Link} from "react-router-dom";

function Blog({blog}) {
  return (
    <Link to={`/blog/${blog._id}`}>
      <div className="my-8 p-2 border rounded-lg hover:shadow-lg">
        <h1 className="text-xl font-bold">{blog?.title}</h1>
        <p className="text-lg">{blog?.description}</p>
      </div>
    </Link>
  );
}

export default Blog;
