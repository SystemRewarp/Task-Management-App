import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`https://PythnSadev.pythonanywhere.com/tasks/${id}`);
        if (!res.ok) throw new Error("Failed to load task");

        const data = await res.json();
        setTitle(data.title);
        setStatus(data.status);
      } catch (error) {
        setMessage("❌ Error loading task.");
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://PythnSadev.pythonanywhere.com/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          status: status,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setMessage("✅ Task updated!");
      navigate(`/task/${id}`); // Go back to task details after update
    } catch (err) {
      setMessage("❌ Failed to update task.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />

        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
          >
            Update Task
          </button>

          <button
            type="button"
            onClick={() => navigate(`/task/${id}`)} // Cancel goes back to Task Details
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
