import React, { useState, useEffect } from 'react';
 
function GetByeWorld() {
  const [message, setMessage] = useState('Loading...');
 
  useEffect(() => {
    fetch('http://PythnSadev.pythonanywhere.com/bye')
      .then(response => response.json())
      .then(data => setMessage(data.output))
      .catch(error => {
        console.error("Error fetching message:", error);
        setMessage("Could not fetch message.");
      });
  }, []);
 
  return (
    <div>
      <h2>API Message:</h2>
      <p>{message}</p>
    </div>
  );
}
 
export default GetByeWorld;
 