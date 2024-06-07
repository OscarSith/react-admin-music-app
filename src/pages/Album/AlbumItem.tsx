import { Button, Card, CardBody, Col } from 'react-bootstrap';
import { formatCreateDate } from '../../utils/utils';
import { URL_SERVER_DOMAIN } from '../../constants';
import { IAlbum } from '../../interfaces/Album';
import React from 'react';

type AlbumItemProps = {
  album: IAlbum;
  showModal: () => void;
  testGetAlbumSelected: (album: IAlbum, toDelete?: boolean) => void;
};

export const AlbumItem: React.FC<AlbumItemProps> = ({
  album,
  showModal,
  testGetAlbumSelected,
}) => {
  return (
    <Col>
      <Card className="mb-4">
        <Card.Img
          src={URL_SERVER_DOMAIN + album.picture}
          alt={'Album ' + album.name}
          variant="top"
        />
        <CardBody>
          <Card.Title>{album.name}</Card.Title>
          <div className="d-flex justify-content-between">
            <Button
              size="sm"
              variant="success"
              onClick={() => {
                testGetAlbumSelected(album);
                showModal();
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                testGetAlbumSelected(album, true);
                showModal();
              }}
            >
              Delete
            </Button>
          </div>
        </CardBody>
        <Card.Footer className="text-muted small">
          {formatCreateDate(album.created_at)}
        </Card.Footer>
      </Card>
    </Col>
  );
};
