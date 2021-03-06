import * as React from 'react';
import Games from './games/Games';
import styles from "./styles.module.scss";

type Props = {
    testLenta: string
}

class Lenta extends React.Component<Props>{
    render(){
        const { testLenta } = this.props;
        return(
            <div className={styles.container}>
                <Games name="test glass Game"/>
            </div>
        )
    }
}

export default Lenta;