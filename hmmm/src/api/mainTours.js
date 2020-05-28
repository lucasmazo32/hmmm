import apiKey from './apiKey';
import url from './url';

const mainTours = async (param, value) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(`${url}/tours?api_key=${apiKey}&${param}=${value}`, requestOptions);
  const data = await response.json();
  return data;
};

export default mainTours;
