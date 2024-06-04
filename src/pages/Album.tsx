import { Button, Card, CardBody, Col, Row } from 'react-bootstrap';
import { useAuth } from '../provider/AuthProvider';
import React, { useEffect, useState } from 'react';
import { fetchService, formatCreateDate } from '../utils/utils';
import { URL_SERVER_API, URL_SERVER_DOMAIN } from '../constants';
import { IAlbum } from '../interfaces/Album';
import { AutocompleteArtist } from './AutocompleteArtist';

export const Album: React.FC = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [artistId, setArtistId] = useState<number>();

  useEffect(() => {
    if (artistId) {
      fetchService(
        URL_SERVER_API + 'album/by-artist/' + artistId,
        user.access_token,
      ).then((data: IAlbum[]) => {
        setAlbums(data.reverse());
      });
    }
  }, [artistId]);

  return (
    <>
      <h2 className="text-center mb-3">Listado de albunes</h2>
      <AutocompleteArtist
        token={user.access_token}
        updateArtistId={setArtistId}
      />
      <Row xs="2" md="3" lg={4} xl={5}>
        {albums.map((album) => {
          return (
            <Col key={album.id}>
              <Card className="mb-4">
                <Card.Img
                  src={URL_SERVER_DOMAIN + album.picture}
                  alt={'Album ' + album.name}
                  variant="top"
                />
                <CardBody>
                  <Card.Title>{album.name}</Card.Title>
                  <Button size="sm" variant="success">
                    Edit
                  </Button>
                </CardBody>
                <Card.Footer className="text-muted small">
                  {formatCreateDate(album.created_at)}
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
