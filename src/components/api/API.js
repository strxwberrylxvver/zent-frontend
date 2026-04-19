import API_URL from "./apiURL";

export const API = {};
API.get    = (endpoint)       => callFetch(endpoint, "GET",    null);
API.post   = (endpoint, data) => callFetch(endpoint, "POST",   data);
API.put    = (endpoint, data) => callFetch(endpoint, "PUT",    data);
API.delete = (endpoint)       => callFetch(endpoint, "DELETE", null);

const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("auth_user"));
    return user?.token ?? null;
  } catch {
    return null;
  }
};

const callFetch = async (endpoint, method, dataObj) => {
  const token = getToken();

  const headers = {};
  if (dataObj) headers["Content-Type"] = "application/json";
  if (token)   headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(API_URL + endpoint, {
      method,
      headers,
      ...(dataObj && { body: JSON.stringify(dataObj) }),
    });

    const result = await response.json();

    if (response.ok) {
      return { isSuccess: true, result };
    }

    const message = result?.message || `Something went wrong (${response.status}).`;
    return { isSuccess: false, message };

  } catch (error) {
    return { isSuccess: false, message: "Network error — please check your connection." };
  }
};

export default callFetch;