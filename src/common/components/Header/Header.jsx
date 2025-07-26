import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../../constants/general";
import "./Header.scss";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="aff-label">
        All links are affiliate links; purchases may earn me a commission at no
        extra cost to you.
      </div>
      <header className="header">
        <div className="app-name">
          <i className="fas fa-shopping-bag"></i>
          {APP_NAME}
          {props?.isAdmin && <span className="admin-label">Admin</span>}
        </div>
        {!props?.isAdmin ? (
          <button className="product-btn" onClick={() => navigate("/login")}>
            <i className="fas fa-user"></i>
            Sign In
          </button>
        ) : (
          <div className="action-btns">
            <button
              className="product-btn"
              onClick={() => props?.addProductEvent()}
            >
              <i className="fas fa-plus"></i>
              Add Product
            </button>
            <button className="signin-btn" onClick={() => navigate("/")}>
              <i className="fas fa-sign-out"></i>
              Logout
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
