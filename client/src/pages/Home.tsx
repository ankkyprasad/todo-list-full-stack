import React, { useState, useEffect } from "react";
import { UserContext } from "../App";
import Task from "../components/Task";

interface KeyPressEvents {
  key: String;
}

interface TodoInterface {
  title: String;
  completed: boolean;
  _id: React.Key;
}

const Home = () => {
  const [task, setTask] = useState("");

  const [todoList, setTodoList] = useState<TodoInterface[]>([]);

  const [isPressedAll, setIsPressedAll] = useState(true);
  const [isPressedActive, setIsPressedActive] = useState(false);
  const [isPressedCompleted, setIsPressedCompleted] = useState(false);

  const [user, setUser] = React.useContext(UserContext);

  const taskKeyPressHandler = (event: KeyPressEvents) => {
    if (task !== "" && event.key === "Enter") {
      if (user.token) {
        fetch("/todo/data", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            title: task,
            completed: false,
          }),
        });

        fetchUserTask();
      } else {
        const newTask: TodoInterface = {
          title: task,
          completed: false,
          _id: Math.floor(Math.random() * 10000000000),
        };

        setTodoList([...todoList, newTask]);
      }

      setTask("");
    }
  };

  const allTaskEventHandler = () => {
    setIsPressedAll(true);
    setIsPressedActive(false);
    setIsPressedCompleted(false);
  };

  const activeTaskEventHandler = () => {
    setIsPressedAll(false);
    setIsPressedActive(true);
    setIsPressedCompleted(false);
  };

  const completedTaskEventHandler = () => {
    setIsPressedAll(false);
    setIsPressedActive(false);
    setIsPressedCompleted(true);
  };

  const fetchUserTask = async () => {
    await fetch("/todo/data", {
      method: "GET",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTodoList(data.todos));
  };

  useEffect(() => {
    if (!user.token) {
      setTodoList([]);
      return;
    }

    fetchUserTask();
  }, [user]);

  return (
    <div className="home">
      <div className="container">
        <div className="add-task">
          <input
            type="text"
            placeholder="Create a new task"
            autoComplete="nope"
            value={task}
            onChange={(e: React.BaseSyntheticEvent) => setTask(e.target.value)}
            onKeyPress={taskKeyPressHandler}
          />
          {/* <button onClick={addTaskHandler}>+</button> */}
        </div>

        <div className="added-tasks">
          {todoList.map((todo) => (
            <Task
              todo={todo}
              fetchUserTask={fetchUserTask}
              todoList={todoList}
              setTodoList={setTodoList}
              isPressedAll={isPressedAll}
              isPressedActive={isPressedActive}
              isPressedCompleted={isPressedCompleted}
              key={todo._id}
            />
          ))}
        </div>

        <div className="task-menu-bar">
          <ul>
            <li
              className={isPressedAll ? "active-task" : ""}
              onClick={allTaskEventHandler}
            >
              All
            </li>
            <li
              className={isPressedActive ? "active-task" : ""}
              onClick={activeTaskEventHandler}
            >
              Active
            </li>
            <li
              className={isPressedCompleted ? "active-task" : ""}
              onClick={completedTaskEventHandler}
            >
              Completed
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
