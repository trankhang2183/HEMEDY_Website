import { AccountProfileType } from "./user.type";

export interface ScheduledType {
  _id: string;
  doctor_id: AccountProfileType;
  appointment_date: string;
  slot: string;
  customer_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BodyCreateScheduledType {
  doctor_id: string;
  appointment_date: string;
  slot: string;
}