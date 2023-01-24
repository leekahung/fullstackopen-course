import { useSelector } from "react-redux";
import Togglable from "./Togglable";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const style = {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid",
  };

  return (
    <>
      {blogs.map((b) => {
        return (
          <div style={style} key={b.id}>
            {b.title} {b.author}{" "}
            <Togglable
              buttonLabel="view"
              closeLabel="close"
              buttonLocation="top"
            >
              <div>{b.url}</div>
              <div>
                votes {b.votes} <button>vote</button>
              </div>
              <button>delete</button>
            </Togglable>
          </div>
        );
      })}
    </>
  );
};

export default Blogs;
