const formatYouTubeData = data => {
  const { items } = data;
  const [videoData] = items;
  return {
    id: videoData.id,
    type: "youtube",
    name: videoData.snippet.title,
    viewCount: videoData.statistics.viewCount,
    likeCount: videoData.statistics.likeCount,
    link: `www.youtube.com/watch?v=${videoData.id}`,
    publishedAt: videoData.snippet.publishedAt,
    imageUrl: videoData.snippet.thumbnails.medium.url,
    isFavourite: false,
  };
};
const formatVimeoData = data => {
  return {
    id: data.video_id,
    type: "vimeo",
    name: data.title,
    viewCount: null,
    likeCount: null,
    link: data.uri,
    publishedAt: data.upload_date,
    imageUrl: data.thumbnail_url,
    isFavourite: false,
  };
};

const formatVideoData = {
  youtube: formatYouTubeData,
  vimeo: formatVimeoData,
};

export default formatVideoData;
