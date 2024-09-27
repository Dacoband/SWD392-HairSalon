import { useNavigate } from "react-router-dom";
const Role1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      Hello Role1
      <h1 onClick={() => navigate("/logout")}>Logout</h1>
    </div>
  );
};

export default Role1;
