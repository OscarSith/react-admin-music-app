import React from 'react';
import { Button, Card, CardBody, Col } from 'react-bootstrap';
import { formatCreateDate } from '../../utils/utils';
import { URL_SERVER_DOMAIN } from '../../constants';
import { AlbumItemProps } from '../../types';
import { useAlbumContext } from './store/StoreAlbumContext';

export const AlbumItem: React.FC<AlbumItemProps> = ({ album, showModal }) => {
  const { updateAlbumSelected, toDelete } = useAlbumContext();
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
                updateAlbumSelected(album);
                showModal();
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                updateAlbumSelected(album);
                toDelete.current = true;
                showModal();
              }}
            >
              Delete
            </Button>
          </div>
        </CardBody>
        <Card.Footer className="text-muted small">
          {album.created_at !== undefined && formatCreateDate(album.created_at)}
        </Card.Footer>
      </Card>
    </Col>
  );
};
