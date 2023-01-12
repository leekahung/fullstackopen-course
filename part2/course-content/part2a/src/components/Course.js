import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  const parts = course.parts;

  return (
    <div className="course">
      <Header name={course.name}/>
      <Content parts={parts} />
    </div>
  );
}
 
export default Course;