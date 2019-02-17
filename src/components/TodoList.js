import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import './TodoList.scss'

//dodac walidacje,
//usuwanie,

const TodoList = (props) => {
    const [inputIsValid, setInputValid] = useState(false)
    const [initTodoName, setTodoName] = useState('')
    const [todoList, setTodoList] = useState([])

    const updatedTodoNames = (e) => {
        setTodoName(e.target.value)
    }
    const inputIsValidHandler = (e) => {
        if (e.target.value === "") {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }
    const addTask = (e) => {
        e.preventDefault()
        //tranforming into object
        axios.post('https://todoapp-4748e.firebaseio.com/tasks.json', { name: initTodoName })
        .then(res => {
            const todoItem = {id:res.data.name,name: initTodoName}
            setTodoList(todoList.concat(todoItem))
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
            setTodoList(todos)
            console.log(todos)
        }).catch(err => {
            console.log(err)
        })
        return () => {
            console.log("Cleanup")
        }
    }, [])
    return (
        <Fragment>
            <h3>What I need todo?</h3>
            <div className="container__new-task">
                <form className="myForm">
                    <div className="input-group">
                        <input type="text" onChange={updatedTodoNames} className="form-control" id="input" placeholder="Enter a task name" value={initTodoName} />
                        <span className="input-group-btn">
                            <button onClick={addTask} className="btn btn-info" type="submit">Add a task</button>
                        </span>
                    </div>
                </form>
                <div className="container__tasks">
                    <ul>
                        {todoList.map(todo => {
                            return (
                                <li key={todo.id}>
                                    <div className="input-group" style={{ marginBottom: '20px' }}>
                                        <input type="text" className="form-control background-change" placeholder="Task name..." onChange={updatedTodoNames} value={todo.name} />
                                        <span className="input-group-btn">
                                            <button className="btn btn-danger delete-task-btn"><i className="fas fa-times"></i></button>
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
export default TodoList