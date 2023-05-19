import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { Task } from "./Interface";
import TodoTask from "./Components/TodoTask";

const App: FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDays, setTaskDays] = useState<number>(0);
  const [taskDateInput, setTaskDateInput] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const diffDays = (date1: Date, date2: Date): number => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffInMs = Math.abs(date1.getTime() - date2.getTime());

    return Math.floor(diffInMs / msPerDay);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "name") {
      setTaskName(event.target.value);
    } else {
      setTaskDateInput(event.target.value);
      setTaskDays(diffDays(new Date(), new Date(event.target.value)));
    }
  };

  const addTask = (): void => {
    const newTask: Task = { name: taskName, date: taskDays };
    setTaskList([...taskList, newTask]);
    console.log(taskList);
    setTaskName("");
    setTaskDateInput("");
    setTaskDays(0);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-orange-500 w-screen h-screen m-0 flex flex-col items-center">
        <header className="font-extralight font-sans text-xl pt-10">
          Welcome to Adem's to-do app, which uses React, Typescript and
          TailwindCSS!
        </header>
        <div className="font-sans text-lg text-white">
          To begin, enter the task name and select a date.
        </div>
        <div className="flex flex-row justify-evenly m-3">
          <input
            type="text"
            name="name"
            id="name-entry"
            placeholder="Task Name..."
            value={taskName}
            className="rounded-lg mx-5 px-2 text-center"
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            id="date-entry"
            value={taskDateInput}
            className="rounded-lg px-2 text-center"
            onChange={handleChange}
          />
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold  mx-6 py-2 px-4 rounded"
            onClick={addTask}
          >
            Button
          </button>
        </div>
        <div className="taskList">
          {taskList.map((task: Task, key: number) => {
            return <TodoTask key={key} task={task} />;
          })}
        </div>
      </div>
    </>
  );
};

export default App;
