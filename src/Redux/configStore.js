import { applyMiddleware, combineReducers, createStore } from "redux";

//middleware saga
import createMiddlewareSaga from 'redux-saga';



import { rootSaga } from './saga/rootSaga';
const middleWareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    // nơi đặt reducer

})

export const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
//Gọi saga'
middleWareSaga.run(rootSaga)