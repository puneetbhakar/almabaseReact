import { combineReducers } from 'redux'
import SectionReducer from './sections';
import FieldsReducer from './fields';

const rootReducer = combineReducers({
  sections: SectionReducer,
  fields: FieldsReducer
})

export default rootReducer;
