import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


export type FilterButtonType = 'All' | 'Completed' | 'Active'

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterButtonType
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn_1", filter: "All"},
        {id: todoListId_2, title: "What to learn_2", filter: "All"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>
    ({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "WHISKEY", isDone: true},
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "ACE", isDone: false},
        ]
    })

    const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
        setTodoList(todoList.map((t) => t.id === todoListId ? {...t, filter: filter} : t));
    };
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoList(todoList.map((t) => t.id === todoListId ? {...t, title: title} : t));
    };
    const removeTodoList = (todoListId: string) => {
        const updateTodoList = todoList.filter((el) => el.id !== todoListId)
        setTodoList(updateTodoList)
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodo: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "All"
        }
        setTodoList([...todoList, newTodo])
        setTasks({...tasks, [newTodoListId]: []})
    }


    const getFilterTaskForRender = (tasks: Array<TaskType>, filter: FilterButtonType): Array<TaskType> => {
        switch (filter) {
            case "Active":
                return tasks.filter(task => !task.isDone)
            case "Completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }
    const changeStatus = (taskID: string, eventStatus: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskID ? {...el, isDone: eventStatus} : el)
        })
    }
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {

        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map((t) => t.id === taskID ? {...t, title: title} : t)
        })
    }
    const addTask = (title: string, todoListId: string) => {
        const newTasks: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTasks]})
    }
    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(tasks => tasks.id !== taskId)})
    }


    const todoListComponent = todoList.map((tl) => {
        const filteredTasksForRender = getFilterTaskForRender(tasks[tl.id], tl.filter);
        return (
            <Grid item>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <Todolist
                        todoListId={tl.id}
                        title={tl.title}
                        changeTodoListFilter={changeTodoListFilter}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        filter={tl.filter}
                        changeTodoListTitle={changeTodoListTitle}
                        tasks={filteredTasksForRender}/>
                </Paper>
            </Grid>

        )
    })


    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} style={{padding: '20px'}}>
                    {todoListComponent}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
