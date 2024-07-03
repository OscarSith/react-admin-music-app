import { Suspense, useCallback, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { ArtistModal } from './ArtistModal';
import { ArtistTable } from './ArtistTable';
import { CustomToast } from '../../components/CustomToast';
import { fetchData } from '../../utils/fetchData';
import { StoreArtistProvider } from './store/StoreArtistContext';

const Artists = () => {
  // States
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = useCallback(() => {
    if (showToast) {
      setShowToast(false);
    }
    setError(false);
    setMessage('');
    setShowModal(true);
  }, []);

  const handleShowToast = (message: string, isError: boolean = false) => {
    if (isError) {
      setError(true);
    }

    setShowToast(true);
    setMessage(message);
  };

  const handleHideToast = useCallback(() => {
    setShowToast(false);
  }, []);

  /**
   * Set the error state to true, the message
   * and execute the handleShowToast method
   * @param message Mensaje a mostrar en el toast
   */
  const handleError = (message: string) => {
    setError(true);
    setMessage(message);
    handleShowToast(message, true);
  };

  const loadingTable = () => {
    return (
      <tr className="text-center">
        <td colSpan={5} className="p-3">
          Cargando listado de artistas
        </td>
      </tr>
    );
  };

  return (
    <>
      <h2 className="text-center mb-3">Lista de Artistas</h2>
      <div className="mb-2">
        <Button type="button" variant="primary" onClick={handleShowModal}>
          Nuevo
        </Button>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <td width="30%">Nombre Completo</td>
            <td width="20%">Imagen</td>
            <td>Bio</td>
            <td>F. Creación</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={loadingTable()}>
            <ArtistTable showModal={handleShowModal} />
          </Suspense>
        </tbody>
      </Table>
      <ArtistModal
        handleClose={handleCloseModal}
        error={message}
        showModal={showModal}
        handleShowToast={handleShowToast}
        handleError={handleError}
      />
      <CustomToast
        title={error ? 'Advertencia!' : 'Aviso'}
        message={message}
        type={error ? 'danger' : 'success'}
        showToast={showToast}
        closeToast={handleHideToast}
      />
    </>
  );
};

export const loader = () => {
  return fetchData('artists');
};

export const Component = () => {
  return (
    <StoreArtistProvider>
      <Artists />
    </StoreArtistProvider>
  );
};
