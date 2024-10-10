export const urlServerSide = "https://hemedy-server.onrender.com";

const apiLinks = {
  customer: {
    getProfile: `${urlServerSide}/users`,
    loginWithCustomerEmail: `${urlServerSide}/auth/signInForCustomer`,
    loginWithAdminDoctorEmail: `${urlServerSide}/auth/signInForDocAndAdmin`,
    loginWithGoogle: `${urlServerSide}/auth/google/login/customer`,
    loginWithGoogleByAdminDoctor: `${urlServerSide}/auth/google/login/doctor-admin`,
    getAllDoctorByGuest: `${urlServerSide}/users/all/doctors`,
    registerByCustomer: `${urlServerSide}/auth/signup`,
  },
  transaction: {
    getAllTransaction: `${urlServerSide}/transaction/all-courses`,
    addFundsByMoMo: `${urlServerSide}/transaction/MoMo/addFunds`,
    payProductByMoMo: `${urlServerSide}/transaction/MoMo/payProduct`,
    addFundsByStripe: `${urlServerSide}/transaction/stripe/addFunds`,
    payProductByStripe: `${urlServerSide}/transaction/stripe/payProduct`,
    addFundsByVnPay: `${urlServerSide}/transaction/vnPay/addFunds`,
    payProductByVnPay: `${urlServerSide}/transaction/vnPay/payProduct`,
  },
  scheduled: {
    getAllScheduledOfCustomer: `${urlServerSide}/doctor-schedules/customer`,
    getAllSlotFreeOfDoctor: `${urlServerSide}/doctor-schedules/free-slots`,
    createScheduled: `${urlServerSide}/doctor-schedules`,
  },
};

export default apiLinks;
