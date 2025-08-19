"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamResponse, setStreamResponse] = useState("");

  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to My AI Agent Application</h1>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows={4}
          cols={50}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>

      <div>
        <button
          onClick={handleChat}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {loading ? "Loading..." : "Chat"}
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          whiteSpace: "pre-wrap",
          fontSize: "28px",
        }}
      >
        {response}
      </div>
    </div>
  );
}
