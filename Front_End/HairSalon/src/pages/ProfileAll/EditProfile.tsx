// import React, { useEffect, useState } from "react";
// import {
//   fetchUserProfile,
//   updateUserProfile,
//   UserProfile,
// } from "../../services/ProfileAll";

// const EditProfile: React.FC = () => {
//   const [userData, setUserData] = (useState < UserProfile) | (null > null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = (useState < string) | (null > null);
//   const userId = "98fd2bfb-b022-46d2-8110-460c99754e62";

//   // Load initial data
//   useEffect(() => {
//     const loadUserProfile = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchUserProfile(userId);
//         setUserData(data);
//       } catch (err) {
//         setError("Failed to fetch user data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUserProfile();
//   }, [userId]);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserData((prevData) =>
//       prevData ? { ...prevData, [name]: value } : null
//     );
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userData) return;

//     try {
//       await updateUserProfile(userId, userData);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       setError("Failed to update profile");
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h1>Edit Profile</h1>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <label style={styles.label}>
//           Name:
//           <input
//             type="text"
//             name="MemberName"
//             value={userData?.MemberName || ""}
//             onChange={handleChange}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Email:
//           <input
//             type="email"
//             name="Email"
//             value={userData?.Email || ""}
//             onChange={handleChange}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Phone Number:
//           <input
//             type="text"
//             name="PhoneNumber"
//             value={userData?.PhoneNumber || ""}
//             onChange={handleChange}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Date of Birth:
//           <input
//             type="date"
//             name="DateOfBirth"
//             value={userData?.DateOfBirth || ""}
//             onChange={handleChange}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Address:
//           <input
//             type="text"
//             name="Address"
//             value={userData?.Address || ""}
//             onChange={handleChange}
//             style={styles.input}
//           />
//         </label>
//         <button type="submit" style={styles.button}>
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     maxWidth: "600px",
//     margin: "0 auto",
//     padding: "20px",
//   },
//   form: {
//     display: "flex",
//     // flexDirection: 'column' as const,
//   },
//   label: {
//     marginBottom: "10px",
//     fontWeight: "bold",
//   },
//   input: {
//     padding: "8px",
//     fontSize: "1em",
//     borderRadius: "4px",
//     border: "1px solid #ddd",
//     marginTop: "5px",
//     marginBottom: "15px",
//   },
//   button: {
//     padding: "10px 15px",
//     fontSize: "1em",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default EditProfile;
