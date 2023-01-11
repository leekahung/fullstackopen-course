import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const FilterGroup = ({ group, handleFilter }) => {
  return (
    <>
      <label>{group}</label>
      <input
        type="radio"
        name="filter"
        onChange={handleFilter}
        defaultChecked={group === "all" ? true : false}
      />
    </>
  );
};

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      {["all", "important", "not important"].map((group) => {
        return (
          <FilterGroup
            key={group}
            group={group}
            handleFilter={() => dispatch(changeFilter(group.toUpperCase()))}
          />
        );
      })}
    </div>
  );
};

export default Filter;
