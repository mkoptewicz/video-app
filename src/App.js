import { useState, useEffect } from "react";

import AddVideo from "./components/AddVideo";
import Header from "./components/Header";
import VideosList from "./components/VideosList";
import VideoPagination from "./components/UI/VideoPagination";

import formatVideoData from "./lib/formatVideoData";
import demoVideos from "./data/demoVideos";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [addedVideos, setAddedVideos] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(3);

  const displayedVideos = filterIsActive
    ? addedVideos.filter(vid => vid.isFavourite)
    : addedVideos;

  useEffect(() => {
    const videos = JSON.parse(localStorage.getItem("addedVideos")) || [];
    setAddedVideos(videos);
  }, []);

  useEffect(() => {
    localStorage.setItem("addedVideos", JSON.stringify(addedVideos));
  }, [addedVideos]);

  const addVideoHandler = async (videoId, videoType) => {
    setIsLoading(true);
    const endpoints = {
      youtube: `/.netlify/functions/youtube?id=${videoId}`,
      vimeo: `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`,
      dailymotion: `https://api.dailymotion.com/video/${videoId}?fields=id,title,created_time,embed_url,likes_total,thumbnail_360_url,url,views_total`,
    };

    try {
      setError("");

      if (addedVideos.some(vid => vid.id === videoId)) {
        setIsLoading(false);
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
    setCurrentPage(1);
    setIsLoading(false);
    setIsDuplicate(false);
  };

  const deleteVideoHandler = id => {
    const isLast = id === displayedVideos[displayedVideos.length - 1].id;
    const isOnlyOneOnPage =
      isLast && displayedVideos.length % videosPerPage === 1;

    const updatedVideos = addedVideos.filter(vid => vid.id !== id);
    setAddedVideos(updatedVideos);

    if (currentPage > 1 && isOnlyOneOnPage) {
      setCurrentPage(prevPage => prevPage - 1);
    }
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

  const toggleFilterHandler = () => {
    setFilterIsActive(filterIsActive => !filterIsActive);
    setCurrentPage(1);
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

  const loadDemoHandler = () => setAddedVideos([...addedVideos, ...demoVideos]);

  //Pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = displayedVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

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
            onFilter={toggleFilterHandler}
            filterIsActive={filterIsActive}
            isLoading={isLoading}
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
        {displayedVideos.length > videosPerPage && (
          <VideoPagination
            videosPerPage={videosPerPage}
            totalVideos={displayedVideos.length}
            currentPage={currentPage}
            onPaginate={paginateHandler}
          />
        )}
      </Container>
    </>
  );
}

export default App;
