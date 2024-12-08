import ReactPaginate from "react-paginate";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
const Pagination = ({ handlePageClick, pageCount, ...props }) => {
  return (
    <ReactPaginate
      previousLabel={
        <RiArrowLeftDoubleLine className='text-[25px] text-blue-800' />
      }
      nextLabel={
        <RiArrowLeftDoubleLine className='text-[25px] text-blue-800 rotate-180' />
      }
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
