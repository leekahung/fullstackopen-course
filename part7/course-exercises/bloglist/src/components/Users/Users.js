import Togglable from "../Togglable";
import UserForm from "./UserForm";

const Users = () => {
  return (
    <>
      <h1>Users</h1>
      <Togglable buttonLabel="create user">
        <UserForm />
      </Togglable>
    </>
  );
};

export default Users;
