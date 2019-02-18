import React, { Fragment, useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import './TodoList.scss'
import Todo from './Todo'

//dodac walidacje,

const TodoList = (props) => {


    const [inputIsValid, setInputValid] = useState(false)
    const [initTodoName, setTodoName] = useState('')
    // const [todoList, setTodoList] = useState([])

    const updatedTodoNames = (e) => {
        setTodoName(e.target.value)
        if(e.target.value.trim() === ""){
            setInputValid(false)
        }else{
            setInputValid(true)
        }
    }
    const todoListReducer = (state, action) => {
        switch (action.type) {
            case "ADD":
                return state.concat(action.payload)
            case "REMOVE":
                return state.filter((todo) => { return todo.id !== action.payload })
            case "SET":
                return action.payload
            default:
                return state
        }
    }
    const [todoList, dispatch] = useReducer(todoListReducer, [])


    const addTask = (e) => {
        e.preventDefault()
        //tranforming into object
        axios.post('https://todoapp-4748e.firebaseio.com/tasks.json', { name: initTodoName })
            .then(res => {
                const todoItem = { id: res.data.name, name: initTodoName }
                dispatch({ type: "ADD", payload: todoItem })
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get('https://todoapp-4748e.firebaseio.com/tasks.json').then(res => {
            const todoData = res.data
            const todos = []
            for (let key in todoData) {
                todos.push({ id: key, name: todoData[key].name })
            }
            dispatch({ type: "SET", payload: todos })
            console.log(todos)
        }).catch(err => {
            console.log(err)
        })
        return () => {
            console.log("Cleanup")
        }
    }, [])
    const todoRemoveHandler = (todoId) => {
        axios.delete(`https://todoapp-4748e.firebaseio.com/tasks/${todoId}.json`).then(() => {
            dispatch({ type: "REMOVE", payload: todoId })
        })
    }
    return (
        <Fragment>
            <h3>What I need todo?</h3>
            <div className="container__new-task">
                <form className="myForm">
                    <div className="input-group">
                        <input type="text" onChange={updatedTodoNames} className="form-control" id="input" placeholder="Enter a task name" value={initTodoName} />
                        <span className="input-group-btn">
                            <button disabled={!inputIsValid} onClick={addTask} className="btn btn-info" type="submit">Add a task</button>
                        </span>
                    </div>
                </form>
                <div className="container__tasks">
                    <ul>
                        <Todo items={todoList} change={updatedTodoNames} remove={todoRemoveHandler} />
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
export default TodoList