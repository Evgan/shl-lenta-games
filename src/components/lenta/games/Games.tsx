import * as React from 'react';
import {connect} from "react-redux"
import cx from 'classnames'
import s from "./Games.module.scss"
import getKey from '../../../Helpers/KeyHelper';
import {reFormatDate} from '../../../Helpers/DateHelper';
import Game from './game/Game';
import {ApplicationState} from '../../../redux/saga';
import {getGamesRequest, dataGame, serverTime} from '../../../ducks/games'

interface Props {
    name: string;
    listGames: dataGame[];
    getGamesRequest: () => void;
    serverTime: serverTime;
}

interface State {
    gamesView: number;
    xPos: number;
    xPosMin: number;
    xPosMax: number;
    step: number;
    startPositionIsSet: boolean;
}

class Games extends React.Component<Props, State>{

    state = {
        gamesView: 5,
        xPos: 0,
        xPosMin: 0,
        xPosMax: 0,
        step: 168,
        startPositionIsSet: false
    };

    componentDidMount() {
        this.props.getGamesRequest()
    }



    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.serverTime.dateNow && !prevState.startPositionIsSet) {
            const {step, gamesView} = prevState;
            const dateNow = nextProps.serverTime.dateNow ;
            const listGames = nextProps.listGames ;
            const totalGames = listGames.length ;
            const xPosMin = - ((totalGames - gamesView - 1) * step);
            // мск = серверное + 3 часа (но милисекунда одинаковы для всех часвовых поясов, похоже на то что так)
            // 1 Сперва сравниваем dateNow c датой последней игры
            const dateLastGame = listGames[totalGames-1].date;
            const nowLastGame = Date.parse(reFormatDate(dateLastGame));
            if(nowLastGame - dateNow < 0) {
                return {startPositionIsSet: true, xPos: - (totalGames - gamesView - 1) * step, xPosMin}
            }
            // 2 Cравниваем dateNow c датой первой игры
            const dateFirstGame = listGames[0].date;
            const nowFirstGame = Date.parse(reFormatDate(dateFirstGame));
            if (nowFirstGame - dateNow >= 0) {
                return {startPositionIsSet: true, xPos: 0, xPosMin}
            } else {
                // 3 Cравниваем dateNow c датой каждой игры
                for (let i=0; i < totalGames; i++){
                    const dateGame = listGames[i].date;
                    const nowGame = Date.parse(reFormatDate(dateGame));
                    if(nowGame - dateNow >= 0){
                        const ii = (i + gamesView) > totalGames ?  totalGames-gamesView-1 : i;
                        const xStart = - ii * step;
                        return {startPositionIsSet: true, xPos: xStart, xPosMin}
                    }
                }
            }
            return {startPositionIsSet: true, xPosMin}
        }
        return null;
    }


    moveDiv = (side: number) => {
        const nextX = this.state.xPos + (side * this.state.step);
        this.setState({xPos: nextX});
    }

    render(){
        const { name, listGames, serverTime } = this.props;
        const {xPos, xPosMax, xPosMin} = this.state;
        const transform = `translate3d(${xPos}px, 0px, 0px)`;
        return (
            <div className={s.container}>
                <div className={cx(s.btn, (xPos === xPosMax) && s.disabled)} onClick={() => this.moveDiv(1)} >
                    <div className={cx(s.btnIcon, (xPos === xPosMax) && s.disabled)}>
                        <div className={s.toLeft} />
                    </div>
                </div>
                {listGames && (
                    <div className={s.games}>
                        <div id="gamesMove" className={s.gamesMove} style={{transform}}>
                            {listGames.map(dataGame => <Game key={getKey('Game')} dataGame={dataGame}/>)}
                        </div>
                    </div>
                )}
                <div className={cx(s.btn, (xPos === xPosMin) && s.disabled)} onClick={() => this.moveDiv(-1)}>
                    <div className={cx(s.btnIcon, (xPos === xPosMin) && s.disabled)}>
                        <div className={s.toRight} />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (store: ApplicationState) => {
    return {
        listGames: store.games.listGames,
        serverTime: store.games.serverTime
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
)(Games);