import { useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

//Note: Import the actions from todosSlice 
import toast from 'react-hot-toast';
import { addTodo, deleteTodo, setTodo, setTodoById, setTodos, toggleIsFinished, toggleShowFinished, updateTodo } from '../Redux/todosSlice.js';
import Theme from './Theme.jsx';


const Todos = () => {

    const darkmode = useSelector((state) => state.todos.darkmode)
    const dispatch = useDispatch()

    //Note Import the current State using useSelector
    const { todo, todos, isUpdating, showFinished } = useSelector((state) => state.todos)

    //Retrive the todos we have alreary saved in local storage
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos')

        if (savedTodos) {
            dispatch(setTodos(JSON.parse(savedTodos)))
        }
    }, [])

    //Save the todos in the localStorage, whenever todos update

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos))
        }else{
            localStorage.removeItem('todos')
        }

    }, [todos])

    const handleInputSubmit = (e) => {
        e.preventDefault()
        if (todo.data.length < 3) {
            toast.error("Todo Must Be Atlest 3 Characters Long")
            return
        }
        isUpdating ? dispatch(updateTodo({ todoId: todo.id })) : dispatch(addTodo())
    }



    return (
        <div id='todolist-page' className={`flex min-h-screen w-full flex-col items-center px-3 md:justify-center ${darkmode ? "bg-[#000714] text-white" : "bg-[#F0FFFF] text-black"}`}>


            <div className='flex w-full flex-col items-center justify-center md:w-3/4 lg:w-1/2'>

                <div className=' mb-5 mt-6 flex w-full  items-center justify-between    pl-3 text-center text-3xl font-bold md:m-8'>
                    <h1>To Do List</h1>
                    <Theme />
                </div>

                <form onSubmit={handleInputSubmit} id='input-section' className={`m-3 flex w-full items-center  justify-between rounded-3xl ${darkmode ? 'bg-[#121A27]  text-white' : "bg-[#F1ECE6]"} shadow-md`} >

                    <input
                        type="text"
                        value={todo.data}
                        onChange={(e) => dispatch(setTodo({ data: e.target.value }))}
                        className='ml-5 mr-3 w-10/12 items-center border-none bg-transparent p-0 text-lg  outline-none'
                        placeholder='What do you need to do?'
                    />

                    <label htmlFor="add-button" className={`flex  h-10 w-20 cursor-pointer items-center justify-center rounded-3xl ${darkmode ? 'bg-[#aba091]' : 'bg-[#3B5B66]'}  text-white  `}>{isUpdating ? "Save" : "Add"}</label>

                    <button type='submit' id='add-button' className='hidden'> </button>
                </form>


                <div id='todo-display-section' className={`flex min-h-[70vh] w-full  flex-col rounded-3xl border-none ${darkmode ? 'bg-[#121A27] text-white' : "bg-[#F1ECE6] shadow-lg"}`}>

                    <div id='show-finished-section' className='my-5 ml-5' >

                        <label htmlFor="isFinished" className='flex  w-1/2 cursor-pointer flex-nowrap items-center gap-x-2  md:w-1/4'>
                            <span> {showFinished ? <FaCheckCircle size={20} /> : < ImRadioUnchecked size={20} />}</span>
                            <p className='w-full select-none flex-nowrap text-lg font-bold'>Show Finished</p>
                        </label>

                        <input type='checkbox' checked={showFinished} onClick={() => dispatch(toggleShowFinished())} className='hidden' id='isFinished' />
                    </div>


                    <div id='show-todos-section' className='flex w-full flex-col items-center justify-center self-center'>
                        {
                            todos.map((t) => {
                                return (
                                    (showFinished || !t.isFinished) && <div key={t.id} className='flex w-full items-center'>


                                        <div className='ml-5 flex w-10/12 flex-nowrap items-center space-x-2'>

                                            <label htmlFor={t.id} className='cursor-pointer'>{t.isFinished ? <FaCheckCircle /> : < ImRadioUnchecked />}</label>
                                            <input type='checkbox' checked={t.isFinished} onChange={() => { if (t.isFinished != undefined) dispatch(toggleIsFinished(t.id)) }} id={t.id} className='hidden' />

                                            <div className='w-full '>
                                                {(t.isFinished) ? <p className='my-2 ml-3 flex w-11/12 flex-wrap overflow-x-hidden break-words text-lg line-through'>{t.data}</p> :
                                                    <p className='my-2 ml-3 flex w-11/12 
                                                flex-wrap overflow-x-hidden break-words text-lg'>{t.data}</p>
                                                }
                                            </div>

                                        </div>
                                        <div className='ml-2 flex flex-nowrap'>
                                            <button onClick={() => dispatch(setTodoById(t.id))} className='m-3 cursor-pointer border-none'><MdModeEditOutline className='icons' /></button>

                                            <button onClick={() => dispatch(deleteTodo(t.id))} className='m-3 cursor-pointer border-none'><MdDelete className='size-5 cursor-pointer' /></button>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todos



/*

default notes:

This is my simple react app, Any one can easily add the todo's.
Anyone can update the todo and also they can delete the todo, todo will automatically hide if it is marked done
User can see the Finished the todos by clicking "Show Finished" button
the Important functionality I have Added is Todos will keep in the local storage, so even if browser is closed or computer restart, all the data will not lost.


*/

