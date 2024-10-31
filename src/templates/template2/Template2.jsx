import React, { useEffect, useState } from "react";
// manufacturer and product info symbols
import Manufacturer from "../../assets/eIFUSymbols/Manufacturer.png";
import Distributor from "../../assets/eIFUSymbols/Distributor.png";
import Authorized_Representative from "../../assets/eIFUSymbols/Authorized_Representative 2.png";
import Importer from "../../assets/eIFUSymbols/Importer.png";
import CE_mark from "../../assets/eIFUSymbols/CE_mark.png";
import ukca_mark from "../../assets/eIFUSymbols/ukca-mark.webp";
import catalogueNumberSymbol from "../../assets/eIFUSymbols/catalogue_number.png";
import modelNumberSymbol from "../../assets/eIFUSymbols/model_number.png";
import Serial_numberSymbol from "../../assets/eIFUSymbols/Serial_number.png";
import Batch_codeSymbol from "../../assets/eIFUSymbols/Batch_code.png";
import Date_of_manufactureSymbol from "../../assets/eIFUSymbols/Date_of_manufacture.png";
import Use_by_date from "../../assets/eIFUSymbols/Use_by_date.png";

import Medical_deviceSymbol from "../../assets/eIFUSymbols/Medical_device.png";
import IVD from "../../assets/eIFUSymbols/IVD.png";
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
import ImageBase64 from "../../utilities/ImageBase64";
import { handleUDI } from "../../utilities/handleUDI";
import DateFormat from "../../utilities/FormatDate";

// custom styles
import styles from "./template2.module.css";
const {
  template2,
  title,
  templateHeader,
  midHeader,
  headerLeft,
  headerRight,
  productInfo,
  leftSide,
  rightSide,
  rightSide_item,
  rightSide_left,
  rightSide_right,
  leftSideItem,
  ProductInfoHeader,
  leftSideContent,
  symbolContentItem,
  DataMatrixLeftSideContent
} = styles

let customStyles = {
  wrapper: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    flexWrap:'wrap',
  },
  wrapperItem: {
     width:'33%',
     display:'flex',
     alignItems:'center',
     margin:'0.5px'
  },
  image: {
    width:'35px', 
    height:'35px', 
    marginRight:'1px',
    padding:''
  },
  paragraph: {
      padding: '0px',
      margin: '0px',
      fontSize: '6px',
      fontWeight:'600',
  },
  paragraphWrapper: {
    width:`calc(100% - 35px)`,
    width: '100%',
    boxSizing: 'border-box'
  },
  symboleTextBehindWrapper: {
    display: 'flex',
    justifyContent:'space-between',
    alignItems:'flex-start',
    flexWrap:'wrap',
    marginTop:'1px',
    maxHeight:'260px',
  },
  symboleImageWrapper: {
    width:'13.5%', 
    marginBottom:'px',
    padding:'0 3px',
    margin:'2px 2px',
    textAlign:'center',
  },
  symboleImageWrapperWithText: {
    width:'48%', 
    fontSize:'9px', 
    alignItems:'center', 
    display:'flex',
    marginBottom:'3px',
  },
  symboleImage: {
    width:'100%', 
    height:'auto',
  },
  symboleImageRangeWrapper: {
    width:'13.5%', 
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'1px',
    
  },

  symboleImageRange: {
    width:'99%', 
    height:'auto', 
    padding:'2px',
  },
  rangeMaxNum: {
    padding: '0px',
    margin: '0px',
    fontSize: '6px',
    position:'relative',
    top:'-15px',
    right:'15px',
    position:'relative',
    flex:'0.2',
    fontWeight:'700',
    display:'flex'
  },

  rangeMinNum: {
    bottom:'-29px',
    left:'20px',
    padding: '0px',
    margin: '0px',
    fontSize: '6px',
    position:'relative',
    fontWeight:'700',
    display:'flex'
  },

  dropPeMillWrapper: {
    position:'relative',
    width:'12.5%', 
    paddingBottom:'0',
    margin:'1px',
    // backgroundColor:'red', 
  },
  dropPeMillContent: {
    position:'absolute',
    top:'15px',
    left:'20px',
    fontSize:'6px',
    paddingBottom:'0',
    margin:'1px',
    // backgroundColor:'red', 
  },
  numberOfDropsPerMilliliterStyle:{
    position:'absolute',
    // backgroundColor:'red',
    top:'20px',
    left:'20px',
    fontSize:'6px',
    fontWeight:'900'
  },
  liquidFilterPoreSizeStyle:{
    position:'absolute',
    // backgroundColor:'red',
    top:'12px',
    left:'20px',
    fontSize:'6px',
    fontWeight:'900'
  },

};

let DynamicStyleForSymbols = {}
let DynamicStyleForOwnerInfo = {}

