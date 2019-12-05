import {combineReducers} from 'redux'
import { all, fork } from 'redux-saga/effects'
import { History } from 'history'
import {connectRouter, RouterState} from "connected-react-router";


export interface ApplicationState {
    router: RouterState
}

export const rootReducer = (history: History) => combineReducers<ApplicationState>({
    router: connectRouter(history)
});

export function* rootSaga() {
    yield all([
    ])
}