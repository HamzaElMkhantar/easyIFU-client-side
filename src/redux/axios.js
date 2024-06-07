import axios from 'axios';

// Configure Axios defaults
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL; // Assuming this is your base URL
axios.defaults.maxRedirects = 5; // Maximum number of redirects to follow
// You can also configure other defaults like timeout, headers, etc. here

// Add middleware to handle redirection
axios.interceptors.response.use(
  (response) => {
    // Return normal response if no redirection needed
    return response;
  },
  (error) => {
    // Handle redirection if status is 3xx
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      const redirectUrl = error.response.headers.location; // Get redirection URL
      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirect using browser
        return Promise.reject(error); // Reject promise
      }
    }
    return Promise.reject(error); // Reject promise for other errors
  }
);

export default axios;
