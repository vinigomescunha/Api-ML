import { config } from 'dotenv';
import restify from 'restify';
import { countryName, serverName, defaultPort } from './constants';
import { getSiteId } from './request';
import { info, error } from './logger';
import searchRoute from './search-route';

config();

const server = restify.createServer();

server.use(restify.plugins.bodyParser({ mapParams: true }));

server.use((request, response, next) => {
    response.setHeader('Server', serverName);
    return next();
});

server.post('/search', searchRoute);

getSiteId(countryName)
    .then(id => process.env.SITE_ID = id)
    .catch(e => error(`Error retrieve country from ML: ${e.message}`));

server.listen(process.env.PORT || defaultPort, () => {
    info(`${server.name} listening ${server.url} ${serverName} From ${countryName}`);
});
