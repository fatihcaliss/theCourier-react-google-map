import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const headers = {
  "x-api-key": process.env.REACT_APP_X_API_KEY,
  "x-force-correct": 1,
  "Access-Control-Allow-Origin": "*",
};

// Function to fetch all regions
export const fetchAllRegions = async () => {
  const response = await axios.get(`${BASE_URL}/region`, { headers });
  return response.data;
};

// Function to fetch a specific region by ID
export const fetchRegionById = async (regionId) => {
  const response = await axios.get(`${BASE_URL}/region/${regionId}`, {
    headers,
  });
  return response.data;
};

// Function to fetch a specific route by Region ID
export const fetchRouteByRegionId = async (regionId) => {
  const response = await axios.get(`${BASE_URL}/route/${regionId}`, {
    headers,
  });
  return response.data;
};

// Function to check the health status of the service
export const checkHealth = async () => {
  const response = await axios.get(`${BASE_URL}/health/check`, { headers });
  return response.data;
};
