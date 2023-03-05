import {FilterButtonType} from "../App";


type PropsType = {
    name: string,
    callBack: () => void,
    filter?: FilterButtonType
}

export const Button = (props: PropsType) => {
    return (
        <button className={props.filter === props.name ? 'activeFilter' : ''}
                onClick={props.callBack}>{props.name}</button>
    )
}