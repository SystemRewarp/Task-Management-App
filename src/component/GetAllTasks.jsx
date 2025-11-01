import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GetAllTasks() {
  const [items, setItems] = useState([]);

  // Fetch all tasks
  useEffect(() => {
    fetch("http://PythnSadev.pythonanywhere.com/tasks")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Tasks</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer border rounded p-2 hover:bg-gray-100"
          >
            <Link to={`/tasks/${item.id}`} className="flex justify-between">
             {item.title}   </Link>
              <span
                className={
                  item.status === "completed"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {item.status === "completed" ? "✅ Completed" : "❌ Not Completed"}
              </span>
        
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAllTasks;
