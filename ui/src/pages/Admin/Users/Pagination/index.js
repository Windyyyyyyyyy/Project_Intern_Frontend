import "./Pagination.css";
import "~/pages/Admin/Users/Users.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  // let [totalUser, setTotalUser] = useState(0);
  const { pagination, onPageChange } = props;
  const { page, total_pages } = pagination;
  // console.log(pagination);
  // const totalPages = Math.ceil(total_rows / limit);

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  return (
    <>
      <div className="btns">
        <button
          className="bi bi-chevron-left prev"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        ></button>
        <button
          className="bi bi-chevron-right next"
          disabled={page >= total_pages}
          onClick={() => handlePageChange(page + 1)}
        ></button>
      </div>
      <div className="page-number">
        Showing results<span>{page}</span>to<span>{total_pages}</span>
      </div>
    </>
  );
}

export default Pagination;
