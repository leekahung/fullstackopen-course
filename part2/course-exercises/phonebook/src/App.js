import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const baseUrl = "http://localhost:3001/persons";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNewPerson = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setNewName("");
      setNewNumber("");
      setPersons(persons.concat(newPerson));
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const personsFiltered =
    query !== ""
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleQuery={handleQuery} />
      <h2>add a new</h2>
      <PersonForm
        handleNewPerson={handleNewPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} />
    </div>
  );
};

export default App;
