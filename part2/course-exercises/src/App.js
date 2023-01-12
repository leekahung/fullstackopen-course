const Header = ({ name }) => {
  return <h3>{name}</h3>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
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

const Courses = ({ courses }) => {
  return (
    <>
      <h2>Web development curriculum</h2>
      <div>
        {courses.map((c) => {
          return <Course key={c.name} course={c} />;
        })}
      </div>
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

export default App;
