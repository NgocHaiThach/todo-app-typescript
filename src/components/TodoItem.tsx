import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './InputField.css';
import { Draggable } from 'react-beautiful-dnd';

interface TodoItemProps {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<TodoItemProps> = ({ index, todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => todo.id === id ?
                { ...todo, isDone: !todo.isDone }
                : todo))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => todo.id === id ?
                { ...todo, todo: editTodo }
                : todo));
        setEdit(false);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todo__item ${snapshot.draggingOver ? 'drag' : ''}`}
                    onSubmit={(e) => handleEdit(e, todo.id)}
                >
                    {edit ? (
                        <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todo__item--text" />
                    ) : (
                        todo.isDone
                            ? (
                                <s className="todo__item--text">
                                    {todo.todo}
                                </s>
                            )
                            : (
                                <span className="todo__item--text">
                                    {todo.todo}
                                </span>
                            )
                    )}

                    <div>
                        <span
                            onClick={() => {
                                if (!todo.isDone && !edit) {
                                    setEdit(!edit)
                                }
                            }}
                            className="todo__item-icon">
                            <AiFillEdit />
                        </span>
                        <span className="todo__item-icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
                        <span className="todo__item-icon" onClick={() => handleDone(todo.id)}><MdDone /></span>
                    </div>
                </form>
            )}
        </Draggable>

    )
}
export default TodoItem;
