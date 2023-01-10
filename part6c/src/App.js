import Notes from "./components/Notes";
import NoteForm from "./components/NoteForm";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div className="App">
      <NoteForm />
      <Filter />
      <Notes />
    </div>
  );
};

export default App;
