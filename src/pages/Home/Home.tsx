import { Suspense } from 'react';
import { Table } from 'react-bootstrap';
import { UserTable } from './UserTable';
import ErrorBoundary from '../../utils/ErrorBoundary';

const Home = () => {
  const loading = (message: string) => {
    return (
      <tr>
        <td colSpan={5} className="text-center">
          {message}
        </td>
      </tr>
    );
  };

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
          <ErrorBoundary
            fallback={loading('NO se pudo cargar la lista de usuarios')}
          >
            <Suspense fallback={loading('Cargando datos...')}>
              <UserTable />
            </Suspense>
          </ErrorBoundary>
        </tbody>
      </Table>
    </>
  );
};

export const Component = () => {
  return <Home />;
};
