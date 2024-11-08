import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  GenerateOTPReducer,
  VerifyOTPReducer,
  logOutReducer,
  loginReducer,
  refreshTokenReducer,
  registerReducer,
  resetPassOTPVerificationReducer,
  resetPasswordReducer,
  resetUserPasswordEmailCheckReducer,
} from "./reducers/authReducers";
import {
  createUserReducer,
  deleteUserReducer,
  getUserReducer,
  toggleStatusUserReducer,
  updateUserReducer,
  usersCompanyReducer,
} from "./reducers/userReducers";
import {
  IVDDiagnosticReducer,
  ProjectByRoleIdReducer,
  ReleaseTheProjectReducer,
  ReleasedProjectReducer,
  archivedProjectToggleReducer,
  deleteDocumentReducer,
  deleteProjectReducer,
  documentByIdReducer,
  documentsReducer,
  duplicateProjectReducer,
  getAllProjectsReducer,
  getArchivedProjectsReducer,
  getProjectReducer,
  intendedPurposeReducer,
  legislationReducer,
  manufacturerInformationReducer,
  othersReducer,
  productInformationReducer,
  safeUseReducer,
  saveDocumentReducer,
  sendingProjectToOtherRoleReducer,
  startProjectReducer,
  sterilityReducer,
  storageReducer,
  transfusionInfusionReducer,
  translationAndRepackagingReducer,
  uploadManufacturerLogoReducer,
} from "./reducers/projectReducers";
import {
  dashboardCompanyInfoReducer,
  getCompanyInfoReducer,
  paymentCompanyReducer,
  paymentPricesCompanyReducer,
  updateCompanyInfoReducer,
} from "./reducers/companyReducers";
import {
  changeCompanyPermissionReducer,
  companiesReducer,
  companyByIdReducer,
  contactByIdReducer,
  contactsReducer,
  deleteCompanyReducer,
  deleteContactReducer,
  projectsReducer,
  usersReducer,
} from "./reducers/supperAdminReducers";
import {
  LabelsTemplateReducer,
  approveLabelReducer,
  approvedLabelsReducer,
  createLabelReducer,
  drafLabelsReducer,
  generateLotNumberReducer,
  getAllLabelsReducer,
  getLabelLogsReducer,
  getLabelReducer,
  rejectedLabelsReducer,
  releaseLabelReducer,
  saveOrderLabelReducer,
  saveToPrintReducer,
  sendToApproverReducer,
  sendToReleaserReducer,
} from "./reducers/labelReducers";
import {
  createProductReducer,
  getProductByIdReducer,
  getProductByProjectIdReducer,
} from "./reducers/productReducers";
import {
  approveIFUReducer,
  createIFUReducer,
  createIFUsDataReducer,
  editIFUReducer,
  findAllIFUsReducer,
  findIFUsByProjectIdReducer,
  findPublicIFUReducer,
  findReceivedIFUsReducer,
  getAllIFUReducer,
  getOneIFUReducer,
  IFUsLanguesReducer,
  releaseIFUReducer,
  sendIFUsToApproverReducer,
  sendIFUToReleaserReducer,
  updateIFUReducer,
} from "./reducers/IFUsReducers";
import { getCountryReducer } from "./reducers/countryReducers";
import { findCompanyChecklistReducer } from "./reducers/checklistReducers";

