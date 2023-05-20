// Importing necessary dependencies and components
import { FC, ChangeEvent, useState } from "react"; // FC is short for Function Component
import "./App.css";
import { Task } from "./Interface"; // Task Interface
import TodoTask from "./Components/TodoTask"; // TodoTask component

const App: FC = () => {
  // Initialize states for the task name, remaining days, input date, and task list
  const [taskName, setTaskName] = useState<string>("");
  const [taskDays, setTaskDays] = useState<number>(0);
  const [taskDateInput, setTaskDateInput] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Function to calculate the difference in days between two dates
  const diffDays = (date1: Date, date2: Date): number => {
    const msPerDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const diffInMs = Math.abs(date1.getTime() - date2.getTime()); // difference in milliseconds

    return Math.floor(diffInMs / msPerDay); // difference in days
  };

  // Function to handle changes in the input fields
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "name") {
      // if the name input field is changed, update the task name
      setTaskName(event.target.value);
    } else {
      // if the date input field is changed, update the task days and date input
      setTaskDateInput(event.target.value);
      setTaskDays(diffDays(new Date(), new Date(event.target.value)));
    }
  };

  // Function to add a task to the task list
  const addTask = (): void => {
    const newTask: Task = { name: taskName, date: taskDays };
    setTaskList([...taskList, newTask]); // add the new task to the task list
    console.log(taskList);
    // Reset the task name, date input, and task days
    setTaskName("");
    setTaskDateInput("");
    setTaskDays(0);
  };

  // Function to remove a task from the task list
  const completeTask = (taskNameToDelete: string): void => {
    setTaskList(
      taskList.filter((task) => {
        return task.name !== taskNameToDelete; // return all tasks not matching the task name to delete
      })
    );
  };

  return (
    <>
      {/* App layout */}
      <div className="bg-gradient-to-r from-purple-500 to-orange-500 w-screen h-screen m-0 flex flex-col items-center">
        {/* Header */}
        <header className="font-extralight font-sans text-xl pt-10">
          Welcome to Adem's to-do app, which uses React, Typescript and
          TailwindCSS!
        </header>

        {/* Instructions */}
        <div className="font-sans text-lg text-white">
          To begin, enter the task name and select a date.
        </div>

        {/* Input fields */}
        <div className="flex flex-row justify-evenly m-3">
          {/* Task name input */}
          <input
            type="text"
            name="name"
            id="name-entry"
            placeholder="Task Name..."
            value={taskName}
            className="rounded-lg mx-5 px-2 text-center"
            onChange={handleChange}
          />

          {/* Task date input */}
          <input
            type="date"
            name="date"
            id="date-entry"
            value={taskDateInput}
            className="rounded-lg px-2 text-center"
            onChange={handleChange}
          />

          {/* Add task button */}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-light  mx-6 py-2 px-4 rounded"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        {/* Task list */}
        <div className="taskList">
          {taskList.map((task: Task, key: number) => {
            return (
              // Render a TodoTask component for each task in the task list
              <TodoTask key={key} task={task} completeTask={completeTask} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App; // Exporting the App component
