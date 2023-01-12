const PersonForm = ({
  handleNewSubmit,
  newPerson,
  handleNewPerson,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <div>
      <h1>add a new</h1>
      <form onSubmit={handleNewSubmit}>
        <div>
          name: <input value={newPerson} onChange={handleNewPerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default PersonForm;
