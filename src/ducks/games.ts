import {action} from 'typesafe-actions'
import {Reducer} from 'redux'
import {all, call, put, fork, takeEvery} from 'redux-saga/effects'
import {callApi} from '../utils/api'

const API_ENDPOINT = "https://still-reef-23399.herokuapp.com";
// const API_ENDPOINT = "http://www.streethockeyleague.ru";

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

export interface serverTime extends ApiResponse{
    dateNow: number,
    date: string
}

export interface Games extends ApiResponse{
    listGames: dataGame[],
    serverTime: serverTime,
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
    serverTime: serverTime
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
    serverTime: {
        dateNow: 0,
        date: ''
    },
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
                listGames: action.payload.listGames,
                serverTime: action.payload.serverTime,
            }
        }

        case GamesActionTypes.GET_GAMES_FAIL: {
            console.log('RRRRRRRRRRRRRRRRRR GET_GAMES_FAIL');
            console.log('action.payload:');
            console.log(action.payload);
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
export const getGamesSuccess = (values: Games) => action(GamesActionTypes.GET_GAMES_SUCCESS, values);
export const getGamesFail = (message: string) => action(GamesActionTypes.GET_GAMES_FAIL, message);

/**
 * получение списка игр
 * */
function* getGamesSaga(action: any) {
    try {


        /*//РАБОТАТЕТ
        // const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
        // const requestURL = 'http://www.streethockeyleague.ru/sitefiles/lentaJS/dataTest.json';
        const requestURL = './dataTest.json';
        //const requestURL = 'D:\\projects\\SHL\\js-shl-lenta\\shl-lenta-games0\\src\\components\\lenta\\games\\dataTest.json';
        const request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            console.log('JJJJJJJJJJJJJJJJJJJJJJJ request.response:');
            console.log(request.response);
        }*/



        /*let request = new Request (
            // 'http://www.streethockeyleague.ru/sitefiles/flash/content/dataTest.json',
            './dataTest.json',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default'
            });
        fetch(request)
            .then(function (resp) {
                console.log('11111111111111111111111 resp:');
                console.log(resp);
                console.log(resp.json());
                return resp.json();
            })
            .then(function (data) {
                console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ data:');
                console.log(data);
            })*/


        console.log('SSSSSSSSSSSS getGamesSaga()');
        //const response = yield call(callApi, 'GET', API_ENDPOINT, '/sitefiles/flash/content/dataTest.json');

        //https://still-reef-23399.herokuapp.com/getListGamesJson
        const response = yield call(callApi, 'GET', API_ENDPOINT, '/getListGamesJson');

        // const response = yield call(callApi, 'GET', API_ENDPOINT, '/sitefiles/lentaJS/dataTest.json');

        if (response.error) {
            yield put(getGamesFail(response.error))
        } else {
            yield put(getGamesSuccess(response))
        }

    } catch (err) {
        console.log('CATCH getGamesSaga()');

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
