import { GET_SECTIONS } from '../actions';

const initialState =  {
  sections: [],
};


export default function user(state=initialState, action) {
  switch (action.type){
    case GET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
      };
      default:
        return state;
  }
}
