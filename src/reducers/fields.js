import { GET_FIELDS } from '../actions';

const initialState =  {
  fields: null,
};


export default function user(state=initialState, action) {
  switch (action.type){
    case GET_FIELDS:
      return {
        ...state,
        fields: action.payload,
      };
      default:
        return state;
  }
}
