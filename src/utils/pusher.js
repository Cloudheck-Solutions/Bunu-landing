import Pusher from 'pusher-js';
import config from 'config';

const token = localStorage.getItem('token');

Pusher.logToConsole = true;

const pusher = new Pusher(config.pusherApiKey, {
  cluster: config.pusherCluster,
  channelAuthorization: {
    endpoint: `${config.apiUrl}${config.pusherAuthEndpoint}`,
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      'Access-Control-Allow-Origin': '*'
    }
  }
});

export default pusher;
