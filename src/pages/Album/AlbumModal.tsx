import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

type AlbumModalProps = {
  showModal: boolean;
  closeModal: () => void;
};

export const AlbumModal: React.FC<AlbumModalProps> = ({
  showModal,
  closeModal,
}) => {
  return (
    <Modal centered show={showModal}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-new-artist">Modal nuevo Album</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Agregar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
