const BlogForm = ({ handleAddBlog, blogValues, handleBlogValues }) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleAddBlog}>
        <div>
          <label>title: </label>
          <input
            name="title"
            value={blogValues.title}
            onChange={handleBlogValues}
          />
        </div>
        <div>
          <label>author: </label>
          <input
            name="author"
            value={blogValues.author}
            onChange={handleBlogValues}
          />
        </div>
        <div>
          <label>url: </label>
          <input
            name="url"
            value={blogValues.url}
            onChange={handleBlogValues}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
