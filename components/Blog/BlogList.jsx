"use client";
import Link from 'next/link'
import React from 'react'
import BlogCard from './BlogCard'


const BlogList = ({blogs}) => {


  return (
    <div>
       <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      {blogs.map((blog, index) => (
        <Link key={blog._id} href={`/blog/${blog._id}`}>
          <BlogCard blog={blog} index={index} />
        </Link>
      ))}
    </div>
    </div>
  )
}

export default BlogList


// function BlogList() {

//   return (
   
//   );
// }