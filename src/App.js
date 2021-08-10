import { useState, useEffect } from "react";
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
    publishedAt: "2021-06-30T21:45:07+00:00",
    imageUrl: "https://i.vimeocdn.com/video/1178479211_295x166?r=pad",
    isFavourite: false,
  },
  {
    id: "7lCDEYXw3mM",
    type: "youtube",
    name: "Google I/O 101: Q&A On Using Google APIs",
    viewCount: 3057,
    likeCount: 25,
    link: "https://www.youtube.com/watch?v=7lCDEYXw3mM",
    publishedAt: "2012-06-20T22:45:24.000Z",
    imageUrl: "https://i.ytimg.com/vi/7lCDEYXw3mM/mqdefault.jpg",
    isFavourite: false,
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

      if (addedVideos.some(vid => vid.id === +videoId)) {
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

      setAddedVideos([...addedVideos, formatedVideoData]);
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
          {addedVideos.length > 0 ? (
            <VideosList
              videos={addedVideos}
              onDelete={deleteVideoHandler}
              onFavourite={toggleFavouriteHandler}
              onDeleteAll={deleteAllHandler}
            />
          ) : (
            <p className="text-center fs-2 my-5">
              Your video collection is empty. You can add your first video above
            </p>
          )}
        </main>
      </Container>
    </div>
  );
}

export default App;
