import apiKey from './apiKey';
import url from './url';

const userTours = async userId => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(`${url}/booked_tours?api_key=${apiKey}&user=${userId}`, requestOptions);
  const data = await response.json();
  return data;
};

export default userTours;
