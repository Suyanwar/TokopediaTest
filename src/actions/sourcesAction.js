import { FETCH_DATA, API_KEY, FETCH_DATA_DETAIL } from '../utils/constants';

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


export const fetchSourceDetail = (q, source) => {
    return {
      type: FETCH_DATA_DETAIL,
      payload: {
        request: {
          url: '/everything?q=' + q + '&sources=' + source + '&apiKey=' + API_KEY
        }
      }
    };
}