import AddVideo from "./components/AddVideo";
import Header from "./components/Header";
import VideosList from "./components/VideosList";
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
  },
  {
    id: "7lCDEYXw3mM",
    type: "youtube",
    name: "Google I/O 101: Q&A On Using Google APIs",
    viewCount: 3057,
    likeCount: 25,
    link: "https://www.youtube.com/watch?v=7lCDEYXw3mM",
    publishedAt: "2012-06-20T22:45:24.000Z",
    imageUrl: "https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg",
  },
];
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <AddVideo />
        <VideosList videos={DUMMY_VIDEOS} />
      </main>
    </div>
  );
}

export default App;
