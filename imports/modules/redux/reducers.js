export default (state = {}, { type, ...rest }) => {
  switch (type) {
    case 'GET_POST_REQUEST':
      return { ...state, ...rest };
    case 'GET_POST_SUCCESS':
      return { ...state, ...rest };
    case 'GET_POST_ERROR':
      return { ...state, ...rest };
    case 'ON_LOGIN':
      return { ...state, ...rest };
    case 'ON_LOGOUT':
      return { ...state, ...rest };
    default:
      return state;
  }
};
