import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteTask({ onTaskUpdated, onTaskDeleted }) {
  const { id } = useParams(); // get task ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the task details when component loads
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://PythnSadev.pythonanywhere.com/tasks/${id}`);
        if (!response.ok) throw new Error("Failed to load task");
        const data = await response.json();
        setTitle(data.title);
      } catch (error) {
        console.error("Error fetching task:", error);
        setMessage("❌ Error loading task.");
      }
    };
    fetchTask();
  }, [id]);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    try {
      const response = await fetch(`http://PythnSadev.pythonanywhere.com/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      if (onTaskUpdated) {
        onTaskUpdated(updatedTask); // update parent list
      }
      setMessage("✅ Task updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
      setMessage("❌ Error updating task.");
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`http:/PythnSadev.pythonanywhere.comtasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      if (onTaskDeleted) {
        onTaskDeleted(id); // tell parent that this task is gone
      }
      setMessage("🗑️ Task deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
      setMessage("❌ Error deleting task.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit task title"
          className="border rounded p-2 w-full"
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Task
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Task
          </button>
        </div>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
