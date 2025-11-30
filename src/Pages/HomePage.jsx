import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://PythnSadev.pythonanywhere.com/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

   <ul className="space-y-2 mb-6">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => navigate(`/task/${task.id}`)}
            className="border-b py-2 cursor-pointer text-blue-500 hover:bg-gray-100 transition"
          >
            <a href="">{task.title}{" "}</a>
            <span className="text-gray-500">
              ({task.status === "completed" ? "Completed" : "Not Completed"})
            </span>
          </li>
        ))}
      </ul>


      <div className="text-center">
        <button
          onClick={() => navigate("/create")}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
        >
          Add Task
        </button>

        <div className="text-center mt-4">
  <button
    onClick={() => navigate("/send-email")}
    className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 transition"
  >
    Send Tasks to Email
  </button>
</div>

      </div>
    </div>
  );
}
