const Person = ({ person, handleDeletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeletePerson(person)}>delete</button>
    </div>
  );
};

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      {persons.map((p) => {
        return (
          <Person
            key={p.name}
            person={p}
            handleDeletePerson={handleDeletePerson}
          />
        );
      })}
    </div>
  );
};

export default Persons;
