import { useNavigate } from "react-router-dom";
import HomePage from "./Home/HomePage";

const Role1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HomePage />
      <h1 onClick={() => navigate("/logout")}>Logout</h1>
    </div>
  );
};

export default Role1;
