import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await fetch(`http://PythnSadev.pythonanywhere.com/tasks/${id}`);
        const data = await res.json();
        setTask(data);
      } catch (err) {
        console.log("Error loading task");
      }
    };
    loadTask();
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>

      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Status:</strong> {task.status}</p>

      <div className="mt-4 space-x-2">
        <button
          onClick={() => navigate(`/edit/${task.id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
        >
          Edit Task
        </button>

        <button
          onClick={() => navigate(`/delete/${task.id}`)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
        >
          Delete Task
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
