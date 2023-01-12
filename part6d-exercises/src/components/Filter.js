import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleFilter = (event) => {
    const filter = event.target.value;
    props.setFilter(filter);
  };

  return (
    <div>
      filter <input onChange={handleFilter} />
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
