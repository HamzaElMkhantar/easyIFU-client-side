import "./App.css";
import "./index.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/DashboardPages/Dashboard";
import RequireAuth from "./components/RequireAuth";
import NoFoundPage from "./pages/NoFoundPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the
import Cookies from "js-cookie";
import Project from "./pages/DashboardPages/Project";
import Users from "./pages/DashboardPages/Users";
import MyCompany from "./pages/DashboardPages/MyCompany";
import Account from "./pages/DashboardPages/Account";
import { useDispatch } from "react-redux";
import { refreshAction } from "./redux/actions/authActions";
import EmailVerification from "./pages/emailVerification/EmailVerification";
import EmailCheckForResetPassword from "./components/resetPsswordUsers/EmailCheckForResetPassword";
import ResetPassword from "./components/resetPsswordUsers/ResetPassword";
import ManageUser from "./pages/DashboardPages/ManageUser";
import CreateUser from "./pages/DashboardPages/CreateUser";
import ManufacturerInfoComponent from "./pages/DashboardPages/ManufacturerInfo";
import ProductInfoComponent from "./pages/DashboardPages/ProductInfoComponent";
import SterilityComponent from "./pages/DashboardPages/SterilityComponent";
import StorageComponent from "./pages/DashboardPages/StorageComponent";
import SafeUseComponent from "./pages/DashboardPages/SafeUseComponent";
import IVDDiagnosticComponent from "./pages/DashboardPages/IVDDiagnosticComponent";
import TransfusionInfusionComponent from "./pages/DashboardPages/TransfusionInfusionComponent";
import OthersComponent from "./pages/DashboardPages/OthersComponent";
import LabelInformation from "./pages/DashboardPages/LabelInformation";
import jwtDecode from "jwt-decode";
import IsVerified from "./pages/emailVerification/IsVerified";
import { ScrollToTop } from "./utilities/ScrollToTop";
import ProjectByRole from "./pages/DashboardPages/ProjectByRole";
import ApproverReview from "./pages/DashboardPages/ApproverReview";
import ReleaseReview from "./pages/DashboardPages/ReleaseReview";
import CreatorReview from "./pages/DashboardPages/CreatorReview";
import ReleasedProject from "./pages/DashboardPages/ReleasedProject";
import ReleasedProjects from "./pages/DashboardPages/ReleasedProjects";
import PaymentSucceed from "./pages/PaymentSucceed";
import PaymentFailed from "./pages/PaymentFailed";
import CheckSubscription from "./pages/CheckSubscription";
import Documents from "./pages/DashboardPages/Documents";
import DocumentInformation from "./pages/DashboardPages/DocumentInformation";
import Companies from "./pages/easyIFU_Dashboard/Companies";
import ProjectsCompanies from "./pages/easyIFU_Dashboard/ProjectsCompanies";
import UsersCompanies from "./pages/easyIFU_Dashboard/UsersCompanies";
import SuperAdminAccount from "./pages/easyIFU_Dashboard/SuperAdminAccount";
import EasyIFULogin from "./pages/easyIFU_auth/EasyIFULogin";
import LabelSizes from "./pages/DashboardPages/LabelSizes";
import UsersContacts from "./pages/easyIFU_Dashboard/UsersContacts";
import ContactDetails from "./pages/easyIFU_Dashboard/ContactDetails";
import UpdateManufacturerInfoComponent from "./pages/DashboardPages/UpdateManufacturerInfoComponent";
import UpdateProductInfoComponent from "./pages/DashboardPages/UpdateProductInfoComponent";
import UpdateSterilityComponent from "./pages/DashboardPages/UpdateSterilityComponent";
import UpdateStorageComponent from "./pages/DashboardPages/UpdateStorageComponent";
import UpdateSafeUseComponent from "./pages/DashboardPages/UpdateSafeUseComponent";
import UpdateIVDDiagnosticComponent from "./pages/DashboardPages/UpdateIVDDiagnosticComponent";
import UpdateTransfusionInfusionComponent from "./pages/DashboardPages/UpdateTransfusionInfusionComponent";
import UpdateOthersComponent from "./pages/DashboardPages/UpdateOthersComponent";
import Contact from "./pages/DashboardPages/Contact";

