import api from './apiKey';
import url from './url';

const login = async (type, id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(`${url}/${type}s/${id}?api_key=${api}`, requestOptions);
  const data = await response.json();
  return data;
};

export default login;
