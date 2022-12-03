import { useEffect, useState } from "react";
import personServices from "./services/person";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personServices.getAll().then((personsData) => {
      setPersons(personsData);
    });
  }, []);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmitPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newPerson,
      number: newNumber,
    };

    if (persons.map((person) => person.name).includes(newPerson)) {
      if (
        window.confirm(
          `${newPerson} already exist in phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newPerson);
        const updatedPerson = { ...person, number: newNumber };

        personServices.update(person.id, updatedPerson).then((personUpdated) => {
          setPersons(
            persons.map((person) =>
              person.name !== newPerson ? person : personUpdated
            )
          );
        });
      }
    } else {
      personServices.create(personObject).then((personsData) => {
        setPersons(persons.concat(personsData));
        setNewPerson("");
        setNewNumber("");
      });
    }
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      const remainingPersons = persons.filter((p) => p.id !== id);
      setPersons(remainingPersons);

      personServices.remove(id);
    }
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Filter query={query} handleQuery={handleQuery} />
      <h1>add a new</h1>
      <PersonForm
        newPerson={newPerson}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        handleSubmitPerson={handleSubmitPerson}
      />
      <h1>Numbers</h1>
      {persons.map((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase()) ? (
          <Person
            key={person.id}
            person={person}
            handleDeletePerson={handleDeletePerson}
          />
        ) : null;
      })}
    </div>
  );
};

export default App;