const reducer = combineReducers({
  // auth reducers
  register: registerReducer,
  login: loginReducer,
  refresh: refreshTokenReducer,
  logout: logOutReducer,

  // OTP Verification and Generator reducers
  GenerateOTP: GenerateOTPReducer,
  VerifyOTP: VerifyOTPReducer,

  // reset Password reducers
  EmailCheck: resetUserPasswordEmailCheckReducer,
  OTPVerification: resetPassOTPVerificationReducer,
  resetPassword: resetPasswordReducer,

  // users & company reducers
  usersCompany: usersCompanyReducer,
  getUser: getUserReducer,
  updateUser: updateUserReducer,
  toggleStatusUser: toggleStatusUserReducer,
  deleteUser: deleteUserReducer,
  createUser: createUserReducer,
  getCompanyInfo: getCompanyInfoReducer,
  updateCompanyInfo: updateCompanyInfoReducer,
  dashboardCompanyInfo: dashboardCompanyInfoReducer,

  // payment reducers
  paymentCompany: paymentCompanyReducer,
  paymentPricesCompany: paymentPricesCompanyReducer,

  // projects reducers
  getAllProjects: getAllProjectsReducer,
  getProject: getProjectReducer,
  startProject: startProjectReducer,
  deleteProject: deleteProjectReducer,
  sendingProjectToOtherRole: sendingProjectToOtherRoleReducer,
  ProjectByRoleId: ProjectByRoleIdReducer,
  ReleasedProject: ReleasedProjectReducer,
  ReleaseTheProject: ReleaseTheProjectReducer,
  getArchivedProjects: getArchivedProjectsReducer,
  archivedProjectToggle: archivedProjectToggleReducer,
  duplicateProject: duplicateProjectReducer,

  // label reducers
  getAllLabels: getAllLabelsReducer,
  getLabel: getLabelReducer,
  createLabel: createLabelReducer,
  manufacturerInformation: manufacturerInformationReducer,
  legislation: legislationReducer,
  productInformation: productInformationReducer,
  uploadManufacturerLogo: uploadManufacturerLogoReducer,
  sterility: sterilityReducer,
  storage: storageReducer,
  safeUse: safeUseReducer,
  IVDDiagnostic: IVDDiagnosticReducer,
  transfusionInfusion: transfusionInfusionReducer,
  others: othersReducer,
  translationAndRepackaging: translationAndRepackagingReducer,
  intendedPurpose: intendedPurposeReducer,
  sendToApprover: sendToApproverReducer,
  approveLabel: approveLabelReducer,
  sendToReleaser: sendToReleaserReducer,
  releaseLabel: releaseLabelReducer,
  approvedLabels: approvedLabelsReducer,
  drafLabels: drafLabelsReducer,
  rejectedLabels: rejectedLabelsReducer,
  saveOrderLabel: saveOrderLabelReducer,
  documentById: documentByIdReducer,
  LabelsTemplate: LabelsTemplateReducer,
  saveToPrint: saveToPrintReducer,
  getLabelLogs: getLabelLogsReducer,
  generateLotNumber: generateLotNumberReducer,

  // instruction of use
  getAllIFU: getAllIFUReducer,
  createIFU: createIFUReducer,
  getOneIFU: getOneIFUReducer,
  sendIFUsToApprover: sendIFUsToApproverReducer,
  approveIFU: approveIFUReducer,
  releaseIFU: releaseIFUReducer,
  sendIFUToReleaser: sendIFUToReleaserReducer,
  editIFU: editIFUReducer,
  updateIFU: updateIFUReducer,
  findAllIFUs:findAllIFUsReducer, 
  findPublicIFU: findPublicIFUReducer,

  // instruction of use by project id
  createIFUsData: createIFUsDataReducer,
  findIFUsByProjectId: findIFUsByProjectIdReducer,

  IFUsLangues: IFUsLanguesReducer,
  findReceivedIFUs: findReceivedIFUsReducer,

  // products reducers
  getProductByProjectId: getProductByProjectIdReducer,
  productById: getProductByIdReducer,
  createProduct: createProductReducer,

  // document reducers
  saveDocument: saveDocumentReducer,
  documents: documentsReducer,
  deleteDocument: deleteDocumentReducer,

  //company checklist
  findCompanyChecklist: findCompanyChecklistReducer,

  // supperRoot reducers
  contacts: contactsReducer,
  contactById: contactByIdReducer,
  deleteContact: deleteContactReducer,
  companies: companiesReducer,
  companyById: companyByIdReducer,
  deleteCompany: deleteCompanyReducer,
  users: usersReducer,
  projects: projectsReducer,
  changeCompanyPermission: changeCompanyPermissionReducer,

  // countries
  countries: getCountryReducer,
});

const composeEnhancers = composeWithDevTools({
  serialize: true,
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
