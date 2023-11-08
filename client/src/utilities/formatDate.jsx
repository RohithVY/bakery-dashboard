export const formatDate = (dateString) => {
  let date = new Date(dateString);
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: true,
  };
  let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};
