import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  FloatingLabel,
  Modal,
  Table,
  Form,
  Image,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import { IArtist } from '../interfaces/Artist';
import { URL_SERVER_API, URL_SERVER_DOMAIN } from '../constants';
import { useAuth } from '../provider/AuthProvider';
import { fetchService } from '../utils/utils';
import { ItemArtist } from './ItemArtist';

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
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [editArtist, setEditArtist] = useState<IArtist>(emptyArtist);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState('#');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchService(URL_SERVER_API + 'artists', user.access_token).then(
      (data: IArtist[]) => setArtists(data.reverse()),
    );
  }, []);

  const handleClose = () => {
    setIsEdit(false);
    setEditArtist(emptyArtist);
    setShowModal(false);
    setValidated(false);
    setImagePreview('#');
    setError('');
  };

  const handleShow = () => setShowModal(true);

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
        url = url + '/' + editArtist.id;
      }
      fetchService(url, user.access_token, isEdit ? 'PUT' : 'POST', data)
        .then((newArtist: IArtist) => {
          if (isEdit) {
            for (let i = 0; i < artists.length; i++) {
              if (artists[i].id === newArtist.id) {
                // Al ejecutar handlerClose() hace que se vuelva a renderizar
                // toda esta página y el objeto artists ya se actualizó
                // asi que se refresca en la lista de artistas el cambio
                // sin la necesidad de ejecutar setArtists()
                artists[i] = Object.assign(artists[i], newArtist);
                break;
              }
            }
          } else {
            // setArtists((prevState) => [newArtist, ...prevState]);
            artists.unshift(newArtist);
          }
          handleClose();
        })
        .catch((e: Error) => {
          setError(e.message);
        });
    }
  };

  const handleEdit = (artist: IArtist): void => {
    setIsEdit(true);
    handleShow();
    setEditArtist(artist);
  };

  const handlerDelete = (artist: IArtist): void => {
    if (confirm('Va eliminar a este artista: ' + artist.name)) {
      fetchService(
        URL_SERVER_API + 'artists/' + artist.id,
        user.access_token,
        'DELETE',
      ).then(() => {
        setArtists((prevArtists) =>
          prevArtists.filter((a) => a.id !== artist.id),
        );
      });
    }
  };

  const fillData = () => {
    if (isEdit) {
      const inputName = document.getElementById('name') as HTMLInputElement;
      const inputLastName = document.getElementById(
        'lastname',
      ) as HTMLInputElement;
      const inputBio = document.getElementById('bio') as HTMLInputElement;
      const avatar = document.getElementById(
        'vista-previa',
      ) as HTMLImageElement;
      inputName.value = editArtist.name;
      inputLastName.value = editArtist.lastname;
      inputBio.value = editArtist.bio;
      avatar.src = URL_SERVER_DOMAIN + editArtist.avatar;
    }
  };

  const onChangeFileEvent = (event: ChangeEvent<HTMLInputElement>): void => {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const { result } = e.target;
      setImagePreview(result);
    };

    fileReader.readAsDataURL(event.target.files.item(0));
  };

  return (
    <>
      <h2 className="text-center mb-3">Lista de Artistas</h2>
      <div className="mb-2">
        <Button type="button" variant="primary" onClick={handleShow}>
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
          {artists.map((artist) => (
            <ItemArtist
              key={artist.id}
              artist={artist}
              handleDelete={handlerDelete}
              handleOpenEdit={handleEdit}
            />
          ))}
        </tbody>
      </Table>
      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="contained-new-artist"
        centered
        onEntering={fillData}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-new-artist">
              Modal {isEdit ? 'Actualizar' : 'Nuevo'} Artista
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                    required={!isEdit}
                    onChange={onChangeFileEvent}
                  />
                  <Form.Control.Feedback type="invalid">
                    La imagen es requerido
                  </Form.Control.Feedback>
                </Col>
                <Col>
                  <Image
                    id="vista-previa"
                    src={imagePreview}
                    alt="Imagen previa del avatar"
                    thumbnail={true}
                    rounded
                  />
                </Col>
              </Row>
            </Form.Group>
            {error !== '' && <Alert variant="warning">{error}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {isEdit ? 'Actualizar' : 'Agregar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
