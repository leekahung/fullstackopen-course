import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const NoteFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <label>all</label>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
        defaultChecked
      />
      <label>important</label>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      <label>not important</label>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NOT IMPORTANT"))}
      />
    </div>
  );
};

export default NoteFilter;
