import React, { useContext } from "react";
import { UserContext } from "../App";

import { RiDeleteBinFill } from "react-icons/ri";

interface TodoInterface {
  title: String;
  completed: boolean;
  _id: React.Key;
}

interface TaskProps {
  todo: TodoInterface;
  fetchUserTask: () => void;
  todoList: TodoInterface[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoInterface[]>>;
  isPressedAll: Boolean;
  isPressedActive: Boolean;
  isPressedCompleted: Boolean;
}

interface TaskDetailProps {
  todo: TodoInterface;
  completeTaskHandler: () => void;
  deleteTaskHandler: () => void;
}

const Task = ({
  todo,
  fetchUserTask,
  todoList,
  setTodoList,
  isPressedAll,
  isPressedActive,
  isPressedCompleted,
}: TaskProps) => {
  const [user] = useContext(UserContext);

  const completeTaskHandler = async () => {
    if (user.token) {
      await fetch(`todo/data/${todo._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }).then((res) => res.json());

      fetchUserTask();
    } else {
      const newList: TodoInterface[] = [...todoList];

      for (let i: number = 0; i < newList.length; i++) {
        if (newList[i]._id === todo._id) todo.completed = !todo.completed;
      }

      setTodoList(newList);
    }

    console.log(isPressedAll, isPressedCompleted, isPressedActive);
  };

  const deleteTaskHandler = async () => {
    if (user.token) {
      await fetch(`todo/data/${todo._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      fetchUserTask();
    } else {
      todoList = todoList.filter((task) => task._id !== todo._id);
      setTodoList(todoList);
    }
  };

  return (
    <>
      {isPressedAll && (
        <TaskDetail
          todo={todo}
          completeTaskHandler={completeTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
        />
      )}

      {isPressedActive && !todo.completed && (
        <TaskDetail
          todo={todo}
          completeTaskHandler={completeTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
        />
      )}

      {isPressedCompleted && todo.completed && (
        <TaskDetail
          todo={todo}
          completeTaskHandler={completeTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
        />
      )}
    </>
  );
};

const TaskDetail = ({
  todo,
  completeTaskHandler,
  deleteTaskHandler,
}: TaskDetailProps) => {
  return (
    <div className="task">
      <h3
        className={todo.completed ? "completed-task" : ""}
        onClick={completeTaskHandler}
      >
        {todo.title}
      </h3>
      <span className="delete" onClick={deleteTaskHandler}>
        <RiDeleteBinFill />
      </span>
    </div>
  );
};

export default Task;
