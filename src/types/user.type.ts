export interface DoctorType {
  id: number;
  fullname: string;
  avatar_url: string;
  other_information: string;
  specialized_field: string;
  specialty: string;
  treatment_method: string;
  experience: string;
  certificate: string;
  career: string;
}

export interface AccountProfileType {
  _id: string;
  fullname: string;
  dob?: string;
  email: string;
  phone_number?: string;
  gender?: string;
  address?: string;
  address_detail?: string;
  avatar_url?: string;
  account_balance: number;
  specialized_field?: string;
  specialty?: string;
  treatment_method?: string;
  experience?: string;
  certificate?: string;
  career?: string;
  otherInformation?: string;
}

//get all doctor by guest
export type ResponseGetAllDoctorType = [TotalListType, AccountProfileType[]];

export interface TotalListType {
  totalUsers: number;
}
