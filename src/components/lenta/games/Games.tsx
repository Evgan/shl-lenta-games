import * as React from 'react';
import s from "./Games.module.scss"
import getKey from '../../../Helpers/KeyHelper';
import Game from './game/Game';

type Props = {
    name: string
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
        const { name } = this.props;
        const transform = `translate3d(${this.state.xPos}px, 0px, 0px)`;
        console.log('----------------------- name = ', name);
        const dataGames = [
            {
                levelGame: "Рег.чемпионат",
                division: "Короли улиц",
                iconDivision: "http://simpleicon.com/wp-content/uploads/cute.png",
                date: "25.02.2018",
                time: "16:00",
                resultTeamHome: "5",
                resultTeamGuest: "2",
                teamHome: "ЛИАЗ",
                teamGuest: "Арсенал Москва",
                urlTeamHome: "http://www.streethockeyleague.ru/o-lige-shl/",
                urlTeamGuest: "",
                address: "Парк Легенд",
                city: "Москва",
                urlResult: "http://www.streethockeyleague.ru/statistika/?game=272",
                urlAddress: ""
            },
            {
                levelGame: "Плей-офф",
                division: "Новые легенды",
                iconDivision: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
                date: "26.02.2018",
                time: "17:00",
                resultTeamHome: "",
                resultTeamGuest: "",
                teamHome: "МЕТЕОР",
                teamGuest: "MIP",
                urlTeamHome: "",
                urlTeamGuest: "http://www.streethockeyleague.ru/o-lige-shl/",
                address: "Сиреневый бул., 1, корп. 2",
                city: "Москва",
                urlAddress: "https://yandex.ru/maps/-/CGdzZ24H",
                urlResult:""
            },
            {
                levelGame: "Рег.чемпионат",
                division: "Короли улиц",
                iconDivision: "http://simpleicon.com/wp-content/uploads/cute.png",
                date: "25.02.2018",
                time: "16:00",
                resultTeamHome: "5",
                resultTeamGuest: "2",
                teamHome: "ЛИАЗ",
                teamGuest: "Арсенал Москва",
                urlTeamHome: "",
                urlTeamGuest: "",
                address: "Парк Легенд",
                city: "Москва",
                urlAddress: "",
                urlResult: ""
            },
            {
                levelGame: "Плей-офф",
                division: "Новые легенды",
                iconDivision: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
                date: "26.02.2018",
                time: "17:00",
                resultTeamHome: "",
                resultTeamGuest: "",
                teamHome: "МЕТЕОР",
                teamGuest: "MIP",
                urlTeamHome: "",
                urlTeamGuest: "http://www.streethockeyleague.ru/o-lige-shl/",
                address: "Сиреневый бул., 1, корп. 2",
                city: "Москва",
                urlAddress: "",
                urlResult:""
            },
            {
                levelGame: "Плей-офф",
                division: "Новые легенды",
                iconDivision: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
                date: "26.02.2018",
                time: "17:00",
                resultTeamHome: "",
                resultTeamGuest: "",
                teamHome: "МЕТЕОР",
                teamGuest: "MIP",
                urlTeamHome: "",
                urlTeamGuest: "http://www.streethockeyleague.ru/o-lige-shl/",
                address: "Сиреневый бул., 1, корп. 2",
                city: "Москва",
                urlAddress: "https://yandex.ru/maps/-/CGdzZ24H",
                urlResult:""
            },
            {
                levelGame: "Плей-офф",
                division: "Новые легенды",
                iconDivision: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
                date: "26.02.2018",
                time: "17:00",
                resultTeamHome: "",
                resultTeamGuest: "",
                teamHome: "МЕТЕОР",
                teamGuest: "MIP",
                urlTeamHome: "",
                urlTeamGuest: "http://www.streethockeyleague.ru/o-lige-shl/",
                address: "Сиреневый бул., 1, корп. 2",
                city: "Москва",
                urlAddress: "https://yandex.ru/maps/-/CGdzZ24H",
                urlResult:""
            },
            {
                levelGame: "Плей-офф",
                division: "Новые легенды",
                iconDivision: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
                date: "26.02.2018",
                time: "17:00",
                resultTeamHome: "",
                resultTeamGuest: "",
                teamHome: "МЕТЕОР",
                teamGuest: "MIP",
                urlTeamHome: "",
                urlTeamGuest: "http://www.streethockeyleague.ru/o-lige-shl/",
                address: "Сиреневый бул., 1, корп. 2",
                city: "Москва",
                urlAddress: "https://yandex.ru/maps/-/CGdzZ24H",
                urlResult:""
            },
            {
                levelGame: "Плей-офф",
                division: "Новые легенды",
                iconDivision: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
                date: "26.02.2018",
                time: "17:00",
                resultTeamHome: "",
                resultTeamGuest: "",
                teamHome: "МЕТЕОР",
                teamGuest: "MIP",
                urlTeamHome: "",
                urlTeamGuest: "http://www.streethockeyleague.ru/o-lige-shl/",
                address: "Сиреневый бул., 1, корп. 2",
                city: "Москва",
                urlAddress: "https://yandex.ru/maps/-/CGdzZ24H",
                urlResult:""
            },
            {
                levelGame: "Плей-офф",
                division: "Новые легенды",
                iconDivision: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg",
                date: "26.02.2018",
                time: "17:00",
                resultTeamHome: "",
                resultTeamGuest: "",
                teamHome: "МЕТЕОР",
                teamGuest: "MIP",
                urlTeamHome: "",
                urlTeamGuest: "http://www.streethockeyleague.ru/o-lige-shl/",
                address: "Сиреневый бул., 1, корп. 2",
                city: "Москва",
                urlAddress: "https://yandex.ru/maps/-/CGdzZ24H",
                urlResult:""
            }
        ];
        return (
            <div className={s.container}>
                <div className={s.btn} onClick={() => this.moveDiv(-1)} >
                    <div className={s.btnIcon}>
                        <div className={s.toLeft} />
                    </div>
                </div>
                <div className={s.games}>
                    <div id="gamesMove" className={s.gamesMove} style={{transform}}>
                        {dataGames.map(dataGame => <Game key={getKey('Game')} dataGame={dataGame}/>)}
                    </div>
                </div>
                <div className={s.btn} onClick={() => this.moveDiv(1)}>
                    <div className={s.btnIcon}>
                        <div className={s.toRight} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Games;