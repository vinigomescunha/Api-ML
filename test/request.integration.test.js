import { getSiteId, getSearch } from '../src/request';
import { countryName } from '../src/constants';
import searchRoute from '../src/search-route';

jest.unmock('axios');

describe('Remote Info', () => {
    it('Fetch sites', async () => {
        // https://api.mercadolibre.com/sites
        await expect(getSiteId('Ecuador')).resolves.toEqual('MEC');
        // await expect(getSiteId('Portugal')).resolves.toEqual('MPT');
        await expect(getSiteId(countryName)).resolves.toEqual('MLB');
    });

    it('Fetch Search', async () => {
        const result = await getSearch('MLB', 'Celular', 2);
        expect(result.length).toEqual(2);
        expect(result[0].name).not.toBeNull();
        expect(result[0].name).not.toBeUndefined();
        expect(typeof result[0].name).toBe('string');
        expect(result[0].link).not.toBeNull();
        expect(result[0].link).not.toBeUndefined();
        expect(typeof result[0].link).toBe('string');
        expect(result[0].price).not.toBeNull();
        expect(result[0].price).not.toBeUndefined();
        expect(typeof result[0].price).toBe('number');
        expect(result[0].store).not.toBeNull();
        expect(result[0].store).not.toBeUndefined();
        expect(typeof result[0].store).toBe('string');
        expect(result[0].state).not.toBeNull();
        expect(result[0].state).not.toBeUndefined();
        expect(typeof result[0].state).toBe('string');
    });

    it('Route Without Env', (done) => {
        const mockNext = () => jest.fn(done);
        const mockRequest = {
            body: {
                Search: 'Lorem Ipsum',
                limit: 1
            }
        };
        const mockResponse = {
            send: (code, message) => {
                expect(code).toEqual(500);
                done();
            }
        };
        searchRoute(mockRequest, mockResponse, mockNext);
    });

    it('Route With Env SITE_ID', (done) => {
        process.env.SITE_ID = 'MLB';
        const mockNext = () => jest.fn(done);
        const mockRequest = {
            body: {
                Search: 'Celular',
                limit: 1
            }
        };
        const mockResponse = {
            send: (code, message) => {
                expect(code).toEqual(200);
                expect(message.length).toBe(1)
                done();
            }
        };
        searchRoute(mockRequest, mockResponse, mockNext);
    });


    it('Route With Env SITE_ID Without limit', (done) => {
        process.env.SITE_ID = 'MLB';
        const mockNext = () => jest.fn(done);
        const mockRequest = {
            body: {
                Search: 'Celular'
            }
        };
        const mockResponse = {
            send: (code, message) => {
                expect(code).toEqual(200);
                expect(message.length).toBe(10)
                done();
            }
        };
        searchRoute(mockRequest, mockResponse, mockNext);
    });

});
