import Blog from "./Blog";

const Blogs = ({ blogs, handleLikeBlog, handleDeleteBlog }) => {
  return (
    <>
      {blogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeBlog={handleLikeBlog}
            handleDeleteBlog={handleDeleteBlog}
          />
        );
      })}
    </>
  );
};

export default Blogs;