import LegislationComponent from "./pages/DashboardPages/LegislationComponent";
import TranslationAndRepackaging from "./pages/DashboardPages/TranslationAndRepackaging";
import UpdateLegislationComponent from "./pages/DashboardPages/UpdateLegislationComponent";
import UpdateTranslationAndRepackaging from "./pages/DashboardPages/UpdateTranslationAndRepackaging";
import ArchivedProject from "./pages/DashboardPages/ArchivedProject";
import Products from "./pages/DashboardPages/Products";
import LabelsByProject from "./pages/DashboardPages/LabelsByProductId";
import { logoutAction } from "./redux/actions/authActions";
import IntendedPurpose from "./pages/DashboardPages/IntendedPurpose";
import UpdateIntendedPurpose from "./pages/DashboardPages/UpdateIntendedPurpose";
import DraftLabels from "./pages/DashboardPages/DraftLabels";
import ApprovedLabels from "./pages/DashboardPages/ApprovedLabels";
import RejectedLabels from "./pages/DashboardPages/RejectedLabels";
import Templates from "./pages/DashboardPages/Templates";
import IFUsByProductId from "./pages/DashboardPages/IFUsByIFUsContainerId";
import DraftIFUs from "./pages/DashboardPages/DraftIFUs";
import ApprovedIFUs from "./pages/DashboardPages/ApprovedIFUs";
import ReleasedIFUs from "./pages/DashboardPages/ReleasedIFUs";
import RejectedIFUs from "./pages/DashboardPages/RejectedIFUs";
import Instructions from "./pages/DashboardPages/Instructions";
import CreateInstructions from "./pages/DashboardPages/CreateInstructions";
import IFUsByIFUsContainerId from "./pages/DashboardPages/IFUsByIFUsContainerId";
import IFUsInformation from "./pages/DashboardPages/IFUsInformation";
import ReceivedIFUs from "./pages/DashboardPages/ReceivedIFUs";
import IFUsReview from "./pages/DashboardPages/IFUsReview";
import UpdateInstruction from "./pages/DashboardPages/UpdateInstruction";
import PublicIFU from "./pages/DashboardPages/PublicIFU";
import PdfViewer from "./pages/DashboardPages/PdfViewer";

