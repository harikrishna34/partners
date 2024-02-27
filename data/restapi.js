//export const URL = 'http://172.16.0.249:3333';
export const URL = 'https://secureone.anvayaa.in';

//Common APIS
export const getConstants = URL + '/api/Partner/getRequiredConstants';
export const viewLanguages = URL + '/getLanguages';

//Partner APIS

export const login = URL + '/api/partnerapp/requestOTPForPartnerLogin';
export const verifyOtp = URL + '/api/partnerapp/partnerLogin';

export const viewAllServiceAreas =
  URL + '/api/serviceareas/viewAllServiceAreas';

export const viewAllCategoriesDetails =
  URL + '/api/services/viewPartnersCategoriesDetails';

export const updateBasicProfileDetails =
  URL + '/api/partnerapp/updatepartnerdetils';

export const partnerInitiate = URL + '/api/partnerapp/partnerinitialonboard';

export const dashboardCounts = URL + '/api/partnerapp/viewDashBoardCount';

export const createBankDetails = URL + '/api/partnerapp/createbankdetails';

export const viewStaff = URL + '/api/PartnerStaff/Getstaffprofiles';

export const createStaff = URL + '/api/PartnerStaff/createStaff';

export const viewStaffByID = URL + '/api/PartnerStaff/GetProfileDetailsByID';

export const updateStaff = URL + '/api/PartnerStaff/Updatestaff';

export const viewMyContracts = URL + '/api/partnerapp/viewContractsByPartner';

export const viewPartnerdetails = URL + '/api/partnerapp/viewPartnerdetails';

export const viewContractById = URL + '/api/partnerapp/viewContractByID';

export const acceptContract = URL + '/api/partnerapp/acceptcontract';

export const uploadMoU = URL + '/api/partnerapp/MoUfileupload';

//Admin APIS

export const adminLogin = URL + '/login';

export const adminViewAllCategoriesDetails =
  URL + '/api/partnerappadmin/viewEmployeesAllCategoriesDetails';

export const viewAdminCounts =
  URL + '/api/partnerappadmin/admindashboardcountsofpartner';

export const viewPartners = URL + '/api/partnerappadmin/viewadmindashboarddata'; //'/api/partnerapp/viewAllPartners2';

export const createContract = URL + '/api/partnerapp/createContract';

export const viewAllContracts = URL + '/api/partnerappadmin/viewAllContracts';

export const viewPartnerById = URL + '/api/partnerappadmin/viewPartnerByID';

export const viewPartnerForMou = URL + '/api/partnerappadmin/viewPartnerForMou';

export const approveApi = URL + '/api/partnerappadmin/approvepartner';

export const updatePartner = URL + '/api/partnerappadmin/updatepartnerdetils';

export const updateBankDetails = URL + '/api/partnerappadmin/createbankdetails';

export const updateContract = URL + '/api/partnerappadmin/updateContracts';

export const updateAdminMoU = URL + '/api/partnerappadmin/MoUfileupload';
