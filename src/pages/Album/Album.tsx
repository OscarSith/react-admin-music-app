import { Button, Col, Row } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { fetchService } from '../../utils/utils';
import { IAlbum } from '../../interfaces/Album';
import { AutocompleteArtist } from './AutocompleteArtist';
import { AlbumItem } from './AlbumItem';
import { AlbumModal } from './AlbumModal';

export const Album: React.FC = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [artistId, setArtistId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [albumSelected, setAlbumSelected] = useState<IAlbum>(null);
  const toDeleteAlbum = useRef(false);

  useEffect(() => {
    if (artistId) {
      setLoading(true);
      fetchService('album/by-artist/' + artistId, user.access_token).then(
        (data: IAlbum[]) => {
          setAlbums(data.reverse());
          setLoading(false);
        },
      );
    }
  }, [artistId]);

  const addAlbum = (album: IAlbum) => {
    setAlbums((prev) => [album, ...prev]);
  };

  const updateAlbum = (updatedAlbum: IAlbum) => {
    setAlbums(
      albums.map((album) => {
        if (album.id === updatedAlbum.id) {
          return updatedAlbum;
        } else {
          return album;
        }
      }),
    );
  };

  const deleteAlbum = (id: number) => {
    setAlbums(albums.filter((album) => album.id !== id));
  };

  const handleShowModal = () => {
    setAlbumSelected(null);
    setShowModal(true);
  };

  const handleShowModalEdit = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    toDeleteAlbum.current = false;
  };

  return (
    <>
      <h2 className="text-center mb-3">Listado de albunes</h2>
      <Row>
        <Col>
          <AutocompleteArtist
            token={user.access_token}
            updateArtistId={setArtistId}
          />
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
          <h2>Loading...</h2>
        ) : (
          albums.map((album) => {
            return (
              <AlbumItem
                key={album.id}
                album={album}
                showModal={handleShowModalEdit}
                testGetAlbumSelected={(album, toDelete) => {
                  setAlbumSelected(album);
                  toDeleteAlbum.current = toDelete;
                }}
              />
            );
          })
        )}
        <Col>
          {!loading && albums.length === 0 && artistId > 0 && (
            <h2>No hay resultados que mostrar</h2>
          )}
        </Col>
      </Row>
      <AlbumModal
        showModal={showModal}
        closeModal={handleHideModal}
        addAlbum={addAlbum}
        updateAlbum={updateAlbum}
        deleteAlbum={deleteAlbum}
        artistId={artistId}
        albumSelected={albumSelected}
        toDelete={toDeleteAlbum.current}
      />
    </>
  );
};
