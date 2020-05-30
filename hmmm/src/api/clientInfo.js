import apiKey from './apiKey';
import url from './url';

const clientInfo = async clientId => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response1 = await fetch(`${url}/clients/${clientId}?api_key=${apiKey}&tour=true`, requestOptions);
  const data1 = await response1.json();
  const response2 = await fetch(`${url}/booked_tours?api_key=${apiKey}&client=${clientId}`, requestOptions);
  const data2 = await response2.json();
  return [data1, data2];
};

export default clientInfo;
