import {action} from 'typesafe-actions'
import {Reducer} from 'redux'
import {all, call, put, fork, takeEvery, delay, select} from 'redux-saga/effects'
import {callApi} from '../utils/api'

const API_ENDPOINT = "http://www.streethockeyleague.ru";

export interface dataGame extends ApiResponse{
    date: string,
    time: string,
    resultTeamHome: string,
    resultTeamGuest: string,
    urlResult: string,
    teamHome: string,
    teamGuest: string,
    urlTeamHome: string,
    urlTeamGuest: string,
    division: string,
    iconDivision: string,
    city: string,
    address: string,
    urlAddress: string,
    levelGame: string
}

export interface Games extends ApiResponse{
    listGames: dataGame[]
}

export interface Errors extends ApiResponse {
    [key: string]: string
}

export interface GamesState extends ApiResponse {
    listGames: dataGame[],
    isFetching: boolean;
    success: boolean;
    error: boolean;
    errorMsg: string;
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

export enum GamesActionTypes {
    GET_GAMES_REQUEST = '@@games/GET_GAMES_REQUEST',
    GET_GAMES_SUCCESS = '@@games/GET_GAMES_SUCCESS',
    GET_GAMES_FAIL = '@@games/GET_GAMES_FAIL'
}

// Type-safe initialState!
export const initialState: GamesState = {
    listGames: [],
    isFetching: false,
    success: false,
    error: false,
    errorMsg: '',
};

export const reducer: Reducer<GamesState> = (state = initialState, action) => {
    switch (action.type) {
        case GamesActionTypes.GET_GAMES_REQUEST: {
            return {
                ...state,
                isFetching: true,
                success: false,
                error: false,
            }
        }

        case GamesActionTypes.GET_GAMES_SUCCESS: {
            console.log('RRRRRRRRRRRRRRRRRR GET_GAMES_SUCCESS');
            console.log('action.payload:');
            console.log(action.payload);
            return {
                ...state,
                isFetching: false,
                success: true,
                listGames: action.payload.listGames
            }
        }

        case GamesActionTypes.GET_GAMES_FAIL: {
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMsg: action.payload
            }
        }

        default: {
            return state
        }

    }
};


export const getGamesRequest = () => action(GamesActionTypes.GET_GAMES_REQUEST);
export const getGamesSuccess = (values: Games) => action(GamesActionTypes.GET_GAMES_SUCCESS);
export const getGamesFail = (message: string) => action(GamesActionTypes.GET_GAMES_FAIL);

/**
 * получение
 * */
function* getGamesSaga(action: any) {
    try {
        console.log('SSSSSSSSSSSS getGamesSaga()');
        const id = '111111';
        const params = {id};
        const response = yield call(callApi, 'POST', API_ENDPOINT, '/sitefiles/flash/content/dataTest.json', params);

        if (response.error) {
            yield put(getGamesFail(response.error))
        } else {
            yield put(getGamesSuccess(response))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(getGamesFail(err.stack!))
        } else {
            yield put(getGamesFail('Неизвестная ошибка.'))
        }
    }
}

function* watchGetGamesRequest() {
    yield takeEvery(GamesActionTypes.GET_GAMES_REQUEST, getGamesSaga)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* gamesSaga() {
    yield all([
        fork(watchGetGamesRequest)
    ])
}

export default gamesSaga;
