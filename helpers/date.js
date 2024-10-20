export function formatDate(dateString, format) {
  const date = new Date(dateString);

  // Format the date according to the given format
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  let formattedDate = format
    .replace('dd', day)
    .replace('mm', month)
    .replace('yyyy', year)
    .replace('hh', hours)
    .replace('MM', minutes)
    .replace('ss', seconds);

  return formattedDate;
}
