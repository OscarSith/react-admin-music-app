import React, { ChangeEvent, useRef, useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { IAlbum } from '../../interfaces/Album';
import { URL_SERVER_DOMAIN } from '../../constants';
import { AlbumModalProps } from '../../types';
import { AlbumReducerActions } from '../../reducers/AlbumReducer';
import {
  addAlbum,
  deleteAlbumById,
  updateAlbumById,
} from '../../services/AlbumServices';
import { INITIAL_ALBUM, useAlbumContext } from './store/StoreAlbumContext';

export const AlbumModal: React.FC<AlbumModalProps> = ({
  showModal,
  closeModal,
  artistId,
}) => {
  const { albumSelected, dispatch, toDelete } = useAlbumContext();
  const imageRef = useRef<any>(null);
  const [albumInputs, setAlbumInputs] = useState<IAlbum>(INITIAL_ALBUM);
  const [isTouched, setIsTouched] = useState({ name: false, picture: false });

  const handlePickImage = (event: ChangeEvent<HTMLInputElement>) => {
    let file = '';
    const fileElement = event.target.files?.item(0);

    if (fileElement !== null) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target !== null) {
          const { result } = e.target;
          imageRef.current.src = result?.toString();
        }
      };

      if (fileElement instanceof File) {
        reader.readAsDataURL(fileElement);
        file = fileElement.name;
      }
    } else {
      file = '';
    }

    setAlbumInputs((prev) => ({
      ...prev,
      picture: file,
    }));

    if (!isTouched.picture) {
      setIsTouched((prev) => ({ ...prev, picture: !prev.picture }));
    }
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setAlbumInputs((prevState) => ({ ...prevState, name: event.target.value }));

    if (!isTouched.name) {
      setIsTouched((prev) => ({ ...prev, name: !prev.name }));
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleDeleteAlbum();

    if (!(albumInputs.name.trim() !== '' && albumInputs.picture !== '')) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    if (albumSelected) {
      const result: IAlbum = await updateAlbumById(albumSelected.id, formData);

      dispatch({
        type: AlbumReducerActions.EDITED,
        albums: [result],
        id: albumSelected.id,
      });
    } else {
      formData.append('artistId', artistId.toString());

      const result: IAlbum = await addAlbum(formData);
      dispatch({
        type: AlbumReducerActions.ADDED,
        albums: [result],
      });
    }

    handleCloseModal();
  };

  const handleDeleteAlbum = async () => {
    if (toDelete.current && albumSelected) {
      await deleteAlbumById(albumSelected.id);
      dispatch({
        type: AlbumReducerActions.DELETED,
        id: albumSelected.id,
      });
      handleCloseModal();
      return;
    }
  };

  const handleCloseModal = () => {
    setAlbumInputs(INITIAL_ALBUM);
    closeModal();
  };

  const resetTouchedInputs = () => {
    handleCloseModal();
    setIsTouched((prevState) => ({
      ...prevState,
      name: false,
      picture: false,
    }));
  };

  const modalTitle = () => {
    if (toDelete.current) {
      return 'Advertencia!';
    }
    return `Modal ${albumSelected ? 'Actualizar' : 'nuevo'} Album`;
  };

  const actionButtonText = () => {
    if (toDelete.current) {
      return 'Eliminar';
    }
    return albumSelected ? 'Actualizar' : 'Agregar';
  };

  return (
    <Modal
      centered
      show={showModal}
      onExited={resetTouchedInputs}
      onEnter={() => {
        if (albumSelected) {
          setAlbumInputs(albumSelected);
        }
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-new-artist">{modalTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {toDelete.current && albumSelected ? (
            <p className="mb-0">
              Va a eliminar este album "{albumSelected.name}"?
            </p>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={albumInputs.name}
                  onChange={handleChangeName}
                  isInvalid={isTouched.name && albumInputs.name === ''}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es requerido
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col xs={7}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Seleccione una foto</Form.Label>
                    <Form.Control
                      type="file"
                      name="picture"
                      onChange={handlePickImage}
                      isInvalid={
                        isTouched.picture && albumInputs.picture === ''
                      }
                    />

                    <Form.Control.Feedback type="invalid">
                      La imagen es requerida
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Image
                    ref={imageRef}
                    src={URL_SERVER_DOMAIN + albumInputs.picture}
                    alt="Image preview"
                    thumbnail
                  />
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            {actionButtonText()}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
