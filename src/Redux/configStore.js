import { applyMiddleware, combineReducers, createStore } from "redux";

//middleware saga
import createMiddlewareSaga from 'redux-saga';
import { UserReducer } from "./reducers/UserReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";
import ProjectCategoryReducer from "./reducers/ProjectCategoryReducer";



import { rootSaga } from './saga/rootSaga';
const middleWareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    // nơi đặt reducer
    UserReducer,
    ProjectReducer,
    ProjectCategoryReducer,

})

export const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
//Gọi saga'
middleWareSaga.run(rootSaga)