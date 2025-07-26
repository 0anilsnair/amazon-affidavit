import { useNavigate } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import './Dashboard.scss';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="app-name">🛒 Buy From Amazon</div>
        <button className="signin-button" onClick={() => navigate('/login')}>Sign In</button>
      </header>

      <main className="dashboard-content">
        <ProductList />
      </main>
    </div>
  );
};

export default Dashboard;
