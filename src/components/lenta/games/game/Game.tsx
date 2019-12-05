import * as React from 'react';
// import {connect} from "react-redux"
// import {dataGame} from '../../../../ducks/games'
import cx from 'classnames'
import s from './Game.module.scss'
// import {ApplicationState} from '../../../../redux/saga';
// import {getGamesRequest} from '../../../../ducks/games'

/*type Props = {
    dataGame: dataGame
}*/

type Props = {
    dataGame: {
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
}

class Game extends React.Component<Props>{
    render(){
        // levelGame: "Плей-офф",
        // division: "Новые легенды",
        // iconDivision: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
        // date: "26.02.2018",
        // time: "17:00",
        // resultTeamHome: "",
        // resultTeamGuest: "",
        // teamHome: "МЕТЕОР",
        // teamGuest: "MIP",
        // urlTeamHome: "",
        // urlTeamGuest: "http://www.streethockeyleague.ru/o-lige-shl/",
        // address: "Сиреневый бул., 1, корп. 2",
        // city: "Москва",
        // urlAddress: "https://yandex.ru/maps/-/CGdzZ24H"
        const {dataGame} = this.props;
        const isEndGame = dataGame.resultTeamHome !== "" || dataGame.resultTeamGuest !== "";
        return(
            <div className={s.container}>
                <div className={s.dateGame}>{dataGame.date}</div>
                <div className={s.infoGame}>
                    <img className={s.icon} src={dataGame.iconDivision} alt={dataGame.division}/>
                    {!isEndGame && (
                        <div className={s.time}>{dataGame.time}</div>
                    )}
                    {isEndGame && (
                        <div className={s.msgEndGame}>Матч завершен</div>
                    )}

                    {dataGame.urlTeamHome === "" && (
                        <div className={cx(s.team, s.teamHome)}>{dataGame.teamHome}</div>
                    )}
                    {dataGame.urlTeamHome !== "" && (
                        <a className={cx(s.team, s.teamHome)} href={dataGame.urlTeamHome} rel="noopener noreferrer" target="_blank" title="Посмотреть состав команды">{dataGame.teamHome}</a>
                    )}

                    {dataGame.urlTeamGuest === "" && (
                        <div className={cx(s.team, s.teamGuest)}>{dataGame.teamGuest}</div>
                    )}
                    {dataGame.urlTeamGuest !== "" && (
                        <a className={cx(s.team, s.teamGuest)} href={dataGame.urlTeamGuest} rel="noopener noreferrer" target="_blank" title="Посмотреть состав команды">{dataGame.teamGuest}</a>
                    )}

                    <div className={cx(s.result, s.resultTeamHome)}>{dataGame.resultTeamHome}</div>
                    <div className={cx(s.result, s.resultTeamGuest)}>{dataGame.resultTeamGuest}</div>

                    {!isEndGame && dataGame.address !== "" && dataGame.urlAddress === "" && (
                        <div className={s.address}>{dataGame.address}</div>
                    )}
                    {!isEndGame && dataGame.address !== "" && dataGame.urlAddress !== "" && (
                        <a className={cx(s.address, s.addressHref)} href={dataGame.urlAddress} rel="noopener noreferrer" target="_blank" title="Посмотреть на карте">{dataGame.address}</a>
                    )}

                    {isEndGame && dataGame.urlResult !== "" && (
                        <a className={s.seeResult} href={dataGame.urlResult} rel="noopener noreferrer" target="_blank">Посмотреть отчёт</a>
                    )}
                </div>
                <div className={s.typeGame}>{dataGame.city} &#8226; {dataGame.levelGame}</div>
            </div>
        )
    }
}

export default Game

/*
const mapStateToProps = (store: ApplicationState) => {
    return {
        listGames: store.games.listGames
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return{
        getGamesRequest: () => dispatch(getGamesRequest())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);*/
