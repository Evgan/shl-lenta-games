import * as React from 'react';
import {connect} from "react-redux"
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
    xPos: number;
    xPosMin: number;
    xPosMax: number;
    step: number;
    startPositionIsSet: boolean;
}

class Games extends React.Component<Props, State>{

    state = {
        xPos: 0,
        xPosMin: 0,
        xPosMax: 0,
        step: 168,
        startPositionIsSet: false
    };

    componentDidMount() {
        console.log('----------------------- Games() > componentDidMount()');
        this.props.getGamesRequest()
    }



    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.serverTime.dateNow && !prevState.startPositionIsSet) {
            console.log('ССССССССССССССССССССССССССССССССССССССССССССССССССССССССССССССССССССС');
            // мск = серверное + 3 часа (но милисекунда одинаковы для всех часвовых поясов, похоже на то что так)
            const dateNow = nextProps.serverTime.dateNow ;
            const listGames = nextProps.listGames ;
            const totalGames = listGames.length ;
            console.log('----------------------- dateNow = ', dateNow);
            console.log('----------------------- totalGames = ', totalGames);
            console.log('----------------------- listGames = ', listGames);
            // 1 Сперва сравниваем dateNow c датой последней игры
            const dateLastGame = listGames[totalGames-1].date;
            const nowLastGame = Date.parse(reFormatDate(dateLastGame));
            if(nowLastGame - dateNow < 0) {
                console.log('ВСЕ ИГРЫ ПРОШЛИ');
                return {startPositionIsSet: true, xPos: - (totalGames - 6) * prevState.step}
            }
            // 2 Cравниваем dateNow c датой первой игры
            const dateFirstGame = listGames[0].date;
            const nowFirstGame = Date.parse(reFormatDate(dateFirstGame));
            if (nowFirstGame - dateNow >= 0) {
                console.log('ВСЕ ИГРЫ ЕЩЁ В ПЕРЕДИ');
                return {startPositionIsSet: true, xPos: 0}
            } else {
                for (let i=0; i < totalGames; i++){
                    console.log('i=',i);
                    const dateGame = listGames[i].date;
                    console.log('reFormatDate(dateGame) = ', reFormatDate(dateGame));
                    const nowGame = Date.parse(reFormatDate(dateGame));
                    if(nowGame - dateNow >= 0){
                        console.log('ИГРА ГДЕТО В СЕРЕДИНЕ СПИСКА');
                        const ii = (i + 5) > totalGames ?  totalGames-6 : i;
                        const xStart = - ii * prevState.step;
                        return {startPositionIsSet: true, xPos: xStart}
                    }
                }
            }


        }
        return null;
    }


    moveDiv = (side: number) => {
        console.log('----------------------- moveDiv() > side = ', side);
        const nextX = this.state.xPos + (side * this.state.step);
        this.setState({xPos: nextX});
        // const divMove = document.getElementById('gamesMove') as HTMLElement;
        // console.log('----------------------- divMove = ', divMove);
        // if (divMove) {
        //     //divMove.style.left = "30px";
        //     divMove.style.transform = `translate3d(200px, 0px, 0px)`;
        // }
    }

    render(){
        console.log('----------------------- moveDiv() > render()');
        console.log('----------------------- this.state.xPos = ', this.state.xPos);
        const { name, listGames, serverTime } = this.props;
        const transform = `translate3d(${this.state.xPos}px, 0px, 0px)`;
        console.log('----------------------- name = ', name);
        console.log('----------------------- listGames:');
        console.log(listGames);
        console.log('----------------------- serverTime:');
        console.log(serverTime);
        return (
            <div className={s.container}>
                <div className={s.btn} onClick={() => this.moveDiv(-1)} >
                    <div className={s.btnIcon}>
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
                <div className={s.btn} onClick={() => this.moveDiv(1)}>
                    <div className={s.btnIcon}>
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