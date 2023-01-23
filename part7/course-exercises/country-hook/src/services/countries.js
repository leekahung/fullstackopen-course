import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/name";

const getCountry = async (country) => {
  const response = await axios.get(`${baseUrl}/${country}?fullText=true`);
  return response.data;
};

const countryService = { getCountry };

export default countryService;
