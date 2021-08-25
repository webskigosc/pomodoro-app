function getMinutesAndSecondsFromTimeInSeconds(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return [minutes, seconds];
}

export { getMinutesAndSecondsFromTimeInSeconds };
