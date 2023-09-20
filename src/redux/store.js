import {composeWithDevTools} from '@redux-devtools/extension';
import {combineReducers, 
        createStore, 
        applyMiddleware}  from 'redux';
import thunk from 'redux-thunk';
import {GenerateOTPReducer, VerifyOTPReducer, logOutReducer, 
        loginReducer, 
        refreshTokenReducer, 
        registerReducer,
        resetPassOTPVerificationReducer,
        resetPasswordReducer,
        resetUserPasswordEmailCheckReducer
    } from './reducers/authReducers';


const reducer = combineReducers({
    // auth reducers
    register: registerReducer,
    login: loginReducer,
    refresh: refreshTokenReducer,
    logout: logOutReducer,
    // OTP Verification and Generator reducers
    GenerateOTP: GenerateOTPReducer,
    VerifyOTP: VerifyOTPReducer,
    // reset Password
    EmailCheck: resetUserPasswordEmailCheckReducer,
    OTPVerification: resetPassOTPVerificationReducer,
    resetPassword: resetPasswordReducer
})
 



const composeEnhancers = composeWithDevTools({
    serialize: true, 
  });
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


export default store;