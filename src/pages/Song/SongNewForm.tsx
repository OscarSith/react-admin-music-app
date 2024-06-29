import React, { ChangeEvent, useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { SongReducerActions } from '../../reducers/SongReducer';
import { saveSong } from '../../services/SongServices';
import { useStoreSong } from './store/StoreSongContext';

export const SongNewForm = ({
  albumId,
  toggleAcordion,
}: {
  albumId: number;
  toggleAcordion: () => void;
}) => {
  const { dispatch } = useStoreSong();
  const [loading, setLoading] = useState(false);

  const submitSong = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData(event.target);
    formData.set('albumId', albumId.toString());
    saveSong(formData)
      .then((song) => {
        dispatch({
          type: SongReducerActions.ADDED,
          song,
        });
        toggleAcordion();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Col>
      <Form onSubmit={submitSong}>
        <hr />
        <Row>
          <Col md="6">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" />
            </Form.Group>
          </Col>
          <Col md="6">
            <Row>
              <Col xs="auto">
                <Form.Group className="mb-3" controlId="song">
                  <Form.Label>Canción</Form.Label>
                  <Form.Control type="file" name="song" />
                </Form.Group>
              </Col>
              <Col className="align-self-end">
                <Form.Group className="mb-3 text-end">
                  <Button type="submit" variant="info" disabled={loading}>
                    Agregar
                    {loading && (
                      <Spinner
                        as="span"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        animation="border"
                      />
                    )}
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};
