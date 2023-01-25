import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Togglable from "../Togglable";
import UserForm from "./UserForm";

const UsersTable = () => {
  const users = useSelector((state) => state.users);

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((u) => {
          return (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Users = () => {
  return (
    <>
      <h1>Users</h1>
      <UsersTable />
      <Togglable buttonLabel="create user">
        <UserForm />
      </Togglable>
    </>
  );
};

export default Users;
