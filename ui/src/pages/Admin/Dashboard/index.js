import "bootstrap-icons/font/bootstrap-icons.css";
import "./Dashboard.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "sonner";
function Dashboard() {
  const navigate = useNavigate();
  const [user, getUser] = useState({});

  //get token from local storage and decode it
  const getTokenFromLocalStorage = localStorage.getItem("token");
  const userObj = jwtDecode(getTokenFromLocalStorage);
  const { user_id } = userObj;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage}`,
        },
      })
      .then((response) => {
        console.log(response);
        getUser(response.data);
      });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin");
    toast.success("Sign out successfully!");
  };

  const navigateToUpdateInfo = () => {
    navigate("/admin/updateinfo");
  };

  return (
    <>
      <div className="title-dashboard">Dashboard</div>
      <div className="dashboard">
        <div className="dashboard__header">
          <i className="bi bi-person-circle dashboard__header__avatar"></i>
          <div className="dashboard__header__content">
            <p className="dashboard__header__content__firstly">Welcome back,</p>
            <p className="dashboard__header__content__secondly">Admin User</p>
            <p className="dashboard__header__content__thirdly">
              {user.role_id === 1 ? "Admin" : "User"}
            </p>
          </div>
          <div className="dashboard__header__buttons">
            <button
              type="submit"
              className="dashboard__header__buttons__first"
              onClick={handleSignOut}
            >
              Sign out
            </button>
            <button
              type="submit"
              className="dashboard__header__buttons__second"
              onClick={navigateToUpdateInfo}
            >
              Update
            </button>
          </div>
        </div>
        <div className="dashboard__titleinfo">Personal information</div>
        <div className="dashboard__body">
          <div className="dashboard__body__content">
            <div className="dashboard__body__content__innner">
              <span className="dashboard__body__content__innner--title">
                id
              </span>
              <span className="dashboard__body__content__innner--text">
                {user.user_id}
              </span>
            </div>
          </div>
          <div className="dashboard__body__content">
            <div className="dashboard__body__content__innner">
              <span className="dashboard__body__content__innner--title">
                first name
              </span>
              <span className="dashboard__body__content__innner--text">
                {user.first_name}
              </span>
            </div>
          </div>
          <div className="dashboard__body__content">
            <div className="dashboard__body__content__innner">
              <span className="dashboard__body__content__innner--title">
                last name
              </span>
              <span className="dashboard__body__content__innner--text">
                {user.last_name}
              </span>
            </div>
          </div>
          <div className="dashboard__body__content">
            <div className="dashboard__body__content__innner">
              <span className="dashboard__body__content__innner--title">
                address
              </span>
              <span className="dashboard__body__content__innner--text">
                {user.address}
              </span>
            </div>
          </div>
          <div className="dashboard__body__content">
            <div className="dashboard__body__content__innner">
              <span className="dashboard__body__content__innner--title">
                phone
              </span>
              <span className="dashboard__body__content__innner--text">
                {user.phone_number}
              </span>
            </div>
          </div>
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
export default Dashboard;
