import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../constants/general';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="app-name">
        <i className="fas fa-shopping-bag"></i>
        {APP_NAME}
      </div>
      <button className="signin-btn" onClick={()=> navigate('/login')}>
        <i className="fas fa-user"></i>
        Sign In
      </button>
    </header>
  );
};


export default Header;