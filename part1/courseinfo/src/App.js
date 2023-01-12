const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ content }) => {
  return (
    <>
      <Part part={content[0].part} exercises={content[0].exercises} />
      <Part part={content[1].part} exercises={content[1].exercises} />
      <Part part={content[2].part} exercises={content[2].exercises} />
    </>
  );
};

const Total = ({ content }) => {
  return (
    <p>
      Number of exercises{" "}
      {content.map((c) => c.exercises).reduce((total, curr) => total + curr, 0)}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const content = [
    { part: "Fundmentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content} />
    </div>
  );
};

export default App;
