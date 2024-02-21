import "./Navigation.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "~/assets/images/logo_huflit.png";
import Button from "~/component/Button";
import Avatar from "~/component/Avatar";
import profile from "~/assets/images/avatar.jpg";
function Navigation() {
  return (
    <header className="navigation__wrapper">
      <div className="navigation__wrapper__inner">
        <div className="navigation__wrapper__inner__logo">
          <img src={Logo} alt="logo" width={100} />
        </div>
        <div className="navigation__wrapper__inner__search">
          <input type="text" placeholder="Search product" />
        </div>
        <div className="navigation__wrapper__inner__items">
          <div className="navigation__wrapper__inner__items__icon">
            <i className="bi bi-bag"></i>
          </div>
          <div className="navigation__wrapper__inner__items__icon">
            <i className="bi bi-clipboard"></i>
          </div>
          <div className="navigation__wrapper__inner__items__profile">
            <div>
              <Avatar path={profile} width={50} height={50} />
            </div>
            <div>
              <i className="bi bi-caret-down-fill"></i>
            </div>
          </div>
        </div>
        <div className="navigation__wrapper__inner__button">
          <Button value="Post" />
        </div>
      </div>
    </header>
  );
}
export default Navigation;
