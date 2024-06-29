import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Col, Collapse, Form, Row } from 'react-bootstrap';
import { albumsByArtistId } from '../../services/AlbumServices';
import { AutocompleteArtist } from '../Album/AutocompleteArtist';
import { IAlbum } from '../../interfaces/Album';
import { SongItem } from './SongItem';
import { fetchData } from '../../utils/fetchData';
import { SongNewForm } from './SongNewForm';

export const Song = () => {
  const [listAlbums, setListAlbums] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState(false);
  const [artistId, setArtistId] = useState(0);
  const [albumId, setAlbumId] = useState(0);
  const [openNewSong, setOpenNewSong] = useState(false);
  const refFoo = useRef<any>(null);

  useEffect(() => {
    getAlbumsByArtist();
  }, [artistId]);

  const getAlbumsByArtist = () => {
    if (artistId > 0) {
      setLoading(true);
      albumsByArtistId(artistId)
        .then((albums) => {
          setListAlbums(albums);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleChangeAlbum = async (event: ChangeEvent<HTMLSelectElement>) => {
    setAlbumId(parseInt(event.target.value));
    if (event.target.value !== '') {
      refFoo.current = fetchData('song/' + event.target.value + '/albums');
    }
  };

  const handleToogleOpenNewSong = () => {
    setOpenNewSong((prev) => !prev);
  };

  return (
    <>
      <h2 className="text-center mb-3">Listado de canciones</h2>
      <Row>
        <Col xs={7}>
          <AutocompleteArtist
            updateArtistId={(artistID) => setArtistId(artistID)}
          />
        </Col>
        <Col>
          <Form.Select
            aria-label="Seleccione un album"
            disabled={loading}
            onChange={handleChangeAlbum}
          >
            <option value="">
              {loading ? 'Cargando...' : 'Seleccione un album'}
            </option>
            {!loading &&
              listAlbums.map((album) => (
                <option value={album.id} key={album.id}>
                  {album.name}
                </option>
              ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={2} className="text-center">
          <Button
            type="button"
            variant="primary"
            aria-expanded={openNewSong}
            aria-controls="container-new-song"
            onClick={handleToogleOpenNewSong}
          >
            Nuevo
          </Button>
        </Col>
      </Row>
      <Collapse in={openNewSong}>
        <Row id="container-new-song">
          <SongNewForm
            albumId={albumId}
            toggleAcordion={handleToogleOpenNewSong}
          />
        </Row>
      </Collapse>
      <hr />
      {albumId > 0 && (
        <Suspense fallback={<p>Cargando la lista de canciones....</p>}>
          <SongItem data={refFoo.current} />
        </Suspense>
      )}
    </>
  );
};
