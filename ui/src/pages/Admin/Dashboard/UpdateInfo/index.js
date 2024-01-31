import Avatar from "~/component/Avatar";
import "./UpdateInfo.css";
import avatar from "~/assets/images/avatar.jpg";

function UpdateInfo() {
  return (
    <>
      <div className="title__updateinfo">
        <h2>Update Info</h2>
      </div>
      <form className="content-update">
        <div className="content-update__avatar">
          <Avatar path={avatar} width="200" height="200" />
          <input type="file" id="content-update__avatar__input" />
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
              />
            </div>
            <div className="content-update__inputs__inner__input">
              <label htmlFor="last_name">Last Name</label>
              <input id="last_name" name="last_name" className="" type="text" />
            </div>
            <div className="content-update__inputs__inner__input">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" className="" type="text" />
            </div>
            <div className="content-update__inputs__inner__input">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                name="phone_number"
                className=""
                type="text"
              />
            </div>
            <div className="content-update__inputs__inner__input">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" className="" type="text" />
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
