import {combineReducers} from 'redux'
import { all, fork } from 'redux-saga/effects'
import { History } from 'history'
import {connectRouter, RouterState} from "connected-react-router";
import  gamesSaga, {GamesState, reducer as gamesReducer} from '../ducks/games'



export interface ApplicationState {
    games: GamesState,
    router: RouterState
}

export const rootReducer = (history: History) => combineReducers<ApplicationState>({
    games: gamesReducer,
    router: connectRouter(history)
});

export function* rootSaga() {
    yield all([
        fork(gamesSaga)
    ])
}