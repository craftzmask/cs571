const countGenres = songs => {
  return songs
    .map(songs => songs.genre)
    .reduce((totalGenres, genre) => {
      return totalGenres.includes(genre) ? totalGenres : [...totalGenres, genre];
    }, [])
    .length;
}

const countTotalTime = songs => {
  return songs
    .map(songs => songs.length.split(':'))
    .reduce((totalSeconds, timeDuration) => {
      return totalSeconds + parseInt(timeDuration[0]) * 60 + parseInt(timeDuration[1]);
    }, 0)
}

export { countGenres, countTotalTime }