import { useState } from "react";
import AddVideo from "./components/AddVideo";
import Header from "./components/Header";
import VideosList from "./components/VideosList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import formatVideoData from "./lib/formatVideoData";
const YOUTUBE_API_KEY = "AIzaSyAJE8etcZx5xXFvsR7vdWS8WY18UTrMP40";

// const YOUTUBE_BASE_URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}`;
const DUMMY_VIDEOS = [
  {
    id: 569581368,
    type: "vimeo",
    name: "Starring Paul Muni - Criterion Channel Teaser",
    viewCount: 10,
    likeCount: 2,
    link: "https://vimeo.com/569581368",
    publishedAt: Date.parse("2021-06-30T21:45:07+00:00"),
    imageUrl: "https://i.vimeocdn.com/video/1178479211_295x166?r=pad",
    isFavourite: false,
    addedAt: 1628600000000,
  },
  {
    id: "7lCDEYXw3mM",
    type: "youtube",
    name: "Google I/O 101: Q&A On Using Google APIs",
    viewCount: 3057,
    likeCount: 25,
    link: "https://www.youtube.com/watch?v=7lCDEYXw3mM",
    publishedAt: Date.parse("2012-06-20T22:45:24.000Z"),
    imageUrl: "https://i.ytimg.com/vi/7lCDEYXw3mM/mqdefault.jpg",
    isFavourite: false,
    addedAt: 1628500000000,
  },
];

function App() {
  const [addedVideos, setAddedVideos] = useState(DUMMY_VIDEOS);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState("");

  const addVideoHandler = async (videoId, videoType) => {
    const endpoints = {
      youtube: `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics`,
      vimeo: `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`,
    };
    try {
      setError("");

      if (addedVideos.some(vid => vid.id === videoId)) {
        setIsDuplicate(true);
        return;
      }

      const response = await fetch(`${endpoints[videoType]}`);

      const data = await response.json();

      if (!response.ok || data.items?.length === 0) {
        throw new Error(
          "We couldn't find the video. Make sure your link/Id is correct or try again later"
        );
      }

      const formatedVideoData = formatVideoData[videoType](data);

      setAddedVideos([
        ...addedVideos,
        { ...formatedVideoData, addedAt: Date.now() },
      ]);
    } catch (err) {
      setError(
        "We couldn't find the video. Make sure your link/Id and site type is correct or try again later"
      );
    }

    setIsDuplicate(false);
  };

  const deleteVideoHandler = id => {
    const updatedVideos = addedVideos.filter(vid => vid.id !== id);
    setAddedVideos(updatedVideos);
  };

  const toggleFavouriteHandler = id => {
    const updatedVideos = addedVideos.map(vid => {
      if (vid.id === id) {
        vid.isFavourite = !vid.isFavourite;
        return vid;
      }
      return vid;
    });
    setAddedVideos(updatedVideos);
  };
  const deleteAllHandler = () => {
    setAddedVideos([]);
  };
  const sortHandler = mode => {
    let sortedVideos;
    switch (mode) {
      case "uploadOldestFirst":
        sortedVideos = [...addedVideos].sort(
          (a, b) => a.publishedAt - b.publishedAt
        );
        break;
      case "uploadNewestFirst":
        sortedVideos = [...addedVideos].sort(
          (a, b) => b.publishedAt - a.publishedAt
        );
        break;
      case "addOldestFirst":
        sortedVideos = [...addedVideos].sort((a, b) => a.addedAt - b.addedAt);
        break;
      case "addNewestFirst":
        sortedVideos = [...addedVideos].sort((a, b) => b.addedAt - a.addedAt);
        break;
      default:
        sortedVideos = addedVideos;
    }
    setAddedVideos(sortedVideos);
  };

  return (
    <div className="App">
      <Container>
        <Header />
        <main>
          <AddVideo
            onAddVideo={addVideoHandler}
            isDuplicate={isDuplicate}
            error={error}
          />

          <VideosList
            videos={addedVideos}
            onDelete={deleteVideoHandler}
            onFavourite={toggleFavouriteHandler}
            onDeleteAll={deleteAllHandler}
            onSort={sortHandler}
          />
          <div aria-live="polite">
            {addedVideos.length === 0 && (
              <p className="text-center fs-2 my-5">
                Your video collection is empty. You can add your first video
                above
              </p>
            )}
          </div>
        </main>
      </Container>
    </div>
  );
}

export default App;
