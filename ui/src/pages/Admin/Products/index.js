import "bootstrap-icons/font/bootstrap-icons.css";
import "./Products.css";
import "../Users/Users.css";
import Pagination from "../Users/Pagination";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total_rows: 0,
    total_pages: 1,
    search: "",
  });

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/products`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      .then((res) => {
        console.log(res);
        setProducts(res.data.rows);
      })
      .catch((error) => {
        if (error.response) toast.error(error.response.data.message);
      });
  }, []);

  const handleSubmit = () => {};

  const handleChange = () => {};

  function handlePageChange(newPage) {
    console.log("new page: " + newPage);
    setPagination({
      ...pagination,
      page: newPage,
    });
  }
  console.log("product: ", products);
  console.log("product.rows: ", products.rows);
  return (
    <>
      <div className="title-user">
        <h2>Products</h2>
      </div>
      <div className="container-search">
        <form className="form-search" onSubmit={handleSubmit}>
          <input
            className="input-search"
            placeholder="Search Products"
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
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>PRODUCT IMAGES</th>
              {/* <th>PHONE NUMBER</th> */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>
                  <Link to={`details/${product.user_id}`}>
                    <i className="bi bi-pencil-square icon-update"></i>
                  </Link>
                </td>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>{product.quantity}</td>
                <td>
                  <img
                    src={product.product_images[0]?.image.path}
                    width="100"
                    height="100"
                    alt=""
                  />
                </td>
                {/* <td>{product.phone_number}</td> */}
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
export default Products;
