import React, { useEffect } from 'react'
import "./template1.css"

// manufacturer and product info symbols
import Manufacturer from '../../assets/eIFUSymbols/Manufacturer.png'
import Distributor from '../../assets/eIFUSymbols/Distributor.png'
import Authorized_Representative from '../../assets/eIFUSymbols/Authorized_Representative 2.png'
import Importer from '../../assets/eIFUSymbols/Importer.png'
import CE_mark from '../../assets/eIFUSymbols/CE_mark.png' 
import ukca_mark from '../../assets/eIFUSymbols/ukca-mark.webp'
import catalogueNumberSymbol from '../../assets/eIFUSymbols/catalogue_number.png'
import modelNumberSymbol from '../../assets/eIFUSymbols/model_number.png'
import Serial_numberSymbol from '../../assets/eIFUSymbols/Serial_number.png'
import Batch_codeSymbol from '../../assets/eIFUSymbols/Batch_code.png'
import Date_of_manufactureSymbol from '../../assets/eIFUSymbols/Date_of_manufacture.png'
import Use_by_date from '../../assets/eIFUSymbols/Use_by_date.png'

import Medical_deviceSymbol from '../../assets/eIFUSymbols/Medical_device.png'
import IVD from '../../assets/eIFUSymbols/IVD.png'
import nonSterileSymbol from '../../assets/eIFUSymbols/nonSterile.png'
// sterile symbols
import sterileSymbol from '../../assets/eIFUSymbols/sterile.png'
import sterile_ASymbol from '../../assets/eIFUSymbols/sterile_A.png'
import Sterile_RSymbol from '../../assets/eIFUSymbols/Sterile_R.png'
import Sterile_EOSymbol from '../../assets/eIFUSymbols/sterile_EO.png'
import Sterilized_usings_team_or_dry_heatSymbol from '../../assets/eIFUSymbols/Sterilized_usings_team_or_dry_heat.png'
import package_is_damageSymbol from '../../assets/eIFUSymbols/packege_is_damage.png'
import do_not_resterilizeSymbol from '../../assets/eIFUSymbols/do_not_resterilize.png'
import sterile_fluid_pathSymbol from '../../assets/eIFUSymbols/sterile_fluid_path.png'
import VaporizedHydrogenPeroxideSymbol from '../../assets/eIFUSymbols/VaporizedHydrogenPeroxide.png'
import single_S_B_S from '../../assets/eIFUSymbols/singleSBS.png'
import double_S_B_S from '../../assets/eIFUSymbols/doubleSBS.png'
import double_S_B_S_outside from '../../assets/eIFUSymbols/Single-sterile-barrier-system-with-protective-packaging-outside.png'
import double_S_B_S_inside from '../../assets/eIFUSymbols/Single-sterile-barrier-system-with-protective-packaging-inside.png'
// storage symbols
import fragile_handle_with_care from '../../assets/eIFUSymbols/fragile_handle_with_care.png'
import keep_away_from_sunlight from '../../assets/eIFUSymbols/keep_away_from_sunlight.png'
import protect_from_heat_and_radioactive_soures from '../../assets/eIFUSymbols/protect_from_heat_and_radioactive.png'
import keep_dry from '../../assets/eIFUSymbols/keep_dry.png'
import lower_limit_temperaure from '../../assets/eIFUSymbols/lower_limit_temperaure.png'
import upper_limit_temperaure from '../../assets/eIFUSymbols/upper_limit_temperaure.png'
import temperature from '../../assets/eIFUSymbols/temperature.png'
import HumidityLimit from '../../assets/eIFUSymbols/HumidityLimit.png'
import AtmPressureLimit from '../../assets/eIFUSymbols/AtmPressureLimit.png'

// Safe Use Symbols
import biological_risks from '../../assets/eIFUSymbols/biological_risks.png'
import do_not_re_use from '../../assets/eIFUSymbols/do_not_re-use.png'
import consult_instruction_for_use from '../../assets/eIFUSymbols/consult_instruction_for_use.png'
import caution from '../../assets/eIFUSymbols/caution.png'
import contains_or_presence_of_natural_rubber_latex from '../../assets/eIFUSymbols/contains_or_presence_of_natural_rubber_latex.png'
import contains_human_blood from '../../assets/eIFUSymbols/contains_human_blood.png'
import Contains_a_medicinal_substance from '../../assets/eIFUSymbols/Contains_a_medicinal_substance.png'
import Contains_biological_material_of_animal_origin from '../../assets/eIFUSymbols/Contains_biological_material_of_animal_origin.png'
import Contains_human_origin from '../../assets/eIFUSymbols/Contains_human_origin.png'
import Contains_hazardous_substances from '../../assets/eIFUSymbols/Contains_hazardous_substances.png'
import Contains_nano_materials from '../../assets/eIFUSymbols/Contains_nano_materials.png'
import Single_patient_multiple_use from '../../assets/eIFUSymbols/Single_patient_multiple_use.png'

// In Vitro Diagnostic IVD Symbols
import control from '../../assets/eIFUSymbols/control.png'
import control_negative from '../../assets/eIFUSymbols/control-negative.png'
import control_positive from '../../assets/eIFUSymbols/positive-control.png'
import contains_suffient_for_n_tests from '../../assets/eIFUSymbols/contains_suffient_for_n_tests.png'
import for_IVD_performance_evaluation_only from '../../assets/eIFUSymbols/for_IVD_performance_evaluation_only.png'

