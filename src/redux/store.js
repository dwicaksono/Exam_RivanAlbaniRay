import {createStore} from 'redux';

const initialState = {
  loading: false,
  name: 'Rivan Albani Ray',
  address: 'jln.padasuka',
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === 'SET_NAME') {
    return {
      ...state,
      name: 'Shazam',
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
