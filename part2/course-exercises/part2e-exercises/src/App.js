import { useState, useEffect } from "react";
import personRequest from "./services/person";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    personRequest.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  console.log(persons);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const notificationTimeOut = () => {
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newPerson,
      number: newNumber,
    };

    if (persons.find((p) => p.name === newPerson) !== undefined) {
      if (
        window.confirm(
          `${newPerson} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newPerson);
        const updatePerson = { ...person, number: newNumber };

        personRequest
          .update(person.id, updatePerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.name !== newPerson ? p : updatedPerson))
            );
            setNewPerson("");
            setNewNumber("");
            setNotification(`Updated ${updatedPerson.name}'s number`);
            notificationTimeOut();
          })
          .catch((error) => {
            setNotification(
              `Information of ${updatePerson.name} has already been removed from server`
            );
            notificationTimeOut();
            setPersons(persons.filter((n) => n.name !== updatePerson.name));
          });
      }
    } else {
      personRequest.create(personObject).then((newPersonObject) => {
        setPersons(persons.concat(newPersonObject));
        setNewPerson("");
        setNewNumber("");
        setNotification(`Added ${newPersonObject.name}`);
        notificationTimeOut();
      });
    }
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personRequest.remove(id);
      setPersons(persons.filter((p) => (p.id === id ? null : p)));
    }
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter query={query} handleQuery={handleQuery} />
      <h1>add a new</h1>
      <PersonForm
        handleAddPerson={handleAddPerson}
        newPerson={newPerson}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h1>Numbers</h1>
      <Numbers
        persons={persons}
        query={query}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
