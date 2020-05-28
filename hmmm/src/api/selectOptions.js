import apiKey from './apiKey';
import url from './url';

const clientArray = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(`${url}/clients?api_key=${apiKey}&arr=true`, requestOptions);
  const data = await response.json();
  return data;
};

const tourArray = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(`${url}/tours?api_key=${apiKey}&arr=true`, requestOptions);
  const data = await response.json();
  return data;
};

export default { clientArray, tourArray };
