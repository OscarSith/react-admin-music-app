import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { IAlbum } from '../../interfaces/Album';
import { AutocompleteArtist } from './AutocompleteArtist';
import { AlbumItem } from './AlbumItem';
import { AlbumModal } from './AlbumModal';
import { albumsByArtistId } from '../../services/AlbumServices';
import { AlbumReducerActions } from '../../reducers/AlbumReducer';
import { useAlbumContext } from './store/StoreAlbumContext';

export const Album: React.FC = () => {
  const { albums, dispatch, toDelete, updateAlbumSelected } = useAlbumContext();
  const [artistId, setArtistId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (artistId) {
      setLoading(true);
      albumsByArtistId(artistId)
        .then((data: IAlbum[]) => {
          dispatch({
            type: AlbumReducerActions.SET,
            albums: data,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [artistId]);

  const handleShowModal = () => {
    updateAlbumSelected(null, true);
    setShowModal(true);
  };

  const handleShowModalEdit = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    toDelete.current = false;
  };

  return (
    <>
      <h2 className="text-center mb-3">Listado de albunes</h2>
      <Row>
        <Col>
          <AutocompleteArtist updateArtistId={setArtistId} />
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            disabled={artistId === 0}
            onClick={handleShowModal}
          >
            Nuevo
          </Button>
        </Col>
      </Row>
      <Row xs="2" md="3" lg={4} xl={5}>
        {loading ? (
          <Col className="w-100 text-center mt-4">
            <h2>Loading...</h2>
          </Col>
        ) : (
          albums.map((album) => {
            return (
              <AlbumItem
                key={album.id}
                album={album}
                showModal={handleShowModalEdit}
              />
            );
          })
        )}
        {!loading && albums.length === 0 && artistId > 0 && (
          <Col className="w-100 text-center mt-4">
            <h2>No hay resultados que mostrar</h2>
          </Col>
        )}
      </Row>
      <AlbumModal
        showModal={showModal}
        closeModal={handleHideModal}
        artistId={artistId}
      />
    </>
  );
};
