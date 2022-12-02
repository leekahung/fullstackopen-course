import Person from "./Person";

const Persons = ({ persons, query }) => {
  return (
    <div>
      <h1>Numbers</h1>
      <table>
        <tbody>
          {persons.map((person) => {
            return (person.name.toLowerCase().includes(query.toLowerCase()))
              ? <Person key={person.id} person={person} />
              : null
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
