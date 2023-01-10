import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const FilterGroup = ({ group, filterNotes }) => {
  return (
    <>
      <label>{group}</label>
      <input
        name="filter"
        type="radio"
        onChange={() => filterNotes(`${group.toUpperCase()}`)}
        defaultChecked={group === "all" ? true : false}
      />
    </>
  );
};

const Filter = () => {
  const dispatch = useDispatch();

  const filterNotes = (filter) => {
    dispatch(filterChange(filter));
  };

  return (
    <form>
      {["all", "important", "not important"].map((group) => {
        return (
          <FilterGroup key={group} group={group} filterNotes={filterNotes} />
        );
      })}
    </form>
  );
};

export default Filter;
