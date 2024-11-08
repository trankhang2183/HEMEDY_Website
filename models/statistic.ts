export interface DataSaleType {
  income: Income;
  courses: Courses;
  newUsers: NewUsers;
}

export interface Income {
  totalIncomeCurrent: number;
  totalIncomePrevious: number;
  differencePercent: number;
}

export interface Courses {
  totalCoursesCurrent: number;
  totalCoursesPrevious: number;
  differencePercent: number;
}

export interface NewUsers {
  totalNewUsersCurrent: number;
  totalNewUsersPrevious: number;
  differencePercent: number;
}

export interface TopServicesType {
  name: string;
  popularity: number;
  color: string;
}

export interface DomainType {
  visit: number[]
  podcast: number[]
  survey: number[]
}

export interface RevenueWeekType {
  dayOfWeekRevenuePayProduct: number[]
  dayOfWeekRevenuePaySchedule: number[]
}


