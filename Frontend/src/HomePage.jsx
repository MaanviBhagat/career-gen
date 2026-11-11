import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToAuth = () => {
    navigate('/Auth');  // capital A to match your route
  };

  return (
    <div className="home-container">
      <div className="content">
        <div className="buttons">
          <button className="btn" onClick={goToAuth}>Get Started</button>
          <button className="btn btn-outline" onClick={goToAuth}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;