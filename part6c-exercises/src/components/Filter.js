import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleFilter = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter));
  };

  return (
    <div>
      filter <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
