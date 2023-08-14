import { useContext } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import SongDisplay from "./SongDisplay";
import { countGenres, countTotalTime } from "../utils/countGenres";

const FavoriteSongs = (props) => {

  const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

  return <div>
    <h1>Favorites</h1>
    <p>{`We have ${favorites.length} songs in ${countGenres(favorites)} genres for a total of ${countTotalTime(favorites)} seconds of music!`}</p>
    <SongDisplay songs={favorites} />
  </div>
}

export default FavoriteSongs;