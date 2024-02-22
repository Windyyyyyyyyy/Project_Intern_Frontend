import "./Navigation.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "~/assets/images/logo_huflit.png";
import Button from "~/component/Button";
import Avatar from "~/component/Avatar";
import profile from "~/assets/images/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
function Navigation() {
  const navigate = useNavigate();
  return (
    <header className="navigation__wrapper">
      <div className="navigation__wrapper__inner">
        <div className="navigation__wrapper__inner__logo">
          <Link to="/">
            <img src={Logo} alt="logo" width={100} />
          </Link>
        </div>
        <div className="navigation__wrapper__inner__search">
          <input type="text" placeholder="Search product" />
          <div className="navigation__wrapper__inner__search__button">
            <Button type="submit" value={<i className="bi bi-search"></i>} />
          </div>
        </div>
        <div className="navigation__wrapper__inner__items">
          <div className="navigation__wrapper__inner__items__icon">
            <Link to="/">
              <i className="bi bi-bag"></i>
            </Link>
          </div>
          <div className="navigation__wrapper__inner__items__icon">
            <Link to="/my-products">
              <i className="bi bi-clipboard"></i>
            </Link>
          </div>
          <div className="navigation__wrapper__inner__items__profile">
            <div className="navigation__wrapper__inner__items__profile__avatar">
              <Avatar path={profile} width={35} height={35} />
            </div>
            <div className="navigation__wrapper__inner__items__profile__arrow">
              <i className="bi bi-caret-down-fill"></i>
            </div>
          </div>
        </div>
        <div className="navigation__wrapper__inner__button">
          <Button
            value="Post"
            onClick={() => {
              navigate("/post");
            }}
          />
        </div>
      </div>
    </header>
  );
}
export default Navigation;
