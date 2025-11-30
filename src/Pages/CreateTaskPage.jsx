import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    try {
      const response = await fetch("http://PythnSadev.pythonanywhere.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      setMessage("✅ Task added successfully!");
      setTitle("");

      // Optional: redirect back to homepage after 1 second
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Error creating task:", error);
      setMessage("❌ Error creating task.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
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
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 transition"
        >
          Add Task
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
