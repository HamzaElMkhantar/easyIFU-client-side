import React, { useEffect, useState } from 'react';
import HorizontalLinearStepper from '../../utilities/HorizontalLinearStepper';
import './project.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { productInformationAction, uploadManufacturerLogoAction } from '../../redux/actions/projectActions';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import DeleteIcon from '@mui/icons-material/Delete';
import { getLabelAction } from '../../redux/actions/labelActions';

const ProductInfoComponent = () => {
    const {projectId} = useParams()
    const token = Cookies.get("eIfu_ATK") || null;
    const decodedToken = token ? jwtDecode(token) : null

    const {productInformation, uploadManufacturerLogo, getLabel} = useSelector(state => state);
    const {productRequest, productSuccess, productFail, projectInfo} = productInformation;
    const {uploadLogoRequest, uploadLogoSuccess, uploadLogoFail} = uploadManufacturerLogo;


    const [numbersData, setNumbersData] = useState('')
    const [manufacturerLogo, setManufacturerLogo] = useState('')
    const [formData, setFormData] = useState({
        labelId: projectId,
        isUpdate: false,
        productName: '' ,
        intendedPurpose: [],
        // intendedPurposeMultiLang: [],
        productType: '',
        udiDI: '',
        udiFormat: '',
        udiType: '',
        useByDate: '',
        hasUseByDate: false,
        haDateOfManufacture: false,
        hasCountryOfManufacture: false,
        countryOfManufacture: '',
        canBeUsedIfDamaged: false,
        haSerialNumber: false,
        hasLotNumber: false ,
        catalogueNumber: '',
        modelNumber: '',
        packagingContents: [] ,
        addManufacturerLogo: false,
        quantity: 0,

    });


    //  dynamic input
    const [serviceList, setServiceList] = useState([""]);

    const handleServiceChange = (e, index) => {
    const { value } = e.target;
    const list = [...serviceList];
    list[index] = value;
    setServiceList(list);
    setFormData((prevData) => ({
        ...prevData,
        packagingContents: list
    }));
    };
    
    const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
    };
    
    const handleServiceAdd = () => {
        setServiceList([...serviceList, ""]);
        setFormData((prevData) => ({
            ...prevData,
            packagingContents: serviceList,
        }));
    };


    const languages = [
        { languageName: "Abkhazian", abbreviation: "AB" },
        { languageName: "Afar", abbreviation: "AA" },
        { languageName: "Afrikaans", abbreviation: "AF" },
        { languageName: "Akan", abbreviation: "AK" },
        { languageName: "Albanian", abbreviation: "SQ" },
        { languageName: "Amharic", abbreviation: "AM" },
        { languageName: "Arabic", abbreviation: "AR" },
        { languageName: "Aragonese", abbreviation: "AN" },
        { languageName: "Armenian", abbreviation: "HY" },
        { languageName: "Assamese", abbreviation: "AS" },
        { languageName: "Avaric", abbreviation: "AV" },
        { languageName: "Avestan", abbreviation: "AE" },
        { languageName: "Aymara", abbreviation: "AY" },
        { languageName: "Azerbaijani", abbreviation: "AZ" },
        { languageName: "Bambara", abbreviation: "BM" },
        { languageName: "Bashkir", abbreviation: "BA" },
        { languageName: "Basque", abbreviation: "EU" },
        { languageName: "Belarusian", abbreviation: "BE" },
        { languageName: "Bengali", abbreviation: "BN" },
        { languageName: "Bihari languages", abbreviation: "BH" },
        { languageName: "Bislama", abbreviation: "BI" },
        { languageName: "Bosnian", abbreviation: "BS" },
        { languageName: "Breton", abbreviation: "BR" },
        { languageName: "Bulgarian", abbreviation: "BG" },
        { languageName: "Burmese", abbreviation: "MY" },
        { languageName: "Catalan; Valencian", abbreviation: "CA" },
        { languageName: "Chamorro", abbreviation: "CH" },
        { languageName: "Chechen", abbreviation: "CE" },
        { languageName: "Chichewa; Chewa; Nyanja", abbreviation: "NY" },
        { languageName: "Chinese", abbreviation: "ZH" },
        { languageName: "Chuvash", abbreviation: "CV" },
        { languageName: "Cornish", abbreviation: "KW" },
        { languageName: "Corsican", abbreviation: "CO" },
        { languageName: "Cree", abbreviation: "CR" },
        { languageName: "Croatian", abbreviation: "HR" },
        { languageName: "Czech", abbreviation: "CS" },
        { languageName: "Danish", abbreviation: "DA" },
        { languageName: "Divehi; Dhivehi; Maldivian", abbreviation: "DV" },
        { languageName: "Dutch", abbreviation: "NL" },
        { languageName: "English", abbreviation: "EN" },
        { languageName: "Esperanto", abbreviation: "EO" },
        { languageName: "Estonian", abbreviation: "ET" },
        { languageName: "Ewe", abbreviation: "EE" },
        { languageName: "Faroese", abbreviation: "FO" },
        { languageName: "Fijian", abbreviation: "FJ" },
        { languageName: "Finnish", abbreviation: "FI" },
        { languageName: "French", abbreviation: "FR" },
        { languageName: "Fula; Fulah; Pulaar; Pular", abbreviation: "FF" },
        { languageName: "Galician", abbreviation: "GL" },
        { languageName: "Georgian", abbreviation: "KA" },
        { languageName: "German", abbreviation: "DE" },
        { languageName: "Greek, Modern (1453-)", abbreviation: "EL" },
        { languageName: "Guaraní", abbreviation: "GN" },
        { languageName: "Gujarati", abbreviation: "GU" },
        { languageName: "Haitian; Haitian Creole", abbreviation: "HT" },
        { languageName: "Hausa", abbreviation: "HA" },
        { languageName: "Hebrew (modern)", abbreviation: "HE" },
        { languageName: "Herero", abbreviation: "HZ" },
        { languageName: "Hindi", abbreviation: "HI" },
        { languageName: "Hiri Motu", abbreviation: "HO" },
        { languageName: "Hungarian", abbreviation: "HU" },
        { languageName: "Interlingua", abbreviation: "IA" },
        { languageName: "Indonesian", abbreviation: "ID" },
        { languageName: "Interlingue; Occidental", abbreviation: "IE" },
        { languageName: "Irish", abbreviation: "GA" },
        { languageName: "Igbo", abbreviation: "IG" },
        { languageName: "Inupiaq", abbreviation: "IK" },
        { languageName: "Ido", abbreviation: "IO" },
        { languageName: "Icelandic", abbreviation: "IS" },
        { languageName: "Italian", abbreviation: "IT" },
        { languageName: "Inuktitut", abbreviation: "IU" },
        { languageName: "Japanese", abbreviation: "JA" },
        { languageName: "Javanese", abbreviation: "JV" },
        { languageName: "Kalaallisut, Greenlandic", abbreviation: "KL" },
        { languageName: "Kannada", abbreviation: "KN" },
        { languageName: "Kanuri", abbreviation: "KR" },
        { languageName: "Kashmiri", abbreviation: "KS" },
        { languageName: "Kazakh", abbreviation: "KK" },
        { languageName: "Khmer", abbreviation: "KM" },
        { languageName: "Kikuyu, Gikuyu", abbreviation: "KI" },
        { languageName: "Kinyarwanda", abbreviation: "RW" },
        { languageName: "Kirghiz, Kyrgyz", abbreviation: "KY" },
        { languageName: "Komi", abbreviation: "KV" },
        { languageName: "Kongo", abbreviation: "KG" },
        { languageName: "Korean", abbreviation: "KO" },
        { languageName: "Kurdish", abbreviation: "KU" },
        { languageName: "Kwanyama, Kuanyama", abbreviation: "KJ" },
        { languageName: "Latin", abbreviation: "LA" },
        { languageName: "Luxembourgish, Letzeburgesch", abbreviation: "LB" },
        { languageName: "Luganda", abbreviation: "LG" },
        { languageName: "Limburgish, Limburgan, Limburger", abbreviation: "LI" },
        { languageName: "Lingala", abbreviation: "LN" },
        { languageName: "Lao", abbreviation: "LO" },
        { languageName: "Lithuanian", abbreviation: "LT" },
        { languageName: "Luba-Katanga", abbreviation: "LU" },
        { languageName: "Latvian", abbreviation: "LV" },
        { languageName: "Manx", abbreviation: "GV" },
        { languageName: "Macedonian", abbreviation: "MK" },
        { languageName: "Malagasy", abbreviation: "MG" },
        { languageName: "Malay", abbreviation: "MS" },
        { languageName: "Malayalam", abbreviation: "ML" },
        { languageName: "Maltese", abbreviation: "MT" },
        { languageName: "Maori", abbreviation: "MI" },
        { languageName: "Marathi", abbreviation: "MR" },
        { languageName: "Marshallese", abbreviation: "MH" },
        { languageName: "Mongolian", abbreviation: "MN" },
        { languageName: "Nauru", abbreviation: "NA" },
        { languageName: "Navajo, Navaho", abbreviation: "NV" },
        { languageName: "Norwegian Bokmål", abbreviation: "NB" },
        { languageName: "North Ndebele", abbreviation: "ND" },
        { languageName: "Nepali", abbreviation: "NE" },
        { languageName: "Ndonga", abbreviation: "NG" },
        { languageName: "Norwegian Nynorsk", abbreviation: "NN" },
        { languageName: "Norwegian", abbreviation: "NO" },
        { languageName: "Nuosu, Sichuan Yi", abbreviation: "II" },
        { languageName: "South Ndebele", abbreviation: "NR" },
        { languageName: "Occitan", abbreviation: "OC" },
        { languageName: "Ojibwe, Ojibwa", abbreviation: "OJ" },
        { languageName: "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic", abbreviation: "CU" },
        { languageName: "Oromo", abbreviation: "OM" },
        { languageName: "Oriya", abbreviation: "OR" },
        { languageName: "Ossetian, Ossetic", abbreviation: "OS" },
        { languageName: "Panjabi, Punjabi", abbreviation: "PA" },
        { languageName: "Pali", abbreviation: "PI" },
        { languageName: "Persian", abbreviation: "FA" },
        { languageName: "Polish", abbreviation: "PL" },
        { languageName: "Pashto, Pushto", abbreviation: "PS" },
        { languageName: "Portuguese", abbreviation: "PT" },
        { languageName: "Quechua", abbreviation: "QU" },
        { languageName: "Romansh", abbreviation: "RM" },
        { languageName: "Kirundi", abbreviation: "RN" },
        { languageName: "Romanian, Moldavian, Moldovan", abbreviation: "RO" },
        { languageName: "Russian", abbreviation: "RU" },
        { languageName: "Sanskrit", abbreviation: "SA" },
        { languageName: "Sardinian", abbreviation: "SC" },
        { languageName: "Sindhi", abbreviation: "SD" },
        { languageName: "Northern Sami", abbreviation: "SE" },
        { languageName: "Samoan", abbreviation: "SM" },
        { languageName: "Sango", abbreviation: "SG" },
        { languageName: "Serbian", abbreviation: "SR" },
        { languageName: "Scottish Gaelic; Gaelic", abbreviation: "GD" },
        { languageName: "Shona", abbreviation: "SN" },
        { languageName: "Sinhala, Sinhalese", abbreviation: "SI" },
        { languageName: "Slovak", abbreviation: "SK" },
        { languageName: "Slovene", abbreviation: "SL" },
        { languageName: "Somali", abbreviation: "SO" },
        { languageName: "Southern Sotho", abbreviation: "ST" },
        { languageName: "Spanish; Castilian", abbreviation: "ES" },
        { languageName: "Sundanese", abbreviation: "SU" },
        { languageName: "Swahili", abbreviation: "SW" },
        { languageName: "Swati", abbreviation: "SS" },
        { languageName: "Swedish", abbreviation: "SV" },
        { languageName: "Tamil", abbreviation: "TA" },
        { languageName: "Telugu", abbreviation: "TE" },
        { languageName: "Tajik", abbreviation: "TG" },
        { languageName: "Thai", abbreviation: "TH" },
        { languageName: "Tigrinya", abbreviation: "TI" },
        { languageName: "Tibetan", abbreviation: "BO" },
        { languageName: "Turkmen", abbreviation: "TK" },
        { languageName: "Tagalog", abbreviation: "TL" },
        { languageName: "Tswana", abbreviation: "TN" },
        { languageName: "Tonga (Tonga Islands)", abbreviation: "TO" },
        { languageName: "Turkish", abbreviation: "TR" },
        { languageName: "Tsonga", abbreviation: "TS" },
        { languageName: "Tatar", abbreviation: "TT" },
        { languageName: "Twi", abbreviation: "TW" },
        { languageName: "Tahitian", abbreviation: "TY" },
        { languageName: "Uighur, Uyghur", abbreviation: "UG" },
        { languageName: "Ukrainian", abbreviation: "UK" },
        { languageName: "Urdu", abbreviation: "UR" },
        { languageName: "Uzbek", abbreviation: "UZ" },
        { languageName: "Venda", abbreviation: "VE" },
        { languageName: "Vietnamese", abbreviation: "VI" },
        { languageName: "Volapük", abbreviation: "VO" },
        { languageName: "Walloon", abbreviation: "WA" },
        { languageName: "Welsh", abbreviation: "CY" },
        { languageName: "Wolof", abbreviation: "WO" },
        { languageName: "Western Frisian", abbreviation: "FY" },
        { languageName: "Xhosa", abbreviation: "XH" },
        { languageName: "Yiddish", abbreviation: "YI" },
        { languageName: "Yoruba", abbreviation: "YO" },
        { languageName: "Zhuang, Chuang", abbreviation: "ZA" },
        { languageName: "Zulu", abbreviation: "ZU" }
    ];
    
    //  dynamic input
    const [intendedPurposeData, setIntendedPurposeData] = useState(
        [{
            language: '',
            abbreviation: '',
            intendedPurposeValue: ''
        }]);

    const handleIntendedPurposeData = (e, index) => {
        const { value, name } = e.target;

        let updatedIntendedPurposeData = null ;

        // Create a copy of the intendedPurposeData array
        if(name == "language"){
               // Find the matching language object
               let selectedLanguage = {}; // Initialize an empty object to hold the selected language
               languages.forEach(lang => {
                   if (lang.languageName === value) {
                       selectedLanguage = lang; // Assign the matching language object to selectedLanguage
                   }
               });
               // Now, selectedLanguage contains the object of the selected language
               const selectedLanguageAbbreviation = selectedLanguage ? selectedLanguage.abbreviation : '';

             updatedIntendedPurposeData = intendedPurposeData.map((item, idx) => {
                if (idx === index) {
                    return {
                        ...item,
                        language: value,
                        abbreviation: selectedLanguageAbbreviation
                    };
                }
                return item;
            });

                    // Update the formData state
                    setFormData((prevData) => ({
                        ...prevData,
                        intendedPurpose: updatedIntendedPurposeData
                    }));
                
                    // Update the intendedPurposeData state
                    setIntendedPurposeData(updatedIntendedPurposeData);
            return;
        }
         updatedIntendedPurposeData = intendedPurposeData.map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    [name]: value
                };
            }
            return item;
        });
    
        // Update the formData state
        setFormData((prevData) => ({
            ...prevData,
            intendedPurpose: updatedIntendedPurposeData
        }));
    
        // Update the intendedPurposeData state
        setIntendedPurposeData(updatedIntendedPurposeData);

    };
    
    const handleIntendedPurposeDataRemove = (index) => {
        const list = [...intendedPurposeData];
        list.splice(index, 1);
        setIntendedPurposeData(list);
        setFormData((prevData) => ({
            ...prevData,
            intendedPurpose: list,
        }));
    console.log(intendedPurposeData)
    };
    
    const handleIntendedPurposeDataAdd = () => {
        setIntendedPurposeData([...intendedPurposeData, ""]);
        setFormData((prevData) => ({
            ...prevData,
            intendedPurpose: intendedPurposeData,
        }));
    console.log(intendedPurposeData)
    };


    // get prev project info
    const {getLabelRequest, getLabelSuccess, getLabelFail, label} = getLabel;
    const [projectInformation, setProjectInformation] = useState({});
    useEffect(() =>{
        dispatch(getLabelAction(projectId, token))
    }, [])
    useEffect(() =>{
        if(getLabelSuccess){
        setProjectInformation(label)
        }
    }, [getLabelSuccess])

    useEffect(() =>{
        setFormData({
            isUpdate: false,
            labelId: projectId,
            productName: projectInformation?.labelData?.productName ||'',
            // intendedPurpose: projectInformation?.labelData?.intendedPurpose || '',
            // intendedPurpose: projectInformation?.labelData?.intendedPurposeMultiLang.length > 0 ? projectInformation?.labelData?.intendedPurposeMultiLang : [''],
            productType: projectInformation?.labelData?.productType || '',
            udiDI: projectInformation?.labelData?.udiDI || '',
            udiFormat: projectInformation?.labelData?.udiFormat || '',
            udiType: projectInformation?.labelData?.udiType || '',
            useByDate: projectInformation?.labelData?.useByDate || '',
            hasUseByDate: projectInformation?.labelData?.hasUseByDate || false,
            dateOfManufacture: projectInformation?.labelData?.dateOfManufacture || '',
            haDateOfManufacture: projectInformation?.labelData?.haDateOfManufacture || false,
            countryOfManufacture: projectInformation?.labelData?.countryOfManufacture || '',
            hasCountryOfManufacture: projectInformation?.labelData?.hasCountryOfManufacture || false,
            serialNumber: projectInformation?.labelData?.serialNumber || '',
            haSerialNumber: projectInformation?.labelData?.haSerialNumber || false,
            LOTNumber: projectInformation?.labelData?.LOTNumber || '',
            hasLotNumber: projectInformation?.labelData?.hasLotNumber || false ,
            catalogueNumber: projectInformation?.labelData?.catalogueNumber || '',
            modelNumber: projectInformation?.labelData?.modelNumber || '',
            addManufacturerLogo: projectInformation?.labelData?.addManufacturerLogo || false,
            quantity: projectInformation?.labelData?.quantity || 0,
            canBeUsedIfDamaged: projectInformation?.labelData?.canBeUsedIfDamaged || false,
        })

        setServiceList(projectInformation?.labelData?.packagingContents.length > 0 ? projectInformation?.labelData?.packagingContents : [''])
        setIntendedPurposeData(projectInformation?.labelData?.intendedPurpose.length > 0 ? projectInformation?.labelData?.intendedPurpose : [''])
    }, [projectInformation])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === 'checkbox' ? checked : value;
        // Handle useByDate separately and format it as "mm-dd-yyyy"
        if (name == 'useByDate' && newValue !== '') {
            const monthsToAdd = parseInt(newValue, 10);
    
            if (isNaN(monthsToAdd) || monthsToAdd <= 0) {
            alert('Please enter a valid positive number of months.');
            return;
            }
    
            const currentDate = new Date();
            const futureDate = new Date(currentDate.setMonth(currentDate.getMonth() + monthsToAdd));
    
            // Format the date as "mm-dd-yyyy"
            const day = String(futureDate.getDate()).padStart(2, '0');
            const month = String(futureDate.getMonth() + 1).padStart(2, '0');
            const year = futureDate.getFullYear();

            // Format the date as "mm-dd-yyyy"
            newValue = `${year}-${month}-${day}`;
        }
        if(name == "manufacturerLogo"){
            newValue = e.target.files[0]
        }

        if (name === 'packagingContents') {
            // Update the state
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));

        
            return;
          }
        setFormData({
            ...formData,
            [name]: newValue,
        });
    }

    const handleRadioButtonChange = (e) => {
        const {name, value, checkbox} = e.target;
        const serialAndLotNumbers = [
            'haSerialNumber',
            'hasLotNumber',
          ];
      
        if (serialAndLotNumbers.includes(name)) {
            console.log(name, value, serialAndLotNumbers.includes(name))
          // If the checkbox is in the exclusive list, set its value to true and others to false
          setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData };
      
            serialAndLotNumbers.forEach((checkbox) => {
              if (checkbox !== name) {
                updatedFormData[checkbox] = false;
              }
            });
      
            updatedFormData[name] = value === 'Yes';
      
            return updatedFormData;
          });

          return;
        } 
      };

    const dispatch = useDispatch()
    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(productInformationAction(formData, token))
    }

    const navigate = useNavigate()
    useEffect(() => {
        if(productSuccess){
            navigate(`/dashboard/create-project/step4/${projectInfo._id}`)
        }

        if(productFail){
            toast.warning(`${productFail.message}`)
        }
    }, [productSuccess, productFail])



    // const addLanguageInput = () => {
    //     setFormData({
    //         ...formData,
    //         intendedPurposeMultiLang: [...formData.intendedPurposeMultiLang, { language: '', value: '' }]
    //     });
    // };
  return (
    <div className="container productInfo">
        <div className='' style={{display:'flex',
                                  justifyContent:'space-between', 
                                  alignItems:'', width:'100%', 
                                //   backgroundColor:'#fff',
                                  height:'',
                                  padding:'30px 5px 0 5px',
                                  borderRadius:'5px'
                                  }}>
            <Link style={{height:'35px'}} to={`/dashboard/create-project/step2/${projectId}`} className='label-info-link'>Back</Link>
                <HorizontalLinearStepper step={2}/>
                <Link style={{height:'35px'}} to='/dashboard/project' className='label-info-link'>escape</Link>
        </div>
        <form className='productInfo-form' onSubmit={handleSubmit}>
            <h2>Product Information</h2>            
            <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                    <label className='question-bg mb-1'>- Product Name*:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    />
                </div>
                {/* <div className="form-group">
                    <label className='question-bg mb-1'>- Intended purpose of the device:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="intendedPurpose"
                    value={formData.intendedPurpose}
                    onChange={handleInputChange}
                    />
                </div> */}
                <div className="form-field">
                    <label htmlFor="service" className='question-bg mb-1'>- Intended purpose of the device:</label>
                    {intendedPurposeData?.map((singleIntendedPurpose, index) => (
                    <div key={index} className="services">
                        <div className="first-division mb-1 mx-2" style={{display:'flex'}}>
                            <select onChange={(e) => handleIntendedPurposeData(e, index)} name="language" id="language" className='' style={{border:'1px solid lightGray', borderRadius:'5px', marginRight:'5px', minWidth:'120px', maxWidth:'200px', backgroundColor:'lightGray', cursor:'pointer'}}>
                                <option  value=''>Language</option>
                                {languages?.map(lang => <option value={singleIntendedPurpose.language}>{lang.languageName}</option>)}
                            </select>
                            <input
                                name="intendedPurposeValue"
                                style={{width:'90%', height:'35px', border:'1px solid lightgray', borderRadius:'5px'}}
                                type="text"
                                id="service"
                                value={singleIntendedPurpose.intendedPurposeValue}
                                onChange={(e) => handleIntendedPurposeData(e, index)}
                            />
                            {intendedPurposeData.length !== 1 && (
                                        <button
                                            type="button"
                                            style={{backgroundColor:'#FBB8B8', borderRadius:'6px'}}
                                            onClick={() => handleIntendedPurposeDataRemove(index)}
                                            className="remove-btn mx-2"
                                            >
                                            <span><DeleteIcon style={{color:'#2D2D2E'}} /></span>
                                        </button>
                                    )}
                        </div>
                        <div className="second-division">
                        {intendedPurposeData.length - 1 === index && (
                            <button
                                    type="button"
                                    style={{borderRadius:'5px', backgroundColor:'#79D4A3', fontSize:'14px'}}
                                    onClick={handleIntendedPurposeDataAdd}
                                    className="add-btn mx-2 mb-1"
                                >
                                <span>Add</span>
                            </button>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                <div className="form-group">
                    <label className='question-bg mb-1'>- Is your product a*:</label>
                    <select
                        className="form-control"
                        name="productType"
                        value={formData.productType}
                        required
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        <option value="Medical device">Medical device</option>
                        <option value="In Vitro Diagnostic (IVD) Medical Device">In Vitro Diagnostic (IVD) Medical Device</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className='question-bg'>- Insert the UDI of the device*:</label>
                </div>
                <div  className="form-group">
                    <label>Choose UDI Format :</label>
                    <div style={{display:'flex'}}>

                    <div style={{display:'flex'}}>
                        <input style={{width:''}}
                        type="CheckBox"
                        required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "GS1" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'GS1' })}
                        />
                        <label className="form-check-label mx-3">GS1</label>
                    </div>
                    <div style={{display:'flex'}}>
                     <input style={{width:''}}
                        type="CheckBox"
                        required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "HIBCC" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'HIBCC' })}
                        />
                    <label className="form-check-label mx-3">HIBCC</label>

                    </div>
                    <div style={{display:'flex'}}>
                        <input style={{width:''}}
                        type="CheckBox"
                        required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "ICCBBA" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'ICCBBA' })}
                        />
                        <label className="form-check-label mx-3">ICCBBA</label>
                    </div>
                    <div style={{display:'flex'}}>
                     <input style={{width:''}}
                        type="CheckBox"
                        required={formData.udiFormat == "" ? true : false}
                        className="form-check-input"
                        checked={formData.udiFormat == "IFA" ? true : false}
                        onClick={() => setFormData({...formData, udiFormat: 'IFA' })}
                        />
                    <label className="form-check-label mx-3">IFA</label>

                    </div>
                    </div>
                </div>

                {formData.udiFormat == "GS1" &&
                    <div  className="form-group">
                        <label>Choose UDI Format :</label>
                        <div style={{display:'flex'}}>
                            
                            <div style={{display:'flex'}}>
                                <input style={{width:''}}
                                type="CheckBox"
                                required={formData.udiFormat == "GS1" && formData.udiType == "" ? true : false}
                                className="form-check-input"
                                checked={formData.udiType == 'GS1 (1D Bar Code)' ? true : false}
                                onClick={() => setFormData({...formData, udiType: 'GS1 (1D Bar Code)' })}
                                />
                                <label className="form-check-label mx-3">GS1 (1D Bar Code)</label>
                            </div>
                            <div style={{display:'flex'}}>
                                <input style={{width:''}}
                                type="CheckBox"
                                required={ formData.udiFormat == "GS1" && formData.udiType == "" ? true : false}
                                className="form-check-input"
                                checked={formData.udiType == "GS1 (Separate Bar Code)" ? true : false}
                                onClick={() => setFormData({...formData, udiType: 'GS1 (Separate Bar Code)' })}
                                />
                                <label className="form-check-label mx-3">GS1 (Separate Bar Code)</label>
        
                            </div>
                            <div style={{display:'flex'}}>
                                <input style={{width:''}}
                                type="CheckBox"
                                required={formData.udiFormat == "GS1" && formData.udiType == "" ? true : false}
                                className="form-check-input"
                                checked={formData.udiType == 'GS1 (Data Matrix)' ? true : false}
                                onClick={() => setFormData({...formData, udiType: 'GS1 (Data Matrix)' })}
                                />
                            <label className="form-check-label mx-3">GS1 (Data Matrix)</label>
        
                            </div>
                        </div>
                    </div>
                }

                <div className="form-group">
                    <label>UDI-DI:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="udiDI"
                    value={formData.udiDI}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className='question-bg mb-1'>- Use-by Date (how many month):</label>
                    <input
                    type="number"
                    className="form-control"
                    name="useByDate"
                    min="0"
                    onChange={handleInputChange}
                    />
                    <label>{formData.useByDate}</label>
                </div>
           
                <div className="form-group">
                    <label className='question-bg mb-1'>- Has Date of Manufacture ? (Optional):</label>
                    <div className="form-group" style={{display:'flex'}}>
                        <div style={{display:'flex'}}>
                            <input style={{width:''}}
                            type="CheckBox"
                            className="form-check-input"
                            checked={formData.haDateOfManufacture ? true : false}
                            onClick={() => setFormData({...formData, haDateOfManufacture: true})}
                            />
                            <label className="form-check-label mx-3">Yes</label>
                        </div>
                        <div style={{display:'flex'}}>
                        <input style={{width:''}}
                            type="CheckBox"
                            required={formData.haDateOfManufacture ? false : true}
                            className="form-check-input"
                            checked={formData.haDateOfManufacture ? false : true}
                            onClick={() => setFormData({...formData, haDateOfManufacture: false})}
                            />
                            <label className="form-check-label mx-3">No</label>

                        </div>
                </div>
                </div>
                
                </div>


                <div className="col-md-6">
                
                <div className="form-group">
                    <label className='question-bg mb-1'>- Do you want to write the country of origin? :</label>
                    <div className="form-group" style={{display:'flex'}}>
                        <div style={{display:'flex'}}>
                            <input style={{width:''}}
                            type="CheckBox"
                            className="form-check-input"
                            checked={formData.hasCountryOfManufacture ? true : false}
                            onClick={() => setFormData({...formData, hasCountryOfManufacture: true})}
                            />
                            <label className="form-check-label mx-3">Yes</label>
                        </div>
                        <div style={{display:'flex'}}>
                        <input style={{width:''}}
                            type="CheckBox"
                            required={formData.hasCountryOfManufacture ? false : true}
                            className="form-check-input"
                            checked={formData.hasCountryOfManufacture ? false : true}
                            onClick={() => setFormData({...formData, hasCountryOfManufacture: false})}
                            />
                            <label className="form-check-label mx-3">No</label>

                        </div>
                </div>
                </div>
               {formData.hasCountryOfManufacture &&
                    <div className="form-group">
                        <label>Two Or tree letter of the Country Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="countryOfManufacture"
                                maxLength="3"
                                value={formData.countryOfManufacture}
                                onChange={(e) => setFormData({...formData, countryOfManufacture: (e.target.value).toUpperCase() })}
                            />
                    </div>}
                    <div className="form-group">
                            <label className='question-bg mb-1'>- Can your product be used if the package is damaged ?</label>
                            <div style={{display:'flex'}}>
                                <div className="form-check" >
                                <label className="form-check-label mx-2">Yes</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="canBeUsedIfDamaged"
                                    value="Yes"
                                    checked={formData.canBeUsedIfDamaged}
                                    onClick={() => setFormData({...formData, canBeUsedIfDamaged: true})}
                                />
                                </div>
                                <div className="form-check mx-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="canBeUsedIfDamaged"
                                    value="No"
                                    checked={!formData.canBeUsedIfDamaged}
                                    onClick={() => setFormData({...formData, canBeUsedIfDamaged: false})}
                                />
                                <label className="form-check-label mx-2">No</label>
                                </div>
                            </div>
                    </div>
                    <div className="form-group">
                        <label className='question-bg mb-1'>- Quantity of product per packaging:</label>
                        <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        />
                    </div>
                <p className='form-group-paragraph' style={{fontSize:'14px'}}>In case where there is no specified expiration date, you can add the manufacture date*</p>
                <div className="form-group">
                    <label className='question-bg mb-1'>- Choose one :</label>
                    <div style={{display:'flex'}}>
                    
                   <label className="form-check-label mx-3" htmlFor="lotNumber">LOT Number:</label>
                    <div style={{display:'flex', gridGap:'10px'}}>
                        <div className="form-check">
                        <label className="form-check-label">Yes</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="hasLotNumber"
                            value="Yes"
                            checked={formData.hasLotNumber}
                            onChange={handleRadioButtonChange}
                        />
                        </div>
                        <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="hasLotNumber"
                            value="No"
                            checked={!formData.hasLotNumber}
                            onChange={handleRadioButtonChange}
                        />
                        <label className="form-check-label">No</label>
                        </div>
                    </div>
 


                    </div>
                    <div style={{display:'flex'}}>
                    
                    <label className="form-check-label mx-3" htmlFor="serialNumber">Serial Number: </label>

                    <div style={{display:'flex', gridGap:'10px'}}>
                        <div className="form-check">
                        <label className="form-check-label">Yes</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="haSerialNumber"
                            value="Yes"
                            checked={formData.haSerialNumber}
                            onChange={handleRadioButtonChange}
                        />
                        </div>
                        <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="haSerialNumber"
                            value="No"
                            checked={!formData.haSerialNumber}
                            onChange={handleRadioButtonChange}
                        />
                        <label className="form-check-label">No</label>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className='question-bg mb-1'>- Catalogue Number (Ref)*:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="catalogueNumber"
                    value={formData.catalogueNumber}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className='question-bg mb-1'>- Model Number:</label>
                    <input
                    type="text"
                    className="form-control"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="service" className='question-bg mb-1'>- Packaging contents (if necessary):</label>
                    {serviceList.map((singleService, index) => (
                    <div key={index} className="services">
                        <div className="first-division mb-1" style={{display:'flex',}}>
                        <input
                            name="service"
                            style={{width:'50%', height:'35px', border:'1px solid lightgray', borderRadius:'5px'}}
                            type="text"
                            id="service"
                            value={singleService}
                            placeholder={`Content ${index + 1}`}
                            onChange={(e) => handleServiceChange(e, index)}
                        />
                        {serviceList.length !== 1 && (
                                    <button
                                        type="button"
                                        style={{backgroundColor:'#FBB8B8', borderRadius:'6px'}}
                                        onClick={() => handleServiceRemove(index)}
                                        className="remove-btn mx-2"
                                        >
                                        <span><DeleteIcon style={{color:'#2D2D2E'}} /></span>
                                    </button>
                                )}
                        </div>
                        <div className="second-division">
       
                        {serviceList.length - 1 === index && (
                            <button
                                    type="button"
                                    style={{borderRadius:'5px', backgroundColor:'#79D4A3', fontSize:'14px'}}
                                    onClick={handleServiceAdd}
                                    className="add-btn"
                                >
                                <span>Add Content</span>
                            </button>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                {/* <div className="form-group">
                    <label>11- Do you want to add your manufacturer logo in the label ?</label>
                    <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="addManufacturerLogo"
                        checked={formData.addManufacturerLogo}
                        onChange={handleInputChange}
                    />
                    <label className="form-check-label">Yes</label>
                    </div>
                </div> */}
                {/* {formData.addManufacturerLogo && (
                    <div className="form-group">
                    <label>Insert your logo:</label>
                    <input
                        type="file"
                        className="form-control"
                        name="manufacturerLogo"
                        
                        onChange={handleInputChange}
                    />
                    </div>
                )} */}
                </div>
            </div>
           {!productRequest 
           ? <div style={{width:"100%", display:'flex', justifyContent:"center", alignItems:'center', marginTop:"30px"}}>
                <button style={{padding:'4px 20px', borderRadius:'4px', backgroundColor:'#011D41', color:'#fff', fontWeight:"600"}}>Save</button>
            </div>
            : <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'center'}}>
                <RotatingLines
                    strokeColor="#011d41"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                    /> 
            </div>  }
        </form>
    </div>
  );
};

export default ProductInfoComponent;
