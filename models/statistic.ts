export interface DataSaleType {
  income: {
    totalIncomeToday: number;
    totalIncomeYesterday: number;
    differencePercent: number;
  };
  courses: {
    totalCoursesToday: number;
    totalCoursesYesterday: number;
    differencePercent: number;
  };
  newUsers: {
    totalNewUsersToday: number;
    totalNewUsersYesterday: number;
    differencePercent: number;
  };
}

export interface TopServicesType {
  name: string;
  popularity: number;
  color: string;
}
