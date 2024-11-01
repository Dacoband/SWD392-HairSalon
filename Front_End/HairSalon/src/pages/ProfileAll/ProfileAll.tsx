import React, { useEffect, useState, CSSProperties } from 'react';
import { fetchUserData } from '../../services/ProfileAll';
import { UserInfoData } from '../../models/type';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserInfoData | null>(null);
  const userDataString = localStorage.getItem("userData");
  const userDatas = userDataString ? JSON.parse(userDataString) : null;
  const role = userDatas?.roleName;
  const userId = userDatas?.actorId;
  const [loading, setLoading] = useState(true);

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
  }, [userId]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!userData) {
    return <div style={styles.error}>No user data available.</div>;
  }

  return (
    <main role="main" style={styles.profileMain}>
      {/* Breadcrumb Section */}
      <div style={styles.breadcrumbContainer}>
        <a href="#" style={styles.editProfileButton}>🛠️ Edit Profile</a>
      </div>

      {/* Content Section */}
      <div style={styles.contentContainer}>
        <div style={styles.profileCard}>
          <div style={styles.profileImage}>
            <img
              src={userData.avatarImage || '../../assets/images/demo.jpg'}
              alt="Profile"
              style={styles.image}
            />
          </div>
          <div style={styles.profileInfo}>
            <h1 style={styles.name}>{userData.MemberName || 'User Name'}</h1>
            <h3 style={styles.role}>{role || 'User Role'}</h3>
          </div>
        </div>

        {/* User Details */}
        <div style={styles.userDetails}>
          <h2>Welcome, {userData.MemberName || 'User Name'}!</h2>
        </div>

        {/* User Information */}
        <div style={styles.userInfo}>
          <div style={styles.infoColumn}>
            <h4>Email:</h4>
            <p>{userData.Email || 'user@example.com'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Phone Number:</h4>
            <p>{userData.PhoneNumber || '(+00) 0000 0000'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Date of Birth:</h4>
            <p>{userData.DateOfBirth ? new Date(userData.DateOfBirth).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Address:</h4>
            <p>{userData.Address || 'City, Country'}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

// Inline CSS styles with CSSProperties type
const styles: { [key: string]: CSSProperties } = {
  profileMain: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
  },
  breadcrumbContainer: {
    marginBottom: '20px',
    display: 'flex',
     justifyContent: 'flex-end'
  },
  editProfileButton: {
    textDecoration: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
   
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  profileImage: {
    marginRight: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  profileInfo: {
    textAlign: 'left',
  },
  name: {
    margin: '0',
    fontSize: '1.5em',
  },
  role: {
    margin: '0',
    fontWeight: 'normal',
    color: '#555',
  },
  userDetails: {
    textAlign: 'center',
  },
  userInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  infoColumn: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
    borderRadius: '5px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: '#333',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: 'red',
  },
};

export default Profile;

// import React, { useEffect, useState } from 'react';
// import { fetchUserData } from '../../services/ProfileAll'; 
// import './ProfileAll.scss';
// import { UserInfoData } from '../../models/type'; 

// const Profile: React.FC = () => {
//   const [userData, setUserData] = useState<UserInfoData | null>(null); 
//   const userDataString = localStorage.getItem("userData");
//   const userDatas = userDataString ? JSON.parse(userDataString) : null;
//  const role= userDatas.roleName ;
//  const userId = userDatas.actorId ;
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     const getUserData = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchUserData(userId);
//         setUserData(data);
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUserData();
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (!userData) {
//     return <div className="error">No user data available.</div>;
//   }

//   return (
//     <main role="main">
//       {/* Breadcrumb Section */}
//       <div className="breadcrumb-container">
//         <a className="edit-profile-button" href="#">
//           🛠️ Edit Profile
//         </a>
//       </div>
//       {/* End Breadcrumb Section */}

//       {/* Content Section */}
//       <div className="content-container">
//         <div className="profile-card">
//           <div className="profile-image">
//             <img src={userData.avatarImage || '../../assets/images/demo.jpg'} alt="Profile" />
//           </div>
//           <div className="profile-info">
//             <h1>{userData.MemberName || 'User Name'}</h1>
//             {/* <small>{role || 'User Role'}</small> */}
//           </div>
//         </div>

//         {/* User Details */}
//         <div className="user-details">
//           <h2>
//             Rất vui được phục vụ bạn  {userData.MemberName || 'User Name'}
            
//           </h2>
     
//         </div>

//         {/* User Information */}
//         <div className="user-info">
//           <div className="info-column">
//             <h4>Email:</h4>
//             <p>{userData.Email ? userData.Email : 'user@example.com'}</p>
//           </div>
//           <div className="info-column">
//             <h4>Số điện thoại:</h4>
//             <p>{userData.PhoneNumber || '(+00) 0000 0000'}</p>
//           </div>
//           <div className="info-column">
//             <h4>Ngày sinh:</h4>
//             <p>{new Date(userData.DateOfBirth).toLocaleDateString() || 'user@example.com'}</p>
//           </div>
//           <div className="info-column">
//             <h4>Địa chỉ:</h4>
//             <p>{userData.Address || 'City, Country'}</p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Profile;
