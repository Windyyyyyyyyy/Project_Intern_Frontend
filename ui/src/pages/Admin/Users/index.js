import "bootstrap-icons/font/bootstrap-icons.css";
import "./Users.css";
import Pagination from "./Pagination";
import Search from "./Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Users() {
  let [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const { page } = pagination;

  //get data from server
  useEffect(() => {
    axios.get(`http://localhost:8080/users?page=${page}`).then(({ data }) => {
      console.log(data);
      setUsers(data.rows);
      setPagination(data);
    });
  }, [page]);

  // const [filter, setFilter] = useState({
  //   page: 1,
  // });
  // const paramString = queryString.stringify(filter);
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/users`).then((res) => {
  //     console.log("Res: " + res.data);
  //     setPagination(res.data);
  //   });
  // }, []);

  function handlePageChange(newPage) {
    console.log("new page: " + newPage);
    setPagination({
      ...pagination,
      page: newPage,
    });
  }
  return (
    <>
      <div className="title-user">
        <h2>Users</h2>
      </div>
      <div className="container-search">
        <Search></Search>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
      <div className="table-user">
        <table className="users">
          <thead>
            <tr className="header-table">
              <th>
                <i className="bi bi-plus icon-plus"></i>
              </th>
              <th>ID</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>ADDRESS</th>
              <th>EMAIL</th>
              <th>PHONE NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>
                  <Link to={`details/${user.user_id}`}>
                    <i className="bi bi-pencil-square icon-update"></i>
                  </Link>
                </td>
                <td>{user.user_id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Users;
