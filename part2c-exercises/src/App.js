import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PersonFilter from "./components/PersonFilter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  const handleNewSubmit = (event) => {
    event.preventDefault();
    const personsObject = {
      "name": newPerson,
      "number": newNumber,
      "id": persons.length + 1
    }

    setPersons(persons.concat(personsObject));
    setNewPerson("");
    setNewNumber("");
  }

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);

  };
  
  const handleQuery = (event) => {
    setQuery(event.target.value);
  }

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => {
        const data = response.data;
        setPersons(data);
      })
  }, [])

  return (
    <div className="App">
      <PersonFilter
        query={query}
        handleQuery={handleQuery}
      />
      <PersonForm
        handleNewSubmit={handleNewSubmit}
        newPerson={newPerson}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <Persons 
        persons={persons}
        query={query}
      /> 
    </div>
  );
}

export default App;
