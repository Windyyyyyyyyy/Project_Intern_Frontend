import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import axios from "axios";
import "./Register.css";

const Signup = () => {
  // const state = { button: 1 };
  const [user, setUser] = useState({});
  const [redirectToUserList, setRedirectToUserList] = useState(false);

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
    console.log(e);
    console.log(user);
    try {
      const response = await axios.post("http://localhost:8080/register", user);
      console.log(user);
      console.log("Phản hồi:", response.data);

      // Nếu bạn muốn chuyển hướng sau khi đăng ký thành công
      setRedirectToUserList(true);
    } catch (error) {
      console.error("Lỗi trong quá trình đăng ký:", error.message);

      // Nếu bạn muốn xử lý các loại lỗi khác nhau
      // Ví dụ, nếu đó là lỗi mạng
      if (error.isAxiosError && error.response === undefined) {
        console.error("Lỗi Mạng:", error.message);
      }
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        console.error("Server responded with status", error.response.status);
        console.error("Response data:", error.response.data);
      }
      if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  if (redirectToUserList) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={handleSubmit}>
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
              type="number"
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
  );
};

export default Signup;
