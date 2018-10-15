import { 
  FETCH_DATA, 
  FETCH_DATA_SUCCESS, 
  FETCH_DATA_ERROR, 
  FETCH_DATA_DETAIL, 
  FETCH_DATA_DETAIL_SUCCESS, 
  FETCH_DATA_DETAIL_ERROR 
} from '../utils/constants';

const initialState = {
    sources: [],
    loading: false,
    error: null,
    articles: []
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
      default:
        return state;
    }
}