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

export interface UserType {
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
  role_name?: string;
  is_ban?: boolean;
}

export interface TotalUsers {
  totalUsers: number
}

export type ResponseGetALlUserByAdmin = [TotalUsers, UserType[]]

export type ResponseGetAllDoctorType = [TotalListType, UserType[]];

export interface TotalListType {
  totalUsers: number;
}
