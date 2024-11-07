import React, { useEffect, useState, CSSProperties } from 'react';
import { Modal, Button, Input, Form, notification } from 'antd';
import { fetchUserData, updateMemberData } from '../../services/ProfileAll';
import { getBranchById } from '../../services/Branches/branches';
import { UserInfoData } from '../../models/type';


const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserInfoData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
   
      if ((role === 'SL' || role === 'SM' ||  role === 'SA') && userData?.branchId) {
        try {
          const branchData = await getBranchById(userData.branchId);
          console.log(branchData);
          setBranchName(branchData.salonBranches || 'N/A');
      
        } catch (error) {
          console.error('Failed to fetch branch name:', error);
        }
      }else console.log("no data to get branch");
    };

    fetchBranchName();
  }, [role, userData?.branchId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
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
      const updateData: Record<string, any> = {};

      if (editData.memberName !== userData?.memberName) updateData.memberName = editData.memberName;
      if (editData.phoneNumber !== userData?.phoneNumber) updateData.phoneNumber = editData.phoneNumber;
      if (editData.dateOfBirth !== userData?.dateOfBirth) updateData.dateOfBirth = editData.dateOfBirth;
      if (editData.address !== userData?.address) updateData.address = editData.address;
      if (selectedFile) {
        updateData.avatarImage = selectedFile;
      }
      
      if (Object.keys(updateData).length > 0) {
        try {
          const isSuccess  = await updateMemberData(userDatas?.actorId, updateData, role);
          setUserData(prev => (prev ? { ...prev, ...updateData } : prev));
          setIsModalOpen(false);
          if (isSuccess) {
            notification.success({
              message: 'Update Successful',
              description: 'Member data has been successfully updated.',
              duration: 3,
            });
          } else {
            notification.error({
              message: 'Update Failed',
              description: 'An error occurred while updating member data. Please try again.',
              duration: 3,
            });
          }
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
      }else 
      {
        handleCancel();
        return;
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
          <h2 style={styles.greeting}>Xin chào, {userData.memberName || 'Bạn'}!</h2>
          <h4 style={styles.role}>{branchName || 'Rất vui khi được phục vụ bạn'}</h4>
        </div>
        <div style={styles.userInfo}>
          <div style={styles.infoColumn}>
            <h4>Email:</h4>
            <p>{userDatas?.email || 'user@example.com'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Số điện thoại:</h4>
            <p>{userData.phoneNumber || '(+00) 0000 0000'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Ngày sinh:</h4>
            <p>{userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div style={styles.infoColumn}>
            <h4>Địa chỉ:</h4>
            <p>{userData.address || 'City, Country'}</p>
          </div>
        </div>
        <Button style={styles.editbtn} onClick={showEditModal}>
        🛠️ Chỉnh sửa
      </Button>
      </div>
     
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
              value={editData?.memberName}
              onChange={(e) => handleChange('memberName', e.target.value)}
            />
            {apiErrors.memberName && <span className="error-message">{apiErrors.memberName[0]}</span>}
          </Form.Item>
          {/* <Form.Item label="Email" style={styles.formItem}>
            <Input
              value={editData?.Email}
              onChange={(e) => handleChange('Email', e.target.value)}
            />
            {apiErrors.Email && <span className="error-message">{apiErrors.Email[0]}</span>}
          </Form.Item> */}
          <Form.Item label="Số điện thoại" style={styles.formItem}>
            <Input
              value={editData?.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
            {apiErrors.phoneNumber && <span className="error-message">{apiErrors.phoneNumber[0]}</span>}
          </Form.Item>
          <Form.Item label="Ngày sinh" style={styles.formItem}>
            <Input
              type="date"
              name="DateOfBirth"
              value={editData?.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            />
            {apiErrors.dateOfBirth && <span className="error-message">{apiErrors.dateOfBirth[0]}</span>}
          </Form.Item>
          <Form.Item label="Địa chỉ" style={styles.formItem}>
            <Input
              value={editData?.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            {apiErrors.address && <span className="error-message">{apiErrors.address[0]}</span>}
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
    marginTop: '20px',
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