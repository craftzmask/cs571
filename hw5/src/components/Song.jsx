import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";

const Song = (props) => {
  const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

  return <Card>
    <Card.Img variant="top" src={props.img} alt={`${props.artist}'s album`} />
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Subtitle>by {props.artist}</Card.Subtitle>
      <Card.Text className="text-muted">
        {`${props.genre} | ${props.year} | ${props.length}`}
      </Card.Text>
      {favorites.find(song => song.id === props.id)
        ? <Button
          variant="danger"
          onClick={() => setFavorites(favorites.filter(song => song.id !== props.id))}>
          Remove from Favorites
        </Button>
        : <Button
          variant="primary"
          onClick={() => setFavorites(favorites.concat(props))}>
          Add to Favorites
        </Button>
      }
    </Card.Body>
  </Card>
}

export default Song;