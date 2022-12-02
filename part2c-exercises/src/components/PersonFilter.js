const PersonFilter = ({ query, handleQuery }) => {
  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        filter shown with{" "}
        <input type="search" value={query} onChange={handleQuery} />
      </form>
    </div>
  );
};

export default PersonFilter;
