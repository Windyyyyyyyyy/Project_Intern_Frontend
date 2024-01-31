import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "~/assets/images/logo_huflit.png";
import { useState } from "react";
import axios from "axios";
import { Toaster } from "sonner";
import { toast } from "sonner";

function LoginAdmin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    phone_number: "",
    password: "",
  });
  // let { phone_number, password } = admin;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (admin.phone_number === "" || admin.password === "") {
      toast.warning("Phone number/Password is required!");
    }
    try {
      await axios.post("http://localhost:8080/login", admin).then((res) => {
        console.log(res.data);
        if (res && res.data.token) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          toast.success(res.data.message);
        }
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
      console.error("Error: " + error);
    }
  };

  return (
    <>
      <div className="admin-login-wrapper">
        <div className="admin-login-inner">
          <Link to="/adminlogin" className="admin-login-logo">
            <img src={logo} alt="Logo Huflit" />
          </Link>
          <form onSubmit={handleSubmit} className="admin-login-form">
            <input
              type="text"
              name="phone_number"
              className="admin-login-form-phone input"
              placeholder="Phone Number"
              value={admin.phone_number || ""}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="admin-login-form-password input"
              placeholder="Password"
              value={admin.password || ""}
              onChange={handleChange}
            />
            <button type="submit" className="admin-login-form-btn">
              Login
            </button>
          </form>
        </div>
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

export default LoginAdmin;
