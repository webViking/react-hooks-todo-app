import React, { Fragment } from 'react'

const Todo = (props) => {
    return (
        <Fragment>
            {props.items.map(todo => {
                return (

                    <li key={todo.id}>
                        <div  className="input-group" style={{ marginBottom: '20px' }}>
                            <input type="text" className="form-control background-change" placeholder="Task name..." onChange={props.change} value={todo.name} />
                            <span className="input-group-btn">
                                <button onClick={props.remove.bind(this, todo.id)} className="btn btn-danger delete-task-btn"><i className="fas fa-times"></i></button>
                            </span>
                        </div>
                    </li>
                )
            })}
        </Fragment>
    )
}
export default Todo