import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-title">content</div>

      <div className="header-actions">
        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </div>
    </header>
  );
}
