//import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  //const dispatch = useDispatch();

  const handleFilter = (event) => {
    const query = event.target.value;
    props.setFilter(query);
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

const mapDispatchToProps = {
  setFilter,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);

export default ConnectedFilter;
