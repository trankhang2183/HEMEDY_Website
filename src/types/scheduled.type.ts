import { UserType } from "./user.type";

export interface ScheduledType {
  _id: string;
  doctor_id: UserType;
  appointment_date: string;
  slot: string;
  customer_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorScheduledType {
  _id: string;
  doctor_id: UserType;
  appointment_date: string;
  slot: string;
  customer_id: UserType;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BodyCreateScheduledType {
  doctor_id: string;
  appointment_date: string;
  slot: string;
}