// Transfusion Infusion Symbols
import sampling_site from '../../assets/eIFUSymbols/sampling_site.png'
import fluid_path from '../../assets/eIFUSymbols/fluid_path.png'
import Non_pyrogenic from '../../assets/eIFUSymbols/Non_pyrogenic.png'
import Drops_per_millilitre from '../../assets/eIFUSymbols/Drops_per_millilitre.png'
import Liquid_filter_with_pore_size from '../../assets/eIFUSymbols/Liquid_filter_with_pore_size.png'
import one_way_valve from '../../assets/eIFUSymbols/one-way-valve.png'

// Other (step-8) Symbols
import patient_identification from '../../assets/eIFUSymbols/patient_identification.png'
import Patient_information_website from '../../assets/eIFUSymbols/Patient_information_website.png'
import Health_care_centre_or_doctor from '../../assets/eIFUSymbols/Health_care_centre_or_doctor.png'
import date from '../../assets/eIFUSymbols/date.png'
import Translation from '../../assets/eIFUSymbols/Translation.png'
import Repackaging from '../../assets/eIFUSymbols/Repackaging.png'
import udi from '../../assets/eIFUSymbols/udi.png'
import ImageBase64 from '../../utilities/ImageBase64';
import { handleUDI } from '../../utilities/handleUDI';
import DateFormat from '../../utilities/FormatDate';

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


