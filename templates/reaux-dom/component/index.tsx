import React,{FC, memo} from "react";
import styles from "./index.module.scss";

interface Props {}

const Index: FC<Props> = ()=> {
    return (
        <div className={styles.contianer}>init component</div>
    )
}

export default memo(Index);