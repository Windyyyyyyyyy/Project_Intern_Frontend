import "bootstrap/dist/css/bootstrap.css";
import defaultAvatar from "~/assets/images/avatar.jpg";
import "./UserDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toaster } from "sonner";
import ChangePassword from "./ChangePassword";

function DetailUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        });
    }
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img src={defaultAvatar} alt="avatar" className="img-fluid" />
          </div>
          <div className="col-8">
            <div className="col-12 cus-header">USER INFOMATION</div>
            <div className="mt-1">
              <div className="cus-info">
                <span>First Name:</span> {user?.first_name}
              </div>
              <div className="cus-info">
                <span>Last Name:</span> {user?.last_name}
              </div>
              <div className="cus-info">
                <span>Address:</span> {user?.address}
              </div>
              <div className="cus-info">
                <span>Email:</span> {user?.email}
              </div>
              <div className="cus-info">
                <span>Phone Number:</span> {user?.phone_number}
              </div>
              <div className="cus-info">
                <span>Password:</span> {user?.password}
              </div>
              <ChangePassword id={id} />
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
export default DetailUser;
