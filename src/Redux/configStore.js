import { applyMiddleware, combineReducers, createStore } from "redux";

//middleware saga
import createMiddlewareSaga from 'redux-saga';
import { CommentReducer } from "./reducers/CommentReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";
import { StatusReducer } from "./reducers/StatusReducer";
import { TaskTypeReducer } from "./reducers/TaskTypeReducer";
import { UserReducer } from "./reducers/UserReducer";


import { rootSaga } from './saga/rootSaga';
const middleWareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    // nơi đặt reducer
    UserReducer,
    ProjectReducer,
    ProjectCategoryReducer,
    PriorityReducer,
    TaskTypeReducer,
    StatusReducer,
    CommentReducer
})

export const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
//Gọi saga'
middleWareSaga.run(rootSaga)