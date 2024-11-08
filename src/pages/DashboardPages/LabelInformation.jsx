import React, { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Modal from 'react-modal';
import "./project.css";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { sendingProjectToOtherRoleAction } from "../../redux/actions/projectActions";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// manufacturer and product info symbols
import Manufacturer from "../../assets/eIFUSymbols/Manufacturer.png";
import Distributor from "../../assets/eIFUSymbols/Distributor.png";
import Authorized_Representative from "../../assets/eIFUSymbols/Authorized_Representative.png";
import Importer from "../../assets/eIFUSymbols/Importer.png";
import CE_mark from "../../assets/eIFUSymbols/CE_mark.png";
import catalogueNumberSymbol from "../../assets/eIFUSymbols/catalogue_number.png";
import modelNumberSymbol from "../../assets/eIFUSymbols/model_number.png";
import Serial_numberSymbol from "../../assets/eIFUSymbols/Serial_number.png";
import Batch_codeSymbol from "../../assets/eIFUSymbols/Batch_code.png";
import Date_of_manufactureSymbol from "../../assets/eIFUSymbols/Date_of_manufacture.png";
import Use_by_date from "../../assets/eIFUSymbols/Use_by_date.png";

import Medical_deviceSymbol from "../../assets/eIFUSymbols/Medical_device.png";
import nonSterileSymbol from "../../assets/eIFUSymbols/nonSterile.png";
// sterile symbols
import sterileSymbol from "../../assets/eIFUSymbols/sterile.png";
import sterile_ASymbol from "../../assets/eIFUSymbols/sterile_A.png";
import Sterile_RSymbol from "../../assets/eIFUSymbols/Sterile_R.png";
import Sterile_EOSymbol from "../../assets/eIFUSymbols/sterile_EO.png";
import Sterilized_usings_team_or_dry_heatSymbol from "../../assets/eIFUSymbols/Sterilized_usings_team_or_dry_heat.png";
import package_is_damageSymbol from "../../assets/eIFUSymbols/packege_is_damage.png";
import do_not_resterilizeSymbol from "../../assets/eIFUSymbols/do_not_resterilize.png";
import sterile_fluid_pathSymbol from "../../assets/eIFUSymbols/sterile_fluid_path.png";
import VaporizedHydrogenPeroxideSymbol from "../../assets/eIFUSymbols/VaporizedHydrogenPeroxide.png";
import single_S_B_S from "../../assets/eIFUSymbols/singleSBS.png";
import double_S_B_S from "../../assets/eIFUSymbols/doubleSBS.png";
import double_S_B_S_outside from "../../assets/eIFUSymbols/Single-sterile-barrier-system-with-protective-packaging-outside.png";
import double_S_B_S_inside from "../../assets/eIFUSymbols/Single-sterile-barrier-system-with-protective-packaging-inside.png";
// storage symbols
import fragile_handle_with_care from "../../assets/eIFUSymbols/fragile_handle_with_care.png";
import keep_away_from_sunlight from "../../assets/eIFUSymbols/keep_away_from_sunlight.png";
import protect_from_heat_and_radioactive_soures from "../../assets/eIFUSymbols/protect_from_heat_and_radioactive.png";
import keep_dry from "../../assets/eIFUSymbols/keep_dry.png";
import lower_limit_temperaure from "../../assets/eIFUSymbols/lower_limit_temperaure.png";
import upper_limit_temperaure from "../../assets/eIFUSymbols/upper_limit_temperaure.png";
import temperature from "../../assets/eIFUSymbols/temperature.png";
import HumidityLimit from "../../assets/eIFUSymbols/HumidityLimit.png";
import AtmPressureLimit from "../../assets/eIFUSymbols/AtmPressureLimit.png";

// Safe Use Symbols
import biological_risks from "../../assets/eIFUSymbols/biological_risks.png";
import do_not_re_use from "../../assets/eIFUSymbols/do_not_re-use.png";
import consult_instruction_for_use from "../../assets/eIFUSymbols/consult_instruction_for_use.png";
import caution from "../../assets/eIFUSymbols/caution.png";
import contains_or_presence_of_natural_rubber_latex from "../../assets/eIFUSymbols/contains_or_presence_of_natural_rubber_latex.png";
import contains_human_blood from "../../assets/eIFUSymbols/contains_human_blood.png";
import Contains_a_medicinal_substance from "../../assets/eIFUSymbols/Contains_a_medicinal_substance.png";
import Contains_biological_material_of_animal_origin from "../../assets/eIFUSymbols/Contains_biological_material_of_animal_origin.png";
import Contains_human_origin from "../../assets/eIFUSymbols/Contains_human_origin.png";
import Contains_hazardous_substances from "../../assets/eIFUSymbols/Contains_hazardous_substances.png";
import Contains_nano_materials from "../../assets/eIFUSymbols/Contains_nano_materials.png";
import Single_patient_multiple_use from "../../assets/eIFUSymbols/Single_patient_multiple_use.png";

// In Vitro Diagnostic IVD Symbols
import control from "../../assets/eIFUSymbols/control.png";
import control_negative from "../../assets/eIFUSymbols/control-negative.png";
import control_positive from "../../assets/eIFUSymbols/positive-control.png";
import contains_suffient_for_n_tests from "../../assets/eIFUSymbols/contains_suffient_for_n_tests.png";
import for_IVD_performance_evaluation_only from "../../assets/eIFUSymbols/for_IVD_performance_evaluation_only.png";

// Transfusion Infusion Symbols
import sampling_site from "../../assets/eIFUSymbols/sampling_site.png";
import fluid_path from "../../assets/eIFUSymbols/fluid_path.png";
import Non_pyrogenic from "../../assets/eIFUSymbols/Non_pyrogenic.png";
import Drops_per_millilitre from "../../assets/eIFUSymbols/Drops_per_millilitre.png";
import Liquid_filter_with_pore_size from "../../assets/eIFUSymbols/Liquid_filter_with_pore_size.png";
import one_way_valve from "../../assets/eIFUSymbols/one-way-valve.png";

// Other (step-8) Symbols
import patient_identification from "../../assets/eIFUSymbols/patient_identification.png";
import Patient_information_website from "../../assets/eIFUSymbols/Patient_information_website.png";
import Health_care_centre_or_doctor from "../../assets/eIFUSymbols/Health_care_centre_or_doctor.png";
import date from "../../assets/eIFUSymbols/date.png";
import Translation from "../../assets/eIFUSymbols/Translation.png";
import Repackaging from "../../assets/eIFUSymbols/Repackaging.png";
import udi from "../../assets/eIFUSymbols/udi.png";

import * as htmlToImage from "html-to-image"; // Correct import statement
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
// import imageToSvg from 'image-to-svg';
import { jsPDF } from "jspdf";

// bar  code generator library
import JsBarcode from "jsbarcode";
import QRCode from "qrcode-generator";
import bwipjs from "bwip-js";

import { utils, writeFile } from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';

// mui icons
import SendIcon from "@mui/icons-material/Send";
import { usersCompanyAction } from "../../redux/actions/userActions";
import { Button } from "react-bootstrap";
import {
  getLabelAction,
  getLabelLogsAction,
} from "../../redux/actions/labelActions";
import SideBarLabelInfo from "../../components/header/SideBarLabelInfo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

// import label Templates
import Template1 from "../../templates/template1/Template1";
import { convertDateToYYMMDD } from "../../utilities/convertDateToYYMMDD";
import Swal from "sweetalert2";
import Template2 from "../../templates/template2/Template2";

const LabelInformation = () => {
  const { projectId } = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  const { getLabel, usersCompany, sendingProjectToOtherRole, getLabelLogs } =
    useSelector((state) => state);

  const { getLabelRequest, getLabelSuccess, getLabelFail, label } = getLabel;

  const {
    usersCompanyRequest,
    usersCompanySuccess,
    usersCompanyFail,
    allUsers,
  } = usersCompany;

  const {
    sendingProjectRequest,
    sendingProjectSuccess,
    sendingProjectFail,
    sendingProjectMessage,
  } = sendingProjectToOtherRole;

  const { labelLogsRequest, labelLogsSuccess, labelLogsFail, labelLogsData } =
    getLabelLogs;

  const [size, setSize] = useState("");

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    console.log("Size updated in parent:", newSize);
  };

  const [activeTemplate, setActiveTemplate] = useState("Template1");
  const isTemplate3 = activeTemplate === "Template3" ? true : false;
  const [projectInfo, setProjectInfo] = useState({});
  const [labelLogs, setLabelLogs] = useState([]);
  const [allUsersCompany, setAllUsersCompany] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [sendTo, setSendTo] = useState({
    labelId: projectId,
    senderId: decodedToken && decodedToken?.userInfo?._id,
    receivedId: "",
    template: activeTemplate,
    labelSize: size,
  });

  const dispatch = useDispatch();
  const handleSendLabel = () => {
    setSendTo({ ...sendTo, template: activeTemplate });
    dispatch(
      sendingProjectToOtherRoleAction(
        { ...sendTo, template: activeTemplate },
        token
      )
    );
  };

  useEffect(() => {
    if (sendingProjectSuccess) {
      toast.success(`${sendingProjectMessage.message}`);
    }
    if (sendingProjectFail) {
      toast.error(`${sendingProjectFail.message}`);
    }
  }, [sendingProjectSuccess, sendingProjectFail]);
  useEffect(() => {
    dispatch(getLabelAction(projectId, token));
    dispatch(
      usersCompanyAction(
        {
          _id:decodedToken?.userInfo?._id,
          companyId: decodedToken?.userInfo?.companyId,
        },
        token
      )
    );

    dispatch(getLabelLogsAction(projectId, token));
  }, []);

  useEffect(() => {
    if (getLabelSuccess) {
      setProjectInfo(label);
    }
    if (usersCompanySuccess) {
      setAllUsersCompany(allUsers);
    }

    if (labelLogsSuccess) {
      setLabelLogs(labelLogsData);
    }

    if (getLabelFail) {
      toast.warning(`${getLabelFail.message}`);
    }
    if (labelLogsFail) {
      toast.warning(`${labelLogsFail.message}`);
    }
  }, [
    getLabelSuccess,
    getLabelFail,
    usersCompanySuccess,
    labelLogsSuccess,
    labelLogsFail,
    label,
    allUsers,
    labelLogsData,
  ]);

  // handling the categories of the label symbol
  const symbolsWithImageAnd2ParagraphsOrMore = () => {
    if (projectInfo && projectInfo.labelData) {
      return (
        <div className="symbol-content img-and-2-paragraphs">
          <div className="symbol-content-item">
            <img className="symbol-img" src={Manufacturer} />
            <div className="">
              <p>{projectInfo.labelData.manufacturerName}</p>
              <p>{projectInfo.labelData.manufacturerAddress}</p>
            </div>
          </div>

          {projectInfo.labelData.hasDistributor && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Distributor} />
              <div className="">
                <p>{projectInfo.labelData.distributorName}</p>
                <p>{projectInfo.labelData.distributorAddress}</p>
              </div>
            </div>
          )}

          {/* if outside of EUROPE */}
          {projectInfo.labelData.isOutsideEU && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Authorized_Representative} />
              <div className="">
                <p>{projectInfo.labelData.europeanAuthorizedRepName}</p>
                <p>{projectInfo.labelData.europeanAuthorizedRepAddress}</p>
              </div>
            </div>
          )}
          {projectInfo.labelData.isOutsideEU && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Importer} />
              <div className="">
                <p>{projectInfo.labelData.importerName}</p>
                <p>{projectInfo.labelData.importerAddress}</p>
              </div>
            </div>
          )}
          {/*  -----  */}
          {projectInfo.labelData.associatedWithIndividualPatient && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={patient_identification} />
              <div>
                <p>{projectInfo.labelData.patientName}</p>
                <p>{projectInfo.labelData.patientNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.associatedWithIndividualPatient &&
            (projectInfo.labelData.healthCareCentreName !== "" ||
              projectInfo.labelData.healthCareCentreAddress !== "" ||
              projectInfo.labelData.doctorName !== "") && (
              <div className="symbol-content-item">
                <img
                  className="symbol-img"
                  src={Health_care_centre_or_doctor}
                />
                <div>
                  {projectInfo.labelData.healthCareCentreName && (
                    <p>{projectInfo.labelData.healthCareCentreName}</p>
                  )}
                  {projectInfo.labelData.healthCareCentreAddress && (
                    <p>{projectInfo.labelData.healthCareCentreAddress}</p>
                  )}
                  {projectInfo.labelData.doctorName && (
                    <p>{projectInfo.labelData.doctorName}</p>
                  )}
                </div>
              </div>
            )}

          {projectInfo.labelData.translationActivity && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Translation} />
              <div>
                {projectInfo.labelData.translationEntityName && (
                  <p>{projectInfo.labelData.translationEntityName}</p>
                )}
                {projectInfo.labelData.translationEntityAddress && (
                  <p>{projectInfo.labelData.translationEntityAddress}</p>
                )}
              </div>
            </div>
          )}

          {projectInfo.labelData.modificationToPackaging && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Repackaging} />
              <div>
                {projectInfo.labelData.repackagingEntityName && (
                  <p>{projectInfo.labelData.repackagingEntityName}</p>
                )}
                {projectInfo.labelData.repackagingEntityAddress && (
                  <p>{projectInfo.labelData.repackagingEntityAddress}</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const symbolsWithImageAndParagraph = () => {
    if (projectInfo && projectInfo.labelData) {
      return (
        <div className="symbol-content img-with-paragraph">
          {projectInfo.labelData.dateOfManufacture && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Date_of_manufactureSymbol} />
              <div className="">
                <p>{projectInfo.labelData.dateOfManufacture}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.catalogueNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={catalogueNumberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.catalogueNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.modelNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={modelNumberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.modelNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.LOTNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Batch_codeSymbol} />
              <div className="">
                <p>{projectInfo.labelData.LOTNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.serialNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Serial_numberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.serialNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.needInstructionsForUse && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={consult_instruction_for_use} />
              {projectInfo.labelData.eIFULink && (
                <div className="">
                  <p>{projectInfo.labelData.eIFULink}</p>
                </div>
              )}
            </div>
          )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.hasSpecificNumberOfTests && (
              <div
                className="symbol-content-item"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  style={{
                    width: "80%",
                    height: "40px",
                    marginBottom: "-0px",
                    marginTop: "5px",
                  }}
                  className="symbol-img"
                  src={contains_suffient_for_n_tests}
                />
                {projectInfo.labelData.numberOfTests && (
                  <div className="">
                    <p style={{ marginTop: "0px", marginLeft: "-5px" }}>
                      {projectInfo.labelData.numberOfTests}
                    </p>
                  </div>
                )}
              </div>
            )}

          {projectInfo.labelData.associatedWithIndividualPatient &&
            projectInfo.labelData.date && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={date} />
                <div>
                  <p>{projectInfo.labelData.date}</p>
                </div>
              </div>
            )}

          {/* {projectInfo.labelData.addWebsite &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Patient_information_website} />
                    <div>
                      <p>{projectInfo.labelData.website}</p>
                    </div>
                  </div>} */}
        </div>
      );
    }

    return null;
  };

  const symbolsWithImageOnly = () => {
    if (projectInfo && projectInfo.labelData) {
      return (
        <div className="symbol-content img-only">
          {projectInfo.labelData.productType == "Medical device" && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Medical_deviceSymbol} />
            </div>
          )}

          {/* sterility */}
          {projectInfo.labelData.isSterile &&
          projectInfo.labelData.hasSterilizationProcess &&
          (projectInfo.labelData.hasVaporizedHydrogenPeroxide == true ||
            projectInfo.labelData.hasAsepticProcessing == true ||
            projectInfo.labelData.hasEthyleneOxide == true ||
            projectInfo.labelData.hasIrradiation == true ||
            projectInfo.labelData.hasSteamOrDryHeat == true) ? null : (
            <div className="symbol-content-item sterileSymbol">
              <img
                className="symbol-img sterileSymbol-img sm-img"
                src={sterileSymbol}
              />
            </div>
          )}

          {projectInfo.labelData.isSterile &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasAsepticProcessing && (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img sm-img"
                  src={sterile_ASymbol}
                />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasEthyleneOxide && (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img sm-img"
                  src={Sterile_EOSymbol}
                />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasIrradiation && (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img sm-img"
                  src={Sterile_RSymbol}
                />
              </div>
            )}
          {projectInfo.labelData.isSterile &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasSteamOrDryHeat && (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={Sterilized_usings_team_or_dry_heatSymbol}
                />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.isIntendedToBeResterilized && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={do_not_resterilizeSymbol} />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            !projectInfo.labelData.hasSterilizationProcess && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={nonSterileSymbol} />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            !projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.canBeUsedIfDamaged && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={package_is_damageSymbol} />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            !projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasSterileFluidPath && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={sterile_fluid_pathSymbol} />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            !projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasVaporizedHydrogenPeroxide && (
              <div className="symbol-content-item">
                <img
                  className="symbol-img"
                  src={VaporizedHydrogenPeroxideSymbol}
                />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            !projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasSingleSterileBarrierSystem && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={single_S_B_S} />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            !projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasTwoSterileBarrierSystems && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={double_S_B_S} />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            !projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData
              .hasSingleSterileBarrierSystemWithProtectiveInside && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={double_S_B_S_inside} />
              </div>
            )}

          {projectInfo.labelData.isSterile &&
            !projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData
              .hasSingleSterileBarrierSystemWithProtectiveOutside && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={double_S_B_S_outside} />
              </div>
            )}

          {projectInfo.labelData.needInstructionsForUse &&
            !projectInfo.labelData.eIFULink && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={consult_instruction_for_use} />
                {projectInfo.labelData.eIFULink && (
                  <div className="">
                    <p>{projectInfo.labelData.eIFULink}</p>
                  </div>
                )}
              </div>
            )}

          {/* storage */}

          {projectInfo.labelData.requiresCarefulHandling && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={fragile_handle_with_care} />
            </div>
          )}

          {projectInfo.labelData.requiresProtectionFromLight && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={keep_away_from_sunlight} />
            </div>
          )}

          {projectInfo.labelData
            .requiresProtectionFromHeatAndRadioactiveSources && (
            <div className="symbol-content-item">
              <img
                className="symbol-img"
                src={protect_from_heat_and_radioactive_soures}
              />
            </div>
          )}

          {projectInfo.labelData.requiresProtectionFromMoisture && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={keep_dry} />
            </div>
          )}

          {projectInfo.labelData.hasLowerLimitOfTemperature &&
            projectInfo.labelData.hasUpperLimitOfTemperature == false && (
              <div
                style={{ display: "flex", height: "auto", backgroundColor: "" }}
                className=""
              >
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <p
                    style={{
                      marginBottom: "-3px",
                      marginRight: "-13px",
                      zIndex: "2",
                    }}
                  >
                    {projectInfo.labelData.lowerTemperatureLimit}
                  </p>
                </div>
                <img
                  className="symbol-img"
                  style={{ width: "5vw" }}
                  src={lower_limit_temperaure}
                />
              </div>
            )}

          {projectInfo.labelData.hasUpperLimitOfTemperature &&
            projectInfo.labelData.hasLowerLimitOfTemperature == false && (
              <div
                style={{ display: "flex", height: "50px", backgroundColor: "" }}
                className=""
              >
                <img
                  className="symbol-img"
                  style={{ width: "5vw" }}
                  src={upper_limit_temperaure}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <p
                    style={{
                      marginTop: "-2px",
                      marginLeft: "-13px",
                      zIndex: "2",
                    }}
                  >
                    {projectInfo.labelData.upperTemperatureLimit}
                  </p>
                </div>
              </div>
            )}
          {/* modified !! */}
          {projectInfo.labelData.hasUpperLimitOfTemperature == true &&
            projectInfo.labelData.hasLowerLimitOfTemperature == true && (
              <div
                style={{ display: "flex", height: "50px", backgroundColor: "" }}
                className=""
              >
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <p
                    style={{
                      marginBottom: "-0.4vh",
                      marginRight: "-6px",
                      zIndex: "2",
                      fontSize: "1vw",
                    }}
                  >
                    {projectInfo.labelData.lowerTemperatureLimit}
                  </p>
                </div>
                <img
                  className="symbol-img"
                  style={{ width: "2vw", height: "2vh" }}
                  src={temperature}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <p
                    style={{
                      marginTop: "-0.4vh",
                      marginLeft: "-6px",
                      zIndex: "2",
                      fontSize: "1vw",
                    }}
                  >
                    {projectInfo.labelData.upperTemperatureLimit}
                  </p>
                </div>
              </div>
            )}

          {projectInfo.labelData.hasHumidityRange && (
            <div
              style={{ display: "flex", height: "50px", backgroundColor: "" }}
              className=""
            >
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <p
                  style={{
                    marginBottom: "-10px",
                    marginRight: "px",
                    zIndex: "2",
                  }}
                >
                  {projectInfo.labelData.humidityMin}%
                </p>
              </div>
              <img className="symbol-img" src={HumidityLimit} />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <p style={{ marginTop: "-11px", zIndex: "2" }}>
                  {projectInfo.labelData.humidityMax}%
                </p>
              </div>
            </div>
          )}

          {projectInfo.labelData.hasAtmosphericPressureRange && (
            <div
              style={{ display: "flex", height: "50px", backgroundColor: "" }}
              className=""
            >
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <p
                  style={{
                    marginBottom: "-10px",
                    marginRight: "px",
                    zIndex: "2",
                  }}
                >
                  {projectInfo.labelData.atmosphericPressureMax}
                </p>
              </div>
              <img className="symbol-img" src={AtmPressureLimit} />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <p style={{ marginTop: "-11px", zIndex: "2" }}>
                  {projectInfo.labelData.atmosphericPressureMax}
                </p>
              </div>
            </div>
          )}

          {/* safe use */}

          {projectInfo.labelData.hasBiologicalRisks && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={biological_risks} />
            </div>
          )}

          {projectInfo.labelData.isIntendedForSingleUse && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={do_not_re_use} />
            </div>
          )}

          {projectInfo.labelData.needCaution && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={caution} />
            </div>
          )}

          {projectInfo.labelData.containsRubberLatex && (
            <div className="symbol-content-item">
              <img
                className="symbol-img"
                src={contains_or_presence_of_natural_rubber_latex}
              />
            </div>
          )}

          {projectInfo.labelData.containsBloodDerivatives && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={contains_human_blood} />
            </div>
          )}

          {projectInfo.labelData.containsMedicinalSubstance && (
            <div className="symbol-content-item">
              <img
                className="symbol-img"
                src={Contains_a_medicinal_substance}
              />
            </div>
          )}

          {projectInfo.labelData.containsAnimalOriginMaterial && (
            <div className="symbol-content-item">
              <img
                className="symbol-img"
                src={Contains_biological_material_of_animal_origin}
              />
            </div>
          )}

          {projectInfo.labelData.containsHumanOriginMaterial && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Contains_human_origin} />
            </div>
          )}

          {projectInfo.labelData.containsHazardousSubstances && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Contains_hazardous_substances} />
            </div>
          )}

          {projectInfo.labelData.containsNanoMaterials && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Contains_nano_materials} />
            </div>
          )}

          {projectInfo.labelData.multipleUsesOnSinglePatient && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Single_patient_multiple_use} />
            </div>
          )}

          {/* Diagnostic IVD */}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.isControlMaterial && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={control} />
              </div>
            )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.isControlMaterialForNegativeRange && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={control_negative} />
              </div>
            )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.isControlMaterialForPositiveRange && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={control_positive} />
              </div>
            )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.isIVDForPerformanceEvaluation && (
              <div className="symbol-content-item">
                <img
                  className="symbol-img"
                  src={for_IVD_performance_evaluation_only}
                />
              </div>
            )}

          {projectInfo.labelData.isMedicalDeviceForSampleCollection && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={sampling_site} />
            </div>
          )}

          {projectInfo.labelData.hasFluidPath && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={fluid_path} />
            </div>
          )}

          {projectInfo.labelData.isNonPyrogenic && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Non_pyrogenic} />
            </div>
          )}

          {projectInfo.labelData.hasOneWayValve && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={one_way_valve} />
            </div>
          )}

          {projectInfo.labelData.numberOfDropsPerMilliliter !==
            "Not applicable" && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Drops_per_millilitre} />
              <div>
                <p>{projectInfo.labelData.numberOfDropsPerMilliliter}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.liquidFilterPoreSize !== "Not applicable" && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Liquid_filter_with_pore_size} />
              <div>
                <p>{projectInfo.labelData.liquidFilterPoreSize}</p>
              </div>
            </div>
          )}
        </div>
      );

      return null;
    }
  };

  const paragraphOnly = () => {
    if (projectInfo && projectInfo.labelData) {
      return (
        <div className="symbol-content paragraph-only">
          {projectInfo.labelData.productName && (
            <div className="symbol-content-item">
              <p>{projectInfo.labelData.productName}</p>
            </div>
          )}

          {projectInfo.labelData.intendedPurpose && (
            <div className="symbol-content-item">
              <p>{projectInfo.labelData.intendedPurpose}</p>
            </div>
          )}

          {projectInfo.labelData.packagingContents && (
            <div className="symbol-content-item">
              <p>{projectInfo.labelData.packagingContents}</p>
            </div>
          )}

          {projectInfo.labelData.containsCMRSubstances && (
            <div className="symbol-content-item">
              {projectInfo.labelData.cmrSubstancesList && (
                <p>{projectInfo.labelData.cmrSubstancesList}</p>
              )}
            </div>
          )}

          {projectInfo.labelData.intendedForIntroduction && (
            <div className="symbol-content-item">
              {projectInfo.labelData.qualitativeComposition && (
                <p>{projectInfo.labelData.qualitativeComposition}</p>
              )}
              {projectInfo.labelData.quantitativeInformation && (
                <p>{projectInfo.labelData.quantitativeInformation}</p>
              )}
            </div>
          )}

          {projectInfo.labelData.customMadeDevice && (
            <div className="symbol-content-item">
              <p>custom-made device</p>
            </div>
          )}

          {projectInfo.labelData.clinicalInvestigationOnly && (
            <div className="symbol-content-item">
              <p>exclusively for clinical investigation</p>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const otherSymbols = () => {
    if (projectInfo && projectInfo.labelData) {
      return (
        <div className="symbol-content other-symbols">
          {projectInfo.labelData.productClass == "Class I" ? (
            <div className="symbol-content-item">
              <img className="symbol-img" src={CE_mark} />
            </div>
          ) : (
            <div className="symbol-content-item">
              <img className="symbol-img" src={CE_mark} />
              <div className="symbol-info">
                <p>{projectInfo.labelData.notifiedBodyNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.quantity > 0 && (
            <div className="symbol-content-item">
              <p>QTY: {projectInfo.labelData.quantity}</p>
            </div>
          )}

          {projectInfo.labelData.addWebsite && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              className="symbol-content-item"
            >
              <img className="symbol-img" src={Patient_information_website} />
              <div>
                <p>{projectInfo.labelData.website}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const imgWithPar_label2 = () => {
    if (projectInfo && projectInfo.labelData) {
      return (
        <div className="symbol-content img-with-paragraph">
          {projectInfo.labelData.dateOfManufacture && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Date_of_manufactureSymbol} />
              <div className="">
                <p>{projectInfo.labelData.dateOfManufacture}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.catalogueNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={catalogueNumberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.catalogueNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.modelNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={modelNumberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.modelNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.LOTNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Batch_codeSymbol} />
              <div className="">
                <p>{projectInfo.labelData.LOTNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.serialNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Serial_numberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.serialNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.needInstructionsForUse &&
            projectInfo.labelData.eIFULink && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={consult_instruction_for_use} />
                {projectInfo.labelData.eIFULink && (
                  <div className="">
                    <p>{projectInfo.labelData.eIFULink}</p>
                  </div>
                )}
              </div>
            )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.hasSpecificNumberOfTests && (
              <div
                className="symbol-content-item"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  style={{
                    width: "80%",
                    height: "40px",
                    marginBottom: "-0px",
                    marginTop: "5px",
                  }}
                  className="symbol-img"
                  src={contains_suffient_for_n_tests}
                />
                {projectInfo.labelData.numberOfTests && (
                  <div className="">
                    <p style={{ marginTop: "0px", marginLeft: "-5px" }}>
                      {projectInfo.labelData.numberOfTests}
                    </p>
                  </div>
                )}
              </div>
            )}

          {projectInfo.labelData.associatedWithIndividualPatient &&
            projectInfo.labelData.date && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={date} />
                <div>
                  <p>{projectInfo.labelData.date}</p>
                </div>
              </div>
            )}

          {projectInfo.labelData.productClass == "Class I" ? (
            <div className="symbol-content-item">
              <img className="symbol-img" src={CE_mark} />
            </div>
          ) : (
            <div className="symbol-content-item">
              <img className="symbol-img" src={CE_mark} />
              <div className="symbol-info">
                <p>{projectInfo.labelData.notifiedBodyNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.addWebsite && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              className="symbol-content-item"
            >
              <img className="symbol-img" src={Patient_information_website} />
              <div>
                <p>{projectInfo.labelData.website}</p>
              </div>
            </div>
          )}

          {/* {projectInfo.labelData.quantity > 0 &&
                    <div style={{fontSize:'24px'}} className='symbol-content-item'>
                      <p style={{fontSize:'23px'}}>QTY: {projectInfo.labelData.quantity}</p>
                    </div>} */}

          {/* {projectInfo.labelData.addWebsite &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Patient_information_website} />
                    <div>
                      <p>{projectInfo.labelData.website}</p>
                    </div>
                  </div>} */}
        </div>
      );
    }

    return null;
  };

  // ---- UDI handler functions ----

  //  ---- update ----
  const handleUDI = () => {
    if (projectInfo && projectInfo.labelData) {
      const {
        udiDI,
        dateOfManufacture,
        useByDate,
        serialNumber,
        LOTNumber,
        aidc,
        haDateOfManufacture,
        hasLotNumber,
        haSerialNumber,
      } = projectInfo.labelData;

      let udiData =
        (udiDI && udiDI !== "" ? "(01)" + udiDI : "") +
        (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== ""
          ? "(11)" + "XXXXXXXX"
          : "") +
        (useByDate && useByDate !== ""
          ? "(17)" + convertDateToYYMMDD(useByDate)
          : "") +
        (hasLotNumber && LOTNumber && LOTNumber !== ""
          ? "(10)" + "XXXXXXXX"
          : "") +
        (haSerialNumber && serialNumber && serialNumber !== ""
          ? "(21)" + "XXXXXXXX"
          : "");
      let udiPI =
        (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== ""
          ? "(11)" + "XXXXXXXX"
          : "") +
        (useByDate && useByDate !== ""
          ? "(17)" + convertDateToYYMMDD(useByDate)
          : "") +
        (hasLotNumber && LOTNumber && LOTNumber !== ""
          ? "(10)" + "XXXXXXXX"
          : "") +
        (haSerialNumber && serialNumber && serialNumber !== ""
          ? "(21)" + "XXXXXXXX"
          : "");

      if (projectInfo.labelData.udiFormat == "GS1") {
        if (projectInfo.labelData.udiType == "GS1 (1D Bar Code)") {
          JsBarcode("#gs1-barcode", udiData, {
            format: "CODE128",
            width: 0.4, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: "white", // Set the background color of the SVG
            lineColor: "black", // Set the color of the bars });
            fontSize: 10,
          });

          // console.log(udiData, udiDI, dateOfManufacture, useByDate, serialNumber, LOTNumber, aidc)
          return (
            <div style={{ textAlign: "center", width: "100%" }}>
              <svg id="gs1-barcode" style={{ width: "100%" }}></svg>
              <p style={{ fontSize: "7px", fontWeight: "600" }}>{udiData}</p>
            </div>
          );
        }
        if (projectInfo.labelData.udiType == "GS1 (Separate Bar Code)") {
          JsBarcode("#gs1-barcode-udiDI", udiDI, {
            format: "CODE128",
            width: 0.4, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: "white", // Set the background color of the SVG
            lineColor: "black", // Set the color of the bars });
            fontSize: 10,
          });

          JsBarcode("#gs1-barcode-udiPI", udiPI, {
            format: "CODE128",
            width: 0.35, // Set the width of the bars
            height: 40, // Set the height of the bars
            displayValue: false, // Show the human-readable value below the barcode
            background: "white", // Set the background color of the SVG
            lineColor: "black", // Set the color of the bars });
            fontSize: 10,
          });
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "",
                alignItems: "center",
                flexWrap: "wrap",
                gridGap: "5px",
                width: "100%",
              }}
            >
              <div style={{ textAlign: "center", margin: "0" }}>
                <svg id="gs1-barcode-udiDI" style={{ width: "100%" }}></svg>
                <p style={{ fontSize: "6px", fontWeight: "900" }}>
                  (01){udiDI}
                </p>
              </div>
              <div style={{ textAlign: "center", margin: "0" }}>
                <svg id="gs1-barcode-udiPI" style={{ width: "100%" }}></svg>
                <p style={{ fontSize: "6px", fontWeight: "900" }}>{udiPI}</p>
              </div>
            </div>
          );
        }
        // if(projectInfo.labelData.udiType == 'GS1 (Data Matrix)'){
        //     let canvas = document.createElement("canvas");
        //      bwipjs.toCanvas(canvas, {
        //       bcid: "datamatrix", // Barcode type
        //       text: aidc, // Text to encode
        //       scale: 5, // 3x scaling factor
        //       height: 10, // Bar height, in millimeters
        //       includetext: true, // Show human-readable text
        //       textxalign: "center" // Always good to set this
        //     });
        //     setImageSrc(canvas.toDataURL("image/png"));
        //   return (
        //     <div style={{display:'flex', alignItems:'center'}}>
        //       {imageSrc &&
        //         <>
        //         <img  width={"100px"} src={imageSrc} alt={`data matrix from`} />
        //         <div style={{fontSize:'12px'}}>
        //           {dateOfManufacture !== '' && <p style={{margin:'2px 10px'}}>{"(11)" + convertDateToYYMMDD(projectInfo.labelData.dateOfManufacture)}</p>}
        //           {useByDate !== '' && <p style={{margin:'2px 10px'}}>{"(17)" + convertDateToYYMMDD(projectInfo.labelData.useByDate)}</p>}
        //           {LOTNumber !== '' && <p style={{margin:'2px 10px'}}>{"(10)" + projectInfo.labelData.LOTNumber}</p>}
        //           {serialNumber !== '' && <p style={{margin:'2px 10px'}}>{"(21)" + projectInfo.labelData.serialNumber}</p>}
        //           </div>
        //         </>
        //       }
        //     </div>
        //   )
        // }
      }

      if (projectInfo.labelData.udiFormat == "HIBCC") {
        JsBarcode("#hibcc-barcode", udiData, {
          format: "CODE128",
          width: 0.4, // Set the width of the bars
          height: 40, // Set the height of the bars
          displayValue: false, // Show the human-readable value below the barcode
          background: "white", // Set the background color of the SVG
          lineColor: "black", // Set the color of the bars });
          fontSize: 10,
        });
        return (
          <div style={{ textAlign: "center", width: "100%" }}>
            <svg id="hibcc-barcode" style={{ width: "100%" }}></svg>
            <p style={{ fontSize: "7px", fontWeight: "600" }}>{udiData}</p>
          </div>
        );
      }
      if (projectInfo.labelData.udiFormat == "ICCBBA") {
        JsBarcode("#iccbba-barcode", udiData, {
          format: "CODE128",
          width: 0.4, // Set the width of the bars
          height: 40, // Set the height of the bars
          displayValue: false, // Show the human-readable value below the barcode
          background: "white", // Set the background color of the SVG
          lineColor: "black", // Set the color of the bars });
          fontSize: 10,
        });
        return (
          <div style={{ textAlign: "center", width: "100%" }}>
            <svg id="iccbba-barcode" style={{ width: "100%" }}></svg>
            <p style={{ fontSize: "7px", fontWeight: "600" }}>{udiData}</p>
          </div>
        );
      }
      if (projectInfo.labelData.udiFormat == "IFA") {
        JsBarcode("#ifa-barcode", udiData, {
          format: "CODE128",
          width: 0.4, // Set the width of the bars
          height: 40, // Set the height of the bars
          displayValue: false, // Show the human-readable value below the barcode
          background: "white", // Set the background color of the SVG
          lineColor: "black", // Set the color of the bars });
          fontSize: 10,
        });
        return (
          <div style={{ textAlign: "center", width: "100%" }}>
            <svg id="ifa-barcode" style={{ width: "100%" }}></svg>
            <p style={{ fontSize: "7px", fontWeight: "600" }}>{udiData}</p>
          </div>
        );
      }
    }
    return null;
  };

  // data matri
  const [dataMatrixValue, setDataMatrixValue] = useState("123");
  useEffect(() => {
    handleUDI();
    if (projectInfo && projectInfo.labelData) {
      const {
        udiDI,
        dateOfManufacture,
        useByDate,
        serialNumber,
        LOTNumber,
        aidc,
        haDateOfManufacture,
        hasLotNumber,
        haSerialNumber,
      } = projectInfo.labelData;

      let udiData =
        (udiDI && udiDI !== "" ? "(01)" + udiDI : "") +
        (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== ""
          ? "(11)" + "XXXXXXXX"
          : "") +
        (useByDate && useByDate !== ""
          ? "(17)" + convertDateToYYMMDD(useByDate)
          : "") +
        (hasLotNumber && LOTNumber && LOTNumber !== ""
          ? "(10)" + "XXXXXXXX"
          : "") +
        (haSerialNumber && serialNumber && serialNumber !== ""
          ? "(21)" + "XXXXXXXX"
          : "");
      let udiPI =
        (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== ""
          ? "(11)" + "XXXXXXXX"
          : "") +
        (useByDate && useByDate !== ""
          ? "(17)" + convertDateToYYMMDD(useByDate)
          : "") +
        (hasLotNumber && LOTNumber && LOTNumber !== ""
          ? "(10)" + "XXXXXXXX"
          : "") +
        (haSerialNumber && serialNumber && serialNumber !== ""
          ? "(21)" + "XXXXXXXX"
          : "");

      setDataMatrixValue(udiData || "123");
    }
  }, [projectInfo]);

  useEffect(() => {
    let canvas = document.createElement("canvas");
    bwipjs.toCanvas(canvas, {
      bcid: "datamatrix", // Barcode type
      text: dataMatrixValue, // Text to encode
      scale: 10, // 3x scaling factor
      height: 15, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: "center", // Always good to set this
    });
    setImageSrc(canvas.toDataURL("image/png"));
  }, [dataMatrixValue]);

  // --------- new label design ----------
  const symbolsWithTextBehind = () => {
    if (projectInfo && projectInfo.labelData) {
      return (
        <div className="symbols-with-text-behind">
          {projectInfo.labelData.associatedWithIndividualPatient &&
            (projectInfo.labelData.healthCareCentreName == "" ||
              projectInfo.labelData.healthCareCentreAddress == "" ||
              projectInfo.labelData.doctorName == "") && (
              <div className="symbol-content-item symbol-content-item-with-text">
                <img
                  className="symbol-img"
                  src={Health_care_centre_or_doctor}
                />
                <div>
                  {projectInfo.labelData.healthCareCentreName && (
                    <p>{projectInfo.labelData.healthCareCentreName}</p>
                  )}
                  {projectInfo.labelData.healthCareCentreAddress && (
                    <p>{projectInfo.labelData.healthCareCentreAddress}</p>
                  )}
                  {projectInfo.labelData.doctorName && (
                    <p>{projectInfo.labelData.doctorName}</p>
                  )}
                </div>
              </div>
            )}

          {projectInfo.labelData.translationActivity && (
            <div className="symbol-content-item symbol-content-item-with-text">
              <img className="symbol-img sm-img" src={Translation} />
              <div>
                {projectInfo.labelData.translationEntityName && (
                  <p>{projectInfo.labelData.translationEntityName}</p>
                )}
                {projectInfo.labelData.translationEntityAddress && (
                  <p>{projectInfo.labelData.translationEntityAddress}</p>
                )}
              </div>
            </div>
          )}

          {projectInfo.labelData.modificationToPackaging && (
            <div className="symbol-content-item symbol-content-item-with-text">
              <img className="symbol-img sm-img" src={Repackaging} />
              <div>
                {projectInfo.labelData.repackagingEntityName && (
                  <p>{projectInfo.labelData.repackagingEntityName}</p>
                )}
                {projectInfo.labelData.repackagingEntityAddress && (
                  <p>{projectInfo.labelData.repackagingEntityAddress}</p>
                )}
              </div>
            </div>
          )}
          {projectInfo.labelData.associatedWithIndividualPatient &&
            (projectInfo.labelData.patientName ||
              projectInfo.labelData.patientNumber) && (
              <div className="symbol-content-item symbol-content-item-with-text">
                <img className="symbol-img" src={patient_identification} />
                <div>
                  <p>{projectInfo.labelData.patientName}</p>
                  <p>{projectInfo.labelData.patientNumber}</p>
                </div>
              </div>
            )}

          {/* sterility */}
          {projectInfo.labelData.isSterile ? (
            projectInfo.labelData.hasSterilizationProcess &&
            (projectInfo.labelData.hasVaporizedHydrogenPeroxide == true ||
              projectInfo.labelData.hasAsepticProcessing == true ||
              projectInfo.labelData.hasEthyleneOxide == true ||
              projectInfo.labelData.hasIrradiation == true ||
              projectInfo.labelData.hasSteamOrDryHeat == true) ? null : (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={sterileSymbol}
                />
              </div>
            )
          ) : null}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasAsepticProcessing && (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={sterile_ASymbol}
                />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasEthyleneOxide && (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={Sterile_EOSymbol}
                />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasIrradiation && (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={Sterile_RSymbol}
                />
              </div>
            )}
          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasSteamOrDryHeat && (
              <div className="symbol-content-item sterileSymbol">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={Sterilized_usings_team_or_dry_heatSymbol}
                />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            // projectInfo.labelData.hasSterilizationProcess &&
            !projectInfo.labelData.isIntendedToBeResterilized && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={do_not_resterilizeSymbol} />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess == false && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={nonSterileSymbol} />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess == false &&
            projectInfo.labelData.canBeUsedIfDamaged && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={package_is_damageSymbol} />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess == false &&
            projectInfo.labelData.hasSterileFluidPath && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={sterile_fluid_pathSymbol} />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess &&
            projectInfo.labelData.hasVaporizedHydrogenPeroxide && (
              <div className="symbol-content-item">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={VaporizedHydrogenPeroxideSymbol}
                />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess == false &&
            projectInfo.labelData.hasSingleSterileBarrierSystem && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={single_S_B_S} />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess == false &&
            projectInfo.labelData.hasTwoSterileBarrierSystems && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={double_S_B_S} />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess == false &&
            projectInfo.labelData
              .hasSingleSterileBarrierSystemWithProtectiveInside && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={double_S_B_S_inside} />
              </div>
            )}

          {projectInfo.labelData.isSterile == true &&
            projectInfo.labelData.hasSterilizationProcess == false &&
            projectInfo.labelData
              .hasSingleSterileBarrierSystemWithProtectiveOutside && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={double_S_B_S_outside} />
              </div>
            )}

          {projectInfo.labelData.needInstructionsForUse &&
            !projectInfo.labelData.eIFULink && (
              <div className="symbol-content-item">
                <img className="symbol-img" src={consult_instruction_for_use} />
                {projectInfo.labelData.eIFULink && (
                   <div className="">
                    <p>{projectInfo.labelData.eIFULink}</p>
                  </div>
                )}
              </div>
            )}

          {/* storage */}

          {projectInfo.labelData.requiresCarefulHandling && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={fragile_handle_with_care} />
            </div>
          )}

          {projectInfo.labelData.requiresProtectionFromLight && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={keep_away_from_sunlight} />
            </div>
          )}

          {projectInfo.labelData
            .requiresProtectionFromHeatAndRadioactiveSources && (
            <div className="symbol-content-item">
              <img
                className="symbol-img"
                src={protect_from_heat_and_radioactive_soures}
              />
            </div>
          )}

          {projectInfo.labelData.requiresProtectionFromMoisture && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={keep_dry} />
            </div>
          )}

          {projectInfo.labelData.hasLowerLimitOfTemperature &&
            !projectInfo.labelData.hasUpperLimitOfTemperature && (
              <div className="symbol-content-item symbol-content-item-range">
                <p className="min-temperature p-1 m-1">
                  {projectInfo.labelData.lowerTemperatureLimit}
                  {projectInfo?.labelData?.temperatureUnite}
                </p>
                <img className="symbol-img" src={lower_limit_temperaure} />
              </div>
            )}

          {projectInfo.labelData.hasUpperLimitOfTemperature &&
            !projectInfo.labelData.hasLowerLimitOfTemperature && (
              <div className="symbol-content-item symbol-content-item-range">
                <img
                  className="symbol-img p-1 m-1"
                  src={upper_limit_temperaure}
                />
                <p className="max-temperature">
                  {projectInfo.labelData.upperTemperatureLimit}
                  {projectInfo?.labelData?.temperatureUnite}
                </p>
              </div>
            )}

          {projectInfo.labelData.hasUpperLimitOfTemperature &&
            projectInfo.labelData.hasLowerLimitOfTemperature && (
              <div className="symbol-content-item symbol-content-item-range">
                <p className="min-temperature">
                  {projectInfo.labelData.lowerTemperatureLimit}
                  {projectInfo?.labelData?.temperatureUnite}
                </p>
                <img className="symbol-img p-1 m-1" src={temperature} />
                <p className="max-temperature">
                  {projectInfo.labelData.upperTemperatureLimit}
                  {projectInfo?.labelData?.temperatureUnite}
                </p>
              </div>
            )}

          {projectInfo.labelData.hasHumidityRange && (
            <div className="symbol-content-item symbol-content-item-range">
              <p className="min mt-1">{projectInfo.labelData.humidityMin}%</p>
              <img className="symbol-img p" src={HumidityLimit} />
              <p className="max ">{projectInfo.labelData.humidityMax}%</p>
            </div>
          )}

          {projectInfo.labelData.hasAtmosphericPressureRange && (
            <div className="symbol-content-item symbol-content-item-range">
              <p className="min">
                {projectInfo.labelData.atmosphericPressureMin}
              </p>
              <img className="symbol-img" src={AtmPressureLimit} />
              <p className="max">
                {projectInfo.labelData.atmosphericPressureMax}
              </p>
            </div>
          )}

          {/* safe use */}

          {projectInfo.labelData.hasBiologicalRisks && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={biological_risks} />
            </div>
          )}

          {projectInfo.labelData.isIntendedForSingleUse && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={do_not_re_use} />
            </div>
          )}

          {projectInfo.labelData.needCaution && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={caution} />
            </div>
          )}

          {projectInfo.labelData.containsRubberLatex && (
            <div className="symbol-content-item">
              <img
                className="symbol-img"
                src={contains_or_presence_of_natural_rubber_latex}
              />
            </div>
          )}

          {projectInfo.labelData.containsBloodDerivatives && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={contains_human_blood} />
            </div>
          )}

          {projectInfo.labelData.containsMedicinalSubstance && (
            <div className="symbol-content-item">
              <img
                className="symbol-img"
                src={Contains_a_medicinal_substance}
              />
            </div>
          )}

          {projectInfo.labelData.containsAnimalOriginMaterial && (
            <div className="symbol-content-item">
              <img
                className="symbol-img"
                src={Contains_biological_material_of_animal_origin}
              />
            </div>
          )}

          {projectInfo.labelData.containsHumanOriginMaterial && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Contains_human_origin} />
            </div>
          )}

          {projectInfo.labelData.containsHazardousSubstances && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Contains_hazardous_substances} />
            </div>
          )}

          {projectInfo.labelData.containsNanoMaterials && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Contains_nano_materials} />
            </div>
          )}

          {projectInfo.labelData.multipleUsesOnSinglePatient && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Single_patient_multiple_use} />
            </div>
          )}

          {/* Diagnostic IVD */}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.isControlMaterial && (
              <div className="symbol-content-item">
                <img className="symbol-img sterileSymbol-img" src={control} />
              </div>
            )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.isControlMaterialForNegativeRange && (
              <div className="symbol-content-item">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={control_negative}
                />
              </div>
            )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.isControlMaterialForPositiveRange && (
              <div className="symbol-content-item">
                <img
                  className="symbol-img sterileSymbol-img"
                  src={control_positive}
                />
              </div>
            )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.isIVDForPerformanceEvaluation && (
              <div className="symbol-content-item">
                <img
                  className="symbol-img"
                  src={for_IVD_performance_evaluation_only}
                />
              </div>
            )}

          {projectInfo.labelData.productType ==
            "In Vitro Diagnostic (IVD) Medical Device" &&
            projectInfo.labelData.hasSpecificNumberOfTests && (
              <div
                className="symbol-content-item"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  style={{
                    width: "80%",
                    height: "40px",
                    marginBottom: "-0px",
                    marginTop: "5px",
                  }}
                  className="symbol-img"
                  src={contains_suffient_for_n_tests}
                />
                {projectInfo.labelData.numberOfTests && (
                  <div className="">
                    <p style={{ marginTop: "0px", marginLeft: "-5px" }}>
                      {projectInfo.labelData.numberOfTests}
                    </p>
                  </div>
                )}
              </div>
            )}

          {projectInfo.labelData.isMedicalDeviceForSampleCollection && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={sampling_site} />
            </div>
          )}

          {projectInfo.labelData.hasFluidPath && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={fluid_path} />
            </div>
          )}

          {projectInfo.labelData.isNonPyrogenic && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Non_pyrogenic} />
            </div>
          )}

          {projectInfo.labelData.hasOneWayValve && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={one_way_valve} />
            </div>
          )}

          {projectInfo.labelData.numberOfDropsPerMilliliter !==
            "Not applicable" && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Drops_per_millilitre} />
              <div>
                <p>{projectInfo.labelData.numberOfDropsPerMilliliter}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.liquidFilterPoreSize !== "Not applicable" && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Liquid_filter_with_pore_size} />
              <div>
                <p>{projectInfo.labelData.liquidFilterPoreSize}</p>
              </div>
            </div>
          )}

          {/* {projectInfo.labelData.reprocessedDevice &&
                  <div className='symbol-content-item'>
                    <img className='symbol-img' src={Repackaging} />
                    <div>
                      {projectInfo.labelData.reprocessingCycles &&
                        <p>number of reprocessing cycles: {projectInfo.labelData.reprocessingCycles}</p>}
                      {projectInfo.labelData.reprocessingLimitation &&
                        <p>{projectInfo.labelData.reprocessingLimitation}</p>}
                    </div>
                  </div>}  */}

          {projectInfo.labelData.needInstructionsForUse && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={consult_instruction_for_use} />
              {projectInfo.labelData.eIFULink && (
                <div className="">
                  <p>{projectInfo.labelData.eIFULink}</p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return;
  };
  const projectOwnerInfo = () => {
    if (projectInfo && projectInfo.labelData) {
      return (
        <div className="project-owner-info">
          <div className="symbol-content-item" style={{ width: "" }}>
            <img className="symbol-img" src={Manufacturer} />
            <div className="">
              <p>{projectInfo?.labelData?.manufacturerName}</p>
              <p>{projectInfo?.labelData?.manufacturerAddress}</p>
              <p>{projectInfo?.labelData?.manufacturerCity}</p>
              <p>{projectInfo?.labelData?.manufacturerCountry}</p>
            </div>
          </div>

          {projectInfo.labelData.hasDistributor && (
            <div className="symbol-content-item" style={{ width: "" }}>
              <img className="symbol-img" src={Distributor} />
              <div className="">
                <p>{projectInfo.labelData.distributorName}</p>
                <p>{projectInfo.labelData.distributorAddress}</p>
              </div>
            </div>
          )}
          {projectInfo.labelData.useByDate && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Use_by_date} />
              <div className="">
                <p>{projectInfo.labelData.useByDate}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.haDateOfManufacture && (
            <div className="symbol-content-item">
              <img
                className="symbol-img manufacture-img"
                src={Date_of_manufactureSymbol}
              />
              <div className="">
                <p>{projectInfo.labelData.dateOfManufacture}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.hasLotNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Batch_codeSymbol} />
              <div className="">
                <p>{projectInfo.labelData.LOTNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.haSerialNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Serial_numberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.serialNumber}</p>
              </div>
            </div>
          )}

          {(projectInfo.labelData.catalogueNumber ||
            projectInfo.labelData.modelNumber) && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={catalogueNumberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.catalogueNumber}</p>
              </div>
            </div>
          )}

          {projectInfo.labelData.modelNumber && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={modelNumberSymbol} />
              <div className="">
                <p>{projectInfo.labelData.modelNumber}</p>
              </div>
            </div>
          )}

          {/* if outside of EUROPE */}
          {!projectInfo.labelData.isOutsideEU && (
            <div className="symbol-content-item">
              <img
                className="symbol-img Authorized_Representative"
                src={Authorized_Representative}
              />
              <div className="">
                <p>{projectInfo.labelData.europeanAuthorizedRepName}</p>
                <p>{projectInfo.labelData.europeanAuthorizedRepAddress}</p>
              </div>
            </div>
          )}
          {!projectInfo.labelData.isOutsideEU && (
            <div className="symbol-content-item">
              <img className="symbol-img" src={Importer} />
              <div className="">
                <p>{projectInfo.labelData.importerName}</p>
                <p>{projectInfo.labelData.importerAddress}</p>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  //  ----------- download functions ---------------
  const componentRef = useRef();
  const handleDownloadImage = (format) => {
    const node = componentRef.current;
    const options = {
      quality: 2, // Set the quality to 1 (maximum quality)
    };
    htmlToImage
      .toPng(node, options)
      .then((dataUrl) => {
        saveAs(dataUrl, `Label.${format}`);
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };
  const handleDownloadSVG = async () => {
    const node = componentRef.current;

    // Set the desired dimensions for resizing
    const desiredWidth = 900; // Replace with your desired width
    const desiredHeight = 630; // Replace with your desired height

    // Resize the SVG element or its content
    // node.style.width = `${desiredWidth}px`;
    // node.style.height = `${desiredHeight}px`;

    try {
      // Generate the resized SVG data URL
      const dataUrl = await htmlToImage.toSvg(node);

      // Create a Blob from the SVG data URL
      const blob = new Blob([dataUrl], { type: "image/svg+xml" });

      // Reset the dimensions to their original values
      node.style.width = null;
      node.style.height = null;

      // Create a download link
      const link = document.createElement("a");

      // Set the link's href attribute to the SVG data URL
      link.href = dataUrl;

      // Set the download attribute with the desired file name
      link.download = "Label.svg";

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();
    } catch (error) {
      console.error("Error generating SVG:", error);

      // Reset the dimensions to their original values in case of an error
      node.style.width = null;
      node.style.height = null;
    }
  };
  const [loader, setLoader] = useState(false);
  const downloadPDF = () => {
    const capture = document.querySelector(".label-2");
    setLoader(true);
    html2canvas(capture, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");

      // Set a specific width and let the height adjust automatically
      const Width = 16; //with cm
      const cmToPx = 37.7952755906; // 1 cm is approximately 37.8 pixels
      const pdfWidth = parseFloat(Width) * cmToPx;
      // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Calculate the height in pixels based on the original aspect ratio
      const aspectRatio = canvas.width / canvas.height;
      const pdfHeight = pdfWidth / aspectRatio;

      // const doc = new jsPDF('l', 'px', 'a4');
      // Set custom PDF dimensions
      const Height = canvas.height * (pdfWidth / canvas.width);
      const doc = new jsPDF({
        unit: "px",
        format: "a0",
        orientation: "landscape",
      });
      const scale = 4; // You can experiment with different scale factors
      doc.scale(300 * scale); // Adjust the DPI based on the scale factor
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();

      // Convert the height to pixels
      const pdfHeightInPx = pdfHeight * cmToPx;
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, Height);
      setLoader(false);
      doc.save("Label.pdf");
    });
  };

  // --------------- collapse ---------------
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleTemplateChange = (templateId) => {
    if (projectInfo.status == "Draft") {
      setActiveTemplate(templateId);
    }
  };

  useEffect(() => {
    if (projectInfo.status == "Draft") {
      setActiveTemplate("Template1");
    } else {
      setActiveTemplate(projectInfo?.labelTemplate);
    }
  }, [projectInfo]);

  // handling zoom of templates

  const handleDownload = () => {
    // Data mapping with custom fields directly included

    // if(labelLogs.length > 0) {
    //   return Swal.info("label logs are not available")
    // }

    const printLogs = labelLogs?.map((log, i) => ({
      "#": `${i + 1}`,
      "Id": `${projectInfo._id}`,
      "Label Id": `${projectInfo.shortId}-V${projectInfo.labelVersion}`,
      // 
      "Label Name": log.labelId.labelName,
      "Version": log.labelVersion,
      "Sender": log.senderId
                ? `${log.senderId.firstName} ${log.senderId.lastName}`
                : "N/A",
      "Receiver": log.recieverId
                  ? `${log.recieverId.firstName} ${log.recieverId.lastName}`
                  : "N/A",
      "Action": log.action,
      "Approved By": log.approvedBy
                      ? `${log.approvedBy.firstName} ${log.approvedBy.lastName}`
                      : "N/A",
      "Released By": log.releasedBy
                      ? `${log.releasedBy.firstName} ${log.releasedBy.lastName}`
                      : "N/A",
      "Rejected By": log.rejectedBy
                      ? `${log.rejectedBy.firstName} ${log.rejectedBy.lastName}`
                      : "N/A",
      "Action Date": new Date(log.createdAt).toLocaleString(),
    }));

    // Define headers for the data rows
    const headers = [
      "#",
      "Id",
      "Label Id",
      "Label Name",
      "Version",
      "Sender",
      "Receiver",
      "Action",
      "Approved By",
      "Released By",
      "Rejected By",
      "Action Date",
    ];

    // Convert data to worksheet
    const ws = utils.json_to_sheet(printLogs, { header: headers });

    // Insert headers as the first row
    utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

    // Adjust column widths
    ws["!cols"] = [
      { wch: 3 }, // Width for '#'
      { wch: 25 }, // Width for 'Id'
      { wch: 17 }, // Width for 'Label Id'
      { wch: 25 }, // Width for 'Label Name'
      { wch: 10 }, // Width for 'Version'
      { wch: 25 }, // Width for 'Sender'
      { wch: 25 }, // Width for 'Receiver'
      { wch: 20 }, // Width for 'Action'
      { wch: 25 }, // Width for 'Sender'
      { wch: 25 }, // Width for 'Approved By'
      { wch: 25 }, // Width for 'Released By'
      { wch: 25 }, // Width for 'Rejected By'
      { wch: 25 }, // Width for 'Print Date'
    ];

    // Apply styles to the header row
    headers.forEach((header, colIndex) => {
      const cellAddress = utils.encode_cell({ r: 0, c: colIndex });
      ws[cellAddress] = {
        v: header,
        s: {
          font: {
            bold: true,
            sz: 18,
            name: "Arial",
          },
          fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background
          alignment: { horizontal: "left" },
        },
      };
    });

    // Apply styles to the body rows
    printLogs.forEach((log, rowIndex) => {
      Object.keys(log).forEach((key, colIndex) => {
        const cellAddress = utils.encode_cell({ r: rowIndex + 1, c: colIndex });
        ws[cellAddress] = {
          v: log[key],
          s: {
            font: {
              sz: 14,
              name: "Arial",
            },
            alignment: { horizontal: "left" },
          },
        };
      });
    });

    // Create a new workbook and add the worksheet
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, `Label Logs sId=${projectInfo.shortId}-V${projectInfo.labelVersion}`);

    // Generate Excel file and trigger download
    writeFile(wb, `LabelLogs-id=${projectInfo.shortId}-V${projectInfo.labelVersion}.xlsx`);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div
      className="label-information"
      style={{ padding: "0", height: "70vh", width: "100%", display: "flex" }}
    >
      <SideBarLabelInfo
        isSidebarOpen={true}
        projectInfo={projectInfo.released}
        status={projectInfo.status}
        onTemplateChange={handleTemplateChange}
        projectId={projectId}
      />

      <main
        className=""
        style={{
          padding: "20px 5px",
          backgroundColor: "",
          margin: "0 auto",
          flex: 0.95,
        }}
      >
        <div style={{ display: "none" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100px" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                width: "300px",
              }}
            >
              <svg
                style={{
                  width: "100px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
                id="gs1-barcode"
              ></svg>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                width: "300px",
              }}
            >
              <svg
                style={{
                  width: "100px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
                id="hibcc-barcode"
              ></svg>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                width: "300px",
              }}
            >
              <svg
                style={{
                  width: "100px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
                id="iccbba-barcode"
              ></svg>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                width: "300px",
              }}
            >
              <svg
                style={{
                  width: "100px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
                id="ifa-barcode"
              ></svg>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
              gridGap: "10px",
            }}
          >
            <div style={{ textAlign: "center", marginRight: "5px" }}>
              <svg id="gs1-barcode-udiDI"></svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <svg id="gs1-barcode-udiPI"></svg>
            </div>
          </div>

          <img width={"100px"} src={imageSrc} alt={`data matrix from`} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "",
          }}
        >
          <Link
            style={{ height: "35px" }}
            to={`/dashboard/labels/${projectInfo?.productId}`}
            className="label-info-link"
          >
            <ArrowBackIcon /> Back
          </Link>
          {!getLabelRequest && (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                {!getLabelRequest && projectInfo && (
                  <h6
                    className="label-info-title"
                    style={{ color: "#", flex: "1", fontSize: "24px" }}
                  >
                    {projectInfo?.labelName}
                  </h6>
                )}
              </div>
              <div style={{ marginTop: "0px", alignItems: "center" }}>
                {projectInfo?.status == "Draft" && (
                  <>
                    <h6>Send Project To:</h6>
                    <div
                      style={{
                        display: "flex",
                        height: "35px",
                        alignItems: "center",
                        width: "250px",
                      }}
                    >
                      <select
                        value={sendTo.receivedId}
                        onChange={(e) =>
                          setSendTo({ ...sendTo, receivedId: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "2px 10px",
                          borderRadius: "10px",
                          outline: "none",
                          border: "2px solid lightGray",
                        }}
                      >
                        <option>Choose User :</option>
                        {allUsersCompany.length > 0 &&
                          allUsersCompany?.map((item) => {
                            return (
                              <option
                                value={`${item._id}`}
                              >{`${item.firstName} ${item.lastName}: ( ${item.role} )`}</option>
                            );
                          })}
                      </select>
                      <button
                        className="mx-2 mb-2"
                        onClick={() => handleSendLabel()}
                        style={{
                          marginRight: "5px",
                          borderRadius: "10px",
                          marginTop: "10px",
                          color: "#fff",
                          backgroundColor: "#08408B",
                          display: "flex",
                          alignItems: "center",
                        }}
                        disabled={sendingProjectRequest ? true : false}
                      >
                        {sendingProjectRequest ? (
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <RotatingLines
                              strokeColor="#011d41"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="30"
                              visible={true}
                            />
                          </div>
                        ) : (
                          "Send"
                        )}
                        <SendIcon
                          style={{
                            marginLeft: "5px",
                            fontSize: "20px",
                            color: "#FFF",
                          }}
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <div></div>
        {!getLabelRequest ? (
          <div className="container">
            {/* <div
              style={{ height: "90vh", width: "" }}
              className="workspace"
            >
              <Template2
                width={"76"}
                height={"102"}
                projectInfo={projectInfo}
                handleUDI={handleUDI}
                imageSrc={imageSrc}
                onSizeChange={handleSizeChange}
              />
            </div> */}
            {/* --------------------------------------------------------- */}

            {size && (
              <p style={{ color: "gray", fontSize: "14px" }}>size: {size}mm</p>
            )}
            <div className="row">
              <div
                className="test col-md-8"
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "",
                  borderRight: "1px solid lightGray",
                }}
              >
                <TransformWrapper initialScale={1}>
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                      <div
                        className=""
                        style={{
                          backgroundColor: "",
                          marginTop: "30px",
                          width: "100%",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "#062D60",
                            color: "#F0F0F0",
                            padding: "2px 10px",
                            margin: "5px",
                            borderRadius: "2px",
                          }}
                          onClick={() => zoomIn()}
                        >
                          +
                        </button>
                        <button
                          style={{
                            backgroundColor: "#062D60",
                            color: "#F0F0F0",
                            padding: "2px 10px",
                            margin: "5px",
                            borderRadius: "2px",
                          }}
                          onClick={() => zoomOut()}
                        >
                          -
                        </button>
                        <button
                          style={{
                            backgroundColor: "#062D60",
                            color: "#F0F0F0",
                            padding: "2px 10px",
                            margin: "5px",
                            borderRadius: "2px",
                          }}
                          onClick={() => resetTransform()}
                        >
                          reset
                        </button>
                      </div>
                      <TransformComponent>
                        <div
                          style={{
                            backgroundColor: "",
                            width: "53vw",
                            height: "",
                            cursor: "zoom-in",
                          }}
                        >
                          <Template1
                            scale={"1"}
                            width={"100"}
                            height={"150"}
                            projectInfo={projectInfo}
                            handleUDI={handleUDI}
                            imageSrc={imageSrc}
                            onSizeChange={handleSizeChange}
                          />
                        </div>
                      </TransformComponent>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>

              <div className="col-lg-4">
                <div className="card p-2 mb-1">
                  <h5>Description :</h5>
                  <div className="">
                    {projectInfo && (
                      <p
                        style={{ fontSize: "14px", color: "gray" }}
                        className="label-info-description"
                      >
                        {projectInfo?.labelDescription}
                      </p>
                    )}
                  </div>
                </div>

                {projectInfo?.comments?.length > 0 && (
                  <>
                    <h6 className="mt-3">Rejected :</h6>
                    <div
                      className="card my-2"
                      style={{ backgroundColor: "#F47560" }}
                    >
                      <div className="card-bod">
                        <div>
                          <div
                            style={{
                              marginBottom: "5px",
                              display: "flex",
                              alignItems: "",
                              backgroundColor: "#EFEFEF",
                              borderRadius: "4px",
                              margin: "2px",
                            }}
                          >
                            <AccountCircleIcon
                              style={{ fontSize: "45px", marginRight: "6px" }}
                            />
                            <div>
                              {
                                projectInfo?.comments[
                                  projectInfo?.comments.length - 1
                                ].name
                              }
                              <p
                                style={{
                                  padding: "0",
                                  margin: "2px 0",
                                  fontSize: "14px",
                                  color: "gray",
                                }}
                              >
                                {projectInfo?.comments[
                                  projectInfo?.comments.length - 1
                                ].role.join("-")}
                              </p>
                            </div>
                          </div>
                          <p style={{ fontSize: "14px", padding: "5px 15px" }}>
                            {
                              projectInfo?.comments[
                                projectInfo?.comments.length - 1
                              ].comment
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="">
                  <div style={{ display: "", gridGap: "10px" }}>
                    <p
                      className="mb-1"
                      style={{
                        color: "gray",
                        fontSize: "14px",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      {" "}
                      Version: {projectInfo?.labelVersion}
                    </p>
                    <p
                      className="mb-1"
                      style={{
                        color: "gray",
                        fontSize: "14px",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      {" "}
                      Created By:
                      {projectInfo?.createdBy?.firstName}
                      {projectInfo?.createdBy?.lastName}{" "}
                    </p>
                    {(projectInfo?.status == "approved" ||
                      projectInfo?.status == "pending_release" ||
                      projectInfo?.status == "released") && (
                      <p
                        className="mb-1"
                        style={{
                          color: "gray",
                          fontSize: "14px",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        {" "}
                        Approved By:
                        {projectInfo?.approvedBy?.firstName}
                        {projectInfo?.approvedBy?.lastName}{" "}
                      </p>
                    )}
                    {projectInfo?.status == "released" && (
                      <p
                        className="mb-1"
                        style={{
                          color: "gray",
                          fontSize: "14px",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        {" "}
                        Released By:
                        {projectInfo?.releaseBy?.firstName}
                        {projectInfo?.releaseBy?.lastName}{" "}
                      </p>
                    )}

                    {projectInfo?.status == "rejected" && (
                      <p
                        className="mb-1"
                        style={{
                          color: "gray",
                          fontSize: "14px",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        {" "}
                        Rejected By:
                        {projectInfo?.rejectedBy?.firstName}
                        {projectInfo?.rejectedBy?.lastName}{" "}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={openModal}
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#062D60",
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    color: "#fff",
                  }}
                >
                  Show Logs
                </button>
              </div>
            </div>

            {/* --------------------------------------------------------- */}
            <div style={{ zIndex: "99999", width: "100%" }}>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Print Logs"
                style={{
                  minHeight: "600px",
                  border: "0",
                  content: {
                    top: "13%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, 0%)",
                    width: "80%",
                    height: "70%", // Set a fixed height
                    overflowY: "scroll", // Enable vertical scrolling
                    backgroundColor: "#ecf0f3",
                    zIndex: "99999",
                  },
                  overlay: {
                    zIndex: "99999",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(2px)",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h6>Label Logs:</h6>
                  <div>
                    <button
                      className="mx-2"
                      onClick={closeModal}
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#062D60",
                        borderRadius: "5px",
                        color: "#fff",
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleDownload}
                      style={{
                        backgroundColor: "lightgray",
                        borderRadius: "4px",
                        border: "2px solid #062D60",
                      }}
                    >
                      <DownloadIcon />
                    </button>
                  </div>
                </div>
                <TableContainer
                  style={{
                    backgroundColor: "#ecf0f3",
                    boxShadow: "none",
                    border: "0",
                    height: "460px",
                  }}
                  className=""
                  component={Paper}
                >
                  <Table
                    style={{
                      backgroundColor: "#ecf0f3",
                      boxShadow: "none",
                      border: "0",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Label
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Version
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Sender
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Receiver
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Action
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Approved By
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Released By
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Rejected By
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >
                          Action Date
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "" }}>
                      {labelLogs.map((log) => (
                        <TableRow key={log._id}>
                          <TableCell style={{ fontSize: "12px" }}>
                            {log.labelId.labelName}
                          </TableCell>
                          <TableCell style={{ fontSize: "12px" }}>
                            {log.labelVersion}
                          </TableCell>
                          <TableCell style={{ fontSize: "12px" }}>
                            {log.senderId
                              ? `${log.senderId.firstName} ${log.senderId.lastName}`
                              : "N/A"}
                          </TableCell>
                          <TableCell style={{ fontSize: "12px" }}>
                            {log.recieverId
                              ? `${log.recieverId.firstName} ${log.recieverId.lastName}`
                              : "N/A"}
                          </TableCell>
                          <TableCell style={{ fontSize: "12px" }}>
                            {log.action}
                          </TableCell>
                          <TableCell style={{ fontSize: "12px" }}>
                            {log.approvedBy
                              ? `${log.approvedBy.firstName} ${log.approvedBy.lastName}`
                              : "N/A"}
                          </TableCell>
                          <TableCell style={{ fontSize: "12px" }}>
                            {log.releasedBy
                              ? `${log.releasedBy.firstName} ${log.releasedBy.lastName}`
                              : "N/A"}
                          </TableCell>
                          <TableCell style={{ fontSize: "12px" }}>
                            {log.rejectedBy
                              ? `${log.rejectedBy.firstName} ${log.rejectedBy.lastName}`
                              : "N/A"}
                          </TableCell>
                          <TableCell style={{ fontSize: "12px" }}>
                            {new Date(log.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Modal>
            </div>
          </div>
        ) : (
          // ----- rotation request -----
          <div
            style={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RotatingLines
              strokeColor="#011d41"
              strokeWidth="5"
              animationDuration="0.75"
              width="90"
              visible={true}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default LabelInformation;
