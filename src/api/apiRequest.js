import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("authToken");

const headers = {
  headers: {
    Authorization: token,
    "Content-Type": "application/json; charset=utf-8",
  },
};

// Generic API request function
const makeApiRequest = async (endpoint, method, data = {}, params = {}) => {
  const url = `${BASE_URL}/${endpoint}`; 
  console.log("url", url);
  try {
    const response = await axios({
      url,
      method,
      data,
      params,
      ...headers
    });
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;  // Re-throw to allow the caller to handle it
  }
}

export default makeApiRequest;
