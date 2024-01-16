import "bootstrap-icons/font/bootstrap-icons.css";
import "./ChangePasswordAdmin.css";

function popupChangePassword(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-header">
          <h3 className="title">Change Password</h3>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <div className="popup-content">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}
export default popupChangePassword;
