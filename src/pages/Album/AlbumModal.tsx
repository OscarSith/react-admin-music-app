import React, { ChangeEvent, useRef, useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { IAlbum } from '../../interfaces/Album';
import { fetchService } from '../../utils/utils';
import { useAuth } from '../../provider/AuthProvider';
import { URL_SERVER_DOMAIN } from '../../constants';

type AlbumModalProps = {
  showModal: boolean;
  closeModal: () => void;
  addAlbum: (album: IAlbum) => void;
  updateAlbum: (album: IAlbum) => void;
  deleteAlbum: (id: number) => void;
  artistId: number;
  albumSelected: IAlbum;
  toDelete: boolean;
};

const INITIAL_ALBUM: IAlbum = {
  name: '',
  id: 0,
  picture: '',
};

export const AlbumModal: React.FC<AlbumModalProps> = ({
  showModal,
  closeModal,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  artistId,
  albumSelected,
  toDelete,
}) => {
  const { user } = useAuth();
  const imageRef = useRef(null);
  const [albumData, setAlbumData] = useState<IAlbum>(INITIAL_ALBUM);
  const [isTouched, setIsTouched] = useState({ name: false, picture: false });

  const handlePickImage = (event: ChangeEvent<HTMLInputElement>) => {
    let file = '';
    if (event.target.files.item(0)) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const { result } = e.target;
        imageRef.current.src = result.toString();
      };

      reader.readAsDataURL(event.target.files.item(0));
      file = event.target.files.item(0).name;
    } else {
      file = '';
    }

    setAlbumData((prev) => ({
      ...prev,
      picture: file,
    }));
    if (!isTouched.picture) {
      setIsTouched((prev) => ({ ...prev, picture: !prev.picture }));
    }
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setAlbumData((prevState) => ({ ...prevState, name: event.target.value }));
    if (!isTouched.name)
      setIsTouched((prev) => ({ ...prev, name: !prev.name }));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (toDelete) {
      const result = await fetchService(
        'album/' + albumSelected.id,
        user.access_token,
        'DELETE',
      );
      console.log(result);
      deleteAlbum(albumSelected.id);
      handleCloseModal();
      return;
    }

    if (!(albumData.name.trim() !== '' && albumData.picture !== '')) {
      return;
    }

    if (albumSelected) {
      const formData = new FormData(event.currentTarget);
      const result: IAlbum = await fetchService(
        'album/' + albumSelected.id,
        user.access_token,
        'PUT',
        formData,
      );

      updateAlbum(result);
    } else {
      const formData = new FormData(event.currentTarget);
      formData.append('artistId', artistId.toString());

      const result: IAlbum = await fetchService(
        'album',
        user.access_token,
        'POST',
        formData,
      );
      addAlbum(result);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setAlbumData(INITIAL_ALBUM);
    closeModal();
  };

  const resetTouchedInputs = () => {
    setIsTouched((prevState) => ({
      ...prevState,
      name: false,
      picture: false,
    }));
  };

  const modalTitle = () => {
    if (toDelete) {
      return 'Advertencia!';
    }
    return `Modal ${albumSelected ? 'Actualizar' : 'nuevo'} Album`;
  };

  const actionButtonText = () => {
    if (toDelete) {
      return 'Eliminar';
    }
    return albumSelected ? 'Actualizar' : 'Agregar';
  };

  return (
    <Modal
      centered
      show={showModal}
      onHide={handleCloseModal}
      onExited={resetTouchedInputs}
      onEnter={() => {
        if (albumSelected) {
          setAlbumData(albumSelected);
        }
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-new-artist">{modalTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {toDelete ? (
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
                  value={albumData.name}
                  onChange={handleChangeName}
                  isInvalid={isTouched.name && albumData.name === ''}
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
                      isInvalid={isTouched.picture && albumData.picture === ''}
                    />

                    <Form.Control.Feedback type="invalid">
                      La imagen es requerida
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Image
                    ref={imageRef}
                    src={URL_SERVER_DOMAIN + albumData.picture}
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
