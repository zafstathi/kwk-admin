import React from "react";

import ReactPaginate from "react-paginate";
function Paginations({ handlePageClick, totalPages }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <nav aria-label="Page navigation example">
          <ReactPaginate
            containerClassName="pagination cursor-pointer mx-1 px-2 rounded"
            pageClassName="page-item cursor-pointer mx-1 px-2  rounded"
            activeClassName="active"
            breakLabel="..."
            nextLabel={nextbtn()}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel={previousBtn()}
            renderOnZeroPageCount={null}
          />
        </nav>
      </div>
    </div>
  );
}

export default Paginations;

const nextbtn = () => {
  return <li className="page-item">Next</li>;
};
const previousBtn = () => {
  return <li className="page-item">Previous</li>;
};
