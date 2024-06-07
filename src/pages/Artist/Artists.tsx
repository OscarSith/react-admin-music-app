import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Button } from 'react-bootstrap';
import { IArtist } from '../../interfaces/Artist';
import { useAuth } from '../../provider/AuthProvider';
import { fetchService } from '../../utils/utils';
import {
  ArtistReducer,
  ArtistReducerActions,
} from '../../reducers/ArtistReducer';
import { ArtistModal } from './ArtistModal';
import { ArtistTable } from './ArtistTable';
import { CustomToast } from '../../components/CustomToast';

const emptyArtist: IArtist = {
  avatar: '',
  bio: '',
  id: 0,
  lastname: '',
  name: '',
  created_at: '',
};

export const Artists: React.FC = () => {
  const { user } = useAuth();
  const [artists, dispatch] = useReducer(ArtistReducer, []);
  const editArtistRef = useRef<IArtist>(emptyArtist);

  // States
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchService('artists', user.access_token).then((data: IArtist[]) =>
      dispatch({
        type: ArtistReducerActions.SET,
        artists: data.reverse(),
      }),
    );
  }, []);

  const handleCloseModal = () => {
    if (isEdit) setIsEdit(false);
    editArtistRef.current = emptyArtist;
    setShowModal(false);
    setValidated(false);
    setError(false);
  };

  const handleShowModal = () => {
    setError(false);
    if (showToast) {
      setShowToast(false);
    }
    setMessage('');
    setShowModal(true);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.target;

    if (!validated) {
      setValidated(true);
    }

    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      const data = new FormData(form);
      let url = 'artists';

      if (isEdit) {
        url = url + '/' + editArtistRef.current.id;
      }

      fetchService(url, user.access_token, isEdit ? 'PUT' : 'POST', data)
        .then((newArtist: IArtist) => {
          if (isEdit) {
            dispatch({
              type: ArtistReducerActions.EDITED,
              artists: [newArtist],
              id: newArtist.id,
            });
            handleShowToast(
              `Artista "${newArtist.name}" actualizado exitosamente`,
            );
          } else {
            dispatch({
              type: ArtistReducerActions.ADDED,
              artists: [newArtist],
            });
            handleShowToast(
              `Artista "${newArtist.name}" agregado exitosamente`,
            );
          }
          handleCloseModal();
        })
        .catch((e: Error) => {
          setError(true);
          setMessage(e.message);
        });
    }
  };

  const handleEdit = useCallback(
    (artist: IArtist): void => {
      setIsEdit(true);
      handleShowModal();
      editArtistRef.current = artist;
    },
    [artists],
  );

  const handlerDelete = useCallback(
    (artist: IArtist): void => {
      if (confirm('Va eliminar a este artista: ' + artist.name)) {
        fetchService('artists/' + artist.id, user.access_token, 'DELETE')
          .then(() => {
            dispatch({ type: ArtistReducerActions.DELETED, id: artist.id });
            handleShowToast(`Se eliminó el artista "${artist.name}"`);
          })
          .catch((reason: Error) => {
            handleShowToast(reason.message, true);
          });
      }
    },
    [artists],
  );

  const handleShowToast = (message: string, error: boolean = false) => {
    if (error) {
      setError(true);
    }

    setShowToast(true);
    setMessage(message);
  };

  return (
    <>
      <h2 className="text-center mb-3">Lista de Artistas</h2>
      <div className="mb-2">
        <Button type="button" variant="primary" onClick={handleShowModal}>
          Nuevo
        </Button>
      </div>
      <ArtistTable
        artists={artists}
        handleEdit={handleEdit}
        handlerDelete={handlerDelete}
      />
      <ArtistModal
        referido={editArtistRef}
        isEdit={isEdit}
        handleSubmit={handleSubmit}
        handleClose={handleCloseModal}
        error={message}
        showModal={showModal}
        validated={validated}
      />
      <CustomToast
        title={error ? 'Advertencia!' : 'Aviso'}
        message={message}
        type={error ? 'danger' : 'success'}
        showToast={showToast}
        closeToast={() => setShowToast(false)}
      />
    </>
  );
};
