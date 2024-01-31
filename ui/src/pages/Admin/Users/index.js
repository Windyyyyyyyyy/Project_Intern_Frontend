import "bootstrap-icons/font/bootstrap-icons.css";
import "./Users.css";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function Users() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  let [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total_rows: 0,
    total_pages: 1,
    search: "",
  });

  const { page, search } = pagination;
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  //get data from server
  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/users?page=${page}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.rows);
        setPagination(res.data);
      })
      .catch((error) => {
        console.log("Log: " + error);
        if (error.response && error.response.status === 401) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.response.data.message);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleChange(e) {
    const { name, value } = e.target;
    setPagination({
      ...pagination,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setPagination({
        ...pagination,
        page: 1,
      });
      await axios
        .get(
          `http://localhost:8080/admin/users?page=${page}&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setUsers(res.data.rows);
          setPagination(res.data);
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      }
      console.error("error: " + error);
    }
  }

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
        <form className="form-search" onSubmit={handleSubmit}>
          <input
            className="input-search"
            placeholder="Search Users"
            name="search"
            // onPageChange={handlePageChange}
            onChange={handleChange}
            value={pagination.search}
          />
          <button className="btn-search" type="submit">
            Go
          </button>
        </form>
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
      <Toaster
        position="top-center"
        duration={2000}
        theme="dark"
        expand={true}
      />
    </>
  );
}
export default Users;
