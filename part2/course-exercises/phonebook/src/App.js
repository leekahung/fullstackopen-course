import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import numberService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  const initialNotification = {
    message: "",
    type: "",
  };
  const [notification, setNotification] = useState(initialNotification);

  useEffect(() => {
    numberService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const handleNewPerson = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find((p) => p.name === newName);
        const updatePerson = {
          ...personToUpdate,
          number: newNumber,
        };
        numberService.updateObject(updatePerson).then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.name === newName ? updatedPerson : p))
          );
          setNewName("");
          setNewNumber("");
          setNotification(``);
          runNotification(`Updated ${newName}'s number`, "message", 3000);
        });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      numberService.createNew(newPerson).then((addedPerson) => {
        setNewName("");
        setNewNumber("");
        setPersons(persons.concat(addedPerson));
        runNotification(`Added ${newName}`, "message", 3000);
      });
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

  const runNotification = (message, type, time) => {
    const notificationObject = {
      message,
      type,
    };
    setNotification(notificationObject);
    setTimeout(() => {
      setNotification(initialNotification);
    }, time);
  };

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      numberService.removeCurrent(person.id).catch((_error) => {
        runNotification(
          `Information of ${person.name} has already been removed from server`,
          "error",
          3000
        );
      });
      setPersons(persons.filter((p) => p.id !== person.id));
      runNotification(`Deleted ${person.name} from phonebook`, "message", 3000);
    }
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
      <Notification notification={notification} />
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
      <Persons
        persons={personsFiltered}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
