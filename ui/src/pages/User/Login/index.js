import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
// import google from "../Components/Assets/google.png";
// import facebook from "../Components/Assets/facebook.png";

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

  const handleLogin = () => {
    const loginData = {
      phone_number: phone,
      password: password,
    };

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>LOGIN</h1>
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
          <Link to="/signup">
            <p>Sign up</p>
          </Link>
          <p>Forgot password?</p>
        </div>
        <button onClick={handleLogin}>Submit</button>
        <div className="loginButton google">
          {/* <img src={google} alt="" /> */}
          Google
        </div>
        <div className="loginButton facebook">
          {/* <img src={facebook} alt="" /> */}
          Facebook
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
