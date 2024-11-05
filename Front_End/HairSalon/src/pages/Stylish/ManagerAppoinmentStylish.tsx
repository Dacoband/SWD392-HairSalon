import React, { useEffect, useState } from "react";
import { getUserData } from "../../services/authSalon";

const ManagerAppoimentStylish = () => {
  const [userData, setUserData] = useState<{
    email: string;
    roleName: string;
    accountId: string;
    actorId: string;
  } | null>(null);

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.actorId}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ManagerAppoimentStylish;
