const addZero = num => (num < 10 ? `0${num}` : num);

function dateFormat(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hour = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

module.exports = dateFormat;
