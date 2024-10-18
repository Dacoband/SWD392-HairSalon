export interface Services {
  serviceID: string;
  servicename: string;
  price: number;
  description: string;
  duration: number;
  avatarImage: string | null;
  updDate: Date;
  type: number;
}
export interface Branches {
  _id: string;
  staffManagerID: string;
  salonBranches: string;
  address: string;
  phone: string;
  insDate: Date;
  upDate: Date;
  delFlg: boolean;
}
export interface Appointment {
  appointmentId: string;
  customerId: string;
  stylistId: string;
  status: number;
  totalPrice: number;
  insDate: string;
  upDate: string;
  startTime: string;
  endTime: string;
  appointmentService: {
    serviceId: string;
    appointmentId: string;
    unitPrice: number;
  }[];
}
export interface UserData {
  email: string;
  roleName: string;
}
