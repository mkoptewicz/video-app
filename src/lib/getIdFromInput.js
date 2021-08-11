const getYouTubeId = input => {
  //assuming YouTube video's id is always 11 characters long
  if (
    input.startsWith("https://www.youtube.com/") ||
    input.startsWith("https://youtu.be")
  ) {
    return input.slice(-11);
  }
  return input;
};
const getVimeoId = input => {
  if (input.includes("vimeo.com")) {
    const idStart = input.lastIndexOf("/") + 1;
    return +input.slice(idStart);
  }
  return +input;
};

const getIdFromInput = {
  youtube: getYouTubeId,
  vimeo: getVimeoId,
};
export default getIdFromInput;