function App() {
  const R_Token = Cookies.get("eIfu_RTK") || null;
  const A_Token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = A_Token ? jwtDecode(A_Token) : null;
  const userId = decodedToken?.userInfo?._id;

  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.war = () => {};
    console.info = () => {};
    console.debug = () => {};
    console.error = () => {};
  }

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAction());
  }, [dispatch]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const refreshToken = Cookies.get("eIfu_RTK") || null;
      try {
        // Check Refresh Token expiration
        if (!refreshToken) {
          // console.log('Refresh Token not found');
          // setShowLogoutModal(true);
          // toast.info('Your Session is Expired, Please LogIn Again RT');
          dispatch(logoutAction(userId));
          // <Navigate to="/login" state={{ from: location }} replace />;
          return;
        }
        if (refreshToken) {
          const decodedRefreshToken = jwtDecode(refreshToken);
          // console.log('Refresh Token expires at:', new Date(decodedRefreshToken.exp * 1000));

          if (decodedRefreshToken.exp) {
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            if (decodedRefreshToken.exp < currentTimeInSeconds) {
              // console.log('Refresh Token has expired');
              // toast.info('Your Session is Expired, Please LogIn Again');
              dispatch(logoutAction(userId));
              return;
            }
          }
        }
      } catch (error) {
        // console.error('Error decoding token:', error);
      }
    };

    // Check token expiration when the component mounts
    checkTokenExpiration();

    // Set up an interval to check token expiration every 5 minutes
    const intervalId = setInterval(checkTokenExpiration, 20 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const [showNav, setShowNav] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  // const dateNow = Cookies.get('d_n') || null;

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentPage = pathSegments[1];

    // Hide the header on the login and register pages
    if (
      currentPage === "login" ||
      currentPage === "register" ||
      currentPage === "dashboard" ||
      currentPage === "verify" ||
      currentPage === "payment-succeed" ||
      currentPage === "payment-failed" ||
      currentPage === "not-found" ||
      currentPage === "check-subscription" ||
      currentPage === "eIFU-admin" ||
      currentPage === "p-eIFU"
    ) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }

    if (
      currentPage === "dashboard" ||
      currentPage === "eIFU-admin" ||
      currentPage === "verify" ||
      currentPage === "not-found" ||
      currentPage === "payment-succeed" ||
      currentPage === "payment-failed" ||
      currentPage === "check-subscription" ||
      currentPage === "p-eIFU"
    ) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location]);


  const intervalRef = useRef(null);
  const setupInterval = useCallback(() => {
    if (R_Token && A_Token) {
      intervalRef.current = setInterval(() => {
        dispatch(refreshAction());
        console.log("Token refresh scheduled.");
      }, 300000); // Refresh every 5 minutes
    }
  }, [dispatch, R_Token, A_Token]);

  useEffect(() => {
    setupInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setupInterval]);


  return (
    <div className="App">
      {showNav && <Header />}
      <ScrollToTop />
      <Routes>

        {/* ---------- IFUs pages -------- */}
          <Route path="/dashboard/IFUs/:IFUsContainerId" element={<IFUsByIFUsContainerId />} />
          <Route path="/dashboard/IFUs-draft/:IFUsContainerId" element={<DraftIFUs />} />
          <Route path="/dashboard/IFUs-approved/:IFUsContainerId" element={<ApprovedIFUs />} />
          <Route path="/dashboard/IFUs-released/:IFUsContainerId" element={<ReleasedIFUs />} />
          <Route path="/dashboard/IFUs-rejected/:IFUsContainerId" element={<RejectedIFUs />} />
          <Route path="/dashboard/Instructions-for-use/:projectId" element={<Instructions />} /> 

          <Route path="/dashboard/Instructions-for-use-create/:IFUsContainerId" element={<CreateInstructions />} /> 
          <Route path="/dashboard/Instructions-for-use-update/:ifuId" element={<UpdateInstruction />} /> 
          <Route path="/dashboard/Instructions-for-use/info/:IFUId" element={<IFUsInformation />} /> 
          <Route path="/dashboard/received-ifu" element={<ReceivedIFUs />} /> 
          <Route path="/dashboard/review-ifu/:IFUId" element={<IFUsReview />} /> 
          <Route path="/p-eIFU/:IFUId" element={<PublicIFU />} /> 
          <Route path="/eIFU/public/:ifuId" element={<PdfViewer />} /> 

        {/* ---------- IFUs pages -------- */}


        <Route path="/" element={<Home />} />
        {/*  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/resetPassword/verified/:email/:token/:id"
            element={<ResetPassword />}
          />
          <Route
            path="/resetPassword"
            element={<EmailCheckForResetPassword />}
          />

          {/* easyIFU Admin routes */}
          <Route path="/eIFU-admin" element={<EasyIFULogin />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/verify" element={<EmailVerification />} />
          <Route element={<IsVerified />}>
            <Route path="/payment-succeed" element={<PaymentSucceed />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/check-subscription" element={<CheckSubscription />} />

            {/* <Route element={<SubscriptionChecker  /> }> */}
            {/* routes for creating labels */}
            {(decodedToken?.userInfo?.role.includes("Admin") ||
                decodedToken?.userInfo?.role.includes("Creator")) && (
                <>
                  {/* create projects steps */}
                  <Route
                    path="/dashboard/create-project/step1/:projectId"
                    element={<ManufacturerInfoComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step2/:projectId"
                    element={<LegislationComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step3/:projectId"
                    element={<ProductInfoComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step4/:projectId"
                    element={<IntendedPurpose />}
                  />
                  <Route
                    path="/dashboard/create-project/step5/:projectId"
                    element={<SterilityComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step6/:projectId"
                    element={<StorageComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step7/:projectId"
                    element={<SafeUseComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step8/:projectId"
                    element={<IVDDiagnosticComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step9/:projectId"
                    element={<TransfusionInfusionComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step10/:projectId"
                    element={<OthersComponent />}
                  />
                  <Route
                    path="/dashboard/create-project/step11/:projectId"
                    element={<TranslationAndRepackaging />}
                  />

                  <Route
                    path="/dashboard/project-information/:projectId"
                    element={<LabelInformation />}
                  />
                  <Route
                    path="/dashboard/project/review-creator/:projectId"
                    element={<CreatorReview />}
                  />

                  {/* update projects steps */}
                  <Route
                    path="/dashboard/update-project/step1/:projectId"
                    element={<UpdateManufacturerInfoComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step2/:projectId"
                    element={<UpdateLegislationComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step3/:projectId"
                    element={<UpdateProductInfoComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step4/:projectId"
                    element={<UpdateIntendedPurpose />}
                  />
                  <Route
                    path="/dashboard/update-project/step5/:projectId"
                    element={<UpdateSterilityComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step6/:projectId"
                    element={<UpdateStorageComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step7/:projectId"
                    element={<UpdateSafeUseComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step8/:projectId"
                    element={<UpdateIVDDiagnosticComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step9/:projectId"
                    element={<UpdateTransfusionInfusionComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step10/:projectId"
                    element={<UpdateOthersComponent />}
                  />
                  <Route
                    path="/dashboard/update-project/step11/:projectId"
                    element={<UpdateTranslationAndRepackaging />}
                  />
                </>
              )}

            {/* routes for Approver */}
            {(decodedToken?.userInfo?.role.includes("Admin") ||
                decodedToken?.userInfo?.role.includes("Approver") ||
                decodedToken?.userInfo?.role.includes("Release")) && (
                  <Route
                    path="/dashboard/project/review-approver/:projectId"
                    element={<ApproverReview />}
                  /> )}

            {/* routes for Release */}
            {(decodedToken?.userInfo?.role.includes("Admin") ||
                decodedToken?.userInfo?.role.includes("Release")) && (
                  <Route
                    path="/dashboard/project/review-release/:projectId"
                    element={<ReleaseReview />}
                  />
              )}

            {/* routes for Producer */}
            {(decodedToken?.userInfo?.role.includes("Admin") ||
                decodedToken?.userInfo?.role.includes("Producer")) && (
                <>
                  <Route path="/dashboard/templates" element={<Templates />} />
                  <Route path="/dashboard/documents" element={<Documents />} />
                  <Route
                    path="/dashboard/project-released/:projectId"
                    element={<ReleasedProject />}
                  />
                  <Route
                    path="/dashboard/document-sizes/:documentId"
                    element={<LabelSizes />}
                  />
                  <Route
                    path="/dashboard/document/:documentId"
                    element={<DocumentInformation />}
                  />
                </>
              )}

            {/* this routes for admin users */}
            {decodedToken?.userInfo?.role.includes("Admin") && (
                <>
                  <Route
                    path="/dashboard/user/:userId"
                    element={<ManageUser />}
                  />
                  <Route
                    path="/dashboard/user/create"
                    element={<CreateUser />}
                  />
                </>
              )}

            <Route path="/dashboard" element={<Dashboard />} />

            {(decodedToken?.userInfo?.role.includes("Admin") ||
                decodedToken?.userInfo?.role.includes("Creator")) && (
                <Route path="/dashboard/project" element={<Project />} />
              )}

            <Route
              path="/dashboard/products/:projectId"
              element={<Products />}
            />
            <Route
              path="/dashboard/labels/:productId"
              element={<LabelsByProject />}
            />
            <Route
              path="/dashboard/archived-project"
              element={<ArchivedProject />}
            />
            <Route path="/dashboard/contact" element={<Contact />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/company" element={<MyCompany />} />
            <Route path="/dashboard/account" element={<Account />} />

            {/* route for all roles */}
            <Route
              path="/dashboard/received-project"
              element={<ProjectByRole />}
            />
            <Route
              path="/dashboard/project/released/:productId"
              element={<ReleasedProjects />}
            />
            <Route
              path="/dashboard/project/draft/:productId"
              element={<DraftLabels />}
            />
            <Route
              path="/dashboard/project/approved/:productId"
              element={<ApprovedLabels />}
            />
            <Route
              path="/dashboard/project/rejected/:productId"
              element={<RejectedLabels />}
            />

            {/* </Route> */}
          </Route>

          {/* easyIFU Admin routes */}
          {decodedToken?.userInfo?.role.includes("superAdmin") && (
              <>
                <Route path="/eIFU-admin/companies" element={<Companies />} />
                <Route
                  path="/eIFU-admin/projects"
                  element={<ProjectsCompanies />}
                />
                <Route path="/eIFU-admin/users" element={<UsersCompanies />} />
                <Route
                  path="/eIFU-admin/contacts"
                  element={<UsersContacts />}
                />
                <Route
                  path="/eIFU-admin/contact/:contactId"
                  element={<ContactDetails />}
                />
                <Route
                  path="/eIFU-admin/account"
                  element={<SuperAdminAccount />}
                />
              </>
            )}
        </Route>

        <Route path="/not-found" element={<NoFoundPage />} />
        {/* <Route path='*' element={<NoFoundPage />} /> */}
        {/* Wildcard route to catch all other routes */}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>

      {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        // style={{width:"200px", fontSize:"14px"}}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
        theme="dark"
      />

      {showFooter && <Footer />}
    </div>
  );
}

export default App;
