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
    embedLink: `https://www.youtube.com/embed/${videoData.id}`,
    publishedAt: Date.parse(videoData.snippet.publishedAt),
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
    embedLink: `https://player.vimeo.com/video/${data.video_id}`,
    publishedAt: Date.parse(data.upload_date),
    imageUrl: data.thumbnail_url,
    isFavourite: false,
  };
};
const formatDailymotionData = data => {
  return {
    id: data.id,
    type: "dailymotion",
    name: data.title,
    viewCount: data.views_total,
    likeCount: data.likes_total,
    link: data.url,
    embedLink: data.embed_url,
    publishedAt: data.created_time,
    imageUrl: data.thumbnail_360_url,
    isFavourite: false,
  };
};

const formatVideoData = {
  youtube: formatYouTubeData,
  vimeo: formatVimeoData,
  dailymotion: formatDailymotionData,
};

export default formatVideoData;
