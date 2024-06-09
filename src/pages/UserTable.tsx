import { Button } from 'react-bootstrap';
import { fetchData } from '../utils/fetchData';
import { IUser } from '../interfaces/User';

const resource = fetchData('users');

export const UserTable = () => {
  const users = resource.read() as IUser[];

  return (
    <>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td>
            <Button type="button" size="sm" variant="success">
              Edit
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};
