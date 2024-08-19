'use client'
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    try {

      const response = await axios.post('/api/message', {
        message: message, // Directly pass your message object here
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (response.data.success) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message: ' + response.data.error.error);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    } finally {
      setMessage('')
    }
  }

  return (
    <form className="p-6 w-full h-screen flex flex-col gap-4 justify-center items-center" onSubmit={sendMessage}>
      <p>Send a message to the slack channel</p>
      <input value={message} onChange={(e) => setMessage(e.target.value)} className="border border-gray-200 w-1/3 p-2 rounded-md focus:outline-none " type="text" />
      <button type="submit" className="px-6 py-1 rounded-md bg-blue-400">Send</button>
    </form>
  );
}
