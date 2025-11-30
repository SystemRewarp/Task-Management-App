import { useState } from "react";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    if (!email) {
      setStatus("Please enter an email.");
      return;
    }

    try {
      setStatus("Sending...");

      const res = await fetch(
        `https://PythnSadev.pythonanywhere.com/send-tasks/${email}`
      );

      const data = await res.json();

      if (data.status === "sent") {
        setStatus("Email sent successfully!");
      } else {
        setStatus("Failed to send email.");
      }
    } catch (err) {
      setStatus("Error sending email.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Send Tasks to Email</h1>

      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={sendEmail}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition"
      >
        Send Email
      </button>

      {status && (
        <p className="mt-4 text-gray-700">
          {status}
        </p>
      )}
    </div>
  );
}
