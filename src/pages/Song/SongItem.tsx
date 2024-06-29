import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { ISong } from '../../interfaces/Song';
import { useStoreSong } from './store/StoreSongContext';
import { SongReducerActions } from '../../reducers/SongReducer';
import { URL_SERVER_DOMAIN } from '../../constants';
import { updateSongName } from '../../services/SongServices';

import './SongItem.css';

export const SongItem = ({ data }: { data: any }) => {
  const { dispatch, songs } = useStoreSong();
  const songsData = data.read() as ISong[];
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const currentIndex = useRef(-1);

  useEffect(() => {
    dispatch({
      type: SongReducerActions.SET,
      songs: songsData,
    });
  }, [songsData]);

  useEffect(() => {
    if (inputRef.current[currentIndex.current]) {
      inputRef.current[currentIndex.current].focus();
    }
  }, [active]);

  const handleUpdateNameSong = (
    event: ChangeEvent<HTMLFormElement>,
    id: number,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    updateSongName(formData, id).then((song) => {
      console.log(data);
      showInputName(-1);
      dispatch({
        type: SongReducerActions.EDITED,
        song,
      });
    });
  };

  const showInputName = (index: number) => {
    setActive(index);
    currentIndex.current = index;
  };

  if (songs.length === 0) {
    return <p className="p-3 text-center">No hay resultados que mostrar.</p>;
  }

  return (
    <Row>
      <Col>
        <ListGroup id="container-list-songs">
          {songs.map((song, index) => {
            const toggle: boolean = index === active;
            return (
              <ListGroup.Item
                key={song.id}
                className="d-flex align-items-center justify-content-between"
              >
                <div
                  className={
                    'd-flex justify-content-between align-items-center w-100 me-4 ' +
                    (toggle ? 'd-none' : '')
                  }
                >
                  <strong>{song.name}</strong>
                  <Button
                    size="sm"
                    variant="outline-success d-none"
                    onClick={() => showInputName(index)}
                  >
                    Edit
                  </Button>
                </div>
                <Form
                  className={'d-flex w-100 me-4 ' + (toggle ? '' : 'd-none')}
                  onSubmit={(event: ChangeEvent<HTMLFormElement>) =>
                    handleUpdateNameSong(event, song.id)
                  }
                >
                  <Form.Control
                    className={'w-100'}
                    ref={(input: HTMLInputElement) =>
                      (inputRef.current[index] = input)
                    }
                    type="text"
                    size="sm"
                    name="name"
                    defaultValue={song.name}
                  />
                  <Button
                    size="sm"
                    type="button"
                    variant="danger"
                    onClick={() => showInputName(-1)}
                  >
                    Cancel
                  </Button>
                </Form>

                <audio src={URL_SERVER_DOMAIN + song.picture} controls></audio>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
    </Row>
  );
};
