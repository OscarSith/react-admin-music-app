import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { IArtist } from '../../interfaces/Artist';
import { URL_SERVER_API } from '../../constants';
import { useAuth } from '../../provider/AuthProvider';
import { fetchService } from '../../utils/utils';
import {
  ArtistReducer,
  ArtistReducerActions,
} from '../../reducers/ArtistReducer';
import { ArtistModal } from './ArtistModal';
import { ArtistTable } from './ArtistTable';

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
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    console.log('Artists');
    fetchService(URL_SERVER_API + 'artists', user.access_token).then(
      (data: IArtist[]) =>
        dispatch({
          type: ArtistReducerActions.SET,
          artists: data.reverse(),
        }),
    );
  }, []);

  const handleClose = () => {
    if (isEdit) setIsEdit(false);
    editArtistRef.current = emptyArtist;
    setShowModal(false);
    setValidated(false);
    setError('');
  };

  const handleShow = () => {
    setError('');
    if (showToast) {
      setShowToast(false);
    }
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
      let url = URL_SERVER_API + 'artists';

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
          } else {
            dispatch({
              type: ArtistReducerActions.ADDED,
              artists: [newArtist],
            });
          }
          handleClose();
        })
        .catch((e: Error) => {
          setError(e.message);
        });
    }
  };

  const handleEdit = useCallback(
    (artist: IArtist): void => {
      setIsEdit(true);
      handleShow();
      editArtistRef.current = artist;
    },
    [artists],
  );

  const handlerDelete = useCallback(
    (artist: IArtist): void => {
      if (confirm('Va eliminar a este artista: ' + artist.name)) {
        fetchService(
          URL_SERVER_API + 'artists/' + artist.id,
          user.access_token,
          'DELETE',
        )
          .then(() => {
            dispatch({ type: ArtistReducerActions.DELETED, id: artist.id });
          })
          .catch((reason: Error) => {
            setShowToast(true);
            setError(reason.message);
          });
      }
    },
    [artists],
  );

  return (
    <>
      <h2 className="text-center mb-3">Lista de Artistas</h2>
      <div className="mb-2">
        <Button type="button" variant="primary" onClick={handleShow}>
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
        handleClose={handleClose}
        error={error}
        showModal={showModal}
        validated={validated}
      />
      <ToastContainer
        position="middle-center"
        style={{ position: 'sticky', bottom: '10%' }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          bg="danger"
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Advertencia!</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
