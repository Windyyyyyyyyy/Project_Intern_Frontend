import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import "./User.css";

function User() {
  return (
    <>
      <div className="wrapper-user">
        <Navigation></Navigation>
        <div className="content-user">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default User;
