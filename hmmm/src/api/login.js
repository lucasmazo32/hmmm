import api from './apiKey';
import url from './url';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

const login = async (email, password, client = false) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append('email', email);
  urlencoded.append('password', password);
  if (client) {
    urlencoded.append('client', 'true');
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await fetch(`${url}/login?api_key=${api}`, requestOptions);
  const data = await response.json();
  return data;
};

export default login;
