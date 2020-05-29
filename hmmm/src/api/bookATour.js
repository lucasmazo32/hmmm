import api from './apiKey';
import url from './url';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

const bookATour = async (userId, tourId, day, quantity) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append('user_id', userId);
  urlencoded.append('tour_id', tourId);
  urlencoded.append('day', day);
  urlencoded.append('quantity', quantity);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await fetch(`${url}/booked_tours?api_key=${api}`, requestOptions);
  const data = await response.json();
  return data;
};

export default bookATour;
