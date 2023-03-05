import {TasksStateType} from "../App";

export type FirstActionType = {
    type: ''
}
export type SecondActionType = {
    type: ''
}

type ActionsType = FirstActionType | SecondActionType

export const TasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case '':
            return state
        case '':
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTasksAC = (todolistId: string): FirstActionType => {
    return { type: ''}
}
export const secondAC = (title: string): SecondActionType => {
    return { type: ''}
}