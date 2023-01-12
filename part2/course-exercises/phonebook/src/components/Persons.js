const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((p) => {
        return <Person key={p.name} person={p} />;
      })}
    </div>
  );
};

export default Persons;
