import { useEffect, useState } from "react";
import { countGenres, countTotalTime } from "../utils/countGenres";
import SongDisplay from "./SongDisplay";

const AllSongs = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('https://cs571.org/s23/hw5/api/songs', {
      headers: {
        "X-CS571-ID": "bid_2b48c7a36a98db55355d"
      }
    })
      .then(response => response.json())
      .then(data => setSongs(data));
  }, []);

  return <div>
    <h1>Songs</h1>
    <p>{`We have ${songs.length} songs in ${countGenres(songs)} genres for a total of ${countTotalTime(songs)} seconds of music!`}</p>
    <SongDisplay songs={songs} />
  </div>
}

export default AllSongs;