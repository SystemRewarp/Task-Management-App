import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch task details
    fetch(`http://PythnSadev.pythonanywhere.com/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch(() => setMessage("Error fetching task details"));
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://PythnSadev.pythonanywhere.com/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to delete task");
        return;
      }

      setMessage("Task deleted successfully");
      setTimeout(() => navigate("/"), 1500); // Navigate home after delete
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Delete Task</h2>
      {task ? (
        <div className="mb-4">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Status:</strong> {task.status}</p>

          <div className="mt-4 space-x-2">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
            >
              Delete Task
            </button>

            <button
              onClick={() => navigate(`/task/${id}`)} // Cancel button goes back to task details
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
      {message && <p className="mt-2 text-blue-600">{message}</p>}
    </div>
  );
}
