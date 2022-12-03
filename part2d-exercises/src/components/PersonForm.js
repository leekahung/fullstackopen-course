const PersonForm = ({
  newPerson,
  handleNewPerson,
  newNumber,
  handleNewNumber,
  handleSubmitPerson
}) => {
  return (
    <div>
      <form onSubmit={handleSubmitPerson}>
        <div>
          name: <input 
            value={newPerson}
            onChange={handleNewPerson}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <button>add</button>
      </form>
    </div>
  );
};

export default PersonForm;
