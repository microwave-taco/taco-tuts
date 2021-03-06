import { combineReducers } from 'redux';
import { ILoginState, loginReducer } from './login.reducer';
import { ITeacherState, teacherReducer } from './teacher.reducer';
import { ISessionState, sessionReducer } from './session.reducer';
import { teacherListReducer, ITeacherListState } from './teacherList.reducer';
import {
  ISessionRequestState,
  sessionRequestReducer
} from './session-request.reducer';

export interface IAppState {
  login?: ILoginState;
  teacher?: ITeacherState;
  session?: ISessionState;
  sessionRequest?: ISessionRequestState;
  teacherList?: ITeacherListState;
};

export const rootReducer = combineReducers<IAppState>({
  login: loginReducer,
  teacher: teacherReducer,
  session: sessionReducer,
  sessionRequest: sessionRequestReducer,
  teacherList: teacherListReducer
});

export const enhancers = [];
