import { useState, useEffect } from "react";
import AddVideo from "./components/AddVideo";
import Header from "./components/Header";
import VideosList from "./components/VideosList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import formatVideoData from "./lib/formatVideoData";
import VideoPagination from "./components/VideoPagination";
import demoVideos from "./data/demoVideos";
const YOUTUBE_API_KEY = "AIzaSyAJE8etcZx5xXFvsR7vdWS8WY18UTrMP40";

function App() {
  const [addedVideos, setAddedVideos] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(8);

  useEffect(() => {
    const videos = JSON.parse(localStorage.getItem("addedVideos")) || [];
    setAddedVideos(videos);
  }, []);

  useEffect(() => {
    localStorage.setItem("addedVideos", JSON.stringify(addedVideos));
  }, [addedVideos]);

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

      if (!response.ok) {
        throw new Error(
          "We couldn't find the video. Make sure your link/Id is correct or try again later"
        );
      }
      const data = await response.json();

      const formatedVideoData = formatVideoData[videoType](data);

      const updatedVideos = [
        { ...formatedVideoData, addedAt: Date.now() },
        ...addedVideos,
      ];
      setAddedVideos(updatedVideos);
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

  const loadDemoHandler = () => setAddedVideos(demoVideos);
  //Pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = addedVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginateHandler = number => setCurrentPage(number);
  const videosPerPageHandler = number => setVideosPerPage(number);

  return (
    <>
      <Container>
        <Header />
        <main>
          <AddVideo
            onAddVideo={addVideoHandler}
            onLoadDemo={loadDemoHandler}
            isDuplicate={isDuplicate}
            error={error}
          />

          <VideosList
            videos={currentVideos}
            onDelete={deleteVideoHandler}
            onFavourite={toggleFavouriteHandler}
            onDeleteAll={deleteAllHandler}
            onSort={sortHandler}
            onVideosPerPage={videosPerPageHandler}
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
        <VideoPagination
          videosPerPage={videosPerPage}
          totalVideos={addedVideos.length}
          currentPage={currentPage}
          onPaginate={paginateHandler}
        />
      </Container>
    </>
  );
}

export default App;
