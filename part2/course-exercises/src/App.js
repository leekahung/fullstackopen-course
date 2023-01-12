const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  // Exercise 2.3
  const total = parts
    .map((p) => p.exercises)
    .reduce((total, curr) => total + curr, 0);

  return <strong>total of {total} exercises</strong>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p) => {
        return <Part key={p.name} name={p.name} exercises={p.exercises} />;
      })}
      <Total parts={parts} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
