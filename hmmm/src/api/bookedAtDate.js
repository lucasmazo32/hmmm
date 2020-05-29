import apiKey from './apiKey';
import url from './url';

const bookedAtDate = async (tourId, date) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(`${url}/booked_tours?api_key=${apiKey}&tour=${tourId}&date=${date}`, requestOptions);
  const data = await response.json();
  return data;
};

export default bookedAtDate;
