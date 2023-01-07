import { useDispatch } from "react-redux";
import { addAncedote } from "../reducers/ancedoteReducer";

const AncedoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAncedote = (event) => {
    event.preventDefault();
    const content = event.target.ancedote.value;
    event.target.ancedote.value = "";
    dispatch(addAncedote(content));
  };

  return (
    <form onSubmit={handleAddAncedote}>
      <input name="ancedote" />
      <button type="submit">add new ancedote</button>
    </form>
  );
};

export default AncedoteForm;
