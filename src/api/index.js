import {create} from 'apisauce';
import * as utils from './utils';

const keys = {
  public: '2f3bae465d89f994264dd4f4b8f6a0ff',
  private: '561dbcaedad4a7e45855083b1916b35dafee1063',
};

// define the api
const api = create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  headers: {'Accept': 'application/json'}
});

const get = function(url, body, resolve, reject) {
  api
    .get(url, body)
    .then((response) => {
      resolve(response);
    })
    .catch((response) => {
      resolve(response);
    });
};

/**
 * Gets characters and can have a specified limit and offset.
 *
 * @param body
 * @returns {Promise}
 */
export function getCharacters(body) {
  let ts = utils.getTimestamp(),
  params = {
    ts: ts,
    apikey: keys.public,
    hash: utils.getHash(ts, keys.private, keys.public),
    ...body
  };

  return new Promise((resolve, reject) => {
    get(`characters`, params, resolve, reject);
  });
}

/**
 * Gets character by ID.
 *
 * @param body
 * @returns {Promise}
 */
export function getCharacterById(body) {
  let ts = utils.getTimestamp(),
    params = {
      ts: ts,
      apikey: keys.public,
      hash: utils.getHash(ts, keys.private, keys.public),
      ...body
    };

  return new Promise((resolve, reject) => {
    get(`characters/${params.id}`, params, resolve, reject);
  });
}

/**
 * Gets comics and can have a specified limit and offset.
 *
 * @param body
 * @returns {Promise}
 */
export function getComics(body) {
  let ts = utils.getTimestamp(),
    params = {
      ts: ts,
      apikey: keys.public,
      hash: utils.getHash(ts, keys.private, keys.public),
      ...body
    };

  return new Promise((resolve, reject) => {
    get(`comics`, params, resolve, reject);
  });
}

/**
 * Gets comic by ID.
 *
 * @param body
 * @returns {Promise}
 */
export function getComicById(body) {
  let ts = utils.getTimestamp(),
    params = {
      ts: ts,
      apikey: keys.public,
      hash: utils.getHash(ts, keys.private, keys.public),
      ...body
    };

  return new Promise((resolve, reject) => {
    get(`comics/${params.id}`, params, resolve, reject);
  });
}

// customizing headers per-request
// api.post('/users', {name: 'steve'}, {headers: {'x-gigawatts': '1.21'}})
