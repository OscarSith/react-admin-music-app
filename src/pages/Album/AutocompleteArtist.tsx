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
import { AutocompleteProps } from '../../types';
import { searchArtistsByFullname } from '../../services/AlbumServices';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const PREFIX_ID_ITEM = 'item';
const DEBOUNCE_TIME = 300;

export const AutocompleteArtist: React.FC<AutocompleteProps> = ({
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
      searchArtistsByFullname(searchDebounce).then((suggestions) => {
        setSugestions(suggestions);
      });
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
        const index = ++prev;
        const element = document.getElementById(PREFIX_ID_ITEM + index);
        if (element) element.focus();
        return index;
      });
    } else if (e.key === ARROW_UP && activar > 0) {
      setActivar((prev) => {
        const index = --prev;
        const element = document.getElementById(PREFIX_ID_ITEM + index);
        if (element) element.focus();
        return index;
      });
    } else if (e.key === 'Escape') {
      if (
        (e.target as HTMLElement).parentElement?.classList.contains(
          'list-group',
        )
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
    searchRef.current?.focus();
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
        {suggestions.length > 0 && (
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
