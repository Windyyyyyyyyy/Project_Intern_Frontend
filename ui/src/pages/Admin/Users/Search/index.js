import "~/pages/Admin/Users/Users.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Search.css";

function Search() {
  return (
    <>
      <input className="input-search" placeholder="Search Users" />
      <button className="btn-search" type="submit">
        Go
      </button>
    </>
  );
}

export default Search;
