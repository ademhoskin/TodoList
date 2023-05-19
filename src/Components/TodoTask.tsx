import React from "react";
import { Task } from "../Interface";

interface Props {
  task: Task;
}

const TodoTask = ({ task }: Props) => {
  return (
    <div className=" bg-white px-4 py-3 my-4 rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <div>Task: {task.name}</div>
        <div>Days Left: {task.date}</div>
      </div>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold  mx-6 py-2 px-4 rounded">
        X
      </button>
    </div>
  );
};

export default TodoTask;
