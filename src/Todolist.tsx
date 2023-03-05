import React, {ChangeEvent} from "react";
import {FilterButtonType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

type TodolistPropsType = {
    todoListId: string,
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeStatus: (id: string, eventStatus: boolean, todoListId: string) => void,
    changeTodoListFilter: (value: FilterButtonType, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void,
    filter: FilterButtonType
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    let tasksList = props.tasks.map((el, index) => {

        const removeTaskHandler = () => {
            props.removeTask(el.id, props.todoListId)
        }

        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(el.id, e.currentTarget.checked, props.todoListId);
        }

        const changeTaskTitle = (title: string) => props.changeTaskTitle(el.id, title, props.todoListId)

        return (
            <li className={el.isDone ? 'isDone' : ''} key={index}>
                <Checkbox
                    onChange={changeStatusHandler}
                    checked={el.isDone}
                />
                <IconButton onClick={() => removeTaskHandler()} >
                    <DeleteForeverIcon />
                </IconButton>
                {/*<Button onClick={() => removeTaskHandler(el.id)}>x</Button>*/}
                {/*<Button name={'X'} callBack={() => removeTaskHandler(el.id)}/>*/}
                {/*<span>{el.title}</span>*/}
                <EditableSpan title={el.title} changeTitle={changeTaskTitle}/>
            </li>

        )
    })
    const addTask = (title: string) => {
        props.addTask(title, props.todoListId);
    }
    const tsarHandler = (value: FilterButtonType) => {
        props.changeTodoListFilter(value, props.todoListId)
    }

    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todoListId)
    }

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList} >
                    <DeleteForeverIcon />
                </IconButton>
                {/*<Button onClick={onClickRemoveTodoList}>Del</Button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <ButtonGroup
                    size={'small'}
                    disableElevation

                >
                <Button
                    variant={props.filter === 'All' ? 'outlined':'contained'}
                    color={props.filter === 'All' ? 'secondary' : 'primary'}
                    onClick={() => tsarHandler('All')}>All</Button>
                <Button
                    variant={props.filter === 'Completed' ? 'outlined':'contained'}
                    color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    onClick={() => tsarHandler('Completed')}>Completed</Button>
                <Button
                    variant={props.filter === 'Active' ? 'outlined':'contained'}
                    color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    onClick={() => tsarHandler('Active')}>Active</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}






