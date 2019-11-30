import * as React from 'react';
import s from "./Games.module.scss"

type Props = {
    name: string
}

class Games extends React.Component<Props>{
    render(){
        const { name } = this.props;
        console.log('----------------------- name = ', name);
        return (
            <div className={s.conteiner}>EEEEEEEEEE</div>
        )
    }
}

export default Games;