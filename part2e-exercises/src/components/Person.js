const Person = ({ person, query, handleDeletePerson }) => {
  return person.name.toLowerCase().includes(query.toLowerCase()) ? (
    <tr>
      <td>
        {person.name} {person.number} <button
          onClick={() => handleDeletePerson(person.id)}
        >delete</button>
      </td>
    </tr>
  ) : null;
};

export default Person;
