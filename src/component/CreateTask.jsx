// return (
// <div className="p-4">
// <h2 className="text-xl font-bold mb-4">Create New Task</h2>
// <form onSubmit={handleSubmit} className="space-y-4">
// <input
// type="text"
// value={title}
// onChange={(e) => setTitle(e.target.value)}
// placeholder="Enter task title"
// className="border rounded p-2 w-full"
// />
// <button
// type="submit"
// className="bg-blue-500 text-white px-4 py-2 rounded"
// >
// Add Task
// </button>
// </form>
// {message && <p className="mt-2 text-green-600">{message}</p>}
// </div>
// );
// }
 

import { useState } from "react";

export default function CreateTask({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ title }))
    if (title.trim() === "") return;

    try {
      const response = await fetch("http://PythnSadev.pythonanywhere.com/tasks", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTask = await response.json();
      if (onTaskCreated) {
        onTaskCreated(newTask); // update parent list
      }
      setMessage("✅ Task added successfully!");
      setTitle("");
    } catch (error) {
      console.error("Error creating task:", error);
      setMessage("❌ Error creating task.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