function Template2(props) {
  const { projectInfo, onSizeChange, height, width, dynamicData, imageSrc } = props;
  useEffect(() => {
    const size = `${height}x${width}`;
    onSizeChange(size); // Call the callback function with the size value
  }, [width, height, onSizeChange]);

  const {
    productName,
    clinicalInvestigationOnly,
    customMadeDevice,
    quantity,
    IsItForEurope,
    productClass,
    notifiedBodyNumber,
    IsItForUK,
    UK_productClass,
    UK_notifiedBodyNumber,
    manufacturerLogo,
    website,
    haDateOfManufacture,
    dateOfManufacture,
    useByDate,
    hasLotNumber,
    LOTNumber,
    haSerialNumber,
    serialNumber,
    udiFormat,
    udiType,
    isOutsideEU,
    europeanAuthorizedRepName,
    europeanAuthorizedRepAddress,
    importerName,
    importerAddress,

  } = projectInfo?.labelData || {};

  const [isDataMatrix, setIsDataMatrix] = useState(false);

  useEffect(() => {
    if (projectInfo && udiFormat === "GS1" && udiType === "GS1 (Data Matrix)") {
      setIsDataMatrix(true);
      console.log("Data Matrix");
    } else {
      setIsDataMatrix(false);
    }
  }, [projectInfo, udiFormat, udiType]);

  const handleUdiResponse = (data) => {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {isDataMatrix ? (
          <div
            style={{
              display: "flex",
             justifyContent:'flex-start',
             alignItems:'center',
             marginLeft:'2px'
            }}
          >
            <img
              style={{ width: "45px", height: "45px" }}
              src={imageSrc}
              alt="data matrix from"
            />
            <div style={{ fontSize: "5px", fontWeight: "700" }}>
              {haDateOfManufacture && (
                <p style={{ margin: "0px 2px" }}>{dateOfManufacture}</p>
              )}
              <p style={{ margin: "0px 2px" }}>{useByDate}</p>
              {hasLotNumber && (
                <p style={{ margin: "0px 2px" }}>{LOTNumber}</p>
              )}
              {haSerialNumber && (
                <p style={{ margin: "0px 2px" }}>{serialNumber}</p>
              )}
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", height: "100%" }}>
            {/* {handleUDI(data)} */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={template2}>
      <div className={templateHeader}>
        <div className={headerLeft}>
          {IsItForUK && (
            <>
              <img src={ukca_mark} alt="" />
              {UK_productClass === "Class I" && UK_notifiedBodyNumber && (
                <p>{UK_notifiedBodyNumber}</p>
              )}
            </>
          )}
        </div>
        <div className={midHeader}>
          <h5 className={title}>{productName}</h5>
          {clinicalInvestigationOnly && (
            <p>exclusively for clinical investigation</p>
          )}
          {customMadeDevice && <p>custom-made device</p>}
        </div>
        <div className={headerRight}>
          {IsItForEurope && (
            <>
              <img src={CE_mark} alt="" />
              {productClass === "Class I" && notifiedBodyNumber && (
                <p>{notifiedBodyNumber}</p>
              )}
            </>
          )}
        </div>
      </div>
      <div className={productInfo}>
        <div className={leftSide}>
            <div className={isDataMatrix ? DataMatrixLeftSideContent: leftSideContent}>
                <div className={leftSideItem}>
                  {handleUdiResponse({projectInfo, customWidth: 0.355, customHeight: 15, customFontSize:4, marginTop: '-10px', hideParagraph: true})}
                </div>
                <div className={`${leftSideItem} ${ProductInfoHeader}`}>
                {!isOutsideEU &&  
                <div className={symbolContentItem} >
                  <img className='symbol-img Authorized_Representative' src={Authorized_Representative} />
                  <div className='' style={customStyles.paragraphWrapper}>
                    <p >{europeanAuthorizedRepName}</p>
                    <p >{europeanAuthorizedRepAddress}</p> 
                  </div>
                </div>
                }
                {!isOutsideEU &&
                <div className={symbolContentItem} >
                  <img className='symbol-img' alt="Importer symbole" src={Importer} />
                  <div className='' style={customStyles.paragraphWrapper}>
                    <p>{importerName}</p>
                    <p>{importerAddress}</p> 
                  </div>
                </div>}
                </div>
            </div>
        </div>

        <div className={rightSide}>
          <div className={rightSide_item}>
            <div className={rightSide_left}>
                <div>
                    {quantity > 0 && (
                        <p>
                        QTY:{" "}
                        <span>
                            {dynamicData?.quantity ? dynamicData?.quantity : quantity}
                        </span>
                        </p>
                    )}
                </div>
                <div>
                {website &&<img className='header-img' src={Patient_information_website} alt={`${website}`} />}
                </div>
            </div>
            <div className={rightSide_right}>
              {manufacturerLogo && (
                <ImageBase64
                  width={"90%"}
                  manufacturerLogo={manufacturerLogo}
                />
              )}
            </div>
          </div>
            {website &&<p className=''>{website}</p>}
        </div>
      </div>
    </div>
  );
}

export default Template2;
