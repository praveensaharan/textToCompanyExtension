import React, { useState } from "react";
import axios from "axios";
import { Spin } from "antd";

function Chat() {
  const [userMessage, setUserMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/processText",
        {
          userMessage: userMessage,
        }
      );
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Error processing message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full bg-customLightBlue flex justify-center items-center"
      style={{ minHeight: "300px" }}
    >
      <div
        className="bg-customLightBlue shadow-md rounded-lg p-4 md:p-8"
        style={{ width: "500px", height: "300px" }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-customRed">
          Chatbot
        </h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            className="w-full p-2 border border-customRed rounded-lg focus:outline-none focus:ring-2 focus:ring-customLightRed"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            rows={4}
            placeholder="Enter your message..."
          />
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-customRed text-white font-bold rounded-lg shadow-md hover:bg-customLightRed transition-colors duration-300"
          >
            Submit
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <Spin size="large" />
          </div>
        )}
        {answer && !loading && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold text-customPurple">
              Response:
            </h2>
            <div
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: answer }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
