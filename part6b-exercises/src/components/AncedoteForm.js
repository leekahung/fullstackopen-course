import { useDispatch } from "react-redux";
import { addAncedote } from "../reducers/ancedoteReducer";
import { notifcationChange } from "../reducers/notificationReducer";

const AncedoteForm = () => {
  const dispatch = useDispatch();

  const addNewAncedote = (event) => {
    event.preventDefault();
    const content = event.target.ancedote.value;
    event.target.ancedote.value = "";
    dispatch(addAncedote(content));
    dispatch(notifcationChange(`Ancedote "${content}" created`));
    setTimeout(() => {
      dispatch(notifcationChange(""));
    }, 4000);
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addNewAncedote}>
        <input name="ancedote" />
        <button>create</button>
      </form>
    </div>
  );
};

export default AncedoteForm;
