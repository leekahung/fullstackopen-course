import Person from "./Person";

const Numbers = ({ persons, query, handleDeletePerson }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => {
          return (
            <Person
              key={person.id}
              person={person}
              query={query}
              handleDeletePerson={handleDeletePerson}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Numbers;
