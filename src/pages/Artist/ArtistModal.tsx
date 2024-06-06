import { ChangeEvent, MutableRefObject, useRef } from 'react';
import {
  Modal,
  Form,
  FloatingLabel,
  Row,
  Col,
  Button,
  Image,
  Alert,
} from 'react-bootstrap';
import { URL_SERVER_DOMAIN } from '../../constants';
import { IArtist } from '../../interfaces/Artist';

type ArtistModalProps = {
  isEdit: boolean;
  showModal: boolean;
  validated: boolean;
  error: string;
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
  handleClose: () => void;
  referido: MutableRefObject<IArtist>;
};

// se puede usar formward para q la referencia esté en el padre
// y pasarle la data del artista para que lo llene
export const ArtistModal = ({
  isEdit,
  showModal,
  validated,
  error,
  handleSubmit,
  handleClose,
  referido,
}: ArtistModalProps) => {
  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const onChangeFileEvent = (event: ChangeEvent<HTMLInputElement>): void => {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const { result } = e.target;
      imagePreviewRef.current.src = result;
    };

    fileReader.readAsDataURL(event.target.files.item(0));
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
      inputName.value = referido.current.name;
      inputLastName.value = referido.current.lastname;
      inputBio.value = referido.current.bio;
      avatar.src = URL_SERVER_DOMAIN + referido.current.avatar;
    }
  };

  const onExited = () => {
    imagePreviewRef.current.src = '#';
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      aria-labelledby="contained-new-artist"
      centered
      backdrop="static"
      keyboard={false}
      onEntering={fillData}
      onExited={onExited}
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
          <FloatingLabel label="Apellido" className="mb-3" controlId="lastname">
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
                  ref={imagePreviewRef}
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
  );
};
