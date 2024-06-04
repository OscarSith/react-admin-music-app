import React, { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { IArtist } from '../interfaces/Artist';
import { fetchService } from '../utils/utils';
import { URL_SERVER_API } from '../constants';

type AutocompleteProps = {
  token: string;
  updateArtistId: (artistId: number) => void;
};

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const PREFIX_ID_ITEM = 'item';

export const AutocompleteArtist: React.FC<AutocompleteProps> = ({
  token,
  updateArtistId,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSugestions] = useState<IArtist[]>([]);
  const [activar, setActivar] = useState(0);

  const handlerNavigate = (e: KeyboardEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    if (e.key === ARROW_DOWN || e.key === ARROW_UP) e.preventDefault();

    if (e.key === ARROW_DOWN && activar < 4) {
      setActivar((prev) => {
        const d = ++prev;
        const el = document.getElementById(PREFIX_ID_ITEM + d);
        if (el) el.focus();
        return d;
      });
    } else if (e.key === ARROW_UP && activar > 0) {
      setActivar((prev) => {
        const d = --prev;
        const el = document.getElementById(PREFIX_ID_ITEM + d);
        if (el) el.focus();
        return d;
      });
    } else if (e.key === 'Escape') {
      if (
        (e.target as HTMLElement).parentElement.classList.contains('list-group')
      ) {
        closeSuggestions();
      }
    }
  };

  const handlerChangeInputSearch = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value.length > 1) {
      const suggestions = (await fetchService(
        URL_SERVER_API + 'artists/search-by?name=' + e.target.value,
        token,
      )) as IArtist[];

      setSugestions(suggestions);
    } else {
      setSugestions([]);
    }
  };

  const handlerClickItem = (artistName: string, artistId: number) => {
    searchRef.current.value = artistName;
    closeSuggestions(artistId);
  };

  const closeSuggestions = (artistId: number = null): void => {
    setSugestions([]);
    searchRef.current.focus();
    setActivar(0);

    if (artistId) updateArtistId(artistId);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-3" onKeyDown={handlerNavigate}>
        <Form.Control
          type="search"
          placeholder="Escriba el artista"
          ref={searchRef}
          onChange={handlerChangeInputSearch}
        />
        {setSugestions.length > 0 && (
          <ListGroup>
            {suggestions.map((suggestion, i) => {
              return (
                <ListGroup.Item
                  action
                  active={activar === i + 1}
                  id={PREFIX_ID_ITEM + (i + 1)}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    handlerClickItem(e.currentTarget.innerText, suggestion.id);
                  }}
                  key={suggestion.id}
                >
                  {suggestion.fullname}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Form.Group>
    </Form>
  );
};
