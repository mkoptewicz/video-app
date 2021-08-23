import { Pagination } from "react-bootstrap";

const VideoPagination = ({
  videosPerPage,
  totalVideos,
  currentPage,
  onPaginate,
}) => {
  let pageNumbers = [];
  const lastPage = Math.ceil(totalVideos / videosPerPage);

  // << < [1] 2 3 > >>
  if (currentPage === 1) {
    pageNumbers = [1, 2, 3];
  }
  // << < [1] 2 > >>
  if (lastPage === 2) {
    pageNumbers = [lastPage - 1, lastPage];
  }
  // << < 4 5 [6] > >>
  if (lastPage !== 2 && currentPage === lastPage) {
    pageNumbers = [lastPage - 2, lastPage - 1, lastPage];
  }
  // << < 3 [4] 5 > >>
  if (currentPage > 1 && currentPage !== lastPage) {
    pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
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
