import API_URL from "./apiURL";

export const API = {};
API.get = (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const callFetch = async (endpoint, method, dataObj) => {
  const token = localStorage.getItem("token");

  let headers = {};
  if (dataObj) headers["Content-type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let requestObj = {
    method,
    headers,
    ...(dataObj && { body: JSON.stringify(dataObj) }),
  };

  try {
    const endpointAddress = API_URL + endpoint;
    const response = await fetch(endpointAddress, requestObj);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true, result }
      : { isSuccess: false, message: `Error: status ${response.status}` };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default callFetch;
