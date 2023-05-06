import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
uuidv4();

const TodoWrapper = () => {
  const [add, setAdd] = useState([]);
  const addTodo = (todo) => {
    setAdd([
      ...add,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(add);
  };
  // 할일 끝냈으면 밑줄 치기
  const toggleComplete = (id) => {
    setAdd(
      add.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setAdd(add.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setAdd(
      add.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
  };

  const editTask = (task, id) => {
    setAdd(
      add.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  return (
    <div className="TodoWrapper">
      <TodoForm addTodo={addTodo} />
      {add.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
