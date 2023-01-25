import { useSelector } from "react-redux";
import Togglable from "../Togglable";
import UserForm from "./UserForm";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h1>Users</h1>
      <table>
        <tbody>
          <th></th>
          <th>
            <td>blogs created</td>
          </th>
          {users.map((u) => {
            return (
              <tr>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Togglable buttonLabel="create user">
        <UserForm />
      </Togglable>
    </>
  );
};

export default Users;
