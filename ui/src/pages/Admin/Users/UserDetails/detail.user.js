import "bootstrap/dist/css/bootstrap.css";
import defaultAvatar from "~/assets/images/avatar.jpg";
import "./UserDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Popup from "~/component/Popup/Change_Password_Admin";

function DetailUser() {
  const { id } = useParams();
  // console.log(id);
  // const request = "http://localhost:8080/users/" + id;
  // console.log(request);
  const [user, setUser] = useState({});
  const [btnChange, setBtnchange] = useState(false);
  let [formChangePass, setFormChangePass] = useState({
    UserID: Number(id),
  });
  const [time, setTime] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/users/${id}`).then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    }
  }, [id]);

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
        .post(`http://localhost:8080/changepassword`, formChangePass)
        .then((res) => {
          console.log(res);
          alert("Changed successfully!");
        });
    } catch (error) {
      console.error("error: " + error);
      alert("Changed failed!");
    }
    setBtnchange(false);
  };
  return (
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
            <button className="change-btn" onClick={() => setBtnchange(true)}>
              Change Password
            </button>
            <Popup trigger={btnChange} setTrigger={setBtnchange}>
              <form className="formChange" onSubmit={handleSubmit}>
                <input
                  type="password"
                  id="Currentpassword"
                  name="CurrentPassword"
                  placeholder="Current password"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  id="Newpassword"
                  name="NewPassword"
                  placeholder="New password"
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="update-btn"
                  onClick={() => setBtnchange(true)}
                >
                  Update
                </button>
              </form>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailUser;
