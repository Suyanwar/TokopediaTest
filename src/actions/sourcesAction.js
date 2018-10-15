import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, API_KEY } from '../utils/constants';

export const fetchSources = () => {
    return {
        type: FETCH_DATA,
        payload: {
            request: {
                url: '/sources?apiKey=' + API_KEY
            }
        }
    };
}