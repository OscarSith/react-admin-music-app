import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { useDebounce } from '@uidotdev/usehooks';
import { IArtist } from '../../interfaces/Artist';
import { fetchService } from '../../utils/utils';

type AutocompleteProps = {
  token: string;
  updateArtistId: (artistId: number) => void;
};

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const PREFIX_ID_ITEM = 'item';
const DEBOUNCE_TIME = 300;

export const AutocompleteArtist: React.FC<AutocompleteProps> = ({
  token,
  updateArtistId,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSugestions] = useState<IArtist[]>([]);
  const [activar, setActivar] = useState(0);
  const [search, setSearch] = useState('');
  const avoidSearchWhenClickASuggestion = useRef(false);
  const searchDebounce = useDebounce(search, DEBOUNCE_TIME);

  useEffect(() => {
    if (searchDebounce && !avoidSearchWhenClickASuggestion.current) {
      fetchService('artists/search-by?name=' + searchDebounce, token).then(
        (suggestions) => {
          setSugestions(suggestions);
        },
      );
    } else {
      setSugestions([]);
      avoidSearchWhenClickASuggestion.current = false;
    }
  }, [searchDebounce]);

  const handlerNavigate = (e: KeyboardEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    if (e.key === ARROW_DOWN || e.key === ARROW_UP) e.preventDefault();

    if (e.key === ARROW_DOWN && activar < suggestions.length) {
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

  const handleChangeInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    updateArtistId(0);
  };

  const handlerClickItem = (artistName: string, artistId: number) => {
    avoidSearchWhenClickASuggestion.current = true;
    setSearch(artistName);
    closeSuggestions();
    if (artistId) updateArtistId(artistId);
  };

  const closeSuggestions = (): void => {
    setSugestions([]);
    searchRef.current.focus();
    setActivar(0);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-3" onKeyDown={handlerNavigate}>
        <Form.Control
          type="search"
          placeholder="Escriba el artista"
          ref={searchRef}
          value={search}
          onChange={handleChangeInputSearch}
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
