
import { useState } from "react";

function Todo() {
    const [todos, setTodos] = useState(['', '']);

    const addTodo = () => {
        return setTodos((previousTodos) => [...previousTodos, "newTodo"])
    }

    return (
        <>
            <button onClick={addTodo}>Add</button>
            <ol>
                {todos.map((todo, index) => <li key={index}>{todo}</li>)}
            </ol>
        </>
    )
}

export default Todo