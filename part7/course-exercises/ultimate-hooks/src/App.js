import { useField, useResource } from "./hooks";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleAddNote = (event) => {
    event.preventDefault();
    noteService.createNew({
      content: content.value,
    });
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    personService.createNew({
      name: name.value,
      number: number.value,
    });
  };

  return (
    <div className="App">
      <div>
        <h1>notes</h1>
        <form onSubmit={handleAddNote}>
          <input {...content} />
          <button>create</button>
        </form>
        {notes.map((n) => {
          return <p key={n.id}>{n.content}</p>;
        })}
      </div>
      <div>
        <h1>persons</h1>
        <form onSubmit={handleAddPerson}>
          <div>
            name <input {...name} />
          </div>
          <div>
            number <input {...number} />
            <button>create</button>
          </div>
          {persons.map((p) => {
            return (
              <p key={p.id}>
                {p.name} {p.number}
              </p>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default App;
