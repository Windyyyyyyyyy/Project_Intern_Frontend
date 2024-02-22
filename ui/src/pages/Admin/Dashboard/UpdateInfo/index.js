import "bootstrap-icons/font/bootstrap-icons.css";
import Avatar from "~/component/Avatar";
import "./UpdateInfo.css";
// import avatar from "~/assets/images/avatar.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function UpdateInfo() {
  const [selectedImage, setSelectedImage] = useState();
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };
  const adminObj = jwtDecode(getTokenFromLocalStorage());
  const { user_id } = adminObj;
  console.log(adminObj);
  //
  useEffect(() => {
    return () => {
      selectedImage && URL.revokeObjectURL(selectedImage);
    };
  }, [selectedImage]);
  //
  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setImage(response.data.image);
        setSelectedImage(response.data.image.image_path);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setAddress(response.data.address);
        setPhoneNumber(response.data.phone_number);
        setEmail(response.data.email);
      });
  }, [user_id]);
  //
  const handleImage = (e) => {
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    console.log(file);
    setSelectedImage(imgURL);
    setImage(file);
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("address", address);
    formData.append("phone_number", phoneNumber);
    formData.append("email", email);
    formData.append("image", image);

    const formDataToObj = {};
    formData.forEach((value, key) => {
      formDataToObj[key] = value;
    });
    console.log(formDataToObj);

    try {
      await axios
        .patch("http://localhost:8080/admin/update-profile", formData, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="title__updateinfo">
        <h2>Update Info</h2>
      </div>
      <form className="content-update" onSubmit={handleSubmit}>
        <div className="content-update__avatar">
          {image && <Avatar path={selectedImage} width="200" height="200" />}
          <div className="content-update__avatar--round">
            <input
              type="file"
              id="content-update__avatar__input"
              onChange={handleImage}
            />
            <i className="bi bi-camera"></i>
          </div>
        </div>
        <div className="content-update__inputs">
          <div className="content-update__inputs__inner">
            <div className="content-update__inputs__inner__input">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                className=""
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="content-update__inputs__inner__input">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                className=""
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="content-update__inputs__inner__input">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                className=""
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="content-update__inputs__inner__input">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                name="phone_number"
                className=""
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
            <div className="content-update__inputs__inner__input">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className=""
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="content-update__inputs__inner__btnSave">
              <button type="submit">Save</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default UpdateInfo;
