
export const urlServerSide = "https://hemedy-server.onrender.com";
export const urlMockup =
  "https://67133a276c5f5ced6625b923.mockapi.io/my-lesson";

const apiLinks = {
  customer: {
    getProfile: `${urlServerSide}/users`,
    loginWithCustomerEmail: `${urlServerSide}/auth/signInForCustomer`,
    loginWithAdminDoctorEmail: `${urlServerSide}/auth/signInForDocAndAdmin`,
    loginWithGoogle: `${urlServerSide}/auth/google/login/customer`,
    loginWithGoogleByAdminDoctor: `${urlServerSide}/auth/google/login/doctor-admin`,
    getAllDoctorByGuest: `${urlServerSide}/users/all/doctors`,
    getAllUsersByAdmin: `${urlServerSide}/users`,
    registerByCustomer: `${urlServerSide}/auth/signup`,
  },
  transaction: {
    getAllTransaction: `${urlServerSide}/transaction`,
    getAllTransactionByAdmin: `${urlServerSide}/transaction/admin`,
    addFundsByMoMo: `${urlServerSide}/transaction/MoMo/addFunds`,
    payProductByMoMo: `${urlServerSide}/transaction/MoMo/payProduct`,
    addFundsByStripe: `${urlServerSide}/transaction/stripe/addFunds`,
    payProductByStripe: `${urlServerSide}/transaction/stripe/payProduct`,
    addFundsByVnPay: `${urlServerSide}/transaction/vnPay/addFunds`,
    payProductByVnPay: `${urlServerSide}/transaction/vnPay/payProduct`,
    payProductByWallet: `${urlServerSide}/transaction/accountBalance/payProduct`,
    payScheduledByWallet: `${urlServerSide}/transaction/accountBalance/paySchedule`,
    payScheduledByVnPay: `${urlServerSide}/transaction/vnPay/paySchedule`,
    payScheduledByMoMo: `${urlServerSide}/transaction/MoMo/paySchedule`,
    payScheduledByStripe: `${urlServerSide}/transaction/stripe/paySchedule`,
  },
  scheduled: {
    getAllScheduledOfCustomer: `${urlServerSide}/doctor-schedules/customer`,
    getAllSlotFreeOfDoctor: `${urlServerSide}/doctor-schedules/free-slots`,
    getScheduledOfDoctor: `${urlServerSide}/doctor-schedules/doctor`,
    createScheduled: `${urlServerSide}/doctor-schedules`,
    changeToCompleteScheduled: `${urlServerSide}/doctor-schedules/doctor/complete`,
  },
  musicPodcast: {
    getAllMusicPodCastList: `${urlServerSide}/podcasts`,
    updateMusicPodcast: `${urlServerSide}/podcasts`,
    deleteMusicPodcast: `${urlServerSide}/podcasts`,
    getMusicPodcast: `${urlServerSide}/podcasts`,
    addNewMusicPodcast: `${urlServerSide}/podcasts`,
    updateListenQuantity: `${urlServerSide}/podcasts`,
  },
  blog: {
    getAllBlogList: `${urlServerSide}/blogs`,
    getBlog: `${urlServerSide}/blogs`,
    createBlog: `${urlServerSide}/blogs`,
    deleteBlog: `${urlServerSide}/blogs`,
    updateBlog: `${urlServerSide}/blogs`,
  },
  workshop: {
    getAllWorkshopList: `${urlServerSide}/workshops`,
    getWorkshop: `${urlServerSide}/workshops`,
    createWorkshop: `${urlServerSide}/workshops`,
    deleteWorkshop: `${urlServerSide}/workshops`,
    updateWorkshop: `${urlServerSide}/workshops`,
  },
  survey: {
    getAllSurveysList: `${urlServerSide}/surveys`,
    getSurveyById: `${urlServerSide}/surveys`,
    createSurvey: `${urlServerSide}/surveys`,
    deleteSurvey: `${urlServerSide}/surveys`,
    updateSurvey: `${urlServerSide}/surveys`,
  },
  section: {
    createSection: `${urlServerSide}/sections`,
    deleteSection: `${urlServerSide}/sections`,
    updateSection: `${urlServerSide}/sections`,
    getSectionById: `${urlServerSide}/sections`,
  },
  question: {
    createQuestions: `${urlServerSide}/questions`,
    deleteQuestions: `${urlServerSide}/questions`,
    updateQuestions: `${urlServerSide}/questions`,
    getQuestionById: `${urlServerSide}/questions`,
  },
  answer: {
    getAllAnswersList: `${urlServerSide}/answers`,
    createAnswer: `${urlServerSide}/answers`,
    deleteAnswer: `${urlServerSide}/answers`,
    updateAnswer: `${urlServerSide}/answers`,
    getAnswerById: `${urlServerSide}/questions`,
  },
  statistics: {
    countContent: `${urlServerSide}/admin`,
    statisticSale: `${urlServerSide}/admin/statistic-sales`,
    topServices: `${urlServerSide}/admin/statistic-top-services`,
    revenueMonthly: `${urlServerSide}/admin/statistic-revenue-monthly`,
    revenueCurrentWeek: `${urlServerSide}/admin/statistic-revenue-current-week`,
    domainMonthly: `${urlServerSide}/admin/statistic-domain-monthly`,
  },
  course: {
    getCoursesById: `${urlServerSide}/courses`,
    getAllCourses: `${urlServerSide}/courses`,
    createCourses: `${urlServerSide}/courses`,
  },
  notifications: {
    getAllNotification: `${urlServerSide}/notifications`,
    markAllNotifications: `${urlServerSide}/notifications/read-all`,
    markOneNotification: `${urlServerSide}/notifications/read`,
  },
  counter: {
    increaseQuantityUserVisit: `${urlServerSide}/auth/increase-quantity-user-visit`,
    increaseQuantityListenMusic: `${urlServerSide}/auth/increase-quantity-listen-music`,
    increaseQuantityListenPodcast: `${urlServerSide}/auth/increase-quantity-listen-podcast`,
    increaseQuantitySurvey: `${urlServerSide}/auth/increase-quantity-take-survey`,
  }
};

export default apiLinks;
