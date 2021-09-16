import {SIGN_IN, SIGN_OUT} from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null
};

const authReducer = (state=INTIAL_STATE, action) => {
  switch(action.type){
    case SIGN_IN:
      return {...state, isSignedIn: true, userId:action.payload.userId, creatorName:action.payload.creatorName};
    case SIGN_OUT:
      return {...state, isSignedIn: false, userId:null, creatorName:null};
    default:
      return state;
  }
};

export default authReducer;
