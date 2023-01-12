const PersonForm = ({
  handleAddPerson,
  newPerson,
  handleNewPerson,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <div>
      <form onSubmit={handleAddPerson}>
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
