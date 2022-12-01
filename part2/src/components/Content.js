const Content = ({parts}) => {
  const totalNum = parts.map((part) => part.exercises)
    .reduce((total, currVal) => total + currVal);

  return (
    <div>
      {
        parts.map((part) => (
          <p key={part.id}>{part.name} {part.exercises}</p>
        ))
      }
      <h4>
        total of {totalNum} exercises
      </h4>
    </div>
  );
}
 
export default Content;