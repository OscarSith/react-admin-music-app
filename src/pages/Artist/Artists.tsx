import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Button } from 'react-bootstrap';
import { IArtist } from '../../interfaces/Artist';
import {
  ArtistReducer,
  ArtistReducerActions,
} from '../../reducers/ArtistReducer';
import { ArtistModal, emptyArtist } from './ArtistModal';
import { ArtistTable } from './ArtistTable';
import { CustomToast } from '../../components/CustomToast';
import { useFetch } from '../../hooks/useFetch';
import { IArtistsFetch } from '../../interfaces/globals';

export const Artists: React.FC = () => {
  const { data, loading }: IArtistsFetch = useFetch('artists');
  const [artists, dispatch] = useReducer(ArtistReducer, []);
  const editArtistRef = useRef<IArtist>(emptyArtist);

  // States
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toDelete = useRef(false);

  useEffect(() => {
    if (data) {
      dispatch({
        type: ArtistReducerActions.SET,
        artists: data.reverse(),
      });
    }
  }, [data]);

  const handleCloseModal = () => {
    setShowModal(false);
    toDelete.current = false;
  };

  const handleShowModal = useCallback(() => {
    if (showToast) {
      setShowToast(false);
    }
    setError(false);
    setMessage('');
    setShowModal(true);
  }, []);

  const handleGetArtist = useCallback((artist: IArtist, forDelete: boolean) => {
    toDelete.current = forDelete;
    editArtistRef.current = artist;
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

  return (
    <>
      <h2 className="text-center mb-3">Lista de Artistas</h2>
      <div className="mb-2">
        <Button type="button" variant="primary" onClick={handleShowModal}>
          Nuevo
        </Button>
      </div>
      {loading && (
        <p className="text-center p-3">Cargando listado de artistas</p>
      )}
      {!loading && (
        <ArtistTable
          artists={artists}
          handleGetArtist={handleGetArtist}
          showModal={handleShowModal}
        />
      )}
      <ArtistModal
        dispatch={dispatch}
        handleClose={handleCloseModal}
        error={message}
        showModal={showModal}
        artistRef={editArtistRef}
        toDelete={toDelete.current}
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
