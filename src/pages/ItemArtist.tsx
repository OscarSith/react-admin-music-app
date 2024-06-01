import { Button, Image } from 'react-bootstrap';
import { URL_SERVER_DOMAIN } from '../constants';
import { IArtist } from '../interfaces/Artist';
import { formatCreateDate } from '../utils/utils';

type ItemArtistProps = {
  artist: IArtist;
  handleDelete: (artist: IArtist) => void;
  handleOpenEdit: (artist: IArtist) => void;
};

export const ItemArtist: React.FC<ItemArtistProps> = ({
  artist,
  handleDelete,
  handleOpenEdit,
}) => {
  return (
    <tr key={artist.id}>
      <td>
        {artist.name} {artist.lastname}
      </td>
      <td>
        <Image
          src={URL_SERVER_DOMAIN + artist.avatar}
          alt={'Avatar ' + artist.name}
          thumbnail={true}
          rounded
        />
      </td>
      <td>{artist.bio}</td>
      <td>
        <small>{formatCreateDate(artist.created_at)}</small>
      </td>
      <td>
        <Button
          type="button"
          size="sm"
          variant="success"
          onClick={() => handleOpenEdit(artist)}
        >
          Edit
        </Button>
        <Button
          type="button"
          size="sm"
          variant="danger"
          onClick={() => handleDelete(artist)}
        >
          Del
        </Button>
      </td>
    </tr>
  );
};
