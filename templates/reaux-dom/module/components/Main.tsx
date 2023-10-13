import React, {memo} from 'react';
import styles from './index.module.scss';

function Index(){
    return (
        <div className={styles.container}>
            module init
        </div>
    )
};

export default memo(Index);
