
import { getSearch } from './request';
import { error } from './logger';

export default (request, response, next) => {
    
    if (!process.env.SITE_ID) {
        response.send(500, 'Internal Server Error');
    }

    const { search, limit } = request.body;

    getSearch(process.env.SITE_ID, search, +limit || 10)
        .then((r) => {
            response.send(200, r);
            next();
        })
        .catch(e => {
            error(e.message);
            response.send(500, 'Internal Server Error');
            next();
        });
}