const Template1 = (props) => {
  const {width, 
        height, 
        scale,projectInfo, 
        imageSrc, 
        dynamicData, 
        onSizeChange, 
        printCount, 
        border, 
        isFreeTrail,
         activeSerialNumber} = props
// return null;
  useEffect(() => {
    const size = `${height}x${width}`;
    onSizeChange(size); // Call the callback function with the size value
  }, [width, height, onSizeChange]);

  let DynamicStyleForSymbols = {}
  let DynamicStyleForOwnerInfo = {}

  let labelData = projectInfo?.labelData || {}
  const countTrueKeys = (labelData) => {

    const ownerBooleanKey = [
      'hasDistributor',
      'isOutsideEU',
      'haDateOfManufacture',
      'hasLotNumber',
      'haSerialNumber',
    ]
    const ownerStringKey = [
      'useByDate',
      'LOTNumber',
      'serialNumber',
      'catalogueNumber',
      'modelNumber',
    ]

    let ownerBooleanTrueCount = 1;
    let ownernonEmptyStringCount = 0;
  
    ownerBooleanKey.forEach(key => {
      if (labelData[key] === true) {
        ownerBooleanTrueCount++;
      }
    });
  
    ownerStringKey.forEach(key => {
      if (labelData[key].trim() !== "") {
        ownernonEmptyStringCount++;
      }
    });

    const booleanKeys = [
      'associatedWithIndividualPatient',
      'translationActivity',
      'modificationToPackaging',
      'reprocessedDevice ',

      'hasAsepticProcessing',
      'hasEthyleneOxide',
      'hasIrradiation',
      'hasSteamOrDryHeat',
      'hasVaporizedHydrogenPeroxide',

      'isIntendedToBeResterilized',

      'hasEthyleneOxideFluid',
      'hasIrradiationFluid',
      'hasSteamOrDryHeatFluid',

      'hasSingleSterileBarrierSystem',
      'hasTwoSterileBarrierSystems',
      'hasSingleSterileBarrierSystemWithProtectiveInside',
      'hasSingleSterileBarrierSystemWithProtectiveOutside',

      'hasSterileFluidPath',
      
      'needInstructionsForUse',

      'requiresCarefulHandling',
      'requiresProtectionFromLight',
      'requiresProtectionFromHeatAndRadioactiveSources',
      'requiresProtectionFromMoisture',
      
      'hasLowerLimitOfTemperature', // if(one of both add 1)
      'hasUpperLimitOfTemperature', // if(one of both add 1)

      'hasHumidityRange',
      'hasAtmosphericPressureRange',

      'hasBiologicalRisks',
      'isIntendedForSingleUse',
      'needCaution',
      'containsRubberLatex',
      'containsBloodDerivatives',
      'containsMedicinalSubstance',
      'containsAnimalOriginMaterial',
      'containsHumanOriginMaterial',
      'containsHazardousSubstances',
      'containsNanoMaterials',
      'multipleUsesOnSinglePatient',

      'isControlMaterial', //projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
      'isControlMaterialForNegativeRange', //projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
      'isControlMaterialForPositiveRange', //projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
      'isIVDForPerformanceEvaluation', //projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
      'isMedicalDeviceForSampleCollection',
      'hasFluidPath',
      'isNonPyrogenic',
      'hasOneWayValve',
      'hasSpecificNumberOfTests',
    ];
  
    const stringKeys = [ //numberOfDropsPerMilliliter !== "Not applicable" && liquidFilterPoreSize !== "Not applicable"
      'numberOfDropsPerMilliliter',
      'liquidFilterPoreSize'
    ];
  
    let booleanTrueCount = 0;
    let nonEmptyStringCount = 0;
  
    booleanKeys.forEach(key => {
      if (labelData[key] === true) {
        booleanTrueCount++;
      }
    });
  
    stringKeys.forEach(key => {
      if (labelData[key].trim() !== "Not applicable") {
        nonEmptyStringCount++;
      }
    });

    let symbolsWithTextBehindCount = booleanTrueCount + nonEmptyStringCount ;
    let projectOwnerInfoCount = ownerBooleanTrueCount + ownernonEmptyStringCount ;

    if(symbolsWithTextBehindCount < 11){ // done !
      DynamicStyleForOwnerInfo = {
        wrapperItem: {
          width:'49%',
          display:'flex',
          alignItems:'center',
          margin:'3px 1px',
          // marginBottom:'5px'
       },
        image: {
          width:'45px', 
          height:'45px',
        },
        imageDateOfMan: {
          width:'59px', 
          height:'45px'
        },
        paragraph: {
          padding: '0px',
          margin: '0px',
          fontSize: '8px',
          fontWeight:'800',
        },
        paragraphWrapper: {
          width:`calc(100% - 45px)`,
          width: '100%',
          boxSizing: 'border-box'
        },
      }
      DynamicStyleForSymbols = {
        symboleImageWrapperWithText: {
          width:'49%', 
          fontSize:'12px', 
          alignItems:'center', 
          display:'flex',
          marginBottom:'3px',
          height:'auto',
          // backgroundColor:'red'

        },
        imageWithText: {
          width:'45px', 
          height:'45px',
          // backgroundColor:'red' 
        },
        symboleImageWrapper: {
          width:'17.5%', 
          marginBottom:'px',
          padding:'0 3px',
          margin:'2px 2px',
          textAlign:'center',
          // backgroundColor:'red'

        },
        symboleImageRangeWrapper: {
          width:'20.5%', 
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          marginBottom:'1px',
          
        },
      }
    }else if(symbolsWithTextBehindCount >= 11 && symbolsWithTextBehindCount < 22){
      DynamicStyleForOwnerInfo = {
        wrapperItem: {
          width: '33%'
        },
        image: {
          width:'45px', 
          height:'45px'
        },
        imageDateOfMan: {
          width:'59px', 
          height:'45px'
        },
        paragraph: {
          padding: '0px',
          margin: '0px',
          fontSize: '8px',
          fontWeight:'800',
        },
        paragraphWrapper: {
          width:`calc(100% - 45px)`,
          width: '100%',
          boxSizing: 'border-box'
        },
      }
    }else if(symbolsWithTextBehindCount >= 22 && symbolsWithTextBehindCount < 28){
      // DynamicStyleForOwnerInfo = {
      //   wrapperItem: {
      //     width: '49%'
      //   },
      //   image: {
      //     width:'45px', 
      //     height:'45px'
      //   },
      //   imageDateOfMan: {
      //     width:'59px', 
      //     height:'45px'
      //   },
      //   paragraph: {
      //     padding: '0px',
      //     margin: '0px',
      //     fontSize: '8px',
      //     fontWeight:'800',
      //   },
      //   paragraphWrapper: {
      //     width:`calc(100% - 45px)`,
      //     width: '100%',
      //     boxSizing: 'border-box'
      //   },
      // }
    }else if(symbolsWithTextBehindCount >= 28 ){
      // DynamicStyleForOwnerInfo = {
      //   wrapperItem: {
      //     width: '49%'
      //   },
      //   image: {
      //     width:'45px', 
      //     height:'45px'
      //   },
      //   imageDateOfMan: {
      //     width:'59px', 
      //     height:'45px'
      //   },
      //   paragraph: {
      //     padding: '0px',
      //     margin: '0px',
      //     fontSize: '8px',
      //     fontWeight:'800',
      //   },
      //   paragraphWrapper: {
      //     width:`calc(100% - 45px)`,
      //     width: '100%',
      //     boxSizing: 'border-box'
      //   },
      // }
    }


    return {booleanTrueCount, 
            nonEmptyStringCount, 
            ownerBooleanTrueCount, 
            ownernonEmptyStringCount,
            symbolsWithTextBehindCount, projectOwnerInfoCount
          }; 
  }


  // Example usage
  if (projectInfo && projectInfo.labelData) {
    const { booleanTrueCount, 
      nonEmptyStringCount, 
      ownerBooleanTrueCount, 
      ownernonEmptyStringCount, 
      symbolsWithTextBehindCount, projectOwnerInfoCount} = countTrueKeys(projectInfo.labelData);
      console.log(`Number of true boolean keys: ${booleanTrueCount}`);
      console.log(`Number of non-empty string keys: ${nonEmptyStringCount}`);
      console.log(`Number of true Owner boolean keys: ${ownerBooleanTrueCount}`);
      console.log(`Number of non-empty Owner string keys: ${ownernonEmptyStringCount}`);
  }
  

//  handle dynamic data for label
function formatSumDateToYYYYMMDD(date) {
  if (!date || isNaN(date.getTime())) {
      console.log("Invalid date");
      return ''; // or return some default value
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
  }
  const projectOwnerInfo = () => {
    if(projectInfo && projectInfo.labelData){
      return (
        <div className='project-owner-info' style={customStyles.wrapper}>

            <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                <img className='symbol-img' src={Manufacturer} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                <div className=''>
                  <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo?.labelData?.manufacturerName}</p>
                  <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo?.labelData?.manufacturerAddress}</p>
                  <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo?.labelData?.manufacturerCity}</p>
                  <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo?.labelData?.manufacturerCountry}</p>
                </div>
              </div>

            {projectInfo.labelData.hasDistributor &&
                <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                  <img className='symbol-img' src={Distributor} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                  <div className='' style={customStyles.paragraphWrapper}>
                    <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo.labelData.distributorName}</p>
                    <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo.labelData.distributorAddress}</p> 
                  </div>
                </div>
              }
              {!projectInfo.labelData.isOutsideEU &&
                <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                  <img className='symbol-img' src={Importer} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                  <div className='' style={customStyles.paragraphWrapper}>
                    <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo.labelData.importerName}</p>
                    <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo.labelData.importerAddress}</p> 
                  </div>
                </div>}

              {projectInfo.labelData.haDateOfManufacture &&
              <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                <img className='symbol-img manufacture-' src={Date_of_manufactureSymbol} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.imageDateOfMan}} />
                <div className='' style={customStyles.paragraphWrapper}>
                  <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>
                    {dynamicData?.manufacturerDate ? dynamicData?.manufacturerDate : projectInfo.labelData.dateOfManufacture}</p>
                </div>
              </div>}

            {projectInfo.labelData.useByDate &&
              <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                <img className='symbol-img' src={Use_by_date} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                <div className='' style={customStyles.paragraphWrapper}>
                  <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>
                    {dynamicData?.useByDate ? dynamicData?.useByDate  : projectInfo?.labelData?.useByDate}
                  </p>
                </div>
              </div>}

            {projectInfo.labelData.hasLotNumber &&
              <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                <img className='symbol-img' src={Batch_codeSymbol} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                <div className='' style={customStyles.paragraphWrapper}>
                  <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>
                    {dynamicData?.LotNumber ? dynamicData?.LotNumber : projectInfo.labelData.LOTNumber}
                  </p>
                </div>
              </div>}

            {projectInfo.labelData.haSerialNumber &&
              <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                <img className='symbol-img' src={Serial_numberSymbol} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                <div className='' style={customStyles.paragraphWrapper}>
                  <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>
                    {activeSerialNumber ? `${projectInfo.labelData.serialNumber}-${activeSerialNumber}`: dynamicData?.serialNumber ? dynamicData?.serialNumber : projectInfo.labelData.serialNumber}{printCount ?"-"+printCount : null}</p>
                </div>
              </div>}

            {(projectInfo.labelData.catalogueNumber)&& // || projectInfo.labelData.modelNumber
                  <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                    <img className='symbol-img' src={catalogueNumberSymbol} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                    <div className='' style={customStyles.paragraphWrapper}>
                      <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo.labelData.catalogueNumber}</p>
                    </div>
                  </div>}

            {projectInfo.labelData.modelNumber &&
                  <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                    <img className='symbol-img' src={modelNumberSymbol} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                    <div className='' style={customStyles.paragraphWrapper}>
                      <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo.labelData.modelNumber}</p>
                    </div>
                  </div>}
              

              {/* if outside of EUROPE */}
            {!projectInfo.labelData.isOutsideEU &&
                <div className='symbol-content-item' style={{...customStyles.wrapperItem, ...DynamicStyleForOwnerInfo.wrapperItem}}>
                  <img className='symbol-img Authorized_Representative' src={Authorized_Representative} style={{...customStyles.image, ...DynamicStyleForOwnerInfo.image}} />
                  <div className='' style={customStyles.paragraphWrapper}>
                    <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo.labelData.europeanAuthorizedRepName}</p>
                    <p style={{...customStyles.paragraph, ...DynamicStyleForOwnerInfo.paragraph}}>{projectInfo.labelData.europeanAuthorizedRepAddress}</p> 
                  </div>
                </div>
              }

        </div>
      )
    }
  }
  const symbolsWithTextBehind = () => {
    if(projectInfo && projectInfo.labelData){
      return (
        <div  style={customStyles.symboleTextBehindWrapper} className='symbols-with-text-behind'>

                {/* ------------ */}
                {projectInfo.labelData.associatedWithIndividualPatient &&
                  ( projectInfo.labelData.healthCareCentreName == ''
                    || projectInfo.labelData.healthCareCentreAddress == ''
                    || projectInfo.labelData.doctorName == ''
                  ) &&
                <div style={{...customStyles.symboleImageWrapperWithText, ...DynamicStyleForSymbols.symboleImageWrapperWithText}} className='symbol-content-item symbol-content-item-with-text'>
                  <img style={{...customStyles.image, ...DynamicStyleForSymbols.imageWithText}} className='symbol-img' src={Health_care_centre_or_doctor} />
                  <div style={customStyles.paragraphWrapper}>
                    {projectInfo.labelData.healthCareCentreName && 
                      <p style={customStyles.paragraph} >{projectInfo.labelData.healthCareCentreName}</p>
                    }
                    {projectInfo.labelData.healthCareCentreAddress && 
                      <p style={customStyles.paragraph} >{projectInfo.labelData.healthCareCentreAddress}</p>
                    }
                    {projectInfo.labelData.doctorName && 
                      <p style={customStyles.paragraph} >
                        {dynamicData.doctorName ? dynamicData.doctorName : projectInfo.labelData.doctorName}</p>
                    }
                  </div>
                </div>}

                {projectInfo.labelData.translationActivity &&
                  <div style={{...customStyles.symboleImageWrapperWithText, ...DynamicStyleForSymbols.symboleImageWrapperWithText}} className='symbol-content-item symbol-content-item-with-text'>
                    <img className='symbol-img sm-img' src={Translation} style={{...customStyles.image, ...DynamicStyleForSymbols.imageWithText}} />
                    <div style={customStyles.paragraphWrapper}>
                      {projectInfo.labelData.translationEntityName &&
                        <p style={customStyles.paragraph}>{projectInfo.labelData.translationEntityName}</p>}
                      {projectInfo.labelData.translationEntityAddress &&
                        <p style={customStyles.paragraph}>{projectInfo.labelData.translationEntityAddress}</p>}
                    </div>
                  </div>}

                {projectInfo.labelData.modificationToPackaging &&
                  <div style={{...customStyles.symboleImageWrapperWithText, ...DynamicStyleForSymbols.symboleImageWrapperWithText}} className='symbol-content-item symbol-content-item-with-text'>
                    <img style={{...customStyles.image, ...DynamicStyleForSymbols.imageWithText}} className='symbol-img sm-img' src={Repackaging} />
                    <div>
                      {projectInfo.labelData.repackagingEntityName &&
                        <p style={customStyles.paragraph}>{projectInfo.labelData.repackagingEntityName}</p>}
                      {projectInfo.labelData.repackagingEntityAddress &&
                        <p style={customStyles.paragraph}>{projectInfo.labelData.repackagingEntityAddress}</p>}
                    </div>
                  </div>}
              {projectInfo.labelData.associatedWithIndividualPatient &&
                (projectInfo.labelData.patientName || projectInfo.labelData.patientNumber) &&
                <div style={{...customStyles.symboleImageWrapperWithText, ...DynamicStyleForSymbols.symboleImageWrapperWithText}} className='symbol-content-item symbol-content-item-with-text'>
                  <img style={{...customStyles.image, ...DynamicStyleForSymbols.imageWithText}} className='symbol-img' src={patient_identification} />
                  <div style={customStyles.paragraphWrapper}>
                    <p style={customStyles.paragraph}>
                      {dynamicData.patientName ? dynamicData.patientName : projectInfo.labelData.patientName}
                      </p>
                    <p style={customStyles.paragraph}>
                      { dynamicData.patientNumber ? dynamicData.patientNumber : projectInfo.labelData.patientNumber}
                      </p>
                  </div>
                </div>}

                {projectInfo.labelData.reprocessedDevice &&
                  <div style={{...customStyles.symboleImageWrapperWithText, ...DynamicStyleForSymbols.symboleImageWrapperWithText}} className='symbol-content-item symbol-content-item-with-text'>
                    <img style={{...customStyles.image, ...DynamicStyleForSymbols.imageWithText}} className='symbol-' src={Repackaging} />
                    <div style={customStyles.paragraphWrapper}>
                      {projectInfo.labelData.reprocessingCycles &&
                        <p style={customStyles.paragraph}>number of reprocessing cycles: {projectInfo.labelData.reprocessingCycles}</p>}
                      {projectInfo.labelData.reprocessingLimitation &&
                        <p style={customStyles.paragraph}>Limitation: {projectInfo.labelData.reprocessingLimitation}</p>}
                    </div>
                  </div>} 

          {/* sterility */}
            {projectInfo.labelData.isSterile ?
              (projectInfo.labelData.hasSterilizationProcess &&
              (projectInfo.labelData.hasVaporizedHydrogenPeroxide  == true
                || projectInfo.labelData.hasAsepticProcessing  == true
                || projectInfo.labelData.hasEthyleneOxide  == true
                || projectInfo.labelData.hasIrradiation  == true
                || projectInfo.labelData.hasSteamOrDryHeat  == true
              ) 
              ?null
              :<div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item sterileSymbol'>
                <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={sterileSymbol} />
              </div>)
            : null}

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess &&

                  projectInfo.labelData.hasAsepticProcessing &&
                    <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item sterileSymbol'>
                      <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={sterile_ASymbol} />
                    </div>
            }

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess &&

                  projectInfo.labelData.hasEthyleneOxide &&
                    <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item sterileSymbol'>
                      <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={Sterile_EOSymbol} />
                    </div>
            }

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess &&

                  projectInfo.labelData.hasIrradiation &&
                    <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item sterileSymbol'>
                      <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={Sterile_RSymbol} />
                    </div>
            }
            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess &&

                  projectInfo.labelData.hasSteamOrDryHeat &&
                    <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item sterileSymbol'>
                      <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={Sterilized_usings_team_or_dry_heatSymbol} />
                    </div>
            }


            {projectInfo.labelData.isSterile == true &&
              // projectInfo.labelData.hasSterilizationProcess &&
                  !projectInfo.labelData.isIntendedToBeResterilized &&
                      <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                        <img style={customStyles.symboleImage} className='symbol-img' src={do_not_resterilizeSymbol} />
                      </div>
            }

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess == false &&

              <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                <img style={customStyles.symboleImage} className='symbol-img' src={nonSterileSymbol} />
              </div>
            }

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess == false &&

                projectInfo.labelData.canBeUsedIfDamaged &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={package_is_damageSymbol} />
              </div>}

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess == false &&

                projectInfo.labelData.hasSterileFluidPath &&
              <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                <img style={customStyles.symboleImage} className='symbol-img' src={sterile_fluid_pathSymbol} />
            </div>}

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess &&
          
              projectInfo.labelData.hasVaporizedHydrogenPeroxide &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={VaporizedHydrogenPeroxideSymbol} />
                </div>}

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess == false &&
              
                projectInfo.labelData.hasSingleSterileBarrierSystem &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={single_S_B_S} />
                </div>}

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess == false &&
              
                projectInfo.labelData.hasTwoSterileBarrierSystems &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={double_S_B_S} />
                </div>}

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess == false &&
              
                projectInfo.labelData.hasSingleSterileBarrierSystemWithProtectiveInside &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={double_S_B_S_inside} />
                </div>}

            {projectInfo.labelData.isSterile == true &&
              projectInfo.labelData.hasSterilizationProcess == false &&
              
                projectInfo.labelData.hasSingleSterileBarrierSystemWithProtectiveOutside &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={double_S_B_S_outside} />
                </div>}

            {projectInfo.labelData.needInstructionsForUse &&
                !projectInfo.labelData.eIFULink &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={consult_instruction_for_use} />
                  {projectInfo.labelData.eIFULink &&
                    <div style={customStyles.paragraphWrapper} className=''>
                      <p style={customStyles.paragraph} >{projectInfo.labelData.eIFULink}</p>
                    </div>
                  }
                </div>}

                {/* storage */}

              {projectInfo.labelData.requiresCarefulHandling &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={fragile_handle_with_care} />
                </div>}

              {projectInfo.labelData.requiresProtectionFromLight &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={keep_away_from_sunlight} />
                </div>}

              {projectInfo.labelData.requiresProtectionFromHeatAndRadioactiveSources &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={protect_from_heat_and_radioactive_soures} />
                </div>}

              {projectInfo.labelData.requiresProtectionFromMoisture &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={keep_dry} />
                </div>}

              {projectInfo.labelData.hasLowerLimitOfTemperature &&
                !projectInfo.labelData.hasUpperLimitOfTemperature &&
                <div style={{...customStyles.symboleImageRangeWrapper, ...DynamicStyleForSymbols.symboleImageRangeWrapper}} className='symbol-content-item symbol-content-item-range'>
                    <div style={customStyles.rangeMinNum} className='min-temperature '><p>
                    {projectInfo.labelData.lowerTemperatureLimit}{projectInfo?.labelData?.temperatureUnite} </p> </div>
                  <img style={customStyles.symboleImageRange} className='symbol-img' src={lower_limit_temperaure} />
                </div>}

              {projectInfo.labelData.hasUpperLimitOfTemperature &&
                !projectInfo.labelData.hasLowerLimitOfTemperature &&
                <div style={{...customStyles.symboleImageRangeWrapper, ...DynamicStyleForSymbols.symboleImageRangeWrapper}} className='symbol-content-item symbol-content-item-range'>
                  <img style={customStyles.symboleImageRange} className='symbol-img' src={upper_limit_temperaure} />
                    <div style={customStyles.rangeMaxNum}  className='max-temperature' ><p>
                    {projectInfo.labelData.upperTemperatureLimit}{projectInfo?.labelData?.temperatureUnite}</p></div>
                </div>}

              {projectInfo.labelData.hasUpperLimitOfTemperature &&
                projectInfo.labelData.hasLowerLimitOfTemperature &&
                <div style={{...customStyles.symboleImageRangeWrapper, ...DynamicStyleForSymbols.symboleImageRangeWrapper}} className='symbol-content-item symbol-content-item-range'>
                    <div style={customStyles.rangeMinNum} className='min-temperature' ><p>
                      {projectInfo.labelData.lowerTemperatureLimit}{projectInfo?.labelData?.temperatureUnite} </p></div>
                  <img style={customStyles.symboleImageRange} className='symbol-img'  src={temperature} />
                    <div style={customStyles.rangeMaxNum}  className='max-temperature' ><p>
                      {projectInfo.labelData.upperTemperatureLimit}{projectInfo?.labelData?.temperatureUnite} </p></div>
                </div>}

              {projectInfo.labelData.hasHumidityRange &&
                <div style={{...customStyles.symboleImageRangeWrapper, ...DynamicStyleForSymbols.symboleImageRangeWrapper}} className='symbol-content-item symbol-content-item-range'>
                    <div style={customStyles.rangeMinNum} className='min-temperature mt-1' ><p>
                        {projectInfo.labelData.humidityMin}%
                      </p></div>
                  <img style={customStyles.symboleImageRange} className='symbol-img p-1' src={HumidityLimit} />
                    <div style={customStyles.rangeMaxNum}  className='max mb-' ><p >
                        {projectInfo.labelData.humidityMax}%
                      </p></div>
                </div>}

              {projectInfo.labelData.hasAtmosphericPressureRange &&
                <div style={{...customStyles.symboleImageRangeWrapper, ...DynamicStyleForSymbols.symboleImageRangeWrapper}} className='symbol-content-item symbol-content-item-range'>
                    <div style={customStyles.rangeMinNum} className='min mb-1' ><p>
                      </p> {projectInfo.labelData.atmosphericPressureMin}Kpa</div>
                  <img style={customStyles.symboleImageRange} className='symbol-img p-1' src={AtmPressureLimit} />
                    <div style={customStyles.rangeMaxNum}  className='max mb-2' ><p>
                      </p> {projectInfo.labelData.atmosphericPressureMax}Kpa</div>
                </div>}
              
                {/* safe use */}
              
              {projectInfo.labelData.hasBiologicalRisks &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={biological_risks} />
                </div>}

              {projectInfo.labelData.isIntendedForSingleUse &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={do_not_re_use} />
                </div>}

              {projectInfo.labelData.needCaution &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={caution} />
                </div>}

              {projectInfo.labelData.containsRubberLatex &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={contains_or_presence_of_natural_rubber_latex} />
                </div>}

              {projectInfo.labelData.containsBloodDerivatives &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={contains_human_blood} />
                </div>}

              {projectInfo.labelData.containsMedicinalSubstance &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Contains_a_medicinal_substance} />
                </div>}

              {projectInfo.labelData.containsAnimalOriginMaterial &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Contains_biological_material_of_animal_origin} />
                </div>}

              {projectInfo.labelData.containsHumanOriginMaterial &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Contains_human_origin} />
                </div>}

              {projectInfo.labelData.containsHazardousSubstances &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Contains_hazardous_substances} />
                </div>}

              {projectInfo.labelData.containsNanoMaterials &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Contains_nano_materials} />
                </div>}

              {projectInfo.labelData.multipleUsesOnSinglePatient &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Single_patient_multiple_use} />
                </div>}

                {/* Diagnostic IVD */}

              {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                projectInfo.labelData.isControlMaterial &&
                  <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                    <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={control} />
                  </div>
              }

              {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                projectInfo.labelData.isControlMaterialForNegativeRange &&
                  <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                    <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={control_negative} />
                  </div>
              }

              {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                projectInfo.labelData.isControlMaterialForPositiveRange &&
                  <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                    <img style={customStyles.symboleImage} className='symbol-img sterileSymbol-img' src={control_positive} />
                  </div>
              }

              {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                projectInfo.labelData.isIVDForPerformanceEvaluation &&
                  <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                    <img style={customStyles.symboleImage} className='symbol-img' src={for_IVD_performance_evaluation_only} />
                  </div>
              }

              {projectInfo.labelData.isMedicalDeviceForSampleCollection &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={sampling_site} />
                </div>}

              {projectInfo.labelData.hasFluidPath &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={fluid_path} />
                </div>}

              {projectInfo.labelData.isNonPyrogenic &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Non_pyrogenic} />
                </div>}

              {projectInfo.labelData.hasOneWayValve &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={one_way_valve} />
                </div>}

                {projectInfo.labelData.numberOfDropsPerMilliliter !== "Not applicable" &&
                <div style={{...customStyles.dropPeMillWrapper, margin:'0', padding:'0'}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Drops_per_millilitre} />
                    {/* <div style={customStyles.dropPeMillContent}> */}
                      <p style={customStyles.numberOfDropsPerMilliliterStyle}>{projectInfo.labelData.numberOfDropsPerMilliliter}</p>
                    {/* </div> */}
                </div>}

              {projectInfo.labelData.liquidFilterPoreSize !== "Not applicable" &&
                <div style={{...customStyles.dropPeMillWrapper, margin:'0px', padding:'0px'}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={Liquid_filter_with_pore_size} />
                    {/* <div style={customStyles.dropPeMillContent}> */}
                      <p style={customStyles.liquidFilterPoreSizeStyle}>{projectInfo.labelData.liquidFilterPoreSize}</p>
                    {/* </div> */}
                </div>}
                
                

                {/* {projectInfo.labelData.needInstructionsForUse &&
                <div style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols}} className='symbol-content-item'>
                  <img style={customStyles.symboleImage} className='symbol-img' src={consult_instruction_for_use} />
                  {projectInfo.labelData.eIFULink &&
                    // <div style={{...customStyles.paragraphWrapper, width: '100%'}} className=''>
                      <p style={{...customStyles.paragraph,wordWrap: 'break-word', overflowWrap: 'break-word', fontSize:'5px', marginTop:'-5px'}} >{projectInfo.labelData.eIFULink}</p>
                    // </div>
                  }
                </div>} */}



                {projectInfo.labelData.productType == "In Vitro Diagnostic (IVD) Medical Device" &&
                  projectInfo.labelData.hasSpecificNumberOfTests &&
                    <div className='symbol-content-item' style={{...customStyles.symboleImageWrapper, ...DynamicStyleForSymbols.symboleImageWrapper}}>
                        <img style={customStyles.symboleImage} className='symbol-img' src={contains_suffient_for_n_tests} />
                        {projectInfo.labelData.numberOfTests && 
                          <div style={{backgroundColor:''}} className=''>
                            <p style={{marginTop:"-6px", padding:'0px', fontSize:'8px', fontWeight:'600'}}>{projectInfo.labelData.numberOfTests}</p>
                          </div>}
                    </div>}
        </div>
      )
    }
    return ;
  }

  return (
    <div style={{
          scale:`${scale}`, 
          position: 'relative',
          backgroundColor:'#fff', 
          padding:'2mm 2mm 0 2mm',
          border: border ?'0': '1px solid lightgray',
          width:'102mm',
          height:'150mm'
          }} className='Template1'>
            
        <div className='top-content'>
          {/* header */}
          <div className='header'>
            <div className='header-item Patient_information_website'>
             {projectInfo?.labelData?.website && <>
                <img className='header-img' src={Patient_information_website} alt="" />
                <p className=''>{projectInfo.labelData.website}</p>
              </>}
            </div>
            <div className='header-item product-title'>
              <h3>{projectInfo?.labelData?.productName}</h3>
              {projectInfo?.labelData?.clinicalInvestigationOnly &&<p>exclusively for clinical investigation</p>}
              {projectInfo?.labelData?.customMadeDevice &&<p>custom-made device</p>}
              <div className='packagin-content'>
                {projectInfo?.labelData?.packagingContents.length > 0 && projectInfo?.labelData?.packagingContents.map((item, i) => (
                  <p className='packagin-content-item' key={i}>
                    {item}
                    {i !== projectInfo?.labelData?.packagingContents.length - 1}
                  </p>
                ))}
              </div>
              {/* <p>custom-made device </p> */}
            </div>
            <div className='header-item right'>
              {projectInfo?.labelData?.productType === "Medical device" &&<img className='header-img' src={Medical_deviceSymbol} alt="" />}
              {projectInfo?.labelData?.productType === "In Vitro Diagnostic (IVD) Medical Device" &&<img className='header-img' src={IVD} alt="" />}
            </div>
          </div>
          {/* header End*/}

          {/* intended purpose */}
          <ul className='intended-purpose'> 
            {projectInfo?.labelData?.intendedPurpose.map(item => (
              <li className='ntended-purpose-item'
              key={item._id}> <p style={{fontWeight:'900'}}>{item.abbreviation.toUpperCase()}-</p>{item.intendedPurposeValue}</li>)
            )}
          </ul> 
          {/* intended purpose End*/}

         
        </div>

        <div className='mid-content'>
          <div className='moid-content-item' style={{borderBottom:'0.1px solid lightgray'}}>
            {projectOwnerInfo()}
          </div>
          <div >
            {symbolsWithTextBehind()}
          </div>
        </div>

        <div className='bottom-content' style={{position:'absolute',backgroundColor:'', width:'99%', bottom:'1px', display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
          <div className='bottom-content-first-item' style={{display:'flex', justifyContent:'space-around', alignItems:'center',height:'30px'}}>
          {projectInfo?.labelData?.IsItForEurope === true && projectInfo?.labelData?.productClass === 'Class I' ? (
              <img style={{width:'30px', height:'30px', position:''}} src={CE_mark} alt="" /> 
            ) : (
              projectInfo?.labelData?.IsItForEurope && (
                <div style={{display: 'flex', alignItems: 'center', height:'35px'}} className=''>
                  <img style={{width:'30px', height:'30px', position:''}} src={CE_mark} alt="" /> 
                  {projectInfo?.labelData?.notifiedBodyNumber && (
                    <p style={{fontSize: '10px', margin:'0',padding:'0'}}>{projectInfo.labelData.notifiedBodyNumber}</p>
                  )}
                </div>
              )
            )}

            {projectInfo?.labelData?.IsItForUK === true && projectInfo?.labelData?.UK_productClass === 'Class I' ? (
             <img style={{width:'15px', height:'15px', position:''}} src={ukca_mark} alt="" /> 
            ) : (
              projectInfo?.labelData?.IsItForUK && (
                <div style={{display: 'flex', alignItems: 'center'}} className=''>
                  <img style={{width:'15px', height:'15px', position:''}} src={ukca_mark} alt="" /> 
                  {projectInfo?.labelData?.UK_notifiedBodyNumber && (
                    <p style={{fontSize: '10px', margin:'0',padding:'0'}}>{projectInfo.labelData.UK_notifiedBodyNumber}</p>
                  )}
                </div>
              )
            )}


            {projectInfo?.labelData?.quantity > 0 && 
              <p style={{fontSize:'13px', fontWeight:'600', display:'flex', alignItems:'center', backgroundColor:'', margin:'0', padding:'0'}}>
                QTY: <span style={{fontSize:'10px', marginLeft:'2px', fontWeight:'400'}}>{dynamicData?.quantity ? dynamicData?.quantity : projectInfo?.labelData?.quantity}</span></p>}
          </div>
          <div className='bottom-content-sec-item' style={{display:'flex', alignItems:'flex-end', backgroundColor:'', borderTop:'1px solid lightgray', }}>
              <div style={{width:'80%', display:'flex', alignItems:'flex-end'}}>

                <div style={{backgroundColor:'', height:'60px', position:''}}>
                  <img style={{width:'30px', position:''}} src={udi} alt="" /> 

                </div>
                <div  style={{backgroundColor:''}}>
                  {projectInfo && projectInfo.labelData && handleUDI({projectInfo, customWidth: 0.53, customHeight: 40, activeSerialNumber})}
                  {projectInfo && projectInfo.labelData?.udiFormat === "GS1" 
                    && projectInfo.labelData.udiType === 'GS1 (Data Matrix)' && 
                    imageSrc &&
                    <div className='' style={{display:'flex', alignItems:'center', marginBottom:'5px', marginLeft:'25px'}}>
                      <img style={{width:'70px', height:'70px'}} src={imageSrc} alt={`data matrix from`} />
                      <div style={{fontSize:'10px', fontWeight:'700'}}>
                        <p style={{margin:'0px px'}}>{projectInfo.labelData && projectInfo.labelData.haDateOfManufacture && projectInfo.labelData.dateOfManufacture}</p>
                        <p style={{margin:'0px 5px'}}>{projectInfo.labelData && projectInfo.labelData.useByDate}</p>
                        <p style={{margin:'0px 5px'}}>{projectInfo.labelData && projectInfo.labelData.hasLotNumber && projectInfo.labelData.LOTNumber}</p>
                        <p style={{margin:'0px 5px'}}>{projectInfo.labelData && projectInfo.labelData.haSerialNumber && projectInfo.labelData.serialNumber}</p>
                      </div>
                    </div>}
                </div>

              </div>
              <div style={{width:'20%', height:'auto', backgroundColor:''}} className='bottom-content-image'>
                {projectInfo?.labelData?.manufacturerLogo &&
                <ImageBase64 width={"95%"} manufacturerLogo={projectInfo?.labelData?.manufacturerLogo} />}
              </div>
          </div>
          <div className='' style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
          {isFreeTrail &&
            <div style={{backgroundColor:'', fontSize:'12px',
                  position:'', opacity:'1', zIndex:'-9900',display:'flex', justifyContent:'space-between', alignItems:'center',fontWeight:'700'
            }}>Created By: easyifu.com</div>}
            <span style={{textAlign:'center', fontSize:'8px', fontWeight:'700', marginBottom:''}}>{projectInfo?.shortId}-V{projectInfo.labelVersion}</span>
            <span style={{textAlign:'center', fontSize:'8px', fontWeight:'700', marginBottom:''}}>{DateFormat(projectInfo.createdAt)}</span>

          </div>
        </div>
    </div>
  )
}

export default Template1