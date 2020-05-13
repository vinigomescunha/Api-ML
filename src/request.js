import get from 'axios';

const arrayNotDuplicate = (item, index, array) => array.indexOf(item) === index;

const arrayNotNull = (item, index, array) => item !== null;

/**
 * @typedef {Object} ResultResponse
 * @property {string} name
 * @property {string} link
 * @property {number} price
 * @property {string} store
 * @property {string} state
 */
/**
 * Obtem resultado de busca no ML
 * @param {string} siteId 
 * @param {string} q 
 * @param {integer} limit 
 * @returns {Promise<Array<ResultResponse>>}
 */
const getSearch = async (siteId, q, limit) => {
    const searchUrl = `https://api.mercadolibre.com/sites/${siteId}/search?q=${q}&limit=${limit}`;
    const searchData = (await get(searchUrl)).data;
    const users = await getUsers(searchData.results);
    return searchData.results.map(item => ({
        name: item.title,
        link: item.permalink,
        price: item.price,
        store: users.find(v => v.id === item.seller.id)?.nickname,
        state: item?.address?.state_name
    }));
};
/**
 * @typedef {Object} UserResponse - Usuario do ML
 * @property {string} id Id do usuario
 * @property {string} nickname Nome do Usuario
 */
/**
 * Obtem a lista de usuarios do ML
 * @param {SearchResult} results - Resultado 
 * @returns {Promise.<UserResponse[]>}
 */
const getUsers = (results) => Promise.all(
    results.map(v => v.seller.id)
        .filter(arrayNotNull)
        .filter(arrayNotDuplicate)
        .map(async id => (await get(`https://api.mercadolibre.com/users/${id}`)).data)
);
/**
 * return id of site ML{n}
 * @param {string} countryName 
 * @returns {Promise<string>}
 */
const getSiteId = async countryName => {
    return (await get('https://api.mercadolibre.com/sites'))
        .data.filter(v => v.name === countryName)[0]?.id;
};

export { 
    getSiteId, 
    getSearch, 
    getUsers 
}