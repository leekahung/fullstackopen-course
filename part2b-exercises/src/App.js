import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-1234567",
      id: 1,
    },
  ]);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personsObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if ([...persons.map((person) => person.name)].includes(newName)) {
      console.log(`${newName} already added`);
    } else if (
      [...persons.map((person) => person.number)].includes(newNumber)
    ) {
      console.log(`${newNumber} already added`);
    } else {
      setPersons(persons.concat(personsObject));
      setNewName("");
      setNewNumber("");
      console.log(`${newName} is added`);
    }
  };

  const handleAddName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setQuery(event.target.value);
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        query={query}
        handleFilter={handleFilter}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleAddName={handleAddName}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        query={query.toLowerCase()}
      />
    </div>
  );
};

export default App;
