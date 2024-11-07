import React, { useEffect, useState, CSSProperties } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import { fetchUserData, updateUserData } from '../../services/ProfileAll';
import { getBranchById } from '../../services/Branches/branches';
import { UserInfoData } from '../../models/type';


const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserInfoData | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | File>();
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  const [branchName, setBranchName] = useState<string | null>(null);
  const [editData, setEditData] = useState<UserInfoData | null>(null);

  const userDataString = localStorage.getItem("userData");
  const userDatas = userDataString ? JSON.parse(userDataString) : null;
 
  const role = userDatas?.roleName;

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserData(userDatas?.actorId, userDatas?.email, role);
        setUserData(data);
        setEditData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [userDatas?.actorId]);

  const handleChange = (field: keyof UserInfoData, value: string) => {
    setEditData(prev => prev ? { ...prev, [field]: value } : null);
  };

  useEffect(() => {
    const fetchBranchName = async () => {
   
      if ((role === 'SL' || role === 'SM' ||  role === 'SA') && userData?.BranchId) {
        try {
          const branchData = await getBranchById(userData.BranchId);
          console.log(branchData);
          setBranchName(branchData.salonBranches || 'N/A');
      
        } catch (error) {
          console.error('Failed to fetch branch name:', error);
        }
      }else console.log("no data to get branch");
    };

    fetchBranchName();
  }, [role, userData?.BranchId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarImage(e.target.files[0]); 
    }
  };

  const getImageSrc = () => {
    const avatarImage = userData?.avatarImage;
    if (avatarImage instanceof File) {
      return URL.createObjectURL(avatarImage);
    }
   
    return avatarImage || '../../assets/images/demo.jpg';
  };

  const handleSave = async () => {
    if (editData) {
      try {
        await updateUserData(userDatas?.actorId, { ...editData, avatarImage }, role); 
        setUserData(editData); 
        setIsModalOpen(false); 
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          const validationErrors = error.response.data.errors;
          if (validationErrors) {
            const formattedErrors: Record<string, string[]> = {};
            for (const field in validationErrors) {
              formattedErrors[field] = validationErrors[field];
            }
            setApiErrors(formattedErrors);
          }
        } else {
          console.error('An unexpected error occurred:', error.message);
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    }
  };

  const showEditModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!userData) {
    return <div style={styles.error}>Không tìm thấy.</div>;
  }

  return (
    <main role="main" style={styles.profileMain}>
      <div style={styles.contentContainer}>
        <div style={styles.profileImage}>
          <img src={getImageSrc()} alt="Profile" style={styles.image} />
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.greeting}>Xin chào, {userData.MemberName || 'Bạn'}!</h2>
          <h4 style={styles.role}>{branchName || 'Rất vui khi được phục vụ bạn'}</h4>
        </div>
        <div style={styles.userInfo}>
          <div style={styles.infoColumn}>
            <h4>Email:</h4>
            <p>{userDatas?.email || 'user@example.com'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Số điện thoại:</h4>
            <p>{userData.PhoneNumber || '(+00) 0000 0000'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Ngày sinh:</h4>
            <p>{userData.DateOfBirth ? new Date(userData.DateOfBirth).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Địa chỉ:</h4>
            <p>{userData.Address || 'City, Country'}</p>
          </div>
        </div>
      </div>
      <Button style={styles.editbtn} onClick={showEditModal}>
        🛠️ Chỉnh sửa
      </Button>
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        visible={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
        footer={null}
        width={styles.modal.width}    
        style={styles.modal}  
      >
        <Form layout="vertical">
          <Form.Item>
            <div style={styles.avatarItem}> 
              <div style={styles.profileImage}>
                <img src={getImageSrc()} alt="Profile" style={styles.image} />
              </div>
              <div style={styles.customfileupload}>
                <input
                  type="file"
                  name="AvatarImage"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            {apiErrors.AvatarImage && apiErrors.AvatarImage.map((error, index) => (
              <span key={index} className="error-message">{error}</span>
            ))}
          </Form.Item>
          <Form.Item label="Tên" style={styles.formItem}>
            <Input
              value={editData?.MemberName}
              onChange={(e) => handleChange('MemberName', e.target.value)}
            />
            {apiErrors.MemberName && <span className="error-message">{apiErrors.MemberName[0]}</span>}
          </Form.Item>
          <Form.Item label="Email" style={styles.formItem}>
            <Input
              value={editData?.Email}
              onChange={(e) => handleChange('Email', e.target.value)}
            />
            {apiErrors.Email && <span className="error-message">{apiErrors.Email[0]}</span>}
          </Form.Item>
          <Form.Item label="Số điện thoại" style={styles.formItem}>
            <Input
              value={editData?.PhoneNumber}
              onChange={(e) => handleChange('PhoneNumber', e.target.value)}
            />
            {apiErrors.PhoneNumber && <span className="error-message">{apiErrors.PhoneNumber[0]}</span>}
          </Form.Item>
          <Form.Item label="Ngày sinh" style={styles.formItem}>
            <Input
              type="date"
              name="DateOfBirth"
              value={editData?.DateOfBirth}
              onChange={(e) => handleChange('DateOfBirth', e.target.value)}
            />
            {apiErrors.DateOfBirth && <span className="error-message">{apiErrors.DateOfBirth[0]}</span>}
          </Form.Item>
          <Form.Item label="Địa chỉ" style={styles.formItem}>
            <Input
              value={editData?.Address}
              onChange={(e) => handleChange('Address', e.target.value)}
            />
            {apiErrors.Address && <span className="error-message">{apiErrors.Address[0]}</span>}
          </Form.Item>
        </Form>
        <div style={styles.customFooter}>
          <Button onClick={handleCancel} style={styles.cancelButton}>
            Hủy
          </Button>
          <Button type="primary" onClick={handleSave} style={styles.saveButton}>
            Lưu
          </Button>
        </div>
      </Modal>
    </main>
  );
};

const styles: { [key: string]: CSSProperties } = {
  profileMain: {
    margin: '30px',           
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    maxWidth: '9000px',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    margin: '0 auto',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
 
  },
  profileImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e0e0e0',
  },
  profileInfo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  greeting: {
    fontSize: '1.6em',
    color: '#333',
    marginBottom: '0.2em',
  },
  role: {
    fontSize: '1em',
    fontWeight: 'normal',
    color: '#888',
  },
  userInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    width: '100%',
    margin: '0 auto',
  },
  infoColumn: {
    flexBasis: '45%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '10px',
  },
  editbtn: {
    backgroundColor: '#AA9144',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.5em',
  },
  error: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.5em',
    color: 'red',
  },

  modal: {
    width: '80%',               
    maxWidth: '700px',        
    padding: '10px',            
  },
  formItem: {
    marginBottom: '12px',      
  },
  avatarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  customfileupload: {
    marginLeft: '20px',
  },
  customFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  cancelButton: {
    marginRight: '10px',
  },
  saveButton: {
    backgroundColor: '#AA9144',
    color: '#fff',
    border: 'none',
  },
};

export default Profile;
