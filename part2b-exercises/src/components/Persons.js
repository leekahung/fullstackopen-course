import Person from "./Person";

const Persons = ({ persons, query }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => {
          if (person.name.toLowerCase().includes(query)) {
            return (
              <Person
                key={person.id}
                name={person.name}
                number={person.number}
              />
            );
          } else {
            return null;
          }
        })}
      </tbody>
    </table>
  );
};

export default Persons;
