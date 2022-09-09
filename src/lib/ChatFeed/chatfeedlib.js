export const getTime = () => {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let time;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  };

  if (hours > 12) {
    time = `${hours}:${minutes}pm`;
  } else {
    time = `${hours}:${minutes}am`;
  }

  return time;
}