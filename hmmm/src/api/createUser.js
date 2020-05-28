import api from './apiKey';
import url from './url';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

const login = async (name, username, email, password, password_confirmation) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append('name', name);
  urlencoded.append('username', username);
  urlencoded.append('email', email);
  urlencoded.append('password', password);
  urlencoded.append('password_confirmation', password_confirmation);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await fetch(`${url}/users?api_key=${api}`, requestOptions);
  const data = await response.json();
  return data;
};

export default login;
