import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
import CreateNewCate from "./CreateNewCate";
function Categories() {
  const [categories, setCategories] = useState([]);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/categories", {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="category-wrapper">
      <div className="category-wrapper__title">
        <h2>Categories</h2>
      </div>
      <CreateNewCate />
      <div className="category-wrapper__table">
        <table className="categories">
          <thead>
            <tr className="header-table">
              <th>
                <i className="bi bi-plus icon-plus"></i>
              </th>
              <th>ID</th>
              <th>NAME</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.category_id}>
                <td>
                  <Link to={`details/${category.category_id}`}>
                    <i className="bi bi-pencil-square icon-update"></i>
                  </Link>
                </td>
                <td>{category.category_id}</td>
                <td>{category.category_name}</td>
                <td>{category.is_active ? "True" : "False"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Categories;
