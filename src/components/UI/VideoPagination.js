import { Pagination } from "react-bootstrap";

const VideoPagination = ({
  videosPerPage,
  totalVideos,
  currentPage,
  onPaginate,
}) => {
  const pageNumbers = [];
  const lastPage = Math.ceil(totalVideos / videosPerPage);
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => onPaginate(1)} />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPaginate(currentPage - 1)}
      />
      {pageNumbers.map(number => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPaginate(number)}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === lastPage}
        onClick={() => onPaginate(currentPage + 1)}
      />
      <Pagination.Last onClick={() => onPaginate(lastPage)} />
    </Pagination>
  );
};

export default VideoPagination;
