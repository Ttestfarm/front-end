import axios from 'axios';

//  http://localhost:8090
const backendPort = '8090';
// process.env.REACT_APP_URL
const serverUrl = 'http://' + window.location.hostname + ':' + backendPort;
const imgUrl =
  'http://' + window.location.hostname + ':' + backendPort + '/uploads/';

async function get(endpoint, authToken) {
  return axios.get(serverUrl + endpoint, {
    headers: {
      Authorization: `${authToken}`,
    },
  });
}

async function post(endpoint, authToken, data) {
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    },
    body: JSON.stringify(bodyData),
  });
}

async function post2(endpoint, data) {
  return axios.post(serverUrl + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

async function formPost(endpoint, authToken, data) {
  return axios.post(serverUrl + endpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `${authToken}`,
    },
  });
}

async function put(endpoint, authToken, data) {
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    },
  });
}

async function del(endpoint, params = '') {
  return axios.delete(serverUrl + endpoint + '/' + params, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
}

export { serverUrl, imgUrl, get, post, formPost, put, del as delete, post2 };
