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
  insDate: Date;
  upDate: Date;
  startTime: Date;
  endTime: Date;
  appointmentService: AppointmentService[];
}
