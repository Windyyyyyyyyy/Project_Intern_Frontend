import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { Toaster } from "sonner";
import { toast } from "sonner";
import "bootstrap-icons/font/bootstrap-icons.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (user.phone_number === "" || user.password === "") {
      toast.warning("Phone number/Password is required!");
    }

    try {
      const response = await axios.post("http://localhost:8080/register", user);
      console.log(response);
      console.log("1");
      toast.success(response.data.message);
      console.log("Phản hồi:", response.data);

      setTimeout(() => {
        console.log("2");
        navigate("/login");
      }, 2000);

      // Nếu bạn muốn chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      if (
        (error.response && error.response.status === 409) ||
        (error.response && error.response.status === 400)
      ) {
        toast.error(error.response.data.message);
      }
      console.error("Lỗi trong quá trình đăng ký:", error.message);
    }
  };

  return (
    <>
      <div className="loginsignup-wrapper">
        <form onSubmit={handleSubmit} className="form-register">
          <div className="loginsignup">
            <div className="loginsignup-container">
              <h1>Sign Up</h1>
              <div className="loginsignup-fields">
                <input
                  type="text"
                  placeholder="Firstname"
                  name="first_name"
                  value={user.first_name || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Lastname"
                  name="last_name"
                  value={user.last_name || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={user.address || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="E-mail"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone_number"
                  value={user.phone_number || ""}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Continue</button>
              <p className="loginsignup-login">
                Already have an account?
                <Link to="/login">
                  <span>Login here</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>

      <Toaster
        position="top-center"
        duration={2000}
        theme="dark"
        expand={true}
      />
    </>
  );
};

export default Signup;
