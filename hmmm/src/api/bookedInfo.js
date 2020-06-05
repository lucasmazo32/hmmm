import apiKey from './apiKey';
import url from './url';

const bookedInfo = async (tourId = null, date = null, userId = null) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  if (tourId !== null) {
    const response = await fetch(`${url}/booked_tours?api_key=${apiKey}&tour=${tourId}&date=${date}`, requestOptions);
    const data = await response.json();
    return data;
  }
  const response = await fetch(`${url}/booked_tours?api_key=${apiKey}&user=${userId}`, requestOptions);
  const data = await response.json();
  return data;
};

export default bookedInfo;
