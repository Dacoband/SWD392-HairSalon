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
  stylistId: string;
  stylistName: string;
  averageRating: number;
  phoneNumber: string;
  address: string;
  avatarImage: string;
  insDate: Date;
  updDate: Date;
}

export interface UserInfoData {
  Email: string;
  Password: string;
  MemberName: string;
  DateOfBirth: string;
  PhoneNumber: string;
  Address: string;
  avatarImage?: string;
}
export interface StaffStylist {
  staffStylistId: string;
  staffStylistName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  avatarImage: string;
  branchId: string;
}
