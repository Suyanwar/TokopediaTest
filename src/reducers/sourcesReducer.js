import { 
  FETCH_DATA, 
  FETCH_DATA_SUCCESS, 
  FETCH_DATA_ERROR, 
  FETCH_DATA_DETAIL, 
  FETCH_DATA_DETAIL_SUCCESS, 
  FETCH_DATA_DETAIL_ERROR,
  SET_ID_SOURCE,
  SET_URL_ARTICLE
} from '../utils/constants';

const initialState = {
    sources: [],
    loading: false,
    error: null,
    articles: [],
    idSource: null,
    url: null
};

export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA:
        return { ...state, loading: true, error: null, sources: [] };
      case FETCH_DATA_SUCCESS:
        return { ...state, loading: false, sources: action.payload.data.sources, error: null };
      case FETCH_DATA_ERROR:
        return { ...state, loading: false, error: 'Error while fetching data', sources: [] };
        case FETCH_DATA_DETAIL:
          return { ...state, loading: true, error: null, articles: [] };
        case FETCH_DATA_DETAIL_SUCCESS:
          return { ...state, loading: false, articles: action.payload.data.articles, error: null };
        case FETCH_DATA_DETAIL_ERROR:
          return { ...state, loading: false, error: 'Error while fetching data', articles: [] };
        case SET_ID_SOURCE:
          return { ...state, idSource: action.payload };
        case SET_URL_ARTICLE:
          return { ...state, url: action.payload };
      default:
        return state;
    }
}