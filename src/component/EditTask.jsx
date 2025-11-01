import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTask({ onTaskUpdated }) {
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
      const response = await fetch(`http://1PythnSadev.pythonanywhere.com/tasks/${id}`, {
        method: "PUT", // or PATCH if your backend supports partial update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      if (onTaskUpdated) {
        onTaskUpdated(updatedTask); // update parent list
      }
      setMessage("✅ Task updated successfully!");
      // optional: navigate back to task list
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
      setMessage("❌ Error updating task.");
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
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Task
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}