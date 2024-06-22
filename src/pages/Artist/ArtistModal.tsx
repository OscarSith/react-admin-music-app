import React, { ChangeEvent, useRef, useState } from 'react';
import {
  Modal,
  Form,
  FloatingLabel,
  Row,
  Col,
  Button,
  Image,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { URL_SERVER_DOMAIN } from '../../constants';
import { IArtist } from '../../interfaces/Artist';
import {
  addArtist,
  deleteArtist,
  updateArtist,
} from '../../services/ArtistCrudServices';
import { ArtistReducerActions } from '../../reducers/ArtistReducer';
import { ArtistModalProps } from '../../types';

export const emptyArtist: IArtist = {
  avatar: '',
  bio: '',
  id: 0,
  lastname: '',
  name: '',
  created_at: '',
};

export const ArtistModal = ({
  showModal,
  error,
  artistRef,
  toDelete,
  dispatch,
  handleClose,
  handleShowToast,
  handleError,
}: ArtistModalProps) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const handleCloseModal = () => {
    artistRef.current = emptyArtist;
    handleClose();
    setValidated(false);
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
      if (toDelete) {
        deleteArtist(
          artistRef.current.id,
          handleError,
          handleCloseModal,
          () => {
            dispatch({
              type: ArtistReducerActions.DELETED,
              id: artistRef.current.id,
            });
            handleShowToast(
              `Se eliminó el artista "${artistRef.current.name}"`,
            );
          },
        );
        return;
      }

      const formData = new FormData(form);
      setIsLoading(true);
      if (artistRef.current.id > 0) {
        updateArtist(
          artistRef.current.id,
          formData,
          handleError,
          handleCloseModal,
          (artistUpdated) => {
            if (artistUpdated) {
              dispatch({
                type: ArtistReducerActions.EDITED,
                artists: [artistUpdated],
                id: artistUpdated.id,
              });
              handleShowToast(
                `Artista "${artistUpdated.name}" actualizado exitosamente`,
              );
            }
          },
        ).finally(() => setIsLoading(false));
      } else {
        addArtist(formData, handleError, handleCloseModal, (newArtist) => {
          if (newArtist) {
            dispatch({
              type: ArtistReducerActions.ADDED,
              artists: [newArtist],
            });
            handleShowToast(
              `Artista "${newArtist.name}" agregado exitosamente.`,
            );
          }
        }).finally(() => setIsLoading(false));
      }
    }
  };

  const onChangeFileEvent = (event: ChangeEvent<HTMLInputElement>): void => {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const { result } = e.target;
      if (imagePreviewRef.current) {
        imagePreviewRef.current.src = result;
      }
    };

    const fileItem = (event.target.files as FileList).item(0);
    if (fileItem !== null) {
      fileReader.readAsDataURL(fileItem);
    }
  };

  const fillData = () => {
    if (artistRef.current.id > 0 && !toDelete) {
      const inputName = document.getElementById('name') as HTMLInputElement;
      const inputLastName = document.getElementById(
        'lastname',
      ) as HTMLInputElement;
      const inputBio = document.getElementById('bio') as HTMLInputElement;
      const avatar = document.getElementById(
        'vista-previa',
      ) as HTMLImageElement;
      inputName.value = artistRef.current.name;
      inputLastName.value = artistRef.current.lastname;
      inputBio.value = artistRef.current.bio;
      avatar.src = URL_SERVER_DOMAIN + artistRef.current.avatar;
    }
  };

  const onExited = () => {
    if (!toDelete && imagePreviewRef.current) {
      imagePreviewRef.current.src = '#';
    }
  };

  const headerTitle = () => {
    if (toDelete) {
      return 'Advertencia';
    }

    return `Modal ${artistRef.current.id > 0 ? 'Actualizar' : 'Nuevo'} Artista`;
  };

  const actionTextButton = () => {
    if (toDelete) {
      return 'Eliminar';
    }

    return artistRef.current.id > 0 ? 'Actualizar' : 'Agregar';
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      aria-labelledby="contained-new-artist"
      centered
      backdrop="static"
      keyboard={false}
      onEnter={fillData}
      onExit={onExited}
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          {headerTitle()}
          <Modal.Title id="contained-new-artist"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={'p-3 ' + (toDelete ? '' : 'd-none')}>
            Va eliminar a este artista:&nbsp;
            <strong>
              {artistRef.current.name + ' ' + artistRef.current.lastname}
            </strong>
          </p>
          <div className={toDelete ? 'd-none' : ''}>
            <FloatingLabel label="Nombre" className="mb-3" controlId="name">
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre"
                required
                minLength={2}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                El nombre es requerido
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label="Apellido"
              className="mb-3"
              controlId="lastname"
            >
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Apellido"
                minLength={2}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                El Apellido es requerido
              </Form.Control.Feedback>
            </FloatingLabel>
            <Form.Group className="my-3" controlId="bio">
              <Form.Label>Biografía</Form.Label>
              <Form.Control as="textarea" rows={2} name="bio" />
            </Form.Group>
            <Form.Group controlId="avatar" className="mb-3">
              <Row>
                <Col sm="8" lg="6">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    name="avatar"
                    required={artistRef.current.id === 0}
                    onChange={onChangeFileEvent}
                  />
                  <Form.Control.Feedback type="invalid">
                    La imagen es requerido
                  </Form.Control.Feedback>
                </Col>
                <Col>
                  <Image
                    id="vista-previa"
                    ref={imagePreviewRef}
                    alt="Imagen previa del avatar"
                    thumbnail={true}
                    rounded
                  />
                </Col>
              </Row>
            </Form.Group>
            {error !== '' && <Alert variant="warning">{error}</Alert>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {actionTextButton()}
            {isLoading && (
              <Spinner
                as="span"
                size="sm"
                role="status"
                aria-hidden="true"
                animation="border"
              />
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
