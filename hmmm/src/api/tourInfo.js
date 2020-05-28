import apiKey from './apiKey';
import url from './url';

const tourInfo = async id => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(`${url}/tours/${id}?api_key=${apiKey}`, requestOptions);
  const data = await response.json();
  return data;
};

export default tourInfo;
