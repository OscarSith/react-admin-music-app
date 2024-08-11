import { Button } from 'react-bootstrap';
import { fetchData } from '../../utils/fetchData';
import { IUser } from '../../interfaces/User';
// import { useEffect, useState } from 'react';

const resource = fetchData('users');
export const UserTable = () => {
  // const [users, setUsers] = useState<IUser[]>([]);
  const users = resource.read() as IUser[];

  // useEffect(() => {
  //   console.log(data);
  //   setUsers([...data]);
  // }, []);
  console.log(users);

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
