import React, { useEffect, useState } from 'react';
import logoImage from '../../assets/easyIFU_Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../redux/actions/authActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';

const Register = () => {

  const allCountries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
    'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
    'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia',
    'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
    'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
    'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
    'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
    'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
    'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka',
    'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];


  const {register} = useSelector(state => state);
  const {registerRequest, registerSuccess, registerFail} = register;

  useEffect(() => {
    if(registerSuccess){
      toast.success('register Success');
      navigate("/login")
    }

    if(registerFail){
      toast.warning(`${registerFail?.message}`);
    }
    
  }, [registerSuccess, registerFail])

  const [userInfo, setUserInfo] = useState({
    companyAddress: '',
    companyCountry: '',
    companyPhone: '',
    companyCity: '',
    companyName: '',
    companyZip: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerAction(userInfo));
  }
 
  return (
    <section style={{ paddingTop: '55px', backgroundColor: '#ecf0f3', minHeight:'100vh' }} className="h-90 gradient-form">
      {/* <ToastContainer /> */}

      <div className="container h-90">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black" style={{ overflow: 'hidden' }}>
              <div className="row g-0">
                <div className="col-lg-12">
                  <div className="card-body mx-md-4">
                    <div className="text-center">
                        <Link to='/'>
                        <img
                            src={logoImage}
                            style={{ width: '150px' }}
                            alt="logo"
                        />
                        </Link>
                    </div>

                    <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
                      <h6>Please create your account</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="companyName"
                              className="form-control"
                              placeholder="Company Name"
                              onChange={(e) => handleInput(e)}
                            />
                            <label className="form-label" htmlFor="companyName">
                              Company Name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="companyAddress"
                              className="form-control"
                              placeholder="Company Address"
                              onChange={(e) => handleInput(e)}
                            />
                            <label className="form-label" htmlFor="companyAddress">
                              Company Address
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="companyZip"
                              className="form-control"
                              placeholder="Company Zip"
                              onChange={(e) => handleInput(e)}
                            />
                            <label className="form-label" htmlFor="companyZip">
                              Company Zip
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="companyCity"
                              className="form-control"
                              placeholder="Company City"
                              onChange={(e) => handleInput(e)}
                            />
                            <label className="form-label" htmlFor="companyCity">
                              Company City
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="companyCountry"
                              className="form-control"
                              onChange={(e) => handleInput(e)}
                              placeholder="Company Country"
                            />
                            <label className="form-label" htmlFor="companyCountry">
                              Company Country
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="companyPhone"
                              className="form-control"
                              onChange={(e) => handleInput(e)}
                              placeholder="Company Phone"
                            />
                            <label className="form-label" htmlFor="companyPhone">
                              Company Phone
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <select
                              id="companyCountry"
                              className="form-control"
                              onChange={(e) => handleInput(e)}
                              value={userInfo.companyCountry}
                            >
                              <option value="" disabled>Select a country</option>
                              {allCountries.map((country, index) => (
                                <option key={index} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                            <label className="form-label" htmlFor="companyCountry">
                              Company Country
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="companyPhone"
                              className="form-control"
                              onChange={(e) => handleInput(e)}
                              placeholder="Company Phone"
                              value={userInfo.companyPhone}
                            />
                            <label className="form-label" htmlFor="companyPhone">
                              Company Phone
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="firstName"
                              className="form-control"
                              onChange={(e) => handleInput(e)}
                              placeholder="First Name"
                            />
                            <label className="form-label" htmlFor="firstName">
                              First Name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="lastName"
                              onChange={(e) => handleInput(e)}
                              className="form-control"
                              placeholder="Last Name"
                            />
                            <label className="form-label" htmlFor="lastName">
                              Last Name
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="email"
                              id="email"
                              onChange={(e) => handleInput(e)}
                              className="form-control"
                              placeholder="E-mail"
                            />
                            <label className="form-label" htmlFor="email">
                              E-mail
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline mb-2">
                            <input
                              type="password"
                              id="password"
                              onChange={(e) => handleInput(e)}
                              className="form-control"
                              placeholder="Password"
                            />
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-center pt-1 mb-4 pb-1">
                        <button disabled={registerRequest && true}
                          style={{ width: '100%', backgroundColor: '#08408b', border: '0', fontSize: '18px' }}
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                         {registerRequest ?
                              <div>
                                  <RotatingLines
                                  strokeColor="#FFFFFF"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="30"
                                  visible={true}
                                /> 
                              </div> :
                         "Register"}
                        </button>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already have an account?</p>
                        <Link to='/login' type="button" className="btn btn-outline-danger">
                          Log in
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
