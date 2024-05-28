// import { useLoaderData } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useAuth } from '../provider/AuthProvider';
import { URL_SERVER_API } from '../constants';
import { IUser } from '../interfaces/User';
import { Button, Table } from 'react-bootstrap';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch(URL_SERVER_API + 'users', {
      headers: {
        Authorization: 'Bearer ' + user.access_token,
      },
    })
      .then((res: Response) => res.json())
      .then((users: IUser[]) => setUsers(users));
  }, []);

  return (
    <>
      <h2 className="text-center mb-3">Lista de usuarios</h2>
      <Table hover responsive>
        <thead>
          <tr>
            <td>#</td>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Correo</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
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
        </tbody>
      </Table>
    </>
  );
};

export default Home;
