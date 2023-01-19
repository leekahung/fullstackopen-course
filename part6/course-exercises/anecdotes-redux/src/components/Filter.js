import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    const query = event.target.value;
    dispatch(setFilter(query));
  };

  const style = {
    marginBottom: "10px",
  };

  return (
    <div style={style}>
      filter <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
