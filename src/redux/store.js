import {composeWithDevTools} from '@redux-devtools/extension';
import {combineReducers, 
        createStore, 
        applyMiddleware}  from 'redux';
import thunk from 'redux-thunk';
import {GenerateOTPReducer,
        VerifyOTPReducer, 
        logOutReducer, 
        loginReducer, 
        refreshTokenReducer, 
        registerReducer,
        resetPassOTPVerificationReducer,
        resetPasswordReducer,
        resetUserPasswordEmailCheckReducer
    } from './reducers/authReducers';
import {createUserReducer, 
        deleteUserReducer, 
        getUserReducer, 
        toggleStatusUserReducer, 
        updateUserReducer, 
        usersCompanyReducer 
    } from './reducers/userReducers';
import {IVDDiagnosticReducer, 
        ProjectByRoleIdReducer, 
        ReleaseTheProjectReducer, 
        ReleasedProjectReducer, 
        deleteDocumentReducer, 
        deleteProjectReducer, 
        documentByIdReducer, 
        documentsReducer, 
        getAllProjectsReducer, 
        getProjectReducer, 
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
        uploadManufacturerLogoReducer
    } from './reducers/projectReducers';
import { dashboardCompanyInfoReducer, getCompanyInfoReducer, 
        paymentCompanyReducer, 
        paymentPricesCompanyReducer, 
        updateCompanyInfoReducer } from './reducers/companyReducers';
import { changeCompanyPermissionReducer, companiesReducer, companyByIdReducer, contactByIdReducer, contactsReducer, deleteCompanyReducer, deleteContactReducer, projectsReducer, usersReducer } from './reducers/supperAdminReducers';


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
    getCompanyInfo:getCompanyInfoReducer,
    updateCompanyInfo: updateCompanyInfoReducer,
    dashboardCompanyInfo: dashboardCompanyInfoReducer,


    // payment reducers
    paymentCompany: paymentCompanyReducer,
    paymentPricesCompany: paymentPricesCompanyReducer,

    // project reducers
    getAllProjects: getAllProjectsReducer,
    getProject: getProjectReducer,
    startProject: startProjectReducer,
    deleteProject: deleteProjectReducer,
    manufacturerInformation: manufacturerInformationReducer,
    productInformation: productInformationReducer,
    uploadManufacturerLogo: uploadManufacturerLogoReducer,
    sterility: sterilityReducer,
    storage: storageReducer,
    safeUse: safeUseReducer,
    IVDDiagnostic: IVDDiagnosticReducer,
    transfusionInfusion: transfusionInfusionReducer,
    others: othersReducer,
    sendingProjectToOtherRole: sendingProjectToOtherRoleReducer,
    ProjectByRoleId: ProjectByRoleIdReducer,
    ReleasedProject: ReleasedProjectReducer,
    ReleaseTheProject: ReleaseTheProjectReducer,

    // document reducers
    saveDocument: saveDocumentReducer,
    documents: documentsReducer,
    documentById: documentByIdReducer,
    deleteDocument: deleteDocumentReducer,

    // supperRoot reducers
    contacts: contactsReducer,
    contactById: contactByIdReducer,
    deleteContact: deleteContactReducer,
    companies: companiesReducer,
    companyById: companyByIdReducer,
    deleteCompany: deleteCompanyReducer,
    users: usersReducer,
    projects: projectsReducer,
    changeCompanyPermission: changeCompanyPermissionReducer
})


const composeEnhancers = composeWithDevTools({
    serialize: true, 
  });
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;