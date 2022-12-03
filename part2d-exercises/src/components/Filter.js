const Filter = ({ query, handleQuery }) => {
  return (
    <div>
      <form>
        filter shown with{" "}
        <input type="search" value={query} onChange={handleQuery} />
      </form>
    </div>
  );
};

export default Filter;
