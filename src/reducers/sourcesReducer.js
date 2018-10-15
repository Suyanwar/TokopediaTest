import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../utils/constants';

const initialState = {
    sources: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA:
        return { ...state, loading: true, error: null, sources: [] };
      case FETCH_DATA_SUCCESS:
        return { ...state, loading: false, sources: action.payload.data.sources, error: null };
      case FETCH_DATA_ERROR:
        return { ...state, loading: false, error: 'Error while fetching data', sources: [] };
      default:
        return state;
    }
}