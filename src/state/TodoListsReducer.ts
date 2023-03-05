import {FilterButtonType, TodoListType} from "../App";
import {v1} from "uuid";

export const TodoListsReducer = (state: TodoListType[], action: tsarType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }
        case "ADD-TODOLIST": {
            const newTodoListId = v1()
            const newTodo: TodoListType = {
                id: newTodoListId,
                title: action.payload.newTodolistTitle,
                filter: "All"
            }
            return [...state, newTodo]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((t) => t.id === action.payload.todolistId2 ? {
                ...t,
                title: action.payload.newTodolistTitle
            } : t)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((t) => t.id === action.payload.todolistId2 ? {...t, filter: action.payload.newFilter} : t)
        }
    }
}

type tsarType = removeTodoListACType | addTodoListACType | changeTodoListTitle | changeTodoListFilter
type  removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId1
        }
    } as const
}


type  addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle
        }
    } as const
}

type  changeTodoListTitle = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (newTodolistTitle: string, todolistId2: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newTodolistTitle,
            todolistId2
        }
    } as const
}

type  changeTodoListFilter = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (newFilter: FilterButtonType, todolistId2: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }
    } as const
}