import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(filterChange(event.target.value));
  };
  const style = {
    marginBottom: "10px",
  };

  return (
    <div style={style}>
      <label>filter </label>
      <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
