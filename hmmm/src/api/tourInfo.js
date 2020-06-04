import apiKey from './apiKey';
import url from './url';

const tourInfo = async (id = null, param = null, value = null) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  if (id != null) {
    const response = await fetch(`${url}/tours/${id}?api_key=${apiKey}`, requestOptions);
    const data = await response.json();
    return data;
  }
  const response = await fetch(`${url}/tours?api_key=${apiKey}&${param}=${value}`, requestOptions);
  const data = await response.json();
  return data;
};

export default tourInfo;
