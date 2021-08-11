const GetDateFromTimestamp = timestamp => {
  const publishingDate = new Date(timestamp).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return publishingDate;
};

export default GetDateFromTimestamp;
