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
