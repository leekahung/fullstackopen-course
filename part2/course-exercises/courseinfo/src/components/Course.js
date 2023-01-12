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

export default Course;
