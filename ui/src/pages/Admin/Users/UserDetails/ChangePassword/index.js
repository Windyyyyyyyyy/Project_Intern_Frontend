import Popup from "~/component/Popup/Change_Password_Admin";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import "bootstrap/dist/css/bootstrap.css";

function ChangePassword(props) {
  const [formChangePass, setFormChangePass] = useState({
    UserID: Number(props.id),
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [btnSubmit, setBtnSubmit] = useState(false);
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormChangePass({
      ...formChangePass,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formChangePass);
    try {
      await axios
        .post("http://localhost:8080/admin/changepassword", formChangePass, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res && res.status === 200) {
            toast.success(res.data.message);
            setBtnSubmit(false);
          }
        });
    } catch (error) {
      if (
        (error.response && error.response.status === 500) ||
        (error.response && error.response.status === 401)
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
      console.error("error: " + error);
    }
  };

  const hanldleIconCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleIconNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  return (
    <>
      <button className="change-btn" onClick={() => setBtnSubmit(true)}>
        Change Password
      </button>
      <Popup trigger={btnSubmit} setTrigger={setBtnSubmit}>
        <form className="formChange" onSubmit={handleSubmit}>
          <div className="input">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="Currentpassword"
              name="CurrentPassword"
              placeholder="Current password"
              onChange={handleChange}
            />
            <i
              className={`bi ${
                showCurrentPassword
                  ? "bi-eye icon-show"
                  : "bi-eye-slash icon-hide"
              }`}
              onClick={hanldleIconCurrentPassword}
            ></i>
          </div>
          <div className="input">
            <input
              type={showNewPassword ? "text" : "password"}
              id="Newpassword"
              name="NewPassword"
              placeholder="New password"
              onChange={handleChange}
            />
            <i
              className={`bi ${
                showNewPassword ? "bi-eye icon-show" : "bi-eye-slash icon-hide"
              }`}
              onClick={handleIconNewPassword}
            ></i>
          </div>

          <button
            type="submit"
            className="update-btn"
            onClick={() => setBtnSubmit(true)}
          >
            Update
          </button>
        </form>
      </Popup>
      <Toaster
        position="top-center"
        duration={2000}
        theme="dark"
        expand={true}
      />
    </>
  );
}
export default ChangePassword;
