import * as React from 'react';
import {connect} from "react-redux"
import s from "./Games.module.scss"
import getKey from '../../../Helpers/KeyHelper';
import Game from './game/Game';
import {ApplicationState} from '../../../redux/saga';
import {getGamesRequest, dataGame} from '../../../ducks/games'

type Props = {
    name: string;
    listGames: dataGame[];
    getGamesRequest: () => void;
}

class Games extends React.Component<Props>{

    state = {
        xPos: 0,
        xPosMin: 0,
        xPosMax: 0,
        step: 168,
    };

    componentDidMount() {
        console.log('----------------------- Games() > componentDidMount()');
        this.props.getGamesRequest()
    }

    step = 168;

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
        const { name, listGames } = this.props;
        const transform = `translate3d(${this.state.xPos}px, 0px, 0px)`;
        console.log('----------------------- name = ', name);
        console.log('----------------------- listGames:');
        console.log(listGames);
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
)(Games);