import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../../services/ProfileAll'; 
import './ProfileAll.scss';
import { UserInfoData } from '../../models/type'; 

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserInfoData | null>(null); 
  // const role= localStorage.getItem(userDatas.roleName);
  const [loading, setLoading] = useState(true);
  const userId = '38f615e8-fdc0-416f-bb7a-e0abe1f073a6';

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserData(userId);
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!userData) {
    return <div className="error">No user data available.</div>;
  }

  return (
    <main role="main">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <a className="breadcrumb-link" href="#">Home</a>
          <span className="breadcrumb-separator">/</span>
          <a className="breadcrumb-link" href="#">Account</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Profile</span>
        </div>
        <a className="edit-profile-button" href="#">
          🛠️ Edit Profile
        </a>
      </div>
      {/* End Breadcrumb Section */}

      {/* Content Section */}
      <div className="content-container">
        <div className="profile-card">
          <div className="profile-image">
            <img src={userData.avatarImage || './img2.jpg'} alt="Profile" />
          </div>
          <div className="profile-info">
            <h1>{userData.MemberName || 'User Name'}</h1>
            {/* <small>{role || 'User Role'}</small> */}
            <a className="send-message-button" href="#">
              📩 Send a Message
            </a>
            <a className="report-user" href="#">
              🚩 Report this user
            </a>
          </div>
        </div>

        {/* User Details */}
        <div className="user-details">
          <h2>
            Hey, I am {userData.MemberName || 'User Name'}
            <span className="badge">Pro</span>
          </h2>
          <h4>
            {userData.Address || 'Location'} 
            <small>- Joined on {new Date(userData.DateOfBirth).toLocaleDateString() || 'Date'}</small>
          </h4>
        </div>

        {/* User Information */}
        <div className="user-info">
          <div className="info-column">
            <h4>Email:</h4>
            <p>{userData.Email || 'user@example.com'}</p>
          </div>
          <div className="info-column">
            <h4>Phone:</h4>
            <p>{userData.PhoneNumber || '(+00) 0000 0000'}</p>
          </div>
          <div className="info-column">
            <h4>Address:</h4>
            <p>{userData.Address || 'City, Country'}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
