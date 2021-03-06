const getYouTubeId = input => {
  input = input.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== input[2] ? input[2].split(/[^0-9a-z_-]/i)[0] : input[0];
};
const getVimeoId = input => {
  if (input.includes("vimeo.com")) {
    const idStart = input.lastIndexOf("/") + 1;
    return +input.slice(idStart);
  }
  return +input;
};

const getDailymotionId = input => {
  const string = input.match(
    /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/
  );
  if (string !== null) {
    return string[2].split("?")[0];
  }
  return input;
};

const getIdFromInput = {
  youtube: getYouTubeId,
  vimeo: getVimeoId,
  dailymotion: getDailymotionId,
};
export default getIdFromInput;
