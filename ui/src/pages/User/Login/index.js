import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "sonner";
import { toast } from "sonner";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      phone_number: phone,
      password: password,
    };
    if (loginData.phone_number === "" || loginData.password === "") {
      toast.warning("Phone number/Password is required!");
    }
    try {
      await axios
        .post("http://localhost:8080/login", loginData)
        .then((response) => {
          console.log(response);
          if (response && response.data.token) {
            const token = response.data.token;
            localStorage.setItem("token", token);
            toast.success(response.data.message);
          }
          // set timeout redirect
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
      console.error("Lỗi:", error.message);
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-container">
          <h1>LOGIN</h1>
          <form onSubmit={handleLogin} className="form-login">
            <div className="login-fields">
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={handlePhoneChange}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="login-p">
              <Link to="/register">
                <p>Sign up</p>
              </Link>
              <p>Forgot password?</p>
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className="loginButton google">Google</div>
          <div className="loginButton facebook">Facebook</div>
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
};

export default Login;
