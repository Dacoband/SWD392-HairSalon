export interface Services {
  serviceID: string;
  serviceName: string;
  price: number;
  description: string;
  duration: number;
  avatarImage: string | null;
  updDate: Date;
}
export interface Branches {
  branchID: string;
  staffManagerID: string;
  salonBranches: string;
  address: string;
  phone: string;
  insDate: Date;
  upDate: Date;
  delFlg: boolean;
}

export interface AppointmentService {
  serviceId: string;
  appointmentId: string;
  unitPrice: number;
}

export interface Appointment {
  appointmentId: string;
  customerId: string;
  stylistId: string;
  status: number;
  totalPrice: number;
  // <<<<<<< HEAD
  //   insDate: Date;
  //   upDate: Date;
  //   startTime: Date;
  //   endTime: Date;
  //   appointmentService: AppointmentService[];
  // =======
  insDate: string;
  upDate: string;
  startTime: string;
  endTime: string;
  sevicesList: {
    serviceId: string;
    appointmentId: string;
    unitPrice: number;
  }[];
}
export interface UserData {
  email: string;
  roleName: string;
}

export interface Stylish {
  branchId: string;
  email: string;
  password: string;
  stylistId: string;
  staffStylistId: string;
  stylistName: string;
  averageRating: number;
  phoneNumber: string;
  address: string;
  avatarImage: string;
  insDate: Date;
  updDate: Date;
}

export interface UserInfoData {
  email: string;
  password: string;
  memberName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  branchId?: string;
  avatarImage?: string | File;
}
export interface StaffStylist {
  staffStylistId: string;
  staffStylistName: string;
  email:string;
  password:string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  avatarImage?: string | File;
  branchId: string;
}
export interface CreateAppointmentRequest {
  stylistId: string;
  appointmentDate: string;
  serviceIds: string[];
}
export interface CreatePaymentReponse {
  paymentLink: string;
  paymentLinkId: string;
}

export interface Member {
  memberId: string;
  customerId?: string;
  accountId: string;
  memberName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  avatarImage: string;
  insDate: string;
  updDate: string;
}


export interface Cancellation {
  cancellationId: string;
  reason: string;
  insDate: string;
  updDate: string;
  delFlg: boolean;
  appointment: Appointment;
}


export interface StaffManager {
  staffManagerID: string;  
  branchID: string;       
  accountID: string;      
  staffManagerName: string; 
  dateOfBirth: string;     
  phoneNumber: string;   
  address: string;        
  avatarImage: string;    
  insDate: string;        
  updDate: string;         
 
}
